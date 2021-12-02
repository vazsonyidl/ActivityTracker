from __main__ import app, db
from flask import request, jsonify
from models.task import Task
from schemas.task import task_schema, tasks_schema


# Create a task
@app.route('/task', methods=['POST'])
def add_task():
    description = request.json['description']
    start_date = request.json['start_date']
    end_date = request.json['end_date']
    finished = request.json['finished']

    new_task = Task(description, start_date, end_date, finished)
    db.session.add(new_task)
    db.session.commit()

    return task_schema.jsonify(new_task)


# Get all tasks
@app.route('/task', methods=['GET'])
def get_all_task():
    all_task = Task.query.all()
    result = tasks_schema.dump(all_task)

    return jsonify(result)


# Get one task
@app.route('/task/<task_id>', methods=['GET'])
def get_task(task_id):
    task = Task.query.get(task_id)
    return task_schema.jsonify(task)


# Update a task
@app.route('/task/<task_id>', methods=['PUT'])
def update_task(task_id):
    task = Task.query.get(task_id)

    description = request.json['description']
    start_date = request.json['start_date']
    end_date = request.json['end_date']
    finished = request.json['finished']

    task.description = description
    task.start_date = start_date
    task.end_date = end_date
    task.finished = finished

    db.session.commit()

    return task_schema.jsonify(task)


# Delete a task
@app.route('/task/<task_id>', methods=['DELETE'])
def delete_task(task_id):
    task = Task.query.get(task_id)
    db.session.delete(task)
    db.session.commit()

    return task_schema.jsonify(task)
