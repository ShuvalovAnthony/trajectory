from django.contrib import admin
from django.urls import path, include, re_path

from main.views import StepViewSet, ThemeViewSet, PlanViewSet, test
from rest_framework import routers

router = routers.DefaultRouter() 
router.register(r'step', StepViewSet)
router.register(r'theme', ThemeViewSet)
router.register(r'plan', PlanViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/v1/auth', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('test/', test, name='test'),
]
