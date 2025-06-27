from django.db import models
from inspecao.models import Inspecao
from irregularidade.models import Irregularidade
from acao_corretiva.models import AcaoCorretiva
from foto.models import Foto


class ItemInspecao(models.Model):
    observacao = models.TextField()
    inspecao = models.ForeignKey(
        Inspecao, on_delete=models.CASCADE, related_name="itens"
    )
    irregularidade = models.ForeignKey(
        Irregularidade, on_delete=models.SET_NULL, null=True, blank=True
    )
    acao = models.ForeignKey(
        AcaoCorretiva, on_delete=models.SET_NULL, null=True, blank=True
    )
    foto = models.ForeignKey(Foto, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Item da Inspeção {self.inspecao.id}"
