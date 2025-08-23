from requests import Request
from vacations_app.models import Vacation, Likes, Country


from django.urls import reverse_lazy
from datetime import datetime
from django.http import HttpResponseForbidden
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated


class StaffuserRequiredMixin:
    def dispatch(self, request, *args, **kwargs):
        """
        Override the dispatch method to check if the user is a staff member.

        This method ensures that only staff members are allowed to access 
        this view. If the user is not a staff member, it returns an 
        HttpResponseForbidden.
        """
        # Check if the user is a staff member
        if not request.user.is_staff:
            # Deny access to non-staff members
            return HttpResponseForbidden("You are not allowed to access this page.")

        # Proceed with the standard dispatch method for staff members
        return super().dispatch(request, *args, **kwargs)


class VacationsStats(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):
        """
        Returns a response with the count of past, on going and future vacations.

        The response is a json object with the following structure:

        {
            'pastVacations': int,
            'ongoingVacations': int,
            'futureVacations': int
        }

        The count is based on the current date, and the start and end dates of the vacations.
        """
        
        queryset = Vacation.objects.all()
        today = datetime.now().date()
        count_past_vacations = queryset.filter(end_date__lt=today).count()
        count_future_vacations = queryset.filter(start_date__gt=today).count()
        count_on_going_vacations = queryset.filter(
            start_date__lte=today, end_date__gte=today).count()

        return Response({
            'pastVacations': count_past_vacations,
            'ongoingVacations': count_on_going_vacations,
            'futureVacations': count_future_vacations
        })

class LikesTotalView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):
        """
        Retrieves the total number of likes.

        Returns a JSON response containing a single integer with the total
        number of likes.
        """
        total_likes = Likes.objects.count()
        return Response({'total_likes': total_likes})


class LikesDistributionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request: Request):
        
        """
        Retrieves the distribution of likes among countries.

        Returns a JSON response containing a list of dictionaries where each
        dictionary contains the country name and the number of likes for that
        country.
        """
        likes_distribution = Country.objects.annotate(
            likes_count=Count('vacation__likes')
        ).values('country_name', 'likes_count')
        return Response(list(likes_distribution))
