"""
User ORM Model
ユーザーのDjangoモデル
"""
from django.db import models


class UserModel(models.Model):
    """ユーザーのORMモデル"""
    
    name = models.CharField(max_length=100, verbose_name="名前")
    email = models.EmailField(unique=True, verbose_name="メールアドレス")
    favorite_food = models.CharField(max_length=100, blank=True, null=True, verbose_name="好きな食べ物")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="作成日時")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新日時")

    class Meta:
        db_table = 'users'
        ordering = ['-created_at']
        verbose_name = "ユーザー"
        verbose_name_plural = "ユーザー"

    def __str__(self):
        return f"{self.name} ({self.email})"
