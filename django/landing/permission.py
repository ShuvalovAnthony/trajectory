from rest_framework import permissions
from rest_framework.authtoken.models import Token


class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        try:
            token = request.headers["Authorization"].split()[1]
            user = Token.objects.get(key=token).user
            return user.is_staff
        except:
            if request.method in permissions.SAFE_METHODS:
                return True
            return False
        