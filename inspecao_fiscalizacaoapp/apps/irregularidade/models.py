from django.db import models


class Irregularidade(models.Model):
    tipo = models.CharField(max_length=100)
    descricao = models.TextField()

    def __str__(self):
        return self.tipo
