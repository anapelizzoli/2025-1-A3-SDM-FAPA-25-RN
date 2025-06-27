from django.shortcuts import render
from .models import Local_Inspecao
from rest_framework import viewsets
from .serializer import Local_InspecaoSerializer


# Create your views here.
class Local_InspecaoViewSet(viewsets.ModelViewSet):
    queryset = Local_Inspecao.objects.all()
    serializer_class = Local_InspecaoSerializer
