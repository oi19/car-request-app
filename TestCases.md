# Test Cases Documentation

This document describes the test cases implemented for the Car Request Listing application, what each test covers, and how to run the tests.

## Test Coverage

### 1. Component Tests

#### CarRequestCard.test.tsx
- **Rendering Test**: Verifies that the CarRequestCard component correctly renders all car request data (model, year, price, type, requester name, location).
- **Interaction Test**: Verifies that the onPress callback is called with the correct car request data when the card is pressed.

#### FilterDrawer.test.tsx
- **Rendering Test**: Verifies that the FilterDrawer component correctly renders with initial filter values.
- **Apply Filters Test**: Verifies that the onApplyFilters callback is called with updated filter values when the Apply button is pressed.
- **Reset Filters Test**: Verifies that the onApplyFilters callback is called with reset filter values when the Reset button is pressed.

### 2. State Management Tests

#### CarRequestStore.test.ts
- **Initialization Test**: Verifies that the store initializes with the correct default values.
- **Filter Update Test**: Verifies that the updateFilters action correctly updates the filter state.
- **Filter Reset Test**: Verifies that the resetFilters action correctly resets the filter state to default values.
- **Fetch Car Requests Test**: Verifies that the fetchCarRequests action correctly updates the loading state and car requests data.

## How to Run Tests

### Prerequisites
- Node.js and npm/yarn installed
- Project dependencies installed

### Running All Tests
\`\`\`bash
# Using npm
npm test

# Using yarn
yarn test
\`\`\`

### Running Specific Tests
\`\`\`bash
# Using npm
npm test -- -t "CarRequestCard"

# Using yarn
yarn test -t "CarRequestCard"
\`\`\`

### Running Tests with Coverage
\`\`\`bash
# Using npm
npm test -- --coverage

# Using yarn
yarn test --coverage
\`\`\`

## Test Structure

Each test file follows a similar structure:
1. Import necessary testing utilities and components
2. Mock any dependencies or data needed for testing
3. Define test cases using Jest's `describe` and `it` functions
4. Render components or call functions to test
5. Make assertions about the expected behavior

## Adding New Tests

When adding new features to the application, follow these guidelines for adding tests:

1. Create a new test file in the `__tests__` directory if testing a new component or module
2. Use descriptive test names that explain what is being tested
3. Mock external dependencies to isolate the component or function being tested
4. Test both success and failure scenarios
5. Test edge cases and boundary conditions

## Continuous Integration

Tests are automatically run as part of the CI/CD pipeline to ensure code quality before deployment.
