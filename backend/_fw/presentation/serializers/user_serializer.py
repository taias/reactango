"""
User Serializers
ユーザー関連のシリアライザ
"""
from rest_framework import serializers


class CreateUserSerializer(serializers.Serializer):
    """ユーザー作成リクエストのシリアライザ"""
    name = serializers.CharField(max_length=100, required=True)
    email = serializers.EmailField(required=True)
    favorite_food = serializers.CharField(max_length=100, required=False, allow_blank=True)


class UserSerializer(serializers.Serializer):
    """ユーザーレスポンスのシリアライザ"""
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    favorite_food = serializers.CharField(max_length=100, allow_blank=True, allow_null=True)
    created_at = serializers.DateTimeField(read_only=True)
    updated_at = serializers.DateTimeField(read_only=True)


class UpdateUserSerializer(serializers.Serializer):
    """ユーザー更新リクエストのシリアライザ"""
    name = serializers.CharField(max_length=100, required=False)
    email = serializers.EmailField(required=False)
    favorite_food = serializers.CharField(max_length=100, required=False, allow_blank=True)
