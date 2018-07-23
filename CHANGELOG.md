# Change Log

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

<a name="0.2.0"></a>
# [0.2.0](https://github.com/textventure/textventure.github.io/compare/v0.1.0...v0.2.0) (2018-07-23)


### Bug Fixes

* **helpers:** enable mode cors when fetching url in `getStory` ([8728d7d](https://github.com/textventure/textventure.github.io/commit/8728d7d))
* **load:** prepend the location origin to the placeholder url ([bb2922f](https://github.com/textventure/textventure.github.io/commit/bb2922f))
* **load:** update public url for demo placeholder ([c97e692](https://github.com/textventure/textventure.github.io/commit/c97e692))
* **play:** do not fetch if url is null on mount ([194992d](https://github.com/textventure/textventure.github.io/commit/194992d))
* **public:** update the links in demo.yaml ([b9a422e](https://github.com/textventure/textventure.github.io/commit/b9a422e))


### Features

* **app:** replace BrowserRouter with HashRouter and set basename ([c2b042c](https://github.com/textventure/textventure.github.io/commit/c2b042c))
* **src:** remove react-router from app and update tests ([86983f6](https://github.com/textventure/textventure.github.io/commit/86983f6))



<a name="0.1.0"></a>
# 0.1.0 (2018-07-16)


### Bug Fixes

* **branch:** render span for choice if renderer is html/markdown bf49f37
* **helpers:** guard `getKey` and `getValue` against invalid values 8a87bd5


### Features

* **play:** try to fetch story before redirecting to <Load> 4eb727b
* clone project from `react-app-template` 6bd04bc
* **app:** add global styles for code element dcc95a2
* **app:** remove App styles.css and import MUI <CssBaseline> 258bc44
* **app:** render <App> with routes and update tests d30a558
* **app:** render routes for components <Load> and <Play> d469502
* **app:** set global styles for inline elements `em` and `strong` c445848
* **app:** set global styles for paragraph and heading elements 63fe992
* **branch:** apply block element styles as a descendent to branch fe91f75
* **branch:** create <Branch> 552da2e
* **branch:** use renderer to render choice text in <Branch> ad08c6e
* **branch:** use renderer to render the text in <Branch> b8fe267
* **card:** add props.className to <Card> 96b4166
* **card:** create <Card> 3f39753
* **choice:** create <Choice> 33098dd
* **helpers:** add util functions formatAuthor, getKey, getValue 105e4cb
* **helpers:** allow default text renderer to render element eb9cf15
* **helpers:** allow renderer element to be customizable e9a2967
* **helpers:** create api helper with `getStory` 20211e2
* **helpers:** create text/html/markdown renderer function 4f2eaae
* **helpers:** extend marked link renderer to open in new tab bb141ab
* **helpers:** remove `formatAuthor` from util 09146cf
* **helpers:** remove newlines in html/markdown renderer output 7d45639
* **load:** change placeholder from "/example.yaml" to "/demo.yaml" a3de72c
* **load:** create <Load> ed2224e
* **play:** create <Play> 3c96e67
* **play:** create default state.config and simplify "start" 2a687de
* **play:** redirect to `/load` if props are missing 3ce0e0c
* **public:** change demo.yaml "_config" 87726ea
* **public:** create demo.yaml f6e7ef1
* **public:** load es5 and fetch polyfill and js-yaml in index.html 0c3a2da
* **public:** load marked in index.html eb5c486
* **public:** load meyer-reset in index.html 1c15570
* **public:** load Roboto font from Google CDN b56b36e
* **public:** rewrite demo.yaml in markdown dbbebbd
* rename project and update files e516383
* **public:** update `index.html` and polyfill feature `URL` e61ac14
* **public:** update title and description in index.html f89ecb7
* **src:** remove index.css and logo.svg 27cbb07
* **title:** create <Title> 6c5fdd4
* **title:** delete <Title> and respective tests 53f86d8
