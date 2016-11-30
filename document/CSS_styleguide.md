# CSS style guide

このスタイルガイドはCSSを構築する中での有用な方法論をまとめ、共有した上でルール化することがゴールです。

破綻しやすいCSS開発にベターな方法を、できる限り技術的なハードルが低く、学習コストの低いかたちで提案します。




## 目次

* [概要](#概要)
  * [破綻しにくい美しいcssとは](#破綻しにくい美しいcssとは)
  * [開発環境と構成案](#開発環境と構成案)
* [CSSシンタックス](#cssシンタックス)
* [CSS構成案「flocss」](#css構成案flocss)
  * [ファイル構成](#ファイル構成)
  * [レイヤー構造](#レイヤー構造)
  * [命名規則](#命名規則)
  * [javascriptのフック](#javascriptのフック)
  * [カスケーディングのルール](#カスケーディングのルール)
  * [sassのパーシャル機能での@import](#sassのパーシャル機能でのimport)
* [プロパティの宣言順](#プロパティの宣言順)
* [コメント](#コメント)
* [美しいスタイルシートのコツ](#美しいスタイルシートのコツ)
  * [絶対値のプロパティを避け相対値のプロパティを検討する](#絶対値のプロパティを避け相対値のプロパティを検討する)
  * [絶対値を想像させるクラス名を避ける](#絶対値を想像させるクラス名を避ける)
  * [インライン記述を使用しない](#インライン記述を使用しない)
  * [省略する記述(ショートハンド)](#省略する記述ショートハンド)
  * [詳細度を低く保つ](#詳細度を低く保つ)
  * [media queryを近くに](#media-queryを近くに)
  * [構造と見た目の分離](#構造と見た目の分離)
  * [固定の幅や高さを持たせない](#固定の幅や高さを持たせない)









## 概要

### 破綻しにくい美しいCSSとは

CSS開発において重要なことは、予測しやすい、再利用しやすい、保守しやすい、拡張しやすい、の4点を満たしていくものにすることです。
実現するために必要なことは以下です。

* 一貫性を保つ
* いつ、だれが読んでも理解できる
* 複雑さを避けて、簡潔にする
* 繰り返しや重複を避ける
* ルールや定義や言葉を共有する





### 開発環境と構成案

CSSの開発は、FLOCSSをベースにした構成案で、BEMの命名法、メタ言語SassをSCSS記法で記述しcompassを利用します。

SCSSファイルはgulpでコンパイルして、スタイルガイドの生成・シンタックスやプロパティの順の整形・ベンダープレフィクスの付与・圧縮を一括して行うことを標準としています。










## CSSシンタックス

CSSのシンタックスについての基本ルールです。以下の記述ルールを守りつつ、gulpプラグインの「csscomb」などでコンパイルしておくことで精度を高めます。

* インデントには半角スペース2個分のソフトタブを使用する。
* セレクタをグループ化するとき、1行毎に1つのセレクタを記述する。
* 可読性のために、開き波括弧の前に1つの半角スペースを入れる。
* 閉じ波括弧は新しい行に記述する。
* コロンのあとに1つの半角スペースを入れる。
* 各宣言は1行毎に記述する。
* 各ルールセットの間に空行を1つ入れる。
* 全ての宣言をセミコロンで終わらせる。
* コンマ区切りを使う値には、コンマの後に半角スペースを1ついれる。
* 色の値については、コンマの後にスペースを入れない。色の値（コンマ無し）とプロパティの値（コンマ有り）の違いをつける。
* 小数点以下の値を指定する時、1の位が0なら省略する。
* hex型の値は全て小文字で指定する。
* セレクタの属性はダブルクォートで記述する。
* 0の値には単位を指定しない。

```scss
// NG
.ex, .ex[type=text] {
  margin: 0px;
  background-color:rgba(0, 0, 0, 0.5);
  box-shadow:0px 1px 2px #CCC,inset 0 1px 0 #FFFFFF
}

// OK
.ex,
.ex[type="text"] {
  margin: 0;
  background-color: rgba(0,0,0,.5);
  box-shadow: 0 1px 2px #cccccc, inset 0 1px 0 #112233;
}
```











## CSS構成案「FLOCSS」

CSSの構成はサイバーエージェントのデベロッパー「谷氏」の考案する[FLOCSS](https://github.com/hiloki/flocss)をベースにします。FLOCSSはFoundation、Layout、Objectの3つのレイヤーから構成さされ、ObjectレイヤーはさらにComponent、Project、Utilityの3つの子レイヤーを内包します。レイヤー状に定義することで、カスケーディングを管理していきます。

FLOCSSではオブジェクト指向の概念が取り入れられていて、Objectレイヤーで再利用可能なコンポーネントを作成します。





### ファイル構成

FLOCSSに基づいたファイル構成を示します。

```
root
└── assets/
    ├── css/
    │   └── main.css
    └── scss/
        ├── main.scss
        ├── foundation/
        │   ├── variable/
        │   │   ├── _breakpoint.scss
        │   │   ├── _color.scss
        │   │   ├── _timing.scss
        │   │   ├── _typograph.scss
        │   │   └── _variable.scss
        │   ├── mixin/
        │   │    └── _mixin.scss
        │   ├── animation/
        │   │    └── _keyframe.scss
        │   ├── _reset.scss
        │   └── base/
        │        └── _base.scss
        ├── layout/
        │   ├── _header.scss
        │   ├── _footer.scss
        │   ├── _sidebar.scss
        │   └── _main.scss
        └── object/
             ├── component/
             │   ├── _button.scss
             │   ├── _headding.scss
             │   ├── _timing.scss
             │   └── framework
             │        └── _flex.scss
             ├── project/
             │   ├── _home.scss
             │   ├── _gallary.scss
             │   └── plugin
             │        ├── _owl.scss
             │        └── _lightbox.scss
             └── utility/
                 ├── _margin.scss
                 ├── _text.scss
                 ├── _display.scss
                 ├── _align.scss
                 └── _clearfix.scss
```





### レイヤー構造

以下に記述した順番通りにレイヤーが重なっていくイメージで、後ろのレイヤーほどより具体的になり、カスケーディングにおいて強いルールになることで、スタイルを追加していきます。


* Foundation - - - variable / mixin / animation / reset / base
* Layout - - - - - header / main / sidebar / footer
* Object
 * Component - - - button / form / pagination / headding / framework
 * Project - - - - home / blog / plugin
 * Utility - - - - clearfix / display / margin

レイヤーを読み込ませる順序は、FLOCSSのカスケーディングを管理する機能を表現するために

* 低詳細度から高詳細度
* 抽象的なスタイルから具体的なスタイル
* カスケーディング可能なモジュールからカスケーディングができないモジュール

のような流れになります。


#### Foundation

「reset.css」や「nomalize.css」などの**ブラウザデフォスタイルの初期化**や、**プロジェクトの基本的なスタイル**を定義します。
ページの下地としての「背景」や基本的な「タイポグラフィ」などが該当します。
また、プロジェクトで扱う変数と関数、アニメーションキーフレームをここで定義します。

SMACSSのBaseやMCSSのFoundationと同等です。


#### Layout

ヘッダーやフッターなど**各ページ共通のコンテナブロック**のスタイルです。ここではFLOCSSの概念を拡張して、「コンテナブロックが内包する複数ページにまたがる要素のスタイル」を含めることを許容します。グローバルナビゲーションを「header.scss」に含めたり、フッターの共通コンテンツを「footer.scss」に記述することができます。

Layoutレイヤーの要素は、基本的にページ単位で唯一の存在の要素なので、IDを付与することを推奨します。ただしIDにスタイルを与えることは禁止します。IDは詳細度を高めてしまうため、他レイヤーやコンポーネントでのスタイル指定も原則禁止します。

SMACSSのLayoutと同等ですが、異なる点として、グリッドのような汎用的に使われるコンポーネントに関しては、後述のObject/Conponentレイヤーに含まれます。

このレイヤーのクラス名には共通して`l-*`と接頭語(プレフィクス)をつけます。


#### Object

FLOCSSではすべての要素をコンポーネント(再利用可能な要素)として取り扱います。Objectはさらに3つのレイヤーから構成されており、階層観念においてレイヤー間のコンポーネントの上書き(カスケーディング)に関するルールなどを定めています。

これは、MCSSのBaseレイヤーのような構成です。


#### Object / Component

汎用性が高く、再利用できるパターンの小さな単位のコンポーネント(ボタンや見出し)を定義します。固有の幅や色をもたない、できる限りの最低限の機能を持つよう定義し、必要に応じて拡張します。

また、フレームワークなどもこのレイヤーに属します。

このレイヤーのクラス名には共通して`c-*`と接頭語(プレフィクス)をつけます。


MCSSでいうとBassと同等です。


#### Object / Project

プロジェクト(ページ)固有のパターンで、幾つかのコンポーネント(componentレイヤーより大きなもの)とそれに該当しない要素によって構成されるものを定義します。記事一覧や、プロフィール、ギャラリーなどコンテンツを具体的に構成する要素などが該当します。ページを構成するほとんどの要素がこのレイヤーに含まれます。

MCSSのProjectレイヤーと同等です。

このレイヤーのクラス名には共通して`p-*`と接頭語(プレフィクス)をつけます。


#### Object / Utility

ComponentとProjectで解決することが難しい、または適切ではない、少しのスタイル調整のための便利なクラス (ヘルパークラス)などを定義します。ComponentとProjectのオブジェクトを無尽蔵に増えることを防いだり、レイアウトの微調整をするために使用します。

このレイヤーのクラス名には共通して`u-*`と接頭語(プレフィクス)をつけます。


MCSSのCosmetisレイヤーに近いです。





### 命名規則

基本的にはBEMのクラス命名法を採用した上で、名前の接続部分についての記法を拡張しています。BEMではすべての要素を３つのレベルの解釈で説明することができます。

* [BEMとは何か？](https://github.com/juno/bem-methodology-ja/blob/master/definitions.md)


#### Block (親)

Blockはページを構成する部品(コンポーネント)です。ページや他の要素に依存することなく独立して存在できます。複数のページやシーンをまたがって再利用できるものを指しますが、そのページ固有の名前をつけて限定的に使用する場合もあります。

```scss
.card {}
.home {}
```

単語をつなぐ、及び接頭語(プレフィックス)を付与するときは`-`ハイフンを使用します。

```scss
.my-card {}
.your-card {}
```


#### Element (子)

ElementとはBlockを構成する要素です。`_`アンダーバーで繋ぎます。単純なBlockにはElementを含まない場合もありますが、いくつかの要素を含むBlockは必然的にElementを含みます。

```scss
.card_btn {}
.card_title {}
.card_image {}
.my-card_btn {}
```


#### Modifier (兄弟)

ModifierはBlockとElementに追記する、見た目の振舞いを変える**種類やバージョンを加える**スタイルです。`--`ハイフンふたつで繋ぎます。ボタンで言うと、色違いやサイズ違い、アクティブ状態などを表します。プロパティの変更時に名前に矛盾の生じないように役割(role)に応じた名前をつけることがポイントです。

Modifierは単独では使用できず、常にBlockとElementに依存するので、CSSではマルチクラスでルールを定義します。



```scss
.card {
  &.card--small {}
  &.card--large {}
}
.card_btn {
  &.card_btn--on {}
  &.card_btn--off {}
}
```

SCSS記法では`--`以前の部分が省略して記述していくことが可能ですが、可読性が良くないので禁止します。


#### BEMの解釈とルール

重要なこととして、**ElementとElementを入れ子にすることやModifierとModifierをつなぐことはできません**。常にBlockに対するElementとModifierの関係性を示すようにします。

```scss
.block_element {}
.block-name {}
.block-name_element-name {}
.block-name--modifier-value {}
.block-name_element-name--modifier-value {}
.block_element_element {} // NG
```

Blockはそれぞれがどこにでも再利用可能で配置できますが、**ElementとModifierは親となるBlockの中だけ**でしか使うことができません。

```scss
.block {
  &.block--sm {} // OK
  &.--lg {} // NG
}
```

BlockとElementは最低限のルールセットを記述し、それを**Modifierで打ち消すことなく拡張することで機能を追加**して、再利用可能な状態を維持します。


```scss
// NG
.c-btn {
  width: 100px;
  height: 30px;
  color: black;
  &.c-btn--home {
    width: 120px;
    color: red;
  }
}

// OK
.c-btn {
  height: 30px;
  color: red;
  &.c-btn--home {
    width: 120px;
  }
  &.c-btn--form {
    width: 150px;
  }
}
```


ルールをまとめます。

* 小文字の英単語とハイフン1つ（`-`）とハイフン2つ（`--`）、アンダースコア（`_`）で構成
* BlockとElementとModifierの単語はハイフン1つ（`-`）でつなぐ
* Blockは1つないし2つ以上の単語を合わせて固有の名前をつける
* BlockとElementはアンダースコア１つ（`_`）でつなぐ
* BlockとModiferもしくはElementとModiferはハイフン2つ（`--`）でつなぐ
* Element同士 / Modifier同士を連結しない
* ElementとModifierは親となるBlockの中でだけ指定することができる
* &（アンパサンド）を使ってBEMをショートカットで書くことはしない





### Javascriptのフック

Javascriptで操作され、変化した状態を表すModifier(バリエーション違い)については`is-*`と接頭語(プレフィクス)をつけます。`is-*`そのものが持つルールが他のコンポーネントのスタイルをよごしてしまうのを防ぐため、`is-*`そのものにルールを持たせるのは禁止し、マルチクラスでスタイルを指定します。

```scss
.c-btn.is-active {}
```

JavaScriptで操作する対象を指定するのには、`js-*`というプレフィクスを付与します。これも`js-*`にルールを持たせることを禁止します。





### カスケーディングのルール

FROCSSの肝となっている、レイヤー状にスタイルを構成してカスケーディングさせるためのルールです。


#### カスケーディングの禁止

モジュール間のカスケーディング、他のモジュールを親とするセレクタを用いたカスケーディングは禁止します。特定のモジュールに依存することなく、モジュールとして独立して再利用できる状態にしておくためです。

```html
.c-title .c-btn {}
```


#### カスケーディングの許容

例外として、projectレイヤーはcomponentレイヤーのモジュールを限定的に上書きできます。しかし、他のモジュールを親に持つのは1つとします。このとき必要に応じて`!important`を宣言することができます。

```html
<div class="c-btn p-info_btn">button</div> // OK
<div class="c-btn p-info_btn p-news_btn">button</div> // NG
<div class="c-btn c-btn--default p-info_btn">button</div> // OK
```

```scss
.p-info_btn {
  &.c-btn {
    width: 1000px !important;
  }
}
```


#### カスケーディングを回避して拡張していく

基本的にカスケーディングすることを避け、BlockのElementやModifierによって拡張することを推奨します。そうすることで、セレクタの詳細度を高くするのを防げます。


#### モジュール内のカスケーディング

他のレイヤーやモジュールを横断してのカスケーディングは禁止しますが、モジュール内で完結するカスケーディング、及びマルチクラス指定は許容します。特に、FLOCSSではModifierのクラスはマルチクラスでスタイルを指定します。

```scss
.c-btn {
  &.c-btn--alert {}
  &.c-btn--sm {}
}
```





### Sassのパーシャル機能での@import

Sassのパーシャル機能を使用してファイルをFLOCSSの機能ごとに分割して管理をして、順序を指定してCSSにコンパイルしてまとめます。


* 1つのファイルごとに@importを宣言する
* 各@importごとに改行します
* 同じフォルダからのインポートの間には改行しない
* ファイルの拡張子`.scss`を省略する
* 積極的にコメントを入れます

```scss
// ============================================
// Foundation
// ============================================
//
// ----- variable ----- //
@import "foundation/variable/_variable";
//
// ----- mixin ----- //
@import "foundation/mixin/_mixin";
//
// ----- animation keyframes ----- //
@import "foundation/animatinon/_keyframes";
//
// ----- reset css ----- //
@import "foundation/_reset";
//
// ----- base css ----- //
@import "foundation/base/_base";
```










## プロパティの宣言順

プロパティの宣言順は以下のようなルールでグルーピングして記述します。


* Positioning（位置関係）
* Box model（ボックスモデル）
* Typographic（フォント関係）
* Visual（見た目）
* Animation (振る舞い)

```scss
.my-order {


/* Positioning */

position: absolute;
top: 0;
right: 0;
bottom: 0;
left: 0;
z-index: 100;


/* Box-model */

display: block;
visibillity: hidden;
float: right;
width: 100px;
height: 100px;
margin: 0 auto;
padding: 1em;


/* Typography */

font-size: 2rem;
line-height: 1.5;
color: #333;
text-align: center;
letter-spacing: nomal;
white-space: nowrap;


/* Visual */

background-color: #f5f5f5;
border: 1px solid #e5e5e5;
border-radius: 3px;
list-style: none;
content: '';
opacity: 1;


/*animation*/

transition: .2s 1s ease;
animation: anime 1 2s;

}
```

アルファベット順で記述することは禁止します。プロパティは整列することではなく、機能を読解しやすいように分類しておくことが重要だからです。







## コメント

コードの機能、ルールの意図、目次を示すために積極的にコメントを使用することを推奨します。「誰がいつ見ても理解できる」を心掛けて、ソースをサポートできるコメントを記述します。

コメントの残し方は一貫するようにしましょう。


```
// =========================================================
//
// level1
//
// =========================================================

// ---------------------------------------------------------
// level2
// ---------------------------------------------------------

// ----- level3 ----- //
```








## 単語の省略の制限

意味がわかりにくい単語の省略を禁止します。わかりやすい周知の`navigation`を`nav`や`button`を`btn`に省略するようなことは許容しますが、`title`を`ttl`と省略したり、`text`を`txt`と省略するのは意味がわかりにくいですし、ほとんど短くなりません。

省略することよりも名前をつけて意味を伝わりやすく、可読性を確保することを優先とします。省略語を使いたい場合はスタイルガイドやコメントで共有するようにします。

```
// - 省略語を共有します - - - - - -
// NMB48 ... 難波
// AKB48 ... 秋葉原
// kwsk  ... くわしく
// - - - - - - - - - - - - - -
```










## ベンダープレフィクスの管理

プロジェクトに応じたベンダープリフィックスを付与しますが、これは手動で行わずにAutoprefixerを使います。gulpのプラグインで設定したものを自動化してコンパイルに組み込んでしまうことで管理を簡単にして一貫性を保ちます。





---





## 美しいスタイルシートのコツ

ここからは美しいスタイルシートを作成する上で、気にかけたい項目についてまとめます。





### 絶対値のプロパティを避け相対値のプロパティを検討する

絶対値を指定することは、レスポンシブデザイン構築の際に邪魔なスタイルが発生したり、不必要なルールセットが増える可能性があるので、原則避けることを推奨します。親や祖先要素に依存したルールセットを心がけましょう。

また、そのルールが必ず必要か、ということも考え直してみるのもいいかもしれません。

特にフォントサイズに関しては、必ず`rem`の単位を使用します。これはJavaScript操作で手軽にフォントサイズの底上げを行いやすくしておくためです。フォローバックとして`mixin`で`px`の単位を関数で生成します。

```scss
.text {
  line-height: 16px; // NG
  line-height: 1.95; // OK
  width: 300px; // NG
  width: 94.5%; // OK
  font-size: 30px; //NG
  font-size: 2rem; // OK
}
```





### 絶対値を想像させるクラス名を避ける

ユーティリーティクラスやmodifierなどでプロパティの値をクラス名に反映しないようにします。役割や目的や種別をクラス名に与えるようにしましょう。

```scss
// NG
.u-mg-1em {
  margin-bottom: 1em;
}
.u-mg-5em {
  margin-bottom: 5em;
}

// OK
.u-mg-sm {
  margin-bottom: 1em;
}
.u-mg-lg {
  margin-bottom: 5em;
}
```





### インライン記述を使用しない

`style`属性に記述することは原則禁止します。HTML(構造)に見た目を記述することはできる限り許容しないことで構造と見た目の分離を実現します。

ただし、`background-image`はHTMLに記述することを推奨します。画像に関してはHTML側で確認できる方が望ましく、PHPでループを組む際などには必須となるので、`style`属性を利用します。


```
<div style="color:red;"></div> // NG
<div style="background-image: url("image.jpg");"></div> // OK
```





### 省略する記述(ショートハンド)

省略形の宣言は、全ての値を設定する場合のみ利用します。一般的な省略形の宣言は

* padding
* margin
* font
* border
* background


ほとんどの場合は全ての値を設定する必要がないことが多いです。例えば、余白をブレイクポイントごとに変えたい場合はその値だけを上書きするように記述するようなことです。

```scss
// NG
.ex {
  margin: 50px 0 0;
  background: rgba(0,0,0,.5);
  border-radius: 50% 0 0 0;
}

// OK
.ex {
  margin-top: 50px;
  background-color: rgba(0,0,0,.5);
  border-top-left-radius: 50%;
}
```





### 詳細度を低く保つ

詳細度を低く保つことでカスケーディングしやすいスタイルシートを作成することができます。詳細度を高めてしまいやすいセレクタは使用しません。

* `!important`を原則使わない
* `id`セレクタを禁止する
* `class`属性をBEMで割り振る
* クラスセレクタと要素セレクタを連結しない

原則的に`!important`を使わないようにします。ただし、FLOCSSのルールに基づいた使用は可能です。

utilityレイヤー`u-*`では必ず与えたルールを適用させたいので、`!important`を使います。componentレイヤーを上書きするためのprojectレイヤーのルールセットは`!important`を使用することを推奨しています。

属性セレクタはHTMLの構造に強く依存するので、保守に弱い(HTMLに変更が加えられるとCSSにも影響が出てしまう)スタイルシートになってしまうので避けます。**基本的には`class`属性をHTMLで割り振って**クラスセレクタでスタイルシートを構成していきます。

上位レイヤーで詳細度を強くしたい場合は、マルチクラス指定などで詳細度をコントロールします。





### media queryを近くに

media queryを含むルールは**関係する要素の近くに入れ子にして記述**します。それぞれを別のセクションとしてまとめることはしません。

```scss
.ex {
  font-size: 2rem;
  @media (min-width: 610px) {
    font-size: 3rem;
  }
  @media (min-width: 980px) {
    font-size: 4rem;
  }
}
```





### 構造と見た目の分離

HTMLでは構造を表現し、CSSでは見た目を表現します。クラスを命名するときは**見た目を表す名前ではなく目的や役割や場所を表す名前**を付けます。


```scss
.btn {
  // NG
  &.btn--red {}
  &.btn--blue {}
  // OK
  &.btn--aleart {}
  &.btn--success {}
}
```





### 固定の幅や高さを持たせない

不必要に固定の幅や高さを与えると、レスポンシブデザイン構築の際に問題が出てくることが多いです。

`max-width`や`max-height`などで可変を許容したプロパティを検討します。






































　
