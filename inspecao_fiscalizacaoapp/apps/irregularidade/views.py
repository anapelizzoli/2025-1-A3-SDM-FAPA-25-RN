from rest_framework import viewsets
from .models import Irregularidade
from .serializer import IrregularidadeSerializer


class IrregularidadeViewSet(viewsets.ModelViewSet):
    queryset = Irregularidade.objects.all()
    serializer_class = IrregularidadeSerializer
