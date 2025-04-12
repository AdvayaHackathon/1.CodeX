document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const historyLoginBtn = document.getElementById('historyLoginBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const userProfileArea = document.getElementById('userProfileArea');
    const username = document.getElementById('username');
    const hotelSearchForm = document.getElementById('hotelSearchForm');
    const flightSearchForm = document.getElementById('flightSearchForm');
    const activitySearchForm = document.getElementById('activitySearchForm');
    const packageSearchForm = document.getElementById('packageSearchForm');
    const featuredHotels = document.getElementById('featuredHotels');
    const hotelDetailModal = document.getElementById('hotelDetailModal');
    
    // Check if user is logged in (would use proper authentication in a real app)
    function checkLoginStatus() {
        // For demo purposes, get from localStorage
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const storedUsername = localStorage.getItem('username');
        
        if (isLoggedIn && storedUsername && userProfileArea && loginBtn && registerBtn) {
            userProfileArea.classList.remove('d-none');
            loginBtn.classList.add('d-none');
            registerBtn.classList.add('d-none');
            
            if (username) {
                username.textContent = storedUsername;
            }
            
            // Hide login alerts when user is already logged in
            const loginAlerts = document.querySelectorAll('.alert-info');
            loginAlerts.forEach(alert => {
                alert.style.display = 'none';
            });
            
            // Show history tab content if on that tab
            const historyTab = document.getElementById('history');
            if (historyTab) {
                const loginMessage = historyTab.querySelector('.login-required-message');
                if (loginMessage) {
                    loginMessage.style.display = 'none';
                }
                
                // Create mock booking history
                createMockBookingHistory(historyTab);
            }
        } else {
            if (userProfileArea && loginBtn && registerBtn) {
                userProfileArea.classList.add('d-none');
                loginBtn.classList.remove('d-none');
                registerBtn.classList.remove('d-none');
            }
        }
    }
    
    // Create mock booking history for logged in users
    function createMockBookingHistory(container) {
        // Only proceed if container exists and doesn't already have history content
        if (!container || container.querySelector('.booking-history-content')) {
            return;
        }
        
        const historyContent = document.createElement('div');
        historyContent.className = 'booking-history-content';
        
        historyContent.innerHTML = `
            <div class="booking-filters mb-4">
                <div class="row">
                    <div class="col-md-4">
                        <select class="form-select" id="bookingTypeFilter">
                            <option value="all" selected>All Bookings</option>
                            <option value="hotel">Hotels</option>
                            <option value="flight">Flights</option>
                            <option value="activity">Activities</option>
                            <option value="package">Packages</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <select class="form-select" id="bookingStatusFilter">
                            <option value="all" selected>All Statuses</option>
                            <option value="upcoming">Upcoming</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" placeholder="Search bookings..." id="bookingSearch">
                    </div>
                </div>
            </div>
            
            <div class="booking-history-list">
                <div class="card mb-3 booking-item" data-type="hotel" data-status="upcoming">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-2">
                                <img src="../images/hotels/taj-palace.jpg" class="img-fluid rounded" alt="Hotel Image">
                            </div>
                            <div class="col-md-7">
                                <h5 class="card-title">Taj Palace Hotel</h5>
                                <p class="text-muted mb-1">New Delhi</p>
                                <p class="mb-2"><i class="fas fa-calendar-check text-success"></i> Check-in: May 15, 2023 | Check-out: May 18, 2023</p>
                                <p class="mb-0"><i class="fas fa-user"></i> Guests: 2 | <i class="fas fa-bed"></i> Deluxe Room</p>
                            </div>
                            <div class="col-md-3 text-md-end">
                                <span class="badge bg-success mb-2">Upcoming</span>
                                <p class="text-primary fw-bold">₹12,500/night</p>
                                <button class="btn btn-sm btn-outline-primary">View Details</button>
                                <button class="btn btn-sm btn-outline-danger">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card mb-3 booking-item" data-type="flight" data-status="upcoming">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-2">
                                <img src="../images/flights/indigo.jpg" class="img-fluid rounded" alt="Airline Image">
                            </div>
                            <div class="col-md-7">
                                <h5 class="card-title">Delhi to Mumbai</h5>
                                <p class="text-muted mb-1">IndiGo Airlines | Flight 6E-213</p>
                                <p class="mb-2"><i class="fas fa-plane-departure text-primary"></i> Departure: May 15, 2023 - 10:30 AM</p>
                                <p class="mb-0"><i class="fas fa-plane-arrival text-primary"></i> Arrival: May 15, 2023 - 12:45 PM</p>
                            </div>
                            <div class="col-md-3 text-md-end">
                                <span class="badge bg-success mb-2">Upcoming</span>
                                <p class="text-primary fw-bold">₹4,850</p>
                                <button class="btn btn-sm btn-outline-primary">View Details</button>
                                <button class="btn btn-sm btn-outline-danger">Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card mb-3 booking-item" data-type="package" data-status="completed">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-2">
                                <img src="../images/packages/kerala.jpg" class="img-fluid rounded" alt="Package Image">
                            </div>
                            <div class="col-md-7">
                                <h5 class="card-title">Kerala Backwaters Escape</h5>
                                <p class="text-muted mb-1">5 Days / 4 Nights</p>
                                <p class="mb-2"><i class="fas fa-calendar-check text-success"></i> Jan 10, 2023 - Jan 15, 2023</p>
                                <p class="mb-0"><i class="fas fa-user"></i> Travelers: 2</p>
                            </div>
                            <div class="col-md-3 text-md-end">
                                <span class="badge bg-secondary mb-2">Completed</span>
                                <p class="text-primary fw-bold">₹32,500/person</p>
                                <button class="btn btn-sm btn-outline-primary">View Details</button>
                                <button class="btn btn-sm btn-outline-info">Write Review</button>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="card mb-3 booking-item" data-type="activity" data-status="cancelled">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-2">
                                <img src="../images/activities/scuba.jpg" class="img-fluid rounded" alt="Activity Image">
                            </div>
                            <div class="col-md-7">
                                <h5 class="card-title">Scuba Diving Experience</h5>
                                <p class="text-muted mb-1">Andaman Islands</p>
                                <p class="mb-2"><i class="fas fa-calendar-check text-success"></i> Feb 12, 2023 | 9:00 AM</p>
                                <p class="mb-0"><i class="fas fa-user"></i> Participants: 2</p>
                            </div>
                            <div class="col-md-3 text-md-end">
                                <span class="badge bg-danger mb-2">Cancelled</span>
                                <p class="text-primary fw-bold">₹4,500/person</p>
                                <button class="btn btn-sm btn-outline-primary">View Details</button>
                                <button class="btn btn-sm btn-outline-success">Book Again</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        container.appendChild(historyContent);
        
        // Add event listeners for filters
        const bookingTypeFilter = document.getElementById('bookingTypeFilter');
        const bookingStatusFilter = document.getElementById('bookingStatusFilter');
        const bookingSearch = document.getElementById('bookingSearch');
        
        function filterBookings() {
            const typeFilter = bookingTypeFilter.value;
            const statusFilter = bookingStatusFilter.value;
            const searchText = bookingSearch.value.toLowerCase();
            
            const bookingItems = document.querySelectorAll('.booking-item');
            
            bookingItems.forEach(item => {
                const itemType = item.getAttribute('data-type');
                const itemStatus = item.getAttribute('data-status');
                const itemText = item.textContent.toLowerCase();
                
                const typeMatch = typeFilter === 'all' || itemType === typeFilter;
                const statusMatch = statusFilter === 'all' || itemStatus === statusFilter;
                const searchMatch = searchText === '' || itemText.includes(searchText);
                
                if (typeMatch && statusMatch && searchMatch) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        }
        
        if (bookingTypeFilter) bookingTypeFilter.addEventListener('change', filterBookings);
        if (bookingStatusFilter) bookingStatusFilter.addEventListener('change', filterBookings);
        if (bookingSearch) bookingSearch.addEventListener('input', filterBookings);
    }
    
    // Event listeners
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            // Normally would show a login modal, but for demo just simulate login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', 'Demo User');
            checkLoginStatus();
        });
    }
    
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            // Normally would show a registration modal
            alert('Registration functionality would be implemented here.');
        });
    }
    
    if (historyLoginBtn) {
        historyLoginBtn.addEventListener('click', function() {
            // Same as regular login button
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('username', 'Demo User');
            checkLoginStatus();
        });
    }
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            checkLoginStatus();
            
            // Show login message in history tab again
            const historyTab = document.getElementById('history');
            if (historyTab) {
                const loginMessage = historyTab.querySelector('.login-required-message');
                if (loginMessage) {
                    loginMessage.style.display = 'block';
                }
                
                // Remove booking history content
                const historyContent = historyTab.querySelector('.booking-history-content');
                if (historyContent) {
                    historyContent.remove();
                }
            }
        });
    }
    
    // Helper function to format date from YYYY-MM-DD to DD/MM/YYYY
    function formatDateForMMT(dateString) {
        if (!dateString) return '';
        try {
            const [year, month, day] = dateString.split('-');
            return `${day}/${month}/${year}`;
        } catch (error) {
            console.error("Error formatting date:", error);
            return ''; // Return empty if format is unexpected
        }
    }

    // Form submission handlers
    if (hotelSearchForm) {
        hotelSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // alert('Hotel search would be implemented here. This would search for hotels based on the criteria you entered.');
            
            // Gather data from form
            const destination = document.getElementById('destination')?.value || '';
            const checkinDate = document.getElementById('checkin')?.value || '';
            const checkoutDate = document.getElementById('checkout')?.value || '';
            const rooms = document.getElementById('rooms')?.value || '1';
            const guests = document.getElementById('guests')?.value || '1'; // Simplification: MMT often needs adults/children
            
            // Format dates for MMT (DD/MM/YYYY)
            const formattedCheckin = formatDateForMMT(checkinDate);
            const formattedCheckout = formatDateForMMT(checkoutDate);
            
            // Construct room qualifier (e.g., 1Rooms-2Guests) - This is a guess at MMT's format
            const roomStayQualifier = `${rooms}Rooms-${guests}Guests`; 
            
            // Build MakeMyTrip URL
            const mmtHotelUrl = new URL('https://www.makemytrip.com/hotels/hotel-listing/');
            mmtHotelUrl.searchParams.set('city', destination);
            mmtHotelUrl.searchParams.set('checkin', formattedCheckin);
            mmtHotelUrl.searchParams.set('checkout', formattedCheckout);
            mmtHotelUrl.searchParams.set('roomStayQualifier', roomStayQualifier);
            // Note: MMT might require more specific parameters or different encoding

            console.log("Redirecting to MMT Hotels:", mmtHotelUrl.toString());
            window.open(mmtHotelUrl.toString(), '_blank'); 
        });
    }
    
    if (flightSearchForm) {
        flightSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // alert('Flight search would be implemented here. This would search for flights based on the criteria you entered.');
            
            // Gather data from form
            const tripTypeElement = document.querySelector('input[name="tripType"]:checked');
            const tripType = tripTypeElement ? tripTypeElement.value : 'oneway'; // 'oneway' or 'roundtrip'
            const fromCity = document.getElementById('fromCity')?.value || '';
            const toCity = document.getElementById('toCity')?.value || '';
            const departDate = document.getElementById('departDate')?.value || '';
            const returnDateValue = document.getElementById('returnDate')?.value || '';
            const travelers = document.getElementById('travelers')?.value || '1'; // Simplification: Assuming adults
            
            // Format dates for MMT (DD/MM/YYYY)
            const formattedDepartDate = formatDateForMMT(departDate);
            const formattedReturnDate = (tripType === 'roundtrip') ? formatDateForMMT(returnDateValue) : '';
            
            // Map trip type to MMT code (O=OneWay, R=RoundTrip)
            const mmtTripType = (tripType === 'roundtrip') ? 'R' : 'O';
            
            // Construct itinerary (e.g., Delhi-Mumbai) - Needs URL encoding
            const itinerary = `${fromCity}-${toCity}`;

            // Build MakeMyTrip Flight Search URL
            const mmtFlightUrl = new URL('https://www.makemytrip.com/flight/search');
            mmtFlightUrl.searchParams.set('itinerary', itinerary);
            mmtFlightUrl.searchParams.set('tripType', mmtTripType);
            mmtFlightUrl.searchParams.set('departureDate', formattedDepartDate);
            if (mmtTripType === 'R' && formattedReturnDate) {
                mmtFlightUrl.searchParams.set('returnDate', formattedReturnDate);
            }
            mmtFlightUrl.searchParams.set('adults', travelers); // Assuming dropdown is adults
            mmtFlightUrl.searchParams.set('children', '0'); // Defaulting child/infant counts
            mmtFlightUrl.searchParams.set('infants', '0');
            mmtFlightUrl.searchParams.set('cabinClass', 'E'); // Defaulting to Economy
            // MMT requires specific city codes (e.g., DEL, BOM) for best results, using full names might limit functionality.

            console.log("Redirecting to MMT Flights:", mmtFlightUrl.toString());
            window.open(mmtFlightUrl.toString(), '_blank');
        });
    }
    
    if (activitySearchForm) {
        activitySearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Activity search would be implemented here. This would search for activities based on the criteria you entered.');
        });
    }
    
    if (packageSearchForm) {
        packageSearchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Package search would be implemented here. This would search for travel packages based on the criteria you entered.');
        });
    }
    
    // Hotel detail modal functionality
    if (featuredHotels) {
        const viewDetailsBtns = featuredHotels.querySelectorAll('.btn-outline-primary');
        
        viewDetailsBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                // Get hotel information from the card
                const card = this.closest('.card');
                const hotelName = card.querySelector('.card-title').textContent;
                const hotelLocation = card.querySelector('.text-muted').textContent;
                const hotelDescription = card.querySelector('.card-text').textContent;
                const hotelPrice = card.querySelector('.text-primary').textContent;
                
                // Set modal content
                if (hotelDetailModal) {
                    const modalTitle = hotelDetailModal.querySelector('.modal-title');
                    const hotelDesc = hotelDetailModal.querySelector('#hotelDescription');
                    const roomPrice = hotelDetailModal.querySelector('#roomPrice');
                    
                    if (modalTitle) modalTitle.textContent = hotelName;
                    if (hotelDesc) hotelDesc.textContent = hotelDescription;
                    if (roomPrice) roomPrice.textContent = hotelPrice;
                    
                    // Show the modal
                    const modal = new bootstrap.Modal(hotelDetailModal);
                    modal.show();
                }
            });
        });
    }
    
    // Initialize the page
    checkLoginStatus();
}); 