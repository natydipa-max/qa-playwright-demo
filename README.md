# Playwright Automation Framework

Enterprise-style QA Automation framework built with Playwright + TypeScript

---

# Overview

This project was designed to simulate a real-world enterprise automation framework using:

- Page Object Model (POM)
- Reusable architecture
- BasePage abstraction
- Centralized constants and fixtures
- Clean assertions
- Stable synchronization strategies
- Positive and negative test scenarios

The goal is not only to automate tests, but also to demonstrate framework design, maintainability, and QA Automation engineering practices.

---

# Tech Stack

- TypeScript
- Node.js
- :contentReference[oaicite:1]{index=1}

---

# Project Structure

```txt
src/
├── core/
│   ├── constants/
│   ├── fixtures/
│   ├── helpers/
│   ├── utils/
├── types/
│
├── ui/
│   ├── components/
│   └── pages/
│
tests/
├── auth/
├── cart/
├── checkout/
└── inventory/
```

---

# Current Test Coverage

## Authentication

- Successful login
- Invalid credentials
- Locked user validation
- Required username validation
- Required password validation
- Logout flow

## Inventory

- Inventory page validation
- Product sorting
- Add/remove products to cart
- Multiple cart selections
- Product card validations

---

# Architecture Highlights

## Page Object Model (POM)

UI interactions are encapsulated into reusable page objects to improve readability and maintainability.

---

## Reusable UI Components

Reusable UI components were introduced to avoid duplicated selectors and improve maintainability as the application grows.

---

## BasePage Abstraction

Common behaviors and reusable assertions are centralized in a shared `BasePage`.

---

## Reusable Assertions

Custom reusable validations were implemented to avoid duplicated logic and improve test clarity.

---

## Centralized Test Data

Constants, routes, UI texts, and fixtures are separated from test logic to improve scalability and maintenance.

---

## Reliable Synchronization Strategy

`Promise.all()` is used for navigation synchronization in order to prevent flaky tests and race conditions during page transitions.

Example:

```ts
await Promise.all([
  page.waitForURL(new RegExp(ROUTES.INVENTORY)),
  loginPage.login(USERS.STANDARD.username, USERS.STANDARD.password),
]);
```

---

# Design Principles

- Composition over duplication
- Encapsulation of UI behavior
- Stable selectors using data-test attributes
- Reusable assertions
- Clear separation between pages and components
- Maintainable and readable test APIs

---

# Example Test Flow

```ts
const backpackItem = inventoryPage.getInventoryItem("Sauce Labs Backpack");

await backpackItem.addToCart();

await inventoryPage.header.assertCartBadgeCount(1);
```

Tests interact with reusable page and component APIs instead of raw selectors, improving readability and maintainability.

---

# Running Tests

## Run all tests

```bash
npx playwright test
```

---

## Run specific file

```bash
npx playwright test tests/smoke/login.spec.ts
```

---

## Run in UI mode

```bash
npx playwright test --ui
```

---

## Run headed browser

```bash
npx playwright test --headed
```

---

# Future Improvements

- API testing layer
- Custom Playwright fixtures
- Authentication via storage state
- CI/CD integration with GitHub Actions
- Docker execution support
- Test tagging strategy
- Cross-browser parallel execution optimization
- Reporting integration
- Visual regression testing

---

# Author

QA Automation portfolio project focused on scalable automation architecture and maintainable test design.
