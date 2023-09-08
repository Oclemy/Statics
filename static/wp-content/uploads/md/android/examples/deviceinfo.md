# Get Device Info Example


> Learn how to get device info in android using this example written in Java.

Here is the demo of the created app:

![https://github.com/ZQiang94/DisplayInfo/raw/master/device-2016-08-20-115904.png](https://github.com/ZQiang94/DisplayInfo/raw/master/device-2016-08-20-115904.png)

### Step 1: Dependencies

No external dependencies are needed for this project.

### Step 2: Design Layouts

We have only one layout:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<ScrollView xmlns:android="http://schemas.android.com/apk/res/android"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:paddingBottom="@dimen/activity_vertical_margin"
            android:paddingLeft="@dimen/activity_horizontal_margin"
            android:paddingRight="@dimen/activity_horizontal_margin"
            android:paddingTop="@dimen/activity_vertical_margin"
            android:scrollbars="vertical">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:orientation="vertical">

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/screen_size_label"
            android:textStyle="bold"/>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/screen_size_width"/>

            <TextView
                android:id="@+id/screen_size_width"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/screen_size_height"/>

            <TextView
                android:id="@+id/screen_size_height"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/screen_size"/>

            <TextView
                android:id="@+id/screen_size"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/resolution_label"
            android:textStyle="bold"/>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/resolution_width"
                android:textColor="#dd5555"/>

            <TextView
                android:id="@+id/resolution_width"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/resolution_height"
                android:textColor="#dd5555"/>

            <TextView
                android:id="@+id/resolution_height"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/dpi_label"
            android:textStyle="bold"/>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/dpi_width"/>

            <TextView
                android:id="@+id/dpi_width"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/dpi_height"/>

            <TextView
                android:id="@+id/dpi_height"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/density_dpi"
                android:textColor="#dd5555"/>

            <TextView
                android:id="@+id/density_dpi"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/density_label"
            android:textStyle="bold"/>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/density"/>

            <TextView
                android:id="@+id/density"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/dip_label"
            android:textStyle="bold"/>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/dip_width"/>

            <TextView
                android:id="@+id/dip_width"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/dip_height"/>

            <TextView
                android:id="@+id/dip_height"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="@string/suggestion_label"
            android:textColor="#ff2222"
            android:textStyle="bold"/>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/suggestion_layout"/>

            <TextView
                android:id="@+id/suggestion_layout_simple"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/suggestion_layout"/>

            <TextView
                android:id="@+id/suggestion_layout"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/suggestion_layout_land"/>

            <TextView
                android:id="@+id/suggestion_layout_land"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/suggestion_values"/>

            <TextView
                android:id="@+id/suggestion_values_simple"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/suggestion_values"/>

            <TextView
                android:id="@+id/suggestion_values"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="@string/suggestion_values_land"/>

            <TextView
                android:id="@+id/suggestion_values_land"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="other"
            android:textColor="#ff2222"
            android:textStyle="bold"/>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="status_bar_height:"/>

            <TextView
                android:id="@+id/status_bar_height"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="horizontal">

            <TextView
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="navigation_bar_height:"/>

            <TextView
                android:id="@+id/navigation_bar_height"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:textColor="#00aaaa"/>
        </LinearLayout>

    </LinearLayout>
</ScrollView>


```

### Step 3: Create MainActivity

Write MainActivity code as shown below

**MainActivity.java**

```java
package com.displayinfo;

import android.content.res.Resources;
import android.graphics.Rect;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.DisplayMetrics;
import android.view.Window;
import android.widget.TextView;

/**
 * Android Developer Document
 * https://developer.android.com/reference/android/util/DisplayMetrics.html
 */
public class MainActivity extends AppCompatActivity {

    private TextView mDIPHeight;
    private TextView mDIPWidth;
    private TextView mDPIHeight;
    private TextView mDPIWidth;
    private TextView mDensityDpi;
    private TextView mDesity;
    private TextView mResolutionHeight;
    private TextView mResolutionWidth;
    private TextView mScreenSizeHeight;
    private TextView mScreenSize;
    private TextView mScreenSizeWidth;
    private TextView mSuggestionLayout;
    private TextView mSuggestionLayoutLand;
    private TextView mSuggestionLayoutSimple;
    private TextView mSuggestionValues;
    private TextView mSuggestionValuesLand;
    private TextView mSuggestionValuesSimple;
    private TextView mStatusBaHheight;
    private TextView mNavigationBarHeight;

    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        this.mScreenSizeWidth = (TextView) findViewById(R.id.screen_size_width);
        this.mScreenSizeHeight = (TextView) findViewById(R.id.screen_size_height);
        this.mScreenSize = (TextView) findViewById(R.id.screen_size);
        this.mResolutionWidth = (TextView) findViewById(R.id.resolution_width);
        this.mResolutionHeight = (TextView) findViewById(R.id.resolution_height);
        this.mDPIWidth = (TextView) findViewById(R.id.dpi_width);
        this.mDPIHeight = (TextView) findViewById(R.id.dpi_height);
        this.mDensityDpi = (TextView) findViewById(R.id.density_dpi);
        this.mDesity = (TextView) findViewById(R.id.density);
        this.mDIPWidth = (TextView) findViewById(R.id.dip_width);
        this.mDIPHeight = (TextView) findViewById(R.id.dip_height);
        this.mSuggestionLayout = (TextView) findViewById(R.id.suggestion_layout);
        this.mSuggestionLayoutLand = (TextView) findViewById(R.id.suggestion_layout_land);
        this.mSuggestionLayoutSimple = (TextView) findViewById(R.id.suggestion_layout_simple);
        this.mSuggestionValues = (TextView) findViewById(R.id.suggestion_values);
        this.mSuggestionValuesLand = (TextView) findViewById(R.id.suggestion_values_land);
        this.mSuggestionValuesSimple = (TextView) findViewById(R.id.suggestion_values_simple);
        this.mStatusBaHheight = (TextView) findViewById(R.id.status_bar_height);
        this.mNavigationBarHeight = (TextView) findViewById(R.id.navigation_bar_height);

        /**
         *  A structure describing general information about a display,
         *  such as its size, density, and font scaling.
         */

        DisplayMetrics dm = getResources().getDisplayMetrics();
        //获取屏幕尺寸
        this.mScreenSizeWidth.setText(String.valueOf(((float) dm.widthPixels) / dm.xdpi));
        this.mScreenSizeHeight.setText(String.valueOf(((float) dm.heightPixels) / dm.ydpi));
        double x = Math.pow(dm.widthPixels / dm.xdpi, 2);
        double y = Math.pow(dm.heightPixels / dm.ydpi, 2);
        this.mScreenSize.setText(String.valueOf(Math.sqrt(x + y)));
        //获取屏幕分辨率
        this.mResolutionWidth.setText(String.valueOf(dm.widthPixels));
        this.mResolutionHeight.setText(String.valueOf(dm.heightPixels));
        //物理像素
        this.mDPIWidth.setText(String.valueOf(dm.xdpi));
        this.mDPIHeight.setText(String.valueOf(dm.ydpi));
        //The screen density expressed as dots-per-inch.
        this.mDensityDpi.setText(densityDpiToString(dm.densityDpi));

        this.mDesity.setText(String.valueOf(dm.density));

        float dipW = (((float) dm.widthPixels) * 160.0f) / ((float) dm.densityDpi);
        float dipH = (((float) dm.heightPixels) * 160.0f) / ((float) dm.densityDpi);
        this.mDIPWidth.setText(String.valueOf(dipW));
        this.mDIPHeight.setText(String.valueOf(dipH));

        this.mSuggestionLayout.setText("layout" + getSmallestWidthString((int) dipW, (int) dipH) + getResolutionString(dm.widthPixels, dm.heightPixels));
        this.mSuggestionLayoutLand.setText("layout-land" + getSmallestWidthString((int) dipW, (int) dipH) + getResolutionString(dm.widthPixels, dm.heightPixels));
        this.mSuggestionLayoutSimple.setText("layout" + getSmallestWidthString((int) dipW, (int) dipH));
        this.mSuggestionValues.setText("values" + getSmallestWidthString((int) dipW, (int) dipH) + getResolutionString(dm.widthPixels, dm.heightPixels));
        this.mSuggestionValuesLand.setText("values-land" + getSmallestWidthString((int) dipW, (int) dipH) + getResolutionString(dm.widthPixels, dm.heightPixels));
        this.mSuggestionValuesSimple.setText("values" + getSmallestWidthString((int) dipW, (int) dipH));

        this.mStatusBaHheight.setText(String.valueOf(getStatusBarHeight()));
        this.mNavigationBarHeight.setText(String.valueOf(getNavigationBarHeight()));

    }

    //获得导航栏的高度
    public int getNavigationBarHeight() {
        Resources resources = getResources();
        int resourceId = resources.getIdentifier("navigation_bar_height", "dimen", "android"); //获取NavigationBar的高度
        int height = resources.getDimensionPixelSize(resourceId);
        return height;
    }

    //获取状态栏的高度
    public int getStatusBarHeight() {
        DisplayMetrics dm = new DisplayMetrics();
        getWindowManager().getDefaultDisplay().getMetrics(dm);
        int width = dm.widthPixels;  //屏幕宽
        int height = dm.heightPixels;  //屏幕高
        Rect frame = new Rect();
        getWindow().getDecorView().getWindowVisibleDisplayFrame(frame);
        int statusBarHeight = frame.top;  //状态栏高
        int contentTop = getWindow().findViewById(Window.ID_ANDROID_CONTENT).getTop();
        int titleBarHeight = contentTop - statusBarHeight; //标题栏高

        return titleBarHeight;
    }

    private String densityDpiToString(int densityDpi) {
        String str;
        switch (densityDpi) {
            case 120:
                str = "ldpi";
                break;
            case 160:
                str = "mdpi";
                break;
            case 213:
                str = "tvdpi";
                break;
            case 240:
                str = "hdpi";
                break;
            case 320:
                str = "xhdpi";
                break;
            case 480:
                str = "xxhdpi";
                break;
            case 640:
                str = "xxxhdpi";
                break;
            default:
                str = "N/A";
                break;
        }
        return densityDpi + " (" + str + ")";
    }

    private String getResolutionString(int rw, int rh) {
        return rw > rh ? "-" + rw + "x" + rh : "-" + rh + "x" + rw;
    }

    private String getSmallestWidthString(int dipWidth, int dipHeight) {
        StringBuilder stringBuilder = new StringBuilder("-sw");
        if (dipWidth >= dipHeight) {
            dipWidth = dipHeight;
        }
        return stringBuilder.append(dipWidth).append("dp").toString();
    }

}

```

### Reference

> Download full code [here](https://github.com/ZQiang94/DisplayInfo/archive/refs/heads/master.zip).
> Follow code author [here](https://github.com/ZQiang94/).

## Example 2: DeviceInfo-Sample

> Get easy access to device information super fast, real quick.

Simple, single class wrapper to get device information from an android device.

This library provides an easy way to access all the device information without having to deal with all the boilerplate stuff going on inside.

Library also provides option to ask permissions for Marshmellow devices!


Here are demo screenshots:

![](https://camo.githubusercontent.com/936c03a9f1f0edb29e4bc78c2cbf6edfe9ba820a494db0f825a5e79294eb08a9/68747470733a2f2f6c68332e676f6f676c6575736572636f6e74656e742e636f6d2f6e70366d574654427530474661683942684f3533453265773552677963684737394a6839783259703177585f4f6d623245616c5f3362494c2d616d57586544515658383d683331302d7277)

![API](https://camo.githubusercontent.com/7a097bb07d47506d643804b222bb8ad2be336498/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4150492d392532422d6f72616e67652e7376673f7374796c653d666c6174)

### Step 1: Integrate the library

**Gradle Dependecy**  

```groovy
dependencies {
        implementation 'com.an.deviceinfo:deviceinfo:0.1.5'
}
```

**Maven Dependecy**  

```xml
<dependency>
  <groupId>com.an.deviceinfo</groupId>
  <artifactId>deviceinfo</artifactId>
  <version>0.1.5</version>
  <type>pom</type>
</dependency>
```

#### Download

You can download the aar file from the release folder in this project.  
In order to import a .aar library:  
1) Go to File>New>New Module  
2) Select "Import .JAR/.AAR Package" and click next.  
3) Enter the path to .aar file and click finish.  
4) Go to File>Project Settings (Ctrl+Shift+Alt+S).  
5) Under "Modules," in left menu, select "app."  
6) Go to "Dependencies tab.  
7) Click the green "+" in the upper right corner.  
8) Select "Module Dependency"  
9) Select the new module from the list.  

### Step 2: Usage

For easy use, I have split up all the device information by the following:  
1\. Location  
2\. Ads  
3\. App  
4\. Battery  
5\. Device  
6\. Memory  
7\. Network  
8\. User Installed Apps  
9\. User Contacts  

####Location

```java
LocationInfo locationInfo = new LocationInfo(this);
DeviceLocation location = locationInfo.getLocation();

```

| Value | Function Name | Returns |
| --- | :-: | --: |
| Latitude | `getLatitude()` | Double |
| Longitude | `getLongitude()` | Double |
| Address Line 1 | `getAddressLine1()` | String |
| City | `getCity()` | String |
| State | `getState()` | String |
| CountryCode | `getCountryCode()` | String |
| Postal Code | `getPostalCode()` | String |

#### Ads

No Google play services needed!

```java
AdInfo adInfo = new AdInfo(this);
adInfo.getAndroidAdId(new new AdInfo.AdIdCallback() {
                         @Override
                         public void onResponse(Ad ad) {
                             String advertisingId = ad.getAdvertisingId();
                             Boolean canTrackAds = ad.isAdDoNotTrack();
                         }
                     });

```

| Value | Function Name | Returns |
| --- | :-: | --: |
| AdvertisingId | `getAdvertisingId()` | String |
| Can Track ads | `isAdDoNotTrack()` | boolean |

#### App

```java
App app = new App(this);

```

| Value | Function Name | Returns |
| --- | :-: | --: |
| App Name | `getAppName()` | String |
| Package Name | `getPackageName()` | String |
| Activity Name | `getActivityName()` | String |
| App Version Name | `getAppVersionName()` | String |
| App Version Code | `getAppVersionCode()` | Integer |

#### Battery

```java
Battery battery = new Battery(this);

```

| Value | Function Name | Returns |
| --- | :-: | --: |
| Battery Percent | `getBatteryPercent()` | int |
| Is Phone Charging | `isPhoneCharging()` | boolean |
| Battery Health | `getBatteryHealth()` | String |
| Battery Technology | `getBatteryTechnology()` | String |
| Battery Temperature | `getBatteryTemperature()` | float |
| Battery Voltage | `getBatteryVoltage()` | int |
| Charging Source | `getChargingSource()` | String |
| Is Battery Present | `isBatteryPresent()` | boolean |

#### Device

```java
Device device = new Device(this);

```

| Value | Function Name | Returns |
| --- | :-: | --: |
| Release Build Version | `getReleaseBuildVersion()` | String |
| Build Version Code Name | `getBuildVersionCodeName()` | String |
| Manufacturer | `getManufacturer()` | String |
| Model | `getModel()` | String |
| Product | `getProduct()` | String |
| Fingerprint | `getFingerprint()` | String |
| Hardware | `getHardware()` | String |
| Radio Version | `getRadioVersion()` | String |
| Device | `getDevice()` | String |
| Board | `getBoard()` | String |
| Display Version | `getDisplayVersion()` | String |
| Build Brand | `getBuildBrand()` | String |
| Build Host | `getBuildHost()` | String |
| Build Time | `getBuildTime()` | long |
| Build User | `getBuildUser()` | String |
| Serial | `getSerial()` | String |
| Os Version | `getOsVersion()` | String |
| Language | `getLanguage()` | String |
| SDK Version | `getSdkVersion()` | int |
| Screen Density | `getScreenDensity()` | String |
| Screen Height | `getScreenHeight()` | int |
| Screen Density | `getScreenWidth()` | int |

#### Memory

```java
Memory memory = new Memory(this);

```

| Value | Function Name | Returns |
| --- | :-: | --: |
| Has External SD Card | `isHasExternalSDCard()` | boolean |
| Total RAM | `getTotalRAM()` | long |
| Available Internal Memory Size | `getAvailableInternalMemorySize()` | long |
| Total Internal Memory Size | `getTotalInternalMemorySize()` | long |
| Available External Memory Size | `getAvailableExternalMemorySize()` | long |
| Total External Memory Size | `getTotalExternalMemorySize()` | String |

#### Network

```java
Network network = new Network(this);

```

| Value | Function Name | Returns |
| --- | :-: | --: |
| IMEI | `getIMEI()` | String |
| IMSI | `getIMSI()` | String |
| Phone Type | `getPhoneType()` | String |
| Phone Number | `getPhoneNumber()` | String |
| Operator | `getOperator()` | String |
| SIM Serial | `getsIMSerial()` | String |
| Network Class | `getNetworkClass()` | String |
| Network Type | `getNetworkType()` | String |
| Is SIM Locked | `isSimNetworkLocked()` | boolean |
| Is Nfc Present | `isNfcPresent()` | boolean |
| Is Nfc Enabled | `isNfcEnabled()` | boolean |
| Is Wifi Enabled | `isWifiEnabled()` | boolean |
| Is Network Available | `isNetworkAvailable()` | boolean |

#### User Installed Apps

```java
UserAppInfo userAppInfo = new UserAppInfo(this);
List<UserApps> userApps = userAppInfo.getInstalledApps(boolean includeSystemApps);

```

| Value | Function Name | Returns |
| --- | :-: | --: |
| App Name | `getAppName()` | String |
| Package Name | `getPackageName()` | String |
| Version Name | `getVersionName()` | String |
| Version Code | `getVersionCode()` | int |

#### User Contacts

```java
UserContactInfo userContactInfo = new UserContactInfo(mActivity);
List<UserContacts> userContacts = userContactInfo.getContacts();

```

| Value | Function Name | Returns |
| --- | :-: | --: |
| Contact Name | `getDisplayName()` | String |
| Mobile Number | `getMobileNumber()` | String |
| Phone Type | `phoneType()` | String |

#### How to get Permissions for android 6+

Easy! I have provided a small, easy wrapper for getting permissions for marshmellow devices.

First, override onRequestPermissionsResult and call PermissionManager.handleResult(requestCode, permissions, grantResults);

```java
PermissionManager permissionManager = new PermissionManager(this);
    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        permissionManager.handleResult(requestCode, permissions, grantResults);
    }

```

Now you can ask permission:

```java
permissionManager.showPermissionDialog(permission)
                    .withDenyDialogEnabled(true)
                    .withDenyDialogMsg(mActivity.getString(R.string.permission_location))
                    .withCallback(new PermissionManager.PermissionCallback() {
                        @Override
                        public void onPermissionGranted(String[] permissions, int[] grantResults) {
                            //you can handle what to do when permission is granted
                        }

                        @Override
                        public void onPermissionDismissed(String permission) {
                           /**
                             * user has denied the permission. We can display a custom dialog 
                             * to user asking for permission
                           * */
                        }

                        @Override
                        public void onPositiveButtonClicked(DialogInterface dialog, int which) {
                          /**
                            * You can choose to open the
                            * app settings screen
                            * * */
                              PermissionUtils permissionUtils = new PermissionUtils(this);
                              permissionUtils.openAppSettings();
                        }

                        @Override
                        public void onNegativeButtonClicked(DialogInterface dialog, int which) {
                          /**
                            * The user has denied the permission!
                            * You need to handle this in your code
                            * * */
                        }
                    })
                    .build();

```

#### Various options available in PermissionManager

| Value | Function Name | Returns |
| --- | :-: | --: |
| To enable custom dialog when user has denied the permission | `withDenyDialogEnabled()` | boolean |
| To enable Rationale, explaining the need for the permission, the first time they have denied the permission | `withRationaleEnabled()` | boolean |
| Message to be displayed in the custom dialog | `withDenyDialogMsg()` | String |
| Title to be displayed in the custom dialog | `withDenyDialogTitle()` | String |
| Postive Button text to be displayed in the custom alert dialog | `withDenyDialogPosBtnText()` | String |
| Negative Button text to be displayed in the custom alert dialog | `withDenyDialogNegBtnText()` | String |
| Should display the negative button flag | `withDenyDialogNegBtn()` | boolean |
| Flag to cancel the dialog | `isDialogCancellable()` | boolean |


### Reference

> Read more [here](https://github.com/anitaa1990/DeviceInfo-Sample/).
> Download code [here](https://github.com/anitaa1990/DeviceInfo-Sample/archive/refs/heads/master.zip).
> Follow code author [here](https://github.com/anitaa1990/).

## Example 3: Use appzy/DeviceInfo

Collect Android device information and output it in the form of Json

You can freely customize the type of device to be collected, the details of the displayed device information, etc.

### Features

*   By inheriting `BaseDeviceInfoCollector`classes, cooperate `DeviceInfoManager`to obtain any device information
*   By `DeviceInfoManager`managing each device information collector (hereinafter referred to as Collector), Collectors can be added freely to collect N kinds of software and hardware device information at the same time
*   Collector is divided into two collection methods: automatic collection and manual collection.
    *   Automatic collection: Manager controls collection that occurs spontaneously
    *   Manual collection: Data collection process that requires user interaction
*   Multiple Collectors managed by Manager do concurrent automatic collection, and manual collection can be configured to start automatically after the automatic collection action ends
*   Each Collector independently manages the permissions it needs and applies it in the Manager (SDK\_VERSION >= 23)
*   You can choose to get the device information of all modules (Json), or you can choose to output only a single module (Json)
*   Provides rich status callback interfaces `DeviceInfoCollectListener`, which can monitor various statuses such as the end of collection

Currently available device information (only used as a template, it is recommended to customize it when using it):

*   Android device basic information (PhoneBasicInfoCollector)
*   Sim Card Information (SimInfoCollector)
    *   Recognize multiple Sim cards at the same time
*   Board Information (BoardInfoCollector)
*   Cpu Information (CpuInfoCollector)
*   Battery Info (BatteryInfoCollector)
*   Screen Info (ScreenInfoCollector)
*   NFC information (NfcInfoCollector)
*   Sensor List (SensorInfoCollector)
*   Camera Info (CameraInfoCollector)
*   Storage Information (RAM & SD) (StorageInfoCollector)
*   Ui Information (UiInfoCollector)
*   System related information (Build.prop, etc.)z




### Step 1: Add dependency library

*   Step 1.Add it in your root build.gradle at the end of repositories
    
    ```groovy
     	allprojects {
     		repositories {
     			...
     			maven { url 'https://jitpack.io' }
     		}
     	}
    
    ```
    
*   Step 2.Add the dependency
    
    ```groovy
     	dependencies {
             	implementation 'com.github.guyuepeng:DeviceInfo:xxx'
     	}
    
    ```
    
### Step 2: Write Code

```java
DeviceInfoManager.NewInstance(this)
        .addCollector(new PhoneBasicInfoCollector(this, "basic"))       //Andorid设备基本信息（PhoneBasicInfoCollector）
        .addCollector(new SimInfoCollector(this, "sim"))                //Sim卡信息（SimInfoCollector）同时识别多张Sim卡
        .addCollector(new CpuInfoCollector(this, "cpu"))                //Cpu信息（CpuInfoCollector）
        .addCollector(new BoardInfoCollector(this, "board"))            //主板信息（BoardInfoCollector）
        .addCollector(new BatteryInfoCollector(this, "battery"))        //电池信息（BatteryInfoCollector）
        .addCollector(new StorageInfoCollector(this, "storage"))        //存储信息（RAM & SD）（StorageInfoCollector）
        .addCollector(new CameraInfoCollector(this, "camera", true))    //摄像头信息（CameraInfoCollector）
        .addCollector(new ScreenInfoCollector(this, "screen"))          //屏幕信息（ScreenInfoCollector）
        .addCollector(new UiInfoCollector(this, "ui"))                  //Ui信息（UiInfoCollector）
        .addCollector(new SensorInfoCollector(this, "sensor"))          //传感器列表（SensorInfoCollector）
        .addCollector(new NfcInfoCollector(this, "nfc"))                //NFC信息（NfcInfoCollector）
        .addCollector(new SystemInfoCollector(this, "system"))          //系统相关信息（Build.prop等）
        .autoStartManualCollection(true)
        .bindListener(mDeviceInfoCollectListener)
        .start();
```


Default output:

```json
{
    "board": {"boardName": "MSM8939"},
    "sim": [{
        "dataState": "0",
        "imsi": "460036820263837",
        "isNetworkRoaming": "false",
        "networkOperatorName": "China Telecom",
        "networkType": "14",
        "phoneType": "2",
        "simCountryIso": "cn",
        "simOperator": "46003",
        "simSerialNumber": "89860315844110607274",
        "simState": "0"
    }]
}

```



### Full Example

Here is a full example:

**MainActivity.java**

```java
package ltns.deviceinfo;

import android.os.Bundle;
import android.os.Environment;
import  android . os . Handler ;
import android.os.Message;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

import ltns.deviceinfo.utils.FileUtils;
import ltns.deviceinfo.utils.JsonUtils;
import ltns.deviceinfolib.DeviceInfoManager;
import ltns.deviceinfolib.collector.BatteryInfoCollector;
import ltns.deviceinfolib.collector.BoardInfoCollector;
import ltns.deviceinfolib.collector.CameraInfoCollector;
import ltns.deviceinfolib.collector.CpuInfoCollector;
import ltns.deviceinfolib.collector.NfcInfoCollector;
import ltns.deviceinfolib.collector.PhoneBasicInfoCollector;
import ltns.deviceinfolib.collector.ScreenInfoCollector;
import ltns.deviceinfolib.collector.SensorInfoCollector;
import ltns.deviceinfolib.collector.SimInfoCollector;
import ltns.deviceinfolib.collector.StorageInfoCollector;
import ltns.deviceinfolib.collector.SystemInfoCollector;
import ltns.deviceinfolib.collector.UiInfoCollector;
import ltns.deviceinfolib.collector.base.BaseDeviceInfoCollector;
import ltns.deviceinfolib.listener.DeviceInfoCollectListener;

/**
 * @date 创建时间：2018/1/8
 * @author appzy
 * @Description 获取设备信息
 * @version
 */
public class MainActivity extends AppCompatActivity {
    private static final int ERROR = 0;
    private static final int ALL_DONE = 1;
    private static final int ALL_AUTO_COMPLETED = 2;
    private static final int SINGLE_SUCCEED = 3;
    private static final int SINGLE_FAILED = 4;

    private String outputStr = "";

    private TextView tv;
    private Button btnStart, btnSave;
    private Handler mHandler = new Handler() {
        @Override
        public void handleMessage(Message msg) {
            switch (msg.what) {
                case SINGLE_SUCCEED:
                    tv.setText(tv.getText() + "\n" + JsonUtils.jsonFormatter(((BaseDeviceInfoCollector) msg.obj).getJsonInfo()));
                    break;
                case SINGLE_FAILED:
                    tv.setText(tv.getText() + "\n" + msg.obj.toString());
                    break;
                case ALL_DONE:
                    Toast.makeText(MainActivity.this, "采集完成", Toast.LENGTH_SHORT).show();
                    outputStr = ((DeviceInfoManager) msg.obj).getDeviceJsonInfo();
//                    Log.i("--->", outputStr);
                    tv.setText("Manager的输出Json:\n" + JsonUtils.jsonFormatter(outputStr));
                    break;

            }
        }
    };

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        initView();
    }

    private void initView() {
        tv = (TextView) findViewById(R.id.textView);
        btnStart = (Button) findViewById(R.id.btn_start);
        btnStart.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                tv.setText("");
                tv.setText("每个模块的Json数据");
                collectDeviceInfo();
            }
        });
        btnSave = (Button) findViewById(R.id.btn_save);
        btnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (TextUtils.isEmpty(outputStr)) {
                    Toast.makeText(MainActivity.this, "先收集再保存", Toast.LENGTH_SHORT).show();
                    return;
                }
                String path = Environment.getExternalStorageDirectory().getPath() + "/DeviceInfo/";
                String fileName="deviceInfo.json";
                FileUtils.saveJsonAsFile(JsonUtils.jsonFormatter(outputStr), path,fileName);
                Toast.makeText(MainActivity.this, "保存完成，保存路径为：" + path, Toast.LENGTH_SHORT).show();
            }
        });
    }

    private DeviceInfoCollectListener mDeviceInfoCollectListener = new DeviceInfoCollectListener() {
        @Override
        public void onStart() {
            Toast.makeText(MainActivity.this, "开始采集", Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onSingleSuccess(BaseDeviceInfoCollector mCollector) {
            Message m = new Message();
            m.what = SINGLE_SUCCEED;
            m.obj = mCollector;
            mHandler.sendMessage(m);

        }

        @Override
        public void onSingleFailure(BaseDeviceInfoCollector mCollector, String mErrorInfo) {
            Message m = new Message();
            m.what = SINGLE_FAILED;
            m.obj = mErrorInfo + "-->" + mCollector.getJsonInfo();
            mHandler.sendMessage(m);
        }

        @Override
        public void onAllDone(DeviceInfoManager mDeviceInfoManager) {
            Message m = new Message();
            m.what = ALL_DONE;
            m.obj = mDeviceInfoManager;
            mHandler.sendMessage(m);
        }

        @Override
        public void onAutoAllDone(DeviceInfoManager mDeviceInfoManager) {
        }
    };
/**
 * @date 创建时间：2018/1/8
 * @author appzy
 * @Description 目前可获取的设备信息（只作为模板用途，建议使用时自行定制）
 * @version
 */
    private void collectDeviceInfo() {
        DeviceInfoManager.NewInstance(this)
                .addCollector(new PhoneBasicInfoCollector(this, "basic"))       //Andorid设备基本信息（PhoneBasicInfoCollector）
                .addCollector(new SimInfoCollector(this, "sim"))                //Sim卡信息（SimInfoCollector）同时识别多张Sim卡
                .addCollector(new CpuInfoCollector(this, "cpu"))                //Cpu信息（CpuInfoCollector）
                .addCollector(new BoardInfoCollector(this, "board"))            //主板信息（BoardInfoCollector）
                .addCollector(new BatteryInfoCollector(this, "battery"))        //电池信息（BatteryInfoCollector）
                .addCollector(new StorageInfoCollector(this, "storage"))        //存储信息（RAM & SD）（StorageInfoCollector）
                .addCollector(new CameraInfoCollector(this, "camera", true))    //摄像头信息（CameraInfoCollector）
                .addCollector(new ScreenInfoCollector(this, "screen"))          //屏幕信息（ScreenInfoCollector）
                .addCollector(new UiInfoCollector(this, "ui"))                  //Ui信息（UiInfoCollector）
                .addCollector(new SensorInfoCollector(this, "sensor"))          //传感器列表（SensorInfoCollector）
                .addCollector(new NfcInfoCollector(this, "nfc"))                //NFC信息（NfcInfoCollector）
                .addCollector(new SystemInfoCollector(this, "system"))          //系统相关信息（Build.prop等）
                .autoStartManualCollection(true)
                .bindListener(mDeviceInfoCollectListener)
                .start();
    }
}

```



> Find full code [here](https://github.com/appzy/DeviceInfo/tree/master/app).


### Reference

> Read more [here](https://github.com/appzy/DeviceInfo/).
> Follow code author [here](https://github.com/appzy/).
> Download code [here](https://github.com/appzy/DeviceInfo/archive/refs/heads/master.zip).
