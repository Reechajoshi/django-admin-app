function get_device_list_template()
{
    var _html = '<div name="_#_DEVICE_UDID_#_" id="main_device_div" class="devices_list_block" onclick="showDeviceDetails(\'_#_DEVICE_UDID_#_\', 0, this);"><div id="devices_name" name="devices_name" class="devices_name">_#_DEVICE_NAME_#_</div><div class="devices_regdate" id="devices_regdate" name="devices_regdate">_#_DEVICE_REGDATE_#_</div></div>';
    
    return _html;
}

function get_device_profile_template(canRemove)
{
    var _html = '<div id="device_profile_block" name="device_profile_block"><div id="device_prof_fld"><div class="device_profile_name" name="device_profile_name" id="device_prof_fld_val">_#_DEVICE_PROFILE_NAME_#_</div>'+(canRemove ? ' <div id="device_info_remove" class="device_info_remove" onclick="removeProfile(this);">remove</div> |' :  '')+' <div id="device_info_show_more" class="device_info_show_more" onclick="toggle_device_info( this, \'profile\' );">more</div></div><div id="device_profile_details" class="device_profile_details" style="display:none;"><div id="device_prof_fld"><div id="device_prof_fld_lbl">Version: </div><div id="device_prof_fld_val">_#_DEVICE_PROFILE_VERSION_#_</div></div><div id="device_prof_fld"><div id="device_prof_fld_lbl">Identifier: </div><div name="profile_identifier" id="device_prof_fld_val">_#_DEVICE_PROFILE_IDENTIFIER_#_</div></div></div></div>';
    
    return _html;
}

function get_device_app_template()
{
    var _html = '<div id="device_app_block" name="device_app_block"><div id="device_app_fld"><div class="device_app_name" id="device_app_fld_val">_#_APP_NAME_#_</div><div id="device_info_uninstall" class="device_info_uninstall" onclick="uninstallApp(this);">uninstall</div> | <div id="device_info_show_more" class="device_info_show_more" onclick="toggle_device_info( this, \'app\' );">more</div></div><div id="device_app_details" class="device_app_details" style="display:none;"><div id="device_app_fld_val" style="width:32%;"><div style="display:inline-block;padding-right:3px;">Version: </div><div style="display:inline-block;"><span id="device_app_version">_#_APP_VERSION_#_</span>, <span id="device_app_short_version">_#_APP_SHORT_VERSION_#_</span></div></div><div id="device_app_fld_val" style="width:32%;"><div style="display:inline-block;padding-right:3px;">Size: </div><div style="display:inline-block;">_#_APP_SIZE_#_</div></div><div id="device_app_fld_val" style="width:32%;"><div style="display:inline-block;padding-right:3px;">Identifier: </div><div name = "app_identifier" style="display:inline-block;">_#_APP_IDENTIFIER_#_</div></div></div></div>';
    
    return _html;
}

function get_device_history_template()
{
    var _html = '<div id="device_history_block" name="device_history_block"><div id="device_history_time"><div class="device_history_time" id="device_time_fld_val">_#_HISTORY_TIME_#_</div> </div><div id="device_history_status" class="device_history_status" style="color:_#_HISTORY_STATUS_COLOR_#_;">_#_HISTORY_STATUS_#_</div><div class="device_history_description" id="device_history_description">_#_HISTORY_DESCRIPTION_#_</div></div><hr>';
   
    return _html;
}