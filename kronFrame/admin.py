from django.contrib import admin

from .models import Course, Offered

# Register your models here.
admin.site.register(Course)
admin.site.register(Offered)