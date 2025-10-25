"""
Framework App Configuration
"""
from django.apps import AppConfig


class FwConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = '_fw'
    verbose_name = 'Framework Layer'
