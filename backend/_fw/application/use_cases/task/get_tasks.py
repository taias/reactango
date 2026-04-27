from dataclasses import dataclass
from typing import List, Optional
from _fw.application.base_use_case import BaseUseCase
from _fw.domain.repositories.task_repository import TaskRepository

@dataclass
class GetTasksInputDTO:
    project_id: Optional[int] = None

@dataclass
class GetTasksOutputDTO:
    tasks: List[dict]

class GetTasksUseCase(BaseUseCase[GetTasksInputDTO, GetTasksOutputDTO]):
    def __init__(self, task_repository: TaskRepository):
        self.task_repository = task_repository

    def execute(self, input_dto: GetTasksInputDTO) -> GetTasksOutputDTO:
        if input_dto.project_id:
            tasks = self.task_repository.find_by_project(input_dto.project_id)
        else:
            tasks = self.task_repository.find_all()
            
        return GetTasksOutputDTO(tasks=[task.to_dict() for task in tasks])
