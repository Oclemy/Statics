# TastyToasty

>  An easy-to-use library to create tasty 😋 Toasts with a bunch of flavours.

It also provides effortless methods to create Instagram like Toasts.

![Toast Library Tutorial](https://camo.githubusercontent.com/5fd4abe2fd3e079007336099d43e2a682894e688c9faaa9acb4ef511ac4ff741/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4150492d31392532422d627269676874677265656e2e7376673f7374796c653d666c6174)

![Toast Library Tutorial](https://camo.githubusercontent.com/3bbfc03bf81a6cd7b823b1ebb59bc38e8d9b903d6982f4d85956261997498951/68747470733a2f2f6a69747061636b2e696f2f762f75736d616e31382f5461737479546f617374792e737667)


### Step 1:  Installation

Add this in your root ``build.gradle`` file (not your module ``build.gradle`` file):

```groovy
allprojects {
	repositories {
		...
		maven { url "https://jitpack.io" }
	}
}
```

Add this to your module's `build.gradle` file :

```groovy
dependencies {
	...
    implementation 'com.github.usman18:TastyToasty:v1.2'
}
```


### Step 2: Usage

### Instagram Toasts

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/Instagram/like.JPG)


```java
TastyToasty.instaLike(MainActivity.this, "1").show();
```

2. instaFollower:

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/Instagram/follower.JPG)

3. instaComment:

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/Instagram/comment.JPG)

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/Instagram/InstaAll.JPG)


```java
TastyToasty.instaAll(MainActivity.this, "101","20","60").show();
```


### VIBGYOR Toasts 🌈

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/vibgyor/violet.JPG)


```java
TastyToasty.violet(MainActivity.this, "Its lit", R.drawable.ic_whatshot).show();
```

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/vibgyor/indigo.JPG)

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/vibgyor/blue.JPG)

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/vibgyor/Green.JPG)

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/vibgyor/yellow.JPG)

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/vibgyor/orange.JPG)

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/vibgyor/red.JPG)


### Standard Toasts

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/standard/success.JPG)


```java
TastyToasty.success(MainActivity.this, "Task Successful").show();
```

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/standard/error.JPG)

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/standard/trending.JPG)

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/standard/star.JPG)


### Custom Toasts

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/Custom/custom.JPG)


```java
// Pass the last attribute as false or null if your do not want the tail in Toast
TastyToasty.makeText(MainActivity.this, "This is a custom toast",TastyToasty.LONG, R.drawable.ic_action_favourite, R.color.violet, R.color.white, true).show();
```

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/Custom/builder.JPG)


```java
new TastyToasty.Builder(MainActivity.this)
  .setText("This one is using builder method")    
  .setBackgroundColor(R.color.green)      
  .setIconId(R.drawable.ic_verified_user)
  .showTail(true) // Pass false or null or don't call at all if you don't want the "tail" in your toast
  .show();
```


### Note:


```java
//Default text color is white and default background color is pinkinsh red
new TastyToasty.Builder(MainActivity.this)
    .setIconId(R.drawable.ic_whatshot)
    .show();
```

![TastyToasty Example Tutorial](https://github.com/usman18/TastyToasty/raw/master/Screenshots/Custom/trending_custom.JPG)


### Full Example

Let us look at a full android Toast Library sample project.

<!--more-->

#### Step 1. Design Layouts

In Android we design our UI interfaces using XML. So let's create the following layouts:


**(a). activity_main.xml**


> Our `activity_main` layout.

Design your XML layout using the following 2 UI widgets and ViewGroups:

1. `androidx.constraintlayout.widget.ConstraintLayout`
2. `TextView`

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

#### Step 2. Write Code

Finally we need to write our code as follows:


**(a). MainActivity.java**

> Our `MainActivity` class.

Here is the full code:

```java
package replace_with_your_package_name;

import android.os.Bundle;

import com.uk.tastytoasty.TastyToasty;

import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);
		
/*
		
		TastyToasty.makeText(MainActivity.this, "This is a custom toast",TastyToasty.LONG, R.drawable.ic_action_favourite, R.color.violet, R.color.white, true).show();
*/

/*
		new TastyToasty.Builder(MainActivity.this)
			.setText("This one is using builder method")
			.setBackgroundColor(R.color.green)
			.setIconId(R.drawable.ic_verified_user)
			.showTail(true) // Pass false or null or don't call at all if you don't want the "tail" in your toast
			.show();
*/

/*
		//Default text color is white and default background color is pinkinsh red
		new TastyToasty.Builder(MainActivity.this)
			.setIconId(R.drawable.ic_whatshot)
			.show();
*/
	
		
	}
}


```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/usman18/TastyToasty/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/usman18/TastyToasty).|
|3.|Follow code author [here](https://github.com/usman18).|
