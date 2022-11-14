from django.contrib import admin
from django.urls import path, include, re_path

from main.views import *
from rest_framework import routers

router = routers.DefaultRouter() 
router.register(r'step', StepViewSet,) # basename if queryset changed
router.register(r'theme', ThemeViewSet)
router.register(r'course', CourseViewSet)
router.register(r'note', NoteViewSet)
router.register(r'stepstatus', StepStatusViewSet)
router.register(r'courseaccess', CourseAccessViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/v1/auth', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
]
