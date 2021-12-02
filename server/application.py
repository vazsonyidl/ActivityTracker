from flask import Flask, request, jsonify
import os

from models.task import db, Task
from schemas.task import marshmallow, task_schema, tasks_schema

# Initialize application
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

# Config database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize db & marshmallow
db.init_app(app)
marshmallow.init_app(app)

# Import routes for task endpoint
import routes.task_routes

# Run app
if __name__ == '__main__':
    app.run(host='localhost', port='4040', debug=True)
