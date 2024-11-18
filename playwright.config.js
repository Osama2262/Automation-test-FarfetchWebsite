const  {playwrightTestConfig} = require('@playwright/test');
const { devices } = require('playwright-extra');

const config = {
  
  fullyParallel:false,
  retries: 0,
  timeout: 60000,
  //reporter: './Reporter.js',
  use: {
    headless: false,
    video:'off',
    viewpoint:{ width:1920, height:1080  },
    //launchOptions: { args: ['--start-maximized']},
    screenshot: 'only-on-failure',
    trace:'on'
  },

  projects: [
    {
      name: 'chrome',
      use: {browserName:'chromium'},
    },
  
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: {browserName: 'webkit'},
    },
  ]

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
}

module.exports = config;

