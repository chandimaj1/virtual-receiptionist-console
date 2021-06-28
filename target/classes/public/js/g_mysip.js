
/*-----------------------------
    Lines related JS
------------------------------*/

//Cookie Status Check
function get_available_line(){

    if (status_line[1]=='deact'){
        return 'line1';
    }else if(status_line[2]=='deact'){
        return 'line2';
    }else if(status_line[3]=='deact'){
        return 'line3';
    }else if(status_line[4]=='deact'){
        return 'line4';
    }else{
        return 'allbusy';
    }
}

// LISTEN FOR RING
function app_listen_for_ring(){
    console.log('app Listening for ring');
         appsip.on('invite', function (session) {
             var uri = session.remoteIdentity.uri;
             console.log('app invitation from:'+uri);
             var incoming = true;
             createNewSession(uri,session,incoming);
        });
}


//Create new session
function createNewSession(uri, session, incoming){
    uri = session ?session.remoteIdentity.uri :SIP.Utils.normalizeTarget(uri, ua.configuration.hostport_params);
//--xx    
    console.log("Current sip session uri: "+uri);
//--xx    
    var displayName = (session && session.remoteIdentity.displayName) ||uri.user;

    //FORMATTED DATA
    var available_line = get_available_line();
    if(available_line=="allbusy"){
        alert ('486 : All lines are Busy');
        appsip.message(uri, '486 : All lines are Busy');
        session.reject();
    }

// Elements
    var lineno = available_line.substr(4,1);
    var localmedia = 'line'+lineno+'out';
        localmedia = document.getElementById(localmedia);
    var remotemedia = 'line'+lineno+'in';
        remotemedia = document.getElementById(remotemedia);
    var lineid = '#line'+lineno;

    //Adding Session to the session variable
    lineno = parseInt(lineno);
    sessions[lineno] = session;

    // Make line status busy
    status_line[lineno]="busy";


    var urix = uri.aor; // URI sip
//--xx    
    console.log("Current sip session urix (uri.aor): "+urix);
//--xx

    //If incoming, activate answer/hangup button
    if(incoming){
        $(lineid+" .call").removeClass('inactive');
        $(lineid+" .hangup").removeClass('inactive');
        handle_audio('ring','play',lineid);
        $(lineid + " .linetxt").html("Incoming -"+lineno);
        call_type=1;
    }else{ // If going out, activate hangup only
        $(lineid+" .hangup").removeClass('inactive');
        handle_audio('ring','play',lineid);
        $(lineid + " .linetxt").html("Calling -"+lineno);
        call_type=2;
    }

    //UI CHANGES
    $(lineid+" .phonenumber").val(displayName);
    $(lineid).removeClass('deactline');



    //FUNCTIONS & LISTNERS

    // CALL ACCEPT !
    $(lineid + " .call").click(function(){
      var options = {
            media: {
                constraints: {
                  audio: localmedia,
                  video: false
                }
            }
        };
            session.accept(options);
    });


    //Hangup
        $(lineid + " .hangup").click(function(){
            if (!session) {
              return;
            } else if (session.startTime) { // Connected
              sessions[lineno].bye();
            } else if (session.reject) { // Incoming
                session.reject();
            } else if (sessions[lineno].cancel) { // Outbound
                session.cancel();
            }
            reset_line(lineno);
        });

    //HOLD
        $(lineid + " .hold").click(function(){
            console.log('Hold clicked !'+hold[lineno]);
            if (hold[lineno]){
                console.log('unhold');
                session.unhold();
                hold[lineno] = false;
            }else{
                console.log('hold');
                session.hold();
                hold[lineno] = true;
            }

        });

       session.on('unhold',function(){
                $(lineid+" .linetxt").html('In Call - Line'+lineno);
                disable_line_drag(lineid); // Disable Transfer Drag
                $(lineid+' .dragme').css("cursor","default");
                hold[lineno] = false;
       });

        session.on('hold',function(){
            $(lineid+" .linetxt").html('On Hold - Line'+lineno);
            handle_audio('ring','pause');
            enable_line_drag(lineid); // Enable Transfer Drag
            $(lineid+' .dragme').css("cursor","move"); // Enable Transfer Drag
        });


//Transfer
$(lineid + " .transfer").click(function(){   
//--xx    
    console.log("Transfer initiated for call on line:"+lineid);
    console.log("Session:"+session);
//--xx

        //Check for the type of transfer
        var select_line = $('#line'+lineno+" .selectline").find(":selected").val();

        var ttarget = $(lineid + " .extenstion").val();

        if ((!isNaN(ttarget)) && (ttarget.length==3)){
            var puri = $("#n"+ttarget+" .hidden_uri").val();
            //--xx    
            console.log("Transfering to"+puri);
            //--xx
            session.refer(puri);

        }else if(!ttarget && select_line!="none"){
            //Transfer to active line
            console.log('Transfered to an active line');
            sessions[lineno].refer(sessions[select_line]);

        }else if(ttarget!=""){
            //Call to ttarget
            console.log('extension typed');
            sessions[lineno].refer(ttarget);
            //session.refer(ttarget);
            //--xx    
                console.log("Transffering to"+ttarget);
            //--xx
        }


        });

    session.on('bye', function () {
        reset_line(lineno);
    });

    session.on('refer', function handleRefer (request) {
        var ttarget = $(lineid + " .extenstion").val();
        console.log('refer accepted for line: '+lineno+' to uri: '+ttarget);
        session.bye();
        reset_line(lineno);
    });

    //DTMF
    $('#phone .dialbtn').unbind('click');
    $('#phone .dialbtn').click(function(){
        var x = $(this).html();
        sessions[lineno].dtmf(x);
        // Display on Phone Display
        var x = $('#phone-display').val() + "" + x;
        $('#phone-display').val(x);
    });



    //---------
    var renderhinta = {
                        remote: remotemedia,
                    };
    session.on('accepted', function () {
        
        //Holding other lines for the accepted call
        $(this).siblings('.console-lines').children('.hold').click();
        
        $(lineid+" .linetxt").html('In Call - Line'+lineno);
        //alert ('accepted');
        handle_audio('ring','pause');
        session.mediaHandler.render(renderhinta);
        $('#phone-display').val('');
        $(lineid+" .call").removeClass('inactive');
        $(lineid+" .call").addClass('inactive');
        $(lineid+" .hangup").removeClass('inactive');
        $(lineid+" .hold").removeClass('inactive');
        $(lineid+" .transfer").removeClass('inactive');
        start_new_timer(lineno);
        set_lines_transferlines(lineno);
    });

    session.mediaHandler.on('addStream', function () {
      session.mediaHandler.render(renderhinta);
    });

    session.on('failed', function () {
        reset_line(lineno);
    });

     session.on('terminated', function () {
        stop_timer(lineno);
        reset_line(lineno);
    });

    session.on('dtmf', function () {
        handle_audio('dmtf','play');
    });
}

//Resets Line
function reset_line(lineno){
    handle_audio('ring','pause');
    stop_timer(lineno);

    var lineid = "#line"+lineno;

    status_line[lineno]="deact";// record deact for line

    hold[lineno] = false;

    $(lineid+" .phonenumber").val('');
    $(lineid + " .linetxt").html("Inactive - Line"+lineno);
    $(lineid + " .extenstion").val('');
    $(lineid + " .calltimeCounter").text('00:00:00');
    $('#phone-display').val('');

    $(lineid+" .call").unbind('click');
    $(lineid+" .hangup").unbind('click');
    $(lineid+" .hold").unbind('click');
    $(lineid+" .transfer").unbind('click');

    $('#phone .dialbtn').unbind('click');
    $('#phone .dialbtn').click(function(){ // Display on Phone Display
        var x = $(this).html();
        var x = $('#phone-display').val() + "" + x;
        $('#phone-display').val(x);
        handle_audio('dmtf','play');
    });



    $(lineid+" .call").addClass('inactive');
    $(lineid+" .hangup").addClass('inactive');
    $(lineid+" .hold").addClass('inactive');
    $(lineid+" .transfer").addClass('inactive');

    $(lineid).addClass('deactline');
}

//Check for active lines and add to transfer section
function set_lines_transferlines(){
    $(".linetransfer .selectline").html('');
    $(".linetransfer .selectline").html('<option disabled selected>none</option>');
    var i;
    for (i=1;i<5;i++){
        var line_status = status_line[i];
        if (line_status=="busy"){
            console.log('line appended:'+i);
            var x = "<option value="+i+">Line "+i+"</option>";
            $(".linetransfer .selectline").append(x);
        }
    }
}



//AUDIO RELATED JS
function handle_audio(element,action,lineid){
    var ring = document.getElementById("audio_ring");
    var hangup = document.getElementById("audio_hangup");
    var alert = document.getElementById("audio_alert");
    var dmtf = document.getElementById("audio_dmtf");

    // If already in a call
    if (element=='ring' && action =='play' && lineid!='#line1'){
        alert.play();
    }else if(element=='ring' && action =='play' && lineid=='#line1'){
        ring.play();
    }else if(element=='ring' && action =='pause'){
        ring.pause();
        alert.pause();
    }else if(element=='hangup'){
        hangup.play();
    }else if(element=='dmtf'){
        dmtf.play();
    }

}

// PAGE ONLOAD FUNCTIONS
$( document ).ready(function() {
    console.log("App initiated...");
    startTime(); // UI Clock
    get_token();//Get Token
    //Dialpad Buttons Click
    $('.dialbtn').click(function(){ // Display on Phone Display
            var x = $(this).html();
            var x = $('#phone-display').val() + "" + x;
            $('#phone-display').val(x);
            handle_audio('dmtf','play');
    });

});


