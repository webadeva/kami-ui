## Kami-UI Theme Shop

### Installation

**npm**

```bash
npm i @kami-ui/theme-shop
```

**yarn**

```bash
yarn add @kami-ui/theme-shop
```

### Description

Discover 69 meticulously crafted website themes. Each theme features a thoughtfully curated color palette, including:

1. Primary colors with complementary shades
2. Secondary and accent hues for visual interest
3. Carefully selected text and background colors
4. Harmonious analogous, tetradic, and triadic color schemes

Our themes also showcase expert typography choices and precise spacing to enhance readability and user experience. Whether you prefer bold and vibrant or subtle and sophisticated, find the perfect design to elevate your online presence.

### Example

```js
import type { AppProps } from "next/app";
import { MultiThemeProvider, MultiThemeProviderProps } from "@kami-ui/next-theme";
import { defaultTheme } from "@kami-ui/theme-shop"; // Import the default theme

const App = ({ Component, pageProps }: AppProps) => (
  <ThemeProvider themes={ defaultTheme }>
    <Component {...pageProps} />
  </ThemeProvider>
);

export default App;
```

### Features

1. **Dark Mode**
2. **Light Mode**
3. **Colors** : `Primary`, `Secondary`, `text`, `background`, `analogous`, `accent`, `complementary`, `tetradic`, `triadic`
4. **Spacing**