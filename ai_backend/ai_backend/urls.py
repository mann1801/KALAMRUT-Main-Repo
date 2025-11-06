from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse

def root_view(request):
    return JsonResponse({
        "message": "Welcome to the AI Art API!",
        "endpoints": [
            "/api/ai-art/test/",
            "/api/ai-art/generate/",
            "/api/wall-scanner/recommend/",
            "/api/wall-scanner/status/",
            "/api/orders/",
            "/api/chatbot/",
            "/api/auth/signup/",
            "/api/auth/login/"
        ]
    })

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/ai-art/', include('ai_app.urls')),  # Include AI app URLs
    path('api/wall-scanner/', include('ai_app.urls')),  # Wall scanner endpoints
    path('api/orders/', include('ai_app.urls')),  # Orders API
    path('api/chatbot/', include('ai_app.chatbot_urls')),  # Chatbot API
    path('api/auth/', include('accounts.urls')),  # Auth endpoints
    path('', root_view),  # Root welcome message
]