from django.db import models
from datetime import datetime
from django.core.exceptions import ObjectDoesNotExist
import logging
#import pickle
import base64


logger = logging.getLogger(__name__)
# Create your models here.
#testing
class DhcpUsers(models.Model):
    mac_address = models.CharField( max_length=15 , primary_key=True )
    host_name = models.CharField(max_length=100, default="", blank=False)
    ip_address = models.CharField(max_length=20, default="")

class CameraDetails(models.Model):
    camera_id = models.CharField(max_length=100 , primary_key=True)
    camera_name = models.CharField(max_length=50, default="", blank=False)
    camera_desc = models.CharField(max_length=100, default="")
    camera_ip = models.CharField(max_length=20, default="", blank=False)
    camera_url = models.CharField(max_length=500, default="", blank=False)
    camera_receiving = models.CharField(max_length=50, default="", blank=False)

class Interfaces(models.Model):
    interface_type = models.CharField(max_length=20 , primary_key=True)
    interface_address = models.CharField(max_length=20, default="")
    interface_mask = models.CharField(max_length=20)
    interface_broadcast = models.CharField(max_length=20)
    interface_gateway = models.CharField(max_length=20)
    interface_name = models.CharField(max_length=20)
    create_date = models.DateTimeField(default=datetime.now, blank=True)
    modified_date = models.DateTimeField(default=datetime.now, blank=False)  

def addInterface( interface_type, interface_address, interface_mask, interface_broadcast, interface_gateway, interface_name ):
    interfaces = Interfaces(interface_type=interface_type, interface_address=interface_address, interface_mask=interface_mask, interface_broadcast=interface_broadcast, interface_gateway=interface_gateway, interface_name=interface_name)
    interfaces.save()
    
# def addCameraDetails( camera_id, camera_name, camera_desc, camera_ip ):
    # cameraDetailsObject = CameraDetails( camera_id = camera_id, camera_name = camera_name, camera_desc = camera_desc, camera_ip = camera_ip )
    # cameraDetailsObject.save()

def updateInterfaceAddrMask( interface_type , interface_address , interface_mask ,  interface_broadcast ):    
    try:
        logger.debug("interface_type to change : "+interface_type+" , updateing interface: , "+interface_address)
        interfaces = Interfaces.objects.get(interface_type=interface_type)
        interfaces.interface_address=interface_address
        interfaces.interface_mask=interface_mask
        interfaces.interface_broadcast=interface_broadcast
        interfaces.save()
    except ObjectDoesNotExist as e:
        pass
            
    
def updateInterface( interface_type, interface_address, interface_mask, interface_broadcast, interface_gateway, interface_name, update ):
    if update:
        try:
            logger.debug("updateing interface: " + interface_address)
            interfaces = Interfaces.objects.get(interface_type=interface_type)
            interfaces.interface_address=interface_address
            interfaces.interface_mask=interface_mask
            interfaces.interface_broadcast=interface_broadcast
            interfaces.interface_gateway=interface_gateway
            interfaces.interface_name=interface_name
            interfaces.save()  
        except ObjectDoesNotExist as e:
            pass   
		
def getDHCPUsersFromDB():
    allRecords = []
    try:
        allp = DhcpUsers.objects.all()
        
        if allp:
            for p in allp:
                allRecords.append( dict( mac_address = p.mac_address, host_name = p.host_name , ip_address = p.ip_address ) )
    except ObjectDoesNotExist as e:
        logger.debug("getDHCPUsersFromDB failed; Message : {}".format(e.message))
    return allRecords
		
		
			
def getInterfacesFromDB(interface_type):    
    allRecords = []
    try:
        alld = Interfaces.objects.filter(interface_type=interface_type)
        return (dict(interface_type=alld[0].interface_type,interface_address=alld[0].interface_address,interface_mask=alld[0].interface_mask,interface_gateway=alld[0].interface_gateway,interface_name=alld[0].interface_name,interface_broadcast=alld[0].interface_broadcast))
        #Device.objects.get()
    except ObjectDoesNotExist as e:
        logger.debug("getInterfacesFromDB failed; Message : {}".format(e.message))
        return alld
        
def getInterfaceDetailsList(interface_type):
    allRecords = []
    try:
        alld = Interfaces.objects.filter( interface_type=interface_type )
        return ( [  alld[0].interface_name , alld[0].interface_address , alld[0].interface_mask ] )
    except ObjectDoesNotExist as e:
        logger.debug("getLANFromDB failed; Message : {}".format(e.message))
        return alld