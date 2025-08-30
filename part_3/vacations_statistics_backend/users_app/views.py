

import logging
from rest_framework.permissions import IsAdminUser
from django.contrib.auth import login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authentication import SessionAuthentication


# # Create your views here.


class TotalUsersCountAPIView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        """
        API view to return the count of registered users.
        """
        user_count = User.objects.count()
        return Response({'totalUsers': user_count})


class LogoutAPIView(APIView):
    # No permission_classes: allow anyone to POST logout (idempotent)

    def post(self, request):
        logout(request)
        response = Response({'message': 'Logout successful'})
        response.delete_cookie('sessionid', path="/")
        response.delete_cookie('csrftoken', path="/")
        return response


class LoginAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            if not user.is_staff:
                return Response({'error': 'You do not have permission to access this resource.'}, status=403)
            login(request, user)
            # Ensure sessionid cookie is set by touching the session
            request.session['init'] = True
            return Response({
                'message': 'Login successful',
                'user': {
                    'username': user.username,
                    'email': user.email,
                    'first_name': user.first_name,
                    'last_name': user.last_name,
                }
            })
        return Response({'error': 'Invalid credentials'}, status=401)


class IsAuthenticatedView(APIView):
    authentication_classes = [SessionAuthentication]
    permission_classes = []

    def get(self, request):
        """
        API view to check if the user is authenticated.

        Returns a JSON response with 'isAuthenticated' field,
        having the value True if the user is authenticated,
        and False otherwise.
        """
        return Response({'isAuthenticated': request.user.is_authenticated})
