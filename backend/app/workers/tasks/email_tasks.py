import logging
from app.workers.celery_app import celery_app

logger = logging.getLogger("kalakriti.email_tasks")

@celery_app.task(name="app.workers.tasks.email_tasks.send_order_confirmation_email")
def send_order_confirmation_email(user_email: str, order_number: str, total_amount: float, suborders_count: int):
    logger.info(f"📧 [Email Dispatched] To: {user_email} | Order: {order_number} | Amount: ₹{total_amount} | Suborders: {suborders_count}")
    return {"status": "sent", "recipient": user_email, "order_number": order_number}

@celery_app.task(name="app.workers.tasks.email_tasks.send_artisan_order_alert_email")
def send_artisan_order_alert_email(artisan_email: str, suborder_number: str, artisan_earnings: float):
    logger.info(f"📧 [Artisan Alert] To: {artisan_email} | Suborder: {suborder_number} | Net Earning: ₹{artisan_earnings}")
    return {"status": "sent", "recipient": artisan_email, "suborder_number": suborder_number}
