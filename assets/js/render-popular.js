document.addEventListener("DOMContentLoaded", () => {
  fetch("/assets/data/views.json")
    .then(res => res.json())
    .then(posts => {
      const sorted = posts.sort((a, b) => b.views - a.views);
      const list = document.getElementById("popular-posts");
      sorted.slice(0, 5).forEach(post => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="${post.url}">${post.title}</a>`;
        list.appendChild(li);
      });
    });
});
