const urlParams = new URLSearchParams(window.location.search);
const episodeId = urlParams.get("episode");
const mediaId = urlParams.get("show");

if (document.getElementById("blazer") && document.getElementById('blazer').innerHTML === 'Official <span>Blazer</span> Service') {
  if (episodeId && mediaId) {
    document.getElementById('content').style.display = 'none';

    var video = document.getElementById('player');
    video.style.display = 'block';
    var hls = new Hls();
    fetch(`https://api.consumet.org/movies/flixhq/watch?episodeId=${episodeId}&mediaId=${mediaId}`)
      .then(response => response.json())
      .then(data => {
        hls.loadSource(data.sources[0].url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function() {
          video.play();
        });

        if (data.subtitles && data.subtitles.length > 0) {
          var subtitleTrack = document.getElementById('subtitleTrack');
          subtitleTrack.src = data.subtitles[0].url;
        }
      });


    const player = new Plyr(video);
  }
  document.querySelector('#location').innerHTML = window.location.href + '?movie=watch-puss-in-boots-the-last-wish-91342';
  document.querySelector('#location').onclick = function() {
    window.open("/?movie=watch-puss-in-boots-the-last-wish-91342", "_blank");
  }
} else {
  alert('Not an Official service')
  document.body.innerHTML = ''
}
