from django.db import models

class Exam(models.Model):
    titulo = models.CharField(max_length=120)
    curso = models.CharField(max_length=100)
    fecha = models.DateField()
    puntaje = models.IntegerField(default=20)

    def __str__(self):
        return self.titulo
