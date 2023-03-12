import os

from celery import Celery
from celery.schedules import crontab
from django.conf import settings

# from django.apps import apps
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

app = Celery("backend")

app.config_from_object("django.conf:settings", namespace="CELERY")
app.autodiscover_tasks()
app.conf.beat_schedule = {
    "crawl_data": {
        "task": "core.tasks.update_user",
        "schedule": crontab(minute="*/1"),
    },
}
