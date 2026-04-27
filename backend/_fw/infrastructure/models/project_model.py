from django.db import models

class ProjectModel(models.Model):
    name = models.CharField(max_length=200, verbose_name="プロジェクト名")
    description = models.TextField(blank=True, null=True, verbose_name="説明")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="作成日時")

    class Meta:
        db_table = 'projects'
        ordering = ['-created_at']
        verbose_name = "プロジェクト"
        verbose_name_plural = "プロジェクト"

    def __str__(self):
        return self.name
