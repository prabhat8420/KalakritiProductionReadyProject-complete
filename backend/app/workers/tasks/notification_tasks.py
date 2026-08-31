import logging
from app.workers.celery_app import celery_app

logger = logging.getLogger("kalakriti.notification_tasks")

@celery_app.task(name="app.workers.tasks.notification_tasks.create_in_app_notification")
def create_in_app_notification(user_id: str, title: str, message: str, notification_type: str = "order_update"):
    logger.info(f"🔔 [Push Notification] User: {user_id} | Title: {title} | Type: {notification_type}")
    return {"status": "delivered", "user_id": user_id, "title": title}
