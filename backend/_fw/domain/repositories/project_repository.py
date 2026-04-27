from abc import abstractmethod
from typing import List, Optional
from _fw.domain.base_repository import BaseRepository
from _fw.domain.entities.project import Project

class ProjectRepository(BaseRepository[Project]):
    @abstractmethod
    def find_by_name(self, name: str) -> Optional[Project]:
        pass
