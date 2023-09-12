from django.db import models
from django.contrib.auth.models import User


class ScorePost(models.Model):
    score = models.IntegerField(default=0)
    author = models.ForeignKey(User, on_delete=models.CASCADE, primary_key=True)

    def __str__(self):
        return f"{self.author} + ' ' +{self.score}"


"""
class User(models.Model):
    username = models.CharField(max_length=15)
    score = models.IntegerField()

    def __str__(self):
        return self.username
"""
