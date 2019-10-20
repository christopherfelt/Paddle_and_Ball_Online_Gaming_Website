from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.contrib.auth.decorators import login_required
from django.views.generic import TemplateView,DetailView, ListView
from .models import Game

# Create your views here.
def record_score(request):

    score = request.POST['score']

    try:
        game = Game.objects.create(
            user = request.user,
            score = score,
        )
        game.save()

        response = {
            'status':1,
            'message':'Game saved'
        }
    except Exception as e:
        response = {
            'status': 0,
            'message':'Something went wrong - ' + str(e)
        }
    return JsonResponse(response)

# def test_view(request):
#     if request.method == "GET":
#         template_name = ""

class GameHistory(ListView):
    model = Game
    template_name = "game/game_list.html"
    context_object_name = "game_list"
    queryset = Game.objects.order_by('-score')

class PlayerHistory(ListView):
    model = Game
    template_name = "game/player_list.html"
    context_object_name = "game_list"

    def get_queryset(self):
        queryset = super().get_queryset()
        return queryset.filter(user = self.kwargs['id'])


class GamePlay(TemplateView):
    template_name = "game/breakout_clone.html"
