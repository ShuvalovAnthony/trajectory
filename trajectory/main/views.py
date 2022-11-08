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
    page_size = 50
    page_size_query_param = 'page_size'
    max_page_size = 100


class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all()
    serializer_class = StepSerializer
    permission_classes = ()
    pagination_class = APIListPagination
    authentication_classes = (TokenAuthentication, BasicAuthentication)

    @action(methods=['get'], detail=True) # detailFalse - для списка
    def steps_by_theme(self, request, pk=None):
        steps = Step.objects.filter(theme_id=pk) #pk категории стоит в url step/1/steps_by_theme/
        return Response({'steps': [{"id": s.id, "title": s.title} for s in steps]})

    def retrieve(self, request, *args, **kwargs):
        try: # для запросов по апи
            token = request.headers["Authorization"].split()[1]
            user = Token.objects.get(key=token).user # юзер по токену из хэдеров
            step = Step.objects.get(pk=int(kwargs['pk'])) # step по pk из ссылки
            error = False
        except: # веб запросы - без фильтра по юзеру
            error = True
        
        if not error:
            try:
                step_status = StepStatus.objects.get(user=user, step=step) # статус для юзера и урока
                kwargs['status'] = step_status.status
            except:
                step_status = StepStatus.objects.create(user=user, step=step)
                step_status.save()
                kwargs['status'] = step_status.status
        else:
            kwargs['status'] = 'NS'
        return super().retrieve(request, *args, **kwargs)


class StepStatusViewSet(viewsets.ModelViewSet):
    queryset = StepStatus.objects.all()
    serializer_class = StepStatusSerializer
    permission_classes = ()
    pagination_class = APIListPagination
    authentication_classes = (TokenAuthentication, BasicAuthentication)


class ThemeViewSet(viewsets.ModelViewSet):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    pagination_class = APIListPagination
    authentication_classes = (TokenAuthentication, BasicAuthentication)


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = ()
    pagination_class = APIListPagination
    authentication_classes = (TokenAuthentication, BasicAuthentication)


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,) # IsAuthenticated, -если требуется токен   
    pagination_class = APIListPagination
    authentication_classes = (TokenAuthentication, BasicAuthentication)

    @action(methods=['get'], detail=True) # detailFalse - для списка
    def note_by_step(self, request, pk=None):
        try: # для запросов по апи
            token = request.headers["Authorization"].split()[1]
            user = Token.objects.get(key=token).user # юзер по токену из хэдеров
            notes = Note.objects.filter(step_id=pk, user=user) #pk категории стоит в url step/1/steps_by_theme/
        except: # веб запросы - без фильтра по юзеру
            notes = Note.objects.filter(step_id=pk)
        return Response({'notes': [{
            "id": n.id,
            "note": n.note,
            "user": n.user.id,
        }
            for n in notes]})