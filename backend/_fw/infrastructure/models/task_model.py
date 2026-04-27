from django.db import models
from .project_model import ProjectModel

class TaskModel(models.Model):
    class Status(models.TextChoices):
        NOT_STARTED = 'NOT_STARTED', '未着手'
        IN_PROGRESS = 'IN_PROGRESS', '進行中'
        COMPLETED = 'COMPLETED', '完了'

    class Priority(models.TextChoices):
        LOW = 'LOW', '低'
        MEDIUM = 'MEDIUM', '中'
        HIGH = 'HIGH', '高'

    project = models.ForeignKey(ProjectModel, on_delete=models.CASCADE, related_name='tasks', verbose_name="プロジェクト", null=True, blank=True)
    title = models.CharField(max_length=200, verbose_name="タイトル")
    description = models.TextField(blank=True, null=True, verbose_name="説明")
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.NOT_STARTED, verbose_name="ステータス")
    priority = models.CharField(max_length=20, choices=Priority.choices, default=Priority.MEDIUM, verbose_name="優先度")
    due_date = models.DateTimeField(blank=True, null=True, verbose_name="期限")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="作成日時")
    updated_at = models.DateTimeField(auto_now=True, verbose_name="更新日時")

    class Meta:
        db_table = 'tasks'
        ordering = ['-created_at']
        verbose_name = "タスク"
        verbose_name_plural = "タスク"

    def __str__(self):
        return self.title
