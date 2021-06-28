//SORTING
function sort_list(e){
    var x = $(e).find(":selected").val();
    if (x=="user_name_asc"){user_name_asc(); // User ASCENDING
    }else if(x=="user_name_dsc"){user_name_dsc(); // User DESCENDING
    }else if(x=="time_asc"){ time_asc(); // HISTORY TIME ASCENDING
    }else if(x=="time_desc"){ time_desc(); // HISTORY TIME DESCENDING
    }else if(x=="dur_asc"){ dur_asc(); // HISTORY DURATION ASCENDING
    }else if(x=="dur_desc"){ dur_desc(); // HISTORY DURATION DESCENDING
    }else if(x=="phone_name_asc"){ phone_name_asc(); // DIRECTORY NAME ASCENDING
    }else if(x=="phone_name_desc"){ phone_name_desc(); // DIRECTORY NAME DESCENDING
    }

}



function user_name_asc(){ // User ASCENDING
    var y=[]; var i=1; // Array obj

        $('.not-add-user').each(function(){
            var id = $(this).attr('id');
            var name =$(this).children('.user-name').text();
            y[i]=[id,name];
            i++;
        });

                //Sorting by name
                y.sort(function(a,b){
                    if (a[1] === b[1]) {
                        return 0;
                    }
                    else {
                        return (a[1] < b[1]) ? -1 : 1;
                    }
                });

            var adduser = $("#adduser").detach(); // detach add user
            // arrange each user entity
            y.forEach(function(e){
               var npen = e[0];
                var z = $("#"+npen).detach();
                z.appendTo('#app-users');
            });
            //attach adduser at the end
            adduser.appendTo('#app-users');
}


function user_name_dsc(){// User DESCENDING
    var y=[]; var i=1; // Array obj

        $('.not-add-user').each(function(){
            var id = $(this).attr('id');
            var name =$(this).children('.user-name').text();
            y[i]=[id,name];
            i++;
        });

                //Sorting by name
                y.sort(function(a,b){
                    if (a[1] === b[1]) {
                        return 0;
                    }
                    else {
                        return (a[1] > b[1]) ? -1 : 1;
                    }
                });

            var adduser = $("#adduser").detach(); // detach add user
            // arrange each user entity
            y.forEach(function(e){
               var npen = e[0];
                var z = $("#"+npen).detach();
                z.appendTo('#app-users');
            });
            //attach adduser at the end
            adduser.appendTo('#app-users');
}

function time_asc(){// HISTORY DATE ASCENDING
        $('#added_rows_out').html('');
        $('#added_rows_in').html('');
        call_log_from_cloud("date,desc");
}

function time_desc(){// HISTORY DATE ASCENDING
        $('#added_rows_out').html('');
        $('#added_rows_in').html('');
        call_log_from_cloud("date,asc");
}

function dur_asc(){// HISTORY DATE ASCENDING
        $('#added_rows_out').html('');
        $('#added_rows_in').html('');
        call_log_from_cloud("duration,desc");
}

function dur_desc(){// HISTORY DATE ASCENDING
        $('#added_rows_out').html('');
        $('#added_rows_in').html('');
        call_log_from_cloud("duration,asc");
}

function phone_name_asc(){// DIRECTORY NAME ASCENDING
        $('#added-directory-rows').html('');
        directory_from_cloud("name,desc");
}

function phone_name_desc(){// DIRECTORY NAME DESCENDING
        $('#added-directory-rows').html('');
        directory_from_cloud("name,asc");
}


