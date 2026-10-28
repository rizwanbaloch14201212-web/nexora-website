const $ = (selector) => document.querySelector(selector);

const clock = $("#clock");
function updateClock() {
  if (clock) clock.textContent = new Intl.DateTimeFormat(undefined, {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false
  }).format(new Date());
}
updateClock();
setInterval(updateClock, 1000);

const themeToggle = $("#themeToggle");
themeToggle?.addEventListener("click", () => {
  const light = document.body.classList.toggle("light");
  themeToggle.textContent = light ? "◑ Dark theme" : "◐ Light theme";
});

const menuToggle = $("#menuToggle");
const navLinks = $("#navLinks");
menuToggle?.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
navLinks?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

const searchInput = $("#searchInput");
const ideaCards = [...document.querySelectorAll(".idea-card")];
const noResults = $("#noResults");
searchInput?.addEventListener("input", () => {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;
  ideaCards.forEach(card => {
    const text = `${card.dataset.search || ""} ${card.innerText}`.toLowerCase();
    const match = text.includes(query);
    card.hidden = !match;
    if (match) visible++;
  });
  noResults.hidden = visible !== 0;
});

async function checkStatus() {
  const status = $("#serverStatus");
  if (!status) return;
  try {
    const response = await fetch("/api/status");
    if (!response.ok) throw new Error("status request failed");
    const data = await response.json();
    status.textContent = data.status === "online" ? "System online" : "System available";
  } catch {
    status.textContent = "Preview mode";
  }
}
checkStatus();

$("#contactForm")?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const output = $("#formResponse");
  const button = form.querySelector("button[type='submit']");
  output.textContent = "Sending…";
  button.disabled = true;
  try {
    const response = await fetch("/api/contact", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({
        name: $("#name").value.trim(),
        message: $("#message").value.trim()
      })
    });
    const result = await response.json();
    output.textContent = result.message || "Request completed.";
    if (response.ok) form.reset();
    if (!response.ok) output.style.color = "#ff9eaa";
    else output.style.color = "#8ef0c7";
  } catch {
    output.textContent = "The Python server is not connected. Run the app.py server to use this form.";
    output.style.color = "#ffcf8b";
  } finally {
    button.disabled = false;
  }
});
  
