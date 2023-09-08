# Rich Text Editor


The standard android edittext is pretty basic. It does not include the variety of formatting features you would expect from an editor to be use in a serious publishing application. Fortunately we can easily incorporate third party editors in our applications easily. In this article we explore several rich text editor libraries and how to install them and use them in our apps.


### (a). RichEditor

This is a beautiful Rich Text `WYSIWYG Editor` for `Android`.

![](https://camposha.info/wp-content/uploads/2020/12/wasabeef_richeditor-android.gif)

**Features**

Here are the features it supports:

- [x] Bold
- [x] Italic
- [x] Subscript
- [x] Superscript
- [x] Strikethrough
- [x] Underline
- [x] Justify Left
- [x] Justify Center
- [x] Justify Right
- [x] Blockquote
- [x] Heading 1
- [x] Heading 2
- [x] Heading 3
- [x] Heading 4
- [x] Heading 5
- [x] Heading 6
- [x] Undo
- [x] Redo
- [x] Indent
- [x] Outdent
- [x] Insert Image
- [x] Insert Youtube
- [x] Insert Video
- [x] Insert Audio
- [x] Insert Link
- [x] Checkbox
- [x] Text Color
- [x] Text Background Color
- [x] Text Font Size
- [x] Unordered List (Bullets)
- [x] Ordered List (Numbers)

**Attribute change of editor**

- [x] Font Size
- [x] Background Color
- [x] Width
- [x] Height
- [x] Placeholder
- [x] Load CSS
- [x] State Callback

**Installation**

Here is how to install the library:

```groovy
dependencies {
  implementation 'jp.wasabeef:richeditor-android:2.x.x'
}
```

### Default Setting for Editor

* * *

**Height**

```java
editor.setEditorHeight(200);
```

**Font**

```java
editor.setEditorFontSize(22);
editor.setEditorFontColor(Color.RED);
```

**Background**

```java
editor.setEditorBackgroundColor(Color.BLUE);
editor.setBackgroundColor(Color.BLUE);
editor.setBackgroundResource(R.drawable.bg);
editor.setBackground("https://raw.githubusercontent.com/wasabeef/art/master/chip.jpg");
```

**Padding**

```java
editor.setPadding(10, 10, 10, 10);
```

**Placeholder**

```java
editor.setPlaceholder("Insert text here...");
```

**Links**

1. Download the code [here](https://github.com/wasabeef/richeditor-android).
2. Follow the author [here](https://github.com/wasabeef).
