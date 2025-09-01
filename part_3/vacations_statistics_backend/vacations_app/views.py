
from vacations_app.models import Vacation, Likes, Country
from datetime import datetime
from django.db.models import Count
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser


class VacationsStats(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request) -> Response:
        """
        Returns vacation statistics (past, ongoing, future).

        Args:
            request (Request): The HTTP request object.

        Returns:
            Response: JSON response with vacation statistics.
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
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request) -> Response:
        """
        Returns the total number of likes.

        Args:
            request (Request): The HTTP request object.

        Returns:
            Response: JSON response with total likes.
        """
        total_likes = Likes.objects.count()
        return Response({'total_likes': total_likes})


class LikesDistributionView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request) -> Response:
        """
        Retrieves the distribution of likes among countries.

        Args:
            request (Request): The HTTP request object.

        Returns:
            Response: JSON response with a list of countries and their like counts.
        """
        likes_distribution = Country.objects.annotate(
            likes_count=Count('vacation__likes')
        ).values('country_name', 'likes_count')
        return Response(list(likes_distribution))


class VacationsByPriceRangeView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request) -> Response:
        """
        Returns the number of vacations in different price ranges.

        Args:
            request (Request): The HTTP request object.

        Returns:
            Response: JSON response with vacation counts by price range.
        """
        price_ranges = {
            '0-3000': Vacation.objects.filter(price__range=(0, 3000)).count(),
            '3001-6000': Vacation.objects.filter(price__range=(3001, 6000)).count(),
            '6001-10000': Vacation.objects.filter(price__range=(6001, 10000)).count()
        }
        return Response(price_ranges)
