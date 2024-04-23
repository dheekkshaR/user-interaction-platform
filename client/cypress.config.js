const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  },
});

// import { defineConfig } from "cypress";

// export default defineConfig({
//   e2e: {
//     // setupNodeEvents(on, config) {
//     //   // implement node event listeners here
//     // },
//   },

//   component: {
//     devServer: {
//       framework: "create-react-app",
//       bundler: "webpack",
//     },
//   },
// });

