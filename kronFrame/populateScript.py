from models import Course, Offered
TIME_CHOICES = ["08:00","08:30","09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","01:00","01:30","02:00","02:30","03:00","03:30","04:00","04:30","05:00","05:30"]
def populate(line):
	overall = line.split('#')
	forCourses = overall[0].strip().split(',')
	y = [y.strip() for y in overall[1].strip().split('$')]
	c = Course(course_name=forCourses[0], course_ID=forCourses[1], course_acronym=forCourses[2], course_credits=int(forCourses[3]))
	c.save()
	c = Course.objects.get(pk=c.pk)
	for x in y:
		temp = [e.strip() for e in x.split(',')]
		c.offered_set.create(class_day=temp[0],start_time=str(1+TIME_CHOICES.index(temp[1])),end_time=str(1+TIME_CHOICES.index(temp[2])))