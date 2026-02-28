document.addEventListener("DOMContentLoaded", () => {
  const splash = document.getElementById("splash");
  // lock scrolling while splash is visible
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    splash.classList.add("hidden");
    document.body.style.overflow = ""; // restore default

    // once the splash is gone we can safely fire trig again so the
    // hero/above‑the‑fold animations run when the user actually sees them
    if (window.trig && typeof window.trig.trigInit === "function") {
      // remove any classes trig may have added during initial load
      document
        .querySelectorAll(
          ".fade-up-trig, .fade-in-trig, .slide-left-trig, .slide-right-trig, .scale-in-trig",
        )
        .forEach((el) => {
          el.classList.remove(
            "trig",
            "trig-down",
            "trig-up",
            "trig-scroll-down",
            "trig-scroll-up",
          );
        });
      window.trig.trigInit();
    }
  }, 2600);

  // --- Dynamic Products Filter Logic ---

  // 1. Array of possible category IDs
  const categories = ["premium", "standard", "mineral", "special"];
  // Map text versions for dynamic UI
  const categoryNames = {
    premium: "Premium Feed",
    standard: "Standard Feed",
    mineral: "Mineral Mix",
    special: "Special Formula",
  };

  // 2. Select all product cards and randomly assign them a category ID
  // (As per USER request: "set category to rendom category id to filter it")
  const cards = document.querySelectorAll(".product-page-card");

  if (cards.length > 0) {
    cards.forEach((card) => {
      // Find the wrapper column for filtering
      const wrapper = card.closest(".col-lg-4, .col-md-6");
      if (wrapper) {
        // Pick a random category
        const randomCategory =
          categories[Math.floor(Math.random() * categories.length)];

        // Set the hidden data classification
        wrapper.setAttribute("data-category", randomCategory);

        // Inject the text visually onto the card so the user knows what they've got!
        const catTextSpan = card.querySelector(".product-category span");
        if (catTextSpan) {
          catTextSpan.textContent = categoryNames[randomCategory];
        }
      }
    });

    // 3. Category Pill filtering logic
    const pills = document.querySelectorAll(".category-pill");
    pills.forEach((pill) => {
      pill.addEventListener("click", () => {
        // Remove active styling from all pills
        pills.forEach((p) => p.classList.remove("active"));
        // Add active style to precisely the clicked pill
        pill.classList.add("active");

        const filter = pill.getAttribute("data-filter");

        // Loop over the wrapper columns that have our custom data tag
        const productWrappers = document.querySelectorAll(
          ".fade-up-trig[data-category]",
        );

        productWrappers.forEach((wrapper) => {
          if (
            filter === "all" ||
            wrapper.getAttribute("data-category") === filter
          ) {
            // reveal by removing Bootstrap hide utility and fade in
            wrapper.classList.remove("d-none");
            wrapper.style.opacity = "0";
            setTimeout(() => {
              wrapper.style.opacity = "1";
            }, 50);
          } else {
            // hide using the utility class so grid stays intact
            wrapper.classList.add("d-none");
          }
        });
      });
    });
  }
});

const resBtn = document.getElementById("res-btn");
if (resBtn) {
  resBtn.addEventListener("click", () => {
    window.location.href = "products.html";
  });
}

const contactForm = document.querySelector("form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('input[type="text"]').value;
    const phone = contactForm.querySelector('input[type="tel"]').value;
    const message = contactForm.querySelector("textarea").value;

    const whatsappNumber = "919825186819";

    const whatsappMessage = `Hello Aravali Cattle Feed, Name: ${name} Phone: ${phone} Message: ${message}`;

    const encodedMessage = encodeURIComponent(whatsappMessage);

    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

    window.open(whatsappURL, "_blank");

    contactForm.reset();
  });
}
