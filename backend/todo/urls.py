from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import TaskViewSet, suggest_priority_and_deadline

router = DefaultRouter()
router.register(r'tasks', TaskViewSet, basename='task')

urlpatterns = router.urls + [
    path('suggest/', suggest_priority_and_deadline, name='suggest')
]
