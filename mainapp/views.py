# from django.shortcuts import render
# import logging

# from django.http import QueryDict
# from django.http import HttpResponse


from django.views.decorators.csrf import csrf_exempt

from django.shortcuts import render

import logging
from django.http import QueryDict
from django.http import HttpResponse
from django.http import HttpResponseNotFound
from django.http import HttpResponseRedirect

from helper import *
from models import *
#from network_interface_funcs import *
from networkinterface import *

import os
import json
import psutil
import json
# working class



#import conf_helper

logger = logging.getLogger(__name__)

def decodeJson(req):
    try:
        return json.loads(req)
    except:
        logger.debug("decodeJson Failed for : %s" % req)
    return False

def myfunction():
    logger.debug("this is a debug message!")
 
def myotherfunction():
    logger.error("this is an error message!!")
	
def home(request):
    return render( request, "ui/home.html")

def status(request):
    return render( request, "ui/status.html" , { 'request' : request } )
 
def network(request):
    return render( request, "ui/network.html" , { 'request' : request }  )

# Test Link
def testLink(request):
    # res = config_test.testDB()
    
    # html = "<html><body>Interface Values :  interface_mask => " + res['interface_mask'] + " <br> interface_broadcast =>  " + res['interface_broadcast'] + " <br> interface_type =>  " + res['interface_type'] + " <br> interface_name =>  " + res['interface_name'] + " <br> interface_address =>  " + res['interface_address'] + " <br> interface_gateway =>  " + res['interface_gateway'] + " </body></html>" 
    
    config_test.testCameraTable()
    html = "<html><body>Adding Camera Details... </body></html>" 
    
    return HttpResponse(html)
    
def useSubprocess(request):
    my_string = config_test.useSubprocess()
    
    html = "<html><body>String returned from script: " + str( my_string ) + " </body></html>" 
    
    return HttpResponse(html)
    
def usePOPEN(request):
    my_string = config_test.usePOPEN()
    
    html = "<html><body>String returned from script: " + str( my_string ) + " </body></html>" 
    
    return HttpResponse(html)
    
def internalJS(request):
    if request.GET.get('request') == 'status':
        return render( request, "js/status.js" )
    elif request.GET.get('request') == 'network':
        return render( request, "js/network.js" )
    elif request.GET.get('request') == 'base':
        return render( request, "js/base.js")
    else:
        return HttpResponseNotFound('<h1>Page not found</h1>')
       
@csrf_exempt       
def getStatus(request):
    #return createJsonResponse(getMemCpuInfo())
    response = dict(response=False)
    #myJson = get_dhcp_active_leases()
    
    return createJsonResponse(getMemoryInfo())
   #response = dict(response=get_dhcp_active_leases())
   # return createJsonResponse(response)
    
def getMyWorking(request):
    addInterface("lan","192.168.6.1", "255.255.255.0","192.168.6.255", "192.168.6.1", "eth1")
    addInterface("internet","192.168.12.10", "255.255.255.0","192.168.12.255", "192.168.12.1", "eth3")
    #updateInterface("internet","192.168.122.10", "255.255.255.0","192.168.122.255", "192.168.122.1", "eth33" , True)
    return createJsonResponse(dict(name="lan"))

@csrf_exempt
def saveInterfaces( request ):
    logger.debug(request)
    interfacedetails = {}
    if request.method == 'POST':
        j = decodeJson(request.POST.get('request'))
        if j:
            interfacedetails = j['interface']
            interfacesetting = j['interface_setting']
            interfacetype = j['interface_type']
        add = interfacedetails[ 'address' ]
        mask = interfacedetails[ 'mask' ]
        broadcast = interfacedetails[ 'broadcast' ]
        
        saveNetworkInterfaces( add , mask, broadcast , interfacetype )

    return createJsonResponse(dict(name=interfacetype))

@csrf_exempt
def getNetworks(request):
    #return createJsonResponse(dict(getInterfacesFromDB('lan')))
    logger.debug(request)
    if request.method == 'POST':
        j = decodeJson(request.POST.get('request'))
        if j:
            interface_type = j['interface_type']
            
        return createJsonResponse(dict(getInterfacesFromDB(interface_type)))

@csrf_exempt
def getDHCPActiveUsers(request):
    return createJsonResponse(dict(response=getDHCPUsersFromDB()))
    

#test delete afterwards
def testconf(request):
	return createJsonResponse(dict(name="lan"))
    