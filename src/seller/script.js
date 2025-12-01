// ========================================
// SELLER PORTAL - JAVASCRIPT FUNCTIONALITY
// ========================================

// ========================================
// Mock Data
// ========================================

const mockSellerData = {
    sellerInfo: {
        id: 'P-1001',
        name: 'Ali Ahmadi',
        panel: 'partner',
        phone: '+98 912 345 6789',
        email: 'ali.ahmadi@email.com'
    },
    
    todayEarnings: {
        total: 3000000,
        confirmed: 2500000,
        pending: 500000,
        totalSales: 12,
        qualifyingSales: 4
    },
    
    quickStats: {
        thisMonth: 15000000,
        allTime: 45000000,
        activeCampaigns: 3,
        nextPayment: 5000000
    },
    
    campaigns: [
        {
            id: 1,
            name: 'Summer Insurance Special 2025',
            status: 'active',
            isNew: true,
            endDate: '2025-03-31',
            daysLeft: 25,
            topReward: 2000000,
            companies: ['Asia', 'Saman', 'Razi'],
            campaignType: 'Day_All_Razi||saman||Iran_ThirdParty|Body|Fire_4%cash_2%bnpl', // Example Campaign Type
            mySales: 5,
            myEarnings: 8500000,
            progress: 60
        },
        {
            id: 2,
            name: 'Health Insurance Bonus',
            status: 'active',
            isNew: false,
            endDate: '2025-02-28',
            daysLeft: 12,
            topReward: 1500000,
            companies: ['Razi', 'Pasargad'],
            mySales: 2,
            myEarnings: 3000000,
            progress: 30
        },
        {
            id: 3,
            name: 'Third-party Quick Sale',
            status: 'active',
            isNew: false,
            endDate: '2025-01-15',
            daysLeft: 3,
            topReward: 1000000,
            companies: ['Iran', 'Mellat'],
            mySales: 8,
            myEarnings: 6000000,
            progress: 75
        }
    ],
    
    recentActivity: [
        {
            type: 'reward',
            time: '2 hours ago',
            company: 'Asia',
            category: 'Third-party 12-month',
            amount: 1000000,
            status: 'success'
        },
        {
            type: 'reward',
            time: '4 hours ago',
            company: 'Saman',
            category: 'Third-party 6-month',
            amount: 1500000,
            status: 'success'
        },
        {
            type: 'sale',
            time: '6 hours ago',
            company: 'Razi',
            category: 'Body Insurance',
            amount: 0,
            status: 'pending'
        },
        {
            type: 'no-reward',
            time: '7 hours ago',
            company: 'Asia',
            reason: 'Already earned today (first purchase only)',
            status: 'info'
        }
    ],
    
    notifications: [
        {
            id: 1,
            type: 'new-campaign',
            title: 'New Campaign Available!',
            message: 'Winter Special 2025 - Earn up to 2,000,000 Tomans per sale!',
            time: '2 hours ago',
            isRead: false
        },
        {
            id: 2,
            type: 'reward-earned',
            title: 'Reward Earned!',
            message: 'You earned 2,000,000 Tomans from your Asia third-party 12-month sale!',
            time: '4 hours ago',
            isRead: false
        },
        {
            id: 3,
            type: 'payment-processed',
            title: 'Payment Processed',
            message: 'Payment of 10,000,000 Tomans has been sent to your account.',
            time: 'Yesterday',
            isRead: true
        }
    ]
};

// ========================================
// Data Management
// ========================================

function loadSellerData() {
    // Load seller info
    const sellerName = document.getElementById('sellerName');
    if (sellerName) {
        sellerName.textContent = mockSellerData.sellerInfo.name;
    }
    
    // Load today's earnings
    const todayEarnings = document.getElementById('todayEarnings');
    if (todayEarnings) {
        todayEarnings.textContent = formatCurrency(mockSellerData.todayEarnings.total);
    }
    
    // Load notification count
    updateNotificationBadge();
    
    console.log('Seller data loaded');
}

function updateNotificationBadge() {
    const unreadCount = mockSellerData.notifications.filter(n => !n.isRead).length;
    const badges = document.querySelectorAll('.notification-badge');
    badges.forEach(badge => {
        if (badge && unreadCount > 0) {
            badge.textContent = unreadCount;
            badge.style.display = 'block';
        } else if (badge) {
            badge.style.display = 'none';
        }
    });
}

// ========================================
// Filters
// ========================================

function setupFilters() {
    const companyFilter = document.getElementById('companyFilter');
    const categoryFilter = document.getElementById('categoryFilter');
    
    if (companyFilter) {
        companyFilter.addEventListener('change', applyFilters);
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', applyFilters);
    }
}

function applyFilters() {
    const companyFilter = document.getElementById('companyFilter')?.value || '';
    const categoryFilter = document.getElementById('categoryFilter')?.value || '';
    
    console.log('Applying filters:', { companyFilter, categoryFilter });
    
    // In real app, filter campaigns based on selections
    // For demo, just show a message
    showToast('Filters applied');
}

// ========================================
// Real-time Updates
// ========================================

let realtimeInterval;

function startRealtimeUpdates() {
    // Simulate real-time updates every 30 seconds
    realtimeInterval = setInterval(() => {
        console.log('Checking for new sales and rewards...');
        
        // In real app, fetch new data from API
        // For demo, randomly show notification
        if (Math.random() > 0.7) {
            simulateNewSale();
        }
    }, 30000);
}

function stopRealtimeUpdates() {
    if (realtimeInterval) {
        clearInterval(realtimeInterval);
    }
}

function simulateNewSale() {
    // Simulate a new sale notification
    const notification = {
        type: 'reward',
        message: 'You earned 1,500,000 Tomans!',
        amount: 1500000
    };
    
    showNotificationPopup(notification);
}

function showNotificationPopup(notification) {
    const popup = document.createElement('div');
    popup.className = 'notification-popup';
    popup.innerHTML = `
        <div class="popup-icon">${notification.type === 'reward' ? '💰' : 'ℹ️'}</div>
        <div class="popup-content">
            <div class="popup-title">${notification.type === 'reward' ? 'Reward Earned!' : 'New Sale'}</div>
            <div class="popup-message">${notification.message}</div>
        </div>
    `;
    
    popup.style.cssText = `
        position: fixed;
        top: 80px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 16px;
        border-radius: 12px;
        box-shadow: 0 10px 20px rgba(0,0,0,0.2);
        z-index: 9999;
        min-width: 300px;
        display: flex;
        gap: 12px;
        align-items: center;
        animation: slideDown 0.3s;
    `;
    
    document.body.appendChild(popup);
    
    // Show confetti for rewards
    if (notification.type === 'reward') {
        showConfetti();
    }
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        popup.style.animation = 'slideUp 0.3s';
        setTimeout(() => popup.remove(), 300);
    }, 5000);
}

function showConfetti() {
    // Simple confetti animation
    console.log('🎉 Confetti!');
    // In real app, use a confetti library
}

// ========================================
// Utility Functions
// ========================================

function formatCurrency(amount) {
    return amount.toLocaleString('en-US');
}

function formatNumber(num) {
    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'K';
    }
    return num.toString();
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    });
}

function calculateDaysLeft(endDate) {
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: #333;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        z-index: 9999;
        font-size: 14px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 2000);
}

// ========================================
// Campaign Functions
// ========================================

function loadCampaignDetail(campaignId) {
    const campaign = mockSellerData.campaigns.find(c => c.id === parseInt(campaignId));
    if (!campaign) {
        console.error('Campaign not found');
        return;
    }
    
    // Update page with campaign data
    console.log('Loading campaign:', campaign);
    
    // In real app, populate all campaign detail fields
}

// ========================================
// Export Functions
// ========================================

function exportToPDF() {
    console.log('Exporting to PDF...');
    showToast('PDF export will be available in production');
    
    // In real app, generate PDF using library like jsPDF
}

function exportToExcel() {
    console.log('Exporting to Excel...');
    showToast('Excel export will be available in production');
    
    // In real app, generate Excel using library like SheetJS
}

// ========================================
// Local Storage
// ========================================

function saveToLocalStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error saving to localStorage:', error);
    }
}

function loadFromLocalStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error loading from localStorage:', error);
        return null;
    }
}

// ========================================
// Earnings Calculator
// ========================================

const rewardRules = {
    'asia-thirdparty-12-cash': { amount: 2000000, type: 'first' },
    'asia-body-12-cash': { amount: 2000000, type: 'first' },
    'saman-thirdparty-6-touch': { amount: 1500000, type: 'all' },
    'saman-thirdparty-6-nontouch': { amount: 1500000, type: 'all' },
    'saman-thirdparty-12-touch': { amount: 1500000, type: 'all' },
    'saman-thirdparty-12-nontouch': { amount: 1500000, type: 'all' },
    'razi-body-12-cash': { amount: 1000000, type: 'first' }
};

function calculateReward(company, category, duration, payment) {
    const key = `${company}-${category}-${duration}-${payment}`;
    const rule = rewardRules[key];
    
    if (rule) {
        return {
            amount: rule.amount,
            type: rule.type,
            qualifies: true
        };
    }
    
    return {
        amount: 0,
        type: null,
        qualifies: false
    };
}

// ========================================
// Performance Tracking
// ========================================

function trackPageView(pageName) {
    console.log('Page view:', pageName);
    // In real app, send to analytics service
}

function trackEvent(eventName, properties) {
    console.log('Event:', eventName, properties);
    // In real app, send to analytics service
}

// ========================================
// Error Handling
// ========================================

window.addEventListener('error', function(event) {
    console.error('Global error:', event.error);
    // In real app, send to error tracking service
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('Unhandled promise rejection:', event.reason);
    // In real app, send to error tracking service
});

// ========================================
// Initialization
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('Seller Portal initialized');
    
    // Track page view
    const pageName = document.title;
    trackPageView(pageName);
    
    // Load any saved preferences
    const preferences = loadFromLocalStorage('sellerPreferences');
    if (preferences) {
        applyPreferences(preferences);
    }
});

function applyPreferences(preferences) {
    if (preferences.darkMode) {
        document.body.classList.add('dark-mode');
    }
    
    if (preferences.language) {
        // Apply language settings
        console.log('Language preference:', preferences.language);
    }
}

// ========================================
// Cleanup on page unload
// ========================================

window.addEventListener('beforeunload', function() {
    stopRealtimeUpdates();
});

// ========================================
// Export functions for use in HTML
// ========================================

window.sellerPortal = {
    loadSellerData,
    setupFilters,
    startRealtimeUpdates,
    formatCurrency,
    formatNumber,
    showToast,
    exportToPDF,
    exportToExcel,
    calculateReward
};

