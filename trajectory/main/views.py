from rest_framework import viewsets, pagination
from .serializers import StepSerializer, ThemeSerializer, PlanSerializer
from .models import *
from .permissions import IsAdminOrReadOnly
from django.http.response import HttpResponse


class APIListPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all()
    serializer_class = StepSerializer
    permission_classes = ()
    pagination_class = APIListPagination


class ThemeViewSet(viewsets.ModelViewSet):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer
    permission_classes = ()
    pagination_class = APIListPagination


class PlanViewSet(viewsets.ModelViewSet):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    permission_classes = ()
    pagination_class = APIListPagination


def test(request):
    data = Step.objects.filter(category__name='Electronics')
    print(data)
    return HttpResponse('Test page')