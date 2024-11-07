document.addEventListener("DOMContentLoaded", () => {
  const usernameElement = document.getElementById("username");
  const branchElement = document.getElementById("branch");
  const repoLink = document.getElementById("repo-link");
  const timerElement = document.getElementById("timer"); // Ensure this element is fetched here

  // Fetch GitHub details (username, branch, URL) from the backend
  async function fetchGitHubDetails() {
    try {
      const response = await fetch("/api/github-details");
      const data = await response.json();
      usernameElement.textContent = data.username;
      branchElement.textContent = data.branch;
      repoLink.href = data.url;
    } catch (error) {
      console.error("Error fetching GitHub details:", error);
    }
  }

  // Timer logic
  const countdownDuration = 3 * 60 * 60; // 3 hours in seconds
  let remainingTime = countdownDuration;

  function formatTime(seconds) {
    const hours = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(seconds % 60).padStart(2, "0");
    return `${hours}:${minutes}:${secs}`;
  }

  function startCountdown() {
    if (!timerElement) return; // Ensure the timer element exists

    timerElement.textContent = formatTime(remainingTime);

    const countdownInterval = setInterval(() => {
      remainingTime--;

      // Update the timer display
      timerElement.textContent = formatTime(remainingTime);

      // Check if time has run out
      if (remainingTime <= 0) {
        clearInterval(countdownInterval);
        remainingTime = countdownDuration; // Reset the timer
        startCountdown(); // Restart the countdown
      }
    }, 1000); // Update every second
  }

  // Start the countdown after the DOM is loaded
  startCountdown();

  // Initialize GitHub details
  fetchGitHubDetails();
});
