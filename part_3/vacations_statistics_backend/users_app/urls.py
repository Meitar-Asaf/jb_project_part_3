from django.urls import path
from .views import TotalUsersCountAPIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('users/total/', TotalUsersCountAPIView.as_view(), name='total_users_count'),
    path('users/login/', TokenObtainPairView.as_view(), name='user_login'),
    path('users/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

]