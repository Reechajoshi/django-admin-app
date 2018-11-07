from django.conf.urls import patterns, include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'gateway.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^$', 'mainapp.views.home', name='home'),
	url(r'^status/$', 'mainapp.views.status', name='status'),
    url(r'^network/$', 'mainapp.views.network', name='network'),
    url(r'^getStatus/$', 'mainapp.views.getStatus', name='getStatus'),
    # url(r'^getNetworkHTML/$', 'mainapp.views.getNetworkHTML', name='getNetworkHTML'),
    url(r'^getWorking/$', 'mainapp.views.getMyWorking', name='getMyWorking'),
    url(r'^testLink/$', 'mainapp.views.testLink', name='testLink'),
    url(r'^useSubprocess/$', 'mainapp.views.useSubprocess', name='useSubprocess'),
    url(r'^usePOPEN/$', 'mainapp.views.usePOPEN', name='usePOPEN'),
    url(r'^getMemoryInfo/$', 'mainapp.views.getStatus', name='getStatus'),
    #url(r'^saveInterfaces/$', 'mainapp.views.getSaveInterfaces', name='getSaveInterfaces'),
    
    #includeJs
    url(r'^js/', 'mainapp.views.internalJS', name='internalJS'),
    
    # #networking check
    url(r'^getNetworks/$', 'mainapp.views.getNetworks', name='getNetworkIfcDetails'),
    url(r'^saveInterfaces/$', 'mainapp.views.saveInterfaces', name='saveInterfaces'),
    url(r'^testconf/$', 'mainapp.views.testconf', name='testconf'), 
    url(r'^getDHCPActiveUsers/$', 'mainapp.views.getDHCPActiveUsers', name='getDHCPActiveUsers'), 
) + static(settings.STATIC_URL , document_root=settings.STATIC_ROOT)
