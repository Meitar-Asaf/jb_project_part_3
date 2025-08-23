from django.urls import path
from .views import VacationsStats, LikesTotalView, LikesDistributionView


urlpatterns = [path('vacations/stats/', VacationsStats.as_view(), name='status'),
               path('likes/total/', LikesTotalView.as_view(), name='likes_total'),
               path('likes/distribution/', LikesDistributionView.as_view(),
                    name='likes_distribution'),
               ]
