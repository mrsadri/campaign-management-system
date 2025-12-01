# Campaign Type System Implementation

> **Status**: ✅ Complete  
> **Date**: November 26, 2025  
> **Feature**: Campaign Type encoding and decoding on both Admin and Seller interfaces

---

## Overview

The Campaign Type System has been fully implemented on both sides of the platform:

1. **Admin Side**: Generates Campaign Type strings from campaign configuration
2. **Seller Side**: Parses and displays Campaign Type strings in readable format

---

## Files Created/Modified

### New Files

1. **`src/campaign-type-utils.js`** (469 lines)
   - Core utility library for encoding and decoding Campaign Type strings
   - Contains validation, parsing, and formatting functions
   - Used by both admin and seller interfaces

### Modified Files

#### Admin Interface

1. **`src/admin/en/create-campaign.html`**
   - Added Campaign Type utility script reference
   - Added Campaign Type display section in review step (Step 4)

2. **`src/admin/campaign-form.js`**
   - Added `generateCampaignTypeString()` function
   - Integrated Campaign Type generation in review step
   - Stores Campaign Type string with campaign data on save/publish

#### Seller Interface

1. **`src/seller/en/campaign-detail.html`**
   - Added Campaign Type utility script reference
   - Added Campaign Type information display section
   - Added JavaScript to parse and display Campaign Type data

2. **`src/seller/styles.css`**
   - Added CSS styling for Campaign Type display section
   - Styled cards, badges, and information rows

3. **`src/seller/script.js`**
   - Added sample Campaign Type string to mock campaign data

---

## Features Implemented

### Admin Side (Campaign Creation)

#### 1. Campaign Type Generation
- Automatically generates Campaign Type string from form data
- Groups companies by similar conditions
- Validates generated string format
- Displays in review step before publishing

#### 2. Campaign Type Display
- Shows generated Campaign Type string in Step 4 (Review)
- Blue highlighted section for visibility
- Displays validation status
- Copy-friendly format

#### 3. Storage
- Campaign Type string is stored with campaign data
- Saved in both draft and published campaigns
- Available in localStorage for demo purposes

**Location**: Review Step (Step 4) in campaign creation wizard

---

### Seller Side (Campaign Details)

#### 1. Campaign Type Parsing
- Parses Campaign Type strings into readable components
- Handles both single and merged campaigns
- Extracts all relevant information:
  - Refresh period
  - Sales condition
  - Insurance companies
  - Policy types
  - Reward structure

#### 2. Readable Display
- Shows Campaign Type information in a dedicated section
- Displays refresh period and qualification rules
- Lists eligible companies and policy types
- Shows reward structure clearly
- Explains sales condition logic

#### 3. Visual Design
- Card-based layout matching existing design system
- Color-coded information
- Clear labels and values
- Responsive design

**Location**: Campaign Detail page, above "Important Rules" section

---

## Campaign Type Format

The system encodes campaigns in the following format:

```
RefreshPeriod_SalesCondition_InsuranceCompanies_PolicyTypes_RewardStructure
```

### Example

```
Day_All_Razi||saman||Iran_ThirdParty|Body|Fire_4%cash_2%bnpl
```

**Breakdown**:
- `Day` = Daily refresh period
- `All` = All sales qualify
- `Razi||saman||Iran` = Three insurance companies
- `ThirdParty|Body|Fire` = Three policy types
- `4%cash_2%bnpl` = 4% for cash, 2% for BNPL

---

## How It Works

### Encoding Flow (Admin)

1. User fills out campaign form (Steps 1-3)
2. Adds insurance companies with conditions
3. Reviews campaign (Step 4)
4. **Campaign Type string is automatically generated**
5. String is displayed for review
6. String is saved with campaign data

### Decoding Flow (Seller)

1. Seller views campaign detail page
2. System checks if campaign has `campaignType` field
3. **Campaign Type string is parsed** into components
4. Information is displayed in readable format
5. Seller sees:
   - How often campaign resets
   - Which sales qualify
   - Which companies/policies are eligible
   - Reward structure

---

## Technical Implementation

### Encoding Logic

```javascript
// Generate Campaign Type from form data
const campaignTypeStr = CampaignTypeUtils.encodeCampaignType({
    companies: formData.companies,
    interval: formData.basicInfo.interval
});
```

The encoder:
- Maps calculation interval to refresh period
- Groups companies by conditions
- Normalizes company and category names
- Encodes reward structure based on payment types
- Combines multiple campaigns with `||` separator

### Decoding Logic

```javascript
// Parse Campaign Type string
const parsed = CampaignTypeUtils.parseCampaignType(campaignTypeStr);

// Generate seller-friendly summary
const summary = CampaignTypeUtils.generateSellerSummary(campaignTypeStr);
```

The decoder:
- Splits merged campaigns if present
- Parses each component (refresh, condition, companies, etc.)
- Formats names for display
- Extracts reward percentages
- Creates human-readable descriptions

---

## Testing

### Admin Side

1. **Create a campaign**:
   - Fill out basic information
   - Add insurance companies
   - Navigate to Review step
   - **Verify**: Campaign Type string appears in blue section

2. **Validate generation**:
   - Add companies with different conditions
   - Check if string format is correct
   - **Verify**: String follows expected format

### Seller Side

1. **View campaign with Campaign Type**:
   - Open campaign detail page
   - **Verify**: Campaign Type section appears above "Important Rules"

2. **Check parsed information**:
   - Verify refresh period is displayed
   - Verify sales condition is clear
   - Verify companies and policy types are listed
   - Verify reward structure is understandable

---

## Sample Data

Mock campaign data includes a sample Campaign Type string:

```javascript
{
    id: 1,
    name: 'Summer Insurance Special 2025',
    campaignType: 'Day_All_Razi||saman||Iran_ThirdParty|Body|Fire_4%cash_2%bnpl',
    // ... other fields
}
```

---

## Future Enhancements

1. **Separate Cash/BNPL Rewards**
   - Currently uses uniform cashback for both
   - Could support separate rates like `4%cash_2%bnpl`

2. **Percentage vs Fixed Amount**
   - Currently estimates percentage from amount
   - Could add explicit percentage field in form

3. **Campaign Type Editor**
   - Allow admins to manually edit Campaign Type string
   - Validate before saving

4. **Batch Operations**
   - Generate Campaign Type for multiple campaigns
   - Bulk validation

5. **Persian/RTL Support**
   - Translate Campaign Type display to Persian
   - Add RTL styling

---

## Integration Points

### With Backend (Future)

- **Store**: Campaign Type string in database
- **API**: Return Campaign Type in campaign API responses
- **Validation**: Server-side validation of Campaign Type format
- **Reward Calculation**: Use Campaign Type for reward engine

### With Reward Engine (Future)

- Parse Campaign Type to determine eligibility
- Check sales condition (1st, 2nd, 3rd, All)
- Apply refresh period logic
- Calculate rewards based on structure

---

## Documentation

- **Specification**: `docs/CAMPAIGN-TYPE-SYSTEM.md` (Complete specification)
- **This File**: Implementation details
- **Code Comments**: Inline documentation in utility file

---

## Status Summary

✅ **Admin Side**: Campaign Type generation and storage  
✅ **Seller Side**: Campaign Type parsing and display  
✅ **Utility Library**: Complete encoder/decoder  
✅ **Validation**: Format validation  
✅ **Styling**: Integrated with design system  
✅ **Testing**: Ready for testing with mock data  

---

**Implementation Complete** 🎉

