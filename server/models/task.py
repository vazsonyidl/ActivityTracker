from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()


# Task class
class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200))
    start_date = db.Column(db.String(20))
    end_date = db.Column(db.String(20))
    finished = db.Column(db.Boolean)

    def __init__(self, description, start_date, end_date, finished):
        self.description = description
        self.start_date = start_date
        self.end_date = end_date
        self.finished = finished
