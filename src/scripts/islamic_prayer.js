// Get references to HTML elements
const userInput = document.getElementById('userInput');
const prayerMethod = document.getElementById('prayerMethod');
const monthSelect = document.getElementById('month');
const yearSelect = document.getElementById('year');
const checkPrayerTimeButton = document.getElementById('checkPrayerTime');
const appContainer = document.getElementById('app');
const countDownTimer = document.getElementById('countDownTimer');

// Event listener for the "Check Prayer Time" button
checkPrayerTimeButton.addEventListener('click', async () => {
    const city = userInput.value;
    const method = prayerMethod.value; // Get the selected method
    const month = monthSelect.value;
    const year = yearSelect.value;

    // Make an API request to Aladhan
    try {
        const response = await fetch(`https://api.aladhan.com/v1/calendarByCity/${year}/${month}?city=${city}&country=United&method=${method}`);
        const data = await response.json();
        console.log(data);

        // Extract prayer times from the API response
        const prayerTimes = data.data[0].timings;

        // Display prayer times in the app container
        renderPrayerTimes(city, prayerTimes);

        // Extract Dhuhr time from the response (format: "hh:mm (WAT)")
        const dhuhrTimeStr = prayerTimes.Dhuhr.split(' ')[0]; // Extracts "12:55" from "12:55 (WAT)"
        const nextPrayerTimeStr = `${data.data[0].date.gregorian.date} ${dhuhrTimeStr}`;
        const nextPrayerTime = new Date(nextPrayerTimeStr);

        // Calculate time until next prayer (Dhuhr)
        const now = new Date();
        const timeUntilNextPrayer = nextPrayerTime - now;

        // Display countdown timer to the next prayer (Dhuhr)
        countDownTimer.innerHTML = `Time until Dhuhr: ${formatTime(timeUntilNextPrayer)}`;
    } catch (error) {
        console.error('Error fetching prayer times:', error);
    }
});

// Helper function to display prayer times in the app container
function renderPrayerTimes(city, prayerTimes) {
    appContainer.innerHTML = `
        <h2>Prayer Times for ${city}</h2>
        <ul>
            <li>Fajr: ${prayerTimes.Fajr}</li>
            <li>Sunrise: ${prayerTimes.Sunrise}</li>
            <li>Dhuhr: ${prayerTimes.Dhuhr}</li>
            <li>Asr: ${prayerTimes.Asr}</li>
            <li>Sunset: ${prayerTimes.Sunset}</li>
            <li>Maghrib: ${prayerTimes.Maghrib}</li>
            <li>Isha: ${prayerTimes.Isha}</li>
            <li>Imsak: ${prayerTimes.Imsak}</li>
            <li>Midnight: ${prayerTimes.Midnight}</li>
            <li>First Third: ${prayerTimes.Firstthird}</li>
            <li>Last Third: ${prayerTimes.Lastthird}</li>
        </ul>`;
}

// Helper function to format time (in milliseconds)
// Helper function to format time (in milliseconds)
function formatTime(milliseconds) {
    if (milliseconds <= 0) {
        return 'Prayer time'; // This message indicates that the prayer time has already passed
    }
    
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    // Format the time as HH:MM:SS
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');
    
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}








// Function to change the background image
function changeBackground() {
    let currentImageIndex = 1; // Start with image 1
    let maxImageIndex = 53; // Maximum image index
    let imageUrlBase = 'https://cdn.aladhan.com/images/backgrounds/'; // Base URL for images

    setInterval(function() {
        // Construct the URL for the next background image
        let imageUrl = imageUrlBase + currentImageIndex + '.jpg';
        // Update the prayer container's background image style
        const prayerContainer = document.getElementById('aladhan-prayer');
        prayerContainer.style.backgroundImage = 'url(' + imageUrl + ')';

        // Increment the index to point to the next image
        currentImageIndex++;
        // If we've reached the last image, reset to 1
        if (currentImageIndex > maxImageIndex) {
            currentImageIndex = 1;
        }
    }, 3000); // Change image every 10 seconds
}

// Call the function to start changing backgrounds
changeBackground();



