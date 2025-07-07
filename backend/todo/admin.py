from django.contrib import admin
from .models import Task  # ✅ Correct: Import existing model

admin.site.register(Task)  # ✅ Register with admin panel
