from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.dependencies import get_current_user
from app.schemas.payment import RazorpayVerifyRequest, PaymentVerificationResponse
from app.integrations.razorpay.client import RazorpayClient
from app.models.payment import Payment
from app.models.payment_transaction import PaymentTransaction
from app.repositories.order_repository import OrderRepository
from app.core.exceptions import AppException, NotFoundException

router = APIRouter(prefix="/payments", tags=["Payments"])

@router.post("/verify", response_model=PaymentVerificationResponse)
async def verify_payment(
    req: RazorpayVerifyRequest,
    current_user: dict = Depends(get_current_user),
    db: AsyncSession = Depends(get_db)
):
    repo = OrderRepository(db)
    order = await repo.get_by_id(req.order_id)
    if not order:
        raise NotFoundException("Order", req.order_id)

    # Verify signature
    is_valid = RazorpayClient.verify_payment_signature(
        req.razorpay_order_id,
        req.razorpay_payment_id,
        req.razorpay_signature
    )
    if not is_valid:
        raise AppException(400, "Invalid Razorpay payment signature")

    # Record Payment & Transaction
    payment = Payment(
        order_id=order.id,
        razorpay_order_id=req.razorpay_order_id,
        amount=order.total_amount,
        status="captured",
        payment_method="upi"
    )
    db.add(payment)
    await db.flush()

    transaction = PaymentTransaction(
        payment_id=payment.id,
        razorpay_payment_id=req.razorpay_payment_id,
        amount=order.total_amount,
        status="captured",
        raw_webhook_payload=f"Signature Verified: {req.razorpay_signature}"
    )
    db.add(transaction)

    # Transition order and all per-artisan suborders to PAID
    order.status = "paid"
    for suborder in order.suborders:
        suborder.status = "confirmed"

    await db.flush()

    return {
        "success": True,
        "order_id": order.id,
        "order_number": order.order_number,
        "suborders_count": len(order.suborders),
        "message": f"Payment of ₹{order.total_amount:,.2f} confirmed. Split into {len(order.suborders)} artisan suborders."
    }
