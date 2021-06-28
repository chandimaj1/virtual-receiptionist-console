//Get Current session
function get_current_session(){
    var url = url_sessions + "/search/getCurrentSession/";
    $.ajax({
        type: 'GET',
        url: url,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        success: function (response) {
            console.log('Current session data retrieved');
            console.log(response);
            //SET CURRENT SESSION ID
                var z = response._links.self.href;
                var n = z.lastIndexOf("/");
                session_id = z.substr(n+1);

            app_login_with_response(response);
        },
        error: function(response) {
            console.log ("error retrieving current session data");
            console.log (response);
            $('#app-token-error').css("display","block");
        }
    });

}

//Try app login with current session response
function app_login_with_response(response){
    var app_uri = format_nulls(response.uri);
    var app_ext = format_nulls(response.extensionNumber);
    var app_uname = format_nulls(response.authUsername);
    var app_pw = format_nulls(response.authPassword);
    var app_ws = format_nulls(response.wsServer);

    //Saving login in cookies
    setCookie('app_uri',app_uri,12);
    setCookie('app_uname',app_uname,12);
    setCookie('app_ws',app_ws,12);
    setCookie('app_ext',app_ext,12);
    setCookie('app_pw',app_pw,12);
    var split_uri = app_uri.split('@');
    app_domain = split_uri[1];

    // If found null/'' values
    if (!app_uri || !app_ext || !app_uname || !app_pw || !app_ws){
        console.log("Missing fields for auto_login. Prompt for missing information");
        $('#app-token-error').css("display","block");
        //prompt_applogin();


    }else{
        console.log("All fields available. Login ua...");
        login_new_ua(app_uri,app_uname,app_ws,app_pw,app_ext);
    }
}

// Re-Format null '' and 'null' as ''
function format_nulls(parameter){
    var x='';
    if (parameter=="null" || parameter=="" || parameter==null){
        x = '';
    }else{
        x = parameter;
    }
    return (x);
}

function update_sessions_table(app_uri,app_uname,app_ws,app_pw,app_ext){
    var session_url = url_sessions+session_id;
    var dataObj = {
            uri: app_uri,
            authUsername:app_uname,
            authPassword:app_pw,
            wsServer:app_ws,
            extensionNumber:app_ext
    }
     $.ajax({
        type: 'PATCH',
        contentType: 'application/json',
        crossDomain: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        url: session_url,

        data: JSON.stringify(dataObj),
        dataType: 'JSON',
        success: function (response) {

            //Saving login in cookies
            setCookie('app_uri',app_uri,12);
            setCookie('app_uname',app_uname,12);
            setCookie('app_ws',app_ws,12);
            setCookie('app_ext',app_ext,12);
            setCookie('app_pw',app_pw,12);
                var split_uri = app_uri.split('@');
            app_domain = split_uri[1];

            console.log('Session updated. Login new ua...');
            login_new_ua(app_uri,app_uname,app_ws,app_pw,app_ext);
        },
        error: function(response) {
            $('#app_login-error').html("Error : session update failed.");
            console.log('session creation failed');
            console.log (response);
            $('#app-token-error').css("display","block");
        }
    });

}


