# Best Android Dialog Libraries 2022

Because am always creating apps every week, I tend to use lots of third party libraries. It saves me plenty of time and enables me stay productive by focusing on what my clients and students need. I therefore tend to research libraries and try them out. Sometimes you get great libraries that work, sometimes great-looking ones that don't work. Sometimes you have to do a pull request on an unmaintained library,update it and make it work.  Today I want to list out the libraries I think are the best in the planet, when it comes to android dialogs.


### What Are Dialogs?

Android Dialogs are important when you want to show messages to users in an interactive way. The alternative is showing toasts messages but such messages get auto-dismissed thus leaving you with no way of knowing where the message went through. A dialog blocks the current view ensuring that the user has to respond.

Here are some usages of dialogs:

1. Showing blocking messages with buttons.
2. Providing input interface, where the dialog has an edittext and buttons.
3. Choice dialogs can be used for choosing an item. The dialog can be either single or multiple choice dialog.

Dialogs typically get dismissed if you click an area outside the dialog. However in some cases you can prevent this behavior. For example, when creating Termima- A Terms and Definitions app, I was using a custom lovely dialog to input terms and definitions. It was a single page app and I didn't want the user to loose all he/she's typed just by accidentally clicking outside the dialog, therefore I overrode this behavior(of the dialog getting dismissed) to make the app more user friendly.

![](https://cdn-0.camposha.info/wp-content/uploads/2020/05/termima_add.png)

```java
    /**
     * This method will:
     * 1. Create our input dialog. We can use this dialog for either update or delete
     *
     * @param forEdit
     */
    private void createCustomDialog(Boolean forEdit, Term t) {
        Term term = forEdit ? t : new Term();
        LovelyCustomDialog d = new LovelyCustomDialog(this);
        d.setTopColorRes(R.color.colorPrimary)
                .setView(R.layout.dialog_edit)
                .setTitle("Terms Editor")
                .setTitleGravity(Gravity.CENTER_HORIZONTAL)
                .setMessage("Enter term and meaning and click save")
                .setMessageGravity(Gravity.CENTER_HORIZONTAL)
                .setIcon(R.drawable.flip_page)
                .setCancelable(false)
                .configureView(rootView -> {
                    termTxt = rootView.findViewById(R.id.termTxt);
                    meaningTxt = rootView.findViewById(R.id.meaningTxt);
                    Button saveBtn = rootView.findViewById(R.id.saveBtn);

                    saveBtn.setText(forEdit ? "UPDATE" : "ADD");
                    termTxt.setText(forEdit ? term.getTerm() : "");
                    meaningTxt.setText(forEdit ? term.getMeaning() : "");

                    saveBtn.setOnClickListener(view -> {
                        term.setTerm(termTxt.getText().toString());
                        term.setMeaning(meaningTxt.getText().toString());
                        term.setDate(mv.SELECTED_DATE);
                        if (forEdit) {
                            mv.update(MainActivity.this, term);
                            d.dismiss();
                        } else {
                            mv.insert(MainActivity.this, term);
                        }
                    });
                })
                .setListener(R.id.cancelBtn, view -> d.dismiss())
                .show();
    }
```

In that app I was using LovelyDialog which we will also look at here.

Here are the best libraries I have found in github.

NB/= Am not listing this libraries in order of their quality or rating. These are open source libraries and it's unfair to try to judge the work done by other developers. Moreover \\`best\` is subjective.

### (a). MaterialDialogs

_A beautiful, fluid, and extensible dialogs API for Kotlin & Android._

From the image above you can see that this library provides a variety of dialog types. From one dialog library you get:

1. Info Dialogs
2. Input dialogs
3. Choice dialogs
4. DatePickers
5. BottomSheet dialogs
6. Color dialogs.
7. File Dialogs.

I may use it for my next project because the one I normally use(LovelyDialogs) doesn't include all the above. Moreover the dialogs are separated in modules implying you install only the module you want.

**Installation**

You install the material dialogs by first specifying the core module:

```groovy
dependencies {
  ...
  implementation 'com.afollestad.material-dialogs:core:3.3.0'
}
```

Then the pariticular dialog:

```groovy
dependencies {
  ...
  implementation 'com.afollestad.material-dialogs:input:3.3.0'
}
```

**Usage**

_How do you Use Material Dialogs?_

For example you can create and show the input dialog as follows:

```kotlin
MaterialDialog(this).show {
  input()
  positiveButton(R.string.submit)
}
```

Then obtain the text value as follows:

```kotlin
val dialog: MaterialDialog = // ...
val inputField: EditText = dialog.getInputField()
```

Mmmh! Quite clean.

For example say you want to receive a callback every time the positive button is clicked so that you get the entered text:

```kotlin
MaterialDialog(this).show {
  input { dialog, text ->
      // Text submitted with the action button
  }
  positiveButton(R.string.submit)
}
```

If you want to receive a callback everytime the textfield is modified you use the waitForPositiveButton:

```kotlin
MaterialDialog(this).show {
  input(waitForPositiveButton = false) { dialog, text ->
      // Text changed
  }
  positiveButton(R.string.done)
}
```

To set **hint** to the dialog edittext

```kotlin
MaterialDialog(this).show {
  input(hint = "Your Hint Text")
}
```

To customize the **input types** of the dialog edittext:

```kotlin
val type = InputType.TYPE_CLASS_TEXT or
  InputType.TYPE_TEXT_VARIATION_EMAIL_ADDRESS

MaterialDialog(this).show {
  input(inputType = type)
}
```

To set **maximum** length on the edittext:

```kotlin
MaterialDialog(this).show {
  input(maxLength = 8)
  positiveButton(R.string.submit)
}
```

To do **custom validation** on the dialog edittexts:

```kotlin
MaterialDialog(this).show {
  input(waitForPositiveButton = false) { dialog, text ->
    val inputField = dialog.getInputField()
    val isValid = text.startsWith("a", true)

    inputField?.error = if (isValid) null else "Must start with an 'a'!"
    dialog.setActionButtonEnabled(POSITIVE, isValid)
  }
  positiveButton(R.string.submit)
}
```

Read more [here](https://github.com/afollestad/material-dialogs).

### (b). LovelyDialogs

_This library is a set of simple wrapper classes that are aimed to help you easily create fancy material dialogs._

I have been using this simple library extensively and it has never failed me. It gives you exactly what you want. It's very straight forward to use and while it's not updated that regularly, it works flawlessly.

It doesn't subclass any Dialog related classes, it is just a lightweight extensible wrapper for Dialog and manipulations with custom view.

Here are the dialog types you get from this library:

1. LovelyStandardDialog
2. LovelyInfoDialog
3. LovelyTextInputDialog
4. LovelyChoiceDialog
5. LovelyProgressDialog
6. LovelyCustomDialog

![](https://camposha.info/wp-content/uploads/2020/05/lovelydialogs_framed.png)

**Installation**

Here is how you install LovelyDialogs

```groovy
implementation 'com.yarolegovich:lovely-dialog:1.1.0'
```

**Usage Examples**

For example here is how you create a **lovely standard dialog**:

```java
new LovelyStandardDialog(this, LovelyStandardDialog.ButtonLayout.VERTICAL)
      .setTopColorRes(R.color.indigo)
      .setButtonsColorRes(R.color.darkDeepOrange)
      .setIcon(R.drawable.ic_star_border_white_36dp)
      .setTitle(R.string.rate_title)
      .setMessage(R.string.rate_message)
      .setPositiveButton(android.R.string.ok, new View.OnClickListener() {
          @Override
          public void onClick(View v) {
              Toast.makeText(context, "positive clicked", Toast.LENGTH_SHORT).show();
          }
      })
      .setNegativeButton(android.R.string.no, null)
      .show();
```

And if you want to show an info dialog with scrollable content, and  provide "Don't Show Again" option:

```java
new LovelyInfoDialog(this)
      .setTopColorRes(R.color.darkBlueGrey)
      .setIcon(R.drawable.ic_info_outline_white_36dp)
      //This will add Don't show again checkbox to the dialog. You can pass any ID as argument
      .setNotShowAgainOptionEnabled(0)
      .setNotShowAgainOptionChecked(true)
      .setTitle(R.string.info_title)
      .setMessage(R.string.info_message)
      .show();
```

Normally in my projects, I always like showing single choice dialogs to allow users to select categories. Here is how LovelyDialogs enables usage of **single choice dialogs**:

```java
ArrayAdapter adapter = new DonationAdapter(this, loadDonationOptions());
new LovelyChoiceDialog(this)
      .setTopColorRes(R.color.darkGreen)
      .setTitle(R.string.donate_title)
      .setIcon(R.drawable.ic_local_atm_white_36dp)
      .setMessage(R.string.donate_message)
      .setItems(adapter, new LovelyChoiceDialog.OnItemSelectedListener() {
           @Override
           public void onItemSelected(int position, DonationOption item) {
               Toast.makeText(context, getString(R.string.you_donated, item.amount),Toast.LENGTH_SHORT).show();
           }
      })
      .show();
```

If am creating something like a news app, I like using **multi-choice dialogs** for selection of tags, suppose the tags are pre-defined:

```java
String[] items = getResources().getStringArray(R.array.food);
new LovelyChoiceDialog(this, R.style.CheckBoxTintTheme)
      .setTopColorRes(R.color.darkRed)
      .setTitle(R.string.order_food_title)
      .setIcon(R.drawable.ic_food_white_36dp)
      .setItemsMultiChoice(items, new LovelyChoiceDialog.OnItemsSelectedListener() {
          @Override
          public void onItemsSelected(List positions, List items) {
              Toast.makeText(MainActivity.this,
                      getString(R.string.you_ordered, TextUtils.join("\n", items)),
                      Toast.LENGTH_SHORT)
                      .show();
          }
      })
      .setConfirmButtonText(R.string.confirm)
      .show();
```

LovelyDialogs also provides the option inputing texts via LovelyTextInputDialog

```java
new LovelyTextInputDialog(this, R.style.EditTextTintTheme)
      .setTopColorRes(R.color.darkDeepOrange)
      .setTitle(R.string.text_input_title)
      .setMessage(R.string.text_input_message)
      .setIcon(R.drawable.ic_assignment_white_36dp)
      .setInputFilter(R.string.text_input_error_message, new LovelyTextInputDialog.TextFilter() {
          @Override
          public boolean check(String text) {
              return text.matches("\\w+");
          }
      })
      .setConfirmButton(android.R.string.ok, new LovelyTextInputDialog.OnTextInputConfirmListener() {
           @Override
           public void onTextInputConfirmed(String text) {
              Toast.makeText(MainActivity.this, text, Toast.LENGTH_SHORT).show();
           }
      })
      .show();
```

Well there is also the **progress dialog** if you want to show some message for example when connecting to the server:

```java
new LovelyProgressDialog(this)
      .setIcon(R.drawable.ic_cast_connected_white_36dp)
      .setTitle(R.string.connecting_to_server)
      .setTopColorRes(R.color.teal)
      .show();
```

You can also create a custom dialog based on LovelyDialogs:

```java
new LovelyCustomDialog(this)
      .setView(R.layout.item_donate_option)
      .setTopColorRes(R.color.darkDeepOrange)
      .setTitle(R.string.text_input_title)
      .setMessage(R.string.text_input_message)
      .setIcon(R.drawable.ic_assignment_white_36dp)
      .configureView(/* ... */)
      .setListener(R.id.ld_btn_yes, /* ... */)
      .setInstanceStateManager(/* ... */)
      .show();
```

Read more [here](https://github.com/yarolegovich/LovelyDialog).

### (c). MaterialStyledDialogs

_Android Library that shows a beautiful and customizable Material designed dialog with header._

The author was inspired by this [dribble](https://dribbble.com/shots/2439453-Sprocket-AND-1-3-3-OS-Consistent-Dialogs).

![](https://raw.githubusercontent.com/javiersantos/MaterialStyledDialogs/master/Screenshots/banner.png)

**Installation**

This library is hosted in jitpack, hence the first thing is to  register it in your root level build.gradle:

```groovy
repositories {
    jcenter()
    maven {
        url "https://jitpack.io"
    }
}
```

The library has been recently updated to support androidx. Here is how you install it:

```groovy
dependencies {
    implementation 'com.github.javiersantos:MaterialStyledDialogs:3.0.1'
}
```

**Usage Examples**

This library is very simple to use. For example to create a dialog with title,description and header:

```kotlin
MaterialStyledDialog.Builder(this)
    .setTitle("Awesome!")
    .setDescription("What can we improve? Your feedback is always welcome.")
    .show()
```

Or if you want to obtain the dialog reference for manipulation later:

```kotlin
val dialog = MaterialStyledDialog.Builder(this)
    .setTitle("Awesome!")
    .setDescription("What can we improve? Your feedback is always welcome.")
    .build()
dialog.show()
```

To set a style:

```kotlin
MaterialStyledDialog.Builder(this)
    .setTitle("Awesome!")
    .setDescription("What can we improve? Your feedback is always welcome.")
    .setStyle(Style.HEADER_WITH_ICON)
    .show()
```

To set an icon:

```kotlin
MaterialStyledDialog.Builder(this)
    .setTitle("Awesome!")
    .setDescription("What can we improve? Your feedback is always welcome.")
    .setIcon(R.drawable.ic_launcher)
    .show()
```

To set custom header color:

```kotlin
MaterialStyledDialog.Builder(this)
    .setTitle("Awesome!")
    .setDescription("What can we improve? Your feedback is always welcome.")
    .setHeaderColor(R.color.dialog_header)
    .show()
```

To use an image as the header background:

```kotlin
MaterialStyledDialog.Builder(this)
    .setTitle("Awesome!")
    .setDescription("What can we improve? Your feedback is always welcome.")
    .setHeaderDrawable(R.drawable.header)
    .show()
```

To add a grey overlay to the header background:

```kotlin
MaterialStyledDialog.Builder(this)
    .setTitle("Awesome!")
    .setDescription("What can we improve? Your feedback is always welcome.")
    .setHeaderDrawable(R.drawable.header)
    .withDarkerOverlay(true)
    .show()
```

To animate the icons in the dialog:

```kotlin
MaterialStyledDialog.Builder(this)
    .setTitle("Awesome!")
    .setDescription("What can we improve? Your feedback is always welcome.")
    .withIconAnimation(true)
    .setIconAnimation(R.anim.your_animation)
    .show()
```

To animate dialog itself:

```kotlin
MaterialStyledDialog.Builder(this)
    .setTitle("Awesome!")
    .setDescription("What can we improve? Your feedback is always welcome.")
    .withDialogAnimation(true)
    .show()
```

To add button callbacks:

```kotlin
MaterialStyledDialog.Builder(this)
    .setTitle("Awesome!")
    .setDescription("What can we improve? Your feedback is always welcome.")
    .setPositiveText(R.string.button)
    .onPositive { Log.d("MaterialStyledDialogs", "Do something!"); }
    .show()
```

To obtain the buttons outside the builder:

```kotlin
val dialog = MaterialStyledDialog.Builder(this)
    .setTitle("Awesome!")
    .setDescription("This is a sample description.")
    .show()

dialog.positiveButton().text = "Positive"
dialog.negativeButton().text = "Negative"
```

If you want to disable cancelation of the dialog when the user clicks outside the dialog:

```kotlin
MaterialStyledDialog.Builder(this)
    .setTitle("Awesome!")
    .setDescription("What can we improve? Your feedback is always welcome.")
    .setCancelable(false)
    .show()
```

To add a custom view to the dialog:

```kotlin
MaterialStyledDialog.Builder(this)
    .setTitle("Awesome!")
    .setDescription("What can we improve? Your feedback is always welcome.")
    .setCustomView(your_custom_view)
    .show()
```

To make the content scrollable:

```kotlin
MaterialStyledDialog.Builder(this)
    .setTitle("Awesome!")
    .setDescription("A loooooooooong looooooooooong really loooooooooong content. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam pulvinar sem nibh, et efficitur massa mattis eget. Phasellus condimentum ligula.")
    .setScrollable(true)
    .show()
```

Read more [here](https://github.com/javiersantos/MaterialStyledDialogs).
