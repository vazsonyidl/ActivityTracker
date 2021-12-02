from init_app import app
from application import db

db.drop_all(bind='__all__', app=app)
db.create_all(bind='__all__', app=app)
