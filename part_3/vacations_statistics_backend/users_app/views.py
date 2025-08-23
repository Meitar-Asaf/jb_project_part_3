from django.contrib.auth import login
from django.urls import reverse_lazy
from typing import Dict, Any
from rest_framework.views import APIView
from rest_framework.request import Request
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated
# # Create your views here.


class TotalUsersCountAPIView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request: Request):
        """
        API view to return the count of registered users.
        """
        user_count = User.objects.count()
        return Response({'totalUsers': user_count})