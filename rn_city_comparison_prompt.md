# React Native City Comparison Screen - Development Prompt

## Overview
Create a React Native screen that replicates the City Comparison Tool from the provided web app code. The screen should maintain identical design, colors, functionality, and content while adapting to mobile-native patterns.

## Design Requirements

### Color Palette
- Primary: `#0d98ba`
- Primary Light (10% opacity): `#0d98ba` with opacity 0.1
- Primary Border (20% opacity): `#0d98ba` with opacity 0.2
- Text Primary: `#0d171b`
- Text Secondary: `#4c809a`
- Background: `#f8fafc` to `#ffffff` (linear gradient alternative: use solid `#f8fafc`)
- Card Background: `#ffffff`
- Border: `#e5e7eb` (gray-200)
- Section Background: `#f8fafc`

### Typography
- Main Heading: 24-28px, bold, color `#0d171b`
- Section Headings: 18-20px, bold, color `#0d171b`
- Body Text: 14-16px, regular, color `#4c809a`
- Small Text: 12-14px, regular, color `#4c809a`
- Button Text: 14px, semi-bold

### Spacing & Layout
- Container padding: 16-20px horizontal
- Card padding: 24-32px
- Card border radius: 16px
- Icon container size: 40-48px (large), 32px (small)
- Icon container border radius: 12px
- Gap between sections: 24px
- Grid gap: 16px

## Core Features to Implement

### 1. Header Section
- Display app icon (map pin SVG) in rounded container with primary color background (10% opacity)
- Title: "City Comparison Tool"
- Description: "Compare living costs, tuition fees, and opportunities across different study destinations. Select up to 4 cities for detailed analysis."
- When cities are selected, show:
  - Selection counter badge: "X / 4 Cities Selected" with primary background
  - "Clear All" button with border and hover/press states

### 2. City Selection Section
- Section header with search icon
- Search bar with:
  - Left-aligned search icon
  - Placeholder: "Search by city or country name..."
  - Clear button (X) when text is entered
  - Focus state with primary color ring
- Display cities in grid format (2 columns on mobile)
- Each city card (CityCard component) should show:
  - City name
  - Country
  - Flag or icon
  - Selection state (border highlight when selected)
  - Press to select/deselect
- "Show All X Cities" / "Show Less" toggle button when more than 6 cities
- Empty state message when no search results

### 3. Comparison Results (shown when cities are selected)

#### Cost Breakdown Section
- Section header with dollar sign icon
- Display CostBreakdown component
- Table/list format comparing costs across selected cities

#### Visual Analysis Section
- Section header with bar chart icon
- Display VisualComparison component
- Charts/graphs showing cost comparisons

#### Smart Tips Section
- Section header with info icon
- 2x2 grid layout (1 column on small screens)
- Four tip cards with:
  1. **Budget Planning**: "Include all expenses: accommodation, food, transport, tuition, and personal costs."
  2. **Currency Fluctuation**: "Exchange rates vary over time. Plan with a buffer for currency changes."
  3. **Hidden Costs**: "Remember visa fees, health insurance, textbooks, and emergency funds."
  4. **Quality of Life**: "Consider climate, culture, language barriers, and social opportunities."
- Each card has icon, title, and description

### 4. Empty State (shown when no cities selected)
- Large centered icon (map pin)
- Heading: "Ready to Compare Cities?"
- Description: "Select cities from above to see detailed cost comparisons, living expenses, and educational opportunities side by side."
- Info badge: "Select up to 4 cities to begin"

### 5. Currency Converter Section
- Section at bottom of screen
- Display CurrencyConverter component

## Technical Requirements

### State Management
```typescript
- selectedCities: string[] (max 4 cities)
- searchTerm: string
- showAllCities: boolean
- availableCities: City[] (from data source)
```

### Key Interactions
1. **City Selection**:
   - Press to toggle selection
   - Limit to 4 cities maximum
   - If 4 selected and user selects 5th, remove oldest selection
   - Visual feedback on selection state

2. **Search**:
   - Filter cities by name or country
   - Clear search functionality
   - Case-insensitive matching

3. **Show More/Less**:
   - Initially show 6 cities
   - Toggle to show all filtered results

4. **Clear All**:
   - Reset all selections
   - Return to empty state

### URL Parameters Handling (Deep Linking)
- Support `?search=` parameter to pre-select city from search
- Support `?city=` parameter to pre-select specific city by name

## Components to Create

### Main Component
- `CityComparisonScreen.tsx` - Main container with ScrollView

### Child Components (referenced, assume they exist)
- `CityCard` - Individual city selection card
- `CostBreakdown` - Cost comparison table/list
- `VisualComparison` - Charts and graphs
- `CurrencyConverter` - Currency conversion tool

### Required Types
```typescript
interface City {
  id: string;
  name: string;
  country: string;
  // ... other properties from citiesData
}
```

## Icons (Use React Native Vector Icons or SVG)
All icons should be stroke-based with strokeWidth="2":
- Map pin (location)
- Search (magnifying glass)
- Close/Clear (X)
- Dollar sign
- Bar chart
- Info circle
- Currency/exchange
- People/community
- Alert/warning
- Chevron down

## UI/UX Notes
- Use ScrollView for main container
- Implement proper keyboard handling for search input
- Add loading states if data fetches asynchronously
- Implement smooth animations for:
  - City selection feedback
  - Show more/less transitions
  - Button press states
- Ensure proper touch target sizes (minimum 44x44)
- Handle safe area insets appropriately

## Data Structure
Assume data is imported from `@/utils/data`:
- `citiesData` - Array of City objects
- `searchCities(query: string)` - Function to search cities

## Platform Considerations
- Use React Native's Pressable for interactive elements
- Implement proper haptic feedback on selections
- Ensure text is readable on both iOS and Android
- Use platform-specific shadows (elevation on Android, shadowColor on iOS)

## Accessibility
- Add proper labels for screen readers
- Ensure color contrast meets WCAG standards
- Make all interactive elements accessible
- Support dynamic font sizing

## Performance Optimization
- Use FlatList for city grid if list is very long
- Implement proper key extraction for lists
- Memoize filtered cities calculation
- Avoid unnecessary re-renders

## Styling Approach
- Use StyleSheet.create for all styles
- Keep consistent spacing using a spacing scale (4, 8, 16, 24, 32)
- Maintain consistent border radius (8, 12, 16)
- Use flexbox for layouts

## Deliverable
A complete React Native screen component that:
1. Matches the web design exactly (colors, spacing, typography)
2. Implements all interactive features
3. Handles edge cases (no results, max selection, etc.)
4. Follows React Native best practices
5. Is production-ready with proper error handling
6. Includes proper TypeScript typing