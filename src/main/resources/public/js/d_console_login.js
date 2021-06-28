//Get Token from cloud upon app load
function get_token(){

    var cookie_token = getCookie("token");

    if (url_uname!=undefined && url_pw!=undefined){ // IF USERNAME AND PASSWORD PASSED IN URL
            var url = protocol+"//"+'testjwtclientid'+':'+'XY7kmzoNzl100'+'@'+domain+'/oauth/token';
            //Values passed
             $.ajax({
                type: 'POST',
                contentType: 'application/x-www-form-urlencoded',
                crossDomain: true,
                url: url,
                data:{
                 grant_type: 'password',
                    username:url_uname,
                    password:url_pw
                     },
                success: function (response) {
                    console.log('Token recieve success. Token:');
                    console.log(response);
                    token = response.access_token;
                    setCookie("token",token,12);
                    get_current_session();
                    $('#app-token-error').css("display","none");
                },
                error: function(response) {
                    $('#app-token-error').css("display","block");
                    console.log('Token recieve failed.');
                    console.log (response);
                }
            });

        }else if(!cookie_token){ // TOKEN EXISTS
            $('#app-token-error').css("display","block");
            console.log("No token. No Uname or Pw.")
        }else{
            console.log("No uname and/or pw. Token found. Try login...");
            $('#app-token-error').css("display","none");
            token = getCookie("token");
            get_current_session();
        }

}



// SIP Console App User Sign IN prompt
function prompt_applogin(){
    //Setting saved settings from cookies
    var app_uri = getCookie('app_uri');
    var app_ext = getCookie('app_ext');
    var app_uname = getCookie('app_uname');
    var app_ws = getCookie('app_ws');
    var app_pw = getCookie('app_pw');

    $('#login_prompt_uri').val(app_uri);
    $('#login_prompt_ext').val(app_ext);
    $('#login_prompt_uname').val(app_uname);
    $('#login_prompt_ws').val(app_ws);
    $('#login_prompt_pw').val(app_pw);

    openOverlay('app-login-prompt');

}

// Validation for data entry
function set_app_domain(){
    var app_uri = $('#login_prompt_uri').val();
    var app_ext = $('#login_prompt_ext').val();
    var app_uname = $('#login_prompt_uname').val();
    var app_pw = $('#login_prompt_pw').val();
    var app_ws = $('#login_prompt_ws').val();

    if(app_uri!="" || app_uname!="" || app_ws!="" || app_pw!="" || app_ext!=""){
        //check_for_session(app_uri,app_uname,app_ws,app_pw,app_ext);
        $('#app_login-error').html("Configuring console...");
        update_sessions_table(app_uri,app_uname,app_ws,app_pw,app_ext);
    }else{
        $('#app_login-error').html("Missing Fields !");
        return false;
    }
}

// New User Agent Creation for APP
function login_new_ua(uri,uname,ws,pw,ext){
    

    console.log('Login using Following uri, uname, ws, pw');
    console.log(uri+","+uname+","+ws+","+pw);

    // Set 10 sec time out error for configuaration
     var config_timeout = setTimeout(function(){
                            $('#app_login-error').html("Error : User agent configuration failed.");
                        }, 10000);

    var user_info = {
            uri: uri,
            wsServers: [ws],
            authorizationUser: uname,
            password: pw,
            //rtcpMuxPolicy: 'negotiate',
            traceSip: true,
            register: true,
        };

    
    appsip = new SIP.UA(user_info);

    appsip.on('connected', function () {
        console.log('ua created. and connected !');
        app_listen_for_ring(); // Listen for incoming calls
        $('#app_login-error').html("");
        closeOverlay('app-login-prompt');
        
        clearTimeout(config_timeout); // Clears time out alert
    });

    appsip.on('registrationFailed', function (response, cause) {
        clearTimeout(config_timeout); // Clears time out alert
        $('#app_login-error').html("Error: User agent registration failed.");
    });
    
    
     //Set console user names
    console.log('setting console user name');
        var split_uri = uri.split('@');
        var domain = split_uri[1];
        $('#info-item-uname').html("Logging in...");
        set_console_user_names(domain,uname);
    
    get_hmax(); // Load realted huntgroup entities
    call_log_from_cloud(); // Load call history log
    directory_from_cloud(); // Load phone directory from cloud
}


//
function set_console_user_names(domain,uname){
console.log('Getting console user name');    
    //Getting usernames
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        crossDomain: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        data:{
            domain:domain,
            username:uname,
            size:1,
            page:0
        },
        url: '/subscribers/search/findByUsernameAndDomain',
        success: function (response) {
            console.log('Console user name retrieved.');
            console.log(response);
            var fname = response._embedded.subscribers[0].firstName;
            var lname = response._embedded.subscribers[0].lastName;
            var console_name = fname+" "+lname;
            $('#info-item-uname').html(console_name);
        },
        error: function(response) {
            console.log (response);
            console.log ("Console user name not retrieved !");
            $('#app-token-error').css("display","block");
        }
    });
}
        
    