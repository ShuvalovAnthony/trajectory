from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic.base import TemplateView
from django.conf import settings
from django.conf.urls.static import static
from main.views import *
from rest_framework import routers
from landing.views import *

router = routers.DefaultRouter() 
router.register(r'step', StepViewSet,) # basename if queryset changed
router.register(r'theme', ThemeViewSet)
router.register(r'course', CourseViewSet)
router.register(r'note', NoteViewSet)
router.register(r'stepstatus', StepStatusViewSet)
router.register(r'courseaccess', CourseAccessViewSet)
router.register(r'lead', LeadViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls)),
    path('api/v1/auth', include('djoser.urls')),
    re_path(r'^auth/', include('djoser.urls.authtoken')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path('', TemplateView.as_view(template_name='main.html'), name='main'),
    path('__debug__/', include('debug_toolbar.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)