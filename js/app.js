// The Food Audit - Application Logic & Controllers
// CSCE 3055.401 Phase 2 Interactive Prototype

class FoodAuditApp {
  constructor(restaurants) {
    this.restaurants = [...restaurants];
    this.filteredRestaurants = [...restaurants];
    this.activeFilter = "All";
    this.currentSwipeIndex = 0;
    this.savedRestaurantIds = new Set(["el-camino"]);
    this.selectedRestaurant = this.restaurants[0]; // El Camino default
    this.comparisonIds = [null, null]; // Do not preload comparison data
    this.userLocation = null;

    this.initElements();
    this.initCompareDropdowns();
    this.bindEvents();
    this.renderAll();
  }

  initElements() {
    // Screens
    this.screens = {
      landing: document.getElementById("screen-landing"),
      swipe: document.getElementById("screen-swipe"),
      detail: document.getElementById("screen-detail"),
      compare: document.getElementById("screen-compare"),
      favorites: document.getElementById("screen-favorites")
    };

    // Navigation
    this.navBtns = document.querySelectorAll(".nav-tab-btn");
    this.searchInput = document.getElementById("search-input");
    this.btnCurrentLocation = document.getElementById("btn-current-location");
    this.filterChipsContainer = document.getElementById("filter-chips-wrap");
    this.recommendedListContainer = document.getElementById("recommended-list");

    // Swipe View
    this.swipeStage = document.getElementById("swipe-stage");
    this.swipeCounter = document.getElementById("swipe-counter");
    this.btnSkip = document.getElementById("btn-skip");
    this.btnSave = document.getElementById("btn-save");

    // Detail View
    this.detailTitle = document.getElementById("detail-nav-title");
    this.detailHeroImg = document.getElementById("detail-hero-img");
    this.detailRatingPill = document.getElementById("detail-rating-pill");
    this.detailTagsRow = document.getElementById("detail-tags-row");
    this.detailAuditSynthesisInfo = document.getElementById("detail-synthesis-info");
    this.detailAuditPointsList = document.getElementById("detail-audit-points");
    this.btnDetailBack = document.getElementById("btn-detail-back");
    this.btnDetailSave = document.getElementById("btn-detail-save");
    this.btnDetailCompare = document.getElementById("btn-detail-compare");

    // Compare View
    this.btnCompareBack = document.getElementById("btn-compare-back");
    this.btnSwapCompare = document.getElementById("btn-swap-compare");
    this.compareSelectA = document.getElementById("compare-select-a");
    this.compareSelectB = document.getElementById("compare-select-b");
    this.compareTableBody = document.getElementById("compare-table-body");
    this.compareTableHeader = document.getElementById("compare-table-header");
    this.compareVerdictCard = document.getElementById("compare-verdict-card");

    // Favorites & In-App Audit Form
    this.favoritesList = document.getElementById("favorites-list");
    this.auditForm = document.getElementById("in-app-audit-form");
    this.formSelectRestaurant = document.getElementById("form-select-restaurant");

    // Toast
    this.toast = document.getElementById("toast-notice");
  }

  initCompareDropdowns() {
    if (!this.compareSelectA || !this.compareSelectB) return;
    const defaultOption = `<option value="">-- Choose Restaurant --</option>`;
    const optionsHtml = defaultOption + this.restaurants.map(r => `
      <option value="${r.id}">${r.name} (${r.cuisine})</option>
    `).join("");
    this.compareSelectA.innerHTML = optionsHtml;
    this.compareSelectB.innerHTML = optionsHtml;
  }

  startComparisonWith(restaurantId) {
    this.comparisonIds[0] = restaurantId;
    this.comparisonIds[1] = null;
    if (this.compareSelectA) this.compareSelectA.value = restaurantId;
    if (this.compareSelectB) this.compareSelectB.value = "";
    this.renderCompareView();
    this.switchView("compare");
    const name = this.restaurants.find(r => r.id === restaurantId)?.name || "Restaurant";
    this.showToast(`Selected ${name}. Now choose Restaurant 2!`);
  }

  bindEvents() {
    // Tab switching
    this.navBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const targetView = btn.dataset.view;
        this.switchView(targetView);
      });
    });

    // Search and filter
    this.searchInput.addEventListener("input", (e) => this.handleSearch(e.target.value));
    this.btnCurrentLocation.addEventListener("click", () => this.handleDetectLocation());

    // Filter chips
    const chips = document.querySelectorAll(".filter-chip");
    chips.forEach(chip => {
      chip.addEventListener("click", () => {
        chips.forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        this.activeFilter = chip.dataset.category;
        this.applyFilters();
      });
    });

    // Swipe controls
    this.btnSkip.addEventListener("click", () => this.handleSwipe("skip"));
    this.btnSave.addEventListener("click", () => this.handleSwipe("save"));

    // Detail view controls
    this.btnDetailBack.addEventListener("click", () => this.switchView("landing"));
    this.btnDetailSave.addEventListener("click", () => this.toggleFavorite(this.selectedRestaurant.id));
    
    // Detail compare button
    this.btnDetailCompare.addEventListener("click", () => {
      this.startComparisonWith(this.selectedRestaurant.id);
    });

    // Compare controls & interactive selectors
    this.btnCompareBack.addEventListener("click", () => this.switchView("landing"));
    
    if (this.btnSwapCompare) {
      this.btnSwapCompare.addEventListener("click", () => {
        const temp = this.comparisonIds[0];
        this.comparisonIds[0] = this.comparisonIds[1];
        this.comparisonIds[1] = temp;
        if (this.compareSelectA) this.compareSelectA.value = this.comparisonIds[0] || "";
        if (this.compareSelectB) this.compareSelectB.value = this.comparisonIds[1] || "";
        this.renderCompareView();
        this.showToast("Swapped comparison order");
      });
    }

    if (this.compareSelectA) {
      this.compareSelectA.addEventListener("change", (e) => {
        this.comparisonIds[0] = e.target.value || null;
        this.renderCompareView();
      });
    }

    if (this.compareSelectB) {
      this.compareSelectB.addEventListener("change", (e) => {
        this.comparisonIds[1] = e.target.value || null;
        this.renderCompareView();
      });
    }

    // In-app audit submission
    this.auditForm.addEventListener("submit", (e) => this.handleAuditFormSubmit(e));
  }

  switchView(viewName) {
    Object.keys(this.screens).forEach(key => {
      if (this.screens[key]) {
        this.screens[key].classList.toggle("active", key === viewName);
      }
    });

    // Update bottom nav active state
    this.navBtns.forEach(btn => {
      const match = (btn.dataset.view === viewName) || 
                    (viewName === "detail" && btn.dataset.view === "landing") ||
                    (viewName === "compare" && btn.dataset.view === "landing");
      btn.classList.toggle("active", match);
    });

    // Scroll to top of app
    document.querySelector(".app-viewport").scrollTop = 0;

    if (viewName === "favorites") {
      this.renderFavoritesView();
    }
  }

  showToast(message) {
    if (!this.toast) return;
    this.toast.textContent = message;
    this.toast.classList.add("show");
    setTimeout(() => {
      this.toast.classList.remove("show");
    }, 2500);
  }

  handleDetectLocation() {
    this.userLocation = "UNT Campus (Denton, TX)";
    this.searchInput.value = this.userLocation;
    this.btnCurrentLocation.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
      Location Locked: UNT Campus
    `;
    this.showToast("GPS Synced: Denton Campus Region");
    this.applyFilters();
  }

  handleSearch(query) {
    const q = query.toLowerCase().trim();
    this.filteredRestaurants = this.restaurants.filter(r => 
      r.name.toLowerCase().includes(q) ||
      r.cuisine.toLowerCase().includes(q) ||
      r.category.toLowerCase().includes(q) ||
      r.signatureDish.toLowerCase().includes(q)
    );
    this.renderRecommendedList();
  }

  applyFilters() {
    let result = [...this.restaurants];
    if (this.activeFilter && this.activeFilter !== "All") {
      result = result.filter(r => r.category.toLowerCase() === this.activeFilter.toLowerCase());
    }
    const q = this.searchInput.value.toLowerCase().trim();
    if (q && q !== "unt campus (denton, tx)") {
      result = result.filter(r => 
        r.name.toLowerCase().includes(q) || 
        r.cuisine.toLowerCase().includes(q) || 
        r.category.toLowerCase().includes(q)
      );
    }
    this.filteredRestaurants = result;
    this.renderRecommendedList();
  }

  renderRecommendedList() {
    this.recommendedListContainer.innerHTML = "";
    if (this.filteredRestaurants.length === 0) {
      this.recommendedListContainer.innerHTML = `
        <div style="text-align: center; padding: 30px 10px; color: var(--text-muted); font-size: 13px;">
          No restaurants match your current filters. Try selecting another category!
        </div>
      `;
      return;
    }

    this.filteredRestaurants.forEach(item => {
      const card = document.createElement("div");
      card.className = "restaurant-summary-card";
      card.innerHTML = `
        <img class="card-img-thumb" src="${item.image}" alt="${item.name}" loading="lazy" />
        <div class="card-meta-content">
          <div class="card-title-row">
            <h4 class="card-name">${item.name}</h4>
            <span class="card-rating-badge">★ ${item.rating}</span>
          </div>
          <div class="card-details-row">
            <span>${item.category}</span>
            <span class="card-bullet">•</span>
            <span>${item.priceLevel}</span>
            <span class="card-bullet">•</span>
            <span>${item.distanceMiles} mi</span>
          </div>
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
            ${item.hasStudentDeal ? `<span class="card-deal-pill">Student Deal</span>` : `<span></span>`}
            <button class="btn-card-compare" data-id="${item.id}" style="background: #FFF7ED; border: 1px solid #FFEDD5; color: var(--primary); font-size: 11px; font-weight: 700; padding: 3px 8px; border-radius: 6px; cursor: pointer;">
              ⚖ Compare
            </button>
          </div>
        </div>
      `;

      // Click card for detail
      card.addEventListener("click", () => {
        this.openDetailView(item);
      });

      // Quick compare button
      const compareBtn = card.querySelector(".btn-card-compare");
      if (compareBtn) {
        compareBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          this.comparisonIds[0] = item.id;
          if (this.comparisonIds[1] === item.id) {
            const alt = this.restaurants.find(r => r.id !== item.id);
            if (alt) this.comparisonIds[1] = alt.id;
          }
          this.renderCompareView();
          this.switchView("compare");
        });
      }

      this.recommendedListContainer.appendChild(card);
    });
  }

  openDetailView(restaurant) {
    this.selectedRestaurant = restaurant;
    this.detailTitle.textContent = restaurant.name;
    this.detailHeroImg.src = restaurant.image;
    this.detailRatingPill.innerHTML = `<span>★</span> ${restaurant.rating} (${restaurant.reviewCount})`;
    
    // Tags
    this.detailTagsRow.innerHTML = restaurant.tags.map(tag => `
      <span class="detail-tag">${tag}</span>
    `).join("");

    // Audit summary
    this.detailAuditSynthesisInfo.textContent = restaurant.auditSummary.headline;
    
    let pointsHtml = "";
    restaurant.auditSummary.pros.forEach(pro => {
      pointsHtml += `
        <div class="audit-point-item">
          <div class="audit-point-icon pro">+</div>
          <div>${pro}</div>
        </div>
      `;
    });
    restaurant.auditSummary.cons.forEach(con => {
      pointsHtml += `
        <div class="audit-point-item">
          <div class="audit-point-icon con">-</div>
          <div>${con}</div>
        </div>
      `;
    });
    this.detailAuditPointsList.innerHTML = pointsHtml;

    // Update save button text
    const isSaved = this.savedRestaurantIds.has(restaurant.id);
    this.btnDetailSave.innerHTML = isSaved ? `♥ Saved in Favorites` : `♡ Save to list`;
    this.btnDetailSave.style.color = isSaved ? `var(--primary)` : `var(--text-main)`;

    this.switchView("detail");
  }

  renderSwipeCard() {
    this.swipeStage.innerHTML = "";
    if (this.currentSwipeIndex >= this.restaurants.length) {
      this.swipeStage.innerHTML = `
        <div style="background: white; border-radius: 20px; border: 1.5px solid var(--border); height: 100%; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center; padding: 24px;">
          <h3 style="font-size: 18px; font-weight: 800; margin-bottom: 8px;">All Audited Places Reviewed!</h3>
          <p style="font-size: 13px; color: var(--text-muted); margin-bottom: 20px;">You've seen all local restaurants in your feed.</p>
          <button id="btn-restart-swipe" style="background: var(--primary); color: white; border: none; padding: 12px 24px; border-radius: 12px; font-weight: 700; cursor: pointer;">
            Restart Discovery Stack
          </button>
        </div>
      `;
      document.getElementById("btn-restart-swipe").addEventListener("click", () => {
        this.currentSwipeIndex = 0;
        this.renderSwipeCard();
      });
      this.swipeCounter.textContent = `${this.restaurants.length} / ${this.restaurants.length}`;
      return;
    }

    const item = this.restaurants[this.currentSwipeIndex];
    this.swipeCounter.textContent = `${this.currentSwipeIndex + 1} / ${this.restaurants.length}`;

    const card = document.createElement("div");
    card.className = "swipe-card";
    card.innerHTML = `
      <div class="swipe-card-img-wrap">
        <img class="swipe-card-img" src="${item.image}" alt="${item.name}" />
        ${item.hasStudentDeal ? `
          <div class="student-deal-banner">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
            Student deal available
          </div>
        ` : ""}
      </div>
      <div class="swipe-card-body">
        <div>
          <div class="swipe-card-heading">
            <h3 class="swipe-card-name">${item.name}</h3>
            <span class="swipe-card-rating">★ ${item.rating} (${item.reviewCount})</span>
          </div>
          <div class="swipe-card-sub">${item.cuisine} • ${item.priceLevel} • ${item.distanceMiles} mi</div>
          <div class="swipe-audit-highlight">
            <strong>Audit Synthesis Top Takeaway</strong>
            ${item.auditSummary.pros[0]}
          </div>
        </div>
        <div>
          <p style="font-size: 11px; color: var(--text-muted); text-align: center; margin-bottom: 8px;">Tap card to inspect full audit report</p>
        </div>
      </div>
    `;

    // Click to view details
    card.addEventListener("click", (e) => {
      if (!e.target.closest("button")) {
        this.openDetailView(item);
      }
    });

    this.swipeStage.appendChild(card);
  }

  handleSwipe(action) {
    const card = this.swipeStage.querySelector(".swipe-card");
    if (!card) return;

    const currentItem = this.restaurants[this.currentSwipeIndex];
    if (action === "save") {
      card.style.transform = "translateX(250px) rotate(15deg)";
      card.style.opacity = "0";
      this.savedRestaurantIds.add(currentItem.id);
      this.showToast(`Saved ${currentItem.name} to Favorites!`);
    } else {
      card.style.transform = "translateX(-250px) rotate(-15deg)";
      card.style.opacity = "0";
      this.showToast(`Passed on ${currentItem.name}`);
    }

    setTimeout(() => {
      this.currentSwipeIndex++;
      this.renderSwipeCard();
    }, 220);
  }

  toggleFavorite(restaurantId) {
    if (this.savedRestaurantIds.has(restaurantId)) {
      this.savedRestaurantIds.delete(restaurantId);
      this.showToast("Removed from Favorites");
    } else {
      this.savedRestaurantIds.add(restaurantId);
      this.showToast("Added to Favorites");
    }
    this.openDetailView(this.selectedRestaurant);
  }

  renderFavoritesView() {
    this.favoritesList.innerHTML = "";
    const saved = this.restaurants.filter(r => this.savedRestaurantIds.has(r.id));
    
    if (saved.length === 0) {
      this.favoritesList.innerHTML = `
        <div style="text-align: center; padding: 25px; color: var(--text-muted); font-size: 13px;">
          No saved restaurants yet. Swipe right on places to build your curated list!
        </div>
      `;
      return;
    }

    saved.forEach(item => {
      const card = document.createElement("div");
      card.className = "restaurant-summary-card";
      card.innerHTML = `
        <img class="card-img-thumb" src="${item.image}" alt="${item.name}" />
        <div class="card-meta-content">
          <div class="card-title-row">
            <h4 class="card-name">${item.name}</h4>
            <span class="card-rating-badge">★ ${item.rating}</span>
          </div>
          <div class="card-details-row">
            <span>${item.category}</span>
            <span class="card-bullet">•</span>
            <span>${item.distanceMiles} mi</span>
          </div>
          <span style="font-size: 11px; color: var(--primary); font-weight: 700; margin-top: 4px; display: inline-block;">
            ${item.signatureDish}
          </span>
        </div>
      `;
      card.addEventListener("click", () => this.openDetailView(item));
      this.favoritesList.appendChild(card);
    });

    // Populate the dropdown in the In-App Audit Form
    this.formSelectRestaurant.innerHTML = this.restaurants.map(r => `
      <option value="${r.id}">${r.name} (${r.cuisine})</option>
    `).join("");
  }

  renderCompareView() {
    const idA = this.comparisonIds[0];
    const idB = this.comparisonIds[1];

    // Sync dropdown selected values without wiping innerHTML
    if (this.compareSelectA && this.compareSelectA.value !== (idA || "")) {
      this.compareSelectA.value = idA || "";
    }
    if (this.compareSelectB && this.compareSelectB.value !== (idB || "")) {
      this.compareSelectB.value = idB || "";
    }

    const restA = this.restaurants.find(r => r.id === idA);
    const restB = this.restaurants.find(r => r.id === idB);

    // If both are not selected, DO NOT PRELOAD DATA!
    if (!restA || !restB) {
      let promptText = "Select two restaurants from the dropdowns above to compare them side-by-side.";
      if (restA && !restB) {
        promptText = `Selected <strong>${restA.name}</strong> as Restaurant 1. Now select Restaurant 2 above to view the audit comparison!`;
      } else if (!restA && restB) {
        promptText = `Selected <strong>${restB.name}</strong> as Restaurant 2. Now select Restaurant 1 above to view the audit comparison!`;
      }

      this.compareTableHeader.innerHTML = `
        <tr>
          <th colspan="3" style="text-align: center; color: var(--text-muted); font-weight: 700;">
            Awaiting Restaurant Selection
          </th>
        </tr>
      `;
      this.compareTableBody.innerHTML = `
        <tr>
          <td colspan="3" style="text-align: center; padding: 40px 16px; color: var(--text-muted);">
            <div style="font-size: 32px; margin-bottom: 10px;">⚖</div>
            <div style="font-size: 15px; font-weight: 800; color: var(--text-main); margin-bottom: 6px;">Compare Restaurants</div>
            <div style="font-size: 12px; line-height: 1.5; max-width: 280px; margin: 0 auto;">${promptText}</div>
          </td>
        </tr>
      `;
      if (this.compareVerdictCard) {
        this.compareVerdictCard.style.display = "none";
      }
      return;
    }

    // Both are selected! Show comparison table & verdict
    if (this.compareVerdictCard) {
      this.compareVerdictCard.style.display = "block";
    }

    this.compareTableHeader.innerHTML = `
      <tr>
        <th style="width: 32%;">Audit Metric</th>
        <th style="width: 34%;">${restA.name}</th>
        <th style="width: 34%;">${restB.name}</th>
      </tr>
    `;

    this.compareTableBody.innerHTML = `
      <tr>
        <td>Verified Rating</td>
        <td><strong>★ ${restA.rating}</strong> (${restA.reviewCount})</td>
        <td><strong>★ ${restB.rating}</strong> (${restB.reviewCount})</td>
      </tr>
      <tr>
        <td>Synthesized Reviews</td>
        <td>${restA.totalSynthesizedReviews.toLocaleString()} sources</td>
        <td>${restB.totalSynthesizedReviews.toLocaleString()} sources</td>
      </tr>
      <tr>
        <td>Price & Distance</td>
        <td>${restA.priceLevel} • ${restA.distanceMiles} mi</td>
        <td>${restB.priceLevel} • ${restB.distanceMiles} mi</td>
      </tr>
      <tr>
        <td>Food Quality Score</td>
        <td><strong style="color: #059669;">${restA.auditMetrics.foodQuality}%</strong></td>
        <td><strong style="color: #059669;">${restB.auditMetrics.foodQuality}%</strong></td>
      </tr>
      <tr>
        <td>Service Turnaround</td>
        <td>${restA.auditMetrics.serviceSpeed}% speed index</td>
        <td>${restB.auditMetrics.serviceSpeed}% speed index</td>
      </tr>
      <tr>
        <td>Noise / Vibe</td>
        <td>${restA.auditMetrics.noiseLevel > 70 ? 'High Energy / Loud' : 'Moderate / Relaxed'}</td>
        <td>${restB.auditMetrics.noiseLevel > 70 ? 'High Energy / Loud' : 'Moderate / Relaxed'}</td>
      </tr>
      <tr>
        <td>Top Pro Consensus</td>
        <td style="color: #059669;">+ ${restA.auditSummary.pros[0]}</td>
        <td style="color: #059669;">+ ${restB.auditSummary.pros[0]}</td>
      </tr>
      <tr>
        <td>Top Watch-out / Con</td>
        <td style="color: #DC2626;">- ${restA.auditSummary.cons[0]}</td>
        <td style="color: #DC2626;">- ${restB.auditSummary.cons[0]}</td>
      </tr>
      <tr>
        <td>Student Deals</td>
        <td>${restA.hasStudentDeal ? '✓ Available' : 'None'}</td>
        <td>${restB.hasStudentDeal ? '✓ Available' : 'None'}</td>
      </tr>
      <tr>
        <td>Best Use-Case</td>
        <td><strong>${restA.bestFor}</strong></td>
        <td><strong>${restB.bestFor}</strong></td>
      </tr>
    `;

    // Dynamic Synthesis & Verdict
    const winnerQuality = restA.auditMetrics.foodQuality >= restB.auditMetrics.foodQuality ? restA : restB;
    const winnerDistance = restA.distanceMiles <= restB.distanceMiles ? restA : restB;
    
    this.compareVerdictCard.innerHTML = `
      <div class="compare-verdict-title">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        Audit Verdict & Synthesis
      </div>
      <div class="compare-verdict-body">
        <strong>${restA.name}</strong> stands out for <em>${restA.bestFor.toLowerCase()}</em> (${restA.auditSummary.pros[0]}).
        <br>
        <strong>${restB.name}</strong> is favored for <em>${restB.bestFor.toLowerCase()}</em> (${restB.auditSummary.pros[0]}).
        <br><br>
        • <strong>Closer to campus:</strong> ${winnerDistance.name} (${winnerDistance.distanceMiles} mi)
        <br>
        • <strong>Higher food score:</strong> ${winnerQuality.name} (${winnerQuality.auditMetrics.foodQuality}%)
      </div>
    `;
  }

  handleAuditFormSubmit(e) {
    e.preventDefault();
    const restId = this.formSelectRestaurant.value;
    const proInput = document.getElementById("form-input-pro").value.trim();
    const conInput = document.getElementById("form-input-con").value.trim();
    const targetRest = this.restaurants.find(r => r.id === restId);

    if (targetRest) {
      if (proInput) {
        targetRest.auditSummary.pros.unshift(`[User Audit]: ${proInput}`);
      }
      if (conInput) {
        targetRest.auditSummary.cons.unshift(`[User Audit]: ${conInput}`);
      }
      targetRest.totalSynthesizedReviews += 1;
      targetRest.reviewCount += 1;
      this.showToast("In-App Audit recorded & synthesized!");
      this.auditForm.reset();
      this.openDetailView(targetRest);
    }
  }

  renderAll() {
    this.renderRecommendedList();
    this.renderSwipeCard();
    this.renderFavoritesView();
    this.renderCompareView();
  }
}

// Global initialization
document.addEventListener("DOMContentLoaded", () => {
  window.foodAuditApp = new FoodAuditApp(RESTAURANTS_DATA);
});
