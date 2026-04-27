from rest_framework import serializers

class CreateTaskSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    project_id = serializers.IntegerField(required=False, allow_null=True)
    description = serializers.CharField(required=False, allow_null=True, allow_blank=True)
    priority = serializers.CharField(required=False, default='MEDIUM')
    due_date = serializers.DateTimeField(required=False, allow_null=True)

class UpdateTaskStatusSerializer(serializers.Serializer):
    status = serializers.CharField(max_length=20)

class AssignTaskSerializer(serializers.Serializer):
    user_id = serializers.IntegerField()
