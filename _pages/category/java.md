---
layout: devchannyp
title: "Java"
permalink: /category/java/
---

<h1>🗂️ Web 카테고리 글 목록</h1>

<ul>
  {% for post in site.categories.web %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
      <small>({{ post.date | date: "%Y-%m-%d" }})</small>
    </li>
  {% endfor %}
</ul>
