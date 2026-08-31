from pydantic import BaseModel

class RazorpayVerifyRequest(BaseModel):
    order_id: str
    razorpay_order_id: str
    razorpay_payment_id: str
    razorpay_signature: str

class PaymentVerificationResponse(BaseModel):
    success: bool
    order_id: str
    order_number: str
    suborders_count: int
    message: str
