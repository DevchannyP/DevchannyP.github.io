---
title: "JAVA"
layout: categories
permalink: /categories/java/
author_profile: true
---

<ul>
  {% for post in site.categories.css %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%Y-%m-%d" }}
    </li>
  {% endfor %}
</ul>
