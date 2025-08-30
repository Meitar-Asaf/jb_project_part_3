from django.urls import path
from .views import VacationsStats, LikesTotalView, LikesDistributionView, VacationsByPriceRangeView


urlpatterns = [path('vacations/stats/', VacationsStats.as_view(), name='status'),
               path('likes/total/', LikesTotalView.as_view(), name='likes_total'),
               path('likes/distribution/', LikesDistributionView.as_view(),
                    name='likes_distribution'),
               path('vacations/price_range/', VacationsByPriceRangeView.as_view(),
                    name='vacations_by_price_range'),
               ]
