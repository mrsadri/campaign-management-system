# Project Brief

## 🎯 PROJECT EMPHASIS

**PRIMARY FOCUS (60-70%):** Seller/Partner (شریک) Interface  
**SECONDARY FOCUS (30-40%):** Sales Admin Interface

The main goal of this system is to **empower sellers** with clear visibility into their earning opportunities and provide transparent, real-time tracking of their performance and rewards.

---

## Project Overview

The sales team needs to create campaigns/festivals that allow for setting completely different rewards for different insurance companies, insurance categories, and purchase conditions. The current festival system doesn't support this capability and only applies one set of conditions for the entire festival.

This project introduces a new type of campaign called **"Daily Purchase Campaign" (روزی یک خرید)** that supports complex conditional logic for rewards.

## Two-Sided System

This system serves two distinct user groups:

### 1. Sales Admin (Campaign Manager)
**Role:** Create, configure, and manage campaigns in the back office
**Responsibilities:**
- Set up new campaigns with complex conditions
- Define insurance company rules and rewards
- Select eligible sellers/partners
- Monitor campaign performance
- Manage seller participation during campaigns

### 2. Seller/Partner (شریک) - **PRIMARY FOCUS**
**Role:** Sell insurance policies and earn rewards through campaigns
**Responsibilities:**
- View available active campaigns
- Understand campaign conditions and rewards
- Track their sales and earnings in real-time
- See eligible insurance products for rewards
- Monitor reward payments and history

**Note:** The main focus of this system is to serve the sellers/partners, providing them with clear visibility into campaigns, their performance, and earnings.

## Goals & Objectives

### For Sales Admin:
- Enable creation of targeted and effective campaigns
- Support up to 10 different insurance companies per campaign with independent conditions
- Flexible campaign management during long-running promotions

### For Sellers/Partners (Primary):
- **Clear visibility** into all active campaigns they're eligible for
- **Real-time tracking** of sales and earned rewards
- **Transparent reward calculation** - know exactly what they'll earn
- **Easy understanding** of complex campaign conditions
- **Performance insights** to maximize their earnings

### Technical Objectives:
- Support different rewards based on:
  - Insurance company
  - Insurance category (Third-party liability / Body / Health / etc.)
  - Insurance duration (3, 6, 12 months, or free)
  - Purchase type (Cash / Touch installment / Non-touch installment)
- Support different reward calculation types:
  - First purchase of the day only
  - All purchases within the period
- Flexible reward calculation intervals (daily / every 3 days / every 4 days / every 5 days / weekly)

## Target Audience

### Primary Users (Main Focus):
- **Sellers/Partners (شریک)**: Insurance sales agents who participate in campaigns and earn rewards
- Three seller panels: Partner Panel / Snap Panel / Pishkhan Panel (پیشخوان)

### Secondary Users:
- **Sales Administrators**: Back office staff who create and manage campaigns
- **Sales Managers**: Monitor overall campaign performance

## Design Requirements

### Two Interface Requirements

This system requires **TWO SEPARATE INTERFACES**:

---

### A. Seller/Partner Interface (PRIMARY - MAIN FOCUS)

This is the main user-facing interface where sellers interact with campaigns daily.

#### Dashboard for Sellers
- **Active Campaigns View**: Clear cards showing all campaigns the seller is eligible for
- **My Earnings**: Real-time display of earned rewards (pending and paid)
- **Today's Progress**: What they've sold today and potential earnings
- **Campaign Details**: Easy-to-understand breakdown of each campaign's conditions

#### Campaign Details for Sellers
For each campaign, sellers should see:
- Campaign name and duration
- Which insurance companies are eligible
- What categories/durations/payment types earn rewards
- Reward amounts for each condition
- Whether it's first purchase only or all purchases
- Payment schedule (daily/weekly/etc.)
- Their personal progress in this campaign

#### Sales Tracking
- List of all sales made within campaign periods
- Which sales earned rewards and how much
- Which sales didn't qualify and why
- Real-time updates as they make sales

#### Reward History
- Payment history with dates and amounts
- Breakdown by campaign and insurance company
- Pending rewards awaiting payment
- Total earnings summary

#### Notifications
- When new campaigns are available
- When they've earned a reward
- When payments are processed
- When campaign conditions change

---

### B. Admin Interface (SECONDARY)

Back office interface for campaign management.

#### Campaign Creation Flow
The basic campaign creation structure remains similar to existing festivals:
- Campaign name
- Campaign type
- Time period (start - end dates)
- Panel selection (Partner / Snap / Pishkhan)
- Participants selection
- Display settings

#### New Conditional Settings UI

#### Insurance Company Configuration (Max 10 companies)
For each insurance company, the following fields must be configurable:

| Field | Options |
|-------|---------|
| Insurance Company | Dropdown selection (Asia, Saman, Razi, etc.) |
| Insurance Category | Multiple selection (Third-party / Body / Health / ...) |
| Insurance Duration | 3 months / 6 months / 12 months / Free |
| Purchase Type | Cash / Touch Installment / Non-touch Installment |
| Reward Amount | Numeric input (in Tomans) |
| Reward Calculation Type | First purchase of day / All purchases |
| Reward Calculation Interval | Daily / Every 3 days / Every 4 days / Every 5 days / Weekly |

**Important UI Constraint:** 
- The "Reward Calculation Interval" must be uniform across all insurance companies in a single campaign
- Cannot mix intervals (e.g., daily for one company and weekly for another)

#### Example Configuration Table:

| Insurance Company | Category | Duration | Purchase Type | Reward | Calculation Type | Interval |
|------------------|----------|----------|---------------|--------|------------------|----------|
| Asia | Third-party / Body | 12 months | Cash | 1,000,000 Tomans | First purchase | Weekly |
| Saman | Third-party | 6/12 months | Touch/Non-touch installment | 1,000,000 Tomans | All purchases | Weekly |
| Razi | Body | 12 months | Cash | 500,000 Tomans | First purchase | Weekly |

## Features & Functionality

### Seller/Partner Features (PRIMARY FOCUS)

1. **Campaign Discovery & Browsing**
   - View all active campaigns they're eligible for
   - Filter campaigns by insurance company or category
   - See campaign deadlines and remaining time
   - Quick summary cards with key information

2. **Transparent Reward Information**
   - Clear display of reward amounts for each condition
   - Easy-to-understand "what earns what" breakdowns
   - Calculators to estimate potential earnings
   - Examples showing sample scenarios

3. **Real-time Sales Tracking**
   - Automatic detection of qualifying sales
   - Instant notification when a reward is earned
   - Visual progress indicators (e.g., "2 more sales to unlock bonus")
   - Daily/weekly performance summaries

4. **Earnings Dashboard**
   - Total earned (all time, this month, today)
   - Pending rewards awaiting payment
   - Payment history with transaction details
   - Breakdown by campaign and insurance company
   - Export functionality for personal records

5. **Campaign Understanding Tools**
   - Visual guides showing eligible products
   - Highlight best-earning opportunities
   - Alerts for special conditions (e.g., "first purchase only")
   - FAQ and help sections for each campaign

6. **Notifications & Alerts**
   - Push notifications for new campaigns
   - Alerts when rewards are earned
   - Payment confirmation notifications
   - Reminders for campaign deadlines
   - Updates when campaign conditions change

### Admin Features (SECONDARY)

1. **Multi-condition Campaign Builder**
   - Add up to 10 insurance companies per campaign
   - Independent conditions for each company
   - Multi-select capabilities for categories, durations, and purchase types

2. **Reward Calculation Logic**
   - **First Purchase of Day:** Only the first qualifying purchase from that company counts
   - **All Purchases:** All qualifying purchases within the calculation period count
   - **Settlement Requirement:** For daily campaigns, insurance settlements must be processed immediately

3. **Partner Management During Active Campaign**
   - Add or remove partners during the campaign (important for long-running campaigns: 3 months - 1 year)
   - **Critical Timing Rule:** Partner additions/removals must occur AFTER payment processing to avoid conflicts
   - Example: For daily reward intervals, partner changes take effect after end-of-day payment processing

4. **Partner Add/Remove Interface**
   - Search and select partner by partner number
   - Add or remove functionality with delayed activation
   - Clear indication of when changes will take effect (after next payment cycle)

5. **Campaign Analytics**
   - Total sales by campaign
   - Reward payouts by seller
   - Performance metrics
   - Export reports

## Technical Specifications

### System Architecture
This requires **TWO SEPARATE APPLICATIONS**:

1. **Seller/Partner Portal** (Primary - Mobile-First)
   - Responsive design optimized for mobile devices
   - Real-time data updates
   - Push notification support
   - Fast, lightweight interface

2. **Admin Back Office** (Secondary - Desktop)
   - Complex form handling
   - Analytics and reporting
   - Batch operations support

### Backend Requirements

#### For Seller Interface:
- **Real-time Sales Detection**: Integrate with sales system to detect qualifying purchases immediately
- **Reward Calculation Engine**: Calculate rewards based on complex conditions in real-time
- **Notification System**: Push, SMS, and email notifications
- **Payment Processing**: Automated reward disbursement on schedule
- **Sales History API**: Fast queries for seller's transaction history

#### For Admin Interface:
- Settlement verification for daily campaigns (third-party insurance focus)
- Payment processing aligned with reward calculation intervals
- Partner management system with delayed activation
- Support for multiple selection fields (categories, durations, payment types)
- Analytics engine for campaign performance

### Data Model

#### Core Entities:
- **Campaign**: Basic campaign information and settings
- **CampaignCondition**: Insurance company rules (1-to-many with Campaign)
- **Seller/Partner**: Seller information and panel assignment
- **CampaignParticipant**: Join table (Campaign + Seller) with activation timestamps
- **Sale**: Individual insurance sales transactions
- **Reward**: Calculated rewards (links Sale to Campaign)
- **Payment**: Reward payment records with transaction details

#### Key Relationships:
- Campaign → CampaignConditions (1:many)
- Campaign → CampaignParticipants (many:many through join table)
- Sale → Seller (many:1)
- Sale → Rewards (1:many - one sale can match multiple campaigns)
- Reward → Payment (many:1 - multiple rewards in one payment batch)

### Validation Rules
- Maximum 10 insurance companies per campaign
- Uniform reward calculation interval across all companies
- Partner changes only processed post-payment cycle
- Settlement status verification for daily campaigns
- Prevent duplicate reward calculations
- Validate sale eligibility before reward creation

### Integration Points
- **Sales System**: Real-time sale data feed
- **Payment Gateway**: For reward disbursement
- **Notification Service**: SMS, Push, Email
- **Authentication**: Single sign-on for sellers
- **Reporting**: Data warehouse for analytics

## User Workflows

### Seller/Partner Daily Workflow:
1. **Morning**: Check dashboard for active campaigns and today's opportunities
2. **During Sales**: Use calculator to determine best products for customer + maximum earnings
3. **After Each Sale**: Receive instant notification of earned reward (or why it didn't qualify)
4. **End of Day**: Review "Today's Earnings" summary
5. **Payment Day**: Receive notification of payment + updated earnings history

### Admin Campaign Workflow:
1. **Planning**: Define campaign strategy and target products
2. **Creation**: Use wizard to create campaign with complex conditions
3. **Review**: Preview and verify all conditions before publishing
4. **Activation**: Publish campaign → sellers immediately see it
5. **Monitoring**: Track performance in real-time analytics
6. **Management**: Add/remove sellers as needed during campaign
7. **Payment Processing**: Review and approve reward payments on schedule
8. **Analysis**: Evaluate campaign ROI and effectiveness

---

## Timeline & Milestones

### Phase 1: Seller/Partner Interface (Priority)
- Week 1-2: Dashboard and campaign browsing
- Week 3-4: Real-time sales tracking and earnings display
- Week 5-6: Payment history and notifications
- Week 7: Testing with pilot group of sellers

### Phase 2: Admin Interface
- Week 8-9: Campaign creation wizard
- Week 10: Participant management
- Week 11: Analytics and reporting
- Week 12: Testing and refinement

### Phase 3: Integration & Launch
- Week 13: Backend integration
- Week 14: End-to-end testing
- Week 15: Pilot launch with limited sellers
- Week 16: Full rollout

## Additional Notes

### Critical Success Factors

#### For Sellers (Primary Users):
1. **Simplicity**: Interface must be dead simple - sellers should understand campaigns in 30 seconds
2. **Trust**: 100% transparency in reward calculations - show exact math
3. **Speed**: Real-time updates are critical - sellers check their earnings constantly
4. **Mobile-First**: Most sellers use mobile devices exclusively
5. **Language**: Support both Farsi and English (Farsi primary)
6. **Offline Capability**: Show cached data when internet is unavailable

#### For Admins:
1. **Flexibility**: Support complex business rules without technical knowledge
2. **Safety**: Prevent errors that could cause payment disputes
3. **Audit Trail**: Complete history of all changes and payments

### Important Constraints
1. **Daily Campaigns:** Designed primarily for third-party insurance (as agreed with sales team)
2. **Settlement Timing:** Daily campaigns require immediate insurance settlement
3. **Interval Uniformity:** Cannot mix different reward calculation intervals in a single campaign
4. **Partner Management Safety:** All partner additions/removals must be synchronized with payment cycles
5. **Real-time Requirements:** Seller interface must show sales within 1 minute of transaction
6. **Payment Accuracy:** Zero tolerance for calculation errors - impacts seller trust

### Use Case Examples

#### Seller Scenario:
**Time: 9:00 AM**
- Ali (seller) opens app, sees 3 active campaigns
- Notices "Asia Third-party 12-month = 1M Tomans (First Purchase Only)"
- Has customer who needs third-party insurance

**Time: 10:30 AM**
- Ali sells Asia third-party 12-month policy
- Receives instant notification: "🎉 Earned 1,000,000 Tomans!"
- Dashboard updates: "Today's Earnings: 1,000,000 Tomans (Pending)"

**Time: 11:15 AM**
- Ali sells another Asia third-party policy
- Notification: "Sale recorded but no reward (already earned from Asia today - first purchase only)"

**Time: 8:00 PM**
- Ali receives notification: "Payment processed: 1,000,000 Tomans transferred to your account"
- Payment appears in earnings history

#### Admin Scenario:
**Monday Morning**
- Admin creates new campaign for March
- Adds Asia, Saman, Razi with different conditions
- Selects 50 sellers for participation
- Publishes campaign

**Monday 10:00 AM**
- All 50 sellers receive notification
- Campaign appears in their dashboard immediately

**Wednesday**
- Admin reviews analytics: 25 sellers active, 150 sales, 45M in rewards
- Notices low Razi participation
- Updates reward for Razi from 500K to 800K

**Friday Evening**
- Admin reviews payment queue: 45M in pending rewards for 25 sellers
- Approves payment batch
- System processes payments and notifies all sellers

This ensures no conflicts in payment calculations and maintains data integrity.


