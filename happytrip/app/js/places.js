document.addEventListener('DOMContentLoaded', function() {
    // Initialize the UI
    loadPlaces();
    setupEventListeners();
    checkUserAuth();
});

// Helper function to merge places data, prioritizing stored data
function mergePlacesData(defaultList, storedList) {
    const placeMap = new Map();
    // Add defaults first
    defaultList.forEach(place => {
        const id = Number(place.id);
        if (!isNaN(id)) {
           placeMap.set(id, { ...place, id: id });
        }
    });
    // Overwrite with stored, or add new stored
    storedList.forEach(place => {
        const id = Number(place.id);
        if (!isNaN(id)) {
           // Ensure image path is correct for display within /pages/ folder
           const imagePath = place.image && !place.image.startsWith('data:image') && !place.image.startsWith('../') 
                             ? `../images/${place.image.split('/').pop()}` 
                             : place.image || '../images/placeholder.jpg';
           placeMap.set(id, { ...place, id: id, image: imagePath });
        }
    });
    return Array.from(placeMap.values());
}

// Load places from localStorage and default data
function loadPlaces() {
    const storedPlaces = JSON.parse(localStorage.getItem('places') || '[]');
    
    const defaultPlaces = [
        {
            id: 1,
            name: 'Taj Mahal',
            location: 'Agra, Uttar Pradesh',
            category: 'Historic',
            image: '../images/taj-mahal.jpg',
            rating: 4.8,
            description: 'One of the seven wonders of the world, the Taj Mahal is a symbol of love.',
            popularity: 10
        },
        {
            id: 2,
            name: 'Varanasi Ghats',
            location: 'Varanasi, Uttar Pradesh',
            category: 'Religious',
            image: '../images/varanasi.jpg',
            rating: 4.7,
            description: 'Experience the spiritual essence of India at the ancient ghats along the holy Ganges river.',
            popularity: 9
        },
        {
            id: 3,
            name: 'Jaipur City Palace',
            location: 'Jaipur, Rajasthan',
            category: 'Historic',
            image: '../images/jaipur.jpg',
            rating: 4.6,
            description: 'Explore the magnificent pink city and its royal heritage.',
            popularity: 8
        },
        {
            id: 4,
            name: 'Kerala Backwaters',
            location: 'Kerala',
            category: 'Nature',
            image: '../images/kerala.jpg',
            rating: 4.9,
            description: 'Cruise through the serene backwaters of God\'s Own Country.',
            popularity: 9
        },
        {
            id: 5,
            name: 'Goa Beaches',
            location: 'Goa',
            category: 'Beach',
            image: '../images/goa.jpg',
            rating: 4.5,
            description: 'Relax on the beautiful beaches and enjoy the vibrant nightlife.',
            popularity: 9
        },
        {
            id: 6,
            name: 'Darjeeling',
            location: 'West Bengal',
            category: 'Mountain',
            image: '../images/darjeeling.jpg',
            rating: 4.5,
            description: 'Experience the tea gardens and stunning Himalayan views.',
            popularity: 7
        },
        {
            id: 7,
            name: 'Andaman Islands',
            location: 'Andaman & Nicobar',
            category: 'Beach',
            image: '../images/andaman.jpg',
            rating: 4.8,
            description: 'Explore the pristine beaches and crystal-clear waters of these beautiful islands.',
            popularity: 8
        }
    ];
    
    // Use the helper function to merge
    const allPlaces = mergePlacesData(defaultPlaces, storedPlaces);
    
    // Display the places
    displayPlaces(allPlaces);
    
    // Return the combined list for other functions to use
    return allPlaces;
}

// Display places in the grid
function displayPlaces(places) {
    const placesGrid = document.getElementById('placesGrid');
    placesGrid.innerHTML = '';
    
    if (places.length === 0) {
        placesGrid.innerHTML = '<div class="col-12 text-center py-5"><h3>No places found matching your criteria</h3></div>';
        return;
    }
    
    places.forEach(place => {
        const card = document.createElement('div');
        card.className = 'col';
        // Image path should already be correct from mergePlacesData
        card.innerHTML = `
            <div class="card h-100 place-card">
                <img src="${place.image}" class="card-img-top" alt="${place.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${place.name}</h5>
                    <p class="card-text text-muted"><i class="fas fa-map-marker-alt"></i> ${place.location}</p>
                    <span class="badge bg-primary mb-2">${place.category}</span>
                    <p class="card-text">${(place.description || '').substring(0, 100)}${(place.description || '').length > 100 ? '...' : ''}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="place-rating">
                            <span>${place.rating}</span>
                            <i class="fas fa-star"></i>
                        </div>
                        <a href="place-details.html?id=${place.id}" class="btn btn-sm btn-primary">View Details</a>
                    </div>
                </div>
            </div>
        `;
        placesGrid.appendChild(card);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search button
    document.querySelector('.input-group button').addEventListener('click', function() {
        filterPlaces();
    });
    
    // Search input (for Enter key)
    document.getElementById('searchPlaces').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filterPlaces();
        }
    });
    
    // Category filter change
    document.getElementById('filterCategory').addEventListener('change', filterPlaces);
    
    // Sort change
    document.getElementById('sortPlaces').addEventListener('change', sortPlaces);
}

// Filter places based on search input and category
function filterPlaces() {
    const places = loadPlaces();
    const searchTerm = document.getElementById('searchPlaces').value.toLowerCase();
    const category = document.getElementById('filterCategory').value;
    
    const filteredPlaces = places.filter(place => {
        const matchesSearch = !searchTerm || 
                             (place.name && place.name.toLowerCase().includes(searchTerm)) || 
                             (place.location && place.location.toLowerCase().includes(searchTerm)) ||
                             (place.description && place.description.toLowerCase().includes(searchTerm));
        
        const matchesCategory = !category || place.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    displayPlaces(filteredPlaces);
}

// Sort places
function sortPlaces() {
    const places = loadPlaces(); // Get the combined list
    const sortBy = document.getElementById('sortPlaces').value;
    const searchTerm = document.getElementById('searchPlaces').value.toLowerCase();
    const category = document.getElementById('filterCategory').value;
    
    // First filter
    let filteredPlaces = places.filter(place => {
        const matchesSearch = !searchTerm || 
                             (place.name && place.name.toLowerCase().includes(searchTerm)) || 
                             (place.location && place.location.toLowerCase().includes(searchTerm)) ||
                             (place.description && place.description.toLowerCase().includes(searchTerm));
        
        const matchesCategory = !category || place.category === category;
        
        return matchesSearch && matchesCategory;
    });
    
    // Then sort
    if (sortBy === 'name') {
        filteredPlaces.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sortBy === 'rating') {
        filteredPlaces.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === 'popularity') {
        // Ensure popularity exists, default to 0 if not
        filteredPlaces.sort((a, b) => (b.popularity || 0) - (a.popularity || 0));
    }
    
    displayPlaces(filteredPlaces);
}

// Check if user is authenticated
function checkUserAuth() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    
    if (isLoggedIn && username) {
        document.getElementById('loginBtn').classList.add('d-none');
        document.getElementById('registerBtn').classList.add('d-none');
        document.getElementById('userProfileArea').classList.remove('d-none');
        document.getElementById('username').textContent = username;
    } else {
        document.getElementById('loginBtn').classList.remove('d-none');
        document.getElementById('registerBtn').classList.remove('d-none');
        document.getElementById('userProfileArea').classList.add('d-none');
    }
} 