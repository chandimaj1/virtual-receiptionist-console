/*----------------------
    App Phone related JS
----------------------*/

function phone_call_out(){
    var uri = $('#phone-display').val();

            var options = {
                media: {
                    constraints: {
                        audio: true,
                        video: false
                    }
                }
            };
    var session = appsip.invite(uri,options);
    console.log("Creating new session for the invite");
    console.log(session);
    createNewSession(uri, session);
}


function get_today(){
    var today = new Date();
     today.setDate(today.getDate()-30);
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!

    var yyyy = today.getFullYear();
    if(dd<10){
        dd='0'+dd;
    } 
    if(mm<10){
        mm='0'+mm;
    } 
    var today = mm+'/'+dd+'/'+yyyy;
    return (today);
}

//Call log from cloud
function call_log_from_cloud(sort,search){
    if (!sort){
        sort = "date,asc";
    }
    if (!search){
        search="";
    }
    
    load_call_ins(sort,search);
    load_call_out(sort,search);
}

//Call history in
function load_call_ins(sort,search){
    var url_calls_id = "/callHistoryIns/search/findByLocalExtensionNumberAndDomainAndDateAfterAndCallingStationIdIgnoreCaseContaining";
   
    var app_ext = getCookie('app_ext');
    var app_uri = getCookie('app_uri');
    var split_uri = app_uri.split('@');
    app_domain = split_uri[1];
    console.log("app domain:",app_domain);
    console.log("app ext:"+app_ext);
    
    var date = get_today();
    console.log('Call history in called!. \n ext:'+app_ext+' domain:'+app_domain+' date:'+date+' search:'+search+' sort:'+sort);



    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        crossDomain: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        data:{
            size:100,
            page:0,
            sort:sort,
            date:date,
            local_ext:app_ext,
            domain:app_domain,
            search_calling_station_id:search,
        },
        url: url_calls_id,
        success: function (response) {
            console.log(response);
            var direction = 'call_in';
            load_calls_from_cloud(response,direction); // Load directory from cloud
        },
        error: function(response) {
            console.log (response);
            console.log ("Error getting calls hostory !");
            $('#app-token-error').css("display","block");
        }
    });
}


//Call history OUT
function load_call_out(sort,search){

    var url_calls_id2 = "/callHistoryOuts/search/findByLocalExtensionNumberAndDomainAndDateAfterAndCalledStationIdIgnoreCaseContaining";
    
     /*
    findByLocalExtensionNumberAndDomainAndDateAfterAndCalledStationIdIgnoreCaseContaining{?local_ext,domain,date,search_called_station_id,page,size,sort}
    */
    
    var app_ext = getCookie('app_ext');
    var app_uri = getCookie('app_uri');
    var split_uri = app_uri.split('@');
    app_domain = split_uri[1];
    console.log("app domain:",app_domain);
    console.log("app ext:"+app_ext);
    
    var date = get_today();
    
    console.log('Call history out called!. \n ext:'+app_ext+' domain:'+app_domain+' date:'+date+' search:'+search+' sort:'+sort);


    if (!sort){
        sort = "date,asc";
    }
    if (!search){
        search="";
    }

    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        crossDomain: true,
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        data:{
            size:100,
            page:0,
            sort:sort,
            date:date,
            local_ext:app_ext,
            domain:app_domain,
            search_called_station_id:search,
        },
        url: url_calls_id2,
        success: function (response) {
            console.log(response);
            var direction = 'call_out';
            load_calls_from_cloud(response,direction); // Load directory from cloud
        },
        error: function(response) {
            console.log (response);
            console.log ("Error getting calls hostory !");
            $('#app-token-error').css("display","block");
        }
    });
}


function load_calls_from_cloud(response,direction){
    if (direction=="call_in"){
        $.each(response._embedded.callHistoryIns, function(i, item) {
           //var destination = response._embedded.callHistoryIns[i].destination;
            var calling = response._embedded.callHistoryIns[i].callingStationId;
            var domain = response._embedded.callHistoryIns[i].domain;
            var timestamp = response._embedded.callHistoryIns[i].date;
            var duration = response._embedded.callHistoryIns[i].duration;
          update_call_log(calling,calling,domain,timestamp,duration,direction);
        }); 
        
    }else if(direction=="call_out"){
        $.each(response._embedded.callHistoryOuts, function(i, item) {
            //var destination = response._embedded.callHistoryOuts[i].destination;
            var calling = response._embedded.callHistoryOuts[i].calledStationId;
            var domain = response._embedded.callHistoryOuts[i].domain;
            var timestamp = response._embedded.callHistoryOuts[i].date;
            var duration = response._embedded.callHistoryOuts[i].duration;

            update_call_log(calling,calling,domain,timestamp,duration,direction);
        });
    }
    
    
}

    function format_time(timestamp){
        var t = timestamp;
        if(!t){
          t = "0000000000000000000000000000000000000";
        }
        var date = t.substring(0,10);
        var time = t.substring(11,19);
        x = time+" "+date;
        return (x);
    }
    function format_duration(duration){
      var hours = Math.floor(duration / 3600);
      var minutes = Math.floor(duration / 60);
      var seconds = Math.floor(duration % 60);
      var displayText =  hours + ":" + (minutes < 10 ? "0" : "")  + minutes + ":" + (seconds < 10 ? "0" : "") + seconds ;
        return (displayText);
    }

// Updating call log
function update_call_log(destination,calling,domain,timestamp,durationx,direction){

    console.log("updating call log...");

        var domain = domain;
        var time = format_time(timestamp);
        var duration = format_duration(durationx);
        var number;
        var direction;// 1 - Outgoing, 2 - Incoming
        var app_ext = getCookie("app_ext");
        var app_domain = getCookie("app_domain");

console.log("direction="+direction+" destination="+destination+" calling="+calling+" app_ext="+app_ext);

    if(direction=='call_in'){
        number = calling;
        var direction=1;
        add_to_call_log(direction,number,domain,time,duration,timestamp,durationx);
    }
    if(direction=='call_out'){
        number = calling;
        var direction=2;
        add_to_call_log(direction,number,domain,time,duration,timestamp,durationx);
    }
} 

function add_to_call_log(direction,number,domain,time,duration,t,d){
    var call_div_id;
    if (direction==2){
        call_div_id = 'history-log-in';
    }else if(direction==1){
        call_div_id = 'history-log-out';
    }

    var x ='<div class="log-row" data-t="'+t+'" data-d="'+d+'"><div class="col-md-4 class_number">'+number+'</div><div class="class_domain">'+domain+'</div><div class="col-md-3">'+time+'</div><div class="col-md-3">'+duration+'</div><div class="col-md-2"><div class="log-callbtn" onclick="log_call(this)"><i class="icon icon-icon-call-answer"></i> Call</div></div></div>';
    //Add entry to log pool
    $('#'+call_div_id+" .added_rows").prepend(x);
}

//LOG ENTRY USER CALL CLICK
function log_call(elem){

    var number = $(elem).parent().siblings('.class_number').html();
    var domain = $(elem).parent().siblings('.class_domain').html();
    var uri = number+"@"+domain;

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


//PHONE DIRECTORY
function directory_from_cloud(sort,search){
     var url_directory_id = url_directories + "/search/findAllByNameIgnoreCaseContainingAndDomainOrExtIgnoreCaseContainingAndDomain";
    if(!sort){
        sort = "name,desc";
    }
    if(!search){
        search = "";
    }
    $.ajax({
        type: 'GET',
        contentType: 'application/json',
        beforeSend: function (xhr) {
            xhr.setRequestHeader ("Authorization", "Bearer " + token);
        },
        crossDomain: true,
        data:{
            size:1000,
            sort:sort,
            name:search,
            extension:search,
            domain:app_domain,
        },
        url: url_directory_id,
        success: function (response) {
            console.log(response);
            load_directory_from_cloud(response); // Load directory from cloud
        },
        error: function(response) {
            console.log (response);
            console.log ("Error getting directory !");
            $('#app-token-error').css("display","block");
        }
    });
}

function load_directory_from_cloud(response){
    $.each(response._embedded.directories, function(i, item) {
            var category = response._embedded.directories[i].category;
            var domain = response._embedded.directories[i].domain;
            var ext = response._embedded.directories[i].ext;
            var name = response._embedded.directories[i].name;

            update_directory(category,domain,ext,name);
    });
}

function update_directory(category,domain,ext,name){
    var x ='<div class="log-row"><div class="col-md-6 class_name">'+name+'</div><div class="col-md-4 class_ext">'+ext+'</div><div class="col-md-2"><div class="log-callbtn" onclick="directory_call(this)"><i class="icon icon-icon-call-answer"></i> Call</div></div></div>';
    //Add entry to log pool
    $("#directory .added_rows").prepend(x);
}
//DIRECTORY CALL CLICK
function directory_call(elem){

    var ext = $(elem).parent().siblings('.class_ext').html();
    //var domain = $(elem).parent().siblings('.class_domain').html();
    var uri = ext;

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
