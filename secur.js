(function () {
  // ==========================================
  // CHECK LOGIN
  // ==========================================
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    window.location.href = "/index.html";
    return;
  }

  // ==========================================
  // GET USER DATA & CURRENT PAGE
  // ==========================================
  const userName = localStorage.getItem("userName") || "User";
  const userRole = (localStorage.getItem("userRole") || "pending")
    .trim()
    .toLowerCase();

  const currentPage = window.location.pathname.split("/").pop().toLowerCase();

  // ==========================================
  // ROUTE ACCESS CONTROL
  // ==========================================

  // 1. Pending users cannot access any inner page except dashboard
  if (userRole === "pending" && currentPage !== "dashboard.html") {
    window.location.href = "/dashboard.html";
    return;
  }

  // 2. Add Items & User Management are strictly Admin-only
  const adminOnlyPages = ["additems.html", "usermanag.html"];
  if (adminOnlyPages.includes(currentPage) && userRole !== "admin") {
    window.location.href = "/dashboard.html";
    return;
  }

  // 3. Items list is allowed for both "admin" and "approved" (or "user")
  // (Pending users were already blocked above)

  // ==========================================
  // UPDATE HEADER UI (IF PRESENT)
  // ==========================================
  function updateHeader() {
    const userNameEl = document.getElementById("userName");
    const roleBadgeEl = document.getElementById("roleBadge");

    if (userNameEl) {
      userNameEl.textContent = userName;
    }

    if (roleBadgeEl) {
      roleBadgeEl.className = "role-badge";
      if (userRole === "admin") {
        roleBadgeEl.textContent = "Administrator";
        roleBadgeEl.classList.add("role-admin");
      } else if (userRole === "approved" || userRole === "user") {
        roleBadgeEl.textContent = "Approved";
        roleBadgeEl.classList.add("role-approved");
      } else {
        roleBadgeEl.textContent = "Pending";
        roleBadgeEl.classList.add("role-pending");
      }
    }
  }

  // ==========================================
  // CONDITIONAL NAVIGATION LINKS
  // ==========================================
  function setupNavigation() {
    const page2Link = document.getElementById("page2Link");
    const page3Link = document.getElementById("page3Link");

    if (page2Link) {
      if (userRole === "admin") {
        page2Link.classList.remove("hidden");
      } else {
        page2Link.classList.add("hidden");
      }
    }

    if (page3Link) {
      if (userRole === "admin") {
        page3Link.classList.remove("hidden");
      } else {
        page3Link.classList.add("hidden");
      }
    }
  }

  // ==========================================
  // INITIALIZE
  // ==========================================
  document.addEventListener("DOMContentLoaded", function () {
    updateHeader();
    setupNavigation();
  });
})();