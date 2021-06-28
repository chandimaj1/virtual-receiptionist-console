//Setting Global Variables
var timer_variable = [];
var timer_function = [];

function timer_display_time(runtime,lineno) { // Show Timer on call timer
  // format time as m:ss.d
  var hours = Math.floor(runtime / 3600);
  var minutes = Math.floor(runtime / 60);
  var seconds = Math.floor(runtime % 60);
  var displayText =  hours + ":" + (minutes < 10 ? "0" : "")  + minutes + ":" + (seconds < 10 ? "0" : "") + seconds ;

  $("#line"+lineno+" .calltimeCounter").text(displayText);
}

function start_new_timer(lineno){ // Start New Timer
    timer_variable[lineno] = 0;
    timer_function[lineno] = setInterval(function(){
        timer_variable[lineno]++;
        timer_display_time(timer_variable[lineno],lineno);
    }, 1000);
}

function stop_timer(lineno){
    window.clearInterval(timer_function[lineno]);
}

// APP SIGNOUT
function app_signout_in(time){

}
