# Playwright Automation Framework

![Playwright Tests](https://github.com/natydipa-max/qa-playwright-demo/actions/workflows/playwright.yml/badge.svg)

Enterprise-style QA Automation framework built with Playwright and TypeScript.

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

- Playwright
- TypeScript
- Node.js
- GitHub Actions

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
├── inventory/
├── fixtures/
│   └── pages.ts
└── setup/
    └── auth.setup.ts
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

## Storage State Authentication

Authentication is handled using Playwright Storage State.

A dedicated setup project performs the login once and stores the authenticated session, allowing tests to start already authenticated without repeating UI login steps.

This reduces execution time and keeps tests focused on business scenarios instead of authentication flows.

---

## Custom Playwright Fixtures

Custom fixtures are used to provide page objects already initialized and ready to use.

This keeps tests concise, reduces setup duplication, and improves readability.

---

# Design Principles

- Composition over duplication
- Encapsulation of UI behavior through Page Objects and Components
- Stable selectors using data-test attributes
- Clear separation between test logic, page objects, and UI components
- Reusable assertions and test utilities
- Type-safe test APIs with TypeScript
- Authentication isolated from business scenarios using Storage State
- Maintainable and scalable test architecture

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
- Docker execution support
- Test tagging strategy
- Cross-browser parallel execution optimization
- Reporting integration
- Visual regression testing

---

# Author

QA Automation portfolio project focused on scalable automation architecture and maintainable test design.
