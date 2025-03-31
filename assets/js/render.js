
const raw = document.getElementById('posts-data').textContent;
const posts = JSON.parse(raw);

function renderArticles(category) {
  const list = document.getElementById('articleList');
  list.innerHTML = '';
  posts
    .filter(post => category === '전체' || post.category === category)
    .forEach(post => {
      const article = document.createElement('div');
      article.className = 'article-card';
      article.innerHTML = `<a href="${post.url}">
        <h3>${post.title}</h3>
        <p>${post.excerpt}</p>
        <time>${post.date}</time>
      </a>`;
      list.appendChild(article);
    });
}
function filterCategory(category) {
  document.querySelectorAll('.tabs button').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  renderArticles(category);
}
renderArticles('전체');
