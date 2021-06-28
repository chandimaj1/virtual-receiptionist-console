//Global Variables

//URL related variables
var protocol = location.protocol;
var domain = location.hostname+(location.port ? ':'+location.port: '');
var fullurl = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');

// Get Parameters from URI
var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};
var url_uname = getUrlParameter('username');
var url_pw = getUrlParameter('password');

//replace URL in browser
if(window.location.href.indexOf("?") > -1) {
    window.history.pushState("object or string", "Title", "/"+"" );
}

var token = "" //Token

var url_sessions = "/sessions"; //Sessions
var session_id; //App Session ID set from session login
var url_presences = "/presenceEntities"; //presenceEntities
var url_call_log = "/calls";//Call History
var url_directories = "/directories";//Call History
var url_locations = "/consoleLocations";//Call History
var presence = []; // For closing and opening presenses
var appsip; // app console user agent
var hold = []; // true if on hold. false if not on hold.
    hold[1]=false;
    hold[2]=false;
    hold[3]=false;
    hold[4]=false;

//Status Lines
var status_line = [];
    status_line[1] = "deact";
    status_line[2] = "deact";
    status_line[3] = "deact";
    status_line[4] = "deact";

//Sessions
var sessions = [];
var app_domain;
//UI
var opened_tab = "users";

//Next Available NPEN - Presence Entities
var npens = [];
var i; for (i=100;i<221;i++){ npens[i]="free"}

//Next Available HPEN - Huntgroups
var hpens = [];
var i; for (i=0;i<101;i++){ hpens[i]="free"}

var pmax=0; // Maximum allowed presence entities
var hmax=0; // Maximum allowed huntgroups
