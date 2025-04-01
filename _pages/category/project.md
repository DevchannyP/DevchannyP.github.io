---
layout: default
title: "📁 프로젝트"
permalink: /categories/project/
---
{% for post in site.categories.project %}
  <article class="post-card">
    <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
    <p>{{ post.excerpt }}</p>
  </article>
{% endfor %}
