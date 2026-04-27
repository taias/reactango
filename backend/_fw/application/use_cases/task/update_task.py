from dataclasses import dataclass
from _fw.application.base_use_case import BaseUseCase
from _fw.domain.entities.task import TaskStatus
from _fw.domain.repositories.task_repository import TaskRepository

@dataclass
class UpdateTaskInputDTO:
    task_id: int
    status: str

@dataclass
class UpdateTaskOutputDTO:
    task_id: int
    status: str
    success: bool

class UpdateTaskUseCase(BaseUseCase[UpdateTaskInputDTO, UpdateTaskOutputDTO]):
    def __init__(self, task_repository: TaskRepository):
        self.task_repository = task_repository

    def execute(self, input_dto: UpdateTaskInputDTO) -> UpdateTaskOutputDTO:
        task = self.task_repository.find_by_id(input_dto.task_id)
        if not task:
            return UpdateTaskOutputDTO(task_id=input_dto.task_id, status="", success=False)
            
        new_status = TaskStatus(input_dto.status)
        task.update_status(new_status)
        
        saved_task = self.task_repository.save(task)
        
        return UpdateTaskOutputDTO(
            task_id=saved_task.id,
            status=saved_task.status.value,
            success=True
        )
