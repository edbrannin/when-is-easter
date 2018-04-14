module.exports = {
  "extends": [
    "airbnb",
    "plugin:jest/recommended",
  ],
  "plugins": [
    "jest"
  ],
  "env": {
    "jest": true,
    "browser": true,
  },
  "rules": {
    "react/prop-types": "off", // Temporary
    "react/jsx-filename-extension": "off",
    "jsx-a11y/anchor-is-valid": [
      "error", {
        "components": [ "Link" ],
        "specialLink": [ "to" ]
      }
    ],
  }
};
