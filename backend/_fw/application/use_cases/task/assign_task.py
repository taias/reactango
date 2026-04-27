from dataclasses import dataclass
from _fw.application.base_use_case import BaseUseCase
from _fw.domain.repositories.task_repository import TaskRepository
from _fw.domain.repositories.user_repository import UserRepository

@dataclass
class AssignTaskInputDTO:
    task_id: int
    user_id: int

@dataclass
class AssignTaskOutputDTO:
    task_id: int
    success: bool

class AssignTaskUseCase(BaseUseCase[AssignTaskInputDTO, AssignTaskOutputDTO]):
    def __init__(self, task_repository: TaskRepository, user_repository: UserRepository):
        self.task_repository = task_repository
        self.user_repository = user_repository

    def execute(self, input_dto: AssignTaskInputDTO) -> AssignTaskOutputDTO:
        task = self.task_repository.find_by_id(input_dto.task_id)
        user = self.user_repository.find_by_id(input_dto.user_id)
        
        if not task or not user:
            return AssignTaskOutputDTO(task_id=input_dto.task_id, success=False)
            
        task.assign_user(user)
        self.task_repository.save(task)
        
        return AssignTaskOutputDTO(
            task_id=task.id,
            success=True
        )
