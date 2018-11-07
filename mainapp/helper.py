from django.shortcuts import render
from django.http import HttpResponse
from models import *
import pickle
import json
import tailer


import datetime,time
import psutil


import networkinterface.network_interface_funcs 

#currently commenting the stuff
#from backend.conf_helper import *
#from conf_helper import *

#import helper.conf_helper
# import helper.network_interface_funcs

from backend.conf.conf_vars import *


def demoX():
    return dict(response=APNS_CERT_PATH)

def decodeJson(req):
    try:
        return json.loads(req)
    except:
        logger.debug("decodeJson Failed for : %s" % req)
    return False
    
def createJsonResponse(resp):
    response_str = json.dumps(resp)
    response = HttpResponse(response_str, content_type='application/json')
    response['Content-Length'] = len(response_str)
    return response
    
def saveNetworkInterfaces( address, mask , broadcast ,  interface_type ):
    global INTERFACES_IFC_SUB , NETWORK_INTERFACES_TEMPLATE , PUBLISH_NETWORK_FILE
    updateInterfaceAddrMask( interface_type , address , mask , broadcast )
    lan_details_vals = getInterfaceDetailsList('lan')
    int_details_vals = getInterfaceDetailsList('internet')
    interfaces_val_arr = lan_details_vals + int_details_vals
    #conf_helper.configNetworkInterface( INTERFACES_IFC_SUB , interfaces_val_arr , PUBLISH_NETWORK_FILE  )
    networkinterface.network_interface_funcs.configNetworkInterface( INTERFACES_IFC_SUB , interfaces_val_arr , PUBLISH_NETWORK_FILE  )
    
def getMemCpuInfo():
    ram = psutil.phymem_usage()
    keys = ['cpu', 'memory']
    values = [ psutil.cpu_percent() , ram.percent ]
    response = dict(zip(keys,values))
    return response
    
def strReplace( content , search , replace ):
    for index,item in enumerate( search ):
        content = content.replace( search[index] , replace[index] )
    return content

def getMemoryInfo():
    mem = psutil.virtual_memory()
    #response = dict( zip ( [ "total" , "available" , "percent" , "used" , "free" , "active"] , [ mem.total , mem.available , mem.percent , mem.used , mem.free , mem.active ] ) )
    logger.debug( "the total memory" +str( mem.total ) )
    response = dict( zip ( [ "total" , "available" , "percent" , "used" , "free" , "active"] , [ formatBytes(mem.total) , formatBytes( mem.available ) , formatBytes( mem.percent ) , formatBytes( mem.used ) , formatBytes( mem.free ) ,formatBytes( mem.active ) ] ) ) 
    
    return response
    
def getCPUInfo():
    mem = psutil.cpu_times()
    #response = dict( zip ( [ "total" , "available" , "percent" , "used" , "free" , "active"] , [ mem.total , mem.available , mem.percent , mem.used , mem.free , mem.active ] ) )
    #logger.debug( "the total memory" +str( mem.total ) )
    response = dict( zip ( [ "total" , "available" , "percent" , "used" , "free" , "active"] , [ formatBytes( mem.total ) , formatBytes( mem.available ) , formatBytes( mem.percent ) , formatBytes( mem.used ) , formatBytes( mem.free ) ,formatBytes( mem.active ) ] ) ) 
    
    return response
    
def formatBytes( bytes ):
    formatted_size = ''
    if bytes < 1024 :
        formatted_size = str( bytes )+ " Bytes"
    elif bytes < 1048576 :
        formatted_size = str( bytes / 1024 ) + " KB"
    elif bytes < 1073741824 :
        formatted_size =  str ( bytes / 1048576 ) + " MB"
    else :
        formatted_size = str ( bytes / 1073741824 ) + " GB"
    return formatted_size 
