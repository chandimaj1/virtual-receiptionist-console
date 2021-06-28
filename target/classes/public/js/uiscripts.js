/*
    Sip Console web app
    Version 1.0.0

    Requires jQuery (jquery-3.2.1.js) from http://jQuery.com

   UI Scripts
*/
lock_status=false;

// ----- UI LOCK/UNLOCK SCRIPTS
function init_ui_status(){
    console.log('Initiating UI Lock/Unlock checks...');
    
    var ui_lock = getCookie("ui_lock");
    console.log('Saved UI lock (is lokced):'+ui_lock);
    
    if(ui_lock=="true"){ // Unlocked UI
        lock_status=true;
        lock_ui_changes();
    }else{ // Lock UI
        lock_status=false;
        unlock_ui_changes();   
    }
} 
        //UI Lock changes
        function lock_ui_changes(){
            console.log('Locking UI');
            //Presences
            $('#adduser').css("display","none");
            $('#adduser').css("pointer-events","none");
            $('.app-user .user-close').css("display","none");
            
            //Huntgroups
            $('#addhuntuser').css("display","none");
            $('#addhuntuser').css("pointer-events","none");
            $('.hunt-user .user-close').css("display","none");
            
            //cog
            $('.cog').removeClass("showcog");
            $('.cog').addClass("hidecog");
            
            
            //Hiding: unlock icon
            $('#lock_off').addClass('hidden');
            //Showing: lock icon
            $('#lock_on').removeClass('hidden');
            lock_status=true;
        }

        //UI Unlock changes
        function unlock_ui_changes(){
            console.log('UNLocking UI');
            //Presense
            $('#adduser').css("display","block");
            $('#adduser').css("pointer-events","auto");
            $('.app-user .user-close').css("display","block");
            //Huntgroups
            $('#addhuntuser').css("display","block");
            $('#addhuntuser').css("pointer-events","auto");
            $('.hunt-user .user-close').css("display","block");
            
            //cog
            //cog
            $('.cog').removeClass("hidecog");
            $('.cog').addClass("showcog");
            
            // Hiding: password entry to unlock
            $('#bar-settings').css("opacity","0");
            $('#lock_on').css("background-color","transparent");
            //Hiding: lock icon
            $('#lock_on').addClass('hidden');
            //Showing: unlock icon
            $('#lock_off').removeClass('hidden');
            lock_status=false;
        }


// Show "password to unlock prompt" on lock click
function showSettings(){
        
    //resets
        $('#pw_settings').val("");
        $('#pw_settings').css("border-color","#696a6c");
        $('#pw_settings').css("background-color","#fff");
    
    // If password prompt now shown
    if ($('#bar-settings').css("opacity")=="0"){
        $('#lock_on').css("background-color","#c3c4c5");
        $('#bar-settings').css("opacity","1");
    }else{//if shown
        $('#lock_on').css("background-color","transparent");
        $('#bar-settings').css("opacity","0");
    }
        
        // handle enter press to unlock
        $('#pw_settings').unbind("keydown");
        $('#pw_settings').keydown(function(e){
                if (e.keyCode === 13) {
                //checks whether the pressed key is "Enter"
                    check_pw();
                }
        });
        $('#pw_settings').focus();
}


// Get password from database
function check_pw(){
    var customer_url = "/customers/search/findOneByCompanyDomain";
        $.ajax({
                    type: 'GET',
                    contentType: 'application/json',
                    crossDomain: true,
                    data:{
                        company_domain:app_domain,
                    },
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader ("Authorization", "Bearer " + token);
                    },
                    url: customer_url,
                    success: function (response) {
                        console.log(response);
                        var pwx = response.consolePassword;
                        
                        //check lock
                        check_lock_ui(pwx);
                    },
                    error: function(response) {
                        console.log('Password update');
                        console.log (response);
                        $('#app-token-error').css("display","block");
                    }
                });

}

//match database pw with entered password
function check_lock_ui(pwx){
    var pw = $('#pw_settings').val();
    
    if(pwx==pw){ // password is valid and unlocking the ui
        
        //UI UNLOCK CHANGES
        unlock_ui_changes();
        
        //Saving unlock preference in cookies
        setCookie("ui_lock","false",72);
    
    }else{
        
        //highlight wrong password entry
        $('#pw_settings').css("border-color","#e3003c");
        $('#pw_settings').css("background-color","#ffdfdd");
    }
}


//Lock UI
function lock_console_ui(){
    
    //UI LOCK CHANGES
        lock_ui_changes();
    
    //Saving lock preference in cookies
    setCookie("ui_lock","true",72);
}

/*------------------------*/



// Show system date & time
function startTime() {
    var today = new Date();
    var date = today.getDate();
    var day = today.getDay();
    var month = today.getMonth();
    var h = today.getHours();
    var m = today.getMinutes();
    h = checkTime(h);
    m = checkTime(m);
    month = checkMonth(month+1);
    day = checkDatex(day);

    var time = h + ":" + m;
    $('#info-item-time').html(time);
    $('#info-item-date').html(day+" "+date +", "+ month);
    var t = setTimeout(startTime, 60000);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function checkDatex(day){
    if (day==0){
        return 'Sunday';
    }else if (day==1){
        return 'Monday';
    }else if (day==2){
        return 'Tuesday';
    }else if (day==3){
        return 'Wednesday';
    }else if (day==4){
        return 'Thursday';
    }else if (day==5){
        return 'Friday';
    }else if (day==6){
        return 'Saturday';
    }
}

function checkMonth(i) {
    switch (i){
        case 1: x="January";break;
        case 2: x="February";break;
        case 3: x="March";break;
        case 4: x="April";break;
        case 5: x="May";break;
        case 6: x="June";break;
        case 7: x="July";break;
        case 8: x="August";break;
        case 9: x="September";break;
        case 10: x="October";break;
        case 11: x="November";break;
        case 12: x="December";break;
    }
    return x;
}

/* Overlay stuff*/
function closeOverlay(x){
    $(".errormsg").html("");
    $('#'+x).css("opacity",.3);
    $('#'+x).delay(500).css("display","none");
}

function openOverlay(x){
        $('#'+x).css("display","block");
        $('#'+x).css("opacity",1);
}





//LINE DRAG & PRESENCE DROP SCRIPTS
function refresh_droppables(call_elem){ // Refresh new dropables
    $( ".online" ).droppable({
      drop: function( event, ui ) {
          var uri = $(this).children('.hidden_uri').val();
          var lineid = $('.ui-draggable-dragging').attr('id');
          $("#"+lineid+' .extenstion').val(uri);
          $("#"+lineid+' .transfer').click();
 //--xx    
    console.log("drag n drop transfer requested");
    console.log("Transfer line: "+lineid+" To uri: "+uri);
//--xx
//--xx
      },
        over: function( event, ui ) {
            $(call_elem).removeClass("half-opacity");
            $(this).css("opacity","1");
        },
        out: function( event, ui ) {
            $(call_elem).addClass("half-opacity");
            $(this).css("opacity",".5");
        }

    });
}

function enable_line_drag(elem){

    //list_transferables

    $(elem).draggable({
        revert: true,
        start: function(event, ui){
            refresh_droppables(elem);
            $(this).addClass("half-opacity");
            //$('#app-wrap').css("opacity",.5);
            $('#app-tabs').css("opacity",.5);
            $('#app-usersx').css("background-color","rgba(221,222,223,.5)");
            $('#app-users').css("background-color","rgba(221,222,223,.5)");
            $('#hunt_groups').css("background-color","rgba(248,249,249,.5)");
            $('.hunt-user').css("opacity",.5);
            $('.app-user').css("opacity",.5);
        },
        stop: function( event, ui ) {
            $(this).removeClass("half-opacity");
            //$('#app-wrap').css("opacity",1);
            $('#app-tabs').css("opacity",1);
            $('#app-usersx').css("background-color","#dddedf");
            $('#app-users').css("background-color","#dddedf");
            $('#hunt_groups').css("background-color","#f8f9f9");
            $('.hunt-user').css("opacity",1);
            $('.app-user').css("opacity",1);
        }
    });
}

function disable_line_drag(elem){
    $(elem).draggable( "destroy" );
}



//APP TABS SWITCHING
function switch_tab(tab){

    opened_tab = tab;

    //resetting tab button
    $('.tab-item').removeClass('deactive');
    $('.tab-item').addClass('deactive');
    $('#tab-'+tab).removeClass('deactive');

    //Resetting tab body
    $('.app-tabs-body').css("display","none");
    $('#app-'+tab+'x').css("display","block");

    //Resetting sort body
    $('#app-usersf').css("display","none");
    $('#app-historyf').css("display","none");
    $('#app-phonebookf').css("display","none");
    $('#app-'+tab+'f').css("display","block");

    $('usersf').attr("selected","true");

    //Search box text clear
    $('#searchfield').val("");

    if (tab=="users"){
        $('.not-add-user').css("display","block");
    }else if (tab=="history"){
        $('#added_rows_out').html('');
        $('#added_rows_in').html('');
        call_log_from_cloud();
    }else if (tab=="phonebook"){
        $('#added-directory-rows').html('');
        directory_from_cloud();
    }
}


//GENERATE WARNINGS
function generate_warning(message){
    var x = '<div id="app-message-template"><div class="message-back"><p class="message-text">'+message+'</p><i id="message-closebtn" onclick="$(this).parent().parent().remove();" class="icon icon-icon-close"></i></div></div>';
    $("body").append(x);
}


//REFINE URL
function refine_url(){
        //user113716 code is working but i altered as below. it will work if your URL contain "?" mark or not
        //replace URL in browser
        if(window.location.href.indexOf("?") > -1) {
            var newUrl = refineUrl();
            window.history.pushState("object or string", "Title", "/"+newUrl );
        }

        function refineUrl()
        {
            //get full url
            var url = window.location.href;
            //get url after/
            var value = url = url.slice( 0, url.indexOf('?') );
            //get the part after before ?
            value  = value.replace('@System.Web.Configuration.WebConfigurationManager.AppSettings["BaseURL"]','');
            return value;
        }
    }

//CLOSES APP
function close_and_reload(){
    setCookie("token","",0);
    token = "";
    window.close();
    window.top.close();
}


//Toggle Color Selection
function toggle_color(ss){
    $(ss).siblings('.color-selection').toggleClass('show');
        $(document).mouseup(function(e)
    {
        var container = $(ss).siblings('.color-selection');
        // if the target of the click isn't the container nor a descendant of the container
        if (!container.is(e.target) && container.has(e.target).length === 0)
        {
            container.removeClass('show');
        }
    });
}


//Color Change Presence and Huntgroup
function color_change_hunt(ss,hex_color){
        var color = "#"+hex_color;
        var element_id = $(ss).parent().parent().parent().attr('id');
        $('#'+element_id).css("background-color",color+"!important");
        $('#'+element_id+' .circle').css("color","transparent");
        $(ss).css("color","#696a6c");

    //Updating Database Color
        var entity = element_id.charAt(0);
        var entity_url = $('#'+element_id+" .hidden_plink").val();

        update_color_in_entity(entity_url,hex_color);
}


//Update Color in Entities
function update_color_in_entity(entity_url,hex_color){

        var dataObj = {
            backgroundColour: hex_color,
        }
     $.ajax({
        type: 'PATCH',
        contentType: 'application/json',
        crossDomain: true,
         beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        url: entity_url,

        data: JSON.stringify(dataObj),
        dataType: 'JSON',
        success: function (response) {
           console.log('Color '+hex_color+" recorded for "+entity_url);
        },
        error: function(response) {
            console.log('Error updating color for'+entity_url);
            console.log (response);
            $('#app-token-error').css("display","block");
        }
    });
}



