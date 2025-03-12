---
layout: category
title: "IOT"
category: iot
permalink: /categories/iot/
---

{% for post in site.categories.programming %}
  <li>
    <a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%Y-%m-%d" }}
  </li>
{% endfor %}
