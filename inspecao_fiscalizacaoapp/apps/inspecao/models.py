from django.db import models
from usuario.models import Usuario
from local_inspecao.models import Local_Inspecao


class Inspecao(models.Model):
    STATUS_CHOICES = [
        ("pendente", "Pendente"),
        ("concluida", "Concluída"),
        ("em_andamento", "Em Andamento"),
    ]

    data = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default="pendente")
    usuario = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, related_name="inspecoes"
    )
    local = models.ForeignKey(
        Local_Inspecao, on_delete=models.CASCADE, related_name="inspecoes"
    )

    def __str__(self):
        return f"Inspeção em {self.local.nome} por {self.usuario.nome} em {self.data}"
