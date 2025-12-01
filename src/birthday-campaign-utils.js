// ========================================
// BIRTHDAY CAMPAIGN UTILITIES
// Leaderboard and Spin Wheel Logic
// ========================================

const BirthdayCampaignUtils = {
    
    // ========================================
    // GOLD PRIZE STRUCTURE
    // ========================================
    
    GOLD_PRIZE_STRUCTURE: {
        1: { grams: 4, description: '4 grams (نیم سکه تمام بهار)' },
        2: { grams: 2, description: '2 grams' },
        3: { grams: 2, description: '2 grams' },
        4: { grams: 2, description: '2 grams' },
        5: { grams: 2, description: '2 grams' },
        6: { grams: 1, description: '1 gram' },
        7: { grams: 1, description: '1 gram' },
        8: { grams: 1, description: '1 gram' },
        9: { grams: 1, description: '1 gram' },
        10: { grams: 1, description: '1 gram' },
        // Ranks 11-25: 800 sot (0.8 grams)
        // Ranks 26-50: 600 sot (0.6 grams)
        // Ranks 51-75: 400 sot (0.4 grams)
        // Ranks 76-100: 200 sot (0.2 grams)
    },
    
    /**
     * Get gold prize for a specific rank
     */
    getGoldPrizeForRank(rank) {
        if (rank === 1) {
            return { grams: 4, sot: 4000, description: '4 grams (نیم سکه تمام بهار)' };
        } else if (rank >= 2 && rank <= 5) {
            return { grams: 2, sot: 2000, description: '2 grams' };
        } else if (rank >= 6 && rank <= 10) {
            return { grams: 1, sot: 1000, description: '1 gram' };
        } else if (rank >= 11 && rank <= 25) {
            return { grams: 0.8, sot: 800, description: '800 sot' };
        } else if (rank >= 26 && rank <= 50) {
            return { grams: 0.6, sot: 600, description: '600 sot' };
        } else if (rank >= 51 && rank <= 75) {
            return { grams: 0.4, sot: 400, description: '400 sot' };
        } else if (rank >= 76 && rank <= 100) {
            return { grams: 0.2, sot: 200, description: '200 sot' };
        }
        return { grams: 0, sot: 0, description: 'No prize' };
    },
    
    /**
     * Calculate cash equivalent of gold prize
     * @param {Number} grams - Gold amount in grams
     * @param {Number} goldPricePerGram - Current gold price per gram in Tomans
     */
    calculateCashEquivalent(grams, goldPricePerGram = 11830000) {
        return Math.round(grams * goldPricePerGram);
    },
    
    // ========================================
    // SPIN WHEEL PROBABILITIES
    // ========================================
    
    SPIN_PRIZES: [
        { id: 'cash_700k', type: 'cash', amount: 700000, probability: 55, label: '700,000 تومان' },
        { id: 'cash_500k', type: 'cash', amount: 500000, probability: 20, label: '500,000 تومان' },
        { id: 'cash_300k', type: 'cash', amount: 300000, probability: 10, label: '300,000 تومان' },
        { id: 'cash_100k', type: 'cash', amount: 100000, probability: 5, label: '100,000 تومان' },
        { id: 'cash_1m', type: 'cash', amount: 1000000, probability: 4, label: '1,000,000 تومان' },
        { id: 'cash_2m', type: 'cash', amount: 2000000, probability: 3, label: '2,000,000 تومان' },
        { id: 'cash_5m', type: 'cash', amount: 5000000, probability: 1, label: '5,000,000 تومان' },
        { id: 'premium_airpods', type: 'premium', product: 'AirPods Series 4', probability: 0.8, fallback: 700000, label: 'ایرپادز سری ۴' },
        { id: 'premium_watch', type: 'premium', product: 'Apple Watch Series 11', probability: 0.6, fallback: 700000, label: 'اپل واچ سری ۱۱' },
        { id: 'premium_ipad', type: 'premium', product: 'iPad Air M3', probability: 0.4, fallback: 700000, label: 'آیپد ایر M3' },
        { id: 'premium_iphone', type: 'premium', product: 'iPhone 17 Pro', probability: 0.2, fallback: 700000, label: 'آیفون ۱۷ پرو' },
    ],
    
    /**
     * Spin the wheel and return a prize based on probabilities
     * @param {Array} availablePrizes - List of prizes still available (for premium prizes)
     */
    spinWheel(availablePrizes = null) {
        // Build probability array
        const probabilityArray = [];
        let totalProbability = 0;
        
        this.SPIN_PRIZES.forEach(prize => {
            // Check if premium prize is still available
            if (prize.type === 'premium') {
                if (availablePrizes && !availablePrizes.includes(prize.id)) {
                    // Premium prize already won, skip it (will use fallback if selected)
                    return;
                }
            }
            
            totalProbability += prize.probability;
            probabilityArray.push({
                ...prize,
                cumulativeProbability: totalProbability
            });
        });
        
        // Generate random number between 0 and totalProbability
        const random = Math.random() * totalProbability;
        
        // Find which prize was won
        let selectedPrize = null;
        for (const prize of probabilityArray) {
            if (random <= prize.cumulativeProbability) {
                selectedPrize = prize;
                break;
            }
        }
        
        // Fallback to first prize if something went wrong
        if (!selectedPrize) {
            selectedPrize = probabilityArray[0];
        }
        
        // Check if premium prize is still available
        if (selectedPrize.type === 'premium') {
            if (availablePrizes && !availablePrizes.includes(selectedPrize.id)) {
                // Premium prize already won, return fallback cash
                return {
                    id: `fallback_${selectedPrize.id}`,
                    type: 'cash',
                    amount: selectedPrize.fallback,
                    label: `${selectedPrize.fallback.toLocaleString()} تومان`,
                    originalPrize: selectedPrize.id,
                    isFallback: true
                };
            }
        }
        
        return selectedPrize;
    },
    
    /**
     * Get all available prizes for display
     */
    getAllPrizes() {
        return this.SPIN_PRIZES;
    },
    
    // ========================================
    // LEADERBOARD CALCULATIONS
    // ========================================
    
    /**
     * Calculate leaderboard rankings based on NMV
     * @param {Array} partners - Array of partner data with NMV
     */
    calculateLeaderboard(partners) {
        // Sort by NMV descending
        const sorted = [...partners].sort((a, b) => b.nmv - a.nmv);
        
        // Assign ranks and gold prizes
        return sorted.map((partner, index) => {
            const rank = index + 1;
            const goldPrize = this.getGoldPrizeForRank(rank);
            
            return {
                ...partner,
                rank,
                goldPrize: goldPrize.grams,
                goldPrizeSot: goldPrize.sot,
                goldPrizeDescription: goldPrize.description
            };
        });
    },
    
    /**
     * Get leaderboard position for a specific partner
     */
    getPartnerRank(partners, partnerId) {
        const leaderboard = this.calculateLeaderboard(partners);
        const partner = leaderboard.find(p => p.id === partnerId);
        return partner ? partner.rank : null;
    },
    
    // ========================================
    // CAMPAIGN TIME MANAGEMENT
    // ========================================
    
    /**
     * Check if campaign is active
     */
    isCampaignActive(startDate, endDate) {
        const now = new Date();
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // End of day
        
        return now >= start && now <= end;
    },
    
    /**
     * Get time until campaign ends
     */
    getTimeUntilEnd(endDate) {
        const now = new Date();
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        
        const diff = end - now;
        
        if (diff <= 0) {
            return { ended: true, days: 0, hours: 0, minutes: 0 };
        }
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        
        return { ended: false, days, hours, minutes, total: diff };
    },
    
    /**
     * Check if it's time for final snapshot
     */
    isTimeForFinalSnapshot(endDate) {
        const now = new Date();
        const end = new Date(endDate);
        end.setHours(23, 59, 0, 0); // 23:59
        
        const diff = end - now;
        return diff >= 0 && diff < 60000; // Within 1 minute of 23:59
    },
    
    // ========================================
    // FORMATTING HELPERS
    // ========================================
    
    formatCurrency(amount) {
        return amount.toLocaleString('fa-IR');
    },
    
    formatGoldAmount(grams) {
        if (grams >= 1) {
            return `${grams} گرم`;
        } else {
            const sot = Math.round(grams * 1000);
            return `${sot} سوت`;
        }
    },
    
    formatRank(rank) {
        if (rank === 1) return '🥇 1st';
        if (rank === 2) return '🥈 2nd';
        if (rank === 3) return '🥉 3rd';
        return `#${rank}`;
    },
    
    // ========================================
    // NOTIFICATION HELPERS
    // ========================================
    
    /**
     * Generate notification message for spin opportunity
     */
    getSpinNotificationMessage() {
        return {
            title: 'تبریک!',
            message: 'یک شانس برای گردونه گرفتی!',
            action: 'چرخاندن گردونه'
        };
    },
    
    /**
     * Generate notification message for ranking change
     */
    getRankingNotificationMessage(oldRank, newRank) {
        if (newRank <= 3) {
            return {
                title: '🎉 عالی!',
                message: `تو الان رتبه ${newRank} هستی!`,
                type: 'success'
            };
        } else if (newRank <= 10) {
            return {
                title: '🔥 عالی!',
                message: `تو الان در ۱۰ نفر برتر هستی! (رتبه ${newRank})`,
                type: 'success'
            };
        } else if (newRank <= 100) {
            return {
                title: '✅ تبریک!',
                message: `تو الان در ۱۰۰ نفر برتر هستی! (رتبه ${newRank})`,
                type: 'info'
            };
        } else if (oldRank && newRank < oldRank) {
            return {
                title: '📈 پیشرفت!',
                message: `رتبه تو از ${oldRank} به ${newRank} رسید!`,
                type: 'info'
            };
        }
        return null;
    },
    
    /**
     * Generate notification message for prize win
     */
    getPrizeWinMessage(prize) {
        if (prize.type === 'cash') {
            return {
                title: '🎉 برنده شدی!',
                message: `${prize.label} به کیف پولت اضافه شد!`,
                type: 'success',
                amount: prize.amount
            };
        } else if (prize.type === 'premium') {
            return {
                title: '🏆 جایزه بزرگ!',
                message: `تبریک! ${prize.label} برنده شدی!`,
                type: 'premium',
                product: prize.product
            };
        }
        return null;
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BirthdayCampaignUtils;
}

