---
name: Personal Weather Station
tools: [IoT, Raspberry Pi Pico W, Micropython, sensors]
image: /images/pws/img.png
description: This project is a personal weather station that uses a Raspberry Pi Pico W and several weather sensors.
---

<h1 style="font-family: Georgia;">Personal Weather Station(PWS)</h1>

---
This project is a personal weather station that uses a `Raspberry Pi Pico W` and several sensors including a `raindrop sensor`, `BMP180`, and `DHT22`. The weather station monitors various weather parameters including rainfall, temperature, humidity, pressure, and altitude. This project enables the user to collect real-time weather data and provides an opportunity to analyze and understand the local weather patterns in detail.

### How it works: 
- The PWS connects to a Wi-Fi network,
- reads data from the sensors,
- performs some processing on the raw data,
- uploads the data to Weather Underground,
- displays it on a webpage hosted on the Raspberry Pi server,
- data logging the weather data into a csv file every 30 seconds,
- displays a few lines of the stored data in another webpage.

![preview](/images/pws/img2.png)

![preview](/images/pws/WU.png)

![preview](/images/pws/weatherdata.png)

<p class="text-center">
{% include elements/button.html link="https://github.com/Sylvester254/Personal_Weather_Station" text="Learn More" %}
</p>