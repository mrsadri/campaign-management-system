// ========================================
// Data Management
// ========================================

// Mock data for campaigns
let campaigns = [
    {
        id: 1,
        name: "Summer Insurance Festival 2025",
        status: "active",
        panel: "partner",
        startDate: "2025-01-01",
        endDate: "2025-03-31",
        calculationInterval: "weekly",
        companies: [
            {
                name: "Asia",
                categories: ["thirdparty", "body"],
                durations: ["12"],
                purchaseTypes: ["cash"],
                reward: 1000000,
                calculationType: "first"
            },
            {
                name: "Saman",
                categories: ["thirdparty"],
                durations: ["6", "12"],
                purchaseTypes: ["touch-installment", "non-touch-installment"],
                reward: 1000000,
                calculationType: "all"
            }
        ],
        participants: 45,
        stats: {
            totalSales: 128,
            rewardsPaid: 45000000,
            activePartners: 42
        }
    },
    {
        id: 2,
        name: "Health Insurance Campaign",
        status: "draft",
        panel: "snap",
        startDate: "2025-02-01",
        endDate: "2025-04-30",
        calculationInterval: "daily",
        companies: [
            {
                name: "Razi",
                categories: ["health"],
                durations: ["12"],
                purchaseTypes: ["cash"],
                reward: 500000,
                calculationType: "first"
            }
        ],
        participants: 0,
        stats: {
            totalSales: 0,
            rewardsPaid: 0,
            activePartners: 0
        }
    },
    {
        id: 3,
        name: "Third-party Special Offer",
        status: "completed",
        panel: "pishkhan",
        startDate: "2024-10-01",
        endDate: "2024-12-31",
        calculationInterval: "weekly",
        companies: [
            {
                name: "Iran",
                categories: ["thirdparty"],
                durations: ["6", "12"],
                purchaseTypes: ["cash", "touch-installment"],
                reward: 750000,
                calculationType: "all"
            }
        ],
        participants: 30,
        stats: {
            totalSales: 256,
            rewardsPaid: 192000000,
            activePartners: 28
        }
    }
];

// Save campaigns to localStorage
function saveCampaigns() {
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
}

// Load campaigns from localStorage
function loadCampaignsFromStorage() {
    const stored = localStorage.getItem('campaigns');
    if (stored) {
        campaigns = JSON.parse(stored);
    }
}

// ========================================
// Campaign List Functions
// ========================================

function loadCampaigns(filter = 'all') {
    const campaignList = document.getElementById('campaignList');
    const emptyState = document.getElementById('emptyState');
    const template = document.getElementById('campaignCardTemplate');
    
    if (!campaignList || !template) return;
    
    campaignList.innerHTML = '';
    
    // Filter campaigns
    let filteredCampaigns = campaigns;
    if (filter !== 'all') {
        filteredCampaigns = campaigns.filter(c => c.status === filter);
    }
    
    if (filteredCampaigns.length === 0) {
        campaignList.classList.add('hidden');
        if (emptyState) {
            emptyState.classList.remove('hidden');
        }
        return;
    }
    
    campaignList.classList.remove('hidden');
    if (emptyState) {
        emptyState.classList.add('hidden');
    }
    
    // Render campaigns
    filteredCampaigns.forEach(campaign => {
        const card = template.content.cloneNode(true);
        
        // Set title
        card.querySelector('.campaign-title').textContent = campaign.name;
        
        // Set status badge
        const badge = card.querySelector('.campaign-badge');
        badge.textContent = campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1);
        // Add Tailwind classes based on status
        if (campaign.status === 'active') {
            badge.classList.add('bg-blue-100', 'text-blue-600');
        } else if (campaign.status === 'draft') {
            badge.classList.add('bg-yellow-100', 'text-yellow-600');
        } else if (campaign.status === 'completed') {
            badge.classList.add('bg-gray-100', 'text-gray-600');
        }
        
        // Set info values
        card.querySelector('.panel-value').textContent = campaign.panel.charAt(0).toUpperCase() + campaign.panel.slice(1);
        card.querySelector('.duration-value').textContent = `${campaign.startDate} to ${campaign.endDate}`;
        card.querySelector('.interval-value').textContent = formatInterval(campaign.calculationInterval);
        card.querySelector('.companies-value').textContent = campaign.companies.length;
        card.querySelector('.participants-value').textContent = campaign.participants;
        
        // Set stats
        const stats = card.querySelectorAll('.stat-value');
        stats[0].textContent = campaign.stats.totalSales;
        stats[1].textContent = formatCurrency(campaign.stats.rewardsPaid);
        stats[2].textContent = campaign.stats.activePartners;
        
        // Add event listeners to action buttons
        const editBtn = card.querySelector('.campaign-actions button:nth-child(1)');
        const duplicateBtn = card.querySelector('.campaign-actions button:nth-child(2)');
        const viewBtn = card.querySelector('.campaign-actions button:nth-child(3)');
        
        editBtn.addEventListener('click', () => editCampaign(campaign.id));
        duplicateBtn.addEventListener('click', () => duplicateCampaign(campaign.id));
        viewBtn.addEventListener('click', () => viewCampaign(campaign.id));
        
        campaignList.appendChild(card);
    });
}

// ========================================
// Filter & Tab Functions
// ========================================

function setupFilters() {
    const searchInput = document.getElementById('search');
    const panelSelect = document.getElementById('panel');
    const dateRangeSelect = document.getElementById('dateRange');
    
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    
    if (panelSelect) {
        panelSelect.addEventListener('change', applyFilters);
    }
    
    if (dateRangeSelect) {
        dateRangeSelect.addEventListener('change', applyFilters);
    }
}

function setupTabs() {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active styling from all tabs (Tailwind classes)
            tabs.forEach(t => {
                t.classList.remove('bg-primary', 'text-white');
                t.classList.add('text-gray-600');
            });
            // Add active styling to clicked tab (Tailwind classes)
            tab.classList.remove('text-gray-600');
            tab.classList.add('bg-primary', 'text-white');
            // Load filtered campaigns
            loadCampaigns(tab.dataset.tab);
        });
    });
}

function applyFilters() {
    const searchTerm = document.getElementById('search')?.value.toLowerCase() || '';
    const panelFilter = document.getElementById('panel')?.value || '';
    const dateRangeFilter = document.getElementById('dateRange')?.value || '';
    
    let filtered = campaigns;
    
    // Apply search filter
    if (searchTerm) {
        filtered = filtered.filter(c => 
            c.name.toLowerCase().includes(searchTerm)
        );
    }
    
    // Apply panel filter
    if (panelFilter) {
        filtered = filtered.filter(c => c.panel === panelFilter);
    }
    
    // Apply date range filter
    if (dateRangeFilter) {
        const today = new Date();
        filtered = filtered.filter(c => {
            const startDate = new Date(c.startDate);
            switch(dateRangeFilter) {
                case 'today':
                    return startDate.toDateString() === today.toDateString();
                case 'week':
                    const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
                    return startDate >= weekAgo;
                case 'month':
                    return startDate.getMonth() === today.getMonth() && 
                           startDate.getFullYear() === today.getFullYear();
                default:
                    return true;
            }
        });
    }
    
    // Re-render with filtered data
    const campaignList = document.getElementById('campaignList');
    const emptyState = document.getElementById('emptyState');
    
    if (!campaignList) return;
    
    campaignList.innerHTML = '';
    
    if (filtered.length === 0) {
        campaignList.classList.add('hidden');
        if (emptyState) {
            emptyState.classList.remove('hidden');
        }
        return;
    }
    
    campaignList.classList.remove('hidden');
    if (emptyState) {
        emptyState.classList.add('hidden');
    }
    
    // Use the same rendering logic as loadCampaigns
    const template = document.getElementById('campaignCardTemplate');
    filtered.forEach(campaign => {
        const card = template.content.cloneNode(true);
        
        card.querySelector('.campaign-title').textContent = campaign.name;
        
        const badge = card.querySelector('.campaign-badge');
        badge.textContent = campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1);
        // Add Tailwind classes based on status
        if (campaign.status === 'active') {
            badge.classList.add('bg-blue-100', 'text-blue-600');
        } else if (campaign.status === 'draft') {
            badge.classList.add('bg-yellow-100', 'text-yellow-600');
        } else if (campaign.status === 'completed') {
            badge.classList.add('bg-gray-100', 'text-gray-600');
        }
        
        card.querySelector('.panel-value').textContent = campaign.panel.charAt(0).toUpperCase() + campaign.panel.slice(1);
        card.querySelector('.duration-value').textContent = `${campaign.startDate} to ${campaign.endDate}`;
        card.querySelector('.interval-value').textContent = formatInterval(campaign.calculationInterval);
        card.querySelector('.companies-value').textContent = campaign.companies.length;
        card.querySelector('.participants-value').textContent = campaign.participants;
        
        const stats = card.querySelectorAll('.stat-value');
        stats[0].textContent = campaign.stats.totalSales;
        stats[1].textContent = formatCurrency(campaign.stats.rewardsPaid);
        stats[2].textContent = campaign.stats.activePartners;
        
        const editBtn = card.querySelector('.campaign-actions button:nth-child(1)');
        const duplicateBtn = card.querySelector('.campaign-actions button:nth-child(2)');
        const viewBtn = card.querySelector('.campaign-actions button:nth-child(3)');
        
        editBtn.addEventListener('click', () => editCampaign(campaign.id));
        duplicateBtn.addEventListener('click', () => duplicateCampaign(campaign.id));
        viewBtn.addEventListener('click', () => viewCampaign(campaign.id));
        
        campaignList.appendChild(card);
    });
}

// ========================================
// Campaign Actions
// ========================================

function editCampaign(id) {
    console.log('Editing campaign:', id);
    // Store campaign ID in localStorage and redirect to edit page
    localStorage.setItem('editCampaignId', id);
    window.location.href = 'create-campaign.html?edit=' + id;
}

function duplicateCampaign(id) {
    const campaign = campaigns.find(c => c.id === id);
    if (!campaign) return;
    
    const newCampaign = {
        ...campaign,
        id: Date.now(),
        name: campaign.name + ' (Copy)',
        status: 'draft',
        stats: {
            totalSales: 0,
            rewardsPaid: 0,
            activePartners: 0
        }
    };
    
    campaigns.push(newCampaign);
    saveCampaigns();
    loadCampaigns();
    
    alert('Campaign duplicated successfully!');
}

function viewCampaign(id) {
    console.log('Viewing campaign:', id);
    alert('Campaign details view would open here. Campaign ID: ' + id);
}

// ========================================
// Utility Functions
// ========================================

function formatInterval(interval) {
    const intervals = {
        'daily': 'Daily',
        '3days': 'Every 3 Days',
        '4days': 'Every 4 Days',
        '5days': 'Every 5 Days',
        'weekly': 'Weekly'
    };
    return intervals[interval] || interval;
}

function formatCurrency(amount) {
    if (amount >= 1000000) {
        return (amount / 1000000).toFixed(1) + 'M';
    } else if (amount >= 1000) {
        return (amount / 1000).toFixed(0) + 'K';
    }
    return amount.toString();
}

// ========================================
// Initialize
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    loadCampaignsFromStorage();
    // Ensure campaigns are loaded on page load
    if (typeof loadCampaigns === 'function') {
        loadCampaigns('all');
    }
});

