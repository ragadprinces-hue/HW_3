# Product Requirements Document (PRD)
## Virtual University Events Guide Website

---

## 1. Overview

### 1.1 Purpose
Build a responsive multi-page website that displays university events using front-end technologies only (HTML, CSS, JavaScript, Bootstrap).

### 1.2 Goals
- Display events in a clear and attractive way
- Provide easy navigation between pages
- Add basic interactivity (slider, filtering, validation)
- Ensure responsive design across all devices
- Support Arabic and English languages

---

## 2. Technology Stack

### 2.1 Core Technologies
- HTML5 (structure)
- CSS3 (styling)
- JavaScript (interactivity)

### 2.2 Framework
- Bootstrap (via CDN)

---

## 3. Website Structure

### Pages:
- `index.html` (Home)
- `events.html` (All Events)
- `event.html` (Event Details)
- `about.html` (About)
- `contact.html` (Contact)

---

## 4. Global Layout Requirements

Each page must include:
- Header (Logo + Navbar)
- Main content
- Footer (contact info + copyright)

Navigation:
- Fully functional links between all pages
- Responsive Navbar (Bootstrap)

---

## 5. Functional Requirements

---

### 5.1 Home Page (`index.html`)

#### Sections:
- Header (Logo + Navbar)
- Featured Events section
  - Slider OR horizontal cards (JavaScript)
- Categories section
  - Buttons or Badges (e.g., Culture, Sports, Music)
- Latest Events section
  - Cards grid layout
- Footer

#### Features:
- Event slider (JavaScript)
- Responsive layout using Bootstrap Grid / Flexbox

---

### 5.2 Events Page (`events.html`)

#### Features:
- Display events as Cards:
  - Image
  - Title
  - Date
  - Location
  - Category
  - Short description

- Filtering system:
  - Filter by category
  - Filter by date
  - Filter by location

- Each event includes:
  - "View Details" button → links to `event.html`

---

### 5.3 Event Details Page (`event.html`)

#### Content:
- Event title
- Date & time
- Location
- Static map image
- Full description
- Image gallery

#### Features:
- "Add to Calendar" button (UI only)
- "Share" button (UI only)
- Related Events section (cards or links)

---

### 5.4 About Page (`about.html`)

#### Content:
- Platform description
- Vision and mission
- Team section:
  - Images
  - Names
  - Roles

- Basic publishing policies

---

### 5.5 Contact Page (`contact.html`)

#### Form Fields:
- Name
- Email
- Message

#### Features:
- JavaScript validation:
  - Required fields
  - Email format validation

- Bootstrap Alerts:
  - Success message
  - Error message

- Additional contact info:
  - Email
  - Social media links

---

## 6. JavaScript Requirements

- Slider for featured events (Home page)
- Filtering functionality (Events page)
- Form validation (Contact page)
- Display feedback messages using Alerts

---

## 7. CSS & Design Requirements

- Responsive design (mobile, tablet, desktop)
- Use Flexbox / Grid + Bootstrap Grid
- Clean and consistent color palette
- Readable typography (e.g., Cairo, Tajawal)
- Event-focused visual style

---

## 8. Bootstrap Requirements

Must use:
- Grid system (layout)
- Navbar
- Cards
- Forms
- Buttons
- Badges
- Alerts

Optional:
- Modal

---

## 9. File Structure

/assets
/css
styles.css
/js
main.js
/img
...
index.html
events.html
event.html
about.html
contact.html

---

## 10. Multi-Language Support

### Supported Languages:
- Arabic (RTL)
- English (LTR)

### Features:
- Language toggle button (AR / EN)
- Dynamic content switching using JavaScript

### Requirements:
- Proper RTL layout for Arabic
- Font compatibility
- Text managed via JSON or JavaScript object

---

## 11. Optional Features (Bonus)

- Modal for event booking (UI only)
- Scroll-to-top button
- Dark mode toggle
- Save filter preferences using localStorage

---

## 12. Quality Requirements

- Clean and organized code
- Consistent design across pages
- Working navigation links
- No obvious UI or functional errors
- Clear comments in CSS and JavaScript

---

## 13. Success Criteria

- All pages implemented correctly
- Responsive design across devices
- Functional JavaScript features (slider, filter, validation)
- Proper use of Bootstrap components
- Smooth user experience

---