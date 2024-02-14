# 🎭 Playwright

## SETUP
```npm install```
<br>

## QUICK START
```npm run test``` will run all tests headlessly

```npm run debug``` will run all tests in debug mode

See section below or look on [Playwright docs on running tests](https://playwright.dev/docs/running-tests) for more information.
<br>

## PROJECT INFO
Tests are contained in ```/tests```

Test report will be generated in ```/test-results```

Config is in ```playwright.config.ts```

New project setup info can be found in SETUP.md
<br>

## CONFIGURATIONS
Tests will run on all browsers outlined in ```playwright.config.ts```

Web interactions timeout set to 30 secs

Assertions (expect) timeout set to 5 sec
<br>

## MORE TEST OPTIONS
#####Run all tests
```npx playwright test```

#####Run in Headed mode (see the tests run in a browser)
```npx playwright test --headed```

#####Run in UI mode (see the tests run with option for playback)
```npx playwright test --ui```

#####Run on a specific browser
```npx playwright test --project chromium```

#####Run a specific test file
```npx playwright test testfile.spec.ts```

#####Run a specific test
```npx playwright test -g "test name"```

#####Run tests in VS Code
Tests can be run right from VS Code using the [VS Code extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright). Once installed you can simply click the green triangle next to the test you want to run or run all tests from the testing sidebar. Check out the [Getting Started with VS Code](https://playwright.dev/docs/getting-started-vscode#running-tests) guide for more details.
<br>

## DEBUGGING TESTS
```npx playwright test --debug```

You can use ```await page.pause()``` to insert breaks and use the inspector to step through the rest of the test
<br>

## TEST REPORT
```npx playwright show-report```

Can be switched on by default in ```playwright.config.ts```
line ```  reporter: [ ['html', { open: 'never' }] ],``` 

Options are ['always', 'never', 'on-failure']<br><br>

#### Happy testing! 😃