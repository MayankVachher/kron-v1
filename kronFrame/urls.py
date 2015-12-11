from django.conf.urls import url

from . import views

app_name = 'kronFrame'
urlpatterns = [
	url(r'^$', views.IndexView.as_view(), name='index'),
	url(r'^home/', views.HomeView.as_view(), name='home'),
]