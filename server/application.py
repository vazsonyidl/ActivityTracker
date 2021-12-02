from flask import Flask, request, jsonify
import os

from models.activity import db, Activity
from schemas.activity import marshmallow, activity_schema, activities_schema

# Initialize application
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

# Config database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize db & marshmallow
db.init_app(app)
marshmallow.init_app(app)

# Create an activity
@app.route('/activity', methods=['POST'])
def add_activity():
    description = request.json['description']
    startdate = request.json['startdate']
    enddate = request.json['enddate']
    finished = request.json['finished']

    new_activity = Activity(description, startdate, enddate, finished)
    db.session.add(new_activity)
    db.session.commit()

    return activity_schema.jsonify(new_activity)

# Get all activities
@app.route('/activity', methods=['GET'])
def get_all_activity():
    all_activity = Activity.query.all()
    result = activities_schema.dump(all_activity)

    return jsonify(result)

# Get one activity
@app.route('/activity/<id>', methods=['GET'])
def get_activity(id):
    activity = Activity.query.get(id)
    return activity_schema.jsonify(activity)

# Update a product
@app.route('/activity/<id>', methods=['PUT'])
def update_activity(id):
    activity = Activity.query.get(id)

    description = request.json['description']
    startdate = request.json['startdate']
    enddate = request.json['enddate']
    finished = request.json['finished']

    activity.description = description
    activity.startdate = startdate
    activity.enddate = startdate
    activity.finished = finished

    db.session.commit()

    return activity_schema.jsonify(activity)

# Delete a product
@app.route('/activity/<id>', methods=['DELETE'])
def delete_activity(id):
    activity = Activity.query.get(id)
    db.session.delete(activity)
    db.session.commit()

    return activity_schema.jsonify(activity)

# Run app
if __name__ == '__main__':
    app.run(host='localhost', port='4040', debug=True)
