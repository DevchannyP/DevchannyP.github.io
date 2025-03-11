---
title: "Posts by Category"
layout: categories
permalink: /categories/
taxonomy: category
author_profile: true
---

이 페이지에서는 블로그의 모든 카테고리를 볼 수 있습니다.

{% for category in site.categories %}
  <h2 id="{{ category[0] }}">{{ category[0] }}</h2>
  <ul>
    {% for post in category[1] %}
      <li>
        <a href="{{ post.url }}">{{ post.title }}</a> - {{ post.date | date: "%Y-%m-%d" }}
      </li>
    {% endfor %}
  </ul>
{% endfor %}
