# KKP Transports

## Overview

KKP Transports is a professional transportation services website showcasing a logistics company specializing in trailer, container, and open truck transportation services. The website features a multilingual interface supporting English, Tamil, and Hindi, with a focus on highlighting the company's fleet capabilities, service offerings, and client portfolio. The site emphasizes reliability and comprehensive transportation solutions for various cargo types.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Static Website**: Pure HTML, CSS, and JavaScript implementation without frameworks
- **Responsive Design**: Mobile-first approach with CSS Grid and Flexbox layouts
- **Multi-language Support**: Client-side internationalization using data attributes and JavaScript translation system
- **Component Structure**: Modular CSS with custom properties for consistent theming
- **Asset Management**: SVG-based graphics and placeholder system for scalable visuals

### Styling and Theming
- **CSS Custom Properties**: Centralized color scheme using taupe, twine, gurkha, and zorba color palette
- **Typography System**: Multi-font family support for different languages (Noto Sans variants)
- **Background Patterns**: Indian-themed SVG patterns for cultural branding
- **Mobile Navigation**: Hamburger menu system for responsive mobile experience

### Language System
- **Client-side Translation**: JavaScript-based language switching with localStorage persistence
- **Data Attribute Pattern**: HTML data attributes for storing translations (data-en, data-ta, data-hi)
- **Dynamic Content Updates**: Real-time language switching without page reload
- **Form Localization**: Dynamic placeholder text updates based on selected language

### Content Management
- **Static Content**: Hard-coded content with translation data attributes
- **Fleet Information**: Structured vehicle type categorization (containers, trailers, open body vehicles)
- **Service Catalog**: Comprehensive transportation service listings
- **Client Showcase**: Customer testimonial and client listing sections

## External Dependencies

### CDN Resources
- **Font Awesome 6.0.0**: Icon library for UI elements and navigation
- **Google Fonts**: Noto Sans font families for multilingual typography support
  - Noto Sans (Latin)
  - Noto Sans Tamil
  - Noto Sans Devanagari

### Browser APIs
- **LocalStorage**: For persisting user language preferences
- **DOM Manipulation**: Native JavaScript for dynamic content updates

### Asset Requirements
- **SVG Graphics**: Logo placeholders and decorative patterns
- **Image Assets**: Fleet vehicle images and company branding materials

Note: The current implementation is a static website with no backend services, databases, or server-side processing. All functionality is handled client-side through vanilla JavaScript. The website uses only HTML, CSS, and JavaScript without any external dependencies or SVG graphics - all images use standard JPG/PNG formats for easy manual insertion.