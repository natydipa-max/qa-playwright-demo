# Playwright Automation Framework

Senior-style QA Automation framework built with 
:contentReference[oaicite:0]{index=0} 
and TypeScript following scalable and maintainable automation best practices.

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
│   └── types/
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

## Login

Implemented scenarios:

- Successful login
- Locked user validation
- Invalid credentials
- Required username validation
- Required password validation

---

# Architecture Highlights

## Page Object Model (POM)

UI interactions are encapsulated into reusable page objects to improve readability and maintainability.

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

## Stable Synchronization

`Promise.all()` is used for navigation synchronization in order to prevent flaky tests and race conditions during page transitions.

Example:

```ts
await Promise.all([
  page.waitForURL(new RegExp(ROUTES.INVENTORY)),
  loginPage.login(
    USERS.STANDARD.username,
    USERS.STANDARD.password
  )
]);
```

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

Planned next steps for the framework:

- Inventory page
- Reusable UI components
- Cart flow automation
- Checkout flow automation
- API testing
- Custom fixtures
- Authentication storage state
- Reporting integration
- CI/CD with GitHub Actions
- ESLint and Prettier integration

---

# Author

QA Automation portfolio project focused on scalable automation architecture and maintainable test design.