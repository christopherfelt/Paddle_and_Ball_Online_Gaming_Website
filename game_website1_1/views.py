from django.views.generic.base import TemplateView


class Homepage(TemplateView):
    template_name = "index.html"

class Logout(TemplateView):
    template_name = "registration/logged_out.html"
