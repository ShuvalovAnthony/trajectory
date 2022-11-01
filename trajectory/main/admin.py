from django.contrib import admin
from .models import *



admin.site.register(Course)
admin.site.register(Theme)
admin.site.register(ThemeStatus)
admin.site.register(Step)
admin.site.register(StepStatus)
admin.site.register(Link)
admin.site.register(File)