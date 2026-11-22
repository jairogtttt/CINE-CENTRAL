from rest_framework import viewsets
from .models import Exam
from .serializers import ExamSerializer

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all().order_by("-id")
    serializer_class = ExamSerializer
