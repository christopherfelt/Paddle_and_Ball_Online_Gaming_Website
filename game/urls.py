from django.urls import path
from .views import record_score
from .views import GameHistory, GamePlay, PlayerHistory
from django.conf import settings
from django.conf.urls.static import static

app_name = 'game'

urlpatterns = [

    path('game_history/', GameHistory.as_view(), name = "game_history"),
    path('previous_scores/<id>/', PlayerHistory.as_view(), name = "player_history"),
    path('game_play/', GamePlay.as_view(), name = "game_play" ),
    path('record_score', record_score, name = "record_score")

] + static(settings.STATIC_URL, document_root = settings.STATIC_ROOT)