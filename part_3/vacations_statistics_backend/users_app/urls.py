from django.urls import path
from .views import TotalUsersCountAPIView, LoginAPIView, LogoutAPIView, IsAuthenticatedView

urlpatterns = [
    path('users/total/', TotalUsersCountAPIView.as_view(),
         name='total_users_count'),
    path('users/login/', LoginAPIView.as_view(), name='user_login'),
    path('users/logout/', LogoutAPIView.as_view(), name='user_logout'),
    path('users/is-authenticated/',
         IsAuthenticatedView.as_view(), name='is_authenticated'),
]
