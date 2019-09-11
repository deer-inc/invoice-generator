[![Build Status](https://travis-ci.com/deer-inc/invoice-generator.svg?branch=master)](https://travis-ci.com/deer-inc/invoice-generator)
[![Coverage Status](https://coveralls.io/repos/github/deer-inc/invoice-generator/badge.svg?branch=master)](https://coveralls.io/github/deer-inc/invoice-generator?branch=master)
![MIT License](https://img.shields.io/github/license/deer-inc/invoice-generator.svg)


# Invoice

請求書ジェネレーターです。URLパラメーターをつけると入力状態で開くことができます。

```
https://deer-inc.github.io/invoice-generator/?title1=品目&count1=数量&unit1=人日&unitCost1=単価&taxRate1=税率
```

- 情報はローカルストレージに保存されます。画面右上よりキャッシュクリアが可能です
- DB通信は一切発生しません。ローカルで完結しています。

## コントリビュート

バグ報告や機能追加要望はIssueやPRを気軽にください。😄

---

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
