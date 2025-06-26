from django.db import models


class AcaoCorretiva(models.Model):
    descricao = models.TextField()
    prazo = models.DateField()

    def __str__(self):
        return f"{self.descricao[:30]}..."
