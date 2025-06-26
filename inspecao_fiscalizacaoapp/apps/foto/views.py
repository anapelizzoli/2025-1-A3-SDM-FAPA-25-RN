from rest_framework import viewsets
from .models import Foto
from .serializer import FotoSerializer


class FotoViewSet(viewsets.ModelViewSet):
    queryset = Foto.objects.all()
    serializer_class = FotoSerializer
