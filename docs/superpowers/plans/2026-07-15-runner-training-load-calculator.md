# Runner Training Load Calculator Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a dependency-free static web tool that validates duration and RPE, then calculates session training load.

**Architecture:** A pure `calculateLoad(duration, rpe)` function owns validation and calculation. A small browser form calls it and renders either the result or the first validation error; no data leaves the page.

**Tech Stack:** HTML, CSS, browser JavaScript, Node.js built-in `assert` for one runnable test.

## Global Constraints

- Duration accepts whole numbers from 1 to 600 minutes.
- RPE accepts whole numbers from 1 to 10.
- No accounts, storage, analytics, external/API requests, third-party dependencies, or build step; inputs are not transmitted.
- The page must work with keyboard navigation and current mobile and desktop browsers.
- Repository name is `runner-training-load-calculator` and default branch is `main`.

## Release Checklist

- [ ] `1 × 1 = 1 AU` and `600 × 10 = 6000 AU`.
- [ ] Each field missing and each field decimal shows the correct error.
- [ ] A valid result followed by invalid input clears or replaces the result with the error.
- [ ] Tab navigation and Enter submission work.
- [ ] The `aria-live` region announces results and errors.
- [ ] Layout remains usable at 375px wide.
- [ ] Browser console has no errors.

---

### Task 1: Training-load logic

**Files:**
- Create: `test.js`
- Create: `app.js`

**Interfaces:**
- Consumes: numeric or numeric-string `duration` and `rpe` values.
- Produces: `calculateLoad(duration, rpe): number`; throws `Error` with a user-facing validation message for invalid input.

- [ ] **Step 1: Write the failing test**

```js
const assert = require('node:assert/strict');
const { calculateLoad } = require('./app.js');

assert.equal(calculateLoad(60, 5), 300);
assert.equal(calculateLoad('45', '6'), 270);
assert.throws(() => calculateLoad(0, 5), /Duration must be a whole number from 1 to 600/);
assert.throws(() => calculateLoad(30.5, 5), /Duration must be a whole number from 1 to 600/);
assert.throws(() => calculateLoad(60, 11), /RPE must be a whole number from 1 to 10/);
console.log('5 checks passed');
```

- [ ] **Step 2: Run the test and verify the expected failure**

Run: `node test.js`

Expected: FAIL because `./app.js` does not exist.

- [ ] **Step 3: Add the minimum calculation logic**

```js
function calculateLoad(duration, rpe) {
  const minutes = Number(duration);
  const effort = Number(rpe);

  if (!Number.isInteger(minutes) || minutes < 1 || minutes > 600) {
    throw new Error('Duration must be a whole number from 1 to 600 minutes.');
  }
  if (!Number.isInteger(effort) || effort < 1 || effort > 10) {
    throw new Error('RPE must be a whole number from 1 to 10.');
  }
  return minutes * effort;
}

if (typeof module !== 'undefined') module.exports = { calculateLoad };
```

- [ ] **Step 4: Run the test and verify success**

Run: `node test.js`

Expected: `5 checks passed` and exit code 0.

- [ ] **Step 5: Commit the tested logic**

```bash
git add app.js test.js
git commit -m "feat: calculate session training load"
```

### Task 2: Accessible single-page interface

**Files:**
- Modify: `app.js`
- Create: `index.html`
- Create: `style.css`

**Interfaces:**
- Consumes: `calculateLoad(duration, rpe)` from Task 1 and form fields `#duration`, `#rpe`.
- Produces: inline text in `#message`; no persistence or network activity.

- [ ] **Step 1: Add a boundary unit check to `test.js`**

Append:

```js
assert.equal(calculateLoad(600, 10), 6000);
console.log('Boundary check passed');
```

- [ ] **Step 2: Run the test and verify it already protects the boundary**

Run: `node test.js`

Expected: `5 checks passed`, `Boundary check passed`, exit code 0. This is a coverage extension; no production change is required for the pure function.

- [ ] **Step 3: Add browser form handling to `app.js`**

Append:

```js
if (typeof document !== 'undefined') {
  const form = document.querySelector('#load-form');
  const message = document.querySelector('#message');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    try {
      const load = calculateLoad(form.duration.value, form.rpe.value);
      message.className = 'result';
      message.textContent = `Session training load: ${load} AU`;
    } catch (error) {
      message.className = 'error';
      message.textContent = error.message;
    }
  });
}
```

- [ ] **Step 4: Create `index.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="Calculate session training load from duration and RPE.">
  <title>Runner Training Load Calculator</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <main>
    <p class="eyebrow">RUNNER TOOL</p>
    <h1>Training Load Calculator</h1>
    <p>Estimate internal session load using duration × perceived exertion.</p>
    <form id="load-form" novalidate>
      <label for="duration">Duration (minutes)</label>
      <input id="duration" name="duration" type="number" min="1" max="600" step="1" required>
      <label for="rpe">Session RPE (1–10)</label>
      <input id="rpe" name="rpe" type="number" min="1" max="10" step="1" required>
      <button type="submit">Calculate load</button>
    </form>
    <p id="message" aria-live="polite"></p>
    <section>
      <h2>How it works</h2>
      <p>Session training load = duration in minutes × session RPE. The result is shown in arbitrary units (AU).</p>
      <p class="note">Use this as one workload estimate, not as medical advice or a stand-alone training prescription.</p>
    </section>
  </main>
  <script src="app.js"></script>
</body>
</html>
```

- [ ] **Step 5: Create `style.css`**

```css
:root { color-scheme: light; font-family: Inter, system-ui, sans-serif; color: #172018; background: #eef1ea; }
* { box-sizing: border-box; }
body { margin: 0; padding: 24px; }
main { width: min(100%, 640px); margin: 6vh auto; padding: clamp(24px, 6vw, 56px); background: #fff; border: 1px solid #cfd7ca; border-radius: 20px; box-shadow: 0 18px 50px #26321f14; }
h1 { margin: 0 0 12px; font-size: clamp(2rem, 8vw, 4rem); line-height: .95; letter-spacing: -.05em; }
h2 { margin-top: 32px; }
.eyebrow { color: #4c6828; font-size: .75rem; font-weight: 800; letter-spacing: .16em; }
form { display: grid; gap: 10px; margin-top: 32px; }
label { margin-top: 8px; font-weight: 700; }
input, button { width: 100%; min-height: 48px; border-radius: 10px; font: inherit; }
input { padding: 10px 12px; border: 1px solid #8a9785; }
button { margin-top: 12px; border: 0; background: #294414; color: #fff; font-weight: 800; cursor: pointer; }
input:focus-visible, button:focus-visible { outline: 3px solid #d4f06a; outline-offset: 2px; }
.result, .error { min-height: 24px; font-weight: 800; }
.result { color: #294414; }
.error { color: #a1261c; }
.note { padding-left: 14px; border-left: 3px solid #d4f06a; color: #4c554b; }
```

- [ ] **Step 6: Verify logic and manually inspect the page**

Run: `node test.js`

Expected: both success messages and exit code 0.

Open `index.html` and check keyboard submission, `1 × 1 = 1 AU`, `600 × 10 = 6000 AU`, missing values, decimals, and a 375-pixel-wide window.

- [ ] **Step 7: Commit the interface**

```bash
git add app.js test.js index.html style.css
git commit -m "feat: add accessible training load interface"
```

### Task 3: Public project documentation

**Files:**
- Create: `README.md`
- Create: `LICENSE`

**Interfaces:**
- Consumes: the finished static page and `node test.js` verification command.
- Produces: public usage, limitations, contribution, and licensing information.

- [ ] **Step 1: Create `README.md`**

```markdown
# Runner Training Load Calculator

A dependency-free browser tool for estimating session training load from duration and session RPE.

## Use

Open `index.html`, enter duration in minutes and an RPE from 1 to 10, then select **Calculate load**.

`Session training load = duration × RPE`

The result is an arbitrary-unit workload estimate. It is not medical advice or a stand-alone training prescription.

## Test

Run `node test.js`. No package installation is required.

## Privacy

The tool has no accounts, analytics, storage, or external dependencies. It does not contact external services and does not transmit or store inputs. When hosted, it only loads the site's own static resources.

## Contributing

Open an issue describing the problem before proposing a larger feature. Keep changes dependency-free unless a measurable need justifies otherwise.

## License

MIT
```

- [ ] **Step 2: Create `LICENSE`**

```text
MIT License

Copyright (c) 2026 Chun Yin Chan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

- [ ] **Step 3: Run final verification**

Run: `node test.js && git diff --check && git status --short`

Expected: tests pass, no whitespace errors, and only `README.md` plus `LICENSE` are untracked.

- [ ] **Step 4: Commit documentation**

```bash
git add README.md LICENSE
git commit -m "docs: document usage and licensing"
```

- [ ] **Step 5: Confirm clean local repository before publication**

Run: `node test.js && git status --short --branch`

Expected: tests pass and Git reports `## main` with no changed files.
