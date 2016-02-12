$(document).ready(function(){
    document.addEventListener('deviceready',onDeviceReady,false);
});

function onDeviceReady(){
    var channel = 'TechGuyWeb';

    getPlaylist(channel);

    $(document).on('click', '#vidlist li', function(){
        showVideo($(this).attr('videoid'));
    });
}

function getPlaylist(channel){
    $("#vidlist").html('');
    $.get(
        "https://www.googleapis.com/youtube/v3/channels",
        {
            part: 'contentDetails',
            forUsername: channel,
            key:'AIzaSyA8uCH7V165yVbAWnX_yOtN9SmKw6ClR3w'
        },
        function(data){
            $.each(data.items, function(i, item){
                console.log(item);
                playlistId = item.contentDetails.relatedPlaylists.uploads;
                getVideos(playlistId, 10);
            });
        }
    );
}

function getVideos(playlistId, maxResults){
    $.get(
       "https://www.googleapis.com/youtube/v3/playlistItems",
        {
            part: 'snippet',
            maxResults: maxResults,
            playlistId: playlistId,
            key:'AIzaSyA8uCH7V165yVbAWnX_yOtN9SmKw6ClR3w'
        }, function(data){
           var output;
            $.each(data.items, function(i, item){
                id = item.snippet.resourceId.videoId;
                title = item.snippet.title;
                thumb = item.snippet.thumbnails.default.url;
                $('#vidlist').append('<li videoId="'+id+'"><img src="'+thumb+'"><h3>'+title+'</h3></li>');
                $('#vidlist').listview('refresh');
            });
        }
    );
}

function showVideo(id){
    console.log('Showing Video '+ id);
    $('#logo').hide();
    var output = '<iframe width="100%" height="250" src="https://www.youtube.com/embed/'+id+'" frameborder="0" allowfullscreen></iframe>';
    $('#showVideo').html(output);
}


















