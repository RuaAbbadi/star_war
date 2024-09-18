# star_war
fetch star war characteristics with form submision
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```

- Star war characteristics table fetching data from https://swapi.dev/api/people api showing characteristics like name, gender, height and eye color using material UI 
and handling the pagination in the best way.  

![star_war_table](https://github.com/user-attachments/assets/89ee5aef-1772-48b9-af9b-7ea3f38c9809)


-Allow the user to search for a name 
![search](https://github.com/user-attachments/assets/f94021ee-707b-42b0-ad04-954caf1eb343)


- Having fun changing the theme 
![change_theme](https://github.com/user-attachments/assets/967e0b22-dc56-45e2-aecb-263baa6c2c70)

-  Patient Form 
![form](https://github.com/user-attachments/assets/7fb26018-c51f-4123-9c82-ff1e11ff5750)

 - Form Validation 
![from validation](https://github.com/user-attachments/assets/02fc2505-1b8e-48f3-b667-fd5a255a55ba)

- Form Submision 
- ![Form Submision](https://github.com/user-attachments/assets/a1020a8b-079e-4835-b98b-d044b1cdb558)









