# Campaign Dashboard Design System
## Complete Visual Language & Technical Specifications

> **Design Philosophy**: A business-calm, trustworthy dashboard aesthetic that communicates reliability, clarity, and effortless usability through soft neutrals, generous spacing, and sophisticated restraint.

---

## 📋 Core Requirements

- **Language**: Persian (Farsi)
- **Text Direction**: RTL (Right-to-Left)
- **Primary Font**: DanaVF ([Font File](DanaVF.ttf))
- **Target Platform**: Web (Desktop & Mobile responsive)
- **Design Personality**: Premium financial/insurance interface

---

## Table of Contents

1. [Design Philosophy & Aesthetic](#1-design-philosophy--aesthetic)
2. [Color System](#2-color-system)
3. [Typography](#3-typography)
4. [Spacing & Layout](#4-spacing--layout)
5. [Component Library](#5-component-library)
6. [Shadows & Elevation](#6-shadows--elevation)
7. [Responsive Behavior](#7-responsive-behavior)
8. [RTL Considerations](#8-rtl-considerations)
9. [Accessibility](#9-accessibility)
10. [Implementation Guidelines](#10-implementation-guidelines)

---

## 1. Design Philosophy & Aesthetic

### 1.1 Visual Character

The design system embodies a **"business-calm" dashboard aesthetic** — deliberately avoiding flashy elements in favor of:

- **Trust** — Communicates reliability and security
- **Clarity** — Information is easy to understand at a glance
- **Low-friction usability** — Effortless interaction patterns
- **Professional confidence** — Premium banking/insurance quality

### 1.2 Design Principles

#### Elevation, Not Decoration
> Shadows and visual effects exist solely to create hierarchy, never for decoration.

**Why**: Reduces visual noise, increases information density, improves scan-ability.

#### Generous Breathing Room
> Every element has ample whitespace around it — never dense or tight.

**Why**: Creates calm, organized screens that are effortless to read.

#### Subtle by Default, Bold When Necessary
> Most elements use regular/medium weights; bold is reserved exclusively for critical values.

**Why**: When everything is bold, nothing stands out. Restraint creates impact.

#### Soft, Not Saturated
> Colors are muted and reassuring, never harsh or demanding attention.

**Why**: Reduces cognitive load and eye strain during extended use.

### 1.3 Design DNA

If this design system were a person:

| Trait | Expression | Implementation |
|-------|------------|----------------|
| 🔒 **Trustworthy** | Financial/insurance visual language | Soft colors, professional spacing |
| 🧘 **Calm** | Quiet and structured | Ultra-soft shadows, generous whitespace |
| ✨ **Minimalistic** | Clean surfaces, zero visual noise | No gradients, no decorative elements |
| 📐 **Structured** | Clear card separation, organized hierarchy | 8px grid system, consistent spacing |
| 💼 **Professional** | No playful or decorative elements | Neutral typography, functional design |
| ☀️ **Warm** | Yellow/gold accent humanizes the interface | Warm accent prevents sterile feeling |
| 👥 **User-friendly** | Rounded shapes, readable spacing | 12-16px border radius, high contrast |

### 1.4 Design Balance

```
Corporate Reliability ⟷ Modern Friendliness
```

This system intentionally sits between traditional enterprise software (too cold) and consumer apps (too playful).

---

## 2. Color System

### 2.1 Design Philosophy

**UPDATED**: Unified color system across RTL and LTR versions

**Primary Accent: Indigo Blue**
- **Character**: Professional and trustworthy
- **Emotion**: Conveys reliability and confidence rather than urgency
- **Usage**: Highlights, CTAs, links, active states
- **Why**: Blue is universally associated with trust, stability, and professionalism — essential for a financial/insurance platform
- **Inspiration**: Modern Persian web applications (alibaba.ir, digikala.com) use blue as primary color for both RTL and LTR contexts

**Neutral Palette Strategy**
- Very light grey (almost white, but not pure white) for page background
- Pure white for cards — creates strong contrast
- Soft, gentle greys for borders and dividers
- **Why**: Pure white backgrounds lack hierarchy; the subtle grey creates depth

**Semantic Colors Pattern**
- Pastel background + Saturated text
- **Why**: Traditional solid semantic colors are too aggressive for extended viewing

### 2.2 Primary Color Palette

| Element | Color Name | Hex Code | Usage | Reasoning |
|---------|-----------|----------|-------|-----------|
| **Header Background** | Dark Grey | `#2C2C2C` or `#3A3A3A` | Top navigation bar | Creates clear visual boundary |
| **Sidebar Background** | Light Grey | `#F5F5F5` or `#F8F8F8` | Right navigation panel | Separates navigation from content |
| **Main Background** | Very Light Grey | `#FAFAFA` or `#FFFFFF` | Main content area | Not pure white — prevents eye strain |
| **Card Background** | Pure White | `#FFFFFF` | Content cards | Stands out against grey background |
| **Footer Background** | Dark Grey | `#2C2C2C` or `#3A3A3A` | Bottom footer | Bookends the interface |

### 2.3 Accent Colors

**UPDATED**: Color system unified across RTL and LTR versions, inspired by modern Persian web apps like alibaba.ir

| Element | Color | Hex Code | Usage | Why |
|---------|-------|----------|-------|-----|
| **Primary Action** | Indigo Blue | `#4F46E5` | CTAs, links, interactive elements | Professional, trustworthy |
| **Primary Dark** | Darker Indigo | `#4338CA` | Hover states | Provides interaction feedback |
| **Primary Light** | Light Indigo | `#818CF8` | Badges, secondary highlights | Softer variant |
| **Active State Background** | Very Light Indigo | `#EEF2FF` | Active navigation item | Subtle, not overwhelming |
| **Progress Bar Fill** | Green | `#10B981` | Progress indicators | Visually rewarding |

### 2.4 Text Colors

| Element | Color | Hex Code | Usage | Why |
|---------|-------|----------|-------|-----|
| **Header Text** | White/Light Grey | `#FFFFFF` or `#E0E0E0` | Navigation links in header | High contrast on dark background |
| **Sidebar Text (Default)** | Dark Grey | `#333333` or `#4A4A4A` | Navigation menu items | Readable but not harsh |
| **Sidebar Text (Active)** | Dark/Black | `#000000` or `#1A1A1A` | Active navigation item | Clear active state |
| **Main Content Text** | Dark Grey/Black | `#333333` or `#1A1A1A` | Body text | Maximum readability |
| **Secondary Text** | Medium Grey | `#666666` or `#7A7A7A` | Labels, metadata | Clear hierarchy |
| **Muted Text** | Light Grey | `#999999` or `#AAAAAA` | Less important info | Recedes appropriately |

### 2.5 Semantic Colors (Pastel Pattern)

**Design Pattern**: Light tinted background + Saturated text + Subtle border

| Type | Background | Text | Border | Usage |
|------|------------|------|--------|-------|
| **Success** | `#D1FAE5` (Light green) | `#059669` (Solid green) | `#A7F3D0` | Completed actions, confirmed |
| **Warning** | `#FEF3C7` (Light yellow) | `#D97706` (Medium orange) | `#FDE68A` | Attention needed, pending |
| **Danger/Expired** | `#FEE2E2` (Very light red) | `#DC2626` (Red) | `#FECACA` | Critical states, errors |
| **Info** | `#F1F3F5` (Very light grey) | `#6C757D` (Muted grey) | `#DEE2E6` | Neutral information |

**Why this pattern?**
- Maintains readability under all lighting conditions
- Softer on the eyes for extended viewing
- Still clearly communicates state
- Professional appearance

### 2.6 Tag/Badge Colors

| Type | Background | Text | Border | Usage |
|------|------------|------|--------|-------|
| **Default** | `#E8E8E8` or `#F0F0F0` | `#333333` | `#D0D0D0` (optional) | Insurance companies, fields |
| **Interactive** | `#E8E8E8` with hover | `#333333` | `#D0D0D0` | Clickable filter tags |

---

## 3. Typography

### 3.1 Design Philosophy

**Font Choice: DanaVF**
- Native Persian/Farsi support
- Elegant proportions
- Excellent readability at small sizes
- Variable font technology for performance

**Weight Strategy - Enhanced for RTL**
**UPDATED**: Persian text requires heavier font weights for optimal readability (inspired by alibaba.ir)

- **RTL (Persian)**: 
  - **Medium (500)**: Default for all body text (enhanced from 400)
  - **Semi-Bold (600)**: Section titles and emphasis (enhanced from 500)
  - **Bold (700)**: Headings, user names, and critical numerical values

- **LTR (English)**:
  - **Regular (400)**: Default for all body text
  - **Medium (500)**: Section titles and emphasis
  - **Bold (700)**: Reserved exclusively for user names and critical numerical values

**Why Enhanced Weights for Persian?**
- Persian script has different visual density than Latin script
- Heavier weights improve legibility in right-to-left layouts
- Matches user expectations from popular Persian websites
- Maintains visual hierarchy while improving readability

### 3.2 Type Scale

| Element | Size | Weight | Line Height | Usage | Reasoning |
|---------|------|--------|-------------|-------|-----------|
| **User Name** | 16-18px | Bold (700) | 1.2-1.3 | Profile, headers | Most important personal identifier |
| **Section Titles** | 16-18px | Medium (500) | 1.2-1.3 | Content headers | Clear hierarchy without being loud |
| **Header Logo** | 16-18px | Bold/Medium | 1.2 | Top left logo | Brand presence |
| **Header Nav** | 14-15px | Regular/Medium | 1.2-1.3 | Navigation links | Balanced with other header elements |
| **Sidebar Menu** | 14-15px | Regular | 1.4 | Navigation menu | Easy to scan |
| **Body Text** | 13-14px | Regular (400) | 1.5-1.6 | Main content | Optimal reading size |
| **Labels** | 12-13px | Regular | 1.4-1.5 | Form labels, metadata | Compact but readable |
| **Small Text** | 11-12px | Regular | 1.4 | Tags, badges, footnotes | Minimum readable size |

### 3.3 Typography Characteristics

**Line Height Strategy**
- **Body text**: 1.5-1.6 (generous for readability)
- **Headings**: 1.2-1.3 (tighter for visual impact)
- **Labels**: 1.4-1.5 (balanced)

**Letter Spacing**
- Normal (no additional spacing)
- Persian text naturally has good spacing

**Text Alignment**
- Right-aligned for RTL content
- Numbers may be left-aligned within right-aligned containers for better readability

### 3.4 Number Formatting

**Persian Digits**: ۰ ۱ ۲ ۳ ۴ ۵ ۶ ۷ ۸ ۹

**Formatting Rules**:
- Always use Persian digits for numbers
- Always bold numbers (makes them scannable)
- Use thousand separators: `۲,۵۰۰,۰۰۰`
- Currency format: `۲,۵۰۰,۰۰۰ تومان`

---

## 4. Spacing & Layout

### 4.1 Design Philosophy

**Foundation: 8px Base Unit**
- All spacing uses multiples of 8px
- Creates consistent vertical rhythm
- Mathematically balanced
- Scales well across devices

**Why 8px?**
- Divisible by 2 and 4 (flexible)
- Aligns with common screen resolutions
- Industry standard for modern UI design
- Creates perceivable differences between sizes

### 4.2 Spacing Scale

| Name | Value | Multiplier | Usage | When to Use |
|------|-------|------------|-------|-------------|
| **XS** | 4px | 0.5x | Tight spacing, icon padding | Very related elements |
| **SM** | 8px | 1x | Small gaps, compact spacing | Related elements |
| **MD** | 16px | 2x | Standard spacing, card padding | Default spacing |
| **LG** | 24px | 3x | Section spacing, large gaps | Separating sections |
| **XL** | 32px | 4x | Major section separation | Major content divisions |
| **2XL** | 40px | 5x | Large separation | Page sections |
| **3XL** | 48px | 6x | Extra large separation | Major breaks |

### 4.3 Component Spacing Guidelines

**Card Interior**
- Padding: 20-24px (SM-MD)
- Element gap: 12-16px (Between elements inside card)
- Section margin: 16-20px bottom (Between cards)

**Form Elements**
- Label to input: 8px (SM)
- Input to input: 16px (MD)
- Section to section: 24px (LG)

**Text Elements**
- Paragraph spacing: 12-16px
- List item spacing: 8-12px
- Line height: 1.5-1.6 (24px at 16px font size)

### 4.4 Layout Structure

#### Three-Column Layout
```
┌─────────────────────────────────────────────────────────┐
│ Header (Full Width) - Dark Grey - 60-70px              │
├─────────────────────────────────────────────────────────┤
│          │                                              │
│  Sidebar │          Main Content Area                   │
│ 250-300px│          (Flexible width)                    │
│ Lt Grey  │          Lt Grey/White                       │
│          │                                              │
│          │                                              │
├─────────────────────────────────────────────────────────┤
│ Footer (Full Width) - Dark Grey - 50-60px              │
└─────────────────────────────────────────────────────────┘
```

#### Layout Dimensions

| Element | Desktop | Tablet | Mobile | Why |
|---------|---------|--------|--------|-----|
| **Header Height** | 60-70px | 60px | 56px | Consistent touch target |
| **Sidebar Width** | 250-300px | Overlay | Hidden | Optimized for each size |
| **Content Max Width** | 1200px optional | Full | Full | Readable line length |
| **Card Padding** | 20-24px | 16-20px | 16px | Adapts to screen size |

---

## 5. Component Library

### 5.1 Cards

**Visual Properties**
```css
background: #FFFFFF (pure white)
border: 1px solid #E8E8E8 (optional)
border-radius: 12-16px
padding: 20-24px
margin-bottom: 16-20px
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04) (ultra-soft)
```

**Design Philosophy**
- Cards feel like "data modules" — clean, separated, easy to scan
- White on grey creates natural elevation
- Rounded corners (12-16px) are friendly and approachable
- Ultra-soft shadow creates separation without drama

**When to Use**
- Grouping related information
- Creating visual hierarchy
- Separating distinct content areas

### 5.2 Buttons

**UPDATED**: Buttons now use blue primary color for consistency

| Type | Style | Usage | Implementation |
|------|-------|-------|----------------|
| **Primary** | Solid blue background, white text | Important actions | `background: #4F46E5; color: white; border-radius: 12px; padding: 12-16px;` |
| **Secondary** | White/grey with outline | Secondary options | `background: white; border: 1px solid #E2E8F0; color: #475569;` |
| **Ghost** | Transparent with text | Tertiary actions | `background: transparent; color: #6B7280;` |

**Button Characteristics**
- Border radius: 12px
- Height: 44-48px (comfortable touch target)
- Padding: 12-16px horizontal
- Matte finish (not glossy)
- Font size: 15px
- Font weight: 
  - **RTL**: Semi-Bold (600) for better readability
  - **LTR**: Medium (500)

**Why Blue Primary?**
- Professional and trustworthy
- Consistent with industry standards
- Works well in both RTL and LTR contexts
- High contrast and accessible

### 5.3 Status Chips (Badges)

**Visual Signature**
```css
background: [Pastel tinted]
color: [Saturated color]
border: 1px solid [Lighter tint]
border-radius: 9999px (full pill)
padding: 4px 12px
font-size: 11px
font-weight: 400 (regular)
```

**Types & Colors**
- **Active**: Green pastel background
- **Pending**: Yellow pastel background
- **Completed**: Grey pastel background
- **New**: Blue pastel background
- **Expired**: Red pastel background

**Why Pill Shape?**
- Modern and friendly
- Less corporate than rectangular badges
- Visually distinct from cards and buttons
- Easier to scan quickly

**Why Small Text?**
- Status is secondary information
- Maintains visual hierarchy
- Doesn't compete with primary content

### 5.4 Progress Bars

**UPDATED**: Progress bars now use green fill for universal success indication

**Visual Anatomy**
```css
/* Track (Container) */
background: #F1F5F9 (light grey)
height: 6px
border-radius: 10px (rounded)
width: 100%

/* Fill */
background: #10B981 (green)
height: 100%
border-radius: 10px
width: [percentage]%
```

**Design Philosophy**
- Medium thickness (6px) — visible and accessible
- No gradients — pure simplicity
- Smooth rounded caps
- Green fill universally indicates progress/success

**Why 6px?**
- More visible than 4px, especially on mobile
- Better accessibility
- Matches modern web standards
- Professional appearance

### 5.5 Navigation

#### Header Navigation
```
Dark background (#2C2C2C)
White text (#FFFFFF)
Horizontal layout
20-24px spacing between items
Dropdown arrows (▼) for menus
60-70px height
```

#### Sidebar Navigation (Desktop)
```
Light grey background (#F5F5F5)
250-300px width
Vertical list
Icons + labels
Active state: Soft yellow background (#FFF4E6)
```

**Menu Item States**

| State | Background | Text Color | Indicator |
|-------|------------|------------|-----------|
| **Default** | Transparent | Dark Grey (#333333) | None |
| **Hover** | Slightly darker grey | Dark Grey | None |
| **Active** | Light Orange/Yellow (#FFF4E6) | Dark/Black (#000000) | Optional yellow left border |

#### Bottom Navigation (Mobile)
```
White background
4-5 items maximum
Icon + label
Current page highlighted
Fixed position at bottom
48-56px height
```

### 5.6 Forms

**Input Fields**
```css
border: 1px solid #D1D5DB
border-radius: 8px
padding: 10-12px 12-16px
font-size: 14px
background: white

/* Focus State */
border-color: #F59E0B
box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.1)
```

**Labels**
```css
font-size: 12-13px
font-weight: 400 (regular)
color: #6B7280
margin-bottom: 6-8px
```

**Why Simple Inputs?**
- Reduces visual noise
- Clear focus states
- Easy to scan
- Professional appearance

### 5.7 Tags (Insurance Companies & Fields)

**Container Properties**
```css
display: flex
flex-wrap: wrap
gap: 4-6px (between tags)
```

**Individual Tag**
```css
background: #E8E8E8 or #F0F0F0 (light grey)
color: #333333 (dark grey)
padding: 8-12px horizontal, 6-10px vertical
border-radius: 6-8px (rounded, not pill)
font-size: 12-13px
border: 1px solid #D0D0D0 (optional)
cursor: pointer (if clickable)

/* Hover State (if clickable) */
background: #E0E0E0 (slightly darker)
```

**Why Not Pills?**
- Status chips are pills (reserved for state)
- Tags are content (different visual treatment)
- Rectangular is more space-efficient for longer text
- Maintains clear visual hierarchy

---

## 6. Shadows & Elevation

### 6.1 Design Philosophy

> **"Elevation, not decoration."**

Shadows are ultra-light and used solely to create subtle card elevation. They should be almost imperceptible unless actively looking for them.

### 6.2 Shadow Levels

| Level | Use Case | CSS Value | When to Use |
|-------|----------|-----------|-------------|
| **Level 0** | Background | `none` | Page background, flat elements |
| **Level 1** | Cards | `0 1px 3px rgba(0, 0, 0, 0.04)` | Content cards, main interface elements |
| **Level 2** | Dropdowns | `0 2px 8px rgba(0, 0, 0, 0.1)` | Floating menus, tooltips |
| **Level 3** | Modals | `0 10px 40px rgba(0, 0, 0, 0.15)` | Modal dialogs, important overlays |

### 6.3 Shadow Characteristics

- **Blur**: Very soft
- **Opacity**: Very low (0.04-0.15)
- **Visibility**: Almost imperceptible on Level 1
- **Color**: Always black with opacity, never colored shadows

**Why Ultra-Soft?**
- Reduces visual noise
- Creates subtle depth without distraction
- Professional, not decorative
- Easier on the eyes
- Matches banking/financial aesthetic

---

## 7. Responsive Behavior

### 7.1 Breakpoints

| Size | Range | Layout | Strategy |
|------|-------|--------|----------|
| **Mobile** | < 768px | Single column | Stacked cards, hidden sidebar, bottom nav |
| **Tablet** | 768px - 1024px | Flexible | Collapsible sidebar, adjusted padding |
| **Desktop** | > 1024px | Three column | Full layout with fixed sidebar |

### 7.2 Mobile Adaptations (< 768px)

**Layout Changes**
- Sidebar hidden, accessible via hamburger menu
- Main content full width
- Cards stack vertically
- Bottom navigation appears
- Reduced padding (16px instead of 24px)
- Tags wrap to multiple lines

**Typography Adjustments**
- Minimum 14px for body text (better readability)
- Larger touch targets (44x44px minimum)
- Increased line height (1.6 instead of 1.5)

**Component Adjustments**
- Cards: 16px padding (reduced from 24px)
- Buttons: Full width or grouped
- Tables: Horizontal scroll or card layout
- Forms: Full width inputs

### 7.3 Tablet Adaptations (768px - 1024px)

**Layout Changes**
- Sidebar becomes overlay (slides in)
- Content area flexible width
- Maintains most desktop styling
- Responsive images and media

**Interaction Patterns**
- Touch-friendly (all clickable areas 44x44px+)
- Hover states work but not required
- Gestures supported (swipe, pinch)

### 7.4 Desktop Optimizations (> 1024px)

**Layout Enhancements**
- Fixed sidebar (always visible)
- Optional max-width for content (1200px)
- Multi-column layouts where appropriate
- Hover states fully utilized

**Advanced Features**
- Tooltips on hover
- Dropdown menus
- Complex data tables
- Advanced filtering interfaces

---

## 8. RTL Considerations

### 8.1 Layout Direction

**HTML Setup**
```html
<html lang="fa" dir="rtl">
```

**Core Principles**
- Text flows right-to-left
- Text aligns right
- Sidebar appears on right side
- Icons appear to the left of text (not right)
- Menus open to the left (not right)
- Dropdown arrows point left

### 8.2 Spacing Adjustments

**CSS Logical Properties (Recommended)**
```css
/* Instead of margin-left, use: */
margin-inline-start: 16px;

/* Instead of padding-right, use: */
padding-inline-end: 16px;

/* Instead of border-radius: 8px 0 0 8px, use: */
border-start-start-radius: 8px;
border-end-start-radius: 8px;
```

**Why Logical Properties?**
- Automatically flip for RTL
- Future-proof
- Cleaner code
- Better maintainability

### 8.3 Component Adjustments

**Navigation**
- Right-aligned text in sidebar
- Dropdowns open to left
- Arrows point left (◄ not ►)
- Active indicator on right edge (not left)

**Forms**
- Labels above or to right of inputs
- Required indicators on right
- Error messages align right
- Help text aligns right

**Icons**
- Directional icons flip (arrows, chevrons)
- Non-directional icons don't flip (search, home)
- Icon position: Right of text (RTL), left of text (LTR)

### 8.4 Typography for RTL

**Persian Number Formatting**
```javascript
// Convert to Persian digits
function toPersianNumber(num) {
    const persianDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, digit => persianDigits[digit]);
}

// Format currency
function formatCurrency(amount) {
    return toPersianNumber(amount.toLocaleString('fa-IR')) + ' تومان';
}
```

**Date Formatting**
- Use Persian calendar (Jalali)
- Format: ۱۴۰۳/۱۱/۰۴
- Always right-to-left

---

## 9. Accessibility

### 9.1 Color Contrast

**WCAG AA Compliance** (Minimum 4.5:1 for normal text)

| Combination | Contrast Ratio | Pass/Fail |
|-------------|----------------|-----------|
| Dark grey text on white | 12.6:1 | ✅ Pass AAA |
| Medium grey text on white | 4.6:1 | ✅ Pass AA |
| White text on dark header | 15.3:1 | ✅ Pass AAA |
| Yellow button text on button | 5.2:1 | ✅ Pass AA |
| Light grey text on white | 2.8:1 | ❌ Use sparingly |

### 9.2 Interactive Elements

**Focus States**
- Visible outline or border (3px)
- High contrast color (#F59E0B)
- Never remove focus indicators
- Keyboard accessible

**Touch Targets**
- Minimum 44x44px for all interactive elements
- Adequate spacing between targets (8px minimum)
- Clear visual feedback on interaction

**Hover States**
- Clear visual feedback
- Smooth transitions (200-300ms)
- Distinct from active and focus states

### 9.3 Typography Accessibility

**Readable Sizes**
- Minimum 12px for body text
- Minimum 11px for labels/metadata
- Never below 11px

**Line Height**
- 1.5-1.6 for body text (improves readability)
- 1.2-1.3 for headings (maintains visual impact)

**Font Weight**
- Sufficient contrast between weights
- Bold (700) clearly distinguishable from regular (400)

### 9.4 Semantic HTML

**Use Proper Elements**
```html
<!-- Good -->
<button>Click me</button>
<nav>...</nav>
<main>...</main>
<header>...</header>

<!-- Bad -->
<div onclick="...">Click me</div>
<div class="nav">...</div>
```

**Why?**
- Screen reader compatibility
- Keyboard navigation works automatically
- Better SEO
- More maintainable

---

## 10. Implementation Guidelines

### 10.1 CSS Variables (Recommended)

```css
:root {
    /* Colors - Primary */
    --primary-color: #F59E0B;
    --primary-dark: #D97706;
    --primary-light: #FEF3C7;
    
    /* Colors - Neutrals */
    --bg-page: #FAFAFA;
    --bg-card: #FFFFFF;
    --bg-sidebar: #F5F5F5;
    --bg-header: #2C2C2C;
    
    /* Colors - Text */
    --text-primary: #1A1A1A;
    --text-secondary: #666666;
    --text-muted: #999999;
    --text-on-dark: #FFFFFF;
    
    /* Colors - Semantic */
    --success-bg: #D1FAE5;
    --success-text: #059669;
    --warning-bg: #FEF3C7;
    --warning-text: #D97706;
    --danger-bg: #FEE2E2;
    --danger-text: #DC2626;
    --info-bg: #F1F3F5;
    --info-text: #6C757D;
    
    /* Spacing */
    --space-xs: 4px;
    --space-sm: 8px;
    --space-md: 16px;
    --space-lg: 24px;
    --space-xl: 32px;
    
    /* Border Radius */
    --radius-sm: 8px;
    --radius-md: 12px;
    --radius-lg: 16px;
    --radius-pill: 9999px;
    
    /* Shadows */
    --shadow-card: 0 1px 3px rgba(0, 0, 0, 0.04);
    --shadow-dropdown: 0 2px 8px rgba(0, 0, 0, 0.1);
    --shadow-modal: 0 10px 40px rgba(0, 0, 0, 0.15);
    
    /* Typography */
    --font-family: 'DanaVF', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    --text-xs: 11px;
    --text-sm: 12px;
    --text-base: 13px;
    --text-md: 14px;
    --text-lg: 16px;
    --text-xl: 18px;
}
```

### 10.2 Component Implementation Checklist

When building any component:

- [ ] Uses CSS variables for colors
- [ ] Follows 8px spacing system
- [ ] Border radius: 12-16px for cards, 8-12px for buttons
- [ ] Ultra-soft shadows (Level 1: 0.04 opacity)
- [ ] Typography: DanaVF font
- [ ] Text sizes: 11-18px range
- [ ] Bold reserved for critical values only
- [ ] RTL support (dir="rtl")
- [ ] Persian numbers (۰-۹)
- [ ] Accessible (WCAG AA)
- [ ] Mobile responsive
- [ ] Keyboard navigable
- [ ] High contrast
- [ ] Touch targets 44x44px+

### 10.3 Page Template

```html
<!DOCTYPE html>
<html lang="fa" dir="rtl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>عنوان صفحه - داشبورد کمپین</title>
    <link rel="stylesheet" href="styles-rtl.css">
</head>
<body>
    <header class="header">
        <!-- Navigation -->
    </header>
    
    <aside class="sidebar">
        <!-- Sidebar navigation -->
    </aside>
    
    <main class="main-content">
        <!-- Main content area -->
        <section class="card">
            <!-- Content cards -->
        </section>
    </main>
    
    <footer class="footer">
        <!-- Footer content -->
    </footer>
    
    <script src="script.js"></script>
</body>
</html>
```

### 10.4 Quality Assurance

**Visual Checklist**
- [ ] Colors match design system (yellow/gold primary)
- [ ] Shadows are ultra-soft and barely visible
- [ ] Border radius consistent (12-16px cards)
- [ ] Status chips are pill-shaped
- [ ] Spacing uses 8px increments
- [ ] Typography is DanaVF
- [ ] Text sizes are 11-18px
- [ ] Bold used sparingly

**Functional Checklist**
- [ ] All text in Persian
- [ ] Layout flows right-to-left
- [ ] Numbers use Persian digits
- [ ] All buttons/links functional
- [ ] Forms validate properly
- [ ] Mobile responsive (test on device)
- [ ] No console errors
- [ ] Accessible (keyboard test)

### 10.5 Common Patterns

**Card with Header**
```html
<div class="card">
    <div class="card-header">
        <h2 class="card-title">عنوان کارت</h2>
        <button class="card-action">عملیات</button>
    </div>
    <div class="card-body">
        <!-- Content -->
    </div>
</div>
```

**Status Chip**
```html
<span class="badge badge-success">فعال</span>
<span class="badge badge-warning">در انتظار</span>
<span class="badge badge-danger">منقضی شده</span>
```

**Progress Bar**
```html
<div class="progress-bar">
    <div class="progress-fill" style="width: 65%;"></div>
</div>
<div class="progress-label">۶۵٪ تکمیل شده</div>
```

**Primary Button**
```html
<button class="btn btn-primary">مشاهده جزئیات</button>
```

---

## 11. Quick Reference

### 11.1 One-Sentence Summary

> **Visual Style**: Clean, card-based, soft-rounded dashboard UI with light grey backgrounds, white elevated cards with ultra-soft shadows, generous 8px-based spacing, small neutral DanaVF typography, pastel semantic colors, warm gold/yellow accent, pill-shaped status chips, thin premium progress bars, minimal icons, and an overall calm, trustworthy tone resembling modern financial/insurance admin interfaces.

### 11.2 Key Measurements

```
Header Height:        60-70px
Sidebar Width:        250-300px (desktop)
Card Border Radius:   12-16px
Button Border Radius: 8-12px
Card Padding:         20-24px
Card Shadow:          0 1px 3px rgba(0,0,0,0.04)
Spacing Base:         8px
Font Sizes:           11px - 18px
Progress Bar Height:  4px
Status Chip Padding:  4px 12px
Touch Target Min:     44x44px
```

### 11.3 Color Quick Reference

```css
/* Most Used Colors - UPDATED */
Primary:          #4F46E5  /* Indigo blue (unified) */
Primary Dark:     #4338CA  /* Darker indigo */
Primary Light:    #818CF8  /* Light indigo */
Page Background:  #F8FAFC  /* Very light grey */
Card Background:  #FFFFFF  /* Pure white */
Primary Text:     #0F172A  /* Near black */
Secondary Text:   #475569  /* Medium grey */
Border:           #E2E8F0  /* Light grey */
Success:          #10B981  /* Green */
Warning:          #F59E0B  /* Orange */
Danger:           #EF4444  /* Red */
Info:             #3B82F6  /* Blue */
```

---

## 12. Design System Governance

### 12.1 When to Modify

**Allowed Modifications**
- Adjusting specific color values within the same hue family
- Fine-tuning spacing by ±4px
- Adding new semantic color variants (following pastel pattern)
- Creating new components using existing patterns

**Requires Review**
- Changing primary accent color
- Adding new font families
- Modifying shadow opacity
- Changing border radius strategy
- Adding gradients or visual effects

**Never Modify**
- 8px spacing system foundation
- RTL direction principles
- Accessibility standards
- Ultra-soft shadow philosophy
- Pill-shaped status chip pattern

### 12.2 Extending the System

When adding new components:

1. **Check existing patterns first** — Can you use an existing component?
2. **Follow existing principles** — New components should feel native
3. **Maintain consistency** — Use the same colors, spacing, shadows
4. **Document additions** — Update this guide with new patterns
5. **Test thoroughly** — Ensure accessibility and mobile responsiveness

---

## 13. Resources & References

### 13.1 Project Files

- **Font**: `DanaVF.ttf` — Persian variable font
- **Example Implementation**: See campaign dashboard HTML files
- **CSS System**: Reference implementation in project CSS files

### 13.2 External References

- **WCAG Guidelines**: [https://www.w3.org/WAI/WCAG21/quickref/](https://www.w3.org/WAI/WCAG21/quickref/)
- **RTL Best Practices**: [https://rtlstyling.com/](https://rtlstyling.com/)
- **Persian Typography**: [https://persiantypography.com/](https://persiantypography.com/)

### 13.3 Design Tools

**Recommended Tools**
- **Figma**: For mockups and prototypes
- **Contrast Checker**: For accessibility validation
- **RTL Preview**: Browser extensions for RTL testing
- **Device Testing**: BrowserStack or actual devices

---

## Conclusion

This design system provides a complete foundation for building professional, accessible, and user-friendly interfaces for the campaign dashboard. The emphasis on restraint, clarity, and trustworthiness creates a calm environment where users can focus on their tasks without visual distractions.

**Key Takeaways:**
- **UPDATED**: Indigo blue primary color (unified across RTL/LTR) conveys trust and professionalism
- **UPDATED**: Enhanced font weights for Persian text improve readability
- Ultra-soft shadows create subtle elevation
- 8px spacing system ensures consistency
- Unified color system across all language versions
- Pastel semantic colors reduce visual aggression
- RTL support with enhanced typography is built into the foundation
- Accessibility is a core principle, not an afterthought
- Inspiration from successful Persian web applications (alibaba.ir)

By following these guidelines, you'll create interfaces that are both beautiful and functional, striking the perfect balance between corporate reliability and modern friendliness.

---

**Document Version**: 2.0  
**Last Updated**: November 26, 2025  
**Status**: Complete & Production-Ready (Updated with unified RTL/LTR system)  
**Authors**: Senior UI/UX Design Team

**Version 2.0 Updates**:
- ✅ Unified color system across RTL and LTR versions (blue primary)
- ✅ Enhanced font weights for Persian text readability
- ✅ Updated all component specifications to match modern web standards
- ✅ Inspired by successful Persian web applications (alibaba.ir)
- ✅ Maintained accessibility and usability standards

