/* -----------------------------
    User Presence Related Js
------------------------------ */

//Available list of presences from cloud
function presences_from_cloud(){
    var url_huntgroups = "coreUserSubscribers/search/findByDomain";

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        crossDomain: true,
        url: url_huntgroups,
        data:{
                domain:app_domain,
                },
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        success: function (response) {
            console.log("Presences loaded for"+app_domain);
            console.log(response);
            update_presence_list(response);
            openOverlay('add-user');
        },
        error: function(response) {
            console.log (response);
            console.log ("Error getting presences for !"+app_domain);
            $('#app-token-error').css("display","block");
        }
    });
}

//Update huntgroup list
function update_presence_list(response){
    $('#presence-list-placeholder').html("");
    var x = '<select id="add_presence_list" class="sortlist selectpicker huntsort" onchange="" data-live-search="true">'+"<option disabled selected='true'>Select Presences</option>";
    var y = "";
     $.each(response._embedded.coreUserSubscribers, function(i, item) {
            var name = response._embedded.coreUserSubscribers[i].firstName + " " + response._embedded.coreUserSubscribers[i].lastName;
            var ext = response._embedded.coreUserSubscribers[i].local_Extension_number;
            var domain = response._embedded.coreUserSubscribers[i].domain;

          y = y + "<option value='"+ext+"@"+domain+"'>"+name+"</option>";
     });
    var z = x + y + "</select>";
    $('#presence-list-placeholder').append(z);

    mark_presence_added_on_list();

}


// Check and mark for already added records
    function mark_presence_added_on_list(){
        $('.not-add-user .user-name').each(function(){
            var x = $(this).html();
            console.log('x:'+x);

            $('#add_presence_list option').each(function(){
                var y = $(this).text();
                console.log("y:"+y);
                if(x==y){
                    $(this).remove();
                }
            });

        });

        $('#presence-list-placeholder .selectpicker').selectpicker('render');
        openOverlay('add-user');
    }

//GET NEW PRESENCE USER AD REQ & SAVE IN CLOUD
function submit_newUser(){
    // Getting values
    var uri = $('#add_presence_list').val();
    var name = $('#add_presence_list option:selected').text();
    var split_uri = uri.split('@');
            var ext = split_uri[0];
            var domain = split_uri[1];

    //Creating new user
   var dataObj = {
        domain : domain,
        name : name,
        userName : ext,
    }

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        crossDomain: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        url:url_presences,
        data: JSON.stringify(dataObj),
        dataType: 'JSON',
        success: function (response) {
            console.log(response);
            var presence_link = response._links.presenceEntity.href;
            console.log("User saved in cloud at : "+presence_link);
            put_presence_to_session(presence_link,domain,name,ext);
        },
        error: function(response) {
            console.log (response);
            $('#userbox-error').html('Error Saving User in Cloud !');
        }
    });
}

    //Put Presence to Session
    function put_presence_to_session(presence_link,udomain,name,uname){
        console.log(presence_link);
        var url_sessions_link = url_sessions + "/" + session_id;
        var url_presence_link = presence_link + "/session";

        $.ajax({
        type: 'PUT',
        contentType: 'text/uri-list',
        crossDomain: true,
            beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        data:url_sessions_link,
        url:url_presence_link,
        success: function (response) {
            console.log("Presence Added to Session"+presence_link);
            closeOverlay('add-user');
            add_presense(udomain,name,uname,presence_link); //Add Presence user to pool
        },
        error: function(response) {
            console.log (response);
            $('#userbox-error').html('Error adding user to appuser table !');
        }
    });
    }

// Get Next available npen
function get_available_npen(){
    var i;
    for(i=100;i<221;i++){
        if (npens[i]=="free"){
            return i;
        }
    }
}

//ADD PRESENCE
function add_presense(domain,name,uname,presencelink,color){

    if (domain && name && uname){

        var i = get_available_npen(); //npen - no of presence entities
        i = parseInt(i);
        npens[i]="taken";

        var npen = i;

        //Inserting user box
        $("<div class='app-user not-add-user deact' id='n"+npen+"' style='background-color:#"+color+"'>").insertBefore("#adduser");
        var penhtml = $('#app_user_templete').html();
        $("#n"+npen).html(penhtml);
        $("#n"+npen+" .availability-number").html(uname);
        $("#n"+npen+" .user-name").html(name);
        $("#n"+npen+" .user-callbtn").attr('id',npen);

        //Saving domain in hidden input for easy calling
        var uri = uname+"@"+domain;
        $("#n"+npen+" .hidden_uri").val(uri);
        $("#n"+npen+" .hidden_plink").val(presencelink);

        //Checking to enable/disable add user button
        check_adduser_button();

        //Checking user for registration
        var url_location_id = url_locations+"/search/countByExtNumberAndDomain";

        $.ajax({
                    type: 'GET',
                    contentType: 'application/json',
                    crossDomain: true,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader ("Authorization", "Bearer " + token);
                    },
                    data:{
                        ext_number:uname,
                        domain:domain,
                    },
                    url: url_location_id,
                    success: function (response) {
                        console.log("Response for Find by Ext and Domain");
                        console.log(response);
                        is_presence_registered(response,uname,npen,uri);
                    },
                    error: function(response) {
                        $('#userbox-error').html("Cannot search for presence registration. for location :"+url_location_id);
                    }
             });

    }else{
        $('#userbox-error').html("All fields must be filled !");
    }

     // Resetting values
    $("#userbox-name").val('');
    $("#userbox-uname").val('');
    $("#userbox-domain").val('');
    
    init_ui_status();
}

    // Update add user enability
    function check_adduser_button(){
         // Check for max nu of presences
        var x = $('.not-add-user').length;
        pmax = parseInt(pmax);
        console.log('not add users :'+x+' Presence max :'+pmax+" console lock status:"+lock_status);

        if(lock_status){
            $('#adduser').css("display","none");
            console.log('Add user:hide (UI Locked)');
        }if ((x>199) || (x>pmax) || (x==pmax)){
            console.log('Add user:hide');
            $('#adduser').css("display","none");
        }else if((x<200)&&(x<pmax)){
            console.log('Add user:block');
            $('#adduser').css("display","block");
        }
    }


//------------------------ CHECK USER FOR REGISTRATION
            function is_presence_registered(response,uname,npen,uri){
                        var presenceid = "#n"+npen;
                        $(presenceid).removeClass('deact');
                        $(presenceid).removeClass('busy');
                        $(presenceid).removeClass('online');

                response = parseInt(response);
                if (response>0){ // YES
                    console.log("Count > 0");
                    $(presenceid).addClass('online');
                    //Subscribes to the presence
                    presence[npen] = appsip.subscribe(uri, 'presence',{expires:36000});

                    // Once subscribed, receive notifications and print out the presence information
                    presence[npen].on('notify', function (e) {
                            var notify_xml = e.request.body;
                            console.log(notify_xml);
                            update_presence_status(notify_xml,presenceid,uname);
                    });
                }else{
                    // NO
                     //Get notification from xml
                     console.log("Count < 0");
                     $(presenceid).addClass('deact');
                }
                        //Closing overlay

                closeOverlay('add-user');
            }





//UPDATE PRESENCE STATUS
 function update_presence_status(notify_xml,presenceid,username){
     //Get notification from xml
         $(presenceid).removeClass('deact');
         $(presenceid).removeClass('busy');
         $(presenceid).removeClass('online');

     var state = $(notify_xml).find('basic').html();
     var dmnote = $(notify_xml).find('note').html();

     console.log("Caught XML tags and values from NOTIFY :");
     console.log("Basic :"+state);
     console.log("note :"+dmnote);

    if (state=="closed"){ // User Active
         $(presenceid).addClass('online');
     }else if(state=="open" && dmnote==" available "){//Registered
         $(presenceid).addClass('online');
     }else if(state=="open"){//Busy
         $(presenceid).addClass('busy');
     }else{ //Unavialable
         $(presenceid).addClass('deact');
     }
 }


//LOAD PRESENCE ENTITIES FROM CLOUD
function entities_from_cloud(){
    var url_session_id = url_sessions+"/"+ session_id + url_presences;
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        crossDomain: true,
        url: url_session_id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        success: function (response) {
            console.log("Presence Entities From Cloud Loaded for "+url_session_id);
            console.log(response);
            load_presences(response); // Load presence to app users tab
        },
        error: function(response) {
            console.log (response);
            console.log ("Error getting presence entities for !"+url_session_id);
            $('#app-token-error').css("display","block");
        }
    });
} 
 
function load_presences(response){
     $.each(response._embedded.presenceEntities, function(i, item) {
            var name = response._embedded.presenceEntities[i].name;
            var uname = response._embedded.presenceEntities[i].userName;
            var domain = response._embedded.presenceEntities[i].domain;
            var color = response._embedded.presenceEntities[i].backgroundColour;
            var presence_link = response._embedded.presenceEntities[i]._links.presenceEntity.href;

                add_presense(domain,name,uname,presence_link,color);
            });

    // Check for presence registration every 60 seconds
    setInterval(function(){
        check_presences_registration_timer();
    }, 60000);

}


//DELETE PRESENCE FROM CLOUD on USERBOX X CLICK
function delete_user(parentdiv){

    //presenceEntity Link of the user
    var user_div_id = $(parentdiv.parentElement).attr('id');
    var presence_link = $("#"+user_div_id+" .hidden_plink").val();

    $.ajax({
        type: 'DELETE',
        contentType: 'text/uri-list',
        crossDomain: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        url:presence_link,

        success: function (response) {
            console.log("Presence Deleted: "+presence_link);
            remove_user(parentdiv);
        },
        error: function(response) {
            console.log ("delete unsuccessful :"+response);
            $('#app-token-error').css("display","block");
        }
    });

}

function remove_user(parentdiv){

    var user_div_id = $(parentdiv.parentElement).attr('id');
    var user_presence_id = user_div_id.substr(1,3);

    $(parentdiv.parentElement).remove();
    var x = $(".not-add-user").length; //no of presence entities
    check_adduser_button(); // Update add user enability

    npens[user_presence_id]="free";

    //PRESENCE UNSUBSCRIPTION
    presence[user_presence_id].unsubscribe();
    presence[user_presence_id].close();

}

// PRESENCE USER CALL CLICK
function presence_user_call(elem){
    var precenceid = $(elem).parent().parent().attr('id');
    var uri = $(elem).parent().siblings('input').val();

            var options = {
                media: {
                    constraints: {
                        audio: true,
                        video: false
                    }
                }
            };

    var session = appsip.invite(uri,options);
    createNewSession(uri, session);
}





// CHECKING PRESENCE REGISTRATION FOR EvERY 60 SECONDS
function check_presences_registration_timer(){
    $(".not-add-user").each(function(){
        var uri = $(this).children('.hidden_uri').val();
        var indexofat = uri.indexOf('@');
        var username = uri.slice(0,indexofat);
        var domain = uri.slice(indexofat+1);
        var npen = $(this).attr('id');
            npen = npen.substr(1,3);


        //Checking user for registration
        var url_location_id = url_locations+"/search/countByExtNumberAndDomain";

        $.ajax({
                    type: 'GET',
                    contentType: 'application/json',
                    crossDomain: true,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader ("Authorization", "Bearer " + token);
                    },
                    url: url_location_id,
                    data:{
                        ext_number:username,
                        domain:domain,
                    },
                    success: function (response) {
                        is_presence_registered(response,username,npen,uri);
                    },
                    error: function(response) {
                        console.log (response);
                        console.log ("Cannot search for presence registration"+url_location_id);
                        $('#app-token-error').css("display","block");
                    }
             });

    });
}
