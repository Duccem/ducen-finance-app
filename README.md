# PocketPlan - Personal and family finance tool

## Table of Contents

- [PocketPlan - Personal and family finance tool](#pocketplan---personal-and-family-finance-tool)
  - [Table of Contents](#table-of-contents)
  - [Introduction](#introduction)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Folder Structure](#folder-structure)
  - [Other links](#other-links)
  - [Contributing](#contributing)
  - [License](#license)
  - [Contact](#contact)


## Introduction

Welcome to **PocketPlan**, a mobile app designed to help you manage your personal and family finances easily and efficiently. With PocketPlan, you can track your income and expenses, set up budgets and financial goals, and maintain control of your finances with detailed reports.

## Features

- **Personal and family finance management**
- **Income and expense tracking**
- **Custom budget setup**
- **Detailed and graphical reports**
- **Cross-platform support (iOS and Android)**
- **Payment reminders and financial goal tracking**
- **Multi-user support for family management**

## Tech Stack

- **[React Native](https://reactnative.dev)**: For building native UI on IOS and Android.
- **[Expo](https://expo.dev)**: For quick multi-platform project management and deployment.
- **[Zustand](https://zustand-demo.pmnd.rs)**: For global state management.
- **[Clerk](https://clerk.com)**: For authentication
- **[React Navigation](https://reactnavigation.org)**: For in-app navigation
- **[Nativewind](https://www.nativewind.dev)**: For styling

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/en) (v16.x or later)
- [Expo CLI](https://docs.expo.dev/more/expo-cli/) (latest version)
- [npm](https://www.npmjs.com) or [yarn](https://yarnpkg.com)
- [Git](https://git-scm.com)

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Duccem/ducen-finance-app.git
   cd ducen-finance-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**:

   Create a `.env` file in the root directory and add the following variables:

   ```bash
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=clerk-publishable-key
   EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY=stripe-publishable-key
   EXPO_PUBLIC_SERVER_BASE_URL=https://localhost:3000
   ```

4. **Run the development server**:
   ```bash
   npm start
   # or
   yarn start
   ```

5. **Scan** the QR code using the Expo Go app on your mobile device (available on [App Store](https://www.apple.com/app-store/) and [Google Play](https://play.google.com/store/games?device=windows)).


### Folder Structure

```bash
ducen-finance-app/                        
├── src/                             # Project main folder
│   ├── app/                         # Expo app router 
│   ├── libs/                        # Aux libraries
│   │   ├── ui/                      # Custom own ui library
│   │   └── utils/                   # Utility functions
│   ├── modules/                     # Modules of DDD source code
│   │   ├── shared/                  # Shared modules across all apps                
│   │   └── [subdomain]/             # Correspondent module to a subdomain
│   ├── assets/                      
├── .env.example                
├── .eslintrc.js
├── .gitignore     
├── .prettierrc     
├── app.json     
├── babel.config.js     
├── expo-env.d.ts       
├── tailwind.config.ts     
├── tsconfig.ts     
├── README.md    
├── package.json     
└── index.js                          # Entry point of the app
```

## Other links

- [Changelog](https://github.com/Duccem/ducen-finance-app/blob/main/CHANGELOG.md)

## Contributing

- [José Véliz (Duccem)](https://github.com/Duccem)

<a href="https://github.com/duccem/ducen-finance-app/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=duccem/ducen-finance-app" />
</a>


## License

This project is licensed under the MIT License.

[License](https://github.com/Duccem/ducen-finance-app/blob/main/LICENSE)

## Contact

For any questions or inquiries, please contact us at [ducen29@gmail.com](mailto:ducen29@gmail.com).
