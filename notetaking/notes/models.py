from django.db import models


class Notes(models.Model):
    title = models.CharField(max_length=70, blank=False, default='')
    description = models.CharField(max_length=500,blank=False, default='')
   