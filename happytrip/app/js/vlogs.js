document.addEventListener('DOMContentLoaded', function() {
    // Initialize the UI
    loadVlogs();
    setupEventListeners();
    checkUserAuth();
});

// Load vlogs from localStorage and API
function loadVlogs() {
    // Try to get vlogs from localStorage first (these would be vlogs added via admin panel)
    const storedVlogs = JSON.parse(localStorage.getItem('vlogs') || '[]');
    
    // Check for the most recent vlog specifically
    const mostRecentVlog = JSON.parse(localStorage.getItem('mostRecentVlog') || 'null');
    
    // Get merged image if available
    const latestMergedImage = localStorage.getItem('latestMergedVlogImage');
    
    // Combine with default vlogs data (in a real app, this would be loaded from an API)
    let vlogs = [
        { 
            id: 1, 
            title: 'Exploring Rajasthan\'s Royal Heritage', 
            author: 'TravelWithMaya', 
            location: 'Rajasthan', 
            date: '2023-04-15', 
            thumbnail: '../images/vlogs/rajasthan-trip.jpg',
            description: 'Join this journey through the colorful cities of Jaipur, Jodhpur, and Udaipur.',
            views: 24500,
            category: 'cultural',
            region: 'north',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
        },
        { 
            id: 2, 
            title: 'Kerala Backwaters: A Serene Experience', 
            author: 'WanderlustDiaries', 
            location: 'Kerala', 
            date: '2023-04-12', 
            thumbnail: '../images/vlogs/kerala-backwaters.jpg',
            description: 'Experience the tranquil backwaters and lush greenery of God\'s Own Country.',
            views: 18300,
            category: 'nature',
            region: 'south',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
        },
        { 
            id: 3, 
            title: 'Ladakh: Mountain Biking Adventure', 
            author: 'AdventureSeeker', 
            location: 'Ladakh', 
            date: '2023-04-10', 
            thumbnail: '../images/vlogs/ladakh-adventure.jpg',
            description: 'Follow this thrilling mountain biking journey through the breathtaking landscapes of Ladakh.',
            views: 32700,
            category: 'adventure',
            region: 'north',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
        }
    ];
    
    // Add any stored vlogs to the beginning of the array
    storedVlogs.forEach(vlog => {
        // Avoid duplicates by checking if this vlog ID is already in our array
        if (!vlogs.some(v => v.id === vlog.id)) {
            // Add region and category if missing
            vlog.region = vlog.region || 'north';
            vlog.category = vlog.category || 'cultural';
            vlog.videoUrl = vlog.video || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
            vlog.views = vlog.views || Math.floor(Math.random() * 10000);
            
            vlogs.unshift(vlog);
        }
    });
    
    // If we have a most recent vlog, make sure it's at the top
    if (mostRecentVlog && mostRecentVlog.thumbnail) {
        // Remove any existing instance of this vlog
        vlogs = vlogs.filter(v => v.id !== mostRecentVlog.id);
        
        // Add default properties if missing
        mostRecentVlog.region = mostRecentVlog.region || 'north';
        mostRecentVlog.category = mostRecentVlog.category || 'cultural';
        mostRecentVlog.videoUrl = mostRecentVlog.video || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
        mostRecentVlog.views = mostRecentVlog.views || Math.floor(Math.random() * 10000);
        
        // Add to beginning
        vlogs.unshift(mostRecentVlog);
    }
    
    // If we have a merged image but no corresponding vlog, create one
    if (latestMergedImage && !vlogs.some(v => v.thumbnail === latestMergedImage)) {
        vlogs.unshift({
            id: Date.now(),
            title: 'New Travel Experience',
            author: localStorage.getItem('username') || 'Travel Enthusiast',
            location: 'Various Locations',
            date: new Date().toISOString().split('T')[0],
            thumbnail: latestMergedImage,
            description: 'A wonderful collection of travel moments captured in images.',
            views: Math.floor(Math.random() * 1000),
            category: 'cultural',
            region: 'north',
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // Replace with actual video
        });
    }
    
    // Display in featured and all vlogs sections
    displayFeaturedVlogs(vlogs.slice(0, 3));
    displayAllVlogs(vlogs);
}

// Display featured vlogs
function displayFeaturedVlogs(vlogs) {
    const featuredContainer = document.getElementById('featuredVlogs');
    
    // Clear existing content
    featuredContainer.innerHTML = '';
    
    // Add each vlog
    vlogs.forEach(vlog => {
        const col = document.createElement('div');
        col.className = 'col';
        
        col.innerHTML = `
            <div class="card h-100">
                <div class="ratio ratio-16x9">
                    <img src="${vlog.thumbnail}" class="card-img-top" alt="${vlog.title}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${vlog.title}</h5>
                    <p class="card-text">${vlog.description}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="text-muted"><i class="fas fa-user"></i> ${vlog.author}</span>
                        <span class="text-muted"><i class="fas fa-eye"></i> ${formatViews(vlog.views)}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary btn-sm w-100 watch-vlog" data-id="${vlog.id}">Watch Now</button>
                </div>
            </div>
        `;
        
        featuredContainer.appendChild(col);
    });
}

// Display all vlogs
function displayAllVlogs(vlogs) {
    const allVlogsContainer = document.getElementById('allVlogs');
    
    // Clear existing content
    allVlogsContainer.innerHTML = '';
    
    // Add each vlog
    vlogs.forEach(vlog => {
        const col = document.createElement('div');
        col.className = 'col';
        
        col.innerHTML = `
            <div class="card h-100">
                <div class="ratio ratio-16x9">
                    <img src="${vlog.thumbnail}" class="card-img-top" alt="${vlog.title}">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${vlog.title}</h5>
                    <p class="card-text">${vlog.description || 'Explore this amazing travel experience!'}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <span class="text-muted"><i class="fas fa-user"></i> ${vlog.author}</span>
                        <span class="text-muted"><i class="fas fa-eye"></i> ${formatViews(vlog.views)}</span>
                    </div>
                    <div class="mt-2">
                        <span class="badge bg-primary me-1">${vlog.location}</span>
                        <span class="badge bg-secondary me-1">${vlog.category}</span>
                    </div>
                </div>
                <div class="card-footer">
                    <button class="btn btn-primary btn-sm w-100 watch-vlog" data-id="${vlog.id}">Watch Now</button>
                </div>
            </div>
        `;
        
        allVlogsContainer.appendChild(col);
    });
}

// Format view numbers (e.g., 24500 -> 24.5K)
function formatViews(views) {
    if (views >= 1000000) {
        return (views / 1000000).toFixed(1) + 'M';
    } else if (views >= 1000) {
        return (views / 1000).toFixed(1) + 'K';
    } else {
        return views.toString();
    }
}

// Set up event listeners
function setupEventListeners() {
    // Watch vlog buttons
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('watch-vlog') || e.target.closest('.watch-vlog')) {
            const button = e.target.classList.contains('watch-vlog') ? e.target : e.target.closest('.watch-vlog');
            const vlogId = button.getAttribute('data-id');
            openVlogPreview(vlogId);
        }
    });
    
    // Search button
    document.getElementById('searchVlogsBtn').addEventListener('click', function() {
        const searchTerm = document.getElementById('vlogSearch').value.toLowerCase();
        searchVlogs(searchTerm);
    });
    
    // Filter button
    document.getElementById('applyFiltersBtn').addEventListener('click', applyFilters);
}

// Open vlog preview modal
function openVlogPreview(vlogId) {
    // Get vlogs from localStorage and default list
    const storedVlogs = JSON.parse(localStorage.getItem('vlogs') || '[]');
    const defaultVlogs = [
        { 
            id: 1, 
            title: 'Exploring Rajasthan\'s Royal Heritage', 
            author: 'TravelWithMaya', 
            location: 'Rajasthan', 
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Join this journey through the colorful cities of Jaipur, Jodhpur, and Udaipur.'
        },
        { 
            id: 2, 
            title: 'Kerala Backwaters: A Serene Experience', 
            author: 'WanderlustDiaries', 
            location: 'Kerala', 
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Experience the tranquil backwaters and lush greenery of God\'s Own Country.'
        },
        { 
            id: 3, 
            title: 'Ladakh: Mountain Biking Adventure', 
            author: 'AdventureSeeker', 
            location: 'Ladakh', 
            videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
            description: 'Follow this thrilling mountain biking journey through the breathtaking landscapes of Ladakh.'
        }
    ];
    
    // Combine both lists
    const allVlogs = [...storedVlogs, ...defaultVlogs];
    
    // Find the requested vlog
    const vlog = allVlogs.find(v => v.id == vlogId);
    
    if (vlog) {
        // Set modal content
        document.getElementById('vlogTitle').textContent = vlog.title;
        document.getElementById('vlogCreator').textContent = vlog.author;
        document.getElementById('vlogDescription').textContent = vlog.description || 'No description available.';
        document.getElementById('vlogLocation').textContent = vlog.location;
        document.getElementById('vlogCategory').textContent = vlog.category || 'Travel';
        
        // Set video player source
        const videoUrl = vlog.videoUrl || vlog.video || 'https://www.youtube.com/embed/dQw4w9WgXcQ';
        document.getElementById('vlogPlayer').src = videoUrl;
        
        // Update like count
        document.getElementById('likeCount').textContent = Math.floor(Math.random() * 1000);
        
        // Show the modal
        const modal = new bootstrap.Modal(document.getElementById('vlogPreviewModal'));
        modal.show();
    } else {
        alert('Vlog not found.');
    }
}

// Search vlogs by term
function searchVlogs(term) {
    if (!term) {
        // If search term is empty, reload all vlogs
        loadVlogs();
        return;
    }
    
    // Get all vlogs
    const storedVlogs = JSON.parse(localStorage.getItem('vlogs') || '[]');
    const defaultVlogs = [
        { 
            id: 1, 
            title: 'Exploring Rajasthan\'s Royal Heritage', 
            author: 'TravelWithMaya', 
            location: 'Rajasthan', 
            date: '2023-04-15', 
            thumbnail: '../images/vlogs/rajasthan-trip.jpg',
            description: 'Join this journey through the colorful cities of Jaipur, Jodhpur, and Udaipur.',
            views: 24500,
            category: 'cultural',
            region: 'north' 
        },
        { 
            id: 2, 
            title: 'Kerala Backwaters: A Serene Experience', 
            author: 'WanderlustDiaries', 
            location: 'Kerala', 
            date: '2023-04-12', 
            thumbnail: '../images/vlogs/kerala-backwaters.jpg',
            description: 'Experience the tranquil backwaters and lush greenery of God\'s Own Country.',
            views: 18300,
            category: 'nature',
            region: 'south'
        },
        { 
            id: 3, 
            title: 'Ladakh: Mountain Biking Adventure', 
            author: 'AdventureSeeker', 
            location: 'Ladakh', 
            date: '2023-04-10', 
            thumbnail: '../images/vlogs/ladakh-adventure.jpg',
            description: 'Follow this thrilling mountain biking journey through the breathtaking landscapes of Ladakh.',
            views: 32700,
            category: 'adventure',
            region: 'north'
        }
    ];
    
    // Combine and filter vlogs
    const allVlogs = [...storedVlogs, ...defaultVlogs];
    const filteredVlogs = allVlogs.filter(vlog => {
        return (
            vlog.title.toLowerCase().includes(term) ||
            vlog.author.toLowerCase().includes(term) ||
            vlog.location.toLowerCase().includes(term) ||
            (vlog.description && vlog.description.toLowerCase().includes(term)) ||
            (vlog.tags && vlog.tags.toLowerCase().includes(term))
        );
    });
    
    // Display filtered results
    displayFeaturedVlogs(filteredVlogs.slice(0, 3));
    displayAllVlogs(filteredVlogs);
}

// Apply filters from dropdown
function applyFilters() {
    const region = document.getElementById('regionFilter').value;
    const category = document.getElementById('categoryFilter').value;
    
    if (!region && !category) {
        // If no filters selected, reload all vlogs
        loadVlogs();
        return;
    }
    
    // Get all vlogs
    const storedVlogs = JSON.parse(localStorage.getItem('vlogs') || '[]');
    const defaultVlogs = [
        { 
            id: 1, 
            title: 'Exploring Rajasthan\'s Royal Heritage', 
            author: 'TravelWithMaya', 
            location: 'Rajasthan', 
            date: '2023-04-15', 
            thumbnail: '../images/vlogs/rajasthan-trip.jpg',
            description: 'Join this journey through the colorful cities of Jaipur, Jodhpur, and Udaipur.',
            views: 24500,
            category: 'cultural',
            region: 'north' 
        },
        { 
            id: 2, 
            title: 'Kerala Backwaters: A Serene Experience', 
            author: 'WanderlustDiaries', 
            location: 'Kerala', 
            date: '2023-04-12', 
            thumbnail: '../images/vlogs/kerala-backwaters.jpg',
            description: 'Experience the tranquil backwaters and lush greenery of God\'s Own Country.',
            views: 18300,
            category: 'nature',
            region: 'south'
        },
        { 
            id: 3, 
            title: 'Ladakh: Mountain Biking Adventure', 
            author: 'AdventureSeeker', 
            location: 'Ladakh', 
            date: '2023-04-10', 
            thumbnail: '../images/vlogs/ladakh-adventure.jpg',
            description: 'Follow this thrilling mountain biking journey through the breathtaking landscapes of Ladakh.',
            views: 32700,
            category: 'adventure',
            region: 'north'
        }
    ];
    
    // Add default category and region to stored vlogs if missing
    const enhancedStoredVlogs = storedVlogs.map(vlog => {
        return {
            ...vlog,
            category: vlog.category || 'cultural',
            region: vlog.region || 'north'
        };
    });
    
    // Combine and filter vlogs
    const allVlogs = [...enhancedStoredVlogs, ...defaultVlogs];
    const filteredVlogs = allVlogs.filter(vlog => {
        return (
            (!region || vlog.region === region) &&
            (!category || vlog.category === category)
        );
    });
    
    // Display filtered results
    displayFeaturedVlogs(filteredVlogs.slice(0, 3));
    displayAllVlogs(filteredVlogs);
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