from rest_framework import viewsets, pagination
from .serializers import CourseSerializer, NoteSerializer, StepSerializer, ThemeSerializer
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
        return Response({'steps': [{"id": s.id, "title": s.title} for s in steps]})


class ThemeViewSet(viewsets.ModelViewSet):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer
    permission_classes = ()
    pagination_class = APIListPagination


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = ()
    pagination_class = APIListPagination


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = ()
    pagination_class = APIListPagination

    @action(methods=['get'], detail=True) # detailFalse - для списка
    def note_by_step(self, request, pk=None):
        notes = Note.objects.filter(step_id=pk) #pk категории стоит в url step/1/steps_by_theme/
        
        return Response({'notes': [n.note for n in notes]})


def test(request):
    data = Step.objects.filter(category__name='Electronics')
    print(data)
    return HttpResponse('Test page')