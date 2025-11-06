from django.urls import path
from . import views

urlpatterns = [
    # Chatbot API
    path('', views.chatbot_api, name='chatbot_api'),
]
