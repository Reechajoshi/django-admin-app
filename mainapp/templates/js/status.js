window.onload = function(){
    $(function() {
        $( "#tabs" ).tabs();
    });
    
    getStatus();
    resize();
    
    $( window ).resize(function() {
        resize();
    });    
}

function get_User_template()
{
    var _html = '';
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
/* function get_CPU_usage_template()
{
 var _html = '<div id="cpu_details_heading"><div id="cpu_usage">CPU: _#_CPU_PERCENT_#_ <br /> Memory: _#_MEMORY_PERCENT_#_ </div></div>';
    
    return _html;
} */

function get_status_detail_template()
{
     var _html = '<div id="tabs" ><ul><li><a href="#tabs-1">Status</a></li><li><a href="#tabs-2">User</a></li></ul><div id="tabs-1" class="tab_container" style="min-height:100px;"><div id="CPU_usage" name="CPU_usage" ><div id="cpu_details_heading"><div id="cpu_usage">CPU: _#_CPU_PERCENT_#_ <br /> Memory: _#_MEMORY_PERCENT_#_ </div></div></div></div><div id="tabs-2" class="tab_container" style="min-height:200px;"><div id="user" name="User" ></div></div></div>';
        
    return _html;
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
            var row ="";
            for( var i = 0; i < users_details.length; i++ )
            {                
                var ipaddress = users_details[ i ][ 'ip_address' ];
                var Hardware = users_details[ i ][ 'hardware' ];
                var Hostname = users_details[ i ][ 'hostname' ];
                //userhtml += "ipaddress -> "+ipaddress+" , hardware -> "+Hardware+" , Hostname -> "+Hostname+"<br>";  
              
                var lbl_sr_no = $("<label>").attr( {"class": "sr_no"} ).text(i);
                var lbl_ip_address = $("<label>").attr( {"class": "ip_address"} ).text(ipaddress);
                var lbl_host_name = $("<label>").attr( {"class": "hostname"} ).text(Hostname);
                var lbl_physical_address = $("<label>").attr( {"class": "physicaladd"} ).text(ipaddress);
                var lbl_time = $("<label>").attr( {"class": "time"} ).text(ipaddress);
                
                var td_sr_no = $('<td>').append($(lbl_sr_no));
                var td_ip_address = $('<td>').append($(lbl_ip_address));
                var td_host_name = $('<td>').append($(lbl_host_name));
                var td_physical_address = $('<td>').append($(lbl_physical_address));
                var td_time = $('<td>').append($(lbl_time));
                td_sr_no.attr( {"style": "border:none; font-size:11px;"} )
                td_ip_address.attr( {"style": "border:none; font-size:11px;"} )
                td_host_name.attr( {"style": "border:none; font-size:11px;"} )
                td_physical_address.attr( {"style": "border:none; font-size:11px;"} )
                td_time.attr( {"style": "border:none; font-size:11px;"} )                
                
                var row = $('<tr>').append($(td_sr_no)).append($(td_host_name)).append($(td_ip_address)).append($(td_physical_address)).append($(td_time));
                
                
                
                /* $('.sr_no').text(ipaddress);  
                $('.ip_address').text(Hardware);  
                $('.hostname').text(Hostname);  
                $('.physicaladd').text(ipaddress);  
                $('.time').text(Hostname); 
                 */
                 $('#user_data').append($(row)); 
            }
           
            //$("#user").html(userhtml);
            
            // $('#lbl_Hardware').text(users_details["hardware"]);
            // $('#lbl_Hostname').text(users_details["hostname"]);
            // $('#lbl_Address').text(users_details["ip_address"]);         
        }
    }); 
}


function getStatus()
{
    $.ajax({
        url: '/getStatus/',
        error:function(err)
        {
            showMessage( "request failed!!", "Message", null);
        },
        success: function(data)
        {
            var status_detailed_div = document.getElementById( "details_container" );
            //var statusTemp = get_status_detail_template();           
                                   
            var cpu_details = data;
            var edit_CPU = document.getElementById( "edit_CPU" );
            //CPU_usage.innerHTML = "";
            console.log(data);
            //var _cpu_details = get_CPU_usage_template();
            //statusTemp = statusTemp.replace( '_#_CPU_PERCENT_#_', cpu_details["cpu"] );
            //statusTemp = statusTemp.replace( '_#_MEMORY_PERCENT_#_', cpu_details["memory"] );
            
            $('#edit_CPU').text(cpu_details["cpu"] );
            $('#edit_memory').text(cpu_details["memory"] );
             console.log(cpu_details["cpu"]);           
                       
            //$(status_detailed_div).html( statusTemp );
                   
           //CPU_usage.innerHTML += _cpu_details;
           initTabs(); 
           getUsers();
           //document.location.replace("status")
        }
    });
}

function resize()
{
    $("#main_content").height( $(document).outerHeight() - $("#header").outerHeight() );
    
    $("#devices_list_container").height( $("#main_content").outerHeight() );
    
    $("#devices_list_content_container").height( $( "#devices_list_container" ).outerHeight() - $( "#devices_list_header_container" ).outerHeight() );
    
    $(".tab_container").each(function(){
        $(this).height($("#devices_list_content_container").height()- 60);
    });
}
