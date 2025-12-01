# Documentation Organization Guide

## Overview

This document explains how the project documentation is organized and where to find different types of information.

---

## Directory Structure

```
campaign/
├── README.md                    # Main project overview (start here)
├── docs/                        # Active documentation
│   ├── DOCUMENTATION-INDEX.md   # Navigation hub (this is your map)
│   ├── DOCUMENTATION-INDEX.html # Interactive version
│   │
│   ├── DESIGN-SYSTEM.md         # Complete design specifications
│   ├── RTL-IMPLEMENTATION-GUIDE.md # Persian/RTL guide
│   ├── PROJECT-GUIDE.md         # Architecture and structure
│   │
│   ├── project-brief.md         # Requirements
│   ├── user-stories.md          # User stories (English)
│   ├── user-stories.fa.md       # User stories (Persian)
│   ├── user-stories-birthday-campaign.md # Birthday campaign stories
│   │
│   ├── CAMPAIGN-TYPE-SYSTEM.md  # Campaign encoding specification
│   ├── Designing Effective Leaderboards — UX Guidelines.md
│   │
│   └── implementation/          # Implementation summaries
│       ├── README.md
│       ├── BIRTHDAY-CAMPAIGN-IMPLEMENTATION.md
│       └── CAMPAIGN-TYPE-IMPLEMENTATION.md
│
└── archive/                     # Historical documentation
    ├── ALL-FIXES-COMPLETE.md
    ├── FINAL-IMPROVEMENTS.md
    ├── PATH-FIXES-SUMMARY.md
    ├── RTL-REFACTORING-*.md
    └── ... (other historical files)
```

---

## Documentation Categories

### 1. Active Documentation (`docs/`)

**Purpose**: Current, actively maintained documentation for development and reference.

#### Core Guides
- **DESIGN-SYSTEM.md**: Visual language, components, styling rules
- **RTL-IMPLEMENTATION-GUIDE.md**: Persian/RTL conversion guide
- **PROJECT-GUIDE.md**: Architecture, structure, implementation status

#### Requirements
- **project-brief.md**: Complete project requirements
- **user-stories.md** / **user-stories.fa.md**: User stories in both languages
- **user-stories-birthday-campaign.md**: Birthday campaign specific stories

#### Specifications
- **CAMPAIGN-TYPE-SYSTEM.md**: Campaign encoding format specification
- **Designing Effective Leaderboards — UX Guidelines.md**: UX guidelines

#### Implementation Summaries (`docs/implementation/`)
- Historical records of how features were implemented
- Useful for understanding existing code
- Reference for maintenance and updates

---

### 2. Archived Documentation (`archive/`)

**Purpose**: Historical records of completed work, fixes, and improvements.

**Contains**:
- Fix summaries (path fixes, compatibility fixes, etc.)
- Improvement records (UI improvements, layout changes, etc.)
- Refactoring notes (RTL refactoring, reorganization summaries)
- Legacy documentation (old RTL guides, deprecated formats)

**When to check**: 
- Understanding project history
- Finding why certain decisions were made
- Reference for completed work

---

## Quick Navigation

### I need to...

| Task | Location |
|------|----------|
| **Get started** | `README.md` (root) |
| **Find documentation** | `docs/DOCUMENTATION-INDEX.md` |
| **Understand design** | `docs/DESIGN-SYSTEM.md` |
| **Convert to Persian** | `docs/RTL-IMPLEMENTATION-GUIDE.md` |
| **Understand architecture** | `docs/PROJECT-GUIDE.md` |
| **Check requirements** | `docs/project-brief.md` |
| **Read user stories** | `docs/user-stories.md` |
| **Understand campaign encoding** | `docs/CAMPAIGN-TYPE-SYSTEM.md` |
| **See implementation details** | `docs/implementation/` |
| **Find historical info** | `archive/` |

---

## Documentation Maintenance

### Adding New Documentation

1. **Active docs** → Place in `docs/`
2. **Implementation summaries** → Place in `docs/implementation/`
3. **Historical/fix records** → Move to `archive/` after completion

### Updating Documentation

- Keep `DOCUMENTATION-INDEX.md` updated when adding new docs
- Update this file if structure changes significantly
- Maintain cross-references between related documents

### Archiving Documentation

Move to `archive/` when:
- Work is complete and no longer actively referenced
- Document is superseded by newer version
- Document is historical record only

---

## Best Practices

### For Readers
1. Start with `README.md` for overview
2. Use `DOCUMENTATION-INDEX.md` to find specific topics
3. Check `docs/` for active documentation
4. Check `archive/` only for historical context

### For Writers
1. Place new active docs in `docs/`
2. Update `DOCUMENTATION-INDEX.md` when adding docs
3. Move completed work summaries to `archive/`
4. Keep documentation focused and well-organized

---

## File Naming Conventions

- **Core guides**: UPPERCASE with hyphens (e.g., `DESIGN-SYSTEM.md`)
- **User stories**: lowercase with hyphens (e.g., `user-stories.md`)
- **Implementation summaries**: UPPERCASE with hyphens (e.g., `BIRTHDAY-CAMPAIGN-IMPLEMENTATION.md`)
- **Archived files**: Keep original names for traceability

---

*Last Updated: December 2025*  
*This organization ensures easy navigation and maintenance of project documentation.*

