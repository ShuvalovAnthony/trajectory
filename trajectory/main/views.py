from rest_framework import viewsets, pagination
from .serializers import StepSerializer, ThemeSerializer, PlanSerializer
from .models import *
from .permissions import IsAdminOrReadOnly
from django.http.response import HttpResponse
from rest_framework.decorators import action
from rest_framework.response import Response

class APIListPagination(pagination.PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all()
    serializer_class = StepSerializer
    permission_classes = ()
    pagination_class = APIListPagination

    @action(methods=['get'], detail=True) # detailFalse - для списка
    def steps_by_theme(self, request, pk=None):
        steps = Step.objects.filter(theme_id=pk) #pk категории стоит в url step/1/steps_by_theme/
        return Response({'steps': [{s.id: s.title} for s in steps]})


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