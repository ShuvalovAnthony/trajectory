from django.contrib import admin
from .models import *



class StepAdmin(admin.ModelAdmin):
    list_display = ('title', 'is_published', 'theme')
    list_filter = ('title', 'is_published', 'theme')

    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        for user in CustomUser.objects.all():
            try:
                stepstatus = StepStatus.objects.get(user=user, step=obj)
            except:
                stepstatus = StepStatus.objects.create(step=obj, user=user)
                stepstatus.save()
        return None


class NoteAdmin(admin.ModelAdmin):
    fields = ('note', 'user', 'step')
    list_display = ('note', 'user', 'step')
    list_filter = ('user', 'step')


class CourseAccessAdmin(admin.ModelAdmin):
    list_display = ('user', 'course', 'expire_date', 'full_access')
    list_filter = ('user', 'course', 'expire_date', 'full_access')


admin.site.register(CourseAccess, CourseAccessAdmin)
admin.site.register(Course)
admin.site.register(Theme)
admin.site.register(Step, StepAdmin)
admin.site.register(File)
admin.site.register(Note, NoteAdmin)
admin.site.register(StepStatus)