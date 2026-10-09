/* ============================================================
   Portfolio — interactions
   ============================================================ */

/* ------------------------------------------------------------
   VIDEO DEMOS — paste your YouTube links between the quotes.
   Example: greenhouse: "https://youtu.be/AbCdEfGhIjK"
   Leave "" to keep the button as a pending placeholder.
   ------------------------------------------------------------ */
const VIDEO_LINKS = {
  greenhouse: "",
  weatherproject: "",
};

(function applyVideoLinks() {
  document.querySelectorAll("[data-video]").forEach((btn) => {
    const key = btn.getAttribute("data-video");
    const url = (VIDEO_LINKS[key] || "").trim();
    if (url) {
      btn.href = url;
    } else {
      btn.classList.add("is-pending");
      btn.removeAttribute("target");
      btn.title = "Add the YouTube link in script.js (VIDEO_LINKS)";
      btn.addEventListener("click", (e) => e.preventDefault());
    }
  });
})();

/* ---------------- Marquee: duplicate track for a seamless loop ---------------- */
(function marquee() {
  const track = document.getElementById("marquee-track");
  if (!track) return;
  track.innerHTML += track.innerHTML;
})();

/* ---------------- Reveal on scroll ---------------- */
(function reveal() {
  const items = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) {
    items.forEach((el) => el.classList.add("is-in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
  );
  items.forEach((el) => io.observe(el));
})();

/* ---------------- Active nav link ---------------- */
(function activeNav() {
  const links = [...document.querySelectorAll(".nav__links a")];
  const sections = links
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);
  if (!sections.length || !("IntersectionObserver" in window)) return;

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) =>
          a.classList.toggle(
            "is-active",
            a.getAttribute("href") === "#" + entry.target.id
          )
        );
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );
  sections.forEach((s) => io.observe(s));
})();

/* ---------------- Footer year ---------------- */
document.getElementById("year").textContent = new Date().getFullYear();
