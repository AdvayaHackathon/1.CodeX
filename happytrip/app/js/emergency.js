document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userProfileArea = document.getElementById('userProfileArea');
    const username = document.getElementById('username');
    const currentCity = document.getElementById('currentCity');
    const currentCountry = document.getElementById('currentCountry');
    const detectLocationBtn = document.getElementById('detectLocationBtn');
    const localEmergencyServices = document.getElementById('localEmergencyServices');
    const userCountry = document.getElementById('userCountry');
    const findEmbassyBtn = document.getElementById('findEmbassyBtn');
    const embassyResults = document.getElementById('embassyResults');
    const downloadPdfBtn = document.getElementById('downloadPdfBtn');
    const saveLocallyBtn = document.getElementById('saveLocallyBtn');
    const printInfoBtn = document.getElementById('printInfoBtn');
    
    // Check if user is logged in
    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const storedUsername = localStorage.getItem('username');
        
        if (isLoggedIn && storedUsername) {
            userProfileArea.classList.remove('d-none');
            loginBtn.classList.add('d-none');
            registerBtn.classList.add('d-none');
            username.textContent = storedUsername;
        } else {
            userProfileArea.classList.add('d-none');
            loginBtn.classList.remove('d-none');
            registerBtn.classList.remove('d-none');
        }
    }
    
    // Detect user's location
    function detectLocation() {
        currentCity.textContent = "Detecting your location...";
        currentCountry.textContent = "";
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    
                    // Use reverse geocoding to get location details
                    // In a real app, you would use a service like Google Maps Geocoding API
                    // For demo purposes, we'll simulate with common locations
                    
                    // Simulate location detection - would be replaced with actual API call
                    setTimeout(() => {
                        // Simulate different locations based on a random number
                        const locations = [
                            { city: "New Delhi", country: "India", countryCode: "in" },
                            { city: "Mumbai", country: "India", countryCode: "in" },
                            { city: "Bangalore", country: "India", countryCode: "in" },
                            { city: "Jaipur", country: "India", countryCode: "in" }
                        ];
                        
                        const randomLocation = locations[Math.floor(Math.random() * locations.length)];
                        
                        currentCity.textContent = randomLocation.city;
                        currentCountry.textContent = randomLocation.country;
                        
                        // Update map (would be replaced with actual map rendering)
                        updateMap(randomLocation);
                        
                        // Update local emergency services
                        updateLocalServices(randomLocation);
                    }, 1500);
                },
                function(error) {
                    // Handle geolocation error
                    currentCity.textContent = "Location detection failed";
                    currentCountry.textContent = "Please select your location manually";
                    
                    // Default to India for demo purposes
                    const defaultLocation = { city: "New Delhi", country: "India", countryCode: "in" };
                    updateMap(defaultLocation);
                    updateLocalServices(defaultLocation);
                }
            );
        } else {
            currentCity.textContent = "Geolocation is not supported by this browser";
            // Default to India for demo purposes
            const defaultLocation = { city: "New Delhi", country: "India", countryCode: "in" };
            updateMap(defaultLocation);
            updateLocalServices(defaultLocation);
        }
    }
    
    // Update map display - in a real app, this would use Google Maps or similar
    function updateMap(location) {
        const mapContainer = document.getElementById('emergencyMap');
        
        // For demo purposes, we'll just display a placeholder
        mapContainer.innerHTML = `
            <div class="d-flex justify-content-center align-items-center h-100 bg-light">
                <div class="text-center">
                    <i class="fas fa-map-marked-alt fa-3x text-primary mb-2"></i>
                    <p class="mb-0">${location.city}, ${location.country}</p>
                    <p class="text-muted small">Map would be displayed here in production</p>
                </div>
            </div>
        `;
    }
    
    // Update local emergency services based on location
    function updateLocalServices(location) {
        // In a real app, this would fetch data from an API
        // For demo purposes, we'll use hardcoded data for India
        
        if (location.countryCode === "in") {
            localEmergencyServices.innerHTML = `
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <div class="card h-100">
                            <div class="card-body">
                                <h4 class="card-title"><i class="fas fa-hospital text-danger"></i> Hospitals Near ${location.city}</h4>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        AIIMS Hospital
                                        <a href="tel:01126588500" class="btn btn-sm btn-outline-danger">
                                            <i class="fas fa-phone-alt"></i> 011-26588500
                                        </a>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Fortis Hospital
                                        <a href="tel:01242492000" class="btn btn-sm btn-outline-danger">
                                            <i class="fas fa-phone-alt"></i> 0124-2492000
                                        </a>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Apollo Hospital
                                        <a href="tel:01126925858" class="btn btn-sm btn-outline-danger">
                                            <i class="fas fa-phone-alt"></i> 011-26925858
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 mb-3">
                        <div class="card h-100">
                            <div class="card-body">
                                <h4 class="card-title"><i class="fas fa-phone-alt text-success"></i> Emergency Helplines in India</h4>
                                <ul class="list-group list-group-flush">
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        National Emergency Number
                                        <a href="tel:112" class="btn btn-sm btn-outline-danger">
                                            <i class="fas fa-phone-alt"></i> 112
                                        </a>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Police
                                        <a href="tel:100" class="btn btn-sm btn-outline-primary">
                                            <i class="fas fa-phone-alt"></i> 100
                                        </a>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Ambulance
                                        <a href="tel:108" class="btn btn-sm btn-outline-danger">
                                            <i class="fas fa-phone-alt"></i> 108
                                        </a>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Fire
                                        <a href="tel:101" class="btn btn-sm btn-outline-warning">
                                            <i class="fas fa-phone-alt"></i> 101
                                        </a>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Women Helpline
                                        <a href="tel:1091" class="btn btn-sm btn-outline-info">
                                            <i class="fas fa-phone-alt"></i> 1091
                                        </a>
                                    </li>
                                    <li class="list-group-item d-flex justify-content-between align-items-center">
                                        Tourist Helpline
                                        <a href="tel:1363" class="btn btn-sm btn-outline-success">
                                            <i class="fas fa-phone-alt"></i> 1363
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-body">
                                <h4 class="card-title"><i class="fas fa-car text-warning"></i> Transportation Emergency Services</h4>
                                <div class="row">
                                    <div class="col-md-6">
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Road Accident Emergency Service
                                                <a href="tel:1073" class="btn btn-sm btn-outline-warning">
                                                    <i class="fas fa-phone-alt"></i> 1073
                                                </a>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Railway Accident Emergency
                                                <a href="tel:1072" class="btn btn-sm btn-outline-warning">
                                                    <i class="fas fa-phone-alt"></i> 1072
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="col-md-6">
                                        <ul class="list-group list-group-flush">
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Air Ambulance Service
                                                <a href="tel:9540161344" class="btn btn-sm btn-outline-danger">
                                                    <i class="fas fa-phone-alt"></i> 9540161344
                                                </a>
                                            </li>
                                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                                Disaster Management
                                                <a href="tel:108" class="btn btn-sm btn-outline-danger">
                                                    <i class="fas fa-phone-alt"></i> 108
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        } else {
            // Generic template for other countries
            localEmergencyServices.innerHTML = `
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i> Specific emergency services for ${location.country} are not available in the demo.
                    Please use the universal emergency numbers or contact your embassy for assistance.
                </div>
            `;
        }
    }
    
    // Find embassy based on user's home country and current location
    function findEmbassy() {
        const selectedCountry = userCountry.value;
        
        if (!selectedCountry) {
            embassyResults.innerHTML = `
                <div class="alert alert-warning">
                    <i class="fas fa-exclamation-triangle"></i> Please select your home country first.
                </div>
            `;
            return;
        }
        
        // Loading state
        embassyResults.innerHTML = `
            <div class="alert alert-info">
                <i class="fas fa-spinner fa-spin"></i> Searching for embassy information...
            </div>
        `;
        
        // In a real app, this would fetch data from an API
        // For demo purposes, we'll use hardcoded data for common embassies in India
        setTimeout(() => {
            if (selectedCountry === "us") {
                embassyResults.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h4><i class="fas fa-flag text-primary"></i> United States Embassy - New Delhi</h4>
                            <p><i class="fas fa-map-marker-alt"></i> Shantipath, Chanakyapuri, New Delhi - 110021</p>
                            <p><i class="fas fa-phone-alt"></i> Phone: <a href="tel:+911124198000">+91-11-2419-8000</a></p>
                            <p><i class="fas fa-envelope"></i> Email: <a href="mailto:acsnd@state.gov">acsnd@state.gov</a></p>
                            <p><i class="fas fa-globe"></i> Website: <a href="https://in.usembassy.gov/" target="_blank">https://in.usembassy.gov/</a></p>
                            <p><i class="fas fa-clock"></i> Emergency Hours: 24/7 for U.S. Citizens</p>
                            <button class="btn btn-outline-primary">
                                <i class="fas fa-directions"></i> Get Directions
                            </button>
                        </div>
                    </div>
                    
                    <h5 class="mt-4">Other Consulates:</h5>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5>U.S. Consulate General - Mumbai</h5>
                                    <p><i class="fas fa-map-marker-alt"></i> C-49, G-Block, Bandra Kurla Complex</p>
                                    <p><i class="fas fa-phone-alt"></i> <a href="tel:+912226724000">+91-22-2672-4000</a></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5>U.S. Consulate General - Chennai</h5>
                                    <p><i class="fas fa-map-marker-alt"></i> 220 Anna Salai, Gemini Circle</p>
                                    <p><i class="fas fa-phone-alt"></i> <a href="tel:+914428574000">+91-44-2857-4000</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else if (selectedCountry === "uk") {
                embassyResults.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h4><i class="fas fa-flag text-primary"></i> British High Commission - New Delhi</h4>
                            <p><i class="fas fa-map-marker-alt"></i> Shantipath, Chanakyapuri, New Delhi - 110021</p>
                            <p><i class="fas fa-phone-alt"></i> Phone: <a href="tel:+911126872161">+91-11-2687-2161</a></p>
                            <p><i class="fas fa-envelope"></i> Email: <a href="mailto:web.newdelhi@fcdo.gov.uk">web.newdelhi@fcdo.gov.uk</a></p>
                            <p><i class="fas fa-globe"></i> Website: <a href="https://www.gov.uk/world/organisations/british-high-commission-new-delhi" target="_blank">British High Commission</a></p>
                            <button class="btn btn-outline-primary">
                                <i class="fas fa-directions"></i> Get Directions
                            </button>
                        </div>
                    </div>
                    
                    <h5 class="mt-4">Other British Consulates:</h5>
                    <div class="row">
                        <div class="col-md-6 mb-3">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5>British Deputy High Commission - Mumbai</h5>
                                    <p><i class="fas fa-map-marker-alt"></i> Naman Chambers, C-32, G-Block, Bandra Kurla Complex</p>
                                    <p><i class="fas fa-phone-alt"></i> <a href="tel:+912266502222">+91-22-6650-2222</a></p>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6 mb-3">
                            <div class="card h-100">
                                <div class="card-body">
                                    <h5>British Deputy High Commission - Bangalore</h5>
                                    <p><i class="fas fa-map-marker-alt"></i> Prestige Takt, 23 Kasturba Road Cross</p>
                                    <p><i class="fas fa-phone-alt"></i> <a href="tel:+918022100200">+91-80-2210-0200</a></p>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // Generic template for other countries
                embassyResults.innerHTML = `
                    <div class="alert alert-info">
                        <i class="fas fa-info-circle"></i> For ${getUserCountryName(selectedCountry)} embassy information in India, please visit the official website of the ${getUserCountryName(selectedCountry)} foreign ministry or contact your country's international travel information service.
                    </div>
                    <div class="card mt-3">
                        <div class="card-body">
                            <h5>General Embassy Finding Resources</h5>
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item">
                                    <a href="https://www.embassypages.com/" target="_blank">Embassy Pages Directory</a>
                                </li>
                                <li class="list-group-item">
                                    <a href="https://www.mea.gov.in/" target="_blank">Ministry of External Affairs, India</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                `;
            }
        }, 1500);
    }
    
    // Helper function to get country name from country code
    function getUserCountryName(countryCode) {
        const countries = {
            "us": "United States",
            "uk": "United Kingdom",
            "ca": "Canadian",
            "au": "Australian",
            "in": "Indian",
            "de": "German",
            "fr": "French",
            "jp": "Japanese"
        };
        
        return countries[countryCode] || countryCode.toUpperCase();
    }
    
    // Download emergency info as PDF
    function downloadPDF() {
        alert("In a real application, this would generate and download a PDF with all emergency information for offline access.");
    }
    
    // Save emergency info locally
    function saveLocally() {
        alert("In a real application, this would save the emergency information to your device for offline access.");
    }
    
    // Print emergency info
    function printInfo() {
        window.print();
    }
    
    // Event listeners
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', 'Demo User');
            checkLoginStatus();
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            alert('Registration functionality would be implemented here.');
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            checkLoginStatus();
        });
    }
    
    if (detectLocationBtn) {
        detectLocationBtn.addEventListener('click', detectLocation);
    }
    
    if (findEmbassyBtn) {
        findEmbassyBtn.addEventListener('click', findEmbassy);
    }
    
    if (downloadPdfBtn) {
        downloadPdfBtn.addEventListener('click', downloadPDF);
    }
    
    if (saveLocallyBtn) {
        saveLocallyBtn.addEventListener('click', saveLocally);
    }
    
    if (printInfoBtn) {
        printInfoBtn.addEventListener('click', printInfo);
    }
    
    // Initialize the page
    checkLoginStatus();
    detectLocation();
}); 