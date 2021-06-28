function search_keypress(e){
                    if (e.keyCode === 13) {
                    //checks whether the pressed key is "Enter"
                       search_tabs();
                    }
}


function search_tabs(){
    var search = $('#searchfield').val();
    var tab = opened_tab;
    if (tab=="users"){ // Search Users
        $('.not-add-user').css("display","none");
        //Case insensitivity for :contains
        $.expr[":"].contains = $.expr.createPseudo(function(arg) {
            return function( elem ) {
                return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
            };
        });

        $(".not-add-user .user-name:contains("+search+")").each(function(){
           var x = $(this).parent().css("display","block");
        });

    }else if (tab=="history"){//Search call history
        $('#added_rows_out').html('');
        $('#added_rows_in').html('');
        call_log_from_cloud(null,search);
    }else if (tab=="phonebook"){//Search Phone Directory
        $('#added-directory-rows').html('');
        directory_from_cloud(null,search);
    }
}
