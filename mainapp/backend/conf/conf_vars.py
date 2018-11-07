import logging
from django.conf import settings
import os

logger = logging.getLogger(__name__)
dir = os.path.dirname(__file__)

CONFIG_TEMPLATE_DIR = dir+"/templates/"
PUBLISH_DIR = dir+"/publish/"

NETWORK_INTERFACES_TEMPLATE = CONFIG_TEMPLATE_DIR+"interfaces.txt"
PUBLISH_NETWORK_FILE = PUBLISH_DIR+"interfaces_pub.txt"

#substitution fields

DHCP_LEASE_FILE = "/var/lib/dhcp/dhcpd.leases"

T_LAN_IFC = "{LAN_IFC}"
T_LAN_ADDR = "{LAN_ADDRESS}"
T_LAN_MASK = "{LAN_MASK}"

T_INTERNET_IFC = "{INTERNET_IFC}"
T_INT_IFC = "{INTERNET_ADDRESS}"
T_INT_MASK = "{INTERNET_MASK}"

LAN_IFC_SUB = [ "{LAN_IFC}" , "{LAN_ADDRESS}" , "{LAN_MASK}" ]
INTERNET_IFC_SUB = [ "{INTERNET_IFC}" , "{INTERNET_ADDRESS}" , "{INTERNET_MASK}" ]

INTERFACES_IFC_SUB = LAN_IFC_SUB + INTERNET_IFC_SUB





