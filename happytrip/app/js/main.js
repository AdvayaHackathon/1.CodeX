// HappyTrip - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // Load featured destinations
    loadFeaturedDestinations();
    
    // Load trending experiences
    // loadTrendingExperiences();

    // Initialize search functionality
    initSearch();
});

// Helper function to merge places data, prioritizing stored data
function mergePlacesData(defaultList, storedList) {
    const placeMap = new Map();
    defaultList.forEach(place => {
        const id = Number(place.id);
        if (!isNaN(id)) {
           placeMap.set(id, { ...place, id: id }); 
        }
    });
    storedList.forEach(place => {
        const id = Number(place.id);
         if (!isNaN(id)) {
           // Use jaipur.jpg as fallback
           const imagePath = place.image || '../images/jaipur.jpg'; // Path relative to /pages/ context, adjust if needed
           placeMap.set(id, { ...place, id: id, image: imagePath }); 
        }
    });
    return Array.from(placeMap.values()); 
}

// Load Featured Destinations
function loadFeaturedDestinations() {
    const featuredDestinationsContainer = document.querySelector('.featured-destinations .row');
    if (!featuredDestinationsContainer) return;
    
    const storedPlaces = JSON.parse(localStorage.getItem('places') || '[]');
    const defaultDestinations = [
        {
            id: 1,
            name: 'Taj Mahal',
            location: 'Agra, Uttar Pradesh',
            image: 'app/images/taj-mahal.jpg', // Note: Path relative to index.html
            rating: 4.8,
            description: 'One of the seven wonders of the world, this ivory-white marble mausoleum is a must-visit.'
        },
        {
            id: 2,
            name: 'Jaipur City Palace',
            location: 'Jaipur, Rajasthan',
            image: 'app/images/jaipur-palace.jpg',
            rating: 4.5,
            description: 'Experience the royal heritage of Rajasthan in this magnificent palace complex.'
        },
        {
            id: 3,
            name: 'Goa Beaches',
            location: 'Goa',
            image: 'app/images/goa-beach.jpg',
            rating: 4.7,
            description: 'Relax on the pristine beaches of Goa, known for their beauty and vibrant atmosphere.'
        },
        {
            id: 4,
            name: 'Varanasi Ghats',
            location: 'Varanasi, Uttar Pradesh',
            image: 'app/images/varanasi.jpg',
            rating: 4.6,
            description: 'Experience the spiritual heart of India with the ancient ghats along the Ganges River.'
        },
        {
            id: 5,
            name: 'Darjeeling',
            location: 'West Bengal',
            image: 'app/images/darjeeling.jpg',
            rating: 4.4,
            description: 'Visit this hill station for breathtaking views of the Himalayas and world-famous tea gardens.'
        },
        {
            id: 6,
            name: 'Kerala Backwaters',
            location: 'Kerala',
            image: 'app/images/kerala.jpg',
            rating: 4.9,
            description: 'Cruise along the serene backwaters of Kerala in a traditional houseboat for a unique experience.'
        }
    ];

    const allDestinations = mergePlacesData(defaultDestinations, storedPlaces);
    const featuredDestinations = allDestinations.sort((a, b) => (b.rating || 0) - (a.rating || 0)).slice(0, 6);
    
    featuredDestinationsContainer.innerHTML = '';
    
    featuredDestinations.forEach(destination => {
        const card = document.createElement('div');
        card.className = 'col';
        // Adjust image path and use jaipur.jpg as fallback
        const imageSrc = destination.image || 'app/images/jaipur.jpg'; // Default for home page context
        const finalImageSrc = imageSrc && !imageSrc.startsWith('data:image') 
                         ? imageSrc.replace(/^..\//, 'app/') 
                         : imageSrc;
        card.innerHTML = `
            <div class="card h-100 place-card">
                <img src="${finalImageSrc}" class="card-img-top" alt="${destination.name}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${destination.name}</h5>
                    <p class="card-text text-muted"><i class="fas fa-map-marker-alt"></i> ${destination.location}</p>
                    <p class="card-text">${(destination.description || '').substring(0, 100)}${(destination.description || '').length > 100 ? '...' : ''}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="place-rating">
                            <span>${destination.rating || 'N/A'}</span>
                            <i class="fas fa-star"></i>
                        </div>
                        <a href="app/pages/place-details.html?id=${destination.id}" class="btn btn-sm btn-primary">View Details</a>
                    </div>
                </div>
            </div>
        `;
        featuredDestinationsContainer.appendChild(card);
    });
}

// Function to load trending experiences (from local storage or vlogs)
// Commenting this out to use the static HTML in index.html instead
/*
function loadTrendingExperiences() {
    const trendingExperiencesContainer = document.querySelector('.featured-experiences .row');
    if (!trendingExperiencesContainer) return;

    const storedPlaces = JSON.parse(localStorage.getItem('places') || '[]');
    const storedVlogs = JSON.parse(localStorage.getItem('vlogs') || '[]');

    // Use a Map to avoid duplicates based on ID
    const experienceMap = new Map(); 

    // Process places as potential experiences
    storedPlaces.forEach(place => {
        // Prioritize place-specific image, fallback to jaipur.jpg
        const imgSrc = place.images && place.images.length > 0 ? place.images[0] : 'app/images/jaipur.jpg'; 
        const displayPlace = {
            id: place.id,
            title: place.name,
            image: imgSrc && !imgSrc.startsWith('data:image') ? imgSrc.replace(/^..\//, 'app/') : imgSrc,
            author: place.guide_name || 'Admin', // Use guide name if available
            authorImg: 'app/images/logo.jpg', // Placeholder, use a default or guide image if available
            date: place.added_on || new Date().toISOString().split('T')[0], // Use added_on date or current date
            description: place.description ? place.description.substring(0, 100) + (place.description.length > 100 ? '...' : '') : 'Explore this amazing place.'
        };
        experienceMap.set(displayPlace.id, displayPlace);
    });

    // Process vlogs as potential experiences, possibly overwriting places if ID matches
    storedVlogs.forEach(vlog => {
        // Use jaipur.jpg as fallback for both thumbnail and author image
        const thumbSrc = vlog.thumbnail || 'app/images/jaipur.jpg'; 
        const authorImgSrc = vlog.authorImg || 'app/images/jaipur.jpg'; // Or keep a dedicated user placeholder if you create one
        
        const displayVlog = {
            id: vlog.id,
            title: vlog.title,
            image: thumbSrc && !thumbSrc.startsWith('data:image') ? thumbSrc.replace(/^..\//, 'app/') : thumbSrc,
            author: vlog.author,
            authorImg: authorImgSrc && !authorImgSrc.startsWith('data:image') ? authorImgSrc.replace(/^..\//, 'app/') : authorImgSrc,
            date: vlog.date,
            description: vlog.description ? vlog.description.substring(0, 100) + (vlog.description.length > 100 ? '...' : '') : 'No description.'
        };
        experienceMap.set(displayVlog.id, displayVlog); 
    });

    const combinedExperiences = Array.from(experienceMap.values());
    const trendingExperiences = combinedExperiences.sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4);
    
    trendingExperiencesContainer.innerHTML = '';
    
    trendingExperiences.forEach(experience => {
        const card = document.createElement('div');
        card.className = 'col';
        const detailLink = `app/pages/vlog-details.html?id=${experience.id}`; 
        // Use jaipur.jpg as final fallback in card display
        const imageSrc = experience.image || 'app/images/jaipur.jpg'; 
        const authorImgSrc = experience.authorImg || 'app/images/jaipur.jpg';

        card.innerHTML = `
            <div class="card h-100 vlog-card">
                <img src="${imageSrc}" class="card-img-top" alt="${experience.title}" style="height: 200px; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${experience.title}</h5>
                    <div class="vlog-author mb-2">
                        <img src="${authorImgSrc}" alt="${experience.author}" style="width: 30px; height: 30px; border-radius: 50%; margin-right: 5px; object-fit: cover;">
                        <span>${experience.author}</span>
                        <small class="text-muted ms-auto">${experience.date ? new Date(experience.date).toLocaleDateString() : 'N/A'}</small>
                    </div>
                    <p class="card-text">${experience.description}</p>
                    <a href="${detailLink}" class="btn btn-sm btn-outline-primary">Read More</a> 
                </div>
            </div>
        `;
        trendingExperiencesContainer.appendChild(card);
    });
}
*/

// Initialize search functionality
function initSearch() {
    const searchContainer = document.querySelector('.search-container');
    if (!searchContainer) return;
    
    const searchInput = searchContainer.querySelector('input');
    const searchButton = searchContainer.querySelector('button');
    
    if (searchButton) {
        searchButton.addEventListener('click', function() {
            if (searchInput && searchInput.value.trim()) {
                // Redirect to a generic search results page if available
                // window.location.href = `app/pages/search-results.html?q=${encodeURIComponent(searchInput.value.trim())}`;
                alert(`Searching for: ${searchInput.value.trim()}`); // Placeholder action
            }
        });
    }
    
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && searchInput.value.trim()) {
                // window.location.href = `app/pages/search-results.html?q=${encodeURIComponent(searchInput.value.trim())}`;
                 alert(`Searching for: ${searchInput.value.trim()}`); // Placeholder action
            }
        });
    }
} 