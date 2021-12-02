import os
from init_app import app
from models.task import db
from schemas.task import marshmallow

# Import routes for task endpoint
from routes.task_routes import *

# Defining basedir
basedir = os.path.abspath(os.path.dirname(__file__))

# Config database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize db & marshmallow
db.init_app(app)
marshmallow.init_app(app)

# Run app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port='3000', debug=True)
