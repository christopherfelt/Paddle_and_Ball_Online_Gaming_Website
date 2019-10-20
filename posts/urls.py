from django.urls import path

from .import views

app_name = 'posts'

urlpatterns = [

    path('create_post/', views.PostCreateView.as_view(), name = 'create_post'),
    path('post_list/', views.PostListView.as_view(), name= 'post_list'),

]