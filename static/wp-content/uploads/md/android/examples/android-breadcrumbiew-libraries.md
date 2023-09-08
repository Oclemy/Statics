# Android BreadCrumbView

It is possible to display breadcrumbs in your native android app built with kotlin or java. You can do via third party libraries. In this tutorial we want to look at some of these libraries.


## (a). tiagohm/BreadCrumbView

> Android Material Design Breadcrumb Navigation.

![Android BreadCrumbView Example](https://raw.githubusercontent.com/tiagohm/BreadCrumbView/master/1.png)

### Step 1: Install BreadCrumbView

The first step is to install it. First register jitpack as a maven url in your build.gradle file:

```groovy
    allprojects {
        repositories {
            ...
            maven { url "https://jitpack.io" }
        }
    }
```

Then add the following implementation statement in your app level build.gradle:

```groovy
implementation 'com.github.tiagohm:BreadCrumbView:0.1.2'
```

### Step 2: Add BreadCrumbView Layout

Add it in your xml layout where you want the breadcrumbview to apperar, be it a toolbar or otherwise:

```xml
<br.tiagohm.breadcrumbview.BreadCrumbView
    android:id="@+id/breadcrumbview"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:background="@color/colorPrimary"
    app:bcv_separatorColor="#DFFF"
    app:bcv_textColor="#DFFF"
    app:bcv_textSize="16sp"/>
```

### Step 3: Write Code

If you are using java the old style you can reference the breadcrumbiew:

```java
BreadCrumbView bcv = findViewById(R.id.breadcrumbview);
```

Now construct the breadcrumbview using the builder pattern:

```java
bcv.addItem(new BreadCrumbItem.Builder().icon(R.drawable.home).build());
    bcv.addItem(new BreadCrumbItem.Builder().icon(R.drawable.folder).itens("tiagohm").build());
    bcv.addItem(new BreadCrumbItem.Builder().icon(R.drawable.folder).itens("GitHub", "Documentos", "Download", "Imagens", "Música").build());
    bcv.addItem(new BreadCrumbItem.Builder().icon(R.drawable.folder).itens("Android", "Java", "C", "Arduino").build());
    bcv.addItem(new BreadCrumbItem.Builder().icon(R.drawable.folder).itens("BreadCrumbView", "MarkdownView", "CodeView", "BlueDroid").build());        
```

Here's how you handle the breadcrumb item clicks:

```java
bcv.setBreadCrumbListener(new BreadCrumbView.BreadCrumbListener() {
    @Override
    public void onItemClicked(BreadCrumbView view, BreadCrumbItem item, int level) {
        Toast.makeText(MainActivity.this, "pos: " + level + " " + item.getText(), Toast.LENGTH_SHORT).show();
    }

    @Override
    public boolean onItemValueChanged(BreadCrumbView view, BreadCrumbItem item, int level, Object oldSelectedItem, Object selectedItem) {
        Toast.makeText(MainActivity.this, "pos: " + level + " " + item.getText() + " old: " + oldSelectedItem + " new: " + selectedItem, Toast.LENGTH_SHORT).show();
        return true; //to apply the change of selected item
    }
        });
```

### Example

Let's look at a full example.

**(a). activity_main.xml**

Add the following in your main layout:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="br.tiagohm.breadcrumbview.app.MainActivity">

    <br.tiagohm.breadcrumbview.BreadCrumbView
        android:id="@+id/breadcrumbview"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:background="@color/colorPrimary"
        app:bcv_separatorColor="#DFFF"
        app:bcv_textColor="#DFFF"
        app:bcv_textSize="16sp"/>
</LinearLayout>
```

**(b). MainActivity.java**

Now add the following code in your main activity:

```java
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.widget.Toast;

import br.tiagohm.breadcrumbview.BreadCrumbItem;
import br.tiagohm.breadcrumbview.BreadCrumbView;

public class MainActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        if (getSupportActionBar() != null) {
            getSupportActionBar().setElevation(0);
        }

        BreadCrumbView bcv = findViewById(R.id.breadcrumbview);
        bcv.setSeparatorColor(0xCCFFFFFF);
        bcv.setTextColor(0xCCFFFFFF);
        bcv.addItem(new BreadCrumbItem.Builder().icon(R.drawable.home).build());
        bcv.addItem(new BreadCrumbItem.Builder().icon(R.drawable.folder).itens("tiagohm").build());
        bcv.addItem(new BreadCrumbItem.Builder().icon(R.drawable.folder).itens("GitHub", "Documentos", "Download", "Imagens", "Música", "Fotos de Bichinhos Fofinhos").build());
        bcv.addItem(new BreadCrumbItem.Builder().icon(R.drawable.folder).itens("Android", "Java", "C", "Arduino").build());
        bcv.addItem(new BreadCrumbItem.Builder().icon(R.drawable.folder).itens("BreadCrumbView", "MarkdownView", "CodeView", "BlueDroid").build());
        bcv.setBreadCrumbListener(new BreadCrumbView.BreadCrumbListener() {
            @Override
            public void onItemClicked(BreadCrumbView view, BreadCrumbItem item, int level) {
                Toast.makeText(MainActivity.this, "pos: " + level + " " + item.getText(), Toast.LENGTH_SHORT).show();
                //view.removeItemsAfter(level);
            }

            @Override
            public boolean onItemValueChanged(BreadCrumbView view, BreadCrumbItem item, int level, Object oldSelectedItem, Object selectedItem) {
                Toast.makeText(MainActivity.this, "pos: " + level + " " + item.getText() + " old: " + oldSelectedItem + " new: " + selectedItem, Toast.LENGTH_SHORT).show();
                return true;
            }
        });
    }
}
```

Download code [here](https://github.com/tiagohm/BreadCrumbView/tree/master/app).

### Reference

Find complete reference [here](https://github.com/tiagohm/BreadCrumbView).
