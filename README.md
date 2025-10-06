# ContractFinderFront

> Front-end mobile application for **ContractFinder** — a platform that connects employers and employees for short-term or contract-based jobs.

---

## Overview

`ContractFinderFront` is a **React Native (Expo)** mobile application built using **TypeScript**.  
It serves as the front-end interface for the **ContractFinder** ecosystem, allowing users to:
- Create accounts as employers or employees,
- Browse and apply for short-term jobs,
- Post work offers,
- Manage applications,
- And communicate through a clean, user-friendly interface.

This application integrates directly with the backend service [`ContractFinderBack`](https://github.com/dr34ke/ContractFinderBack).

---

## Features

- **Authentication** (Login, Register, Logout)
- **User Profiles** and Preferences Management
- **Job Offers** Listing and Filtering
- **Applications** (Apply / Accept / Reject Work Offers)
- **Ratings and Reviews**
- **Notifications** and real-time status updates
- **Smooth Navigation** powered by React Navigation
- **Responsive UI** for both Android & iOS (Expo-compatible)

---

## Tech Stack

| Component | Technology |
|------------|-------------|
| Framework | **React Native** (Expo) |
| Language | **TypeScript** |
| State Management | Zustand (via `/src/stores/`) |
| API Layer | Custom API service (`src/api/apiService.ts`) |
| Navigation | React Navigation (`src/navigation/appNavigation.tsx`) |
| Storage | AsyncStorage wrapper (`src/helpers/StorageHelper.ts`) |
| Backend | [ContractFinderBack (Go + MongoDB)](https://github.com/dr34ke/ContractFinderBack) |
| Styling | React Native Styles / Custom Components |
| Build Tool | Expo CLI |

---

## Directory Layout
src/ </br>
├── App.tsx Main application entry </br>
├── api/ API integration and network logic </br>
│ └── apiService.ts </br>
├── components/ Reusable UI components (inputs, buttons, selectors) </br>
│ ├── OwnInput.tsx </br>
│ ├── ownButton.tsx </br>
│ ├── ownSelect.tsx </br>
│ └── ownSwitch.tsx </br>
├── constans/ Static constants (URLs, config) </br>
│ └── URLs.ts </br>
├── helpers/ Utility helpers (token, storage, etc.) </br>
│ ├── StorageHelper.ts </br>
│ └── TokenHelper.ts </br>
├── models/ TypeScript interfaces and models </br>
│ ├── Offer.ts </br>
│ ├── UserProfile.ts </br>
│ ├── WorkCategory.ts </br>
│ └── UserRating.ts </br>
├── navigation/ Application navigation stack </br>
│ └── appNavigation.tsx </br>
└── stores/ Global state management (Zustand stores) </br>
├── offersStore.ts </br>
├── userStore.ts </br>
└── usersProfile.ts </br>


<div align="center">
<table>
<tr>
<td align="center">
<b>Add Localisation</b><br>
<img src="docs/screenshots/add localisation.png" alt="Add Localisation" style="max-height:250px;">
</td>
<td align="center">
<b>Add New Offer</b><br>
<img src="docs/screenshots/add-new-offer.png" alt="Add New Offer" style="max-height:250px;">
</td>
<td align="center">
<b>Apply</b><br>
<img src="docs/screenshots/apply.png" alt="Apply" style="max-height:250px;">
</td>
</tr>

<tr>
<td align="center">
<b>Categories</b><br>
<img src="docs/screenshots/categories.png" alt="Categories" style="max-height:250px;">
</td>
<td align="center">
<b>Login</b><br>
<img src="docs/screenshots/login.png" alt="Login" style="max-height:250px;">
</td>
<td align="center">
<b>Notiffication</b><br>
<img src="docs/screenshots/notiffication.png" alt="Notiffication" style="max-height:250px;">
</td>
</tr>

<tr>
<td align="center">
<b>Offer</b><br>
<img src="docs/screenshots/offer.png" alt="Offer" style="max-height:250px;">
</td>
<td align="center">
<b>Offers Map</b><br>
<img src="docs/screenshots/offers-map.png" alt="Offers Map" style="max-height:250px;">
</td>
<td align="center">
<b>Offers</b><br>
<img src="docs/screenshots/offers.png" alt="Offers" style="max-height:250px;">
</td>
</tr>

<tr>
<td align="center">
<b>Preferences</b><br>
<img src="docs/screenshots/preferences.png" alt="Preferences" style="max-height:250px;">
</td>
<td align="center">
<b>Profile</b><br>
<img src="docs/screenshots/profile.png" alt="Profile" style="max-height:250px;">
</td>
<td align="center">
<b>Public Profile</b><br>
<img src="docs/screenshots/public-profile.png" alt="Public Profile" style="max-height:250px;">
</td>
</tr>

<tr>
<td align="center">
<b>Register</b><br>
<img src="docs/screenshots/register.png" alt="Register" style="max-height:250px;">
</td>
<td align="center">
<b>Sidemenu</b><br>
<img src="docs/screenshots/sidemenu.png" alt="Sidemenu" style="max-height:250px;">
</td>
</tr>
</table>
</div>
