from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

# Activity class
class Activity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200))
    startdate = db.Column(db.String(20))
    enddate = db.Column(db.String(20))
    finished = db.Column(db.Boolean)

    def __init__(self, description, startdate, enddate, finished):
        self.description = description
        self.startdate = startdate
        self.enddate = enddate
        self.finished = finished
