document.getElementById("loginForm").addEventListener("submit", function(e) {
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


// === ARCHIVE BUTTON LOGIC ===
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".archive-btn");

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const filePath = button.getAttribute("data-file");
      window.location.href = filePath; // Redirect to file page
    });
  });
});
