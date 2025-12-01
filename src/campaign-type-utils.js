// ========================================
// CAMPAIGN TYPE SYSTEM - UTILITY LIBRARY
// Encoding and Decoding Campaign Type Strings
// ========================================

/**
 * Campaign Type System Utility
 * Handles encoding and decoding of Campaign Type strings
 * Format: RefreshPeriod_SalesCondition_InsuranceCompanies_PolicyTypes_RewardStructure
 */

const CampaignTypeUtils = {
    
    // ========================================
    // ENCODING (Admin Side: Form Data → Campaign Type String)
    // ========================================
    
    /**
     * Generate Campaign Type string from campaign data
     * @param {Object} campaignData - Campaign form data
     * @param {Array} campaignData.companies - Array of company configurations
     * @param {String} campaignData.interval - Refresh period (daily, weekly, etc.)
     * @returns {String} Campaign Type string
     */
    encodeCampaignType(campaignData) {
        const { companies, interval } = campaignData;
        
        if (!companies || companies.length === 0) {
            return null;
        }
        
        // Map interval to refresh period
        const refreshPeriod = this.mapIntervalToRefreshPeriod(interval);
        
        // Group companies by calculation type and reward structure
        // For simplicity, we'll generate one Campaign Type per company configuration
        // In reality, companies with same conditions could be merged
        const campaignTypes = companies.map(company => {
            return this.encodeSingleCampaignType({
                refreshPeriod,
                company
            });
        });
        
        // If multiple campaign types, merge them with ||
        return campaignTypes.length === 1 ? campaignTypes[0] : campaignTypes.join('||');
    },
    
    /**
     * Encode a single campaign type from company configuration
     */
    encodeSingleCampaignType({ refreshPeriod, company }) {
        // Extract components
        const salesCondition = this.mapCalculationTypeToSalesCondition(
            company.calculationType,
            company.calculationType === 'first' ? '1st' : 'All'
        );
        
        const companiesStr = this.normalizeCompanyName(company.company);
        
        const policyTypesStr = company.categories
            .map(cat => this.normalizeCategoryName(cat))
            .join('|');
        
        const rewardStructure = this.encodeRewardStructure(company);
        
        // Build Campaign Type string
        return `${refreshPeriod}_${salesCondition}_${companiesStr}_${policyTypesStr}_${rewardStructure}`;
    },
    
    /**
     * Encode reward structure based on purchase types and reward amount
     */
    encodeRewardStructure(company) {
        const { purchaseTypes, reward } = company;
        const hasCash = purchaseTypes.includes('cash');
        const hasBNPL = purchaseTypes.some(pt => pt.includes('installment'));
        
        // For now, we'll encode as fixed amount rewards
        // In real implementation, you might have percentage-based or separate cash/BNPL amounts
        
        // Convert reward amount to percentage for encoding
        // This is a simplification - in real system, you'd store percentage separately
        // For demo purposes, we'll use a default percentage based on common patterns
        const rewardPercentage = this.estimateRewardPercentage(reward);
        
        // Check payment types
        if (hasCash && !hasBNPL) {
            // Cash only
            return `${rewardPercentage}%cash`;
        } else if (hasBNPL && !hasCash) {
            // BNPL only
            return `${rewardPercentage}%bnpl`;
        } else {
            // Both - use uniform cashback
            // In real implementation, you might want separate: 4%cash_2%bnpl
            return `${rewardPercentage}%cb`;
        }
    },
    
    /**
     * Estimate reward percentage from amount
     * Note: This is a simplified estimation for demo purposes.
     * In real implementation, percentage would be stored in the form.
     */
    estimateRewardPercentage(amount) {
        // Rough estimation: common reward percentages
        // In real system, this would be a form field
        if (amount >= 2000000) return 5; // 2M+ = 5%
        if (amount >= 1000000) return 4; // 1M+ = 4%
        if (amount >= 500000) return 3;  // 500K+ = 3%
        return 2; // Default 2%
    },
    
    // ========================================
    // DECODING (Seller Side: Campaign Type String → Readable Data)
    // ========================================
    
    /**
     * Parse Campaign Type string into readable data structure
     * @param {String} campaignTypeStr - Campaign Type string
     * @returns {Object} Parsed campaign type data
     */
    parseCampaignType(campaignTypeStr) {
        if (!campaignTypeStr || typeof campaignTypeStr !== 'string') {
            return null;
        }
        
        // Check for merged campaigns (separated by ||)
        const parts = campaignTypeStr.split('||');
        
        if (parts.length > 1) {
            // Merged campaigns
            return {
                isMerged: true,
                campaigns: parts.map(part => this.parseSingleCampaignType(part.trim())),
                sharedRefreshPeriod: this.parseSingleCampaignType(parts[0].trim()).refreshPeriod
            };
        } else {
            // Single campaign
            return {
                isMerged: false,
                ...this.parseSingleCampaignType(campaignTypeStr)
            };
        }
    },
    
    /**
     * Parse a single Campaign Type string
     */
    parseSingleCampaignType(campaignTypeStr) {
        const parts = campaignTypeStr.split('_');
        
        if (parts.length < 5) {
            console.error('Invalid Campaign Type format:', campaignTypeStr);
            return null;
        }
        
        const [refreshPeriod, salesCondition, companiesStr, policyTypesStr, rewardStructure] = parts;
        
        return {
            refreshPeriod: this.parseRefreshPeriod(refreshPeriod),
            salesCondition: this.parseSalesCondition(salesCondition),
            companies: this.parseCompanies(companiesStr),
            policyTypes: this.parsePolicyTypes(policyTypesStr),
            reward: this.parseRewardStructure(rewardStructure)
        };
    },
    
    /**
     * Parse refresh period
     */
    parseRefreshPeriod(periodStr) {
        const periodMap = {
            'Day': { type: 'Day', label: 'Daily', description: 'Campaign resets daily' },
            'Day-1': { type: 'Day', label: 'Daily', description: 'Campaign resets daily' },
            'Week': { type: 'Week', label: 'Weekly', description: 'Campaign resets weekly' },
            'Month': { type: 'Month', label: 'Monthly', description: 'Campaign resets monthly' }
        };
        
        return periodMap[periodStr] || { type: periodStr, label: periodStr, description: '' };
    },
    
    /**
     * Parse sales condition
     */
    parseSalesCondition(conditionStr) {
        const conditionMap = {
            'All': { type: 'All', label: 'All Sales', description: 'All qualifying sales in the period earn rewards' },
            '1st': { type: '1st', label: 'First Sale Only', description: 'Only the first qualifying sale in the period earns a reward' },
            '2nd': { type: '2nd', label: 'Second Sale Only', description: 'Only the second qualifying sale in the period earns a reward' },
            '3rd': { type: '3rd', label: 'Third Sale Only', description: 'Only the third qualifying sale in the period earns a reward' }
        };
        
        return conditionMap[conditionStr] || { type: conditionStr, label: conditionStr, description: '' };
    },
    
    /**
     * Parse insurance companies
     */
    parseCompanies(companiesStr) {
        return companiesStr.split('||').map(company => ({
            code: company.trim(),
            name: this.formatCompanyName(company.trim())
        }));
    },
    
    /**
     * Parse policy types
     */
    parsePolicyTypes(policyTypesStr) {
        return policyTypesStr.split('|').map(type => ({
            code: type.trim(),
            name: this.formatCategoryName(type.trim())
        }));
    },
    
    /**
     * Parse reward structure
     */
    parseRewardStructure(rewardStr) {
        // Check for uniform cashback
        if (rewardStr.includes('%cb')) {
            const percentage = parseInt(rewardStr.match(/(\d+)%cb/)?.[1] || '0');
            return {
                type: 'uniform',
                cashPercentage: percentage,
                bnplPercentage: percentage,
                label: `${percentage}% Cashback (Both)`
            };
        }
        
        // Check for cash only
        if (rewardStr.includes('%cash') && !rewardStr.includes('%bnpl')) {
            const percentage = parseInt(rewardStr.match(/(\d+)%cash/)?.[1] || '0');
            return {
                type: 'cash-only',
                cashPercentage: percentage,
                bnplPercentage: 0,
                label: `${percentage}% (Cash Only)`
            };
        }
        
        // Check for BNPL only
        if (rewardStr.includes('%bnpl') && !rewardStr.includes('%cash')) {
            const percentage = parseInt(rewardStr.match(/(\d+)%bnpl/)?.[1] || '0');
            return {
                type: 'bnpl-only',
                cashPercentage: 0,
                bnplPercentage: percentage,
                label: `${percentage}% (BNPL Only)`
            };
        }
        
        // Check for different rates
        const cashMatch = rewardStr.match(/(\d+)%cash/);
        const bnplMatch = rewardStr.match(/(\d+)%bnpl/);
        
        if (cashMatch && bnplMatch) {
            const cashPercentage = parseInt(cashMatch[1]);
            const bnplPercentage = parseInt(bnplMatch[1]);
            return {
                type: 'different-rates',
                cashPercentage,
                bnplPercentage,
                label: `${cashPercentage}% Cash / ${bnplPercentage}% BNPL`
            };
        }
        
        // Fallback
        return {
            type: 'unknown',
            cashPercentage: 0,
            bnplPercentage: 0,
            label: rewardStr
        };
    },
    
    // ========================================
    // FORMATTING HELPERS
    // ========================================
    
    /**
     * Map calculation interval to refresh period
     */
    mapIntervalToRefreshPeriod(interval) {
        const intervalMap = {
            'daily': 'Day',
            '3days': 'Day',
            '4days': 'Day',
            '5days': 'Day',
            'weekly': 'Week',
            'monthly': 'Month'
        };
        return intervalMap[interval] || 'Day';
    },
    
    /**
     * Map calculation type to sales condition
     */
    mapCalculationTypeToSalesCondition(calculationType, defaultCondition = 'All') {
        if (calculationType === 'first') {
            return '1st';
        }
        return defaultCondition;
    },
    
    /**
     * Normalize company name for encoding
     */
    normalizeCompanyName(company) {
        const nameMap = {
            'asia': 'Asia',
            'saman': 'saman',
            'razi': 'Razi',
            'iran': 'Iran',
            'parsian': 'Parsian',
            'pasargad': 'Pasargad',
            'alborz': 'Alborz',
            'dana': 'Dana',
            'mellat': 'Mellat',
            'kosar': 'Kosar'
        };
        return nameMap[company.toLowerCase()] || company;
    },
    
    /**
     * Normalize category name for encoding
     */
    normalizeCategoryName(category) {
        const categoryMap = {
            'thirdparty': 'ThirdParty',
            'body': 'Body',
            'health': 'Health',
            'fire': 'Fire',
            'life': 'Life'
        };
        return categoryMap[category.toLowerCase()] || category;
    },
    
    /**
     * Format company name for display
     */
    formatCompanyName(companyCode) {
        const nameMap = {
            'Razi': 'Razi (رازی)',
            'saman': 'Saman (سامان)',
            'Iran': 'Iran (ایران)',
            'Asia': 'Asia (آسیا)',
            'Parsian': 'Parsian (پارسیان)',
            'Pasargad': 'Pasargad (پاسارگاد)',
            'Alborz': 'Alborz (البرز)',
            'Dana': 'Dana (دانا)',
            'Mellat': 'Mellat (ملت)',
            'Kosar': 'Kosar (کوثر)'
        };
        return nameMap[companyCode] || companyCode;
    },
    
    /**
     * Format category name for display
     */
    formatCategoryName(categoryCode) {
        const categoryMap = {
            'ThirdParty': 'Third-party',
            'Body': 'Body',
            'Health': 'Health',
            'Fire': 'Fire',
            'Life': 'Life'
        };
        return categoryMap[categoryCode] || categoryCode;
    },
    
    // ========================================
    // VALIDATION
    // ========================================
    
    /**
     * Validate Campaign Type string format
     */
    validateCampaignType(campaignTypeStr) {
        if (!campaignTypeStr || typeof campaignTypeStr !== 'string') {
            return { valid: false, error: 'Campaign Type string is required' };
        }
        
        // Check for merged campaigns
        const parts = campaignTypeStr.split('||');
        
        for (const part of parts) {
            const components = part.trim().split('_');
            
            if (components.length < 5) {
                return { 
                    valid: false, 
                    error: `Invalid format: Expected 5 components separated by underscores, got ${components.length}` 
                };
            }
            
            // Validate refresh period
            const validPeriods = ['Day', 'Day-1', 'Week', 'Month'];
            if (!validPeriods.some(p => components[0].startsWith(p))) {
                return { valid: false, error: `Invalid refresh period: ${components[0]}` };
            }
            
            // Validate sales condition
            const validConditions = ['All', '1st', '2nd', '3rd'];
            if (!validConditions.includes(components[1])) {
                return { valid: false, error: `Invalid sales condition: ${components[1]}` };
            }
        }
        
        return { valid: true };
    },
    
    // ========================================
    // FORMATTING FOR DISPLAY
    // ========================================
    
    /**
     * Format Campaign Type for display in admin review
     */
    formatForAdminDisplay(campaignTypeStr) {
        const parsed = this.parseCampaignType(campaignTypeStr);
        if (!parsed) return campaignTypeStr;
        
        if (parsed.isMerged) {
            return `${parsed.campaigns.length} merged campaigns (${parsed.sharedRefreshPeriod.type} refresh)`;
        } else {
            return `${parsed.refreshPeriod.label} | ${parsed.salesCondition.label} | ${parsed.companies.length} companies`;
        }
    },
    
    /**
     * Generate human-readable summary for sellers
     */
    generateSellerSummary(campaignTypeStr) {
        const parsed = this.parseCampaignType(campaignTypeStr);
        if (!parsed) return null;
        
        if (parsed.isMerged) {
            return {
                refreshPeriod: parsed.sharedRefreshPeriod.label,
                campaigns: parsed.campaigns.map(c => ({
                    companies: c.companies.map(comp => comp.name).join(', '),
                    policyTypes: c.policyTypes.map(pt => pt.name).join(', '),
                    reward: c.reward.label,
                    salesCondition: c.salesCondition.label
                }))
            };
        } else {
            return {
                refreshPeriod: parsed.refreshPeriod.label,
                salesCondition: parsed.salesCondition.label,
                salesConditionDesc: parsed.salesCondition.description,
                companies: parsed.companies.map(c => c.name).join(', '),
                policyTypes: parsed.policyTypes.map(pt => pt.name).join(', '),
                reward: parsed.reward.label,
                rewardDetails: parsed.reward
            };
        }
    }
};

// Export for use in both admin and seller interfaces
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CampaignTypeUtils;
}

