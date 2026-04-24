This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Getting Started

> **Note**: Make sure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

## Step 1: Start Metro

First, you will need to run **Metro**, the JavaScript build tool for React Native.

To start the Metro dev server, run the following command from the root of your React Native project:

```sh
# Using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Build and run your app

With Metro running, open a new terminal window/pane from the root of your React Native project, and use one of the following commands to build and run your Android or iOS app:

### Android

```sh
# Using npm
npm run android

# OR using Yarn
yarn android
```

### iOS

For iOS, remember to install CocoaPods dependencies (this only needs to be run on first clone or after updating native deps).

The first time you create a new project, run the Ruby bundler to install CocoaPods itself:

```sh
bundle install
```

Then, and every time you update your native dependencies, run:

```sh
bundle exec pod install
```

For more information, please visit [CocoaPods Getting Started guide](https://guides.cocoapods.org/using/getting-started.html).

```sh
# Using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up correctly, you should see your new app running in the Android Emulator, iOS Simulator, or your connected device.

This is one way to run your app — you can also build it directly from Android Studio or Xcode.

## Step 3: Modify your app

Now that you have successfully run the app, let's make changes!

Open `App.tsx` in your text editor of choice and make some changes. When you save, your app will automatically update and reflect these changes — this is powered by [Fast Refresh](https://reactnative.dev/docs/fast-refresh).

When you want to forcefully reload, for example to reset the state of your app, you can perform a full reload:

- **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Dev Menu**, accessed via <kbd>Ctrl</kbd> + <kbd>M</kbd> (Windows/Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (macOS).
- **iOS**: Press <kbd>R</kbd> in iOS Simulator.

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [docs](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you're having issues getting the above steps to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.

# Adding SVG Icons

Icons live in `src/assets/icons/` as plain `.svg` files and are converted to React Native components using [`@svgr/cli`](https://react-svgr.com/docs/cli/) with [`react-native-svg`](https://github.com/software-mansion/react-native-svg) as the renderer.

## Packages involved

| Package | Role |
|---|---|
| `react-native-svg` | SVG renderer for React Native (runtime dependency) |
| `@svgr/cli` | Converts `.svg` files to `.tsx` React components (dev dependency, run via `npx`) |
| `react-native-svg-transformer` | Allows importing `.svg` files directly as React components via Metro (dev dependency) |

## Step-by-step: adding a new icon

### 1. Add the SVG file

Drop the `.svg` into `src/assets/icons/`. Example — `chevron-right.svg`:

```svg
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9 18L15 12L9 6" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>
```

> Use `stroke="black"` in the source file. The generated component replaces it with `props.color || 'currentColor'` so it can be tinted at runtime.

### 2. Run the icon generator

```sh
npm run icons
```

This runs:

```sh
npx @svgr/cli ./src/assets/icons --out-dir ./src/components/SvgIcon/icons --native --typescript --icon
```

It reads every `.svg` in `src/assets/icons/` and writes a `.tsx` component to `src/components/SvgIcon/icons/`. For `chevron-right.svg` the output is `ChevronRight.tsx`:

```tsx
import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

const SvgChevronRight = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.width ?? 24}
    height={props.height ?? 24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke={props.color || 'currentColor'}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m9 18 6-6-6-6"
    />
  </Svg>
);

export default SvgChevronRight;
```

### 3. Register the icon

Open `src/components/SvgIcon/types.ts` and add the new component to both the import and the `icons` map:

```ts
import {
  // ...existing imports...
  ChevronRight,  // add this
} from './icons/index';

export const icons = {
  // ...existing entries...
  ChevronRight,  // add this
};

export type IconName = keyof typeof icons;
```

> `IconName` is derived from the map keys, so adding an entry here automatically makes the name available as a valid `IconName` value across the codebase.

### 4. Use it

```tsx
import { SvgIcon } from 'components/SvgIcon/SvgIcon';

<SvgIcon name="ChevronRight" color="#000" size={20} />
```

Or via the `Icon` component / any prop that accepts `IconName`.

---

# Mapbox
machine api.mapbox.com
  login mapbox
  password sk.eyYOUR_SECRET_MAPBOX_TOKEN
