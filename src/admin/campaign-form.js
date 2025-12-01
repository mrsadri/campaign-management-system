// ========================================
// Campaign Form Management
// ========================================

let currentStep = 1;
let formData = {
    basicInfo: {},
    companies: [],
    participants: []
};

// Mock partner data
const mockPartners = [
    { id: 1001, name: "Ali Ahmadi", number: "P-1001" },
    { id: 1002, name: "Sara Rezaei", number: "P-1002" },
    { id: 1003, name: "Mohammad Karimi", number: "P-1003" },
    { id: 1004, name: "Zahra Moradi", number: "P-1004" },
    { id: 1005, name: "Hassan Safari", number: "P-1005" },
    { id: 1006, name: "Fateme Jafari", number: "P-1006" },
    { id: 1007, name: "Reza Hosseini", number: "P-1007" },
    { id: 1008, name: "Maryam Nazari", number: "P-1008" },
    { id: 1009, name: "Mehdi Rahmani", number: "P-1009" },
    { id: 1010, name: "Nasrin Bagheri", number: "P-1010" }
];

// ========================================
// Step Navigation
// ========================================

function nextStep(step) {
    // Validate current step before proceeding
    if (!validateStep(currentStep)) {
        return false;
    }
    
    // Save current step data
    saveStepData(currentStep);
    
    // Hide current step (using Tailwind classes)
    const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (currentStepEl) {
        currentStepEl.classList.remove('block');
        currentStepEl.classList.add('hidden');
    }
    
    // Update progress step indicator
    const currentProgressStep = document.querySelector(`.step[data-step="${currentStep}"]`);
    if (currentProgressStep) {
        const stepNumber = currentProgressStep.querySelector('.step-number');
        if (stepNumber) {
            stepNumber.classList.remove('bg-primary', 'text-white');
            stepNumber.classList.add('bg-green-500', 'text-white');
        }
        const stepLabel = currentProgressStep.querySelector('.step-label');
        if (stepLabel) {
            stepLabel.classList.remove('text-primary', 'font-semibold');
            stepLabel.classList.add('text-gray-600');
        }
    }
    
    // Show next step
    currentStep = step;
    const nextStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    if (nextStepEl) {
        nextStepEl.classList.remove('hidden');
        nextStepEl.classList.add('block');
    }
    
    // Update progress step indicator for next step
    const nextProgressStep = document.querySelector(`.step[data-step="${step}"]`);
    if (nextProgressStep) {
        const stepNumber = nextProgressStep.querySelector('.step-number');
        if (stepNumber) {
            stepNumber.classList.remove('bg-gray-200', 'text-gray-600', 'bg-green-500');
            stepNumber.classList.add('bg-primary', 'text-white');
        }
        const stepLabel = nextProgressStep.querySelector('.step-label');
        if (stepLabel) {
            stepLabel.classList.remove('text-gray-600');
            stepLabel.classList.add('text-primary', 'font-semibold');
        }
    }
    
    // If moving to review step, populate review
    if (step === 4) {
        populateReview();
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    return true;
}

function prevStep(step) {
    // Hide current step (using Tailwind classes)
    const currentStepEl = document.querySelector(`.form-step[data-step="${currentStep}"]`);
    if (currentStepEl) {
        currentStepEl.classList.remove('block');
        currentStepEl.classList.add('hidden');
    }
    
    // Update progress step indicator
    const currentProgressStep = document.querySelector(`.step[data-step="${currentStep}"]`);
    if (currentProgressStep) {
        currentProgressStep.classList.remove('active');
        const stepNumber = currentProgressStep.querySelector('.step-number');
        if (stepNumber) {
            stepNumber.classList.remove('bg-primary', 'text-white');
            stepNumber.classList.add('bg-gray-200', 'text-gray-600');
        }
        const stepLabel = currentProgressStep.querySelector('.step-label');
        if (stepLabel) {
            stepLabel.classList.remove('text-primary');
            stepLabel.classList.add('text-gray-600');
        }
    }
    
    // Show previous step
    currentStep = step;
    const prevStepEl = document.querySelector(`.form-step[data-step="${step}"]`);
    if (prevStepEl) {
        prevStepEl.classList.remove('hidden');
        prevStepEl.classList.add('block');
    }
    
    // Update progress step indicator for previous step
    const prevProgressStep = document.querySelector(`.step[data-step="${step}"]`);
    if (prevProgressStep) {
        prevProgressStep.classList.add('active');
        const stepNumber = prevProgressStep.querySelector('.step-number');
        if (stepNumber) {
            stepNumber.classList.remove('bg-gray-200', 'text-gray-600');
            stepNumber.classList.add('bg-primary', 'text-white');
        }
        const stepLabel = prevProgressStep.querySelector('.step-label');
        if (stepLabel) {
            stepLabel.classList.remove('text-gray-600');
            stepLabel.classList.add('text-primary');
        }
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ========================================
// Step Validation
// ========================================

function validateStep(step) {
    switch(step) {
        case 1:
            return validateBasicInfo();
        case 2:
            return validateConditions();
        case 3:
            return validateParticipants();
        default:
            return true;
    }
}

function validateBasicInfo() {
    const name = document.getElementById('campaignName')?.value?.trim();
    const startDate = document.getElementById('startDate')?.value;
    const endDate = document.getElementById('endDate')?.value;
    const panel = document.getElementById('panel')?.value;
    const interval = document.getElementById('calculationInterval')?.value;
    
    if (!name || !startDate || !endDate || !panel || !interval) {
        alert('Please fill in all required fields');
        return false;
    }
    
    if (new Date(endDate) <= new Date(startDate)) {
        alert('End date must be after start date');
        return false;
    }
    
    return true;
}

function validateConditions() {
    if (formData.companies.length === 0) {
        alert('Please add at least one insurance company');
        return false;
    }
    return true;
}

function validateParticipants() {
    if (formData.participants.length === 0) {
        alert('Please select at least one participant');
        return false;
    }
    return true;
}

// ========================================
// Save Step Data
// ========================================

function saveStepData(step) {
    if (step === 1) {
        formData.basicInfo = {
            name: document.getElementById('campaignName')?.value,
            startDate: document.getElementById('startDate')?.value,
            endDate: document.getElementById('endDate')?.value,
            panel: document.getElementById('panel')?.value,
            interval: document.getElementById('calculationInterval')?.value,
            displaySettings: document.getElementById('displaySettings')?.value
        };
    }
}

// ========================================
// Insurance Company Management
// ========================================

function openCompanyModal() {
    if (formData.companies.length >= 10) {
        alert('Maximum 10 insurance companies allowed');
        return;
    }
    
    // Reset modal
    document.getElementById('modalCompany').value = '';
    document.querySelectorAll('.modal-category').forEach(cb => cb.checked = false);
    document.querySelectorAll('.modal-duration').forEach(cb => cb.checked = false);
    document.querySelectorAll('.modal-purchase').forEach(cb => cb.checked = false);
    document.getElementById('modalReward').value = '';
    document.querySelector('input[name="calculationType"][value="first"]').checked = true;
    
    // Show modal (using Tailwind classes)
    const modal = document.getElementById('companyModal');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function closeCompanyModal() {
    const modal = document.getElementById('companyModal');
    if (modal) {
        modal.classList.remove('flex');
        modal.classList.add('hidden');
    }
}

function saveCompany() {
    // Get values
    const company = document.getElementById('modalCompany').value;
    const categories = Array.from(document.querySelectorAll('.modal-category:checked')).map(cb => cb.value);
    const durations = Array.from(document.querySelectorAll('.modal-duration:checked')).map(cb => cb.value);
    const purchaseTypes = Array.from(document.querySelectorAll('.modal-purchase:checked')).map(cb => cb.value);
    const reward = document.getElementById('modalReward').value;
    const calculationType = document.querySelector('input[name="calculationType"]:checked').value;
    
    // Validate
    if (!company) {
        alert('Please select an insurance company');
        return;
    }
    
    if (categories.length === 0) {
        alert('Please select at least one insurance category');
        return;
    }
    
    if (durations.length === 0) {
        alert('Please select at least one insurance duration');
        return;
    }
    
    if (purchaseTypes.length === 0) {
        alert('Please select at least one purchase type');
        return;
    }
    
    if (!reward || reward <= 0) {
        alert('Please enter a valid reward amount');
        return;
    }
    
    // Check if company already exists
    if (formData.companies.find(c => c.company === company)) {
        alert('This insurance company has already been added');
        return;
    }
    
    // Add company
    const companyData = {
        company,
        categories,
        durations,
        purchaseTypes,
        reward: parseInt(reward),
        calculationType
    };
    
    formData.companies.push(companyData);
    
    // Update UI
    renderCompanies();
    updateCompanyCount();
    
    // Close modal
    closeCompanyModal();
}

function renderCompanies() {
    const container = document.getElementById('companiesContainer');
    const emptyState = document.getElementById('emptyCompanies');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    if (formData.companies.length === 0) {
        container.classList.add('hidden');
        if (emptyState) {
            emptyState.classList.remove('hidden');
            emptyState.classList.add('block');
        }
        return;
    }
    
    container.classList.remove('hidden');
    if (emptyState) {
        emptyState.classList.add('hidden');
        emptyState.classList.remove('block');
    }
    
    formData.companies.forEach((company, index) => {
        const card = document.createElement('div');
        card.className = 'bg-gray-50 border border-gray-300 rounded-xl p-6 relative';
        card.innerHTML = `
            <div class="flex justify-between items-center mb-4">
                <div class="text-base font-semibold text-primary">${formatCompanyName(company.company)}</div>
                <button type="button" class="bg-red-500 text-white border-none px-3 py-1.5 rounded-lg text-xs cursor-pointer transition-all hover:bg-red-600" onclick="removeCompany(${index})">Remove</button>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div class="flex flex-col gap-1">
                    <div class="text-xs text-gray-500 font-medium">Insurance Category</div>
                    <div class="flex flex-wrap gap-1">
                        ${company.categories.map(c => `<span class="inline-block px-2.5 py-1 bg-primary-light text-white rounded-full text-xs font-medium">${formatCategory(c)}</span>`).join('')}
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="text-xs text-gray-500 font-medium">Insurance Duration</div>
                    <div class="flex flex-wrap gap-1">
                        ${company.durations.map(d => `<span class="inline-block px-2.5 py-1 bg-primary-light text-white rounded-full text-xs font-medium">${formatDuration(d)}</span>`).join('')}
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="text-xs text-gray-500 font-medium">Purchase Type</div>
                    <div class="flex flex-wrap gap-1">
                        ${company.purchaseTypes.map(p => `<span class="inline-block px-2.5 py-1 bg-primary-light text-white rounded-full text-xs font-medium">${formatPurchaseType(p)}</span>`).join('')}
                    </div>
                </div>
                <div class="flex flex-col gap-1">
                    <div class="text-xs text-gray-500 font-medium">Reward Amount</div>
                    <div class="text-sm text-gray-900">${formatReward(company.reward)} Tomans</div>
                </div>
                <div class="flex flex-col gap-1 col-span-2">
                    <div class="text-xs text-gray-500 font-medium">Calculation Type</div>
                    <div class="text-sm text-gray-900">${company.calculationType === 'first' ? 'First Purchase Only' : 'All Purchases'}</div>
                </div>
            </div>
        `;
        container.appendChild(card);
    });
}

function removeCompany(index) {
    if (confirm('Are you sure you want to remove this insurance company?')) {
        formData.companies.splice(index, 1);
        renderCompanies();
        updateCompanyCount();
    }
}

function updateCompanyCount() {
    const countElement = document.getElementById('companyCount');
    if (countElement) {
        countElement.textContent = formData.companies.length;
    }
}

// ========================================
// Participant Management
// ========================================

function initializeParticipants() {
    renderAvailablePartners();
    renderSelectedPartners();
    setupPartnerSearch();
}

function renderAvailablePartners() {
    const container = document.getElementById('availablePartners');
    if (!container) return;
    
    container.innerHTML = '';
    
    const available = mockPartners.filter(p => 
        !formData.participants.find(sp => sp.id === p.id)
    );
    
    available.forEach(partner => {
        const item = document.createElement('div');
        item.className = 'partner-item';
        item.innerHTML = `
            <input type="checkbox" id="avail-${partner.id}" value="${partner.id}">
            <label for="avail-${partner.id}">${partner.number} - ${partner.name}</label>
        `;
        container.appendChild(item);
    });
}

function renderSelectedPartners() {
    const container = document.getElementById('selectedPartners');
    const countElement = document.getElementById('selectedCount');
    
    if (!container) return;
    
    container.innerHTML = '';
    
    formData.participants.forEach(partner => {
        const item = document.createElement('div');
        item.className = 'partner-item';
        item.innerHTML = `
            <input type="checkbox" id="sel-${partner.id}" value="${partner.id}">
            <label for="sel-${partner.id}">${partner.number} - ${partner.name}</label>
        `;
        container.appendChild(item);
    });
    
    if (countElement) {
        countElement.textContent = formData.participants.length;
    }
}

function setupPartnerSearch() {
    const searchInput = document.getElementById('partnerSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const items = document.querySelectorAll('#availablePartners .partner-item');
        
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(searchTerm) ? 'flex' : 'none';
        });
    });
}

function addSelectedPartners() {
    const checkboxes = document.querySelectorAll('#availablePartners input[type="checkbox"]:checked');
    
    checkboxes.forEach(cb => {
        const partnerId = parseInt(cb.value);
        const partner = mockPartners.find(p => p.id === partnerId);
        if (partner && !formData.participants.find(p => p.id === partnerId)) {
            formData.participants.push(partner);
        }
    });
    
    renderAvailablePartners();
    renderSelectedPartners();
}

function removeSelectedPartners() {
    const checkboxes = document.querySelectorAll('#selectedPartners input[type="checkbox"]:checked');
    
    checkboxes.forEach(cb => {
        const partnerId = parseInt(cb.value);
        formData.participants = formData.participants.filter(p => p.id !== partnerId);
    });
    
    renderAvailablePartners();
    renderSelectedPartners();
}

// ========================================
// Review Section
// ========================================

function populateReview() {
    // Basic info
    document.getElementById('reviewName').textContent = formData.basicInfo.name || '-';
    document.getElementById('reviewPanel').textContent = formatPanel(formData.basicInfo.panel) || '-';
    document.getElementById('reviewStartDate').textContent = formData.basicInfo.startDate || '-';
    document.getElementById('reviewEndDate').textContent = formData.basicInfo.endDate || '-';
    document.getElementById('reviewInterval').textContent = formatInterval(formData.basicInfo.interval) || '-';
    
    // Companies table
    const companiesContainer = document.getElementById('reviewCompanies');
    if (companiesContainer) {
        if (formData.companies.length === 0) {
            companiesContainer.innerHTML = '<p>No insurance companies added</p>';
        } else {
            let tableHTML = `
                <table class="review-table">
                    <thead>
                        <tr>
                            <th>Company</th>
                            <th>Category</th>
                            <th>Duration</th>
                            <th>Purchase Type</th>
                            <th>Reward</th>
                            <th>Type</th>
                        </tr>
                    </thead>
                    <tbody>
            `;
            
            formData.companies.forEach(company => {
                tableHTML += `
                    <tr>
                        <td>${formatCompanyName(company.company)}</td>
                        <td>${company.categories.map(formatCategory).join(', ')}</td>
                        <td>${company.durations.map(formatDuration).join(', ')}</td>
                        <td>${company.purchaseTypes.map(formatPurchaseType).join(', ')}</td>
                        <td>${formatReward(company.reward)} Tomans</td>
                        <td>${company.calculationType === 'first' ? 'First' : 'All'}</td>
                    </tr>
                `;
            });
            
            tableHTML += `
                    </tbody>
                </table>
            `;
            
            companiesContainer.innerHTML = tableHTML;
        }
    }
    
    // Participants
    document.getElementById('reviewParticipants').textContent = formData.participants.length;
    
    // Generate and display Campaign Type string
    generateCampaignTypeString();
}

// ========================================
// Campaign Type Generation
// ========================================

function generateCampaignTypeString() {
    if (typeof CampaignTypeUtils === 'undefined') {
        console.error('CampaignTypeUtils not loaded');
        return;
    }
    
    // Generate Campaign Type string from form data
    const campaignTypeStr = CampaignTypeUtils.encodeCampaignType({
        companies: formData.companies,
        interval: formData.basicInfo.interval
    });
    
    // Store in formData for later use
    formData.campaignType = campaignTypeStr;
    
    // Display in review step
    const campaignTypeElement = document.getElementById('reviewCampaignType');
    if (campaignTypeElement) {
        if (campaignTypeStr) {
            campaignTypeElement.textContent = campaignTypeStr;
            // Validate the generated string
            const validation = CampaignTypeUtils.validateCampaignType(campaignTypeStr);
            if (!validation.valid) {
                campaignTypeElement.classList.add('text-red-600');
                campaignTypeElement.title = validation.error;
            } else {
                campaignTypeElement.classList.remove('text-red-600');
                campaignTypeElement.title = 'Valid Campaign Type string';
            }
        } else {
            campaignTypeElement.textContent = 'Unable to generate Campaign Type string';
            campaignTypeElement.classList.add('text-red-600');
        }
    }
}

// ========================================
// Form Submission
// ========================================

function saveDraft() {
    saveStepData(currentStep);
    
    // Generate Campaign Type if companies are added
    if (formData.companies.length > 0 && !formData.campaignType) {
        generateCampaignTypeString();
    }
    
    const campaign = {
        id: Date.now(),
        status: 'draft',
        ...formData.basicInfo,
        campaignType: formData.campaignType || '', // Store Campaign Type string
        companies: formData.companies,
        participants: formData.participants.length,
        stats: {
            totalSales: 0,
            rewardsPaid: 0,
            activePartners: 0
        }
    };
    
    // Get existing campaigns from localStorage
    const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    campaigns.push(campaign);
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
    
    alert('Campaign saved as draft!');
    window.location.href = 'dashboard.html';
}

function publishCampaign() {
    if (!validateStep(currentStep)) {
        return;
    }
    
    saveStepData(currentStep);
    
    // Ensure Campaign Type is generated
    if (!formData.campaignType) {
        generateCampaignTypeString();
    }
    
    const campaign = {
        id: Date.now(),
        status: 'active',
        name: formData.basicInfo.name,
        panel: formData.basicInfo.panel,
        startDate: formData.basicInfo.startDate,
        endDate: formData.basicInfo.endDate,
        calculationInterval: formData.basicInfo.interval,
        campaignType: formData.campaignType || '', // Store Campaign Type string
        companies: formData.companies,
        participants: formData.participants.length,
        stats: {
            totalSales: 0,
            rewardsPaid: 0,
            activePartners: formData.participants.length
        }
    };
    
    // Get existing campaigns from localStorage
    const campaigns = JSON.parse(localStorage.getItem('campaigns') || '[]');
    campaigns.push(campaign);
    localStorage.setItem('campaigns', JSON.stringify(campaigns));
    
    alert('Campaign published successfully!');
    window.location.href = 'dashboard.html';
}

// ========================================
// Formatting Utilities
// ========================================

function formatCompanyName(company) {
    const names = {
        'asia': 'Asia (آسیا)',
        'saman': 'Saman (سامان)',
        'razi': 'Razi (رازی)',
        'iran': 'Iran (ایران)',
        'parsian': 'Parsian (پارسیان)',
        'pasargad': 'Pasargad (پاسارگاد)',
        'alborz': 'Alborz (البرز)',
        'dana': 'Dana (دانا)',
        'mellat': 'Mellat (ملت)',
        'kosar': 'Kosar (کوثر)'
    };
    return names[company] || company;
}

function formatCategory(category) {
    const categories = {
        'thirdparty': 'Third-party',
        'body': 'Body',
        'health': 'Health',
        'fire': 'Fire',
        'life': 'Life'
    };
    return categories[category] || category;
}

function formatDuration(duration) {
    if (duration === 'any') return 'Any';
    return duration + ' months';
}

function formatPurchaseType(type) {
    const types = {
        'cash': 'Cash',
        'touch-installment': 'Touch Installment',
        'non-touch-installment': 'Non-touch Installment'
    };
    return types[type] || type;
}

function formatReward(amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatPanel(panel) {
    const panels = {
        'partner': 'Partner (شریک)',
        'snap': 'Snap',
        'pishkhan': 'Pishkhan (پیشخوان)'
    };
    return panels[panel] || panel;
}

function formatInterval(interval) {
    const intervals = {
        'daily': 'Daily (روزی یک بار)',
        '3days': 'Every 3 Days',
        '4days': 'Every 4 Days',
        '5days': 'Every 5 Days',
        'weekly': 'Weekly (هفته‌ای یک بار)'
    };
    return intervals[interval] || interval;
}

// ========================================
// Event Listeners
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Add company button
    const addCompanyBtn = document.getElementById('addCompany');
    if (addCompanyBtn) {
        addCompanyBtn.addEventListener('click', openCompanyModal);
    }
    
    // Save draft button
    const saveDraftBtn = document.getElementById('saveDraft');
    if (saveDraftBtn) {
        saveDraftBtn.addEventListener('click', saveDraft);
    }
    
    // Publish campaign buttons
    const publishBtn = document.getElementById('publishCampaign');
    const finalPublishBtn = document.getElementById('finalPublish');
    
    if (publishBtn) {
        publishBtn.addEventListener('click', () => {
            if (currentStep === 4) {
                publishCampaign();
            } else {
                nextStep(4);
            }
        });
    }
    
    if (finalPublishBtn) {
        finalPublishBtn.addEventListener('click', publishCampaign);
    }
    
    // Partner management buttons
    const addSelectedBtn = document.getElementById('addSelected');
    const removeSelectedBtn = document.getElementById('removeSelected');
    
    if (addSelectedBtn) {
        addSelectedBtn.addEventListener('click', addSelectedPartners);
    }
    
    if (removeSelectedBtn) {
        removeSelectedBtn.addEventListener('click', removeSelectedPartners);
    }
    
    // Initialize participants
    initializeParticipants();
    
    // Close modal when clicking outside
    const modal = document.getElementById('companyModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCompanyModal();
            }
        });
    }
    
    // Initialize first step as active
    const firstStep = document.querySelector('.form-step[data-step="1"]');
    if (firstStep) {
        firstStep.classList.remove('hidden');
        firstStep.classList.add('block');
    }
});

