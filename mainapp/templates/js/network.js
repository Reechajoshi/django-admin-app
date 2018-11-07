var _current_profile_list = false;
var _current_displayed_profile = false;
var _current_displayed_profile_id = false;
var _current_displayed_profile_uuid = false;
var _current_profile_date_arr = [];

var _current_sel_profiles = false;
var _current_all_profiles_id = false;
var _current_all_profiles_name = false;

var acttive_tab = 0;

profileIDs = [];
profileNames = [];

var interface_type;

window.onload = function(){
    initTabs();
    resize();
    $( window ).resize(function() {
        resize();
    });    
}

$(document).ready(function () {
	$('#tabs').tabs({
		activate: function (event, ui) {
			acttive_tab = $("#tabs").tabs("option", "active");
			console.log("act" + acttive_tab);
			var text = $(ui.tab).text();
			console.log("acttive_tab text" + text);
			if(acttive_tab==1)
				getUsers();
			//console.log($(ui.oldTab));
		}
	});
});

function get_LAN_details_template()
{
 var _html = ' <div id="lan_details" name="lan_details"><div id="lan_details_content"><input class="space" type="text" name="lan_ifc" id="edit_lan_ifc" value="_#_NET_MASK_#_" /><strong>Interface type: LAN</strong><br /><br /><input class="space" type="text" name="lan_address" value="_#_ADDR_#_" id="edit_lan_address" /><input class="space" type="text" name="lan_mask" id="edit_lan_mask"  /></div></div>';
    
    return _html;
}

function handleChange(valRadio){
	if(valRadio.value=="dynamicDHCP")
	{
		console.log(valRadio.value);
		$(internet_details_block).hide();
	}
	else if(valRadio.value=="static")
	{
		console.log(valRadio.value);
		$(internet_details_block).css('display','block');
	}	
}

function activateInterface(interfacetype) 
{
    console.log("activateInterface");
    var interface_container = document.getElementById( "interfaceContainer" );	
    var interface_Details = document.getElementById("interfaceDetails");   
    var general_container = document.getElementById( "general_container" );
    var internet_container = document.getElementById( "internet_container" );
    var internet_logo = document.getElementById("internet_logo");    
    var lan_logo = document.getElementById("lan_logo");
    
    interface_container.style.display = 'block';

    if( interfacetype == 'internet' )
    {
        interface_type = 'internet';
        console.log("activateInterface interfacetype " + interfacetype);
        $(internet_container).css('display','block');
        $(internet_logo).css('display','block');
        $(lan_logo).hide();
		$(internet_details_block).hide();
        $(general_container).hide();
        $(interface_container).hide();
        
        getNetworks();
		
		if(document.getElementById('dynamicradio').checked) {
		    $(internet_details_block).hide();
		}else if(document.getElementById('staticradio').checked) {
			$(internet_details_block).css('display','block');
		} 
    }
    else if( interfacetype == 'lan' )
    {
        interface_type = 'lan';
        $(lan_logo).css('display','block');
        $(internet_logo).hide();
        console.log("activateInterface interfacetype " + interfacetype);
        $(general_container).css('display','block');
        $(internet_container).hide();
        $(interface_container).hide();
        getNetworks();
    }
}

function getUsers()
{
    $.ajax({
        url: '/getDHCPActiveUsers/',
        error:function(err)
        {
            showMessage( "request failed!!", "Message", null);
        },
        success: function(data)
        {                
            var users_details = data['response'];  
            userhtml = "" ;
            for( var i = 0; i < users_details.length; i++ )
            {                
                var ipaddress = users_details[ i ][ 'ip_address' ];
                var Hardware = users_details[ i ][ 'hardware' ];
                var Hostname = users_details[ i ][ 'hostname' ];
                userhtml += "ipaddress -> "+ipaddress+" , hardware -> "+Hardware+" , Hostname -> "+Hostname+"<br>";                
            }
            $("#user").html(userhtml);
           /*  $('#lbl_Hardware').text(users_details["hardware"]);
            $('#lbl_Hostname').text(users_details["hostname"]);
            $('#lbl_Address').text(users_details["ip_address"]);    */        
        }
    });
}

function validateLan()
{
    if( document.getElementById( 'edit_lan_address' ).value.length != 0 )
    {
        if( document.getElementById( 'edit_lan_mask' ).value.length != 0 )
        {
            return true;
        }
        else
        {
            showMessage( "Mask cant be empty!", "Error" ,null);
        }
    }
    else
    {
        showMessage( "Please specify Address!", "Error" ,null);
    }
    return false;

}

function validateInternet()
{
    if( document.getElementById( 'edit_internet_address' ).value.length != 0 )
    {
        if( document.getElementById( 'edit_internet_mask' ).value.length != 0 )
        {
            return true;
        }
        else
        {
            showMessage( "Mask cant be empty!", "Error" , null);
        }
    }
    else
    {
        showMessage( "Please specify Address!", "Error" ,null);
    }
    return false;
}

function procBackInterface()
{
    var interface_container = document.getElementById( "interfaceContainer" );
    var interface_Details = document.getElementById("interfaceDetails");   
    var general_container = document.getElementById( "general_container" );
    var internet_container = document.getElementById( "internet_container" );
    var internet_logo = document.getElementById("internet_logo");
    var btnContainer = document.getElementById( "btnContainer" );
    var lan_logo = document.getElementById("lan_logo");
    
    $(interface_container).css('display','block');
    $(general_container).hide();
    $(internet_container).hide();  
    $(interface_Details).hide();
    $(internet_logo).hide();
    $(lan_logo).hide();
    $(interface_container).show();
    $(btnContainer).hide();    
}

function procSaveInterface()
{
    var interfacedetails = {};
  
    var interface_container = document.getElementById( "interfaceContainer" );
    var interface_Details = document.getElementById("interfaceDetails");   
    var general_container = document.getElementById( "general_container" );
    var internet_container = document.getElementById( "internet_container" );
       
    if(interface_type=='lan')    
    {
        if(validateLan())
        {
            console.log("in validateInternet");
            interfacedetails[ 'address' ] = document.getElementById( 'edit_lan_address' ).value;
            interfacedetails[ 'mask' ] = document.getElementById( 'edit_lan_mask' ).value;
            interfacedetails[ 'broadcast' ] = document.getElementById( 'edit_lan_broadcast' ).value;
            saveInterfaces(interfacedetails,"","lan");
        } 
    }
    else if(interface_type=='internet')
    {
	    if($(internet_details_block).is(':visible'))
		{
			 console.log("internet_details_block is visible");
			if(validateInternet())
			{	
				interfacedetails[ 'address' ] = document.getElementById( 'edit_internet_address' ).value;
				interfacedetails[ 'mask' ] = document.getElementById( 'edit_internet_mask' ).value;
				interfacedetails[ 'broadcast' ] = document.getElementById( 'edit_internet_mask' ).value;
				saveInterfaces(interfacedetails, "static", interface_type);
			}
		}
		else
		{
            console.log("internet_details_block is not visible");
			interfacedetails[ 'address' ] = "";
			interfacedetails[ 'mask' ] = ""
			interfacedetails[ 'broadcast' ] = "";
			saveInterfaces(interfacedetails, "dynamicDHCP", interface_type);
		}
    }
}

function saveInterfaces(interface_details, interfacesetting, interface_type)
{
    var json = {"interface":interface_details, "interface_setting": interfacesetting, "interface_type" : interface_type };
    $.ajax({
        url: '/saveInterfaces/',
        type: 'POST',
        data: "request="+JSON.stringify(json) ,
        error:function(err)
        {
            showMessage( "request failed!!", "Message", null);
        },
        success: function(data)
        {
			getNetworks();
            showMessage( "Data Saved!!", "Message", null);
        }
    });
}

function getNetworks()
{
    var interface_container = document.getElementById( "interfaceContainer" );
    var interface_Details = document.getElementById("interfaceDetails");   
    var general_container = document.getElementById( "general_container" );
    var internet_container = document.getElementById( "internet_container" );
    var btnContainer = document.getElementById( "btnContainer" );
    
     $(btnContainer).css('display','block');
    
   /*  if($(general_container).is(':visible'))
    {
        console.log("in if general_container");
        interface_type='lan';
    }
    else if($(internet_container).is(':visible'))
    {
        console.log("in if internet_container");
        interface_type='internet';
     }
    else
        console.log("in else");*/
    var json = {"interface_type" : interface_type };
    $.ajax({
        url: '/getNetworks/',
        type: 'POST',
        data: "request="+JSON.stringify(json) ,
        error:function(err)
        {
            showMessage( "request failed!!", "Message", null);
        },
        success: function(data)
        {
            /* if(general_container.visibility) */
            if (interface_type=="lan")
            {                           
                $(general_container).css('display','block');               
                var lan_interface_details = data;  
                /* $('#edit_lan_ifc').text(lan_interface_details["interface_name"]); */
                $('#edit_lan_address').val(lan_interface_details["interface_address"]);
                $('#edit_lan_mask').val(lan_interface_details["interface_mask"]);
                $('#edit_lan_broadcast').val(lan_interface_details["interface_broadcast"]);          
            }
            else if(interface_type=="internet")
            {      
                $(internet_container).css('display','block');
                var internet_interface_details = data;  
                /*$('#edit_internet_ifc').text(internet_interface_details["interface_name"]); */
                $('#edit_internet_address').val(internet_interface_details["interface_address"]);
                $('#edit_internet_mask').val(internet_interface_details["interface_mask"]);
                $('#edit_internet_broadcast').val(internet_interface_details["interface_broadcast"]);
            }  
        }
    });
}

function resize()
{
    $("#main_content").height( $(document).height() - $("#header").height() );
    $("#profile_list_container").height( $("#main_content").height() );
    
    $("#profile_list_content_container").height( $("#profile_list_container").height() - $("#profile_list_header_container").height() - 20 - 10 );
    
    $(".tab_container").each(function(){
        $(this).height($("#profile_list_container").height()- 220);
    });
}

function resetForm()
{
  	initTabs();
    $( "#tabs" ).tabs('lan', 'active', 0);
}
