document.addEventListener("DOMContentLoaded", () => {
    const usernameElement = document.getElementById("username");
    const branchElement = document.getElementById("branch");
    const timerElement = document.getElementById("timer");

    // Fetch GitHub details (username, branch) from the backend
    async function fetchGitHubDetails() {
        try {
            const response = await fetch("/api/github-details");
            const data = await response.json();
            usernameElement.textContent = data.username;
            branchElement.textContent = data.branch;
        } catch (error) {
            console.error("Error fetching GitHub details:", error);
        }
    }

    // Timer logic
    const interval = 3 * 60 * 60 * 1000; // 3 hours in milliseconds
    let remainingTime = interval;

    function startCountdown() {
        setInterval(() => {
            const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
            const seconds = Math.floor((remainingTime / 1000) % 60);
            timerElement.textContent = `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
            remainingTime -= 1000;

            // Reset the countdown after each interval
            if (remainingTime < 0) {
                remainingTime = interval;
            }
        }, 1000);
    }

    // Initialize
    fetchGitHubDetails();
    startCountdown();
});
