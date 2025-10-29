# Assets Organization Guide

## How to Add Images to Your Sustainability Dashboard

### 1. Logo (Cirqlex Logo)
- **Location**: `src/assets/logos/`
- **Recommended filename**: `cirqlex-logo.png` or `cirqlex-logo.svg`
- **Size**: 40px height (width will auto-scale)
- **Format**: PNG or SVG for best quality

### 2. Hero Section Image
- **Location**: `src/assets/images/`
- **Recommended filename**: `sustainability-hero.jpg`
- **Size**: 400px wide x 300px tall (or similar ratio)
- **Format**: JPG or PNG
- **Content**: Sustainability-themed image (solar panels, green energy, etc.)

### 3. User Avatar
- **Location**: `src/assets/images/`
- **Recommended filename**: `user-avatar.jpg`
- **Size**: 100px x 100px (square)
- **Format**: JPG or PNG
- **Content**: Professional headshot or avatar

### 4. Corporate Gifts/Products
- **Location**: `src/assets/images/`
- **Recommended filename**: `eco-products.jpg`
- **Size**: 600px wide x 300px tall
- **Format**: JPG or PNG
- **Content**: Eco-friendly corporate gifts (reusable bottles, bags, etc.)

## Steps to Add Images:

1. **Copy your images** to the appropriate folders above
2. **Uncomment the import lines** in `SustainabilityDashboard.jsx`:
   ```jsx
   import logo from '../assets/logos/cirqlex-logo.png';
   import heroImage from '../assets/images/sustainability-hero.jpg';
   import avatarImage from '../assets/images/user-avatar.jpg';
   ```
3. **Uncomment the img tags** in the component to replace placeholders
4. **Test** your dashboard to ensure images load properly

## Current Status:
✅ Folder structure created
✅ Component updated with image placeholders
✅ CSS styled for proper image display
⏳ Waiting for actual image files to be added

When you have your images ready, just follow the steps above!