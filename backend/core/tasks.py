from datetime import datetime

from backend.celeryconf import app


@app.task()
def update_user():
    print(datetime.now())
