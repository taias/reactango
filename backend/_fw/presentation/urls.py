"""
User API URLs
"""
from django.urls import path
from _fw.presentation.presenters.user_presenter import UserPresenter
from _fw.presentation.presenters.task_presenter import TaskListPresenter, TaskDetailPresenter, TaskAssignPresenter

urlpatterns = [
    path('users/', UserPresenter.as_view(), name='user-list'),
    path('users/<int:user_id>/', UserPresenter.as_view(), name='user-detail'),
    
    path('tasks/', TaskListPresenter.as_view(), name='task-list'),
    path('tasks/<int:task_id>/', TaskDetailPresenter.as_view(), name='task-detail'),
    path('tasks/<int:task_id>/assign/', TaskAssignPresenter.as_view(), name='task-assign'),
]
