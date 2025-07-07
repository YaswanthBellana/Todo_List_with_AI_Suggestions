from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Task
from .serializers import TaskSerializer
import datetime

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

# Dummy AI suggestion function (replace with real AI later)
def get_ai_suggestions(description):
    if "jog" in description.lower():
        return {
            "suggested_priority": "Low",
            "suggested_deadline": str(datetime.date.today() + datetime.timedelta(days=3))
        }
    return {
        "suggested_priority": "High",
        "suggested_deadline": str(datetime.date.today() + datetime.timedelta(days=1))
    }

@api_view(['POST'])
def suggest_priority_and_deadline(request):
    description = request.data.get("description", "")
    if not description:
        return Response({"error": "Description is required"}, status=status.HTTP_400_BAD_REQUEST)

    suggestions = get_ai_suggestions(description)
    return Response(suggestions, status=status.HTTP_200_OK)
