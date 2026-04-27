from typing import List, Optional
from _fw.domain.entities.task import Task
from _fw.domain.entities.user import User
from _fw.domain.repositories.task_repository import TaskRepository
from _fw.infrastructure.models.task_model import TaskModel
from _fw.infrastructure.models.task_assignment_model import TaskAssignmentModel


class DjangoTaskRepository(TaskRepository):
    def _map_to_entity(self, model: TaskModel) -> Task:
        assignments = TaskAssignmentModel.objects.filter(task=model).select_related('user')
        users = [User.from_orm(a.user) for a in assignments]
        return Task.from_orm(model, users)

    def find_by_id(self, id: any) -> Optional[Task]:
        try:
            model = TaskModel.objects.get(id=id)
            return self._map_to_entity(model)
        except TaskModel.DoesNotExist:
            return None

    def find_all(self) -> List[Task]:
        return [self._map_to_entity(m) for m in TaskModel.objects.all()]

    def _do_save(self, entity: Task) -> Task:
        model, _ = TaskModel.objects.update_or_create(
            id=entity.id,
            defaults={
                'project_id': entity.project_id,
                'title': entity.title,
                'description': entity.description,
                'status': entity.status.value,
                'priority': entity.priority.value,
                'due_date': entity.due_date,
            }
        )

        # Handle assignments
        current_user_ids = {u.id for u in entity.assigned_users}
        TaskAssignmentModel.objects.filter(task=model).exclude(user_id__in=current_user_ids).delete()
        for user in entity.assigned_users:
            TaskAssignmentModel.objects.get_or_create(task=model, user_id=user.id)

        return self._map_to_entity(model)

    def delete(self, id: any) -> bool:
        try:
            TaskModel.objects.get(id=id).delete()
            return True
        except TaskModel.DoesNotExist:
            return False

    def find_by_project(self, project_id: int) -> List[Task]:
        models = TaskModel.objects.filter(project_id=project_id)
        return [self._map_to_entity(m) for m in models]

    def find_by_user(self, user_id: any) -> List[Task]:
        assignments = TaskAssignmentModel.objects.filter(user_id=user_id).select_related('task')
        return [self._map_to_entity(a.task) for a in assignments]
