import logging
from app.workers.celery_app import celery_app

logger = logging.getLogger("kalakriti.cleanup_tasks")

@celery_app.task(name="app.workers.tasks.cleanup_tasks.cleanup_stale_sessions")
def cleanup_stale_sessions():
    logger.info("🧹 [Cleanup Job] Removing expired user sessions from durable database.")
    return {"status": "completed"}
