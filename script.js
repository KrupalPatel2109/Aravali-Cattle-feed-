document.addEventListener("DOMContentLoaded", () => {
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
            // Show item
            wrapper.style.display = "block";
            // Clean brief fade interaction for smoothness
            setTimeout(() => {
              wrapper.style.opacity = "1";
            }, 50);
          } else {
            // Hide matched item
            wrapper.style.display = "none";
          }
        });
      });
    });
  }
});
