# Kotlin Android Dialog Examples


In this article we want to see several `android.app.Dialog` examples. From simple alert dialog to custom dialogs with buttons. The aim is to create these dialog using standard android sdk classes and not the many countless third party libraries available.

Here are the concepts you will learn from this tutorial:

1. How to create an alert dialog
2. How to create a dialog with a custom layout.


### What is a dialog?

> Android Dialog class is the base class for all dialogs in android and was added in `Android API 1.0`.

It's a public class that extends the `java.lang.Object`.This class implements 4 interfaces:

1. DialogInterface.
2. Window.Callback.
3. KeyEvent.Calllback.
4. View.OnCreateContextMenuListener.

The Dialog class resides in the `android.app` package.Some of the direct subclasses of this class include:

| No. | SubClass Type | SubClass |
| --- | --- | --- |
| 1. | AlertDialog | Direct |
| 2. | AppCompatDialog | Direct |
| 3. | CharacterPickerDialog | Direct |
| 4. | MediaRouteChooserDialog | Direct |
| 5. | Presentation | Direct |
| 6. | AlertDialog | Indirect |
| 7. | BottomSheetDialog | Indirect |
| 8. | DatePickerDialog | Indirect |
| 9. | MediaRouteControllerDialog | Indirect |
| 10. | ProgressDialog | Indirect |
| 11. | TimePickerDialog | Indirect |

## Example 1: How to create a dialog with custom layout.

In this example we will learn how to create a custom dialog. The dialog will have an image, text and button All these components will be specified via a custom layout.

### Step 1: Dependencies

We don't use third party dependencies in this tutorial.

### Step 2: Code

We use Java to create our app.

**MainActivity.java**

Add the following code in your `MainActivity` class:

```java
package info.camposha.simplecustomdialog;

import android.app.Dialog;
import android.os.Bundle;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.android.material.floatingactionbutton.FloatingActionButton;

public class MainActivity extends AppCompatActivity {

    Dialog dialog;
    TextView showBtn,cancelBtn;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //CREATE DIALOG
        createDialog();

        FloatingActionButton fab = (FloatingActionButton) findViewById(R.id.fab);
        fab.setOnClickListener(view -> {

            //show
            dialog.show();
        });

        //SHOW BTN CLIKCED
        showBtn.setOnClickListener(v -> Toast.makeText(MainActivity.this,"CLICKED",Toast.LENGTH_LONG).show());

        //CANCEL
        cancelBtn.setOnClickListener(v -> dialog.dismiss());

    }

    private void createDialog()
    {
        dialog=new Dialog(this);

        //SET TITLE
        dialog.setTitle("Player");

        //set content
        dialog.setContentView(R.layout.custom_layout);

        showBtn= (TextView) dialog.findViewById(R.id.showTxt);
        cancelBtn= (TextView) dialog.findViewById(R.id.cancelTxt);
    }

}
```

### Step 3: Layout

You will find the layout in the source code

### Step 4: Run

Run the project. You will get the following:

![](https://github.com/Oclemy/SimpleCustomDialog/raw/master/SimpleCustomDialog.gif)

### Step 5: Download

Download the code [here](https://github.com/Oclemy/SimpleCustomDialog).

## Example 2: Android Custom Dialog with Circular Reveal Effect

In this example you will learn how to animate a custom dialog. We design the Dialog UI in a custom layout and animate the opening of the dialog with a circular reveal effect animation.

Here is the demo of the project we will create:

![Open Dialog with Circular Reveal Effect Example](https://camposha.info/android-examples/wp-content/uploads/sites/9/2021/05/Open-Dialog-with-Circular-Reveal-Effect-Example.png)

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No special or third party dependency is needed.

### Step 3: Design Layouts

We will have two layouts:

**(a). custom_dialog_view.xml**

This is the layout for our custom dialog. We design it by adding a couple of TextView widgets as well as an ImageView:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:id="@+id/customAlertDialog"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:background="@color/colorAccent">

    <RelativeLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        >
        <TextView
            android:id="@+id/working"
            android:layout_marginTop="20dp"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            style="@style/Base.TextAppearance.AppCompat.Headline"
            android:text="Thanks its Working"
            android:textAlignment="center"
            android:textColor="@color/white"
            android:layout_centerHorizontal="true"
            />

        <TextView
            android:id="@+id/dialogOpen"
            android:layout_below="@id/working"
            android:layout_marginTop="20dp"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="This dialog opens with reveal effect"
            android:textAlignment="center"
            android:textColor="@color/white"
            android:textSize="20dp"
            android:layout_centerHorizontal="true"/>

        <ImageView
            android:id="@+id/SuccessImage"
            android:layout_below="@id/dialogOpen"
            android:layout_marginTop="20dp"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:src="@drawable/success"
            android:layout_marginBottom="50dp"
            android:layout_centerHorizontal="true"
            />

    </RelativeLayout>

</LinearLayout>
```

**(b). activity_main.xml**

This is the layout for our MainActivity. We will add a simple button that when clicked will open our dialog:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <Button
        android:id="@+id/buttonDialog"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Open Dialog In Reveal"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```

### Step 4: Create Activity

Here is how we will open our dialog with the circular reveal effect:

```java
    private void revealShow(View rootView, boolean reveal, final AlertDialog dialog) {
        final View view = rootView.findViewById(R.id.customAlertDialog);

        // TO Open from top and center of Button
        int w = (showDialogButton.getLeft() + showDialogButton.getRight());
        int h = (showDialogButton.getTop() + showDialogButton.getBottom()) / 2;

        float maxRadius = (float) Math.sqrt(w * w/ 4 + h * h / 4);

        if (reveal) { // if yes grows the animation and makes view as VISIBLE
            Animator revealAnimator = ViewAnimationUtils.createCircularReveal(view,w/2,h/2,0,maxRadius);
            view.setVisibility(View.VISIBLE);
            revealAnimator.start();

        } else { // else No grows to inside of dialog
            Animator anim = ViewAnimationUtils.createCircularReveal(view,w/2,h/2,maxRadius,0);
            anim.addListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    super.onAnimationEnd(animation);
                    alertDialog.dismiss(); // Dismisses the Alert Dialog
                    view.setVisibility(View.INVISIBLE);
                }
            });
            anim.start();
        }
```

Here's the full code:

**MainActivity.java**

```java

public class MainActivity extends AppCompatActivity {

    AlertDialog alertDialog;
    ImageView imageView;

    Button showDialogButton;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final View dialogView = View.inflate(MainActivity.this,R.layout.custom_dialog_view,null);

        // getting views from xml based on ID
        showDialogButton = (Button) findViewById(R.id.buttonDialog);
        imageView = (ImageView) dialogView.findViewById(R.id.SuccessImage);

        imageView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                revealShow(dialogView, false, null);
            }
        }); // Setting onClicklistener for ImageView on click of this image it will hide dialog with circular effect.

        AlertDialog.Builder builder = new  AlertDialog.Builder(MainActivity.this);
        builder.setView(dialogView); // Using builder to set View to alert dialog
        builder.setCancelable(false); // Making not to hide on click outside of Dialog
        alertDialog = builder.create();

        alertDialog.setOnShowListener(new DialogInterface.OnShowListener() {
            @Override
            public void onShow(DialogInterface dialogInterface) {
                revealShow(dialogView,true, null);
            }
        }); // Setting show listener for dialog whenever dialog opens it gets called
        alertDialog.getWindow().setBackgroundDrawable(new ColorDrawable(Color.TRANSPARENT)); // Making alertDialog window Transparent

        showDialogButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                alertDialog.show();
                Toast.makeText(MainActivity.this,"Click on Tick to hide",Toast.LENGTH_SHORT).show();

            }
        }); // Showing alert dialog with animation

    }
    private void revealShow(View rootView, boolean reveal, final AlertDialog dialog) {
        final View view = rootView.findViewById(R.id.customAlertDialog);

        // TO OPEN FROM CENTER OF DIALOG
//        int w = view.getWidth();
//        int h = view.getHeight();

        // TO Open from top and center of Button
        int w = (showDialogButton.getLeft() + showDialogButton.getRight());
        int h = (showDialogButton.getTop() + showDialogButton.getBottom()) / 2;

        float maxRadius = (float) Math.sqrt(w * w/ 4 + h * h / 4);

        if (reveal) { // if yes grows the animation and makes view as VISIBLE
            Animator revealAnimator = ViewAnimationUtils.createCircularReveal(view,w/2,h/2,0,maxRadius);
            view.setVisibility(View.VISIBLE);
            revealAnimator.start();

        } else { // else No grows to inside of dialog
            Animator anim = ViewAnimationUtils.createCircularReveal(view,w/2,h/2,maxRadius,0);
            anim.addListener(new AnimatorListenerAdapter() {
                @Override
                public void onAnimationEnd(Animator animation) {
                    super.onAnimationEnd(animation);
                    alertDialog.dismiss(); // Dismisses the Alert Dialog
                    view.setVisibility(View.INVISIBLE);
                }
            });
            anim.start();
        }
    }

}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/AnkitKumar111/Android_Assignment5.2/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/AnkitKumar111/) code author |

# AlertDialog

> An AlertDialog is a subclass of a Dialog that can display one, two or three buttons.

AlertDialogs don't require any layout.

AlertDialog was added in Android API level 1.

It resides in the android.app package.

```java
package android.app;
```

AlertDialog derives from the `android.app.Dialog` class:

```java
public class AlertDialog
extends Dialog..{}
```

AlertDialog implements the `DialogInterface` interface:

```java
public class AlertDialog
extends Dialog implements DialogInterface
```

### AlertDialog SubClasses:

Here are some of the classes that directly derive `AlertDialog`:

| No. | Class | Description |
| --- | --- | --- |
| 1. | DatePickerDialog | A simple Dialog that has a DatePicker. |
| 2. | ProgressDialog | A dialog that shows a progress indicator and an optional text message or view. |
| 3. | TimePickerDialog | A Dialog that prompts the user for the time of the day using TimePicker. |

### Use of AlertDialog

1. To display alert or any information.

### Creating AlertDialog

To create an AlertDialog you use the `android.app.AlertDialog.Builder` class.

1. First you instantiate the `AlertDialog.Builder`:
    
    ```java
        AlertDialog.Builder myBuilder=new AlertDialog.Builder(this);
    ```
    
2. Then you create the AlertDialog using the `create()` method:
    
    ```java
        AlertDialog myDialog=myBuilder.create();
    ```
    

#### Displaying Title and Message

To display only a String you can just use the `setMessage()` method and to display title you can use the `setTitle()` method.

```java
        myBuilder.setTitle(R.string.my_title).setMessage(R.string.my_message);
```

#### Display Complex View in AlertDialog

To display a more complex view, you can look up a FrameLayout called `custom` and add your view to it.

```java
FrameLayout fl = (FrameLayout) findViewById(android.R.id.custom);
 fl.addView(myView, new LayoutParams(MATCH_PARENT, WRAP_CONTENT));
```

#### Showing AlertDialog

To show the AlertDialog you use the `show()` method:

```java
myDialog.show();
```

#### Creating AlertDialog with Buttons

AlertDialogs can have buttons as well as content. So far we've looked at how to display content and title.

However, the `AlertDialog.Builder` also allows us create buttons:

1. Positive Button - We can create positive button using the `setPositiveButton()` method of the `AlertDialog.Builder` class.

```java
myBuilder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                Toast.makeText(MainActivity.this, "OK clicked", Toast.LENGTH_SHORT).show();
            }
        });
```

1. Negative Button - We can create negative button using the `setNegativeButton()` method of the `AlertDialog.Builder` class.

```java
myBuilder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                myDialog.dismiss();
            }
        });
```

1. Neutral Button - We can create neutral button using the `setNeutralButton()` method of the `AlertDialog.Builder` class.

```java
myBuilder.setNeutralButton("Neutral", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {

            }
        });
```

## Example 1: Kotlin Android - Show AlertDialog

A simple one-file alertdialog example in kotlin. Suitable for beginners. This example will render an alertDialog when the user clicks the back button.

### Step 1: Create Project

Start by creating an empty `Android Studio` project.

### Step 2: Dependencies

No external dependencies are needed for this project.

### Step 3: Design Layout

Nothing special in our layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Hello World!"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 4: Write Code

Here's how you create an alertdialog in kotlin:

```kotlin
        val builder = AlertDialog.Builder(this)
        builder.setTitle("Are you sure!")
        builder.setMessage("Do you want to close this app?")
        builder.setPositiveButton("Yes", {dialog: DialogInterface?, which: Int -> finish()})
        builder.setNegativeButton("No", {dialog: DialogInterface?, which: Int ->   })
        builder.show()
```

Here's the full code:

**MainActivity.kt**

```kotlin
import android.content.DialogInterface
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.appcompat.app.AlertDialog

class MainActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
    }

    override fun onBackPressed() {

        val builder = AlertDialog.Builder(this)
        builder.setTitle("Are you sure!")
        builder.setMessage("Do you want to close this app?")
        builder.setPositiveButton("Yes", {dialog: DialogInterface?, which: Int -> finish()})
        builder.setNegativeButton("No", {dialog: DialogInterface?, which: Int ->   })
        builder.show()
    }
}
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://github.com/Kiran-Bahalaskar/Alert-Dialog-Using-Kotlin/archive/refs/heads/master.zip) Example |
| 2. | [Follow](https://github.com/Kiran-Bahalaskar/) code author |
| 3. | Code: [Apache 2.0 License](http://www.apache.org/licenses/LICENSE-2.0.txt) |

## Android AlertDialog Snippets

Some snippets of how to yuse alertdialog in Java:

```java

public class KDialog {

    public static void showImgInDialog(Context context, Bitmap bitmap) {
        ImageView imageView = new ImageView(context);
        imageView.setImageBitmap(bitmap);
        new AlertDialog.Builder(context)
                .setView(imageView)
                .setNegativeButton("Close", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                })
                .show();
    }

    public static void showMsgDialog(final Context context, final String content) {
        new android.os.Handler(Looper.getMainLooper())
                .post(new Runnable() {
                    @Override
                    public void run() {
                        new AlertDialog.Builder(context)
                                .setMessage(content)
                                .setNegativeButton("Close", new DialogInterface.OnClickListener() {
                                    @Override
                                    public void onClick(DialogInterface dialog, int which) {
                                        dialog.dismiss();
                                    }
                                })
                                .show();
                    }
                });

    }

    public static void showCustomViewDialog(final Context context, final String title, final View view,
                                            final DialogInterface.OnClickListener positiveListener, final DialogInterface.OnClickListener negativeListener) {
        new Handler(Looper.getMainLooper())
                .post(new Runnable() {
                    @Override
                    public void run() {
                        new AlertDialog.Builder(context)
                                .setTitle(title)
                                .setView(view)
                                .setPositiveButton("Confirm", positiveListener)
                                .setNegativeButton("Cancel", negativeListener)
                                .show();
                    }
                });
    }

    public static void showSingleChoiceDialog(final Context context, final String title, CharSequence[] items, final SingleSelectedCallback callback) {
        final int[] selectedIndex = new int[1];
        new AlertDialog.Builder(context)
                .setTitle(title)
                .setSingleChoiceItems(items, 0, new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        selectedIndex[0] = which;
                    }
                })
                .setPositiveButton("Determine", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        if (callback != null) {
                            callback.singleSelected(selectedIndex[0]);
                        }
                        dialog.dismiss();
                    }
                })
                .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                })
                .setCancelable(false)
                .show();
    }

    public static void showMultiChoicesDialog(final Context context, final String title, CharSequence[] items, final MultiSelectedCallback callback) {
        final int[] selectedItems;
        final boolean[] selected = new boolean[items.length];
        new AlertDialog.Builder(context)
                .setTitle(title)
                .setMultiChoiceItems(items, new boolean[items.length], new DialogInterface.OnMultiChoiceClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which, boolean isChecked) {
                        selected[which] = isChecked;
                    }
                })
                .setPositiveButton("Determine", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        int size = selected.length;
                        List<Integer> selectedList = new ArrayList<>();
                        if (callback != null) {
                            for (int i = 0; i < size; i++) {
                                if (selected[i]) {
                                    selectedList.add(i);
                                }
                            }
                            if (selectedList != null && selectedList.size() > 0) {
                                callback.multiSelected(selectedList);
                            } else {
                                callback.selectedNothing();
                            }
                        }
                        dialog.dismiss();
                    }
                })
                .setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
                    @Override
                    public void onClick(DialogInterface dialog, int which) {
                        dialog.dismiss();
                    }
                })
                .setCancelable(false)
                .show();
    }

    private static ProgressDialog progressDialog;

    public static void showProgressDialog(final Context context, int progress){
        if (progressDialog == null){
            progressDialog = new ProgressDialog(context);
        }
        progressDialog.setCanceledOnTouchOutside(false);
        progressDialog.setCancelable(false);
        progressDialog.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        progressDialog.setMax(100);
        progressDialog.setProgress(progress);
        progressDialog.show();

        if (progress >= 100){
            if (progressDialog != null && progressDialog.isShowing()){
                progressDialog.dismiss();
            }
        }
    }

    public interface SingleSelectedCallback {
        void singleSelected(int index);
    }

    public interface MultiSelectedCallback {
        void multiSelected(List<Integer> list);

        void selectedNothing();
    }

}
```

## Android Dialogs - AlertDialog with Buttons

In this class we see how to show an alert dialog with buttons. AlertDialog allows us display simple dialogs without us creating any layout.

Our alert dialog in this case will have two buttons: a positive button and a negative button.

We then handle the onClick events for these buttons.

#### 1\. Create Project

In your android studio create an empty activity. If you are not sure how to do that check this tutorial.

In our generated project we will have one class: MainActivity and one layout activity_main.xml.

#### 3\. activity_main.xml

First we will have our layouts here. This layout will get inflated into our activity.

At the root we have [relativelayout](https://camposha.info/android/relativelayout). We add our TextView as well as a button inside the layout.

When the button is clicked we will display our alertdialog with buttons.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.camposha.mysimplealertdialogbuttons.MainActivity">

    <TextView
        android_id="@+id/headerLabel"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentTop="true"
        android_layout_centerHorizontal="true"
        android_fontFamily="casual"
        android_text="Simple AlertDialog Buttons"
        android_textAllCaps="true"
        android_textSize="24sp"
        android_textStyle="bold" />

    <Button
        android_id="@+id/showAlertID"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="Show Alert Dialog"
        android_layout_centerHorizontal="true"
        android_layout_centerVertical="true"
    />

</RelativeLayout>
```

#### 3\. MainActivity.java

Here's our main activity code:

```java
package info.camposha.mysimplealertdialogbuttons;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;
/*
ANDROID ALERTDIALOG WITH BUTTONS
 */
public class MainActivity extends Activity {
    /*
     ONCREATE METHOD
      */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //REFERENCE BUTTON AND SHOW IT.
        Button showBtn=findViewById(R.id.showAlertID);
        showBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showAlert();
            }
        });
    }
    /*
    CREATE AN ALERT DIALOG AND SHOW IT
     */
    private void showAlert()
    {
        //initialize alertdialog
        AlertDialog myDialog = null;

        //INSTANTIATE ALERTDIALOG BUILDER
        AlertDialog.Builder myBuilder=new AlertDialog.Builder(this);
        myBuilder.setPositiveButton("OK", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                Toast.makeText(MainActivity.this, "OK clicked", Toast.LENGTH_SHORT).show();
            }
        });
        //final dialog
        final AlertDialog finalDialog = myDialog;
        myBuilder.setNegativeButton("Cancel", new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int i) {
                finalDialog.dismiss();
            }
        });
        //SET PROPERTIES USING METHOD CHAINING
        myBuilder.setTitle("Science Tips").setMessage("Boomerang Nebular is the Coldest region in the Universe");
        //CREATE DIALOG
        myDialog=myBuilder.create();
        //SHOW DIALOG
        myDialog.show();
    }
}
```

#### Notes

1. First we specify the package for our application.
    
    ```java
    package info.camposha.mysimplealertdialogbuttons;
    ```
    
2. Then add our import statements.
    
3. Then we create our class called MainActivity and make it derive from `android.app.Activity`.
    
    ```java
    public class MainActivity extends Activity {..}
    ```
    
4. We'll create a method called `showAlert()` that will create our dialog using the `AlertDialog.Builder` class and then add the buttons. To add the button we use the `setPositiveButton()` and `setNegative()` methods. These methods are defined in the `AlertDialog.Builder` class. We also set the title and message of the dialog using methods defined in the same class.
    
5. We finally override the `onCreate()` method and show the alert dialog when the `showBtn` button is clicked.
    

#### Quick AlertDialog Examples

##### 1\. One static method you can reuse

You can reuse this to quickly create your alertdialogs with buttons.

It's static so you don't need a class instance. All you need is pass a Context object as well as you custom title and message.

```java
    public static void createInformativeDialog(Context context, String title, String message) {
        AlertDialog.Builder builder = new AlertDialog.Builder(context);
        builder.setTitle(title);
        builder.setMessage(message)
                .setCancelable(true)
                .setPositiveButton(context.getResources().getString(R.string.action_ok),
                        new DialogInterface.OnClickListener() {
                            @Override
                            public void onClick(DialogInterface dialog, int id) {
                            }
                        });
        AlertDialog alert = builder.create();
        alert.show();
    }
```

## Android Dialogs - AlertDialog with List

_Android AlertDialog with List Tutorial._

We will see how to render list items in an alert dialog in android. Java is our programming language.

First understand that AlertDialog is a subclass of the `android.app.Dialog` class and allows us show simple messages, buttons and even lists in our modal.

With alertdialog we don't have to create any layout in XML. It has a predefined layout that we can just use with pre-existing `Builder` class to show message, title and buttons and even lists.

#### 1\. Create Project

Create an empty project with [android studio](https://camposha.info/android/android-studio).

Check here if you are not sure how to do that.

#### 2\. activity_main.xml

Let's come edit the `activity_main.xml` which is our layout for the main [activity](https://camposha.info/android/activity).

We'll add a header label which is basically a TextView.

We also add a button that will show the dialog which will contain our list.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    tools_context="info.camposha.mysimplealertdialoglist.MainActivity">

    <TextView
        android_id="@+id/headerLabel"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_layout_alignParentTop="true"
        android_layout_centerHorizontal="true"
        android_fontFamily="casual"
        android_text="Android Simple AlertDialog"
        android_textAllCaps="true"
        android_textSize="24sp"
        android_textStyle="bold" />

    <Button
        android_id="@+id/showAlertID"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        android_text="Show Alert Dialog"
        android_layout_centerHorizontal="true"
        android_layout_centerVertical="true"
    />

</RelativeLayout>
```

#### 3\. MainActivity.java

Here's our code for our main activity.

```java
package info.camposha.mysimplealertdialoglist;

import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class MainActivity extends Activity {

    AlertDialog myDialog;

    /*
     ONCREATE METHOD
      */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //REFERENCE BUTTON AND SHOW IT.
        Button showBtn=findViewById(R.id.showAlertID);
        showBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                showAlert();
            }
        });

    }

    /*
    CREATE AN ALERT DIALOG AND SHOW IT
     */
    private void showAlert()
    {
        //INSTANTIATE ALERTDIALOG BUILDER
        AlertDialog.Builder myBuilder=new AlertDialog.Builder(this);
        //DATA SOURCE
        final CharSequence[] nebulae={"Boomerang","Orion","Witch Head","Ghost Head","Black Widow","Flame","Cone"};
        //SET PROPERTIES USING METHOD CHAINING
        myBuilder.setTitle("Science Tips").setItems(nebulae, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialogInterface, int position) {
                Toast.makeText(MainActivity.this, nebulae[position].toString(), Toast.LENGTH_SHORT).show();
            }
        });
        //CREATE DIALOG
        myDialog=myBuilder.create();
        //SHOW DIALOG
        myDialog.show();
    }
}
```

#### Notes.

1. First we add our package to hold our class.
    
2. Secondly we add the imports we require in our project. These include `android.app.Activity` and `android.app.AlertDialog`.
    
3. Thirdly we create a class that derives from [Activity](https://camposha.info/android/activity).
    
    ```java
    public class MainActivity extends Activity {..}
    ```
    
4. Then we create an insance field to hold our AlertDialog.
    
5. We'll define a method that will create our alertdialog and show it. We need an `AlertDialog.Builder` instance for this so we instantiate it, passing in a Context.
    

We then define a CharSequence array that will hold a bunch of nebulas.

We set the title to our `AlertDialog.Builder` instance.Then we invoke the `setItems()` method, passing in the CharSequence array, which is our data source.

When an item from our dialog is clicked,we will show a Toast message.

We then create the dialog using the `create()` method and `show()` it.

1. Finally we override the `onCreate()` method of our [Activity](https://camposha.info/android/activity). When our button is clicked, we will show the alert dialog.

## Kotlin Android – AlertDialog with List

This is a Kotlin android tutorial. We will see how to create an alert dialog that has a List of data.

The user clicks a List item and we show it in a Toast message.

Let's go.

#### activity_main.xml

Here's our layout.

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="info.camposha.kotlindialoglist.MainActivity">

    <TextView
        android:id="@+id/headerLabel"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_centerHorizontal="true"
        android:fontFamily="casual"
        android:text="Android Simple AlertDialog"
        android:textAllCaps="true"
        android:textSize="24sp"
        android:textStyle="bold" />

    <Button
        android:id="@+id/showAlertID"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Show Alert Dialog"
        android:layout_centerHorizontal="true"
        android:layout_centerVertical="true"
        />

</RelativeLayout>
```

#### MainActivity.kt

Here's our main activity:

```kotlin
package info.camposha.kotlindialoglist

import android.app.Activity
import android.app.AlertDialog
import android.os.Bundle
import android.widget.Button
import android.widget.Toast

class MainActivity : Activity() {

    private lateinit var myDialog: AlertDialog

    /*
     ONCREATE METHOD
      */
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        //REFERENCE BUTTON AND SHOW IT.
        val showBtn = findViewById<Button>(R.id.showAlertID)
        showBtn.setOnClickListener { showAlert() }

    }

    /*
    CREATE AN ALERT DIALOG AND SHOW IT
     */
    private fun showAlert() {
        //INSTANTIATE ALERTDIALOG BUILDER
        val myBuilder = AlertDialog.Builder(this)
        //DATA SOURCE
        val nebulae = arrayOf<CharSequence>("Boomerang", "Orion", "Witch Head", "Ghost Head", "Black Widow", "Flame", "Cone")
        //SET PROPERTIES USING METHOD CHAINING
        myBuilder.setTitle("Science Tips").setItems(nebulae) { dialogInterface, position -> Toast.makeText(this@MainActivity, nebulae[position].toString(), Toast.LENGTH_SHORT).show() }
        //CREATE DIALOG
        myDialog = myBuilder.create()
        //SHOW DIALOG
        myDialog.show()
    }
}
```

![Kotlin Android AlertDialog List](https://camposha.info/wp-content/uploads/2019/04/demo1-10.png)

## Beautiful AlertDialogs with EZDialog

> EZDialog is an extremely simple to use and highly customisable alert dialog library.

It requires a minimum sdk of 17.

Here are demos for the example that will be created shortly:

![EZDialog Example](https://github.com/Binary-Finery/EZDialog/raw/master/screenshots/56182474_2103237696464383_6230825982496866304_n.png)

![EZDialog Example](https://github.com/Binary-Finery/EZDialog/raw/master/screenshots/56464287_857948101264164_5213459504087171072_n.png)

### Step 1: Install it

You need to install as it is a third party library. This is easy. Edit the build.gradle file located in your project's root folder and register jitpack as follows:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Then add the following implementation statement in the `build.gradle` file located in the app folder:

```groovy
implementation 'com.github.Binary-Finery:EZDialog:2.0'
```

### Step 2: Write Code

Here is how you use EZDialog to create custom alert dialogs:

```java

//build a simple dialog...

new EZDialog.Builder(this)
    .setTitle("EXDialog")
    .setMessage("EZDialog example")
    .setPositiveBtnText("okay")
    .setNegativeBtnText("close")
    .setCancelableOnTouchOutside(false)
    .OnPositiveClicked(new EZDialogListener() {
        @Override
        public void OnClick() {
            //todo
                 }
    })
    .OnNegativeClicked(new EZDialogListener() {
        @Override
                 public void OnClick() {
                    //todo
                    }
                })
    .build();

//all available methods

.setTitle(String);
.setMessage(String);
.setPositiveBtnText(String);
.setNegativeBtnText(String) ;
.setNeutralBtnText(String);
.showTitleDivider(boolean);
.setTitleDividerLineColor(int);
.setTitleTextColor(int);
.setMessageTextColor(int);
.setBackgroundColor(int);
.setHeaderColor(int);
.setButtonTextColor(int);
.OnPositiveClicked(EZDialogListener);
.OnNegativeClicked(EZDialogListener);
.OnNeutralClicked(EZDialogListener);
.setAnimation(Animation);
.setCancelableOnTouchOutside(boolean);
.setFont(Font);
.setCustomFont(int);
.build();
```

### Reference

Below is the reference links:

| No. | Link |
| --- | --- |
| 1. | [Read more](https://github.com/Binary-Finery/EZDialog) |
