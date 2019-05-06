# E2E Testing

## Local Setup

### Chrome Driver

A) Download the wrapped node lib: `npm install -g chromedriver`
B) (Mac Brew Package) `brew install chromedriver`
C) (Most reliable!) Download directly from Chrome and setup on your system path.
Download: https://sites.google.com/a/chromium.org/chromedriver/downloads
Make sure chromedriver matches your binary installed version of chrome:
https://sites.google.com/a/chromium.org/chromedriver/downloads/version-selection

Move binary to path and make executable

```
sudo mv chromedriver /usr/bin/chromedriver
sudo chmod +x /usr/bin/chromedriver
```

## Browserstack

## Running

## Creating Tests

## Guidelines

- Tests should test for one passing condition (keep it atomic)
- Use CSS selectors, preferably IDs.
  - prefer over xpath or difficult selectors for clean and concise tests
  - use IDs over variable selectors eg. nth-child(2) makes for a brittle test
