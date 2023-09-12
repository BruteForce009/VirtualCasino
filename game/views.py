from django.shortcuts import render, redirect
# from django.http import HttpResponse
from django.contrib.auth.forms import UserCreationForm
# from django.contrib.auth.decorators import login_required
# from .models import ScorePost


def home(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            print(username)
            # return redirect('game-rules')
    else:
        form = UserCreationForm()
    return render(request, 'game/home.html', {'form': form})
    # returns HttpResponse in background
    # return HttpResponse('<h1>Blog Home</h1>')


def rules(request):
    return render(request, 'game/rules.html')


def play(request):
    return render(request, 'game/BlackJack.html')


def score(request):
    users = ["a", "b", "c"]
    return render(request, 'game/score.html', {'users': users})  # template context
