from rest_framework import viewsets
from .models import ItemInspecao
from .serializer import ItemInspecaoSerializer


class ItemInspecaoViewSet(viewsets.ModelViewSet):
    queryset = ItemInspecao.objects.all()
    serializer_class = ItemInspecaoSerializer
