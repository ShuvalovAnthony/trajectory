from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import UserRegistrationForm, UserProfileUpdateForm
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    add_form = UserRegistrationForm
    form = UserProfileUpdateForm
    model = CustomUser
    list_display = ('pk', 'email', 'is_staff', 'is_active', 'first_name', 'phone')
    list_filter = ('email', 'is_staff', 'is_active', 'first_name', 'phone')
    list_display_links = ('pk', 'email', 'is_staff', 'is_active', 'first_name', 'phone')
    fieldsets = (
        (None, {'fields': (
            'nickname', 'email', 'password', 'school', 'first_name', 'middle_name',
            'last_name', 'status', 'bio', 'phone')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'groups')}),
        ('Group Permissions', {
            'fields': ('user_permissions',)
        }),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'is_staff', 'is_active')}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)


admin.site.register(CustomUser, CustomUserAdmin)
