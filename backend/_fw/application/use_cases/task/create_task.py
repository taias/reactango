from dataclasses import dataclass
from typing import Optional
from datetime import datetime
from _fw.application.base_use_case import BaseUseCase
from _fw.domain.entities.task import Task, TaskPriority
from _fw.domain.repositories.task_repository import TaskRepository

@dataclass
class CreateTaskInputDTO:
    title: str
    project_id: Optional[int] = None
    description: Optional[str] = None
    priority: str = TaskPriority.MEDIUM.value
    due_date: Optional[datetime] = None

@dataclass
class CreateTaskOutputDTO:
    task_id: int
    title: str
    status: str

class CreateTaskUseCase(BaseUseCase[CreateTaskInputDTO, CreateTaskOutputDTO]):
    def __init__(self, task_repository: TaskRepository):
        self.task_repository = task_repository

    def execute(self, input_dto: CreateTaskInputDTO) -> CreateTaskOutputDTO:
        priority = TaskPriority(input_dto.priority)
        task = Task.create(
            title=input_dto.title,
            project_id=input_dto.project_id,
            description=input_dto.description,
            priority=priority,
            due_date=input_dto.due_date
        )
        saved_task = self.task_repository.save(task)
        return CreateTaskOutputDTO(
            task_id=saved_task.id,
            title=saved_task.title,
            status=saved_task.status.value
        )
