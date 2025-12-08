# Feature Flags

This document explains how to enable or disable features on the Joey Jazwinski website.

## Configuration File

The feature flags are located in `src/config/features.ts`.

## Available Features

### Blogs (`BLOGS_ENABLED`)

-   **Default**: `false` (disabled)
-   **Description**: Controls whether blog functionality is available
-   **When disabled**:
    -   Blog links are removed from navigation (desktop and mobile)
    -   Blog links are removed from footer
    -   Hero section blog button is hidden

### Courses (`COURSES_ENABLED`)

-   **Default**: `false` (disabled)
-   **Description**: Controls whether course functionality is available
-   **When disabled**:
    -   Course links are removed from navigation (desktop and mobile)
    -   Course links are removed from footer
    -   Hero section course button is hidden

### Newsletter (`NEWSLETTER_ENABLED`)

-   **Default**: `true` (enabled)
-   **Description**: Controls whether newsletter subscription is available
-   **When disabled**:
    -   Newsletter subscription form is hidden from the CTA section

## How to Enable/Disable Features

1. Open `src/config/features.ts`
2. Change the value of the feature you want to toggle:
    ```typescript
    export const FEATURES = {
    	BLOGS_ENABLED: true, // Change to true to enable
    	COURSES_ENABLED: true, // Change to true to enable
    	NEWSLETTER_ENABLED: false, // Change to false to disable
    } as const;
    ```
3. Save the file
4. Restart your development server if it's running

## Mobile Responsiveness

The site has been optimized for mobile devices with:

-   Responsive text sizing (smaller on mobile, larger on desktop)
-   Responsive padding and spacing
-   Improved grid layouts that stack properly on mobile
-   Better touch targets for mobile users
-   Responsive navigation with improved mobile menu

All sections now use Tailwind's responsive breakpoints:

-   `sm:` - Small devices (640px and up)
-   `md:` - Medium devices (768px and up)
-   `lg:` - Large devices (1024px and up)
