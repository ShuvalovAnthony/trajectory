from django.contrib import admin
from .models import *



class StepAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        super().save_model(request, obj, form, change)
        for user in CustomUser.objects.all():
            try:
                stepstatus = StepStatus.objects.get(user=user, step=obj)
            except:
                stepstatus = StepStatus.objects.create(step=obj, user=user)
                stepstatus.save()
        return None


admin.site.register(Course)
admin.site.register(Theme)
admin.site.register(Step, StepAdmin)
admin.site.register(File)
admin.site.register(Note)
admin.site.register(StepStatus)