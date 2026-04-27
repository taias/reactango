from enum import Enum
from datetime import datetime
from typing import List, Optional
from _fw.domain.base_entity import BaseEntity
from _fw.domain.entities.user import User


class TaskStatus(str, Enum):
    NOT_STARTED = 'NOT_STARTED'
    IN_PROGRESS = 'IN_PROGRESS'
    COMPLETED = 'COMPLETED'


class TaskPriority(str, Enum):
    LOW = 'LOW'
    MEDIUM = 'MEDIUM'
    HIGH = 'HIGH'


class Task(BaseEntity):
    def __init__(self, id=None, project_id: int = None, title: str = "", description: str = None,
                 status: TaskStatus = TaskStatus.NOT_STARTED, priority: TaskPriority = TaskPriority.MEDIUM,
                 due_date: datetime = None):
        super().__init__(id)
        self._project_id = project_id
        self._title = title
        self._description = description
        self._status = status
        self._priority = priority
        self._due_date = due_date
        self._assigned_users: List[User] = []

    @property
    def title(self) -> str:
        return self._title

    @property
    def description(self) -> Optional[str]:
        return self._description

    @property
    def status(self) -> TaskStatus:
        return self._status

    @property
    def priority(self) -> TaskPriority:
        return self._priority

    @property
    def project_id(self) -> Optional[int]:
        return self._project_id

    @property
    def due_date(self) -> Optional[datetime]:
        return self._due_date

    @property
    def assigned_users(self) -> List[User]:
        return self._assigned_users

    def update_status(self, new_status: TaskStatus):
        self._status = new_status
        self._update_timestamp()

    def assign_user(self, user: User):
        if not any(u.id == user.id for u in self._assigned_users):
            self._assigned_users.append(user)
            self._update_timestamp()

    def remove_user(self, user_id: any):
        self._assigned_users = [u for u in self._assigned_users if u.id != user_id]
        self._update_timestamp()

    @classmethod
    def create(cls, title: str, project_id: int = None, description: str = None,
               priority: TaskPriority = TaskPriority.MEDIUM, due_date: datetime = None):
        if not title:
            raise ValueError("Task title is required")
        return cls(id=None, project_id=project_id, title=title, description=description,
                   status=TaskStatus.NOT_STARTED, priority=priority, due_date=due_date)

    @classmethod
    def from_orm(cls, model, assigned_users: List[User] = None):
        task = cls(
            id=model.id,
            project_id=model.project_id,
            title=model.title,
            description=model.description,
            status=TaskStatus(model.status),
            priority=TaskPriority(model.priority),
            due_date=model.due_date
        )
        task._created_at = model.created_at
        task._updated_at = model.updated_at
        if assigned_users:
            task._assigned_users = assigned_users
        return task

    def to_dict(self):
        return {
            'id': self.id,
            'project_id': self.project_id,
            'title': self.title,
            'description': self.description,
            'status': self.status.value,
            'priority': self.priority.value,
            'due_date': self.due_date.isoformat() if self.due_date else None,
            'assigned_users': [u.to_dict() for u in self.assigned_users],
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
        }
