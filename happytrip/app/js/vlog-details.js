document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const vlogIdParam = urlParams.get('id');
    
    // Vlog IDs might be numbers (timestamps) or strings (like 'vlog1')
    const vlogId = !isNaN(parseInt(vlogIdParam)) ? parseInt(vlogIdParam) : vlogIdParam;

    if (!vlogId) {
        alert('No Vlog ID provided.');
        window.location.href = 'vlogs.html'; // Redirect back to the vlogs list
        return;
    }

    loadVlogDetails(vlogId);
    checkUserAuth(); // Assuming you have this function for user state
});

function getVlogById(vlogId) {
    const storedVlogs = JSON.parse(localStorage.getItem('vlogs') || '[]');
    const mostRecentVlog = JSON.parse(localStorage.getItem('mostRecentVlog') || 'null');

    // Default experiences data (from main.js - may need adjusting)
    const defaultExperiences = [
        { id: 'vlog1', title: 'Street Food Tour in Delhi', image: '../images/jaipur.jpg', author: 'FoodExplorer', date: '2023-04-05', description: 'Experience the diverse flavors...', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'vlog2', title: 'Himalayan Trekking Adventure', image: '../images/darjeeling.jpg', author: 'MountainLover', date: '2023-04-10', description: 'Embark on an unforgettable journey...', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'vlog3', title: 'Traditional Dance Workshop...', image: '../images/jaipur.jpg', author: 'CultureEnthusiast', date: '2023-04-12', description: 'Learn the vibrant dance forms...', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' },
        { id: 'vlog4', title: 'Backwater Cruise in Kerala', image: '../images/kerala.jpg', author: 'NatureLover', date: '2023-04-15', description: 'Relax on a traditional houseboat...', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' }
    ];
    
    // Combine vlogs from localStorage (ensure most recent is included)
    const allStoredVlogs = new Map();
    if(mostRecentVlog) {
        allStoredVlogs.set(mostRecentVlog.id, mostRecentVlog);
    }
    storedVlogs.forEach(v => allStoredVlogs.set(v.id, v));

    // Combine defaults and stored, prioritizing stored
    const combinedVlogs = new Map();
    defaultExperiences.forEach(exp => combinedVlogs.set(exp.id, exp));
    allStoredVlogs.forEach(vlog => combinedVlogs.set(vlog.id, vlog)); // Overwrites defaults
    
    // Find the vlog by ID (handle number or string ID)
    return combinedVlogs.get(vlogId);
}

function loadVlogDetails(vlogId) {
    const vlog = getVlogById(vlogId);

    if (!vlog) {
        alert('Vlog not found.');
        document.getElementById('main-content').innerHTML = '<div class="alert alert-danger">Could not load vlog details.</div>';
        return;
    }

    document.title = `${vlog.title} - HappyTrip Vlogs`;
    document.getElementById('vlogTitle').textContent = vlog.title;
    document.getElementById('vlogTitleDisplay').textContent = vlog.title;
    document.getElementById('vlogAuthor').textContent = vlog.author || 'Unknown Author';
    document.getElementById('vlogDate').textContent = vlog.date ? new Date(vlog.date).toLocaleDateString() : 'N/A';
    document.getElementById('vlogLocation').textContent = vlog.location || 'Unknown Location';
    document.getElementById('vlogDescription').textContent = vlog.description || 'No description available.';
    
    // Handle image/video display
    const mediaContainer = document.getElementById('vlogMediaContainer');
    mediaContainer.innerHTML = ''; // Clear loading/placeholder
    
    // Use jaipur.jpg as the default fallback image
    const fallbackImage = '../images/jaipur.jpg'; 

    if (vlog.video && (vlog.video.includes('youtube.com') || vlog.video.includes('youtu.be'))) {
        const videoId = extractYouTubeId(vlog.video);
        if (videoId) {
            mediaContainer.innerHTML = `
                <div class="ratio ratio-16x9">
                    <iframe src="https://www.youtube.com/embed/${videoId}" title="YouTube video player" 
                            frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                            allowfullscreen></iframe>
                </div>`;
        } else {
             // If YouTube link is invalid, show thumbnail or fallback
             const thumbSrc = vlog.thumbnail || fallbackImage;
             mediaContainer.innerHTML = `<img src="${thumbSrc}" class="img-fluid rounded" alt="${vlog.title}">`;
        }
    } else if (vlog.thumbnail) {
        // Display thumbnail image (adjust path if needed)
        const imageSrc = vlog.thumbnail && !vlog.thumbnail.startsWith('data:image') && !vlog.thumbnail.startsWith('../') 
                         ? `../images/${vlog.thumbnail.split('/').pop()}` 
                         : vlog.thumbnail || fallbackImage;
        mediaContainer.innerHTML = `<img src="${imageSrc}" class="img-fluid rounded" alt="${vlog.title}">`;
    } else {
        // Default fallback if no video or thumbnail
        mediaContainer.innerHTML = `<img src="${fallbackImage}" class="img-fluid rounded" alt="Placeholder Image">`;
    }

    // Load tags
    const tagsContainer = document.getElementById('vlogTags');
    tagsContainer.innerHTML = '';
    if (vlog.tags) {
        const tags = vlog.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
        tags.forEach(tag => {
            tagsContainer.innerHTML += `<span class="badge bg-secondary me-1">${tag}</span>`;
        });
    } else {
        tagsContainer.innerHTML = '<span class="text-muted">No tags available.</span>';
    }
    
    // TODO: Load comments if implementing a comment section
    // loadComments(vlogId);
    
    // TODO: Load related vlogs if implementing that section
    // loadRelatedVlogs(vlog);
}

// Helper to extract YouTube video ID from various URL formats
function extractYouTubeId(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
}

// Dummy checkUserAuth if not already globally available via auth.js
if (typeof checkUserAuth === 'undefined') {
    function checkUserAuth() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const username = localStorage.getItem('username');
        
        if (isLoggedIn && username) {
            document.getElementById('loginBtn')?.classList.add('d-none');
            document.getElementById('registerBtn')?.classList.add('d-none');
            const profileArea = document.getElementById('userProfileArea');
            if(profileArea) {
                profileArea.classList.remove('d-none');
                document.getElementById('username').textContent = username;
            }
        } else {
            document.getElementById('loginBtn')?.classList.remove('d-none');
            document.getElementById('registerBtn')?.classList.remove('d-none');
            document.getElementById('userProfileArea')?.classList.add('d-none');
        }
    }
} 