from django.urls import path
from . import views

urlpatterns = [
    # AI Art
    path('test/', views.ai_art_endpoint, name='ai_art_test'),
    path('generate/', views.generate_ai_art, name='generate_ai_art'),

    # Wall Scanner
    path('recommend/', views.wall_scanner_recommend, name='wall_scanner_recommend'),
    path('status/', views.wall_scanner_status, name='wall_scanner_status'),
    path('send-email/', views.send_order_email, name='send_order_email'),
    path('subscribe/', views.subscribe_email, name='subscribe_email'),
    path('contact/', views.contact_message, name='contact_message'),
    
    # Orders
    path('orders/create/', views.send_order_email, name='create_order'),
]
