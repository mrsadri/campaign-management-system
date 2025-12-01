# DESIGN-SYSTEM.md RTL Quick Reference 🎯

## Critical Specifications

### Progress Bars (Section 5.4)
```css
height: 4px;                    /* Thin, premium - NOT 10px */
background: #E8E8E8;
fill: #FFD700;                  /* Gold */
border-radius: 9999px;
```
**Why 4px?** Banking/financial aesthetic, like Apple Health

### Tags - Companies/Insurance (Section 5.7)
```css
background: #E8E8E8;
color: #333333;
padding: 6px 12px;
border-radius: 6px;             /* NOT pill-shaped (NOT 9999px) */
font-size: 12-13px;
```
**Why NOT Pills?** Different from status chips, maintains hierarchy

### Status Chips - Badges (Section 5.3)
```css
background: [Pastel];
color: [Saturated];
padding: 4px 12px;
border-radius: 9999px;          /* Pill-shaped */
font-size: 11px;
font-weight: 400;
```
**Why Pills?** Reserved for status indicators only

---

## Color Palette

```css
/* Primary */
--primary-color: #F59E0B;        /* Warm gold */
--primary-dark: #D97706;         /* Darker gold */
--progress-fill: #FFD700;        /* Progress bars */

/* Backgrounds */
--header-bg: #2C2C2C;            /* Dark grey */
--sidebar-bg: #F5F5F5;           /* Light grey */
--main-bg: #FAFAFA;              /* Very light grey */
--card-bg: #FFFFFF;              /* Pure white */

/* Text */
--text-primary: #1A1A1A;         /* Near black */
--text-secondary: #666666;       /* Medium grey */
--text-muted: #999999;           /* Light grey */

/* Tags */
--tag-bg: #E8E8E8;               /* Light grey */
--tag-text: #333333;             /* Dark grey */
```

---

## Spacing (8px Base Unit)

```css
--space-xs: 4px;     /* 0.5x */
--space-sm: 8px;     /* 1x */
--space-md: 16px;    /* 2x */
--space-lg: 24px;    /* 3x */
--space-xl: 32px;    /* 4x */
```

---

## Border Radius

```css
--radius-sm: 8px;        /* Buttons */
--radius-md: 12px;       /* Cards */
--radius-lg: 16px;       /* Large cards */
--radius-pill: 9999px;   /* Status chips ONLY */
```

**Note**: Tags use 6-8px (sm/md), NOT pill!

---

## Shadows (Ultra-Soft)

```css
--shadow-card: 0 1px 3px rgba(0, 0, 0, 0.04);
```
**Philosophy**: "Elevation, not decoration"

---

## Typography

```css
--text-xs: 11px;     /* Tags, small text */
--text-sm: 12px;     /* Labels */
--text-base: 13px;   /* Body text */
--text-md: 14px;     /* Standard */
--text-lg: 16px;     /* Section titles */
--text-xl: 18px;     /* Page titles */
```

**Weights**: Mostly Regular (400) & Medium (500)  
**Bold (700)**: Critical values only

---

## Key Differences from Generic UI

| Element | Generic UI | DESIGN-SYSTEM.md | Why |
|---------|-----------|------------------|-----|
| **Progress bars** | 8-12px | **4px** | Premium, banking aesthetic |
| **Company tags** | Pill | **6-8px rounded** | Visual hierarchy |
| **Status chips** | Varied | **Pill** | Reserved for status |
| **Button text** | White | **Dark (#1F2937)** | Gold background needs dark text |
| **Shadows** | Visible | **Ultra-soft (0.04)** | Business-calm, not flashy |

---

## Business-Calm Aesthetic

- **Trust** > Trendiness
- **Clarity** > Creativity
- **Calm** > Exciting
- **Function** > Flash

**This is a professional financial/insurance interface.**

---

## Quick Checklist

- [ ] Progress bars are 4px (not 8-12px)
- [ ] Company tags have 6-8px radius (not 9999px)
- [ ] Status chips are pill-shaped (9999px)
- [ ] Shadows are ultra-soft (0.04 opacity)
- [ ] Spacing uses 8px multiples
- [ ] Typography is mostly regular/medium weight
- [ ] Primary color is warm gold (#F59E0B)
- [ ] Button text is dark on gold background

---

**Reference**: DESIGN-SYSTEM.md (Complete Visual Language)  
**Version**: 3.0  
**Status**: ✅ Production Ready

