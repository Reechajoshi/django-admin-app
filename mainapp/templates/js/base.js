function showLoadingWithText(txt)
{
    hideLoading(function(){
        $("#loading_div").html(txt);
        $("#loading_div").show();
        $("#loading_div").css({top: ( ( $("#loading_div").height() + parseInt($("#loading_div").css('padding-top')) + parseInt($("#loading_div").css('padding-bottom')) )  * -1) + "px"});
        $("#loading_div").animate({top: "0px"});
    });
}

function hideLoading(callback)
{
    $("#loading_div").animate({top: ( ( $("#loading_div").height() + parseInt($("#loading_div").css('padding-top')) + parseInt($("#loading_div").css('padding-bottom')) )  * -1) + "px"}, function(){
        $(" #loading_div").hide();
        
        if(callback)
            callback();
    });
}

function showMessage(message, title, cb)
{
    $('#dialog-message').prop('title', title);
	$("#dialog-message p").html('<span class="ui-icon ui-icon-circle-check" style="float:left; margin:0 7px 50px 0;"></span>'+message);
	$("#dialog-message").css('display' , 'block');
					
	$("#dialog-message").dialog({
		closeOnEscape: false,
		modal: true,
		buttons: {
			"OK": function() {
				$( this ).dialog( "close" );
					if(cb)
						cb();
						
					initTabs();	
				}, 
		}
	});
}

function showConfirm(message, title, cb)
{
	$('#dialog-confirm').prop('title', title);
	$("#dialog-confirm p").html('<span class="ui-icon ui-icon-alert" style="float:left; margin:0 7px 20px 0;"></span>'+message);
	$("#dialog-confirm").css('display' , 'block');
	
	$("#dialog-confirm").dialog({
		resizable: false,
		closeOnEscape: false,
		height:250,
		modal: true,
		buttons: {
			"OK": function() {
				
				$( this ).dialog( "close" );
				if(cb)
					cb();
					
				initTabs();	
			},
			Cancel: function() {
				$( this ).dialog( "close" );
			  
				initTabs();	
			},
		}
    });
}

function initTabs()
{
	// set tabs
    $( "#tabs" ).tabs();
}

function get_network_template()
{
     var _html = '<div id="tabs" style="margin-right:20px" ><ul><li><a href="#tabs-1">Interfaces</a></li><!--li><a href="#tabs-2">User</a></li--></ul><div id="tabs-1" class="tab_container" style="min-height:200px; padding-right:10px; marginRight:10px;" ><div id="internet_logo" style="display:none;"><img class="header_menu_block_img" src="/static/images/internet_logo.png" > </div><div id="lan_logo" style="display:none;"><img class="header_menu_block_img" src="/static/images/lan_logo.png" > </div><div><div id="interfaceContainer"><div id="internetDetails" style="margin-bottom:10px;width:350px; cursor:pointer;" onclick="activateInterface(\'internet\');" ><div><div style="display:inline-block;"><img class="header_menu_block_img" src="/static/images/internet.png" > </div><!-- <div id="internetlabel" style="display: inline-block;vertical-align: top;padding-top: 10px;">Internet</div> --></div><!-- <div style="display:inline-block;padding:10px;">Connection to the world.</div> --></div><div id="lanDetails" style="margin-bottom:10px;width:350px" onclick="activateInterface(\'lan\');"><div><div style="display:inline-block;"><img class="header_menu_block_img" src="/static/images/lan.png" ></div><!-- <div id="lanlabel" style="display: inline-block;vertical-align: top;padding-top: 10px;">Lan</div> --></div><!-- <div style="display:inline-block;padding:10px;">Connection to the world.</div> --></div></div></div><div id="general_container" style="display:none;"><div style="margin-left:40px;"><!--<div id="profile_field_title" class="profile_field_title">Lan Details</div> <div id="general_ques_block" ><div id="profile_field_title" class="profile_field_title">Lan IFC:</div><div class="profile_field_element" id="profile_field_element"><label name="edit_lan_ifc" id="edit_lan_ifc" type="text" >LAN IFC</label></div></div> --><div class="clear"></div><div id="general_ques_block"><div class="profile_field_title" id="profile_field_title" style="padding:10px;">IP Address:</div><div class="profile_field_element" id="profile_field_element"><input name="edit_lan_address" id="edit_lan_address"  maxlength="20" type="text" ></div></div><div class="clear"></div><div id="general_ques_block"><div class="profile_field_title" id="profile_field_title" >IP Mask:</div><div class="profile_field_element" id="profile_field_element"><input name="edit_lan_mask" maxlength="20" id="edit_lan_mask" type="text"></div></div><div class="clear"></div><div id="general_ques_block"><div class="profile_field_title" id="profile_field_title">Broadcast:</div><div class="profile_field_element" id="profile_field_element"><input name="edit_lan_broadcast" id="edit_lan_broadcast" maxlength="20" type="text"></div></div></div></div><div id="internet_container" style="display:none; height:200px;"><div id="general_details"><div id="radio" style="margin-left:40px;"><input type="radio" name="dynamicradio" id="dynamicradio" value="dynamicDHCP"  onchange="handleChange(this);" style="width:20px; height:20px;" checked><label style="font-size: 14px;color: #737373;" for="dynamicradio">Dynamic DHCP</label><br><br><input type="radio" name="dynamicradio" id="staticradio" value="static" onchange="handleChange(this);" style="width:20px; height:20px;" ><label for="staticradio" style="font-size: 14px;color: #737373; padding-bottom:20px;">Static</label></div><div id="internet_details_block" style="margin-left:50px;"><!--<div id="general_ques_block" ><div id="profile_field_title" class="profile_field_title"><label>Internet IFC:</label></div><div class="profile_field_element" id="profile_field_element"><label name="edit_internet_ifc" id="edit_internet_ifc" type="text">Internet IFC</label></div></div>--><div class="clear"></div><div id="general_ques_block"><div class="profile_field_title" id="profile_field_title" style="padding:10px;">IP Address:</div><div class="profile_field_element" id="profile_field_element"><input name="edit_internet_address" id="edit_internet_address"  maxlength="20" type="text" ></div></div><div class="clear"></div><div id="general_ques_block"><div class="profile_field_title" id="profile_field_title" >IP Mask:</div><div class="profile_field_element" id="profile_field_element"><input name="edit_internet_mask" maxlength="20" id="edit_internet_mask" type="text"></div></div><div class="clear"></div><div id="general_ques_block"><div class="profile_field_title" id="profile_field_title">Broadcast:</div><div class="profile_field_element" id="profile_field_element"><input name="edit_internet_broadcast" id="edit_internet_broadcast" maxlength="20" type="text"></div></div></div></div></div><div style="text-align:right; display:none;" id="btnContainer" ><div class="save_interface_container" id="back_interface_container"><a href="#" onclick="procBackInterface(); return false;"><img src="/static/images/back.png"/></a></div><div class="save_interface_container" id="save_interface_container"><a href="#" onclick="procSaveInterface(); return false;"><img src="/static/images/btnsave.png"/></a></div></div></div><!--div id="tabs-2" class="tab_container" style="min-height:200px;"><div id="user" name="User" >this is user div</div></div--></div>';
    return _html;
}

function get_status_template()
{
    // status template will come here
    var _html = '<div id="tabs" style="margin-right:20px"><ul><li><a href="#tabs-1">Status</a></li><li><a href="#tabs-2">User</a></li></ul><div id="tabs-1" class="tab_container" style="min-height:100px;"><div id="CPU_usage" name="CPU_usage"><div id="cpu_details_heading"><div id="cpu_usage"><div id="status_logo" ><img class="header_menu_block_img" src="/static/images/cpu.png" > </div><div id="general_ques_block" style="margin-left:40px;"><div id="profile_field_title" class="profile_field_title">%:</div> <div class="profile_field_element" id="profile_field_element"><progress value="22" max="100" style="color:#D9D9D9; "></progress></div></div> <div id="memory_logo" ><img class="header_menu_block_img" src="/static/images/memory.png" > </div><div id="general_ques_block" style="margin-left:40px;"><div id="profile_field_title" class="profile_field_title">%:</div> <div style="display: inline-block"><progress value="22" max="100" style="color:#D9D9D9; "></progress></div></div></div></div></div></div><div id="tabs-2" class="tab_container" style="min-height:200px;"><div id="user" name="User" ><div ><table id="user_data"><tr><th style="font-size:11px;">Sr. No.</th><th style="font-size:11px;">Host Name</th><th style="font-size:11px;">Physical Address</th><th style="font-size:11px;">IP Address</th><th style="font-size:11px;">Time</th></tr><tr><td style="font-size:11px;"><label name="sr_no" id="sr_no" type="text" >srno</label></td><td id="hostname" style="font-size:11px;"><label name="host_name" id="host_name" type="text" >HostName</label></td><td id="physicaladd" style="font-size:11px;"><label name="physical_address" id="physical_address" type="text" >PhysicalAddress</label></td><td id="ipadd" style="font-size:11px;"><label name="ip_address" id="ip_address" type="text" >IPAddress</label></td><td id="time" style="font-size:11px;"><label name="time" id="time" type="text" >Time</label></td></tr></table></div></div></div></div>';        
    return _html;
}
function get_status_Html()
{
    var status_detailed_div = document.getElementById( "details_container" );
    var statusTemp = get_status_template(); 
    $(status_detailed_div).html( statusTemp );
    getStatus();
    initTabs();
}   

function get_Network_Html()
{    
    var status_detailed_div = document.getElementById( "details_container" );
    var statusTemp = get_network_template(); 
     $(status_detailed_div).html( statusTemp );        
    initTabs();
}   
