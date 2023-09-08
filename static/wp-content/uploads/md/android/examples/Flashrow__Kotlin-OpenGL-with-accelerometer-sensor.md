# Kotlin OpenGL with Accelerometer Sensor

>  Simple android project with implementation of openGL SE circle shape, accelerometer sensor for measuring phone rotation.

### Full Example

Let us look at a full android OpenGL sample project.

#### Step 1. Dependencies

We need to add some dependencies in our `app/build.gradle` file as shown below:


**(a). `build.gradle`**


> Our app-level `build.gradle`.

We Prepare our dependencies as shown below. You may use later versions.

At the top of our `app/build.gradle` we will apply the following 3 plugins:

1. Our `com.android.application` plugin.
2. Our `kotlin-android` plugin.
3. Our `kotlin-android-extensions` plugin.

We then declare our app dependencies under the `dependencies` closure. We will need the following 4 dependencies:

1. Our `Kotlin-stdlib` library.
2. Our `Core-ktx` library.
3. Our `Appcompat` library.
4. Our `Constraintlayout` library.

Here is our full `app/build.gradle`:

```groovy
apply plugin: 'com.android.application'
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

android {
    compileSdkVersion 30
    buildToolsVersion "29.0.3"

    defaultConfig {
        applicationId "pl.polsl.openglapp"
        minSdkVersion 26
        targetSdkVersion 30
        versionCode 1
        versionName "1.0"

        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }

    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: "libs", include: ["*.jar"])
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'androidx.core:core-ktx:1.3.2'
    implementation 'androidx.appcompat:appcompat:1.2.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.0.4'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test.ext:junit:1.1.2'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.3.0'

}
```
#### Step 2. Our Android Manifest


**(a). `AndroidManifest.xml`**


> Our `AndroidManifest` file.

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="pl.polsl.openglapp">
    <uses-feature android:glEsVersion="0x00020000" android:required="true" />
    <supports-gl-texture android:name="GL_OES_compressed_ETC1_RGB8_texture" />
    <supports-gl-texture android:name="GL_OES_compressed_paletted_texture" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme">
        <activity android:name=".MainActivity"
                  android:screenOrientation="landscape">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```
#### Step 3. Design Layouts

**(a). `activity_main.xml`**

> Our `activity_main` layout.

Design your XML layout using the following 2 UI widgets:

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
#### Step 4. Write Code

Finally we need to write our code as follows:


**(a). `GLCircle.kt`**

> Our `GLCircle` class.

Create a Kotlin file named `GLCircle.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Resources` from the `android.content.res` package.
2. `GLES20` from the `android.opengl` package.
3. `Matrix` from the `android.opengl` package.
4. `Log` from the `android.util` package.

We will be creating the following methods:

1. `getModelMatrix(): FloatArray `.
2. `draw(parameter)` - We pass a `FloatArray?` object as a parameter.

**(a). Our `getModelMatrix()` function**

Write the `getModelMatrix()` function as follows:

```kotlin
    fun getModelMatrix(): FloatArray {
        return mModelMatrix;
    }
```

**(b). Our `draw()` function**

Write the `draw()` function as follows:

```kotlin
    fun draw(mvpMatrix: FloatArray?){
        GLES20.glUseProgram(mProgram)
        positionHandle = GLES20.glGetAttribLocation(mProgram, "vPosition").also {
        GLES20.glEnableVertexAttribArray(it)

            GLES20.glVertexAttribPointer(
                it,
                COORDS_PER_VERTEX,
                GLES20.GL_FLOAT,
                false,
                vertexStride,
                mVertexBuffer
            )

            mColorHandle = GLES20.glGetUniformLocation(mProgram, "vColor")
            GLES20.glUniform4fv(mColorHandle, 1, color, 0)

            mMVPMatrixHandle = GLES20.glGetUniformLocation(mProgram, "uMVPMatrix")
            GLES20.glUniformMatrix4fv(mMVPMatrixHandle, 1, false, mvpMatrix, 0)
            GLES20.glDrawArrays(GLES20.GL_TRIANGLE_FAN, 0, 364)
            GLES20.glDisableVertexAttribArray(it)
        }
    }
```


Here is the full code:

```kotlin
package replace_with_your_package_name

import GLRenderer.Companion.loadShader
import android.content.res.Resources
import android.opengl.GLES20
import android.opengl.Matrix
import android.util.Log
import java.nio.ByteBuffer
import java.nio.ByteOrder
import java.nio.FloatBuffer
import kotlin.math.PI
import kotlin.math.cos
import kotlin.math.sin

const val COORDS_PER_VERTEX = 3
var circleCoords = floatArrayOf(     // in counterclockwise order:
    0.0f, 0.622008459f, 0.0f,        // top
    -0.5f, -0.311004243f, 0.0f,      // bottom left
    0.5f, -0.311004243f, 0.0f        // bottom right
)

class Circle {
    public val mModelMatrix = FloatArray(16)
    val color = floatArrayOf(0f, 0f, 1f, 1.0f)
    private var positionHandle: Int = 0
    private var mColorHandle: Int = 0
    private var mMVPMatrixHandle = 0
    private val mVertexBuffer: FloatBuffer
    private val vertexCount: Int = circleCoords.size / COORDS_PER_VERTEX
    private val vertexStride: Int = COORDS_PER_VERTEX * 4
    private val vertices = FloatArray(364 * 3)
    private var mProgram: Int

    private val vertexShaderCode =
        "uniform mat4 uMVPMatrix;" +
        "attribute vec4 vPosition;" +
                "void main() {" +
                " gl_Position = uMVPMatrix * vPosition;" +
                "}"

    private val fragmentShaderCode =
        "precision mediump float;" +
                "uniform vec4 vColor;" +
                "void main() {" +
                "  gl_FragColor = vColor;" +
                "}"


    init {
        Matrix.setIdentityM(mModelMatrix, 0)
        vertices[0] = 0F
        vertices[1] = 0F
        vertices[2] = 0F
        val ratio = Resources.getSystem().displayMetrics.widthPixels.toFloat() / Resources.getSystem().displayMetrics.heightPixels.toFloat()
        for (i in 1..363) {
            vertices[i * 3 + 0] = (ratio * 0.1 * cos(3.14 / 180 * i.toFloat())).toFloat()
            vertices[i * 3 + 1] = (ratio * 0.1* sin(3.14 / 180 * i.toFloat())).toFloat()
            vertices[i * 3 + 2] = 0F
        }
        val vertexByteBuffer = ByteBuffer.allocateDirect(vertices.size * 4)
        vertexByteBuffer.order(ByteOrder.nativeOrder())
        mVertexBuffer = vertexByteBuffer.asFloatBuffer()
        mVertexBuffer.put(vertices)
        mVertexBuffer.position(0)
        val vertexShader = loadShader(GLES20.GL_VERTEX_SHADER, vertexShaderCode)
        val fragmentShader = loadShader(GLES20.GL_FRAGMENT_SHADER, fragmentShaderCode)
        mProgram = GLES20.glCreateProgram()
        GLES20.glAttachShader(mProgram, vertexShader)
        GLES20.glAttachShader(mProgram, fragmentShader)
        GLES20.glLinkProgram(mProgram)
    }

    fun getModelMatrix(): FloatArray {
        return mModelMatrix;
    }

    fun draw(mvpMatrix: FloatArray?){
        GLES20.glUseProgram(mProgram)
        positionHandle = GLES20.glGetAttribLocation(mProgram, "vPosition").also {
        GLES20.glEnableVertexAttribArray(it)

            GLES20.glVertexAttribPointer(
                it,
                COORDS_PER_VERTEX,
                GLES20.GL_FLOAT,
                false,
                vertexStride,
                mVertexBuffer
            )

            mColorHandle = GLES20.glGetUniformLocation(mProgram, "vColor")
            GLES20.glUniform4fv(mColorHandle, 1, color, 0)

            mMVPMatrixHandle = GLES20.glGetUniformLocation(mProgram, "uMVPMatrix")
            GLES20.glUniformMatrix4fv(mMVPMatrixHandle, 1, false, mvpMatrix, 0)
            GLES20.glDrawArrays(GLES20.GL_TRIANGLE_FAN, 0, 364)
            GLES20.glDisableVertexAttribArray(it)
        }
    }


}

```

**(b). `GLRenderer.kt`**

> Our `GLRenderer` class.

Create a Kotlin file named `GLRenderer.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Context` from the `android.content` package.
2. `Sensor` from the `android.hardware` package.
3. `SensorEvent` from the `android.hardware` package.
4. `SensorEventListener` from the `android.hardware` package.
5. `SensorManager` from the `android.hardware` package.
6. `GLES20` from the `android.opengl` package.
7. `GLSurfaceView` from the `android.opengl` package.
8. `Matrix` from the `android.opengl` package.
9. `Log` from the `android.util` package.

Next create a class that derives from `GLSurfaceView.Renderer,` and add its contents as follows:

We will be overriding the following functions: 

1. `onSurfaceCreated(unused: GL10, config: EGLConfig) `.
2. `onDrawFrame(unused: GL10) `.
3. `onSensorChanged(event: SensorEvent?)`.
4. `onAccuracyChanged(p0: Sensor?, p1: Int) `.
5. `onSurfaceChanged(unused: GL10, width: Int, height: Int) `.

We will be creating the following methods:

1. `loadShader(type: Int, shaderCode: String): Int`.

**(a). Our `loadShader()` function**

Write the `loadShader()` function as follows:

```kotlin
        fun loadShader(type: Int, shaderCode: String): Int{
            return GLES20.glCreateShader(type).also{ shader ->
                GLES20.glShaderSource(shader, shaderCode)
                GLES20.glCompileShader(shader)
            }
        }
```


Here is the full code:

```kotlin
import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import javax.microedition.khronos.egl.EGLConfig
import javax.microedition.khronos.opengles.GL10

import android.opengl.GLES20
import android.opengl.GLSurfaceView
import android.opengl.Matrix
import android.util.Log
import pl.polsl.openglapp.Circle
import kotlin.math.abs

class GLRenderer(private var context: Context) : GLSurfaceView.Renderer, SensorEventListener {
    private val vPMatrix = FloatArray(16)
    private lateinit var mCircle: Circle;
    private val projectionMatrix = FloatArray(16)
    private val viewMatrix = FloatArray(16)
    private var ratio = 0f
    private var rotationMatrix = FloatArray(16)
    private val sensorManager: SensorManager = context.getSystemService(Context.SENSOR_SERVICE) as SensorManager
    private var rotation: Float = 0f
    private var currentVelocity = 1
    private var velocity = 1
    private var direction = 1
    private var timestamp: Float = 0f

    override fun onSurfaceCreated(unused: GL10, config: EGLConfig) {
        val sensorAcc: Sensor = sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER)
        sensorManager.registerListener(this, sensorAcc, SensorManager.SENSOR_DELAY_NORMAL)

        GLES20.glClearColor(0.5f, 1.0f, 0.5f, 1.0f)
        mCircle = Circle ()
    }

    override fun onDrawFrame(unused: GL10) {
        val scratch = FloatArray(16)

        GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT)
        Matrix.setLookAtM(viewMatrix, 0, 0f, 0f, -3f, 0f, 0f, 0f, 0f, 1.0f, 0.0f)
        Matrix.multiplyMM(vPMatrix, 0, projectionMatrix, 0, viewMatrix, 0)


        if(mCircle.getModelMatrix()[12] >= ratio * 0.9){
            if(direction == 1){
                velocity/=2
            }else{
                velocity = 1
            }
        } else if(mCircle.getModelMatrix()[12] <= -ratio * 0.9){
            if(direction == -1){
                velocity/=2
            }else{
                velocity = 1
            }
        }

        Matrix.translateM(mCircle.getModelMatrix(), 0, direction * (abs(rotation)/150) * velocity, 0f, 0f)
        Matrix.multiplyMM(scratch, 0, vPMatrix, 0, mCircle.getModelMatrix(), 0)
        mCircle.draw(scratch)
    }

    override fun onSensorChanged(event: SensorEvent?){
        Log.d("Sensor","onSensorChange")

        if (timestamp != 0f && event != null) {
            rotationMatrix = event.values
            rotation = rotationMatrix[1]
            if(rotation < 0){
                direction = 1
            } else if(rotation > 0){
                direction = -1
            }
            Log.d("xAxis: ", (rotationMatrix[1]).toString())
        }

        timestamp = event?.timestamp?.toFloat() ?: 0f
    }

    override fun onAccuracyChanged(p0: Sensor?, p1: Int) {
    }

    override fun onSurfaceChanged(unused: GL10, width: Int, height: Int) {
        GLES20.glViewport(0, 0, width, height)
        ratio = width.toFloat() / height.toFloat()
        Matrix.frustumM(projectionMatrix, 0, -ratio, ratio, -1f, 1f, 3f, 7f)
    }

    companion object{
        fun loadShader(type: Int, shaderCode: String): Int{
            return GLES20.glCreateShader(type).also{ shader ->
                GLES20.glShaderSource(shader, shaderCode)
                GLES20.glCompileShader(shader)
            }
        }
    }
}



```

**(c). `GLView.kt`**

> Our `GLView` class.

Create a Kotlin file named `GLView.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `Context` from the `android.content` package.
2. `GLSurfaceView` from the `android.opengl` package.

Next create a class that derives from `GLSurfaceView(context)` and add its contents as follows:

Here is the full code:

```kotlin
package replace_with_your_package_name

import GLRenderer
import android.content.Context
import android.opengl.GLSurfaceView

class GLView(context: Context) : GLSurfaceView(context) {

    private val renderer: GLRenderer

    init {
        setEGLContextClientVersion(2)
        renderer = GLRenderer(context)
        setRenderer(renderer)
    }
}

```

**(d). `MainActivity.kt`**

> Our `MainActivity` class.

Create a Kotlin file named `MainActivity.kt`.

We will then add imports from android SDK and other packages. Here are some of the imports we will use in this class:

1. `GLSurfaceView` from the `android.opengl` package.
2. `AppCompatActivity` from the `androidx.appcompat.app` package.
3. `Bundle` from the `android.os` package.

Next create a class that derives from `AppCompatActivity` and add its contents as follows:

We will be overriding the following functions: 

1. `onCreate(savedInstanceState: Bundle?) `.

Here is the full code:

```kotlin
package replace_with_your_package_name

import android.opengl.GLSurfaceView
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle

class MainActivity : AppCompatActivity() {
    private lateinit var gLView: GLSurfaceView

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        gLView = GLView(this)
        setContentView(gLView)
    }
}

```

### Reference

Download the code below:

|No.|Link|
|--|---|
|1.|[Download Full Code](https://github.com/Flashrow/Kotlin-OpenGL-with-accelerometer-sensor/archive/refs/heads/master.zip)|
|2.|Read more [here](https://github.com/Flashrow/Kotlin-OpenGL-with-accelerometer-sensor).|
|3.|Follow code author [here](https://github.com/Flashrow).|
