document.addEventListener("DOMContentLoaded", () => {
  const usernameElement = document.getElementById("username");
  const branchElement = document.getElementById("branch");
  const repoLink = document.getElementById("repo-link");
  const timerElement = document.getElementById("timer");

  const countdownDuration = 1 * 60 * 60; // 3 hours in seconds
  let remainingTime = countdownDuration;

  // Fetch GitHub details
  async function fetchGitHubDetails() {
    try {
      const response = await fetch("/api/github-details");
      const data = await response.json();
      usernameElement.textContent = data.username || "Unavailable";
      branchElement.textContent = data.branch || "Unavailable";
      repoLink.href = data.url || "#";
    } catch (error) {
      console.error("Error fetching GitHub details:", error);
    }
  }

  // Timer countdown
  function formatTime(seconds) {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  }

  function startCountdown() {
    timerElement.textContent = formatTime(remainingTime);
    const countdownInterval = setInterval(() => {
      remainingTime--;
      timerElement.textContent = formatTime(remainingTime);

      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        remainingTime = countdownDuration; // Reset timer
        startCountdown(); // Restart countdown
      }
    }, 1000);
  }

  // Initial function calls
  fetchGitHubDetails();
  startCountdown();
});
