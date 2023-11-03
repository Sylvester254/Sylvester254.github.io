---
name: ImageSearch
tools: [Image Recognition, Python, Django, MySQL, DeepFace, AI, HTML&CSS]
image: /images/imagesearch/img1.png
description: Missing children image recognition application
---

<h1 style="font-family: Georgia;">ImageSearch</h1>

---
- This is a web-based application that facilitates the identification of missing children through facial recognition.
- It has a user interface as well as API endpoint.
- Users can submit details of missing children to a centralized database, when a child is reported missing. 
- By uploading an image to the search page, users are able to search through the database to look for children with similar facial traits. Utilizing opensource **Image Recognition Models**(i.e Facenet) available in the [DeepFace](https://github.com/serengil/deepface) library.

**NB: The image used below is just a random image from the internet and the details are also NOT REAL, it's just for demonstration purposes.**

### Search

![preview](/images/imagesearch/img2.png)

### Results(if there is a match)
![preview](/images/imagesearch/img3.png)

### Recording missing child
![preview](/images/imagesearch/img4.png)

### API usage
![preview](/images/imagesearch/img5.png)

<p class="text-center">
{% include elements/button.html link="https://github.com/Sylvester254/ImageSearch" text="Learn More" %}
</p>