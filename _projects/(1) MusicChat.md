---
name: MusicChat
tools: [Python, Flask, HTML&CSS, JavaScript, MySQL, Spotify API, Firebase Realtime database]
image: /images/musichat/img2.png
description: Best site to enjoy music while chatting with friends.
---

<h1 style="font-family: Georgia;">MusicChat</h1>

---

{% capture carousel_images %}
/images/musichat/img1.png
/images/musichat/img3.png
/images/musichat/img4.png
/images/musichat/img5.png
{% endcapture %}
{% include elements/carousel.html %}

MusicChat is a web application that allows users to listen to their favorite music while chatting with other music enthusiasts in real-time. With MusicChat, users can search for and stream their favorite music tracks from Spotify's music catalog, and communicate with others in a chatroom in real-time. The application is built using Python and Flask, and includes a database for storing user data and music data.


## Third-Party Services Used
**APIs and External Services:**

**Spotipy/Spotify API:** MusicChat leverages the Spotipy library to interact with the Spotify API, allowing users to search for music and retrieve track information, such as artist, album, and album cover art. The API enables audio playback using Spotify Embeds, which allows users to listen to music directly within the MusicChat platform.

**Firebase Realtime Database:** The chatroom functionality in MusicChat is powered by Firebase Realtime Database, which enables real-time updates and communication among users. Firebase synchronizes and stores chat messages, allowing users to experience a live and engaging chat environment.


<p class="text-center">
{% include elements/button.html link="https://github.com/Sylvester254/MusicChat" text="Learn More" %}
</p>