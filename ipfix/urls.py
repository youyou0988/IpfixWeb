from django.conf.urls import patterns, include, url
import settings
# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'ipfix.views.home', name='home'),
    # url(r'^ipfix/', include('ipfix.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),
    url(r'^ipfix/',include('ipfixapp.urls')),
    url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {'document_root':settings.MEDIA_ROOT})
    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)
