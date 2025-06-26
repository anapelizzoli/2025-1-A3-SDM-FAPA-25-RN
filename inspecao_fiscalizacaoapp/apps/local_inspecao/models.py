from django.db import models


# Create your models here.
class Local_Inspecao(models.Model):
    nome = models.CharField(max_length=255)
    endereco = models.TextField()
    tipo = models.CharField(max_length=100)

    def __str__(self):
        return self.nome
