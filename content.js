document.addEventListener('DOMContentLoaded', function() {
    const allVideosContainer = document.getElementById('all-videos-container');
    const popularVideosContainer = document.getElementById('popular-videos-container');

    const API_KEY = 'AIzaSyANlDx6uD_TGSL0NdspghCfU9ADebzDxXk';
    const CHANNEL_ID = 'UC90_95WDwIF-N7VW-OUNS5A';
    const MAX_RESULTS = 100;

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet,id&order=viewCount&maxResults=${MAX_RESULTS}`)
        .then(response => response.json())
        .then(data => {
            const videos = data.items;
            let popularVideos = [];
            let videoElements = '';

            videos.forEach((video, index) => {
                const videoId = video.id.videoId;
                const title = video.snippet.title;
                const thumbnail = video.snippet.thumbnails.medium.url;

                const videoElement = `
                    <div class="video">
                        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                            <img src="${thumbnail}" alt="${title}">
                            <p>${title}</p>
                        </a>
                    </div>
                `;

                videoElements += videoElement;
                if (index < 3) {
                    popularVideos.push(videoElement);
                }
            });

            allVideosContainer.innerHTML = videoElements;
            popularVideosContainer.innerHTML = popularVideos.join('');
        })
        .catch(error => console.error('Error fetching videos:', error));
});
