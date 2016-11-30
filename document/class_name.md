# CSS クラス名リスト

CSSで命名によく使われる単語の意味や機能をまとめて、実際の運用でどこを標準とするかを共有できるようにします。

FLOCSSとBEMを利用することをベースに補足説明しています。








## レイアウト

Layoutレイヤーで利用するサイト全体の大きい区切りを表します。

* `header` 「サイトのヘッダー」
* `footer` 「サイトのフッター」
* `sidebar` 「サイトのサイドバー/補足記事」
* `main` 「メインコンテンツ」









## コンテンツ

ページの区分などに利用するので、`<body>`にBlockとして利用したり、Modifierとしてコンポーネントを拡張するのに使います。

* `article` 「記事」
* `post` 「投稿」
* `home` 「トップページ」
* `archive` 「過去記事一覧」
* `category` 「カテゴリー」
* `about` 「〜について」
* `work` 「制作物」
* `product` 「製品」
* `service` 「サービス」
* `news` 「お知らせ」
* `event` 「行事／イベント」
* `history` 「沿革／ヒストリー」
* `concept` 「構想／コンセプト」
* `recommend` 「おすすめ、推奨」
* `index` 「索引／目次」
* `blog` 「ブログ」
* `contact` 「問い合わせ(連絡)」
* `inquiry` 「問い合わせ(質問)」
* `access` 「交通手段／アクセス」
* `shop`  「店舗」
* `detail`  「詳細」
* `info` 「情報」





## UI

UIのコンポーネント名をゆるく分類します。BlockをElementとして使ったりその逆として利用しても場合によっては問題ないです。




### Block


* `hero` 「メイン(キー)ビジュアル」
* `feature` 「サービスの特徴を説明しているコンポーネント」
* `bar` 「横並びのコンポーネントのまとまり」
* `group` 「おなじ分類のコンポーネントのまとまり」
* `category` 「分類／カテゴリ」
* `banner` 「バナー」
* `table` 「表」
* `logo` 「ロゴ」
* `btn` 「ボタン」
* `nav` 「ナビゲーション」
* `menu` 「メニュー」
* `list` 「一覧」
* `breadcrumb` 「パンくずリスト」
* `pagination` 「ページ番号のナビゲーション」
* `backtotop` 「ページトップに戻るリンク」
* `timeline` 「年表」
* `toggle` 「切り替えボタン」
* `dropdown`  「トリガーで複数項目を表示して、選択させるUI」
* `media` 「横並びテキストと画像の長方形のUI」
* `card` 「カード型で画像とキャプションのUI」
* `tile` 「タイル状で単純な機能のUI」
  * `panel` 「`tile`とおなじ」
* `tab` 「複数項目を切り替えるUI」
* `modal` 「トリガーでコンテンツをポップアップするUI」
* `carousel` 「コンテンツをスライドして切り替えるUI(複数表示)」
  * `slider`「`carousel`とおなじ(単体表示)」
* `accordion` 「選択項目以外を閉じるUI」







### Element

* `img` 「画像」
* `avatar` 「人の顔の画像」
* `caption` 「画像・図表の補足／キャプション」
* `thumb` 「thumbnailの略語で縮小画像」
* `info` 「情報」
* `map` 「地図」
* `tag` 　「タグ」
* `badge` 「タグ(数値)」
* `icon` 「アイコン」
* `date` 「日付」
* `time` 「日時」
* `target` 「対象／リンク」
* `wrap` 「包んでいるところ」
  * `outer` 「`wrapper`とおなじ」
* `area` 「場所／範囲」
* `section` 「セクション／区分」
* `inner` 「内側」
* `outer` 「外側」
* `body` 「主要な部分」
* `head` 「上部」
* `foot` 「下部」
* `intro` 「導入」
* `summary` 「要約」
* `title` 「タイトル」
* `lead` 「見出しの補足／リード文」
* `note` 「注釈」
* `description` 「概要」
* `item` 「リストの項目」
* `col` 「columnの略語で縦列」
* `row` 「横列」
* `text` 「本文」
* `link` 「リンク」
* `lead` 「リード文」
* `emphasis` 「強調、重視」
* `overlay` 「要素の上に覆いかぶさるコンポーネント」






### Modifier

* `xs` 「とても小さい」
* `sm` 「小さい」
* `md` 「中くらい」
* `lg` 「大きい」
* `ex` 「とても大きい」
* `reverse` 「反転」
* `offset` 「相殺する」
* `left` 「左側」
* `center` 「中央」
* `right` 「右側」
* `top` 「上部」
* `middle` 「中央」
* `bottom` 「下部」
* `next` 次の
* `prev` 「previousの略語で前の」
* `success` 「成功」
* `alert` 「注意」
* `primary` 「主要な」
* `secondary` 「補助的な」
* `common` 「共通の」
* `local` 「局所的な」
* `general` 「一般的な」
* `related` 「関連のある」






## 状態

javascriptの操作で変更された状態を表すときに`is-*`として使うクラスです。

* `show`  「可視状態」
* `hide`  「不可視状態」
* `open`  「開いている」
* `close`  「閉じている」
* `on`  「入」
* `off`  「切」
* `current` 「現在」
* `active` 「有効」
* `disabled` 「無効」
