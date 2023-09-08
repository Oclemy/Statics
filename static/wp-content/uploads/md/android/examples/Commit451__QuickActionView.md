# QuickActionView

>  `View` that shows quick actions when long pressed, inspired by Pinterest.

`QuickActionView` is a `View` that shows quick actions when long pressed, inspired by Pinterest.


![Popup Menu Tutorial](https://camo.githubusercontent.com/4de0df45abcafe543a5e57e0340cb3146accd5b9d1f4a8accab8e5b2412ea891/68747470733a2f2f6a69747061636b2e696f2f762f436f6d6d69743435312f517569636b416374696f6e566965772e737667)

Below is a demo GIF:

![Popup Menu Tutorial](https://raw.githubusercontent.com/Commit451/QuickActionView/master/screenshots/qav.gif)

Follow these steps to use it in your project:

### Step 1: Add as a Gradle Dependency

Add this in your root ``build.gradle`` file (not your module ``build.gradle`` file):

```groovy
allprojects {
	repositories {
		...
		maven { url "https://jitpack.io" }
	}
}
```

Then, add the library to your project `build.gradle`

```groovy
dependencies {
    implementation 'com.github.Commit451:QuickActionView:latest.release.here'
}
```


### Step 2: Basic Usage

See the sample app for usage within a normal layout, as well as within a list using RecyclerView. In the most basic usage:

```java
View view = findViewById(R.id.your_view);
QuickActionView.make(this)
      .addActions(R.menu.actions)
      .register(view);
```

You can also create Actions at runtime:

```java
Drawable icon = ContextCompat.getDrawable(this, R.drawable.ic_favorite_24dp);
String title = getString(R.string.action_favorite);
Action action = new Action(1337, icon, title);
QuickActionView.make(this)
        .addAction(action)
        //more configuring
        .register(view);
```


### Step 3: Configuring the QuickActionView

QuickActionView can be customized globally, or on a per Action basis.

```java
QuickActionView.make(this)
                .addActions(R.menu.actions)
                .setOnActionSelectedListener(mQuickActionListener)
                .setBackgroundColor(Color.RED)
                .setTextColor(Color.BLUE)
                .setTextSize(30)
                .setScrimColor(Color.parseColor("#99FFFFFF"))
                //etc
                .register(view);
```


### Step 4: Configuring Action Items

Use the `QuickActionConfig` builder to create custom configurations for each action item you create.

```java
//Give one of the quick actions custom colors
Action.Config actionConfig = new Action.Config()
        .setBackgroundColor(Color.BLUE)
        .setTextColor(Color.MAGENTA);

QuickActionView.make(this)
        .addActions(R.menu.actions)
        //the custom Action.Cofig will only apply to the addToCart action
        .setActionConfig(actionConfig, R.id.action_add_to_cart)
        .register(findViewById(R.id.custom_parent));
```


### Listening for Events

You can hook into the interesting events a QuickActionView has:

```java
QuickActionView.make(this)
      .addActions(R.menu.actions)
      .setOnActionSelectedListener(mQuickActionListener)
      .setOnShowListener(mQuickActionShowListener)
      .setOnDismissListener(mQuickActionDismissListener)
      .setOnActionHoverChangedListener(mOnActionHoverChangedListener)
      .register(view);
```


### Reference

|2.|Read more [here](https://github.com/Commit451/QuickActionView).|
|3.|Follow code author [here](https://github.com/Commit451).|
