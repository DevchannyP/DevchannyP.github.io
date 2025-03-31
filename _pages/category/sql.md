---
layout: devchannyp
title: "SQL"
permalink: /category/sql/
---

<h1>🗂️ SQL 카테고리 글 목록</h1>

<main class="main-grid">
  <section class="articles">
    {% for post in site.categories.sql %}
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

  <aside class="sidebar">
    <h3>인기있는 글</h3>
    <ul id="popular-posts">
      <!-- JS 렌더링 -->
    </ul>

    <h3>최근 댓글</h3>
    <ul>
      <li>🟣 씩씩한치타: 잘 읽었습니다!</li>
      <li>🟡 활기찬늑대: 잘보고 가요~</li>
    </ul>
  </aside>
</main>
