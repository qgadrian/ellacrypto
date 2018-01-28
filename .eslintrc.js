module.exports = {
    // "extends": ["react-app"],
    "parser": "babel-eslint",
    "plugins": [
      "react",
      "react-native",
      "jsx-a11y",
      "import"
    ],
    "rules": {
// js code rules
      "import/no-named-as-default": "off",
      "no-console": ["error", { allow: ["debug", "warn", "error"] }],
      "no-unused-expressions": 0,
      "semi": ["error", "never"],
      "import/newline-after-import": ["error", { "count": 2 }],
      "object-curly-spacing": ["error", "always"],
      "object-shorthand": "error",
      "comma-dangle": ["error", "only-multiline"],
      "indent": ["error", 2, {
        "SwitchCase": 1,
      }],
      "keyword-spacing": ["error"],
      "space-before-blocks": ["error", "always"],
      "no-whitespace-before-property": "error",
      "max-len": ["error", {
        "code": 150,
        "comments": 100,
        "ignoreUrls": true,
        "ignoreRegExpLiterals": true
      }],
      "object-property-newline": ["error", { "allowMultiplePropertiesPerLine": true }],
      "object-curly-newline": ["error", { "multiline": true, "consistent": true }],
// React lint rules
      "react/prop-types": ["error", {
        "ignore": ["t", "className", "classes", "children"]
      }],
      "react/jsx-tag-spacing": "error",
      "react/prefer-stateless-function": ["error"],
      "react/require-render-return": ["error"],
      "react/no-did-mount-set-state": ["error"],
      "react/boolean-prop-naming": ["error"],
      "react/no-find-dom-node": ["error"],
      "react/default-props-match-prop-types": ["error"],
      "react/jsx-first-prop-new-line": ["error", "multiline-multiprop"],
      "react/jsx-max-props-per-line": ["error", { "maximum": 1, "when": "multiline" }],
      "react/jsx-closing-tag-location": ["error"],
      "react/jsx-closing-bracket-location": ["error"]
    }
}
