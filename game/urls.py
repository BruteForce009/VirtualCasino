from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='game-home'),
    path('rules/', views.rules, name='game-rules'),
    path('play/', views.play, name='game-play'),
    path('score/', views.score, name='game-score'),
]
