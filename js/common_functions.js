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
    $("header").html(response.title);
    var index = 0;

    for (var i =0 ; i < response.articles.length ; i++)
    {
        $('<article class="first_page_article">'+response.articles[i].content +'</article>').appendTo('#articlesSection');
    }
    $('#signIn').html(response.loginEmail);

}