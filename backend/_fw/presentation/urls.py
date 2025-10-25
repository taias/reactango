"""
User API URLs
"""
from django.urls import path
from _fw.presentation.presenters.user_presenter import UserPresenter

urlpatterns = [
    path('users/', UserPresenter.as_view(), name='user-list'),
    path('users/<int:user_id>/', UserPresenter.as_view(), name='user-detail'),
]
