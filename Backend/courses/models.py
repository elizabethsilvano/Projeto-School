from django.db import models

class Students(models.Model):
  course_choices = (
    ('Django', 'Django'),
    ('Python', 'Python'),
    ('Ruby', 'Ruby'),
    ('Vue.js', 'Vue.js'),
  )

  name = models.CharField(max_length=100)
  course = models.CharField(max_length=6, choices=course_choices, default='Python')
  status = models.BooleanField(default=True)
  date = models.DateTimeField(auto_now_add=True)
  number = models.IntegerField()

  def __str__(self):
    return self.name
