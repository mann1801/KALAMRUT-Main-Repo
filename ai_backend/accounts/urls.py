from django.urls import path
from .views import signup_view, login_view, MyTokenObtainPairView, update_profile_view
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('signup/', signup_view, name='signup'),
    path('login/', login_view, name='login'),
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('update-profile/', update_profile_view, name='update_profile'),
]
