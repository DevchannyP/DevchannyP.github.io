---
layout: archive
title: "IOT"
permalink: /categories/iot/
author_profile: true
---

{% for post in site.categories.programming %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%Y-%m-%d" }}
  </li>
{% endfor %}
