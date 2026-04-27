from _fw.domain.base_entity import BaseEntity

class Project(BaseEntity):
    def __init__(self, id=None, name: str = "", description: str = None):
        super().__init__(id)
        self._name = name
        self._description = description

    @property
    def name(self) -> str:
        return self._name

    @property
    def description(self) -> str:
        return self._description

    @classmethod
    def create(cls, name: str, description: str = None):
        if not name:
            raise ValueError("Project name is required")
        return cls(id=None, name=name, description=description)

    @classmethod
    def from_orm(cls, model):
        project = cls(id=model.id, name=model.name, description=model.description)
        project._created_at = model.created_at
        return project

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }
