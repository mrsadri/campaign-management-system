# User Stories - Daily Purchase Campaign System

## 🎯 Focus: Two-Sided System
- **Primary Focus (60%):** Seller/Partner (شریک) Interface
- **Secondary Focus (40%):** Sales Admin Interface

---

## 👥 SELLER/PARTNER USER STORIES (Primary Focus)

### US-001: View My Active Campaigns
**As a** seller/partner (شریک)  
**I want to** see all active campaigns I'm eligible for in a clear dashboard  
**So that** I know which insurance sales will earn me rewards

**Acceptance Criteria:**
- Dashboard shows all my active campaigns with clear cards
- Each card displays: campaign name, end date, reward summary
- Visual indicators for campaign urgency (ending soon)
- Filter options: by insurance company, by category
- "No active campaigns" message when none available

---

### US-002: Understand Campaign Rewards
**As a** seller/partner  
**I want to** see detailed, easy-to-understand reward conditions for each campaign  
**So that** I know exactly what I need to sell to earn specific rewards

**Acceptance Criteria:**
- Clear breakdown table showing: Company → Category → Duration → Payment Type → Reward Amount
- Visual highlights for highest-paying conditions
- "First purchase only" vs "All purchases" clearly indicated
- Payment schedule clearly stated (daily/weekly)
- Examples showing sample scenarios (e.g., "Sell Asia 12-month third-party = 1,000,000 Tomans")

---

### US-003: Track Today's Sales & Earnings
**As a** seller/partner  
**I want to** see real-time updates of my sales and earned rewards today  
**So that** I can track my progress and know my daily earnings

**Acceptance Criteria:**
- "Today's Dashboard" section showing:
  - Total sales made today
  - Qualifying sales for campaigns
  - Total rewards earned today
  - Potential earnings from pending settlements
- Each sale shows: time, insurance company, category, reward earned (or why it didn't qualify)
- Auto-refresh when new sale is detected
- Push notification when reward is earned

---

### US-004: View My Earnings History
**As a** seller/partner  
**I want to** see complete history of all rewards I've earned and received  
**So that** I can track my income and verify payments

**Acceptance Criteria:**
- Earnings summary: Total All Time, This Month, Last Month
- Filter by date range, campaign, insurance company
- Two sections: "Paid Rewards" and "Pending Rewards"
- Each entry shows: date, campaign name, insurance company, sale details, reward amount, payment status
- Export to PDF/Excel for personal records
- Payment date and transaction reference for paid rewards

---

### US-005: Get Notified About New Campaigns
**As a** seller/partner  
**I want to** receive notifications when new campaigns are launched that I'm eligible for  
**So that** I don't miss earning opportunities

**Acceptance Criteria:**
- Push notification when added to new campaign
- Notification shows: campaign name, top rewards, end date
- Badge/dot indicator on campaigns menu showing new campaigns
- "New" label on campaign cards for 48 hours
- Email summary of new campaigns (optional)

---

### US-006: See Why Sale Didn't Qualify
**As a** seller/partner  
**I want to** understand why a sale didn't earn a reward  
**So that** I can adjust my selling strategy

**Acceptance Criteria:**
- Each non-qualifying sale has clear explanation:
  - "Not part of any active campaign"
  - "Insurance company not eligible"
  - "Already sold from this company today (first purchase only rule)"
  - "Wrong insurance category"
  - "Wrong duration or payment type"
- Suggestions for qualifying sales
- Link to campaign conditions for reference

---

### US-007: Calculate Potential Earnings
**As a** seller/partner  
**I want to** use an earnings calculator before making a sale  
**So that** I can choose the most profitable options for my customers

**Acceptance Criteria:**
- Interactive calculator on campaign detail page
- Dropdown selections: Insurance Company → Category → Duration → Payment Type
- Shows: Estimated reward amount
- "Does this qualify?" indicator
- "Best options" suggestions for maximum earnings
- Takes into account "first purchase only" rules for today

---

### US-008: Track Campaign Progress
**As a** seller/partner  
**I want to** see my progress within each campaign  
**So that** I can understand my performance and earnings potential

**Acceptance Criteria:**
- Per-campaign stats:
  - Total sales made in this campaign
  - Total rewards earned
  - Breakdown by insurance company
  - Comparison with other sellers (anonymized - percentile ranking)
- Visual charts showing daily/weekly performance
- Highlight best-performing insurance companies
- Time remaining in campaign with countdown

---

### US-009: Receive Payment Confirmations
**As a** seller/partner  
**I want to** get notified when rewards are paid to me  
**So that** I can verify my payments and reconcile my accounts

**Acceptance Criteria:**
- Notification when payment is processed
- Shows: payment amount, breakdown by campaign, transaction reference, payment date
- Matches automatically to pending rewards
- Receipt available for download
- Payment appears in earnings history immediately

---

### US-010: View Campaign Rules & FAQ
**As a** seller/partner  
**I want to** access clear explanations and FAQs for each campaign  
**So that** I fully understand how to maximize my earnings

**Acceptance Criteria:**
- Help section on each campaign page
- Common questions answered:
  - "When will I get paid?"
  - "What counts as first purchase of day?"
  - "Can I earn from multiple campaigns?"
  - "What if customer cancels policy?"
- Visual guides and infographics
- Contact support option for questions

---

## 👨‍💼 SALES ADMIN USER STORIES (Secondary Focus)

### US-011: Create Campaign with Complex Conditions
**As a** sales administrator  
**I want to** create a new campaign with up to 10 different insurance companies and unique conditions for each  
**So that** I can incentivize specific product sales strategically

**Acceptance Criteria:**
- Multi-step campaign creation wizard
- Add 1-10 insurance companies
- For each company, configure:
  - Categories (multi-select)
  - Durations (multi-select)
  - Purchase types (multi-select)
  - Reward amount
  - Calculation type (first/all purchases)
- Single interval setting for entire campaign
- Validation prevents conflicts
- Save as draft or publish immediately

---

### US-012: Manage Campaign Participants
**As a** sales administrator  
**I want to** add or remove sellers from active campaigns  
**So that** I can control participation during long-running promotions

**Acceptance Criteria:**
- Search sellers by ID or name
- Add sellers: scheduled after next payment cycle
- Remove sellers: scheduled after next payment cycle
- View "pending changes" list
- Clear notification of when changes take effect
- Bulk add/remove functionality

---

### US-013: Monitor Campaign Performance
**As a** sales administrator  
**I want to** see real-time analytics for each campaign  
**So that** I can evaluate effectiveness and ROI

**Acceptance Criteria:**
- Dashboard showing:
  - Total sales by campaign
  - Total rewards paid/pending
  - Participation rate (active sellers / total eligible)
  - Top-performing sellers
  - Sales by insurance company
  - Daily/weekly trends
- Filter by date range
- Export reports to Excel
- Visual charts and graphs

---

### US-014: Edit Draft Campaigns
**As a** sales administrator  
**I want to** modify campaign details before activation  
**So that** I can correct mistakes or adjust strategy

**Acceptance Criteria:**
- Full edit access to draft campaigns
- All fields modifiable
- Real-time validation
- Preview mode to review changes
- Delete draft option
- Cannot edit published campaigns (except participants)

---

### US-015: Duplicate Campaigns
**As a** sales administrator  
**I want to** clone existing campaigns quickly  
**So that** I can create similar promotions without starting from scratch

**Acceptance Criteria:**
- "Duplicate" button on campaign list
- Copies all settings except:
  - Campaign name (adds "Copy" suffix)
  - Dates (reset to empty)
- Created in draft status
- Opens in edit mode immediately
- Original campaign unaffected

---

### US-016: View Payment Queue
**As a** sales administrator  
**I want to** see all pending reward payments before processing  
**So that** I can verify amounts and resolve issues

**Acceptance Criteria:**
- Payment queue dashboard showing:
  - All pending rewards by campaign
  - Grouped by payment schedule (daily/weekly)
  - Seller breakdown with amounts
  - Total payout amount
- Filter by campaign, date, seller
- Mark individual payments for review
- Export payment file for finance team
- Process payments with confirmation
- Notification sent to sellers automatically

