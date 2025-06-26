from django.db import models
from inspecao.models import Inspecao


class Documento(models.Model):
    titulo = models.CharField(max_length=255)
    tipo = models.CharField(max_length=100)
    arquivo = models.FileField(upload_to="documentos/")
    inspecao = models.ForeignKey(
        Inspecao, on_delete=models.CASCADE, related_name="documentos"
    )

    def __str__(self):
        return self.titulo
