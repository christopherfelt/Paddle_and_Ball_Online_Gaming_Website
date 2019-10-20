from django.db import models
from django.contrib.auth import get_user_model
from datetime import datetime
from django.urls import reverse_lazy, reverse

User = get_user_model()

# Create your models here.
class Posts(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    post_text = models.TextField()
    time = models.DateTimeField(auto_now=True)
    # def save(self, *args, **kwargs):
    #     self.time = datetime.now()
    #     super(Posts, self).save()

    def get_absolute_url(self):
        return reverse('posts:post_list')

    def __str__(self):
        return self.title