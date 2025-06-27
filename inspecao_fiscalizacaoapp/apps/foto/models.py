from django.db import models


class Foto(models.Model):
    legenda = models.CharField(max_length=255)
    caminho = models.ImageField(upload_to="fotos/")

    def __str__(self):
        return self.legenda
