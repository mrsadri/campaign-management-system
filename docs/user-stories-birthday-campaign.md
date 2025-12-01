# User Stories: Partner Birthday Campaign

## Campaign Overview
A two-week birthday campaign for partners featuring:
- **Leaderboard System**: Top 100 partners ranked by NMV (Net Merchandise Value) with gold prizes
- **Spin Wheel System**: Lottery-style rewards after each successful order

---

## EPIC 1: Leaderboard System

### US-1: View Real-time Leaderboard
**As a** partner  
**I want to** see a live leaderboard showing the top 100 partners ranked by total sales (NMV)  
**So that** I can see my current ranking and how close I am to winning gold prizes

**Acceptance Criteria:**
- Leaderboard displays top 100 partners
- Shows: Rank, Partner Name/Code, Number of Orders, Current NMV, Gold Prize Amount
- Updates every 30 minutes (or real-time if possible)
- Shows my current position highlighted
- Displays how much gold I would win at my current rank

**Priority:** High

---

### US-2: Track My Ranking Changes
**As a** partner  
**I want to** see how my ranking changes when I make sales  
**So that** I understand how each sale affects my position and potential gold prize

**Acceptance Criteria:**
- When a sale is completed, my ranking updates automatically
- I can see my previous rank vs current rank
- I can see how the gold prize amount changes with rank changes
- Visual indicator shows if I moved up or down

**Priority:** High

---

### US-3: View Gold Prize Structure
**As a** partner  
**I want to** see the complete gold prize structure for all ranks  
**So that** I know what I'm competing for

**Acceptance Criteria:**
- Display prize structure:
  - Rank 1: 4 grams gold
  - Ranks 2-5: 2 grams each
  - Ranks 6-10: 1 gram each
  - Ranks 11-25: 800 sot each
  - Ranks 26-50: 600 sot each
  - Ranks 51-75: 400 sot each
  - Ranks 76-100: 200 sot each
- Show current gold price per gram
- Calculate and display cash equivalent for each rank

**Priority:** Medium

---

### US-4: Receive Final Ranking Notification
**As a** partner  
**I want to** be notified of my final ranking at the end of the campaign  
**So that** I know how much gold prize I won

**Acceptance Criteria:**
- At 23:59 on the last day, final snapshot is taken
- Notification sent with final rank and gold prize amount
- Prize amount calculated based on current gold price
- Payment processed within 72 business hours

**Priority:** High

---

## EPIC 2: Spin Wheel System

### US-5: Spin Wheel After Order
**As a** partner  
**I want to** spin a wheel of fortune after each successful order  
**So that** I have a chance to win cash prizes or premium Apple products

**Acceptance Criteria:**
- After order completion, notification appears: "Congratulations! You got a spin chance!"
- Spin button becomes active
- Wheel can be spun once per successful order
- Spins are saved and don't expire until campaign ends
- Can accumulate multiple spins

**Priority:** High

---

### US-6: View Spin Wheel Prizes
**As a** partner  
**I want to** see all available prizes on the spin wheel  
**So that** I know what I can win

**Acceptance Criteria:**
- Display all prizes:
  - Cash: 100K, 300K, 500K, 700K, 1M, 2M, 5M Tomans
  - Premium: iPhone 17 Pro, iPad Air, Apple Watch Series 11, AirPods Series 4
- Show probability for each prize
- Premium prizes show as "Limited" when won by others

**Priority:** Medium

---

### US-7: Spin Wheel with Probability System
**As a** partner  
**I want to** spin the wheel and win a prize based on defined probabilities  
**So that** the system is fair and transparent

**Acceptance Criteria:**
- Probability distribution:
  - 700K: 55%
  - 500K: 20%
  - 300K: 10%
  - 100K: 5%
  - 1M: 4%
  - 2M: 3%
  - 5M: 1%
  - AirPods: 0.8%
  - Apple Watch: 0.6%
  - iPad: 0.4%
  - iPhone: 0.2%
- Premium prizes removed from pool after being won
- Fallback to 700K if premium prize already won
- Result displayed immediately after spin

**Priority:** High

---

### US-8: Receive Cash Prizes Instantly
**As a** partner  
**I want to** receive cash prizes immediately after winning them  
**So that** I can use the money right away

**Acceptance Criteria:**
- Cash prizes (100K-5M) added to wallet immediately
- Notification shows prize amount
- Wallet balance updates in real-time
- Transaction history shows spin win

**Priority:** High

---

### US-9: Register Premium Prize Win
**As a** partner  
**I want to** register my premium prize win in the system  
**So that** I receive the physical product after campaign ends

**Acceptance Criteria:**
- Premium prizes (Apple products) registered in system
- Notification confirms prize registration
- Prize will be shipped after campaign ends
- Can view my premium prizes in profile

**Priority:** High

---

### US-10: View Recent Winners Feed
**As a** partner  
**I want to** see recent winners from the spin wheel  
**So that** I feel motivated to keep spinning

**Acceptance Criteria:**
- Live feed showing recent wins
- Shows prize type and approximate time
- Anonymized partner info (e.g., "Partner *** won 1M Tomans")
- Updates in real-time
- Motivational design similar to betting sites

**Priority:** Medium

---

## EPIC 3: Campaign Landing Page

### US-11: View Campaign Information
**As a** partner  
**I want to** see complete campaign information on a landing page  
**So that** I understand all rules, prizes, and how to participate

**Acceptance Criteria:**
- Campaign name and duration (2 weeks)
- Explanation of leaderboard system
- Explanation of spin wheel system
- Complete prize structure
- Rules and regulations
- FAQ section
- Links to leaderboard and spin wheel

**Priority:** High

---

### US-12: Access Campaign from Multiple Channels
**As a** partner  
**I want to** access the campaign from Telegram, landing page, and seller panel  
**So that** I can participate from anywhere

**Acceptance Criteria:**
- Landing page accessible via URL
- Telegram bot integration for notifications
- Seller panel integration
- Mobile-responsive design
- RTL support for Persian

**Priority:** Medium

---

## EPIC 4: Admin Management

### US-13: Create Birthday Campaign
**As an** admin  
**I want to** create and configure the birthday campaign  
**So that** the campaign runs with correct settings

**Acceptance Criteria:**
- Set campaign start and end dates (2 weeks)
- Configure leaderboard settings (Top 100)
- Set gold prize structure
- Configure spin wheel probabilities
- Set premium prize inventory
- Activate/deactivate campaign

**Priority:** High

---

### US-14: Monitor Leaderboard
**As an** admin  
**I want to** monitor the leaderboard in real-time  
**So that** I can track campaign performance

**Acceptance Criteria:**
- View top 100 partners
- See total NMV for each partner
- Export leaderboard data
- See ranking changes over time
- Filter by partner code/name

**Priority:** Medium

---

### US-15: Manage Premium Prizes
**As an** admin  
**I want to** manage premium prize inventory  
**So that** I can track which prizes have been won

**Acceptance Criteria:**
- Set initial inventory for each premium prize
- See which prizes have been won
- Remove won prizes from spin pool
- View winners list
- Export winners data for shipping

**Priority:** High

---

### US-16: Process Final Rankings
**As an** admin  
**I want to** process final rankings and calculate gold prizes  
**So that** partners receive their rewards

**Acceptance Criteria:**
- Take final snapshot at 23:59 on last day
- Lock rankings
- Fetch current gold price
- Calculate cash equivalent for each rank
- Generate payment list
- Export for finance team
- Send notifications to partners

**Priority:** High

---

### US-17: View Campaign Analytics
**As an** admin  
**I want to** view campaign analytics and statistics  
**So that** I can measure campaign success

**Acceptance Criteria:**
- Total orders during campaign
- Total NMV generated
- Number of active partners
- Spin wheel statistics (total spins, prizes won)
- Leaderboard engagement metrics
- Growth vs baseline (target: 10-30% increase)

**Priority:** Medium

---

## EPIC 5: Notifications & Communication

### US-18: Receive Spin Opportunity Notification
**As a** partner  
**I want to** receive a notification after each order  
**So that** I don't miss my spin chance

**Acceptance Criteria:**
- Push notification: "Congratulations! You got a spin chance!"
- SMS notification (optional)
- Telegram notification
- In-app notification
- Link directly to spin wheel

**Priority:** High

---

### US-19: Receive Ranking Updates
**As a** partner  
**I want to** receive notifications about significant ranking changes  
**So that** I stay engaged with the competition

**Acceptance Criteria:**
- Notification when entering top 100
- Notification when entering top 10
- Notification when entering top 3
- Notification when rank changes significantly (e.g., +10 positions)
- Daily summary of ranking position

**Priority:** Medium

---

### US-20: Receive Campaign Reminders
**As a** partner  
**I want to** receive reminders about the campaign  
**So that** I don't forget to participate

**Acceptance Criteria:**
- Campaign start notification
- Mid-campaign reminder
- Final day reminder
- Reminder about unused spins
- Reminder about leaderboard position

**Priority:** Low

---

## Technical Requirements

### TR-1: Real-time Updates
- Leaderboard updates every 30 minutes (or real-time if feasible)
- Spin wheel results instant
- Wallet updates instant
- Recent winners feed updates in real-time

### TR-2: Data Persistence
- All spins saved (don't expire)
- Leaderboard snapshots saved
- Final ranking snapshot saved
- Premium prize inventory tracked

### TR-3: Gold Price Integration
- Fetch current gold price from reliable source
- Calculate cash equivalent at campaign end
- Display current gold price on leaderboard

### TR-4: Order Integration
- Connect to order system
- Track NMV per partner
- Trigger spin opportunity after order completion
- Update leaderboard after each order

---

## Success Metrics

1. **Sales Growth**: 10-30% increase in weekly successful orders (from 4,150 baseline)
2. **Engagement**: Number of partners participating in leaderboard
3. **Spin Activity**: Total spins and prizes won
4. **Social Engagement**: Instagram engagement increase
5. **Reactivation**: Number of inactive partners who became active

---

## Campaign Duration
- **Start**: Campaign start date
- **End**: 2 weeks later at 23:59
- **Final Snapshot**: 23:59 on last day
- **Payment Processing**: Within 72 business hours after campaign end

