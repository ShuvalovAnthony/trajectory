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


class StepViewSet(viewsets.ModelViewSet):
    queryset = Step.objects.all()
    serializer_class = StepSerializer
    permission_classes = ()
    pagination_class = APIListPagination
    authentication_classes = (TokenAuthentication, BasicAuthentication)

    @action(methods=['get'], detail=True)  # detailFalse - для списка
    def steps_by_theme(self, request, pk=None):
        # pk категории стоит в url step/1/steps_by_theme/
        steps = Step.objects.filter(theme_id=pk)
        return Response({'steps': [{"id": s.id, "title": s.title} for s in steps]})

    @action(methods=['get'], detail=False)  # detailFalse - для списка
    def steps_by_theme_with_status(self, request):
        try:  # для запросов по апи
            token = request.headers["Authorization"].split()[1]
            # юзер по токену из хэдеров
            user = Token.objects.get(key=token).user
            steps_with_status = StepStatus.objects.filter(user=user)
        except:
            steps_with_status = StepStatus.objects.all()
        return Response({
            'steps': [
                {"step_status_id": s.id,
                 "step_id": s.step.id,
                 "title": s.step.title,
                 "status": s.status,
                 "theme_id": s.step.theme.id,
                 } for s in steps_with_status
            ]
        }
        )


class StepStatusViewSet(viewsets.ModelViewSet):
    queryset = StepStatus.objects.all()
    serializer_class = StepStatusSerializer
    permission_classes = ()
    pagination_class = APIListPagination
    authentication_classes = (TokenAuthentication, BasicAuthentication)

    @action(methods=['get'], detail=True)  # detailFalse - для списка
    def step_status_check(self, request, pk=None):
        try:  # для запросов по апи
            token = request.headers["Authorization"].split()[1]
            # юзер по токену из хэдеров
            user = Token.objects.get(key=token).user
            step_status = StepStatus.objects.get(user=user, step=pk)
        except:  # веб запросы - без фильтра по юзеру
            return Response({'error': 'Cant load data'})
        return Response({'step_id': pk, 'status': step_status.status, 'step_status_id': step_status.id})


class ThemeViewSet(viewsets.ModelViewSet):
    queryset = Theme.objects.all()
    serializer_class = ThemeSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    pagination_class = APIListPagination
    authentication_classes = (TokenAuthentication, BasicAuthentication)

    @action(methods=['get'], detail=True)  # detailFalse - для списка
    def theme_by_course(self, request, pk=None):
        # pk категории стоит в url theme/1/theme_by_course/
        themes = Theme.objects.filter(course_id=pk)
        return Response({'themes': [
            {
                "id": s.id,
                 "title": s.title,
                 "title_on_en": s.title_on_en,
                 "description": s.description,
                 "slug": s.slug,
                 "is_published": s.is_published,
                 "course": s.course_id,
            } for s in themes
            ]
            })


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = ()
    pagination_class = APIListPagination
    authentication_classes = (TokenAuthentication, BasicAuthentication)


class NoteViewSet(viewsets.ModelViewSet):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer
    # IsAuthenticated, -если требуется токен
    permission_classes = (IsAuthenticatedOrReadOnly,)
    pagination_class = APIListPagination
    authentication_classes = (TokenAuthentication, BasicAuthentication)

    @action(methods=['get'], detail=True)  # detailFalse - для списка
    def note_by_step(self, request, pk=None):
        try:  # для запросов по апи
            token = request.headers["Authorization"].split()[1]
            # юзер по токену из хэдеров
            user = Token.objects.get(key=token).user
            # pk категории стоит в url step/1/steps_by_theme/
            notes = Note.objects.filter(step_id=pk, user=user)
        except:  # веб запросы - без фильтра по юзеру
            notes = Note.objects.filter(step_id=pk)
        return Response({'notes': [{
            "id": n.id,
            "note": n.note,
            "user": n.user.id,
        }
            for n in notes]})


class CourseAccessViewSet(viewsets.ModelViewSet):
    queryset = CourseAccess.objects.all()
    serializer_class = CourseAccessSerializer
    permission_classes = (IsAuthenticatedOrReadOnly,)
    pagination_class = APIListPagination
    authentication_classes = (TokenAuthentication, BasicAuthentication)

    @action(methods=['get'], detail=True)  # detailFalse - для списка
    def access_check(self, request, pk=None):
        try:  # для запросов по апи
            token = request.headers["Authorization"].split()[1]
            # юзер по токену из хэдеров
            user = Token.objects.get(key=token).user
            course = Course.objects.get(pk=pk)
            access = CourseAccess.objects.get(user=user, course=course)
        except:  # веб запросы - без фильтра по юзеру
            return Response({'error': 'Cant load data'})
        return Response({"expire_date": access.expire_date, "full_access": access.full_access})