// Admin Dashboard Script
document.addEventListener('DOMContentLoaded', function() {
    // Check if admin is logged in
    if (!sessionStorage.getItem('adminLoggedIn')) {
        window.location.href = 'admin.html';
        return;
    }

    // DOM Elements
    const logoutBtn = document.getElementById('logoutBtn');
    const currentTime = document.getElementById('currentTime');
    const navLinks = document.querySelectorAll('.nav-link');
    const adminSections = document.querySelectorAll('.admin-section');

    // Orders Elements
    const ordersList = document.getElementById('ordersList');
    const orderStatusFilter = document.getElementById('orderStatusFilter');
    const customerSearch = document.getElementById('customerSearch');
    const refreshOrdersBtn = document.getElementById('refreshOrdersBtn');

    // STK Push Elements
    const stkPushForm = document.getElementById('stkPushForm');
    const customerPhone = document.getElementById('customerPhone');
    const paymentAmount = document.getElementById('paymentAmount');
    const paymentDescription = document.getElementById('paymentDescription');
    const sendStkBtn = document.getElementById('sendStkBtn');
    const stkErrorMessage = document.getElementById('stkErrorMessage');
    const stkSuccessMessage = document.getElementById('stkSuccessMessage');
    const stkHistory = document.getElementById('stkHistory');

    // Quick STK Push Elements
    const quickStkInfo = document.getElementById('quickStkInfo');
    const selectedOrderDetails = document.getElementById('selectedOrderDetails');
    const quickStkAmount = document.getElementById('quickStkAmount');
    const quickStkBtn = document.getElementById('quickStkBtn');

    // Initialize dashboard
    initializeDashboard();
    updateCurrentTime();
    loadOrders();

    // Event Listeners
    logoutBtn.addEventListener('click', handleLogout);
    navLinks.forEach(link => link.addEventListener('click', handleNavClick));
    stkPushForm.addEventListener('submit', handleStkPush);
    quickStkBtn.addEventListener('click', handleQuickStkPush);

    // Orders event listeners
    orderStatusFilter.addEventListener('change', filterOrders);
    customerSearch.addEventListener('input', filterOrders);
    refreshOrdersBtn.addEventListener('click', loadOrders);

    // Update time every minute
    setInterval(updateCurrentTime, 60000);

    function initializeDashboard() {
        // Load any saved data from localStorage
        loadStkHistory();
        loadTransactions();
    }

    function updateCurrentTime() {
        const now = new Date();
        currentTime.textContent = now.toLocaleString();
    }

    function handleLogout() {
        if (confirm('Are you sure you want to logout?')) {
            sessionStorage.removeItem('adminLoggedIn');
            sessionStorage.removeItem('adminLoginTime');
            window.location.href = 'admin.html';
        }
    }

    function handleNavClick(event) {
        event.preventDefault();
        const sectionId = event.target.dataset.section;

        // Update active nav link
        navLinks.forEach(link => link.classList.remove('active'));
        event.target.classList.add('active');

        // Show active section
        adminSections.forEach(section => section.classList.remove('active'));
        document.getElementById(sectionId).classList.add('active');
    }

    function showStkError(message) {
        stkErrorMessage.textContent = message;
        stkErrorMessage.style.display = 'block';
        stkSuccessMessage.style.display = 'none';
        sendStkBtn.disabled = false;
        sendStkBtn.innerHTML = '<span>Send STK Push</span>';
    }

    function showStkSuccess(message) {
        stkSuccessMessage.textContent = message;
        stkSuccessMessage.style.display = 'block';
        stkErrorMessage.style.display = 'none';
        sendStkBtn.disabled = false;
        sendStkBtn.innerHTML = '<span>Send STK Push</span>';
    }

    function hideStkMessages() {
        stkErrorMessage.style.display = 'none';
        stkSuccessMessage.style.display = 'none';
    }

    function validatePhoneNumber(phone) {
        const digits = phone.replace(/\D/g, '');
        return /^(?:254|0)7\d{8}$/.test(digits);
    }

    function formatPhoneNumber(phone) {
        const digits = phone.replace(/\D/g, '');
        if (digits.startsWith('254')) return '+' + digits;
        if (digits.startsWith('0')) return '+254' + digits.slice(1);
        return '+' + digits;
    }

    function handleStkPush(event) {
        event.preventDefault();

        const phone = customerPhone.value.trim();
        const amount = parseFloat(paymentAmount.value);
        const description = paymentDescription.value.trim();

        hideStkMessages();

        // Validation
        if (!validatePhoneNumber(phone)) {
            showStkError('Please enter a valid Kenyan phone number');
            return;
        }

        if (isNaN(amount) || amount < 100) {
            showStkError('Please enter an amount of at least KSH 100');
            return;
        }

        // Show loading state
        sendStkBtn.disabled = true;
        sendStkBtn.innerHTML = '<span>Sending...</span>';

        // Simulate STK Push API call
        setTimeout(() => {
            const formattedPhone = formatPhoneNumber(phone);
            const transactionId = 'TXN' + Date.now();

            // Create transaction record
            const transaction = {
                id: transactionId,
                phone: formattedPhone,
                amount: amount,
                description: description || 'STK Push Payment',
                timestamp: new Date().toISOString(),
                status: 'sent'
            };

            // Save to localStorage (in real app, this would be server-side)
            saveStkTransaction(transaction);

            // Update UI
            showStkSuccess(`STK Push sent successfully to ${formattedPhone} for KSH ${amount.toLocaleString()}`);
            loadStkHistory();

            // Clear form
            stkPushForm.reset();
        }, 2000);
    }

    function saveStkTransaction(transaction) {
        const transactions = JSON.parse(localStorage.getItem('stkTransactions') || '[]');
        transactions.unshift(transaction);
        // Keep only last 50 transactions
        if (transactions.length > 50) transactions.splice(50);
        localStorage.setItem('stkTransactions', JSON.stringify(transactions));
    }

    function loadStkHistory() {
        const transactions = JSON.parse(localStorage.getItem('stkTransactions') || '[]');

        if (transactions.length === 0) {
            stkHistory.innerHTML = '<div class="empty-state"><p>No STK Push requests sent yet</p></div>';
            return;
        }

        const historyHtml = transactions.slice(0, 10).map(transaction => `
            <div class="activity-item">
                <div class="activity-icon">📱</div>
                <div class="activity-content">
                    <div class="activity-title">STK Push to ${transaction.phone}</div>
                    <div class="activity-details">
                        KSH ${transaction.amount.toLocaleString()} • ${new Date(transaction.timestamp).toLocaleString()}
                    </div>
                    ${transaction.description ? `<div class="activity-description">${transaction.description}</div>` : ''}
                </div>
                <div class="activity-status status-${transaction.status}">${transaction.status}</div>
            </div>
        `).join('');

        stkHistory.innerHTML = historyHtml;
    }

    function loadTransactions() {
        // This would load from a real API in production
        const transactionsList = document.getElementById('transactionsList');
        transactionsList.innerHTML = '<div class="empty-state"><p>No transactions found</p></div>';
    }

    // Auto-hide messages after 5 seconds
    setInterval(() => {
        if (stkSuccessMessage.style.display === 'block') {
            stkSuccessMessage.style.display = 'none';
        }
    }, 5000);
});

function loadOrders() {
    // Simulate loading orders from a database
    // In a real app, this would be an API call
    const mockOrders = [
        {
            id: 'ORD001',
            customerName: 'John Doe',
            customerPhone: '+254712345678',
            items: [
                { name: 'Designer Dress', price: 2500, quantity: 1 },
                { name: 'High Heels', price: 1800, quantity: 1 }
            ],
            total: 4300,
            status: 'pending',
            date: '2024-01-15T10:30:00Z'
        },
        {
            id: 'ORD002',
            customerName: 'Jane Smith',
            customerPhone: '+254723456789',
            items: [
                { name: 'Leather Handbag', price: 3200, quantity: 1 },
                { name: 'Sunglasses', price: 1200, quantity: 1 }
            ],
            total: 4400,
            status: 'paid',
            date: '2024-01-14T14:20:00Z'
        },
        {
            id: 'ORD003',
            customerName: 'Alice Johnson',
            customerPhone: '+254734567890',
            items: [
                { name: 'Winter Coat', price: 4500, quantity: 1 }
            ],
            total: 4500,
            status: 'pending',
            date: '2024-01-15T09:15:00Z'
        }
    ];

    // Store orders in localStorage for demo purposes
    localStorage.setItem('customerOrders', JSON.stringify(mockOrders));
    displayOrders(mockOrders);
}

function displayOrders(orders) {
    if (orders.length === 0) {
        ordersList.innerHTML = '<div class="empty-state"><p>No orders found</p></div>';
        return;
    }

    const ordersHtml = orders.map(order => `
        <div class="order-card" data-order-id="${order.id}">
            <div class="order-header">
                <div class="order-info">
                    <h4>Order #${order.id}</h4>
                    <p class="customer-name">${order.customerName}</p>
                    <p class="customer-phone">${order.customerPhone}</p>
                    <p class="order-date">${new Date(order.date).toLocaleString()}</p>
                </div>
                <div class="order-status status-${order.status}">
                    ${order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </div>
            </div>
            <div class="order-items">
                ${order.items.map(item => `
                    <div class="order-item">
                        <span>${item.name} (x${item.quantity})</span>
                        <span>KSH ${item.price.toLocaleString()}</span>
                    </div>
                `).join('')}
            </div>
            <div class="order-total">
                <strong>Total: KSH ${order.total.toLocaleString()}</strong>
            </div>
            <div class="order-actions">
                ${order.status === 'pending' ?
                    `<button class="select-order-btn primary-button" data-order='${JSON.stringify(order)}'>
                        Select for STK Push
                    </button>` : ''
                }
            </div>
        </div>
    `).join('');

    ordersList.innerHTML = ordersHtml;

    // Add event listeners to select order buttons
    document.querySelectorAll('.select-order-btn').forEach(btn => {
        btn.addEventListener('click', handleOrderSelection);
    });
}

function filterOrders() {
    const statusFilter = orderStatusFilter.value;
    const searchTerm = customerSearch.value.toLowerCase();

    const allOrders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
    let filteredOrders = allOrders;

    if (statusFilter !== 'all') {
        filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
    }

    if (searchTerm) {
        filteredOrders = filteredOrders.filter(order =>
            order.customerName.toLowerCase().includes(searchTerm) ||
            order.customerPhone.includes(searchTerm)
        );
    }

    displayOrders(filteredOrders);
}

function handleOrderSelection(event) {
    const orderData = JSON.parse(event.target.dataset.order);

    // Update quick STK push section
    selectedOrderDetails.innerHTML = `
        <strong>Customer:</strong> ${orderData.customerName}<br>
        <strong>Phone:</strong> ${orderData.customerPhone}<br>
        <strong>Items:</strong> ${orderData.items.length} item(s)<br>
        <strong>Total:</strong> KSH ${orderData.total.toLocaleString()}
    `;

    quickStkAmount.textContent = orderData.total.toLocaleString();

    // Store selected order for quick STK push
    quickStkBtn.dataset.order = JSON.stringify(orderData);

    // Show quick STK section and scroll to it
    quickStkInfo.style.display = 'block';
    document.getElementById('stk-push').scrollIntoView({ behavior: 'smooth' });

    // Switch to STK Push tab
    document.querySelector('[data-section="stk-push"]').click();
}

function handleQuickStkPush() {
    const orderData = JSON.parse(quickStkBtn.dataset.order);

    // Fill the STK push form
    customerPhone.value = orderData.customerPhone;
    paymentAmount.value = orderData.total;
    paymentDescription.value = `Payment for Order #${orderData.id}`;

    // Submit the form
    stkPushForm.dispatchEvent(new Event('submit'));
}