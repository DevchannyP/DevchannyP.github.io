---
layout: devchannyp
title: "CI/CD 자동화"
permalink: /category/server/cicd/
---

<h1>🗂️ CI/CD 자동화 카테고리 글 목록</h1>

<main class="main-grid">
  <section class="articles">
    {% for post in site.categories.cicd %}
      <div class="card post-card" data-category="{{ post.categories | join: ' ' }}">
        <div class="card-thumbnail" style="background-image: url('{{ post.thumbnail | default: '/assets/img/default.png' }}')"></div>
        <div class="card-content">
          <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
          <p>{{ post.excerpt | strip_html | truncate: 80 }}</p>
          <div class="card-meta">{{ post.date | date: "%Y년 %m월 %d일" }} · {{ post.author }}</div>
        </div>
      </div>
    {% endfor %}
  </section>
</main>
