from django.db import models

# Create your models here.
class Usuario(models.Model):
    nome = models.CharField(max_length=255)
    email=models.EmailField(unique=True)
    senha = models.CharField(max_length=255)
    tipo = models.CharField(max_length=50)

    def __str__(self):
        return self.nome

