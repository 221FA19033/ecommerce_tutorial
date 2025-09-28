from django.contrib import admin
from django.urls import path, include
from rest_framework.authtoken.views import obtain_auth_token

from django.views.generic import TemplateView
from django.urls import re_path



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('products.urls')),  # Replace with your actual app name
     path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
       re_path(r'^(?:.*)/?$', TemplateView.as_view(template_name="index.html")),
]
