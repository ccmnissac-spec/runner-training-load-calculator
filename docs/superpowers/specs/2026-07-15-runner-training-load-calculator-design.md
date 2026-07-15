# Runner Training Load Calculator — Design

## Goal

Create a small, public, dependency-free web tool that helps runners and coaches calculate session training load from session duration and perceived exertion.

## Users and outcome

The user enters session duration in minutes and an RPE value. The page returns:

`Session training load = duration in minutes × RPE`

The result is an internal workload estimate, not a medical assessment or a prescription.

## Scope

- One static web page that works on current mobile and desktop browsers.
- Duration accepts whole numbers from 1 to 600 minutes.
- RPE accepts whole numbers from 1 to 10.
- The result updates when the user submits the form.
- Invalid or missing values show a clear inline error and no result.
- The page explains the formula and the limits of the metric.
- No accounts, storage, analytics, network requests, or third-party dependencies.

## Files

- `index.html`: accessible form, result, short explanation, and disclaimer.
- `style.css`: responsive presentation with readable contrast and visible focus states.
- `app.js`: input validation, calculation, and browser interaction.
- `test.js`: one Node.js built-in self-check for valid calculation and invalid input.
- `README.md`: purpose, usage, formula, local opening instructions, limitations, and contribution guidance.
- `LICENSE`: MIT License.

## Data flow

1. The user submits duration and RPE.
2. The browser converts both values to numbers.
3. Validation rejects missing, non-integer, or out-of-range values.
4. Valid values are multiplied and displayed without persistence.

## Error handling

The form shows one concise message describing the first invalid field. The result area is cleared whenever validation fails. All processing stays in the browser.

## Accessibility

- Every input has a visible label.
- Errors and results use an `aria-live` region.
- The form works with keyboard-only navigation.
- Focus indicators and text contrast remain visible.

## Verification

- The self-check must fail before calculation logic exists and pass after implementation.
- Manual verification covers the minimum and maximum accepted values, missing values, decimals, and mobile-width layout.

## Repository

- Name: `runner-training-load-calculator`
- Default branch: `main`
- Visibility: public, but only after the user confirms the final local files and public disclosure.
