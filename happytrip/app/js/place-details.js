document.addEventListener('DOMContentLoaded', function() {
    // Get the place ID from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const placeId = parseInt(urlParams.get('id'));
    
    if (!placeId) {
        // No ID provided, redirect back to places page
        window.location.href = 'places.html';
        return;
    }
    
    // Load place details
    loadPlaceDetails(placeId);
    
    // Setup event listeners
    setupEventListeners();
    
    // Check user auth state
    checkUserAuth();
});

// Load place details from localStorage or default data
function loadPlaceDetails(placeId) {
    // Get the place data
    const place = getPlaceById(placeId);
    
    if (!place) {
        // Place not found, show error
        alert('Place not found!');
        window.location.href = 'places.html';
        return;
    }
    
    // Update page title
    document.title = `${place.name} - HappyTrip`;
    
    // Set place details in the UI
    document.getElementById('placeName').textContent = place.name;
    document.getElementById('placeTitle').textContent = place.name;
    document.getElementById('placeCategory').textContent = place.category;
    document.getElementById('placeLocation').textContent = place.location;
    document.getElementById('placeDescription').textContent = place.description;
    document.getElementById('placeRating').textContent = place.rating;
    document.getElementById('placeMainImage').src = place.image;
    
    // Set guide information if available
    if (place.guideName) {
        document.getElementById('guideName').textContent = place.guideName;
    }
    
    if (place.guideContact) {
        const guideContactEl = document.getElementById('guideContact');
        guideContactEl.textContent = place.guideContact;
        guideContactEl.href = `tel:${place.guideContact}`;
    }
    
    // Set emergency information if available
    if (place.emergencyNumber) {
        const emergencyEl = document.getElementById('emergencyNumber');
        emergencyEl.textContent = place.emergencyNumber;
        emergencyEl.href = `tel:${place.emergencyNumber}`;
    }
    
    // Load gallery if available
    loadGallery(place);
    
    // Load similar places
    loadSimilarPlaces(place);
    
    // Load reviews
    loadReviews(place);
    
    // Setup map if coordinates are available
    if (place.mapLocation) {
        setupMap(place.mapLocation);
    }
}

// Get place by ID from localStorage or default data
function getPlaceById(placeId) {
    // Get places from localStorage
    const storedPlaces = JSON.parse(localStorage.getItem('places') || '[]');
    
    // Default places data
    const defaultPlaces = [
        {
            id: 1,
            name: 'Taj Mahal',
            location: 'Agra, Uttar Pradesh',
            category: 'Historic',
            image: '../images/taj-mahal.jpg',
            rating: 4.8,
            description: 'One of the seven wonders of the world, the Taj Mahal is a symbol of love.',
            popularity: 10,
            gallery: ['../images/taj-mahal-1.jpg', '../images/taj-mahal-2.jpg', '../images/taj-mahal-3.jpg'],
            guideName: 'Raj Kumar',
            guideContact: '+91 9876543210',
            emergencyNumber: '112',
            mapLocation: '27.1751, 78.0421'
        },
        {
            id: 2,
            name: 'Varanasi Ghats',
            location: 'Varanasi, Uttar Pradesh',
            category: 'Religious',
            image: '../images/varanasi.jpg',
            rating: 4.7,
            description: 'Experience the spiritual essence of India at the ancient ghats along the holy Ganges river.',
            popularity: 9,
            gallery: ['../images/varanasi-1.jpg', '../images/varanasi-2.jpg'],
            guideName: 'Anand Sharma',
            guideContact: '+91 9876543220',
            emergencyNumber: '112',
            mapLocation: '25.3176, 83.0130'
        }
        // Add other default places if needed, though localStorage should ideally contain all places
    ];
    
    // Combine both lists, prioritizing storedPlaces
    let allPlaces = [...defaultPlaces];
    storedPlaces.forEach(storedPlace => {
        const existingIndex = allPlaces.findIndex(p => p.id === storedPlace.id);
        if (existingIndex >= 0) {
            allPlaces[existingIndex] = storedPlace; // Overwrite default with stored
        } else {
            allPlaces.push(storedPlace); // Add new stored place
        }
    });
    
    // Find the place with matching ID from the correctly merged list
    return allPlaces.find(place => place.id === placeId);
}

// Load gallery images
function loadGallery(place) {
    const galleryContainer = document.getElementById('galleryContainer');
    galleryContainer.innerHTML = '';
    
    // Check if place has gallery images
    if (place.gallery && place.gallery.length > 0) {
        place.gallery.forEach(imageUrl => {
            const col = document.createElement('div');
            col.className = 'col';
            col.innerHTML = `
                <a href="${imageUrl}" class="gallery-item" data-bs-toggle="modal" data-bs-target="#imageModal">
                    <img src="${imageUrl}" class="img-fluid rounded" alt="${place.name}">
                </a>
            `;
            galleryContainer.appendChild(col);
        });
    } else {
        // No gallery images available
        galleryContainer.innerHTML = '<div class="col-12 text-center py-4">No gallery images available</div>';
    }
}

// Load similar places
function loadSimilarPlaces(currentPlace) {
    const container = document.getElementById('similarPlacesContainer');
    container.innerHTML = '';
    
    // Get all places
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
        }
    ];
    
    // Combine both lists
    const allPlaces = [...defaultPlaces, ...storedPlaces];
    
    // Filter out current place and find places with same category
    const similarPlaces = allPlaces
        .filter(place => place.id !== currentPlace.id && place.category === currentPlace.category)
        .slice(0, 3); // Get top 3
    
    if (similarPlaces.length === 0) {
        // If no similar places with same category, get top rated places
        const topPlaces = allPlaces
            .filter(place => place.id !== currentPlace.id)
            .sort((a, b) => b.rating - a.rating)
            .slice(0, 3);
        
        displaySimilarPlaces(topPlaces);
    } else {
        displaySimilarPlaces(similarPlaces);
    }
}

// Display similar places in the UI
function displaySimilarPlaces(places) {
    const container = document.getElementById('similarPlacesContainer');
    
    places.forEach(place => {
        const col = document.createElement('div');
        col.className = 'col';
        col.innerHTML = `
            <div class="card h-100">
                <img src="${place.image}" class="card-img-top" alt="${place.name}" style="height: 160px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${place.name}</h5>
                    <p class="card-text text-muted"><i class="fas fa-map-marker-alt"></i> ${place.location}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="badge bg-primary">${place.category}</span>
                        <span><i class="fas fa-star text-warning"></i> ${place.rating}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <a href="place-details.html?id=${place.id}" class="btn btn-sm btn-primary w-100">View Details</a>
                </div>
            </div>
        `;
        container.appendChild(col);
    });
}

// Load reviews
function loadReviews(place) {
    const container = document.getElementById('reviewsContainer');
    
    // Sample reviews - in a real app, these would be loaded from a database
    const reviews = [
        { name: 'John D.', date: '2023-04-15', rating: 5, comment: 'Amazing place! The architecture is stunning and the history is fascinating.' },
        { name: 'Sarah M.', date: '2023-04-10', rating: 4, comment: 'Beautiful location. Bit crowded but worth the visit.' },
        { name: 'Robert K.', date: '2023-04-05', rating: 5, comment: 'One of the best places I\'ve visited in India. Would definitely recommend.' }
    ];
    
    if (reviews.length === 0) {
        container.innerHTML = '<div class="text-center py-4">No reviews yet. Be the first to review!</div>';
        return;
    }
    
    // Clear container
    container.innerHTML = '';
    
    // Add each review
    reviews.forEach(review => {
        const reviewEl = document.createElement('div');
        reviewEl.className = 'review-item mb-3 pb-3 border-bottom';
        
        // Create star rating
        let starsHtml = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= review.rating) {
                starsHtml += '<i class="fas fa-star text-warning"></i> ';
            } else {
                starsHtml += '<i class="far fa-star text-warning"></i> ';
            }
        }
        
        reviewEl.innerHTML = `
            <div class="d-flex justify-content-between align-items-center mb-2">
                <div>
                    <h5 class="mb-0">${review.name}</h5>
                    <small class="text-muted">${new Date(review.date).toLocaleDateString()}</small>
                </div>
                <div class="review-rating">
                    ${starsHtml}
                </div>
            </div>
            <p class="mb-0">${review.comment}</p>
        `;
        
        container.appendChild(reviewEl);
    });
}

// Setup map
function setupMap(coordinates) {
    const mapContainer = document.getElementById('placeMap');
    mapContainer.innerHTML = ''; // Clear previous content (placeholder image)

    try {
        // Parse coordinates (expecting "latitude, longitude")
        const coords = coordinates.split(',').map(coord => parseFloat(coord.trim()));
        if (coords.length !== 2 || isNaN(coords[0]) || isNaN(coords[1])) {
            throw new Error('Invalid coordinates format');
        }
        const lat = coords[0];
        const lon = coords[1];

        // Create a small bounding box around the point for the iframe view
        const bboxOffset = 0.01; // Adjust for desired zoom level (smaller value = more zoomed in)
        const bbox = `${lon - bboxOffset},${lat - bboxOffset},${lon + bboxOffset},${lat + bboxOffset}`;

        // Construct OpenStreetMap embed URL
        const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lon}`;

        // Create iframe element
        const iframe = document.createElement('iframe');
        iframe.width = '100%';
        iframe.height = '250'; // Adjust height as needed
        iframe.style.border = '0';
        iframe.loading = 'lazy'; // Defer loading until needed
        iframe.src = mapUrl;
        iframe.title = `Map showing ${document.getElementById('placeName').textContent || 'location'}`;

        // Append the iframe to the map container
        mapContainer.appendChild(iframe);

        // Setup the directions link (to Google Maps for broader compatibility)
        document.getElementById('getDirections').href = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;
        document.getElementById('getDirections').target = '_blank';

    } catch (error) {
        console.error('Error setting up map:', error);
        mapContainer.innerHTML = `
            <div class="text-center p-3">
                <p class="text-danger">Could not load map preview.</p>
                ${coordinates ? `<p><small>Coordinates: ${coordinates}</small></p>` : ''}
                <img src="../images/map-placeholder.jpg" class="img-fluid rounded opacity-50" alt="Map Placeholder">
            </div>
        `;
        // Still provide directions link if coordinates were somewhat valid
        if (coordinates) {
             try {
                 const coords = coordinates.split(',').map(coord => parseFloat(coord.trim()));
                 if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
                     document.getElementById('getDirections').href = `https://www.google.com/maps/search/?api=1&query=${coords[0]},${coords[1]}`;
                     document.getElementById('getDirections').target = '_blank';
                 }
             } catch {}
        }
    }
}

// Setup event listeners
function setupEventListeners() {
    // Save to favorites button
    const saveButton = document.getElementById('saveToFavorites');
    saveButton.addEventListener('click', function() {
        // Toggle heart icon
        const heartIcon = this.querySelector('i');
        if (heartIcon.classList.contains('far')) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
            this.classList.add('active');
            alert('Added to favorites!');
        } else {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
            this.classList.remove('active');
            alert('Removed from favorites!');
        }
    });
    
    // Add review form submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Review submitted! In a real app, this would be saved to a database.');
            const modal = bootstrap.Modal.getInstance(document.getElementById('addReviewModal'));
            modal.hide();
        });
    }
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