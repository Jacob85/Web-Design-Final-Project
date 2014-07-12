/**
 * Created by Jacob on 6/27/14.
 */

$(document).ready(function(){
    $.getJSON("includes/mainPageContent.json").done(function(response){
        console.log("Response from server: " + response);
        populateViews(response);
    })
});

function populateViews(response)
{
    for (var i =0 ; i < response.articles.length ; i++)
    {
        $('<article class="first_page_article">'+response.articles[i].content +'</article><br>').appendTo('#about');
    }

    $('.signInLabel').html(response.label);
    $('#signIn').html(response.loginEmail);

}