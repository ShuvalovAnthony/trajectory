from rest_framework import viewsets, pagination
from .serializers import *
from .models import *
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework import permissions


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