from rest_framework import viewsets
from .models import AcaoCorretiva
from .serializer import AcaoCorretivaSerializer


class AcaoCorretivaViewSet(viewsets.ModelViewSet):
    queryset = AcaoCorretiva.objects.all()
    serializer_class = AcaoCorretivaSerializer
