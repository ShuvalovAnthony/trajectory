from rest_framework import viewsets, pagination
from .serializers import *
from .models import *
from .permissions import IsAdminOrReadOnly
from django.http.response import HttpResponse
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.authtoken.models import Token


class APIListPagination(pagination.PageNumberPagination):
    page_size = 100
    page_size_query_param = 'page_size'
    max_page_size = 100


class LeadViewSet(viewsets.ModelViewSet):
    queryset = Lead.objects.all()
    serializer_class = LeadSerializer
    permission_classes = ()
    pagination_class = APIListPagination
    authentication_classes = (TokenAuthentication, BasicAuthentication)

