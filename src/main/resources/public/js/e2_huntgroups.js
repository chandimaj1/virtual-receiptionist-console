//Get Hungroup Max for user
function get_hmax(){
     var url_hunt_max = "/customers/search/findOneByCompanyDomain";
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        crossDomain: true,
        url: url_hunt_max,
        data:{
            company_domain:app_domain,
        },
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        success: function (response) {
            console.log(response);
            hmax = parseInt(response.huntgroupEntityMax);
            pmax = parseInt(response.presenceEntityMax);
            console.log("Presence Max:"+pmax+" Huntgroup Max:"+hmax);
            entities_from_cloud(); // Load saved presence entities
            huntgroup_entities_from_cloud(); // Load saved Huntgroup Entities
            init_ui_status(); // UI lock/unlock status update
        },
        error: function(response) {
            console.log (response);
            console.log ("Error getting huntgroup entities for !"+url_session_id);
            $('#app-token-error').css("display","block");
        }
    });
}


//LOAD HUNTGROUP ENTITIES FROM CLOUD
function huntgroup_entities_from_cloud(){
    var url_session_id = url_sessions+"/"+ session_id + "/huntgroupEntities";
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        crossDomain: true,
        url: url_session_id,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        success: function (response) {
            console.log("Huntgroup Entities From Cloud Loaded for "+url_session_id);
            console.log(response);
            add_huntgroup_entities(response);
        },
        error: function(response) {
            console.log (response);
            console.log ("Error getting huntgroup entities for !"+url_session_id);
            $('#app-token-error').css("display","block");
        }
    });
}
    //Adding saved entities to interface
    function add_huntgroup_entities(response){
        $.each(response._embedded.huntgroupEntities, function(i, item) {
                var hunt_name = response._embedded.huntgroupEntities[i].name;
                var ext = response._embedded.huntgroupEntities[i].extNumber;
                var domain = response._embedded.huntgroupEntities[i].domain;
                var color = response._embedded.huntgroupEntities[i].backgroundColour;
                    var hunt_uri = ext+"@"+domain;
                var hunt_link = response._embedded.huntgroupEntities[i]._links.huntgroupEntity.href;

                add_huntgroup(hunt_uri,hunt_name,hunt_link,color)
         });
    }

//Available list of huntgroups from cloud
function huntgroups_from_cloud(){
    var url_huntgroups = "huntgroups/search/findByCustomerDomain";

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        crossDomain: true,
        url: url_huntgroups,
        data:{
                customer_domain:app_domain,
                },
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        success: function (response) {
            console.log("Huntgroups loaded for"+app_domain);
            console.log(response);
            update_hunt_list(response);
        },
        error: function(response) {
            console.log (response);
            console.log ("Error getting huntgroups for !"+app_domain);
            $('#app-token-error').css("display","block");
        }
    });
}


//Update huntgroup list
function update_hunt_list(response){
    $('#hunt-list-placeholder').html("");
    var x = '<select id="add_hunt_list" class="sortlist selectpicker huntsort" onchange="" data-live-search="true">'+"<option disabled selected='true'>Select Huntgroup</option>";
    var y = "";
     $.each(response._embedded.huntgroups, function(i, item) {
            var name = response._embedded.huntgroups[i].displayname;
            var ext = response._embedded.huntgroups[i].huntgroupNumber;
            var domain = response._embedded.huntgroups[i].customerDomain;

          y = y + "<option value='"+ext+"@"+domain+"'>"+name+"</option>";
     });
    var z = x + y + "</select>";
    $('#hunt-list-placeholder').append(z);

    mark_added_on_list();

}
    // Check and mark for already added records
    function mark_added_on_list(){
        $('.not-add-huntuser #hunt_name').each(function(){
            var x = $(this).html();
            console.log('x:'+x);

            $('#add_hunt_list option').each(function(){
                var y = $(this).text();
                console.log("y:"+y);
                if(x==y){
                    $(this).remove();
                }
            });

        });

        $('#hunt-list-placeholder .selectpicker').selectpicker('render');
        openOverlay('add-huntgroup');
    }
//Submit new hunt group
function submit_newHuntgroup(){
    var hunt_uri = $('#add_hunt_list').val();
    var hunt_name = $('#add_hunt_list option:selected').text();
    add_new_huntgroup(hunt_uri,hunt_name);
}

// Add new hunt group to system
function add_new_huntgroup(uri,hunt_name){
    // Seperating ext and domain
    var split_uri = uri.split('@');
            var hunt_ext = split_uri[0];
            var hunt_domain = split_uri[1];

    var url = '/huntgroupEntities';

     var dataObj = {
        domain : hunt_domain,
        extNumber : hunt_ext,
        name : hunt_name,
    }

    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        crossDomain: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        url:url,
        data: JSON.stringify(dataObj),
        dataType: 'JSON',
        success: function (response) {
            console.log("huntgroup saved in huntgroupentities");
            console.log(response);
            var huntgroup_link = response._links.huntgroupEntity.href;
            put_huntgroup_to_session(huntgroup_link,uri,hunt_name);
        },
        error: function(response) {
            console.log("huntgroup save failed");
            console.log (response);
            $('#hunt_error').html('Error Saving Huntgroup!');
        }
    });
}


// Linking huntgroup with session
function put_huntgroup_to_session(hunt_link,hunt_uri,hunt_name){
    var url_sessions_link = url_sessions + "/" + session_id;
    var url_hunt_link = hunt_link + "/session";

    $.ajax({
        type: 'PUT',
        contentType: 'text/uri-list',
        crossDomain: true,
            beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        data:url_sessions_link,
        url:url_hunt_link,
        success: function (response) {
            console.log("Huntgroup Added to Session");
            closeOverlay('add-huntgroup');
            add_huntgroup(hunt_uri,hunt_name,hunt_link); //Add Huntgroup to pool
        },
        error: function(response) {
            console.log('Error adding user to appuser table !');
            console.log (response);
            $('#hunt_error').html('Error adding huntgroup to session');
        }
    });
}

// Get Next available hpen
function get_available_hpen(){
    var i;
    for(i=0;i<101;i++){
        if (hpens[i]=="free"){
            return i;
        }
    }
}

//ADD HUNTGROUP TO INTERFACE
function add_huntgroup(hunt_uri,hunt_name,hunt_link,color){

     var i = get_available_hpen(); //hpen - no of huntgroup entities
        i = parseInt(i);
        hpens[i]="taken";

        var hpen = i;

        $("<div class='hunt-user not-add-huntuser online' id='h"+hpen+"' style='background-color:#"+color+"'>").insertBefore("#addhuntuser");
        var x = $('#app_hunt_template').html();
        $("#h"+hpen).html(x);
        $("#h"+hpen+" #hunt_name").html(hunt_name);
        $("#h"+hpen+" .hidden_uri").val(hunt_uri);
        $("#h"+hpen+" .hidden_plink").val(hunt_link);

       // Check for max nu of hunt groups
    var x = $('.not-add-huntuser').length;
        console.log("hmax is:"+hmax);
        console.log("No of hunt entities:"+x);

        var hmax2 = hmax - 1;
        
        if (lock_status){ // UI Lock TRUE
            console.log('Hunt user:hide (UI Locked)');
            $('#addhuntuser').css("display","none");
            $('#hunt_row').css("display","none");
        }else if (x>hmax2 || x==hmax2){ // Max alloved hunt groups reached
            console.log("max no of huntgroups allowed reached !");
            $('#addhuntuser').css("display","none");
            $('#hunt_row').css("display","none");
        }else if(x%6==0){ //If huntentities are a multiple of 6
            console.log("Multiple of 6 reached !");
            $('#addhuntuser').css("display","none");
            $('#hunt_row').css("display","block");
        }else{
            console.log("Not a multiple of 6 nor max huntgroup capacity reached !");
            $('#addhuntuser').css("display","block");
            $('#hunt_row').css("display","none");
        }

    init_ui_status();
}

    //Add new hunt row
    function add_hunt_row(){
        $('#addhuntuser').css("display","block");
        $('#hunt_row').css("display","none");
    }


//DELETE HUNTGROUP FROM CLOUD on HUNTBOX X CLICK
function delete_hunt(parentdiv){

    //presenceEntity Link of the user
    var user_div_id = $(parentdiv.parentElement).attr('id');
    var hunt_link = $("#"+user_div_id+" .hidden_plink").val();

    $.ajax({
        type: 'DELETE',
        contentType: 'text/uri-list',
        crossDomain: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        url:hunt_link,

        success: function (response) {
            console.log("Huntgroup Deleted: "+hunt_link);
            remove_hunt(parentdiv);
        },
        error: function(response) {
            console.log ("Huntgroup delete unsuccessful :"+response);
            $('#app-token-error').css("display","block");
        }
    });

}

    function remove_hunt(parentdiv){
        var user_div_id = $(parentdiv.parentElement).attr('id');
        var user_presence_id = user_div_id.substr(1,3);

        $(parentdiv.parentElement).remove();

        var x = $('.not-add-huntuser').length; // No of hunt groups

         // Check for max nu of hunt groups
        var x = $('.not-add-huntuser').length;
        console.log("No of hunt entities after remove:"+x);

        if(x%6==0){ //If huntentities are a multiple of 6
            console.log("Multiple of 6 reached !");
            $('#addhuntuser').css("display","none");
            $('#hunt_row').css("display","block");
        }else{
            console.log("Not a multiple of 6 nor max huntgroup capacity reached !");
            $('#addhuntuser').css("display","block");
            $('#hunt_row').css("display","none");
        }

        hpens[user_presence_id]="free";
    }

