from flask_marshmallow import Marshmallow

marshmallow = Marshmallow()


# Task schema
class TaskSchema(marshmallow.Schema):
    class Meta:
        fields = ('id', 'description', 'start_date', 'end_date', 'finished')


# Init schema
task_schema = TaskSchema()
tasks_schema = TaskSchema(many=True)
