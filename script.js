// ===== clearance login (same as before) =====
if (localStorage.getItem("clearanceLevel") === null) {
  localStorage.setItem("clearanceLevel", 0);
}


const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const code = document.getElementById("code").value.trim().toLowerCase();
    let level = null;

    // simple “codes” — change to whatever you like
    if (code === "custos") level = 2;
    else if (code === "praetor") level = 3;
    else if (code === "archon") level = 4;
    else if (code === "deus") level = 5;

    const result = document.getElementById("result");

    if (level) {
      localStorage.setItem("clearanceLevel", level);
      result.textContent = `Access Granted — Level ${level}`;
      result.style.color = "#0f0";
      setTimeout(() => {
        window.location.href = "archive.html";
      }, 1500);
    } else {
      result.textContent = "Access Denied — Invalid Authorization Code";
      result.style.color = "#c41e3a";
    }
  });
}

// ===== archive-item click logic =====
document.addEventListener("DOMContentLoaded", () => {
  const items = document.querySelectorAll(".archive-item");
  const userLevel = parseInt(localStorage.getItem("clearanceLevel")) || 0;

  items.forEach(item => {
    // visually locked items may already have pointer-events: none set by your inline script.
    // But we still attach a click handler for unlocked items.
    item.addEventListener("click", () => {
      const required = parseInt(item.getAttribute("data-clearance")) || 0;
      const filePath = item.getAttribute("data-file");

      if (userLevel < required) {
        // If locked, show quick feedback instead of doing nothing
        alert(`Access denied. Required Clearance: Level ${required}.`);
        return;
      }

      if (filePath) {
        window.location.href = filePath;
      } else {
        console.warn("No data-file attribute on archive item:", item);
      }
    });
  });
});


// ===== Logout / Reset Clearance =====
window.addEventListener("load", () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return; // If not found, skip

  const userLevel = Number(localStorage.getItem("clearanceLevel")) || 0;

  // Debug line (you can remove this later)
  console.log("Detected clearance level:", userLevel);

  if (userLevel > 0) {
    logoutBtn.style.display = "inline-block";
  }

  logoutBtn.addEventListener("click", () => {
    if (confirm("Are you sure you want to log out and reset clearance?")) {
      localStorage.setItem("clearanceLevel", 0);
      alert("Clearance reset to Level 0. You are now logged out.");
      location.reload();
    }
  });
});
