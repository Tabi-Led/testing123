// Get form element
const searchForm = document.getElementById('searchForm');

// Add event listener for form submission
searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Get search query and format values from form
    const searchQuery = document.getElementById('searchQuery').value;
    const format = document.getElementById('format').value;

    // Redirect user to search results page with query parameters
    let redirectUrl = 'search-results.html';
    redirectUrl += '?q=' + encodeURIComponent(searchQuery); // Encode query parameter
    redirectUrl += '&format=' + encodeURIComponent(format); // Encode format parameter
    location.assign(redirectUrl);
});

// Fetch and display search results on search-results.html page
document.addEventListener('DOMContentLoaded', function() {
    // Parse query parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const searchQuery = urlParams.get('q');
    const format = urlParams.get('format');

    // Make API request based on query parameters
    if (searchQuery) {
        let apiUrl = 'https://www.loc.gov/' + (format ? 'format/' + format : 'search') + '/?q=' + encodeURIComponent(searchQuery);

        // Make AJAX request to Library of Congress API
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displaySearchResults(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }
});

// Function to display search results on search-results.html page
function displaySearchResults(data) {
    const searchResultsDiv = document.getElementById('searchResults');

    // Clear previous search results
    searchResultsDiv.innerHTML = '';

    // Check if results exist
    if (data && data.results && data.results.length > 0) {
        // Iterate through results and display
        data.results.forEach(result => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result');

            // Customize how you want to display each result
            resultDiv.innerHTML = `
                <h2>${result.title}</h2>
                <p>${result.description}</p>
                <!-- Add more fields to display as needed -->
            `;

            searchResultsDiv.appendChild(resultDiv);
        });
    } else {
        // Display message if no results found
        searchResultsDiv.textContent = 'No results found.';
    }
}

