from abc import abstractmethod
from typing import List, Optional
from _fw.domain.base_repository import BaseRepository
from _fw.domain.entities.task import Task

class TaskRepository(BaseRepository[Task]):
    @abstractmethod
    def find_by_project(self, project_id: int) -> List[Task]:
        pass

    @abstractmethod
    def find_by_user(self, user_id: any) -> List[Task]:
        pass
