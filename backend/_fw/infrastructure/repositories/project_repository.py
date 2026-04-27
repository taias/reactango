from typing import List, Optional
from _fw.domain.entities.project import Project
from _fw.domain.repositories.project_repository import ProjectRepository
from _fw.infrastructure.models.project_model import ProjectModel


class DjangoProjectRepository(ProjectRepository):
    def find_by_id(self, id: any) -> Optional[Project]:
        try:
            model = ProjectModel.objects.get(id=id)
            return Project.from_orm(model)
        except ProjectModel.DoesNotExist:
            return None

    def find_all(self) -> List[Project]:
        return [Project.from_orm(m) for m in ProjectModel.objects.all()]

    def _do_save(self, entity: Project) -> Project:
        model, _ = ProjectModel.objects.update_or_create(
            id=entity.id,
            defaults={
                'name': entity.name,
                'description': entity.description,
            }
        )
        return Project.from_orm(model)

    def delete(self, id: any) -> bool:
        try:
            ProjectModel.objects.get(id=id).delete()
            return True
        except ProjectModel.DoesNotExist:
            return False

    def find_by_name(self, name: str) -> Optional[Project]:
        try:
            model = ProjectModel.objects.get(name=name)
            return Project.from_orm(model)
        except ProjectModel.DoesNotExist:
            return None
