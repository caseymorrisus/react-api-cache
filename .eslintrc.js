module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
    "no-prototype-builtins": "off",
    "no-plusplus": "off",
    "strict": "off",
    "semi": ["error", "never"],
    "import/prefer-default-export": "off",
    "no-shadow": "off",
    "arrow-parens": ["error", "always"],
    "function-paren-newline": "off",
    "comma-dangle": ["error", {
      "arrays": "always-multiline",
      "objects": "always-multiline",
      "imports": "always-multiline",
      "exports": "always-multiline",
      "functions": "ignore",
    }],
    "max-len": ["error", { "code": 80, "tabWidth": 2 }],
    "object-curly-newline": "off",
    "react/no-typos": "off",
    "react/no-children-prop": "off",
    "no-confusing-arrow": "off",
    "import/no-unresolved": "off",
    "import/no-named-as-default": [
      "off"
    ],
    "jsx-a11y/label-has-for": "off",
  },
};
