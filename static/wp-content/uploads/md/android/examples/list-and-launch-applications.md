# Android RxJava2 Example - List and Launch Applications

> This is an example showing you how to load applications from the device using RxJava2 and launch them upon clicking.


### Step 1: Dependencies

We will use RxJava2 to asynchronously load our apps from the device. Thus install it:

```groovy
    implementation 'io.reactivex.rxjava2:rxandroid:2.0.1'
    implementation 'io.reactivex.rxjava2:rxjava:2.1.0'
```

### Step 2: AndroidManifest

Replace your `.MainActivity` declaration in your `AndroidManifest.xml` with the following:

```xml
        <activity
            android:name=".MainActivity"
            android:enabled="true"
            android:launchMode="singleTask"
            android:screenOrientation="nosensor"
            android:excludeFromRecents="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.HOME" />

                <category android:name="android.intent.category.DEFAULT" />

                <category android:name="android.intent.category.MONKEY" />
            </intent-filter>
        </activity>
```

### Step 3: Design Layout

We will have two layouts:

**(a). holder_app.xml**

The xml layout for a single item in our list:

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:gravity="center_vertical"
    android:orientation="horizontal"
    android:padding="16dp">

    <ImageView
        android:id="@+id/icon_image_view"
        android:layout_width="48dp"
        android:layout_height="48dp" />

    <TextView
        android:id="@+id/name_text"
        android:layout_width="0dp"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_weight="1" />

</LinearLayout>

```

**(b). activity_main.xml**

The xml layout for our `MainActivity`. Add a RecyclerView that will list our items:

```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/layout"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.numero.simplehome.MainActivity">

    <android.support.v7.widget.RecyclerView
        android:id="@+id/recycler_view"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />

</RelativeLayout>

```

### Step 4: Create Model class

Create our `App` model class to represent a single application:

**App.java**

```java
package com.numero.simplehome.model;

import android.graphics.drawable.Drawable;

public class App {

    private String name;
    private Drawable icon;
    private String packageName;

    public App(String name, Drawable icon, String packageName) {
        this.name = name;
        this.icon = icon;
        this.packageName = packageName;
    }

    public String getName() {
        return name;
    }

    public Drawable getIcon() {
        return icon;
    }

    public String getPackageName() {
        return packageName;
    }
}

```

### Step 5: Create Adapter class

Create adapter class to help list our apps on our recyclerview:

**AppListAdapter.java**

```java
package com.numero.simplehome.view;

import android.graphics.drawable.Drawable;
import android.support.annotation.NonNull;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;

import com.numero.simplehome.R;
import com.numero.simplehome.model.App;

import java.util.List;

public class AppListAdapter extends RecyclerView.Adapter<AppListAdapter.AppViewHolder> {

    private final List<App> appList;

    private OnItemClickListener onItemClickListener;

    public AppListAdapter(@NonNull List<App> appList) {
        this.appList = appList;
    }

    public void setOnItemClickListener(OnItemClickListener onItemClickListener) {
        this.onItemClickListener = onItemClickListener;
    }

    @Override
    public AppViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.holder_app, parent, false);
        return new AppViewHolder(view);
    }

    @Override
    public void onBindViewHolder(AppViewHolder holder, int position) {
        App app = appList.get(position);
        holder.setName(app.getName());
        holder.setIcon(app.getIcon());

        holder.itemView.setOnClickListener(v -> {
            if (onItemClickListener != null) {
                onItemClickListener.onItemClick(v, holder.getAdapterPosition());
            }
        });
    }

    @Override
    public int getItemCount() {
        return appList.size();
    }

    public class AppViewHolder extends RecyclerView.ViewHolder {

        private TextView nameTextView;
        private ImageView iconImageView;

        public AppViewHolder(View itemView) {
            super(itemView);

            nameTextView = itemView.findViewById(R.id.name_text);
            iconImageView = itemView.findViewById(R.id.icon_image_view);
        }

        public void setName(String name) {
            nameTextView.setText(name);
        }

        public void setIcon(Drawable drawable) {
            iconImageView.setImageDrawable(drawable);
        }
    }

    public interface OnItemClickListener {
        void onItemClick(View view, int position);
    }

    public interface OnItemLongClickListener {
        void onItemLongClick(View view, int position);
    }
}

```

### Step 6: Load Apps

We will load our apps in our `MainActivity.java`:

**MainActivity.java**

```java
package com.numero.simplehome;

import android.app.WallpaperManager;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.pm.ResolveInfo;
import android.graphics.drawable.Drawable;
import android.support.annotation.NonNull;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.support.v7.widget.LinearLayoutManager;
import android.support.v7.widget.RecyclerView;
import android.view.Window;
import android.view.WindowManager;

import com.numero.simplehome.model.App;
import com.numero.simplehome.view.AppListAdapter;

import java.util.ArrayList;
import java.util.List;

import io.reactivex.Observable;
import io.reactivex.android.schedulers.AndroidSchedulers;
import io.reactivex.schedulers.Schedulers;

public class MainActivity extends AppCompatActivity {

    private List<App> appList = new ArrayList<>();
    private AppListAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Window window = getWindow();
        window.setFlags(WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS, WindowManager.LayoutParams.FLAG_LAYOUT_NO_LIMITS);

        WallpaperManager wallpaperManager = WallpaperManager.getInstance(getApplicationContext());
        findViewById(R.id.layout).setBackground(wallpaperManager.getDrawable());

        initList();

        executeLoadApplication();
    }

    @Override
    public void onBackPressed() {
    }

    private void initList() {
        adapter = new AppListAdapter(appList);
        adapter.setOnItemClickListener((view, position) -> {
            App app = appList.get(position);
            launchApp(app);
        });

        RecyclerView recyclerView = findViewById(R.id.recycler_view);
        recyclerView.setLayoutManager(new LinearLayoutManager(this));
        recyclerView.setHasFixedSize(true);
        recyclerView.setAdapter(adapter);
    }

    private void launchApp(@NonNull App app) {
        Observable.just(app)
                .map(a -> getPackageManager().getLaunchIntentForPackage(a.getPackageName()))
                .map(intent -> intent.setAction(Intent.ACTION_MAIN))
                .map(intent -> intent.addCategory(Intent.CATEGORY_LAUNCHER))
                .map(intent -> intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_RESET_TASK_IF_NEEDED))
                .subscribe(this::startActivity);
    }

    private void executeLoadApplication() {
        Intent intent = new Intent(Intent.ACTION_MAIN, null);
        intent.addCategory(Intent.CATEGORY_LAUNCHER);
        List<ResolveInfo> appInfoList = getPackageManager().queryIntentActivities(intent, 0);

        if (appInfoList == null) {
            return;
        }

        Observable.fromIterable(appInfoList)
                .map(resolveInfo -> {
                    String name = Observable.just(resolveInfo)
                            .map(info -> info.loadLabel(getPackageManager()))
                            .map(charSequence -> (String) charSequence)
                            .blockingFirst();
                    Drawable icon = Observable.just(resolveInfo)
                            .map(info -> info.loadIcon(getPackageManager()))
                            .blockingFirst();
                    return new App(name, icon, resolveInfo.activityInfo.packageName);
                })
                .toList()
                .subscribeOn(Schedulers.io())
                .observeOn(AndroidSchedulers.mainThread())
                .subscribe(list -> {
                    appList.clear();
                    appList.addAll(list);
                    adapter.notifyDataSetChanged();
                }, Throwable::printStackTrace);
    }
}

```

### Reference

> Download full code [here](https://github.com/NUmeroAndDev/SimpleLauncher-android/archive/refs/heads/master.zip).
> Follow code author [here](https://github.com/NUmeroAndDev/).
