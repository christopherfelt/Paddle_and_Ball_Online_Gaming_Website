from django.db import models
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your models here.
class Game(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    score = models.IntegerField()
    time = models.DateTimeField(auto_now=True)

    # def __str__(self):
    #     return self.score
