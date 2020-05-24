# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.0.0](https://github.com/textventure/play/compare/v0.4.0...v1.0.0) (2020-05-24)


### ⚠ BREAKING CHANGES

* **app:** heading styles for textventure markup have
changed due to the upgrade of material-ui to v4.

Use spacing(2) for margin-bottom of heading and paragraph.

### Features

* unset paragraph + button letter-spacing in <App> and <Choice> ([a1b5bd9](https://github.com/textventure/play/commit/a1b5bd9f5a1ae44cfc87e6a1b99f308dc7653247))
* **app:** fix and update typography styles in <App> ([2ab2705](https://github.com/textventure/play/commit/2ab27051aab1f0290f28dc0abfb2d909c84a5f3d))
* **lintstaged:** run prettier for html and yaml files ([2985502](https://github.com/textventure/play/commit/2985502c804ca10b2783c31ca8b08d37925f64be))
* upgrade react, react-dom, and @material-ui/core ([c6852c9](https://github.com/textventure/play/commit/c6852c95602a4b47f50cbf6965dfec2413e1a276))


### Bug Fixes

* **app:** revert branch paragraph margin-bottom to spacing 1 ([dafa18d](https://github.com/textventure/play/commit/dafa18dc08610cd7ee5f54fe2f053e5f453662bd))
* **public:** comment out `manifest.json` from index.html ([76f2560](https://github.com/textventure/play/commit/76f256013f36e5bf07a52e636f11a7d04c5f0255))
* **public:** fix links, update heading, run prettier for demo.yaml ([ce19669](https://github.com/textventure/play/commit/ce196695814e98dfdba837737203c3ee3f351e9c))

<a name="0.4.0"></a>
# [0.4.0](https://github.com/textventure/play/compare/v0.3.0...v0.4.0) (2018-11-02)


### Features

* **public:** update demo.yaml with links and better wording ([79af482](https://github.com/textventure/play/commit/79af482))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/textventure/play/compare/v0.2.0...v0.3.0) (2018-09-21)


### Bug Fixes

* **play:** do not set `hasLoaded` to true if `getStory` failed ([c2ff2c4](https://github.com/textventure/play/commit/c2ff2c4))


### Features

* **app:** update global margins and increase grid max-width to 720 ([8c7532a](https://github.com/textventure/play/commit/8c7532a))
* **app:** use or set start `id` from location search (history api) ([146a57e](https://github.com/textventure/play/commit/146a57e))
* **branch:** add some margins between text and choices ([e6483d4](https://github.com/textventure/play/commit/e6483d4))
* **branch:** pass prop `id` from <Branch> to <Choice> ([7f2458b](https://github.com/textventure/play/commit/7f2458b))
* **card:** double the margins of <Card> on medium and up screens ([56e5f45](https://github.com/textventure/play/commit/56e5f45))
* **choice:** push choiceId to history search after onClick ([e329d94](https://github.com/textventure/play/commit/e329d94))
* **helpers:** add querystring method `stringify` and tests ([181171d](https://github.com/textventure/play/commit/181171d))
* **helpers:** add url helper `searchParams` with tests ([1969165](https://github.com/textventure/play/commit/1969165))
* **helpers:** create browser history object ([dd62ce5](https://github.com/textventure/play/commit/dd62ce5))
* **helpers:** update url helper `searchParams` ([f3cad35](https://github.com/textventure/play/commit/f3cad35))
* **load:** update <Load> to use history.push and not call getStory ([fca368a](https://github.com/textventure/play/commit/fca368a))
* **play:** update history listener to not fetch if already loaded ([21d168c](https://github.com/textventure/play/commit/21d168c))
* **public:** update meta description and title in `index.html` ([6381497](https://github.com/textventure/play/commit/6381497))
* **src:** render <Theme> as the root in index.js ([9a5b4c8](https://github.com/textventure/play/commit/9a5b4c8))
* **theme:** add <Theme> and tests ([58c3a53](https://github.com/textventure/play/commit/58c3a53))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/textventure/play/compare/v0.1.0...v0.2.0) (2018-07-23)


### Bug Fixes

* **helpers:** enable mode cors when fetching url in `getStory` ([8728d7d](https://github.com/textventure/play/commit/8728d7d))
* **load:** prepend the location origin to the placeholder url ([bb2922f](https://github.com/textventure/play/commit/bb2922f))
* **load:** update public url for demo placeholder ([c97e692](https://github.com/textventure/play/commit/c97e692))
* **play:** do not fetch if url is null on mount ([194992d](https://github.com/textventure/play/commit/194992d))
* **public:** update the links in demo.yaml ([b9a422e](https://github.com/textventure/play/commit/b9a422e))


### Features

* **app:** replace BrowserRouter with HashRouter and set basename ([c2b042c](https://github.com/textventure/play/commit/c2b042c))
* **src:** remove react-router from app and update tests ([86983f6](https://github.com/textventure/play/commit/86983f6))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/textventure/play/tree/v0.1.0) (2018-07-16)


### Bug Fixes

* **branch:** render span for choice if renderer is html/markdown ([bf49f37](https://github.com/textventure/play/commit/bf49f37))
* **helpers:** guard `getKey` and `getValue` against invalid values ([8a87bd5](https://github.com/textventure/play/commit/8a87bd5))


### Features

* **play:** try to fetch story before redirecting to <Load> ([4eb727b](https://github.com/textventure/play/commit/4eb727b))
* clone project from `react-app-template` ([6bd04bc](https://github.com/textventure/play/commit/6bd04bc))
* **app:** add global styles for code element ([dcc95a2](https://github.com/textventure/play/commit/dcc95a2))
* **app:** remove App styles.css and import MUI <CssBaseline> ([258bc44](https://github.com/textventure/play/commit/258bc44))
* **app:** render <App> with routes and update tests ([d30a558](https://github.com/textventure/play/commit/d30a558))
* **app:** render routes for components <Load> and <Play> ([d469502](https://github.com/textventure/play/commit/d469502))
* **app:** set global styles for inline elements `em` and `strong` ([c445848](https://github.com/textventure/play/commit/c445848))
* **app:** set global styles for paragraph and heading elements ([63fe992](https://github.com/textventure/play/commit/63fe992))
* **branch:** apply block element styles as a descendent to branch ([fe91f75](https://github.com/textventure/play/commit/fe91f75))
* **branch:** create <Branch> ([552da2e](https://github.com/textventure/play/commit/552da2e))
* **branch:** use renderer to render choice text in <Branch> ([ad08c6e](https://github.com/textventure/play/commit/ad08c6e))
* **branch:** use renderer to render the text in <Branch> ([b8fe267](https://github.com/textventure/play/commit/b8fe267))
* **card:** add props.className to <Card> ([96b4166](https://github.com/textventure/play/commit/96b4166))
* **card:** create <Card> ([3f39753](https://github.com/textventure/play/commit/3f39753))
* **choice:** create <Choice> ([33098dd](https://github.com/textventure/play/commit/33098dd))
* **helpers:** add util functions formatAuthor, getKey, getValue ([105e4cb](https://github.com/textventure/play/commit/105e4cb))
* **helpers:** allow default text renderer to render element ([eb9cf15](https://github.com/textventure/play/commit/eb9cf15))
* **helpers:** allow renderer element to be customizable ([e9a2967](https://github.com/textventure/play/commit/e9a2967))
* **helpers:** create api helper with `getStory` ([20211e2](https://github.com/textventure/play/commit/20211e2))
* **helpers:** create text/html/markdown renderer function ([4f2eaae](https://github.com/textventure/play/commit/4f2eaae))
* **helpers:** extend marked link renderer to open in new tab ([bb141ab](https://github.com/textventure/play/commit/bb141ab))
* **helpers:** remove `formatAuthor` from util ([09146cf](https://github.com/textventure/play/commit/09146cf))
* **helpers:** remove newlines in html/markdown renderer output ([7d45639](https://github.com/textventure/play/commit/7d45639))
* **load:** change placeholder from "/example.yaml" to "/demo.yaml" ([a3de72c](https://github.com/textventure/play/commit/a3de72c))
* **load:** create <Load> ([ed2224e](https://github.com/textventure/play/commit/ed2224e))
* **play:** create <Play> ([3c96e67](https://github.com/textventure/play/commit/3c96e67))
* **play:** create default state.config and simplify "start" ([2a687de](https://github.com/textventure/play/commit/2a687de))
* **play:** redirect to `/load` if props are missing ([3ce0e0c](https://github.com/textventure/play/commit/3ce0e0c))
* **public:** change demo.yaml "_config" ([87726ea](https://github.com/textventure/play/commit/87726ea))
* **public:** create demo.yaml ([f6e7ef1](https://github.com/textventure/play/commit/f6e7ef1))
* **public:** load es5 and fetch polyfill and js-yaml in index.html ([0c3a2da](https://github.com/textventure/play/commit/0c3a2da))
* **public:** load marked in index.html ([eb5c486](https://github.com/textventure/play/commit/eb5c486))
* **public:** load meyer-reset in index.html ([1c15570](https://github.com/textventure/play/commit/1c15570))
* **public:** load Roboto font from Google CDN ([b56b36e](https://github.com/textventure/play/commit/b56b36e))
* **public:** rewrite demo.yaml in markdown ([dbbebbd](https://github.com/textventure/play/commit/dbbebbd))
* rename project and update files ([e516383](https://github.com/textventure/play/commit/e516383))
* **public:** update `index.html` and polyfill feature `URL` ([e61ac14](https://github.com/textventure/play/commit/e61ac14))
* **public:** update title and description in index.html ([f89ecb7](https://github.com/textventure/play/commit/f89ecb7))
* **src:** remove index.css and logo.svg ([27cbb07](https://github.com/textventure/play/commit/27cbb07))
* **title:** create <Title> ([6c5fdd4](https://github.com/textventure/play/commit/6c5fdd4))
* **title:** delete <Title> and respective tests ([53f86d8](https://github.com/textventure/play/commit/53f86d8))
