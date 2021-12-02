from flask_marshmallow import Marshmallow

marshmallow = Marshmallow()

# Activity schema
class ActivitySchema(marshmallow.Schema):
    class Meta:
        fields = ('id', 'description', 'startdate', 'enddate', 'finished')

# Init schema
activity_schema = ActivitySchema()
activities_schema = ActivitySchema(many=True)
