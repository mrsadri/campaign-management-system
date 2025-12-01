# Campaign Type System Documentation

> **Version**: 1.0  
> **Last Updated**: November 26, 2025  
> **Purpose**: Complete specification for the Campaign Type encoding system

---

## Table of Contents

1. [Overview](#overview)
2. [Campaign Type Structure](#campaign-type-structure)
3. [Component Definitions](#component-definitions)
4. [Campaign Code Formation Rules](#campaign-code-formation-rules)
5. [Examples](#examples)
6. [Parsing Guide](#parsing-guide)
7. [Implementation Notes](#implementation-notes)

---

## Overview

The Campaign Type system provides a flexible, string-based encoding format for defining sales campaigns with complex conditional logic. This format allows administrators to specify:

- **Refresh Period**: How often the campaign resets (daily, weekly, monthly)
- **Sales Conditions**: Which sales qualify (all, 1st, 2nd, 3rd sale in period)
- **Insurance Companies**: Multiple companies with different conditions
- **Insurance Policy Types**: Categories of insurance products
- **Reward Structures**: Different rewards for cash vs. installment sales

### Key Benefits

- **Compact Representation**: All campaign logic in a single string
- **Mergeable Campaigns**: Up to 3 campaign codes can be combined
- **Flexible Rewards**: Different rates for cash and BNPL (Buy Now Pay Later) sales
- **Time-Based Logic**: Supports various refresh and settlement periods

---

## Campaign Type Structure

A Campaign Type string follows this format:

```
RefreshPeriod_SalesCondition_InsuranceCompanies_PolicyTypes_RewardStructure
```

### Example

```
Day-1_All_Razi||saman||Iran_ThirdParty|Body|Fire_4%cash_2%bnpl
```

**Breakdown:**
- `Day-1` = Refresh Period
- `All` = Sales Condition
- `Razi||saman||Iran` = Insurance Companies (separated by `||`)
- `ThirdParty|Body|Fire` = Policy Types (separated by `|`)
- `4%cash_2%bnpl` = Reward Structure

---

## Component Definitions

### 1. Refresh Period

**Definition**: Shows the refresh period of the campaign - how often the campaign conditions reset.

**Possible Values:**

| Value | Description |
|-------|-------------|
| `Day` | Daily sales are considered (campaign refreshes every day) |
| `Day-1` | Daily sales, with specific day interval (e.g., Day-1, Day-2) |
| `Week` | Weekly sales are considered (campaign refreshes every week) |
| `Month` | Monthly sales are considered (campaign refreshes every month) |

**Notes:**
- The refresh period does **not repeat continuously** within merged campaigns
- If one, two, or three campaigns are merged, they all share the same refresh period
- The refresh period determines the settlement period for all companies in the campaign

**Examples:**
- `Day` → Campaign resets daily
- `Week` → Campaign resets weekly
- `Month` → Campaign resets monthly

---

### 2. Sales Condition

**Definition**: Specifies which sales within the refresh period qualify for rewards.

**Possible Values:**

| Value | Description |
|-------|-------------|
| `All` | All sales in that period qualify for rewards |
| `1st` | Only the first sale in that period qualifies |
| `2nd` | Only the second sale in that period qualifies |
| `3rd` | Only the third sale in that period qualifies |

**Notes:**
- The number suffix indicates how many times per refresh period this campaign is calculated and settled
- If multiple campaigns are merged, they all have the same settlement period
- For `1st`, `2nd`, `3rd`: Only that specific numbered sale qualifies (e.g., `2nd` means ONLY the 2nd sale counts)

**Examples:**
- `All` → Every qualifying sale earns a reward
- `1st` → Only the first qualifying sale of the day/week/month earns
- `2nd` → Only the second qualifying sale of the period earns

---

### 3. Insurance Company Names

**Definition**: Names of insurance companies that are eligible for this campaign.

**Format**: Multiple companies separated by `||` (double pipe)

**Examples:**
- `Razi` → Single company
- `Razi||saman` → Two companies
- `Razi||saman||Iran` → Three companies

**Notes:**
- Companies are listed sequentially
- Case sensitivity may vary (lowercase is common)
- Valid company names: Razi, saman, Iran, Asia, Parsian, etc.

**Common Insurance Companies:**
- `Razi` - Razi Insurance Company
- `saman` - Saman Insurance Company
- `Iran` - Iran Insurance Company
- `Asia` - Asia Insurance Company
- `Parsian` - Parsian Insurance Company
- `Pasargad` - Pasargad Insurance Company
- `Alborz` - Alborz Insurance Company
- `Dana` - Dana Insurance Company

---

### 4. Insurance Policy Types

**Definition**: Types of insurance policies that qualify for rewards.

**Format**: Multiple policy types separated by `|` (single pipe)

**Examples:**
- `ThirdParty` → Only third-party liability insurance
- `ThirdParty|Body` → Third-party or body insurance
- `ThirdParty|Body|Fire` → Third-party, body, or fire insurance

**Notes:**
- Policy types are mentioned sequentially
- Common policy types:
  - `ThirdParty` - Third-party liability insurance
  - `Body` - Body/collision insurance
  - `Fire` - Fire insurance
  - `Health` - Health insurance
  - `Life` - Life insurance
  - `Comprehensive` - Comprehensive insurance

---

### 5. Reward Structure

**Definition**: Reward amounts for cash sales and installment (BNPL) sales.

**Format Options:**

#### Format 1: Different Rates for Cash and BNPL
```
{percentage}%cash_{percentage}%bnpl
```

**Example:** `4%cash_2%bnpl`
- 4% reward for cash sales
- 2% reward for BNPL (installment) sales

#### Format 2: Uniform Cashback (Same for Both)
```
{percentage}%cb
```

**Example:** `3%cb`
- 3% cashback for both cash and BNPL sales

#### Format 3: Cash Sales Only
```
{percentage}%cash
```

**Example:** `7%cash`
- 7% reward for cash sales only
- No reward for BNPL sales

#### Format 4: BNPL Sales Only
```
{percentage}%bnpl
```

**Example:** `5%bnpl`
- 5% reward for BNPL sales only
- No reward for cash sales

**Notes:**
- The numbers in each campaign can be different
- `cash` = Cash payment method
- `bnpl` = Buy Now Pay Later (installment payment method)
- `cb` = Cashback (applies to both payment types)

---

## Campaign Code Formation Rules

### Rule 1: Single Campaign Code

A single campaign code follows the format:
```
RefreshPeriod_SalesCondition_InsuranceCompanies_PolicyTypes_RewardStructure
```

**Example:**
```
Day-1_All_Razi||saman||Iran_ThirdParty|Body|Fire_4%cash_2%bnpl
```

### Rule 2: Merged Campaign Codes

**Up to three campaign codes can be placed consecutively to form a combined sales campaign.**

**Format for Merged Campaigns:**
```
CampaignCode1||CampaignCode2||CampaignCode3
```

**Example:**
```
Day_All_Razi_ThirdParty_4%cash||Week_1st_saman_Body_5%cash||Month_All_Iran_Fire_3%cb
```

**Important Constraints:**

1. **Refresh Period Uniformity**: All merged campaigns must have the same refresh period
   - ❌ Invalid: `Day_All_Razi_ThirdParty_4%cash||Week_1st_saman_Body_5%cash`
   - ✅ Valid: `Day_All_Razi_ThirdParty_4%cash||Day_1st_saman_Body_5%cash`

2. **Settlement Period Uniformity**: All merged campaigns share the same settlement period
   - If campaigns are merged, they all settle at the same time

3. **Refresh Period Non-Repetition**: The refresh period does not repeat continuously
   - When merged, the refresh period applies once for all campaigns together

### Rule 3: Separator Usage

| Separator | Usage | Example |
|-----------|-------|---------|
| `_` (underscore) | Separates main components | `Day_All_Razi_ThirdParty_4%cash` |
| `\|\|` (double pipe) | Separates insurance companies | `Razi\|\|saman\|\|Iran` |
| `\|` (single pipe) | Separates policy types | `ThirdParty\|Body\|Fire` |
| `\|\|` (double pipe) | Separates merged campaigns | `Campaign1\|\|Campaign2` |

**Note**: In the reward structure, `_` separates cash and BNPL rates, while `%` indicates percentage.

---

## Examples

### Example 1: Simple Daily Campaign

**Campaign Type:**
```
Day_All_Razi_ThirdParty_5%cash_3%bnpl
```

**Interpretation:**
- **Refresh Period**: Daily
- **Sales Condition**: All sales
- **Insurance Company**: Razi only
- **Policy Type**: Third-party insurance only
- **Reward**: 5% for cash, 3% for BNPL

**Meaning:**
- Every qualifying sale from Razi third-party insurance earns a reward
- Cash sales get 5%, installment sales get 3%
- Campaign resets daily

---

### Example 2: First Sale Only Campaign

**Campaign Type:**
```
Week_1st_saman||Iran_Body|Fire_7%cash
```

**Interpretation:**
- **Refresh Period**: Weekly
- **Sales Condition**: First sale only
- **Insurance Companies**: Saman or Iran
- **Policy Types**: Body or Fire insurance
- **Reward**: 7% for cash sales only (no BNPL reward)

**Meaning:**
- Only the first qualifying sale per week earns a reward
- Must be from Saman or Iran
- Must be Body or Fire insurance
- Only cash sales qualify (7% reward)
- Campaign resets weekly

---

### Example 3: Multiple Companies and Policies

**Campaign Type:**
```
Day-1_All_Razi||saman||Iran_ThirdParty|Body|Fire_4%cash_2%bnpl
```

**Interpretation:**
- **Refresh Period**: Daily (Day-1)
- **Sales Condition**: All sales
- **Insurance Companies**: Razi, Saman, or Iran
- **Policy Types**: Third-party, Body, or Fire
- **Reward**: 4% cash, 2% BNPL

**Meaning:**
- All qualifying sales from any of the three companies qualify
- Any of the three policy types qualify
- Different rewards for cash (4%) vs. installment (2%)
- Campaign resets daily

---

### Example 4: Uniform Cashback Campaign

**Campaign Type:**
```
Month_All_Asia_ThirdParty_3%cb
```

**Interpretation:**
- **Refresh Period**: Monthly
- **Sales Condition**: All sales
- **Insurance Company**: Asia only
- **Policy Type**: Third-party only
- **Reward**: 3% cashback (same for both cash and BNPL)

**Meaning:**
- All qualifying sales from Asia third-party insurance
- 3% reward regardless of payment method
- Campaign resets monthly

---

### Example 5: BNPL-Only Campaign

**Campaign Type:**
```
Week_2nd_Parsian_Health_6%bnpl
```

**Interpretation:**
- **Refresh Period**: Weekly
- **Sales Condition**: Second sale only
- **Insurance Company**: Parsian only
- **Policy Type**: Health insurance only
- **Reward**: 6% for BNPL sales only

**Meaning:**
- Only the second qualifying sale per week earns
- Must be Parsian health insurance
- Only installment sales qualify (6% reward)
- Cash sales don't qualify
- Campaign resets weekly

---

### Example 6: Merged Campaigns

**Campaign Type:**
```
Day_All_Razi_ThirdParty_4%cash||Day_1st_saman_Body_5%cash_2%bnpl||Day_All_Iran_Fire_3%cb
```

**Interpretation:**
- Three separate campaigns merged together, all on daily refresh
- **Campaign 1**: `Day_All_Razi_ThirdParty_4%cash`
  - Daily, all sales, Razi, Third-party, 4% cash only
- **Campaign 2**: `Day_1st_saman_Body_5%cash_2%bnpl`
  - Daily, first sale only, Saman, Body, 5% cash / 2% BNPL
- **Campaign 3**: `Day_All_Iran_Fire_3%cb`
  - Daily, all sales, Iran, Fire, 3% cashback

**Notes:**
- All campaigns share the same daily refresh period ✅
- They all settle at the same time
- A seller can earn from multiple campaigns if their sale qualifies

---

## Parsing Guide

### Step-by-Step Parsing Algorithm

1. **Check for Merged Campaigns**
   - Split by `||` to get individual campaign codes (if any)

2. **Parse Each Campaign Code**
   - Split by `_` to get main components
   - Expected components: `[RefreshPeriod, SalesCondition, Companies, Policies, Reward]`

3. **Parse Refresh Period**
   - Extract from first component
   - Validate: `Day`, `Day-{number}`, `Week`, `Month`

4. **Parse Sales Condition**
   - Extract from second component
   - Validate: `All`, `1st`, `2nd`, `3rd`

5. **Parse Insurance Companies**
   - Extract from third component
   - Split by `||` to get individual companies
   - Validate company names

6. **Parse Policy Types**
   - Extract from fourth component
   - Split by `|` to get individual policy types
   - Validate policy type names

7. **Parse Reward Structure**
   - Extract from fifth component
   - Check format:
     - `{n}%cash_{m}%bnpl` → Different rates
     - `{n}%cb` → Uniform cashback
     - `{n}%cash` → Cash only
     - `{n}%bnpl` → BNPL only
   - Extract percentages

### Parsing Example

**Input:**
```
Day-1_All_Razi||saman||Iran_ThirdParty|Body|Fire_4%cash_2%bnpl
```

**Parsing Steps:**

1. **Not merged** (no `||` at top level)
2. **Split by `_`**: 
   ```
   ["Day-1", "All", "Razi||saman||Iran", "ThirdParty|Body|Fire", "4%cash_2%bnpl"]
   ```
3. **Refresh Period**: `Day-1` ✅
4. **Sales Condition**: `All` ✅
5. **Insurance Companies**: Split `Razi||saman||Iran` by `||` → `["Razi", "saman", "Iran"]`
6. **Policy Types**: Split `ThirdParty|Body|Fire` by `|` → `["ThirdParty", "Body", "Fire"]`
7. **Reward Structure**: `4%cash_2%bnpl`
   - Pattern: `{n}%cash_{m}%bnpl`
   - Cash: 4%
   - BNPL: 2%

**Resulting Data Structure:**
```javascript
{
  refreshPeriod: "Day-1",
  salesCondition: "All",
  companies: ["Razi", "saman", "Iran"],
  policyTypes: ["ThirdParty", "Body", "Fire"],
  reward: {
    cash: 4,
    bnpl: 2
  }
}
```

---

## Implementation Notes

### Validation Rules

1. **Refresh Period Validation**
   - Must be one of: `Day`, `Day-{number}`, `Week`, `Month`
   - For merged campaigns, all must have the same refresh period

2. **Sales Condition Validation**
   - Must be one of: `All`, `1st`, `2nd`, `3rd`
   - Numeric conditions must match the settlement frequency

3. **Insurance Companies**
   - Minimum 1 company required
   - Maximum: No hard limit, but typically 1-10 companies
   - Company names should be validated against a whitelist

4. **Policy Types**
   - Minimum 1 policy type required
   - Common types: ThirdParty, Body, Fire, Health, Life, Comprehensive
   - Should validate against allowed policy types

5. **Reward Structure**
   - Must match one of the four formats
   - Percentages must be positive numbers
   - Cannot have both `%cash` and `%cb` in same campaign
   - Cannot have both `%bnpl` and `%cb` in same campaign

### Data Structure Recommendations

```javascript
// Single Campaign Type
{
  refreshPeriod: "Day" | "Day-{n}" | "Week" | "Month",
  salesCondition: "All" | "1st" | "2nd" | "3rd",
  companies: string[],
  policyTypes: string[],
  reward: {
    cash?: number,    // Percentage for cash sales
    bnpl?: number,    // Percentage for BNPL sales
    uniform?: number  // Percentage for uniform cashback (if cashback)
  }
}

// Merged Campaigns
{
  campaigns: CampaignType[],
  sharedRefreshPeriod: string,
  sharedSettlementPeriod: string
}
```

### Business Logic Considerations

1. **Settlement Timing**
   - The refresh period determines when campaigns reset
   - Settlement must occur after the refresh period ends
   - For daily campaigns: settle at end of day
   - For weekly campaigns: settle at end of week
   - For monthly campaigns: settle at end of month

2. **Sales Condition Logic**
   - `All`: Count every qualifying sale
   - `1st`: Only count the first qualifying sale in the period
   - `2nd`: Only count the second qualifying sale in the period
   - `3rd`: Only count the third qualifying sale in the period
   - Track sales per company, per period

3. **Reward Calculation**
   - Check if sale matches company and policy type
   - Check if sale matches payment type (cash/BNPL)
   - Check sales condition (which sale in period)
   - Calculate reward based on percentage

4. **Merged Campaigns**
   - A single sale can qualify for multiple campaigns
   - Each campaign is evaluated independently
   - Rewards are cumulative (seller can earn from all qualifying campaigns)

### Integration with UI

The Campaign Type string can be:
- **Generated** from the admin campaign creation form
- **Parsed** to display campaign details to sellers
- **Validated** before saving campaigns
- **Transformed** for reward calculation engine

---

## Related Documentation

- [Project Guide](./PROJECT-GUIDE.md) - Overall system architecture
- [Project Brief](./project-brief.md) - Business requirements
- [Design System](./DESIGN-SYSTEM.md) - UI/UX specifications

---

**Document Version**: 1.0  
**Last Updated**: November 26, 2025  
**Status**: Complete Specification

