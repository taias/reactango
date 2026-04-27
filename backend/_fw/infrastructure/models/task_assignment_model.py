from django.db import models
from .task_model import TaskModel
from .user_model import UserModel

class TaskAssignmentModel(models.Model):
    task = models.ForeignKey(TaskModel, on_delete=models.CASCADE, related_name='assignments', verbose_name="タスク")
    user = models.ForeignKey(UserModel, on_delete=models.CASCADE, related_name='assigned_tasks', verbose_name="ユーザー")
    assigned_at = models.DateTimeField(auto_now_add=True, verbose_name="アサイン日時")

    class Meta:
        db_table = 'task_assignments'
        unique_together = ('task', 'user')
        verbose_name = "タスクアサイン"
        verbose_name_plural = "タスクアサイン"

    def __str__(self):
        return f"{self.user.name} -> {self.task.title}"
