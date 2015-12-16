from django.shortcuts import render
from django.views import generic
from collections import OrderedDict

from .models import Offered
from pprint import pprint

class IndexView(generic.ListView):
	template_name = 'kronFrame/index.html'
	context_object_name = 'courseList'

	def get_queryset(self):
		courseList = {}
		for x in Offered.objects.all():
			if x.course not in courseList: courseList[x.course] = [x]
			else: courseList[x.course].append(x)
		print courseList
		return courseList

class HomeView(generic.ListView):
	template_name = 'kronFrame/home.html'
	context_object_name = 'dataSet'

	def get_queryset(self):
		dataSet = {}
		dataSet['table'] = OrderedDict([('Mon',OrderedDict()),('Tue',OrderedDict()),('Wed',OrderedDict()),('Thu',OrderedDict()),('Fri',OrderedDict()),('Sat',OrderedDict())])
		dataSet['ourDays'] = dict([('Mon',"Monday"),('Tue',"Tuesday"),('Wed',"Wednesday"),('Thu',"Thursday"),('Fri',"Friday"),('Sat',"Saturday")])
		dataSet['choice'] = set()
		dataSet['times'] = [" "]
		for x in range(1,len(Offered.TIME_CHOICES)):
			dataSet['times'].append(Offered.TIME_CHOICES[x][1])
		for day in dataSet['table'].keys():
			for seg in range(20):
				dataSet['table'][day][seg+2] = []
		for x in Offered.objects.all():
			for allSeg in range(int(x.start_time),int(x.end_time)):
				if(x.course.course_acronym not in dataSet['table'][x.class_day][allSeg]):
					x.woah = ""
					for y in x.callSign.all():
						dataSet['choice'].add(y.sign)
						x.woah += y.sign+" "
					dataSet['table'][x.class_day][allSeg].append(x)
		dataSet['choice'] = sorted(list(dataSet['choice']))
		pprint(dataSet['choice'])
		return dataSet