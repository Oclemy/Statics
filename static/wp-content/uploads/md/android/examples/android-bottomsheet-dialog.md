# Let’s Create a Custom BottomSheetDialog without any library
#post_date: 23-05-2021

_Android Custom BottomSheetDialog Creation Tutorial using only android.app.Dialog class_

In this example we want to see how to create our bottomsheetdialog without using any third party library or fancy API classes. The only class we use is the android.app.Dialog.


##### Demo

Here's the gif demo of the project:

![](https://camposha.info/lets-create-a-custom-bottomsheetdialog-without-any-library/demo.gif)

##### Video Tutorial

Here's the video tutorial:

<iframe width="788" height="443" src="https://www.youtube.com/embed/XUyfMekOZKU" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Gradle Scripts

##### (a) Build.gradle

Nothing special. No third party dependency.

```groovy
dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    testImplementation 'junit:junit:4.12'
    implementation 'com.android.support:appcompat-v7:28.0.0'
    implementation 'com.android.support.constraint:constraint-layout:1.1.3'

}
```

#### Layouts

Lets start by exploring the layouts in this project.

We have seven layouts:

##### 1\. activity_main.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout

    android_id="@+id/activity_main"
    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_orientation="vertical"
    android_background="#009688"
    tools_context=".MainActivity">

    <TextView
        android_id="@+id/headerTxt"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_text="BottomDialog Tutorial"
        android_textAlignment="center"
        android_fontFamily="casual"
        android_textStyle="bold"
        android_textAppearance="@style/TextAppearance.AppCompat.Large"
        android_textColor="@color/white" />

    <LinearLayout
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_layout_marginLeft="16dp"
        android_layout_marginRight="16dp"
        android_orientation="horizontal"
        android_layout_marginTop="50dp">

    <Button
        android_id="@+id/btn_show_1"
        android_onClick="onClick"
        android_layout_width="0dp"
        android_layout_weight="1"
        android_layout_height="wrap_content"
        android_text="Show First"/>

    <Button
        android_id="@+id/btn_show_2"
        android_onClick="onClick"
        android_layout_width="0dp"
        android_layout_weight="1"
        android_layout_height="wrap_content"
        android_text="Show Second"/>

</LinearLayout>
</LinearLayout>
```

##### 2\. rectangular_dialog.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
              android_layout_width="match_parent"
              android_layout_height="wrap_content"
              android_background="@android:color/white"
              android_orientation="vertical">

    <TextView
        android_id="@+id/editMenuItem"
        android_onClick="onClick"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_background="?android:attr/selectableItemBackground"
        android_clickable="true"
        android_drawableLeft="@drawable/ic_edit"
        android_drawablePadding="16dp"
        android_gravity="center_vertical"
        android_padding="16dp"
        android_text="Edit"
        android_textColor="#666666"
        android_textSize="14sp"/>

    <TextView
        android_id="@+id/starMenuItem"
        android_onClick="onClick"
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_background="?android:attr/selectableItemBackground"
        android_clickable="true"
        android_drawableLeft="@drawable/ic_star"
        android_drawablePadding="16dp"
        android_gravity="center_vertical"
        android_padding="16dp"
        android_text="Star"
        android_textColor="#666666"
        android_textSize="14sp"/>

    <TextView
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_background="?android:attr/selectableItemBackground"
        android_clickable="true"
        android_drawableLeft="@drawable/ic_circle"
        android_drawablePadding="16dp"
        android_gravity="center_vertical"
        android_padding="16dp"
        android_text="Set"
        android_textColor="#666666"
        android_textSize="14sp"/>

    <TextView
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_background="?android:attr/selectableItemBackground"
        android_clickable="true"
        android_drawableLeft="@drawable/ic_send"
        android_drawablePadding="16dp"
        android_gravity="center_vertical"
        android_padding="16dp"
        android_text="Send"
        android_textColor="#666666"
        android_textSize="14sp"/>

    <TextView
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_background="?android:attr/selectableItemBackground"
        android_clickable="true"
        android_drawableLeft="@drawable/ic_alert"
        android_drawablePadding="16dp"
        android_gravity="center_vertical"
        android_padding="16dp"
        android_text="Alert"
        android_textColor="#666666"
        android_textSize="14sp"/>

    <TextView
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_background="?android:attr/selectableItemBackground"
        android_clickable="true"
        android_drawableLeft="@drawable/ic_delete"
        android_drawablePadding="16dp"
        android_gravity="center_vertical"
        android_padding="16dp"
        android_text="Delete"
        android_textColor="#666666"
        android_textSize="14sp"/>
</LinearLayout>
```

##### 3\. curved_dialog.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
              android_layout_width="match_parent"
              android_layout_height="wrap_content"
              android_background="@drawable/shape_dialog"
              android_orientation="vertical">

    <TextView
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_background="?android:attr/selectableItemBackground"
        android_clickable="true"
        android_drawableLeft="@drawable/ic_edit"
        android_drawablePadding="16dp"
        android_gravity="center_vertical"
        android_padding="16dp"
        android_text="Edit"
        android_textColor="#666666"
        android_textSize="14sp"/>

    <TextView
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_background="?android:attr/selectableItemBackground"
        android_clickable="true"
        android_drawableLeft="@drawable/ic_star"
        android_drawablePadding="16dp"
        android_gravity="center_vertical"
        android_padding="16dp"
        android_text="Star"
        android_textColor="#666666"
        android_textSize="14sp"/>

    <TextView
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_background="?android:attr/selectableItemBackground"
        android_clickable="true"
        android_drawableLeft="@drawable/ic_circle"
        android_drawablePadding="16dp"
        android_gravity="center_vertical"
        android_padding="16dp"
        android_text="Set"
        android_textColor="#666666"
        android_textSize="14sp"/>

    <TextView
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_background="?android:attr/selectableItemBackground"
        android_clickable="true"
        android_drawableLeft="@drawable/ic_send"
        android_drawablePadding="16dp"
        android_gravity="center_vertical"
        android_padding="16dp"
        android_text="Send"
        android_textColor="#666666"
        android_textSize="14sp"/>

    <TextView
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_background="?android:attr/selectableItemBackground"
        android_clickable="true"
        android_drawableLeft="@drawable/ic_alert"
        android_drawablePadding="16dp"
        android_gravity="center_vertical"
        android_padding="16dp"
        android_text="Alert"
        android_textColor="#666666"
        android_textSize="14sp"/>

    <TextView
        android_layout_width="match_parent"
        android_layout_height="wrap_content"
        android_background="?android:attr/selectableItemBackground"
        android_clickable="true"
        android_drawableLeft="@drawable/ic_delete"
        android_drawablePadding="16dp"
        android_gravity="center_vertical"
        android_padding="16dp"
        android_text="Delete"
        android_textColor="#666666"
        android_textSize="14sp"/>
</LinearLayout>
```

#### Animations

##### 1\. translate_dialog_in.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<translate
           android_duration="300"
           android_fromXDelta="0"
           android_fromYDelta="100%"
           android_toXDelta="0"
           android_toYDelta="0">
</translate>
```

##### 2\. translate_dialog_out.xml

```xml
<?xml version="1.0" encoding="utf-8"?>
<translate
           android_duration="300"
           android_fromXDelta="0"
           android_fromYDelta="0"
           android_toXDelta="0"
           android_toYDelta="100%">
</translate>
```

#### Styles

##### (a). styles.xml

```xml
<resources>

    <!-- Base application theme. -->
    <style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
        <!-- Customize your theme here. -->
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
    </style>

    <style name="BottomDialog" parent="@style/Base.V7.Theme.AppCompat.Light.Dialog">
        <item name="android:windowNoTitle">true</item>
        <item name="android:windowBackground">@android:color/transparent</item>
    </style>

    <style name="BottomDialog.Animation" parent="Animation.AppCompat.Dialog">
        <item name="android:windowEnterAnimation">@anim/translate_dialog_in</item>
        <item name="android:windowExitAnimation">@anim/translate_dialog_out</item>
    </style>
</resources>
```

#### Java Code.

We have the following java classes for this project:

1. MainActivity.java

##### MainActivity.java

Our main activity class.

```java
package info.camposha.mrsbottomdialog;

import android.app.Dialog;
import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.TypedValue;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {

    /**
     * I'll start by creating two utility methods.
     * @param message
     */
    private void show(String message){
        Toast.makeText(this, message, Toast.LENGTH_SHORT).show();
    }
    public static int dp2px(Context context, float dpVal) {
        return (int) TypedValue.applyDimension(TypedValue.COMPLEX_UNIT_DIP, dpVal,
                context.getResources().getDisplayMetrics());
    }
    /**
     * Here am just creating a bottomsheet dialog from the android.app.Dialog
     * class
     */
    private void showFirstBottomDialog() {
        Dialog bottomDialog = new Dialog(this, R.style.BottomDialog);
        View contentView = LayoutInflater.from(this).inflate(R.layout.rectangular_dialog, null);
        bottomDialog.setContentView(contentView);
        ViewGroup.LayoutParams layoutParams = contentView.getLayoutParams();
        layoutParams.width = getResources().getDisplayMetrics().widthPixels;
        contentView.setLayoutParams(layoutParams);
        bottomDialog.getWindow().setGravity(Gravity.BOTTOM);
        bottomDialog.setCanceledOnTouchOutside(true);
        bottomDialog.getWindow().setWindowAnimations(R.style.BottomDialog_Animation);
        bottomDialog.show();
    }

    /**
     * Then here is the second, a little bit curved dialog
     */
    private void showSecondBottomDialog() {
        Dialog bottomDialog = new Dialog(this, R.style.BottomDialog);
        View contentView = LayoutInflater.from(this).inflate(R.layout.curved_dialog, null);
        bottomDialog.setContentView(contentView);
        ViewGroup.MarginLayoutParams params = (ViewGroup.MarginLayoutParams) contentView.getLayoutParams();
        params.width = getResources().getDisplayMetrics().widthPixels - dp2px(this, 16f);
        params.bottomMargin = dp2px(this, 8f);
        contentView.setLayoutParams(params);
        bottomDialog.setCanceledOnTouchOutside(true);
        bottomDialog.getWindow().setGravity(Gravity.BOTTOM);
        bottomDialog.getWindow().setWindowAnimations(R.style.BottomDialog_Animation);
        bottomDialog.show();
    }
    /**
     * Let's handle a few item clicks. For buttons and just two of our
     * menu items. You can add more case statements to handle more
     * menu items.
     * @param view
     */
    public void onClick(View view) {
        switch (view.getId()) {
            case R.id.btn_show_1:
                showFirstBottomDialog();
                break;
            case R.id.btn_show_2:
                showSecondBottomDialog();
                break;
            case R.id.editMenuItem:
                show("Edit Clicked");
                break;
            case R.id.starMenuItem:
                show("Star Clicked");
                break;
        }
    }

    /**
     * Our onCreate callback
     * @param savedInstanceState
     */
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    }

}
//end
```

##### Download

You can download the full source code below or watch the video from the link provided.

| No. | Location | Link |
| --- | --- | --- |
| 1. | GitHub | [Direct Download](https://github.com/Oclemy/CustomBottomSheetDialog/archive/master.zip) |
| 2. | GitHub | [Browse](https://github.com/Oclemy/CustomBottomSheetDialog) |
| 3. | YouTube | [Video Tutorial](https://www.youtube.com/watch?v=XUyfMekOZKU) |
| 4. | YouTube | [ProgrammingWizards TV Channel](http://www.youtube.com/c/programmingwizards) |
