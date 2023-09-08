# Kotlin Android LocationManager Example

Learn about LocationManager using step by step example.


### What is LocationManager?

> It is a class that provides access to the system location services.

These services allow applications to obtain periodic updates of the device's geographical location, or to be notified when the device enters the proximity of a given geographical location.

### Which Permissions are Needed?

Generally all Location API methods require the `Manifest.permission.ACCESS_COARSE_LOCATION` or `Manifest.permission.ACCESS_FINE_LOCATION` permissions. If your application only has the coarse permission then providers will still return location results, but the exact location will be obfuscated to a coarse level of accuracy.

You can read more about LocationManager API [here](https://developer.android.com/reference/android/location/LocationManager).

Otherwise let's look at some examples.

## Example 1: Get Latitued, Longitude and Location Updates using LocationManager

A simple example written in Kotlin that allows us listen to Location updates. We get the latitude, longitude as well as location updates.

Here is the demo screenshot of what is created:

![Kotlin Android LocationManager Example](https://github.com/Talentica/AndroidWithKotlin/raw/master/gifs/location.gif)

### Step 1: Create Project

Start by creating an empty `Android Studio` Kotlin project.

### Step 2: Dependencies

Add Play Services Location package as a dependency in your `app/build.gradle` then sync:

```groovy
    implementation 'com.google.android.gms:play-services-location:18.0.0'
```

### Step 3: Design Layout

Add a button and several textviews in your layout. When the button is clicked we will obtain the location updates and render them in our textviews:

**activity_main.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:layout_margin="20dp"
    android:orientation="vertical">

    <Button
        android:id="@+id/btn_detect_fused_location"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Detect location" />

    <TextView
        android:id="@+id/txt_location"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="10dp"
        android:textSize="18sp" />

    <TextView
        android:id="@+id/mLatitudeTextView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="18sp" />

    <TextView
        android:id="@+id/mLongitudeTextView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="18sp" />

    <TextView
        android:id="@+id/mLastUpdateTimeTextView"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="18sp" />

    <TextView
        android:id="@+id/tv_city"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="18sp" />

    <TextView
        android:id="@+id/tv_pincode"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:textSize="18sp" />

</LinearLayout>
```

### Step 4: Write Code

Here is the full code:

**MainActivity.kt**

```kotlin
package com.talentica.androidkotlin.locationmanager

import android.app.Activity
import android.content.Intent
import android.content.IntentSender
import android.content.pm.PackageManager
import android.location.Geocoder
import android.location.Location
import android.os.Bundle
import androidx.core.app.ActivityCompat
import androidx.appcompat.app.AppCompatActivity
import android.util.Log
import android.view.View
import android.widget.Button
import android.widget.TextView
import android.widget.Toast
import com.google.android.gms.common.ConnectionResult
import com.google.android.gms.common.GoogleApiAvailability
import com.google.android.gms.common.api.GoogleApiClient
import com.google.android.gms.common.api.ResultCallback
import com.google.android.gms.common.api.Status
import com.google.android.gms.location.*
import java.text.DateFormat
import java.util.*

//If using emulator then send the location from Emulator's Extended Controls. :)
class MainActivity : AppCompatActivity(), GoogleApiClient.ConnectionCallbacks,
        GoogleApiClient.OnConnectionFailedListener,
        LocationListener,
        ResultCallback<LocationSettingsResult> {

    protected val TAG = "MainActivity";
    //Ui widgets
    private var btn_location: Button? = null;
    private var txt_location: TextView? = null;
    private var mLatitudeTextView: TextView? = null;
    private var mLongitudeTextView: TextView? = null;
    private var mLastUpdateTimeTextView: TextView? = null;
    //New views for city and pincode
    private var tv_pincode: TextView? = null;
    private var tv_city: TextView? = null;

    //Any random number you can take
    val REQUEST_PERMISSION_LOCATION: Int = 10;

    /**
     * Constant used in the location settings dialog.
     */
    protected val REQUEST_CHECK_SETTINGS: Int = 0x1;

    /**
     * The desired interval for location updates. Inexact. Updates may be more or less frequent.
     */
    private val UPDATE_INTERVAL_IN_MILLISECONDS: Long = 10000;

    /**
     * The fastest rate for active location updates. Exact. Updates will never be more frequent
     * than this value.
     */
    public val FASTEST_UPDATE_INTERVAL_IN_MILLISECONDS: Long = UPDATE_INTERVAL_IN_MILLISECONDS / 2;

    // Keys for storing activity state in the Bundle.
    protected final val KEY_REQUESTING_LOCATION_UPDATES = "requesting-location-updates";
    protected final val KEY_LOCATION = "location";
    protected final val KEY_LAST_UPDATED_TIME_STRING = "last-updated-time-string";

    /**
     * Provides the entry point to Google Play services.
     */
    protected var mGoogleApiClient: GoogleApiClient? = null

    /**
     * Stores parameters for requests to the FusedLocationProviderApi.
     */
    protected var mLocationRequest: LocationRequest? = null

    /**
     * Stores the types of location services the client is interested in using. Used for checking
     * settings to determine if the device has optimal location settings.
     */
    protected var mLocationSettingsRequest: LocationSettingsRequest? = null

    /**
     * Represents a geographical location.
     */
    protected var mCurrentLocation: Location? = null

    // Labels.
    protected var mLatitudeLabel: String = "";
    protected var mLongitudeLabel: String = "";
    protected var mLastUpdateTimeLabel: String = ""

    /**
     * Tracks the status of the location updates request. Value changes when the user presses the
     * Start Updates and Stop Updates buttons.
     */
    protected var mRequestingLocationUpdates: Boolean = false

    /**
     * Time when the location was updated represented as a String.
     */
    protected var mLastUpdateTime: String = ""

    var RQS_GooglePlayServices = 0;

    override fun onStart() {
        super.onStart()
        var googleAPI = GoogleApiAvailability.getInstance();
        var resultCode: Int = googleAPI.isGooglePlayServicesAvailable(this);
        if (resultCode == ConnectionResult.SUCCESS) {
            mGoogleApiClient?.connect();
        } else {
            googleAPI.getErrorDialog(this, resultCode, RQS_GooglePlayServices);
        }

    }

    override fun onResume() {
        super.onResume()
        // Within {@code onPause()}, we pause location updates, but leave the
        // connection to GoogleApiClient intact.  Here, we resume receiving
        // location updates if the user has requested them.
        if (mGoogleApiClient?.isConnected() == true && mRequestingLocationUpdates) {
            //  Toast.makeText(FusedLocationWithSettingsDialog.this, "location was already on so detecting location now", Toast.LENGTH_SHORT).show();
            startLocationUpdates();
        }

    }

    override fun onPause() {
        super.onPause()
        // Stop location updates to save battery, but don't disconnect the GoogleApiClient object.
        if (mGoogleApiClient?.isConnected() == true) {
            stopLocationUpdates();
        }

    }

    override fun onStop() {
        super.onStop()
        mGoogleApiClient?.disconnect();

    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main);

        btn_location = findViewById<Button>(R.id.btn_detect_fused_location)
        //total six textviews
        txt_location = findViewById<TextView>(R.id.txt_location)
        mLatitudeTextView = findViewById<TextView>(R.id.mLatitudeTextView)
        mLongitudeTextView = findViewById<TextView>(R.id.mLongitudeTextView)
        mLastUpdateTimeTextView = findViewById<TextView>(R.id.mLastUpdateTimeTextView)
        tv_city = findViewById<TextView>(R.id.tv_city)
        tv_pincode = findViewById<TextView>(R.id.tv_pincode)

        // Set labels.
        mLatitudeLabel = "lat"//getResources().getString(R.string.latitude_label);
        mLongitudeLabel = "long"//getResources().getString(R.string.longitude_label);
        mLastUpdateTimeLabel = "lastUpdatedTime"//getResources().getString(R.string.last_update_time_label);

        mRequestingLocationUpdates = false;
        mLastUpdateTime = "";

        // Kick off the process of building the GoogleApiClient, LocationRequest, and
        // LocationSettingsRequest objects.

        //step 1
        buildGoogleApiClient();

        //step 2
        createLocationRequest();

        //step 3
        buildLocationSettingsRequest();

        btn_location?.setOnClickListener(View.OnClickListener {
            checkLocationSettings();
        })
    }

    //step 1
    protected fun buildGoogleApiClient() {
        Log.i(TAG, "Building GoogleApiClient");
        mGoogleApiClient = GoogleApiClient.Builder(this)
                .addConnectionCallbacks(this)
                .addOnConnectionFailedListener(this)
                .addApi(LocationServices.API)
                .build();
    }

    //step 2
    protected fun createLocationRequest() {
        mLocationRequest = LocationRequest();

        // Sets the desired interval for active location updates. This interval is
        // inexact. You may not receive updates at all if no location sources are available, or
        // you may receive them slower than requested. You may also receive updates faster than
        // requested if other applications are requesting location at a faster interval.
        mLocationRequest?.setInterval(UPDATE_INTERVAL_IN_MILLISECONDS);

        // Sets the fastest rate for active location updates. This interval is exact, and your
        // application will never receive updates faster than this value.
        mLocationRequest?.setFastestInterval(FASTEST_UPDATE_INTERVAL_IN_MILLISECONDS);

        mLocationRequest?.setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY);
    }

    //step 3
    protected fun buildLocationSettingsRequest() {
        val builder = LocationSettingsRequest.Builder();
        builder.addLocationRequest(mLocationRequest);
        mLocationSettingsRequest = builder.build();
    }

    //step 4
    protected fun checkLocationSettings() {
        val result = LocationServices.SettingsApi.checkLocationSettings(
                mGoogleApiClient,
                mLocationSettingsRequest
        );
        result.setResultCallback(this);
    }

    /**
     * Requests location updates from the FusedLocationApi.
     */
    protected fun startLocationUpdates() {
        if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, arrayOf(android.Manifest.permission.ACCESS_FINE_LOCATION), REQUEST_PERMISSION_LOCATION);
        } else {
            LocationServices.FusedLocationApi.requestLocationUpdates(
                    mGoogleApiClient,
                    mLocationRequest,
                    this
            ).setResultCallback {
                mRequestingLocationUpdates = true;
                //     setButtonsEnabledState();
            }
        }
    }

    /**
     * Removes location updates from the FusedLocationApi.
     */
    protected fun stopLocationUpdates() {
        // It is a good practice to remove location requests when the activity is in a paused or
        // stopped state. Doing so helps battery performance and is especially
        // recommended in applications that request frequent location updates.
        LocationServices.FusedLocationApi.removeLocationUpdates(
                mGoogleApiClient,
                this
        ).setResultCallback {
            mRequestingLocationUpdates = false;
            //   setButtonsEnabledState();
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        when (requestCode) {
            REQUEST_PERMISSION_LOCATION ->
                if (grantResults.size > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                    startLocationUpdates()
                }
        }
    }

    //If using emulator then send the location from Emulator's Extended Controls. :)
    override fun onConnected(p0: Bundle?) {
        Log.i(TAG, "Connected to GoogleApiClient");

        // If the initial location was never previously requested, we use
        // FusedLocationApi.getLastLocation() to get it. If it was previously requested, we store
        // its value in the Bundle and check for it in onCreate(). We
        // do not request it again unless the user specifically requests location updates by pressing
        // the Start Updates button.
        //
        // Because we cache the value of the initial location in the Bundle, it means that if the
        // user launches the activity,
        // moves to a new location, and then changes the device orientation, the original location
        // is displayed as the activity is re-created.
        if (mCurrentLocation == null) {
            if (ActivityCompat.checkSelfPermission(this, android.Manifest.permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, arrayOf(android.Manifest.permission.ACCESS_FINE_LOCATION)  , REQUEST_PERMISSION_LOCATION);
            } else {
                mCurrentLocation = LocationServices.FusedLocationApi.getLastLocation(mGoogleApiClient);
                mLastUpdateTime = DateFormat.getTimeInstance().format(Date());
                runOnUiThread {
                    updateLocationUI();
                }
            }
        }
    }

    override fun onConnectionSuspended(p0: Int) {
        Log.i(TAG, "Connection suspended");
    }

    //If using emulator then send the location from Emulator's Extended Controls. :)
    override fun onLocationChanged(location: Location?) {
        mCurrentLocation = location;
        mLastUpdateTime = DateFormat.getTimeInstance().format(Date());
        runOnUiThread {
            updateLocationUI();
            Toast.makeText(this, "Location updated", Toast.LENGTH_SHORT).show();
        }
    }

    override fun onConnectionFailed(connectionResult: ConnectionResult) {
        // Refer to the javadoc for ConnectionResult to see what error codes might be returned in
        // onConnectionFailed.
        Log.i(TAG, "Connection failed: ConnectionResult.getErrorCode() = " + connectionResult.getErrorCode());

    }

    //If using emulator then send the location from Emulator's Extended Controls. :)
    override fun onResult(locationSettingsResult: LocationSettingsResult) {
        val status: Status = locationSettingsResult.getStatus();
        when (status.getStatusCode()) {
            LocationSettingsStatusCodes.SUCCESS -> {
                Log.i(TAG, "All location settings are satisfied.");
                //If using emulator then send the location from Emulator's Extended Controls. :)
                Toast.makeText(this, "Location is already on.", Toast.LENGTH_SHORT).show();
                startLocationUpdates();
            }

            LocationSettingsStatusCodes.RESOLUTION_REQUIRED -> {
                Log.i(TAG, "Location settings are not satisfied. Show the user a dialog to" +
                        "upgrade location settings ");
                try {
                    runOnUiThread {
                        // Show the dialog by calling startResolutionForResult(), and check the result
                        // in onActivityResult().
                        Toast.makeText(this, "Location dialog will be open", Toast.LENGTH_SHORT).show();

                        //move to step 6 in onActivityResult to check what action user has taken on settings dialog
                        status.startResolutionForResult(this, REQUEST_CHECK_SETTINGS);
                    }
                } catch (e: IntentSender.SendIntentException) {
                    Log.i(TAG, "PendingIntent unable to execute request.");
                }
            }
            LocationSettingsStatusCodes.SETTINGS_CHANGE_UNAVAILABLE -> {
                Log.i(TAG, "Location settings are inadequate, and cannot be fixed here. Dialog " +
                        "not created.");
            }
        }
    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, data: Intent?) {
        super.onActivityResult(requestCode, resultCode, data)
        when (requestCode) {
        // Check for the integer request code originally supplied to startResolutionForResult().
            REQUEST_CHECK_SETTINGS -> {
                when (resultCode) {
                    Activity.RESULT_OK -> {
                        Log.i(TAG, "User agreed to make required location settings changes.");
                        startLocationUpdates();
                    }
                    Activity.RESULT_CANCELED ->
                        Log.i(TAG, "User chose not to make required location settings changes.");
                }
            }
        }
    }

    /**
     * Sets the value of the UI fields for the location latitude, longitude and last update time.
     */
    private fun updateLocationUI() {
        if (mCurrentLocation != null) {
            mLatitudeTextView?.setText(String.format("%s: %f", mLatitudeLabel,
                    mCurrentLocation?.getLatitude()));
            mLongitudeTextView?.setText(String.format("%s: %f", mLongitudeLabel,
                    mCurrentLocation?.getLongitude()));
            mLastUpdateTimeTextView?.setText(String.format("%s: %s", mLastUpdateTimeLabel,
                    mLastUpdateTime));

            updateCityAndPincode(mCurrentLocation?.getLatitude()!!.toDouble(), mCurrentLocation?.getLongitude()!!.toDouble());
        }
    }

    /**
     *  This updateCityAndPincode method uses Geocoder api to map the latitude and longitude into city location or pincode.
     *  We can retrieve many details using this Geocoder class.
     *
    And yes the Geocoder will not work unless you have data connection or wifi connected to internet.
     */
    private fun updateCityAndPincode(latitude: Double, longitude: Double) {
        try {
            val gcd = Geocoder(this, Locale.getDefault());
            val addresses = gcd.getFromLocation(latitude, longitude, 1);
            if (addresses.size > 0) {

                tv_city?.setText("City=" + addresses.get(0).getLocality());
                tv_pincode?.setText("Pincode=" + addresses.get(0).getPostalCode());
                //  System.out.println(addresses.get(0).getLocality());
            }

        } catch (e: Exception) {
            Log.e(TAG, "exception:" + e.toString());
        }
    }
}
```

### Step 5: Add Permissions

Add the following two permissions in your `AndroidManifest.xml`:

```xml
    <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION"/>
    <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION"/>
```

### Run

Copy the code or download it in the link below, build and run.

### Reference

Here are the reference links:

| Number | Link |
| --- | --- |
| 1. | [Download](https://downgit.github.io/#/home?url=https://github.com/Talentica/AndroidWithKotlin/tree/master/locationmanager) Example |
| 2. | [Follow](https://github.com/Talentica/) code author |
