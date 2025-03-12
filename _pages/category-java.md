---
layout: category
title: "JAVA"
category: java
permalink: /categories/java/
---

<ul>
  {% for post in site.categories.css %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%Y-%m-%d" }}
    </li>
  {% endfor %}
</ul>
