import os
from celery import Celery
from app.config import settings

celery_app = Celery(
    "kalakriti_workers",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
    include=[
        "app.workers.tasks.email_tasks",
        "app.workers.tasks.notification_tasks",
        "app.workers.tasks.payout_tasks",
        "app.workers.tasks.cleanup_tasks"
    ]
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="Asia/Kolkata",
    enable_utc=True,
    task_track_started=True,
    task_time_limit=300,
    beat_schedule={
        "weekly-artisan-payouts": {
            "task": "app.workers.tasks.payout_tasks.calculate_and_dispatch_payouts",
            "schedule": 60.0 * 60 * 24 * 7, # Weekly
        },
        "daily-analytics-and-cleanup": {
            "task": "app.workers.tasks.cleanup_tasks.cleanup_stale_sessions",
            "schedule": 60.0 * 60 * 24, # Daily
        }
    }
)
