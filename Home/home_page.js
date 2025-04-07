async function loadPage(pageName) {
  try {
    const response = await fetch(pageName);
    const data = await response.text();
    document.getElementById("content").innerHTML = data;
  } catch (error) {
    document.getElementById("content").innerHTML = "<p>Error loading page.</p>";
  }
}

document.querySelectorAll('.nav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    // Remove 'active' from all
    document.querySelectorAll('.nav a').forEach(el => el.classList.remove('active'));

    // Add 'active' to clicked
    this.classList.add('active');

    // Load the page
    const page = this.getAttribute('data-page');
    loadPage(page);
  });
});

loadPage("../Events/events.html");
