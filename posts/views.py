from django.shortcuts import render
from django.views.generic import TemplateView, CreateView, DetailView, ListView
from django.urls import reverse_lazy

from .models import Posts
from .forms import PostForm

# Create your views here.
class PostListView(ListView):
    template_name = 'post_list.html'
    model = Posts
    context_object_name = 'post_list'
    queryset = Posts.objects.all()


class PostCreateView(CreateView):
    template_name = 'post_create.html'
    model = Posts
    form_class = PostForm


    def form_valid(self, form):
        self.object = form.save(commit=False)
        self.object.user = self.request.user
        self.object.save()
        return super().form_valid(form)



