from rest_framework import viewsets
from .models import Documento
from .serializer import DocumentoSerializer


class DocumentoViewSet(viewsets.ModelViewSet):
    queryset = Documento.objects.all()
    serializer_class = DocumentoSerializer
