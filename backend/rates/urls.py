from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import MIProductRateViewSet

router = DefaultRouter()
router.register(r"mi-product-rates", MIProductRateViewSet, basename="mi-product-rate")

urlpatterns = [path("", include(router.urls))]
