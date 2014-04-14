__author__ = 'ms'

from django.conf.urls import patterns, url
from ipfixapp import views

urlpatterns = patterns('',
	url(r'^(all)/$', views.process, name='ipfix.all'),
	url(r'^(get)/$',views.get_data,name='ipfix.get')
                       
                       )