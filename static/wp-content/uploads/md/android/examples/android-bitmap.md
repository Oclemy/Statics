# Bitmap Examples


Generally speaking, in computing, a bitmap is a mapping from some domain to bits. It is also called a bit array or bitmap index. It represents an array of binary data representing the values of pixels in an image or display.

In android, such binary data can be held in a pre-defined data type known as `Bitmap`, which is defined in the `android.graphics` package. You can it's reference [here](https://developer.android.com/reference/android/graphics/Bitmap).

This tutorial explores some examples of how to use a bitmap in android.

## Examples 1: Kotlin Android Bitmap Example

This example is a beginner friendly way of using bitmap in an app witten in kotlin.

Here is a demo of what is created:

![Kotlin Android Bitmpa Example](https://github.com/alirezabashi98/bitmap/raw/master/img002.jpg)

![](https://github.com/alirezabashi98/bitmap/raw/master/img003.jpg)

![](https://github.com/alirezabashi98/bitmap/raw/master/img005.jpg)

### Step 1: Dependencies

We do not need any third party dependency.

### Step 2: Design Layout

Start by designing your xml layout. Because we are using image bitmap, we need an imageview that will render that bitmap. So add an imageview and several buttons that will result in manipulation of the bitmap:

**activity_main.xml**

```java
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <ImageView
        android:id="@+id/mainActivity_imageView_testBitmap"
        android:layout_width="270sp"
        android:layout_height="270sp"
        android:src="@drawable/image"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.496"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.06"
        tools:ignore="ContentDescription" />

    <Button
        android:id="@+id/mainActivity_button_gray"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="23dp"
        android:text="@string/gray"
        app:layout_constraintBottom_toBottomOf="@+id/mainActivity_button_bright"
        app:layout_constraintEnd_toStartOf="@+id/mainActivity_button_bright"
        app:layout_constraintHorizontal_bias="0.49"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/mainActivity_button_bright" />

    <Button
        android:id="@+id/mainActivity_button_bright"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="20dp"
        android:text="@string/bright"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.503"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/mainActivity_imageView_testBitmap" />

    <Button
        android:id="@+id/mainActivity_button_dark"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/dark"
        app:layout_constraintBottom_toBottomOf="@+id/mainActivity_button_bright"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.513"
        app:layout_constraintStart_toEndOf="@+id/mainActivity_button_bright"
        app:layout_constraintTop_toTopOf="@+id/mainActivity_button_bright" />

    <Button
        android:id="@+id/mainActivity_button_gama"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/gama"
        app:layout_constraintBottom_toBottomOf="@+id/mainActivity_button_green"
        app:layout_constraintEnd_toEndOf="@+id/mainActivity_button_gray"
        app:layout_constraintStart_toStartOf="@+id/mainActivity_button_gray"
        app:layout_constraintTop_toTopOf="@+id/mainActivity_button_green" />

    <Button
        android:id="@+id/mainActivity_button_green"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:text="@string/green"
        app:layout_constraintEnd_toEndOf="@+id/mainActivity_button_bright"
        app:layout_constraintHorizontal_bias="1.0"
        app:layout_constraintStart_toStartOf="@+id/mainActivity_button_bright"
        app:layout_constraintTop_toBottomOf="@+id/mainActivity_button_bright" />

    <Button
        android:id="@+id/mainActivity_button_blue"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="@string/blue"
        app:layout_constraintBottom_toBottomOf="@+id/mainActivity_button_green"
        app:layout_constraintEnd_toEndOf="@+id/mainActivity_button_dark"
        app:layout_constraintStart_toStartOf="@+id/mainActivity_button_dark"
        app:layout_constraintTop_toTopOf="@+id/mainActivity_button_green" />

    <Button
        android:id="@+id/mainActivity_button_drawText"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:text="@string/draw_text"
        android:textAllCaps="false"
        app:layout_constraintEnd_toEndOf="@+id/mainActivity_button_green"
        app:layout_constraintHorizontal_bias="0.611"
        app:layout_constraintStart_toStartOf="@+id/mainActivity_button_green"
        app:layout_constraintTop_toBottomOf="@+id/mainActivity_button_green" />

    <Button
        android:id="@+id/mainActivity_button_drawLine"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="3dp"
        android:text="@string/draw_line"
        android:textAllCaps="false"
        app:layout_constraintBottom_toBottomOf="@+id/mainActivity_button_drawText"
        app:layout_constraintEnd_toEndOf="@+id/mainActivity_button_gama"
        app:layout_constraintStart_toStartOf="@+id/mainActivity_button_gama"
        app:layout_constraintTop_toTopOf="@+id/mainActivity_button_drawText" />

    <Button
        android:id="@+id/mainActivity_button_drawCircle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="draw Circle"
        android:textAllCaps="false"
        app:layout_constraintBottom_toBottomOf="@+id/mainActivity_button_drawText"
        app:layout_constraintEnd_toEndOf="@+id/mainActivity_button_blue"
        app:layout_constraintStart_toStartOf="@+id/mainActivity_button_blue"
        app:layout_constraintTop_toTopOf="@+id/mainActivity_button_drawText" />

    <Button
        android:id="@+id/mainActivity_button_drawRectangle"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="12dp"
        android:layout_marginTop="12dp"
        android:text="draw Rectangle"
        android:textAllCaps="false"
        app:layout_constraintEnd_toEndOf="@+id/mainActivity_button_drawText"
        app:layout_constraintHorizontal_bias="0.433"
        app:layout_constraintStart_toStartOf="@+id/mainActivity_button_drawText"
        app:layout_constraintTop_toBottomOf="@+id/mainActivity_button_drawText" />

    <Button
        android:id="@+id/mainActivity_button_drawShadow"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="draw Shadow"
        android:textAllCaps="false"
        app:layout_constraintBottom_toBottomOf="@+id/mainActivity_button_drawRectangle"
        app:layout_constraintEnd_toEndOf="@+id/mainActivity_button_drawLine"
        app:layout_constraintStart_toStartOf="@+id/mainActivity_button_drawLine"
        app:layout_constraintTop_toTopOf="@+id/mainActivity_button_drawRectangle" />

    <Button
        android:id="@+id/mainActivity_button_addPadding"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="padding"
        android:textAllCaps="false"
        app:layout_constraintBottom_toBottomOf="@+id/mainActivity_button_drawRectangle"
        app:layout_constraintEnd_toEndOf="@+id/mainActivity_button_drawCircle"
        app:layout_constraintHorizontal_bias="1.0"
        app:layout_constraintStart_toStartOf="@+id/mainActivity_button_drawCircle"
        app:layout_constraintTop_toTopOf="@+id/mainActivity_button_drawRectangle"
        app:layout_constraintVertical_bias="0.0" />

    <Button
        android:id="@+id/mainActivity_button_borderedCircularBitmap"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="12dp"
        android:text="borderedCircularBitmap"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="@+id/mainActivity_button_bright"
        app:layout_constraintHorizontal_bias="0.509"
        app:layout_constraintStart_toStartOf="@+id/mainActivity_button_bright"
        app:layout_constraintTop_toBottomOf="@+id/mainActivity_button_drawRectangle"
        app:layout_constraintVertical_bias="0.37" />
</androidx.constraintlayout.widget.ConstraintLayout>
```

### Step 2: Write Code

Here are several operations that can be performed on bitmap:

**How to draw a line on a bitmap**

An extension function to draw line on bitmap:

```kotlin
    private fun Bitmap.drawLine(x: Float = 0f, y: Float = 555f): Bitmap? {
        val bitmap = copy(config, true)
        val canvas = Canvas(bitmap)

        Paint().apply {
            color = Color.RED
            strokeWidth = 10f

            // draw line on canvas
            canvas.drawLine(
                x, // The x-coordinate of the start point of the line
                x, // The y-coordinate of the start point of the line
                y, // stopX
                y, // stopY
                this // paint
            )
        }

        return bitmap
    }
```

**How to Draw circle Line on Bitmap**

An extension function to draw circle on bitmap:

```kotlin
    private fun Bitmap.drawCircle(
        radius: Float = 100f,
        color: Int = Color.YELLOW
    ): Bitmap? {
        val bitmap = copy(config, true)
        val canvas = Canvas(bitmap)

        Paint().apply {
            this.color = color

            // draw circle on left bottom of bitmap
            canvas.drawCircle(
                width / 2f, // The x-coordinate of the start point of the line
                height / 2f, // The y-coordinate of the start point of the line
                (width + height) / 4f, // stopX
                this // paint
            )
        }

        return bitmap
    }
```

**How to draw a rectange on a bitmap** An extension function to draw rectangle on bitmap:

```kotlin

    private fun Bitmap.drawRectangle(): Bitmap? {
        val bitmap = copy(config, true)
        val canvas = Canvas(bitmap)

        Paint().apply {
            color = Color.RED
            isAntiAlias = true

            // draw rectangle on canvas
            canvas.drawRect(
                20f, // left side of the rectangle to be drawn
                20f, // top side
                width / 3 - 20f, // right side
                height - 20f, // bottom side
                this
            )
        }

        return bitmap
    }
```

**How to draw a shadow on a bitmap**

An extension function to draw shadow on bitmap:

```kotlin
    private fun Bitmap.drawShadow(): Bitmap? {
        val bitmap = Bitmap.createBitmap(
            width + 10,
            height + 10,
            Bitmap.Config.ARGB_8888
        )
        val canvas = Canvas(bitmap)

        val paint = Paint().apply {
            isAntiAlias = true

            // draw shadow right and bottom side of bitmap
            /*
                This draws a shadow layer below the main layer,
                with the specified offset and color, and blur radius.
            */
            setShadowLayer(
                10f, // radius
                6f, // dx
                6f, // dy
                Color.BLACK // color
            )
        }

        canvas.drawBitmap(this, 0f, 0f, paint)
        return bitmap
    }
```

**How to draw text on a bitmap**

An extension function to draw text on bitmap:

```kotlin

    private fun Bitmap.drawText(
        text: String = "Red Lily",
        textSize: Float = 60f,
        color: Int = Color.RED
    ): Bitmap? {
        val bitmap = copy(config, true)
        val canvas = Canvas(bitmap)

        Paint().apply {
            flags = Paint.ANTI_ALIAS_FLAG
            this.color = color
            this.textSize = textSize
            typeface = Typeface.SERIF
            setShadowLayer(1f, 0f, 1f, Color.WHITE)
            canvas.drawText(text, width  / 4f , height - 20f, this)
        }

        return bitmap
    }
```

Check more below on the full code:

**MainActivity.kt**

```java
class MainActivity : AppCompatActivity() {

    lateinit var bmp: Bitmap
    lateinit var operation: Bitmap

    lateinit var mCanvas: Canvas

    @SuppressLint("UseCompatLoadingForDrawables")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        bmp = mainActivity_imageView_testBitmap.drawable.toBitmap()

        operation = Bitmap.createBitmap(bmp.width, bmp.height, bmp.config)

        setOnClick()

    }

    private fun setOnClick() {

        mainActivity_button_drawText.setOnClickListener {

            mainActivity_imageView_testBitmap.setImageBitmap(bmp.drawText())

        }
        mainActivity_button_drawLine.setOnClickListener {
            mainActivity_imageView_testBitmap.setImageBitmap(bmp.drawLine())
        }
        mainActivity_button_drawCircle.setOnClickListener {
            mainActivity_imageView_testBitmap.setImageBitmap(bmp.drawCircle())
        }
        mainActivity_button_drawRectangle.setOnClickListener {
            mainActivity_imageView_testBitmap.setImageBitmap(bmp.drawRectangle())
        }
        mainActivity_button_drawShadow.setOnClickListener {
            mainActivity_imageView_testBitmap.setImageBitmap(bmp.drawShadow())
        }
        mainActivity_button_addPadding.setOnClickListener {
            mainActivity_imageView_testBitmap.setImageBitmap(bmp.addPadding())
        }
        mainActivity_button_borderedCircularBitmap.setOnClickListener {

            mainActivity_imageView_testBitmap.setImageBitmap(bmp.borderedCircularBitmap())
        }
        mainActivity_button_blue.setOnClickListener { gray() }
        mainActivity_button_bright.setOnClickListener { bright() }
        mainActivity_button_dark.setOnClickListener { dark() }
        mainActivity_button_gama.setOnClickListener { gama() }
        mainActivity_button_green.setOnClickListener { green() }
        mainActivity_button_blue.setOnClickListener { blue() }
    }

    // utility bitmap

    // extension function to draw line on bitmap
    private fun Bitmap.drawLine(x: Float = 0f, y: Float = 555f): Bitmap? {
        val bitmap = copy(config, true)
        val canvas = Canvas(bitmap)

        Paint().apply {
            color = Color.RED
            strokeWidth = 10f

            // draw line on canvas
            canvas.drawLine(
                x, // The x-coordinate of the start point of the line
                x, // The y-coordinate of the start point of the line
                y, // stopX
                y, // stopY
                this // paint
            )
        }

        return bitmap
    }

    // extension function to draw circle on bitmap
    private fun Bitmap.drawCircle(
        radius: Float = 100f,
        color: Int = Color.YELLOW
    ): Bitmap? {
        val bitmap = copy(config, true)
        val canvas = Canvas(bitmap)

        Paint().apply {
            this.color = color

            // draw circle on left bottom of bitmap
            canvas.drawCircle(
                width / 2f, // The x-coordinate of the start point of the line
                height / 2f, // The y-coordinate of the start point of the line
                (width + height) / 4f, // stopX
                this // paint
            )
        }

        return bitmap
    }

    // extension function to draw rectangle on bitmap
    private fun Bitmap.drawRectangle(): Bitmap? {
        val bitmap = copy(config, true)
        val canvas = Canvas(bitmap)

        Paint().apply {
            color = Color.RED
            isAntiAlias = true

            // draw rectangle on canvas
            canvas.drawRect(
                20f, // left side of the rectangle to be drawn
                20f, // top side
                width / 3 - 20f, // right side
                height - 20f, // bottom side
                this
            )
        }

        return bitmap
    }

    // extension function to draw shadow on bitmap
    private fun Bitmap.drawShadow(): Bitmap? {
        val bitmap = Bitmap.createBitmap(
            width + 10,
            height + 10,
            Bitmap.Config.ARGB_8888
        )
        val canvas = Canvas(bitmap)

        val paint = Paint().apply {
            isAntiAlias = true

            // draw shadow right and bottom side of bitmap
            /*
                This draws a shadow layer below the main layer,
                with the specified offset and color, and blur radius.
            */
            setShadowLayer(
                10f, // radius
                6f, // dx
                6f, // dy
                Color.BLACK // color
            )
        }

        canvas.drawBitmap(this, 0f, 0f, paint)
        return bitmap
    }

    // extension function to draw text on bitmap
    private fun Bitmap.drawText(
        text: String = "Red Lily",
        textSize: Float = 60f,
        color: Int = Color.RED
    ): Bitmap? {
        val bitmap = copy(config, true)
        val canvas = Canvas(bitmap)

        Paint().apply {
            flags = Paint.ANTI_ALIAS_FLAG
            this.color = color
            this.textSize = textSize
            typeface = Typeface.SERIF
            setShadowLayer(1f, 0f, 1f, Color.WHITE)
            canvas.drawText(text, width  / 4f , height - 20f, this)
        }

        return bitmap
    }

    // extension function to add padding to bitmap
    private fun Bitmap.addPadding(
        color: Int = Color.GRAY,
        left: Int = 0,
        top: Int = 0,
        right: Int = 0,
        bottom: Int = 0
    ): Bitmap? {
        val bitmap = Bitmap.createBitmap(
            width + left + right, // width in pixels
            height + top + bottom, // height in pixels
            Bitmap.Config.ARGB_8888
        )

        val canvas = Canvas(bitmap)

        // draw solid color on full canvas area
        canvas.drawColor(color)

        // clear color from bitmap drawing area
        // this is very important for transparent bitmap borders
        // this will keep bitmap transparency
        Paint().apply {
            xfermode = PorterDuffXfermode(PorterDuff.Mode.CLEAR)
            canvas.drawRect(
                Rect(left, top, bitmap.width - right, bitmap.height - bottom),
                this
            )
        }

        // finally, draw bitmap on canvas
        Paint().apply {
            canvas.drawBitmap(
                this@addPadding, // bitmap
                0f + left, // left
                0f + top, // top
                this // paint
            )
        }

        return bitmap
    }

    // extension function to add border to bitmap
    private fun Bitmap.addBorder(
        color: Int = Color.DKGRAY,
        borderWidth: Int = 10
    ): Bitmap? {
        val bitmap = Bitmap.createBitmap(
            width + borderWidth * 2, // width in pixels
            height + borderWidth * 2, // height in pixels
            Bitmap.Config.ARGB_8888
        )

        val canvas = Canvas(bitmap)

        // draw solid color on full canvas area
        canvas.drawColor(color)

        // clear color from bitmap drawing area
        // this is very important for transparent bitmap border
        // this will keep bitmap transparency
        Paint().apply {
            xfermode = PorterDuffXfermode(PorterDuff.Mode.CLEAR)
            canvas.drawRect(
                Rect(
                    borderWidth, // left
                    borderWidth, // top
                    bitmap.width - borderWidth, // right
                    bitmap.height - borderWidth // bottom
                ),
                this
            )
        }

        // finally, draw bitmap on canvas
        Paint().apply {
            canvas.drawBitmap(
                this@addBorder, // bitmap
                0f + borderWidth, // left
                0f + borderWidth, // top
                this // paint
            )
        }

        return bitmap
    }

    // extension function to get bitmap from assets
    private fun Context.assetsToBitmap(fileName: String): Bitmap? {
        return try {
            val stream = assets.open(fileName)
            BitmapFactory.decodeStream(stream)
        } catch (e: IOException) {
            e.printStackTrace()
            null
        }
    }

    // extension function to crop circular area from bitmap
    private fun Bitmap.cropCircularArea(): Bitmap? {
        val bitmap = Bitmap.createBitmap(
            width, // width in pixels
            height, // height in pixels
            Bitmap.Config.ARGB_8888
        )

        val canvas = Canvas(bitmap)

        // create a circular path
        val path = Path()
        val radius = min(width / 2f, height / 2f)
        path.apply {
            addCircle(
                width / 2f,
                height / 2f,
                radius,
                Path.Direction.CCW
            )
        }

        // draw circular bitmap on canvas
        canvas.clipPath(path)
        canvas.drawBitmap(this, 0f, 0f, null)

        val diameter = (radius * 2).toInt()
        val x = (width - diameter) / 2
        val y = (height - diameter) / 2

        // return cropped circular bitmap
        return Bitmap.createBitmap(
            bitmap, // source bitmap
            x, // x coordinate of the first pixel in source
            y, // y coordinate of the first pixel in source
            diameter, // width
            diameter // height
        )
    }

    // extension function to create circular bitmap with border
    private fun Bitmap.borderedCircularBitmap(
        borderColor: Int = Color.LTGRAY,
        borderWidth: Int = 10
    ): Bitmap? {
        val bitmap = Bitmap.createBitmap(
            width, // width in pixels
            height, // height in pixels
            Bitmap.Config.ARGB_8888
        )

        // canvas to draw circular bitmap
        val canvas = Canvas(bitmap)

        // get the maximum radius
        val radius = min(width / 2f, height / 2f)

        // create a path to draw circular bitmap border
        val borderPath = Path().apply {
            addCircle(
                width / 2f,
                height / 2f,
                radius,
                Path.Direction.CCW
            )
        }

        // draw border on circular bitmap
        canvas.clipPath(borderPath)
        canvas.drawColor(borderColor)

        // create a path for circular bitmap
        val bitmapPath = Path().apply {
            addCircle(
                width / 2f,
                height / 2f,
                radius - borderWidth,
                Path.Direction.CCW
            )
        }

        canvas.clipPath(bitmapPath)
        val paint = Paint().apply {
            xfermode = PorterDuffXfermode(PorterDuff.Mode.CLEAR)
            isAntiAlias = true
        }

        // clear the circular bitmap drawing area
        // it will keep bitmap transparency
        canvas.drawBitmap(this, 0f, 0f, paint)

        // now draw the circular bitmap
        canvas.drawBitmap(this, 0f, 0f, null)

        val diameter = (radius * 2).toInt()
        val x = (width - diameter) / 2
        val y = (height - diameter) / 2

        // return cropped circular bitmap with border
        return Bitmap.createBitmap(
            bitmap, // source bitmap
            x, // x coordinate of the first pixel in source
            y, // y coordinate of the first pixel in source
            diameter, // width
            diameter // height
        )
    }

    // extension function to create rounded corners bitmap
    private fun Bitmap.toRoundedCorners(
        cornerRadius: Float = 25F
    ): Bitmap? {
        val bitmap = Bitmap.createBitmap(
            width, // width in pixels
            height, // height in pixels
            Bitmap.Config.ARGB_8888
        )
        val canvas = Canvas(bitmap)

        // path to draw rounded corners bitmap
        val path = Path().apply {
            addRoundRect(
                RectF(0f, 0f, width.toFloat(), height.toFloat()),
                cornerRadius,
                cornerRadius,
                Path.Direction.CCW
            )
        }
        canvas.clipPath(path)

        // draw the rounded corners bitmap on canvas
        canvas.drawBitmap(this, 0f, 0f, null)
        return bitmap
    }

    // extension function to crop bitmap to square
    private fun Bitmap.toSquare(): Bitmap? {
        // get the small side of bitmap
        val side = min(width, height)

        // calculate the x and y offset
        val xOffset = (width - side) / 2
        val yOffset = (height - side) / 2

        // create a square bitmap
        // a square is closed, two dimensional shape with 4 equal sides
        return Bitmap.createBitmap(
            this, // source bitmap
            xOffset, // x coordinate of the first pixel in source
            yOffset, // y coordinate of the first pixel in source
            side, // width
            side // height
        )
    }

    // extension function to crop bitmap rectangle area
    private fun Bitmap.cropRectangle(
        xOffset: Int = 0,
        yOffset: Int = 0,
        newWidth: Int = this.width,
        newHeight: Int = this.height
    ): Bitmap? {
        return try {
            Bitmap.createBitmap(
                this, // source bitmap
                xOffset, // x coordinate of the first pixel in source
                yOffset, // y coordinate of the first pixel in source
                newWidth, // width in pixels
                newHeight // height in pixels
            )
        } catch (e: IllegalArgumentException) {
            null
        }
    }

    // extension function to crop bitmap center
// it return square bitmap when no parameters pass
    private fun Bitmap.cropCenter(
        newWidth: Int = min(width, height),
        newHeight: Int = min(width, height)
    ): Bitmap? {
        // calculate x and y offset
        val xOffset = (width - newWidth) / 2
        val yOffset = (height - newHeight) / 2

        return try {
            Bitmap.createBitmap(
                this, // source bitmap
                xOffset, // x coordinate of the first pixel in source
                yOffset, // y coordinate of the first pixel in source
                newWidth, // new width
                newHeight // new height
            )

        } catch (e: IllegalArgumentException) {
            null
        }
    }

    // extension function to remove bitmap transparency
    private fun Bitmap.removeTransparency(backgroundColor: Int = Color.WHITE): Bitmap? {
        val bitmap = copy(config, true)
        var alpha: Int
        var red: Int
        var green: Int
        var blue: Int
        var pixel: Int

        // scan through all pixels
        for (x in 0 until width) {
            for (y in 0 until height) {
                pixel = getPixel(x, y)
                alpha = Color.alpha(pixel)
                red = Color.red(pixel)
                green = Color.green(pixel)
                blue = Color.blue(pixel)

                if (alpha == 0) {
                    // if pixel is full transparent then
                    // replace it by solid background color
                    bitmap.setPixel(x, y, backgroundColor)
                } else {
                    // if pixel is partially transparent then
                    // set pixel full opaque
                    val color = Color.argb(
                        255,
                        red,
                        green,
                        blue
                    )
                    bitmap.setPixel(x, y, color)
                }
            }
        }

        return bitmap
    }

    // extension function to mask bitmap
    private fun Bitmap.mask(mask: Bitmap): Bitmap? {
        val bitmap = Bitmap.createBitmap(
            mask.width, mask.height, Bitmap.Config.ARGB_8888
        )

        // paint to mask
        val paint = Paint().apply {
            isAntiAlias = true
            xfermode = PorterDuffXfermode(PorterDuff.Mode.DST_IN)
        }

        Canvas(bitmap).apply {
            // draw source bitmap on canvas
            drawBitmap(this@mask, 0f, 0f, null)
            // mask bitmap
            drawBitmap(mask, 0f, 0f, paint)
        }

        return bitmap
    }

    // filter bitmap

    private fun gray() {

        operation = Bitmap.createBitmap(bmp.width, bmp.height, bmp.config)
        val red = 0.33
        val green = 0.59
        val blue = 0.11

        for (i in 0 until bmp.width) {
            for (j in 0 until bmp.height) {
                val p = bmp.getPixel(i, j)
                var r: Int = Color.red(p)
                var g: Int = Color.green(p)
                var b: Int = Color.blue(p)
                r *= red.toInt()
                g *= green.toInt()
                b *= blue.toInt()
                operation.setPixel(i, j, Color.argb(Color.alpha(p), r, g, b))
            }
        }
        mainActivity_imageView_testBitmap.setImageBitmap(operation)

    }

    private fun bright() {
        operation = Bitmap.createBitmap(bmp.width, bmp.height, bmp.config)
        for (i in 0 until bmp.width) {
            for (j in 0 until bmp.height) {
                val p = bmp.getPixel(i, j)
                var r = Color.red(p)
                var g = Color.green(p)
                var b = Color.blue(p)
                var alpha = Color.alpha(p)
                r += 100
                g += 100
                b += 100
                alpha += 100
                operation.setPixel(i, j, Color.argb(alpha, r, g, b))
            }
        }
        mainActivity_imageView_testBitmap.setImageBitmap(operation)
    }

    private fun dark() {
        operation = Bitmap.createBitmap(bmp.width, bmp.height, bmp.config)
        for (i in 0 until bmp.width) {
            for (j in 0 until bmp.height) {
                val p = bmp.getPixel(i, j)
                var r = Color.red(p)
                var g = Color.green(p)
                var b = Color.blue(p)
                var alpha = Color.alpha(p)
                r -= 50
                g -= 50
                b -= 50
                alpha -= 50
                operation.setPixel(i, j, Color.argb(Color.alpha(p), r, g, b))
            }
        }
        mainActivity_imageView_testBitmap.setImageBitmap(operation)
    }

    private fun gama() {
        operation = Bitmap.createBitmap(bmp.width, bmp.height, bmp.config)
        for (i in 0 until bmp.width) {
            for (j in 0 until bmp.height) {
                val p = bmp.getPixel(i, j)
                var r = Color.red(p)
                var g = Color.green(p)
                var b = Color.blue(p)
                var alpha = Color.alpha(p)
                r += 150
                g = 0
                b = 0
                alpha = 0
                operation.setPixel(i, j, Color.argb(Color.alpha(p), r, g, b))
            }
        }
        mainActivity_imageView_testBitmap.setImageBitmap(operation)
    }

    private fun green() {
        operation = Bitmap.createBitmap(bmp.width, bmp.height, bmp.config)
        for (i in 0 until bmp.width) {
            for (j in 0 until bmp.height) {
                val p = bmp.getPixel(i, j)
                var r = Color.red(p)
                var g = Color.green(p)
                var b = Color.blue(p)
                var alpha = Color.alpha(p)
                r = 0
                g += 150
                b = 0
                alpha = 0
                operation.setPixel(i, j, Color.argb(Color.alpha(p), r, g, b))
            }
        }
        mainActivity_imageView_testBitmap.setImageBitmap(operation)
    }

    private fun blue() {
        operation = Bitmap.createBitmap(bmp.width, bmp.height, bmp.config)
        for (i in 0 until bmp.width) {
            for (j in 0 until bmp.height) {
                val p = bmp.getPixel(i, j)
                var r = Color.red(p)
                var g = Color.green(p)
                var b = Color.blue(p)
                var alpha = Color.alpha(p)
                r = 0
                g = 0
                b = b + 150
                alpha = 0
                operation.setPixel(i, j, Color.argb(Color.alpha(p), r, g, b))
            }
        }
        mainActivity_imageView_testBitmap.setImageBitmap(operation)
    }

}
```

### Run

Finally run the project.

### Reference

Find the download link below:

| Number | Link |
| --- | --- |
| 1. | [Download code](https://github.com/alirezabashi98/bitmap/archive/refs/heads/master.zip) |
| 2. | [Follow code author](https://github.com/alirezabashi98/) |

## More Quick Examples

_Android Bitmap Tutorial and Examples._

Here are some quick examples:

```java
import android.graphics.Bitmap;
import android.graphics.Matrix;
import android.util.Base64;
import android.util.Log;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

public class ImageUtils {

    private static final String TAG = "ImageUtils";

    public static byte[] bitmap2Bytes(Bitmap bitmap, int quality, Bitmap.CompressFormat format){
        if (bitmap == null){
            return null;
        }else {
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            bitmap.compress(format,quality,outputStream);
            try {
                outputStream.flush();
                outputStream.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
            return outputStream.toByteArray();
        }
    }

    public static String bitmap2Base64(Bitmap bitmap, int quality, Bitmap.CompressFormat format){
        byte[] bytes = bitmap2Bytes(bitmap,quality,format);
        return Base64.encodeToString(bytes,Base64.DEFAULT)
                .replace("n","")
                .replace("r","")
                .replace("t","");
    }

    public static Bitmap scaleBitmap(Bitmap srcBitmap, int maxWidth, int maxHeight){

        int width = srcBitmap.getWidth();
        int height = srcBitmap.getHeight();

        Log.d(TAG, "scaleBitmap: nwidth = " + width + "nheight = " + height);

        int desiredWidth = Math.min(width,maxWidth);
        int desiredHeight = Math.min(height,maxHeight);

        float scaleWidth = ((float) desiredWidth / width);
        float scaleHeight = ((float) desiredHeight / height);

        float scaled = Math.min(scaleHeight,scaleWidth);

        Matrix matrix = new Matrix();
        matrix.postScale(scaled,scaled);
        return Bitmap.createBitmap(srcBitmap,0,0,width,height,matrix,true);
    }

    public static Bitmap convert2Gray(Bitmap bitmap) {
        int width = bitmap.getWidth();
        int height = bitmap.getHeight();

        int[] pixs = new int[width * height];

        bitmap.getPixels(pixs, 0, width, 0, 0, width, height);

        int alpha = 0xFF << 24;

        for (int i = 0; i < height; i++) {
            for (int j = 0; j < width; j++) {
                int color = pixs[width * i + j];

                int red = (color & 0x00FF0000) >> 16;

                int green = (color & 0x0000FF00) >> 8;

                int blue = (color & 0x000000FF);

                color = (red + green + blue) / 3;

                color = alpha | (color << 16) | (color << 8)| color;

                pixs[width * i + j] = color;

            }
        }

        Bitmap result = Bitmap.createBitmap(width,height, Bitmap.Config.RGB_565);
        result.setPixels(pixs,0,width,0,0,width,height);
        return result;
    }

}
```

#### 1\. Download Bitmap From the Web

Let's see how we can download bitmap from the internet via HttpURLConnection class.

```java
private Bitmap downloadUrl(String myurl) throws IOException {

        try {
            URL url = new URL(myurl);
            HttpURLConnection connection = (HttpURLConnection) url
                    .openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            Bitmap myBitmap = BitmapFactory.decodeStream(input);
            return myBitmap;

        } catch (IOException e) {
            return null;
        }
}
```

Here's the full example with AsyncTask:

```java
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.os.AsyncTask;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;

public class HttpImageGetTask extends AsyncTask<String, Void, Bitmap> {
    private OnImageDownloadCompleted listener;

    public HttpImageGetTask(OnImageDownloadCompleted listener) {
        this.listener = listener;
    }

    @Override
    protected Bitmap doInBackground(String... urls) {
        try {
            return downloadUrl(urls[0]);
        } catch (IOException e) {
            return null;
        }
    }

    @Override
    protected void onPostExecute(Bitmap result) {
        listener.onBitmapCompleted(result);
    }

    private Bitmap downloadUrl(String myurl) throws IOException {

        try {
            URL url = new URL(myurl);
            HttpURLConnection connection = (HttpURLConnection) url
                    .openConnection();
            connection.setDoInput(true);
            connection.connect();
            InputStream input = connection.getInputStream();
            Bitmap myBitmap = BitmapFactory.decodeStream(input);
            return myBitmap;

        } catch (IOException e) {
            return null;
        }

    }

}
```

##### 2\. How to Get MD5 of a String

This is a helper method we will use in some of the following examples.

```java

    public static String getMD5(String content) {

        try {

            MessageDigest digest = MessageDigest.getInstance("MD5");

            digest.update(content.getBytes());

            return getHashString(digest);

        } catch (Exception e) {

        }

        return null;

    }
```

##### 3\. How to Load Bitmap into ImageView From File System

You cam also load a Bitmap from the file system. You need however to pass the image path instead of url.

```java
    public static Bitmap getBitmap2(String imagePath) {

        if (!(imagePath.length() > 5)) {

            return null;

        }

        File cache_file = new File(new File(
                Environment.getExternalStorageDirectory(), "xxxx"),
                "cachebitmap");

        cache_file = new File(cache_file, getMD5(imagePath));

        if (cache_file.exists()) {

            return BitmapFactory.decodeFile(getBitmapCache(imagePath));

        } else {

            try {

                URL url = new URL(imagePath);

                HttpURLConnection conn = (HttpURLConnection) url
                        .openConnection();

                conn.setConnectTimeout(5000);

                if (conn.getResponseCode() == 200) {

                    InputStream inStream = conn.getInputStream();

                    File file = new File(new File(
                            Environment.getExternalStorageDirectory(), "xxxx"),
                            "cachebitmap");

                    if (!file.exists()) {
                        file.mkdirs();
                    }

                    file = new File(file, getMD5(imagePath));

                    FileOutputStream out = new FileOutputStream(file);

                    byte buff[] = new byte[1024];

                    int len = 0;

                    while ((len = inStream.read(buff)) != -1) {

                        out.write(buff, 0, len);

                    }

                    out.close();

                    inStream.close();

                    return BitmapFactory.decodeFile(getBitmapCache(imagePath));

                }

            } catch (Exception e) {
            }

        }

        return null;

    }
```

##### 4\. How to Get Bitmap Cache

```java
public static String getBitmapCache(String url) {

        File file = new File(new File(
                Environment.getExternalStorageDirectory(), "xxxx"),
                "cachebitmap");

        file = new File(file, getMD5(url));

        if (file.exists()) {

            return file.getAbsolutePath();

        }

        return null;

    }
```

##### 5\. How to Load Bitmap into ImageView via Glide

```java
    public static void displayImageBitmap(String url,ImageView imageView) {

        Glide.with(MainApp.getContext())
                .load(url)
                .asBitmap()
                .thumbnail(0.2f)
                .placeholder(R.drawable.pictures_no)
                .diskCacheStrategy(DiskCacheStrategy.SOURCE)
                .into(imageView);

    }
```

##### 6\. How to Get a Hash string of a MessageDigest

```java
    private static String getHashString(MessageDigest digest) {
        StringBuilder builder = new StringBuilder();
        for (byte b : digest.digest()) {
            builder.append(Integer.toHexString((b >> 4) & 0xf));
            builder.append(Integer.toHexString(b & 0xf));
        }
        return builder.toString().toLowerCase();
    }
```

##### 7\. How to Save a Bitmap to Local File

You pass the File object onto which we wish to save our Bitmap. The Bitmap also is passed as a parameter to our method.

```java
    public static String saveBitmapToLocal(File file , Bitmap bitmap) {
        try {
            if(!file.exists()) {
                file.createNewFile();
            }
            BufferedOutputStream bufferedOutputStream = new BufferedOutputStream(new FileOutputStream(file));
            bitmap.compress(Bitmap.CompressFormat.PNG, 100, bufferedOutputStream);
            bufferedOutputStream.close();
            LogUtil.d(TAG, "photo image from data, path:" + file.getAbsolutePath());
            return file.getAbsolutePath();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }
```

##### 8\. How to Extract Thumbnail From Image

Then we return a Bitmap. The path to the image is provided to us alongside the dimensions of the thumbanial as well as whether to crop the image.

```java
@TargetApi(Build.VERSION_CODES.HONEYCOMB)
    public static Bitmap extractThumbNail(final String path, final int width, final int height,  final boolean crop) {
        Assert.assertTrue(path != null && !path.equals("") && height > 0 && width > 0);

        BitmapFactory.Options options = new BitmapFactory.Options();

        try {
            options.inJustDecodeBounds = true;
            Bitmap tmp = BitmapFactory.decodeFile(path);
            if (tmp != null) {
                tmp.recycle();
                tmp = null;
            }

            LogUtil.d(TAG, "extractThumbNail: round=" + width + "x" + height + ", crop=" + crop);
            final double beY = options.outHeight * 1.0 / height;
            final double beX = options.outWidth * 1.0 / width;
            LogUtil.d(TAG, "extractThumbNail: extract beX = " + beX + ", beY = " + beY);
            options.inSampleSize = (int) (crop ? (beY > beX ? beX : beY) : (beY < beX ? beX : beY));
            if (options.inSampleSize <= 1) {
                options.inSampleSize = 1;
            }

            // NOTE: out of memory error
            while (options.outHeight * options.outWidth / options.inSampleSize > MAX_DECODE_PICTURE_SIZE) {
                options.inSampleSize++;
            }

            int newHeight = height;
            int newWidth = width;
            if (crop) {
                if (beY > beX) {
                    newHeight = (int) (newWidth * 1.0 * options.outHeight / options.outWidth);
                } else {
                    newWidth = (int) (newHeight * 1.0 * options.outWidth / options.outHeight);
                }
            } else {
                if (beY < beX) {
                    newHeight = (int) (newWidth * 1.0 * options.outHeight / options.outWidth);
                } else {
                    newWidth = (int) (newHeight * 1.0 * options.outWidth / options.outHeight);
                }
            }

            options.inJustDecodeBounds = false;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.ICE_CREAM_SANDWICH) {
                options.inMutable = true;
            }
            LogUtil.i(TAG, "bitmap required size=" + newWidth + "x" + newHeight + ", orig=" + options.outWidth + "x" + options.outHeight + ", sample=" + options.inSampleSize);
            Bitmap bm = BitmapFactory.decodeFile(path);
            setInNativeAlloc(options);
            if (bm == null) {
                Log.e(TAG, "bitmap decode failed");
                return null;
            }

            LogUtil.i(TAG, "bitmap decoded size=" + bm.getWidth() + "x" + bm.getHeight());
            final Bitmap scale = Bitmap.createScaledBitmap(bm, newWidth, newHeight, true);
            if (scale != null) {
                bm.recycle();
                bm = scale;
            }

            if (crop) {
                final Bitmap cropped = Bitmap.createBitmap(bm, (bm.getWidth() - width) >> 1, (bm.getHeight() - height) >> 1, width, height);
                if (cropped == null) {
                    return bm;
                }

                bm.recycle();
                bm = cropped;
                LogUtil.i(TAG, "bitmap croped size=" + bm.getWidth() + "x" + bm.getHeight());
            }
            return bm;

        } catch (final OutOfMemoryError e) {
            LogUtil.e(TAG, "decode bitmap failed: " + e.getMessage());
            options = null;
        }

        return null;
    }
```

##### 9\. How to Decode a Stream into Bitmap

```java
    public static Bitmap decodeStream(InputStream stream , float dip) {
        BitmapFactory.Options options = new BitmapFactory.Options();
        if(dip != 0.0F) {
            options.inDensity = (int)(160.0F * dip);
        }
        options.inPreferredConfig = Bitmap.Config.ARGB_8888;
        setInNativeAlloc(options);
        try {
            Bitmap bitmap = BitmapFactory.decodeStream(stream, null,options);
            return bitmap;
        } catch (OutOfMemoryError e) {
            options.inPreferredConfig = Bitmap.Config.RGB_565;
            setInNativeAlloc(options);
            try {
                Bitmap bitmap = BitmapFactory.decodeStream(stream, null,options);
                return bitmap;
            } catch (OutOfMemoryError e2) {
            }
        }
        return null;
    }
```

##### 10\. How to Create a new Bitmap

```java
  public static Bitmap newBitmap(int width, int height,Bitmap.Config config) {
        try {
            Bitmap bitmap = Bitmap.createBitmap(width, height,config);
            return bitmap;
        } catch (Throwable localThrowable) {
            LogUtil.e(TAG, localThrowable.getMessage());
        }
        return null;
    }
```

##### 11\. How to Convert a Bitmap to an Array

You pass the Bitmap as a parameter and we compress it and convert it to a byte array.

```java
    public static byte[] bmpToByteArray(final Bitmap bmp, final boolean needRecycle) {
        ByteArrayOutputStream output = new ByteArrayOutputStream();
        bmp.compress(Bitmap.CompressFormat.PNG, 100, output);
        if (needRecycle) {
            bmp.recycle();
        }
        byte[] result = output.toByteArray();
        try {
            output.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
        return result;
    }
```

##### 12\. How to load a Bitmap From a File name

Here's an even simpler example of loading a bitmap from a file name and returning it.

```java
public static Bitmap loadFromFile(String filename) {
        try {
            File f = new File(filename);
            if (!f.exists()) {
                return null;
            }
            Bitmap tmp = BitmapFactory.decodeFile(filename);
            // tmp = setExifInfo(filename, tmp);
            return tmp;
        } catch (Exception e) {
            return null;
        }

    }
```

##### 13\. How to Compress an Image

We will compress the image and return it as a Bitmap. Basically you pass us a bitmap and we compress it and return it to you.

```java
public Bitmap compressImage(Bitmap image) {

        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        image.compress(Bitmap.CompressFormat.JPEG, 100, baos);
        int options = 100;
        while (baos.toByteArray().length / 1024 > 128) {
            baos.reset();
            image.compress(Bitmap.CompressFormat.JPEG,options, baos);/
            options -= 10;
        }
        ByteArrayInputStream isBm = new ByteArrayInputStream(baos.toByteArray());
        Bitmap bitmap = BitmapFactory.decodeStream(isBm, null, null);
        // bitmap.
        return bitmap;

    }
```

##### 14\. How to load a Bitmap From a Path

Just pass us the image path then we will decode that file using the `BitmapFactory`'s `decodeFile` method.

```java
public static Bitmap loadBitmap(String imgpath) {
        return BitmapFactory.decodeFile(imgpath);
    }
```

##### 15\. How to Scale a Bitmap

Pass us the Bitmap, it's width and height then we scale it.

```java
    private static Bitmap scaleBitmap(Bitmap bitmap, float ww, float hh) {
        double scaleWidth = 1;
        double scaleHeight = 1;
        int widthOri = bitmap.getWidth();
        int heightOri = bitmap.getHeight();

        if (widthOri > heightOri && widthOri > ww) {
            scaleWidth = 1.0 / (double) (widthOri / ww);
            scaleHeight = scaleWidth;
        } else if (widthOri < heightOri && heightOri > hh) {
            scaleHeight = 1.0 / (double) (heightOri / hh);
            scaleWidth = scaleHeight;
        }

        Matrix matrix = new Matrix();
        matrix.postScale((float) scaleWidth, (float) scaleHeight);

        Bitmap resizedBitmap = Bitmap.createBitmap(bitmap, 0, 0,
                bitmap.getWidth(), bitmap.getHeight(), matrix, true);
```

##### 16\. How to Capture Screenshot and Return it as a Byte

```java
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.view.View;

public class ScreenShotUtil {
    public static Bitmap capture(View view, float width, float height, boolean scroll, Bitmap.Config config) {
        if (!view.isDrawingCacheEnabled()) {
            view.setDrawingCacheEnabled(true);
        }
        if(width==0){
            width= MainApp.getInstance().getScreenWidth();
        }
        if(height==0){
            height= MainApp.getInstance().getScreenHeight();
        }

        Bitmap bitmap = Bitmap.createBitmap((int) width, (int) height, config);
        bitmap.eraseColor(Color.WHITE);
        Canvas canvas = new Canvas(bitmap);
        int left = view.getLeft();
        int top = view.getTop();
        if (scroll) {
            left = view.getScrollX();
            top = view.getScrollY();
        }
        int status = canvas.save();
        canvas.translate(-left, -top);
        float scale = width / view.getWidth();
        canvas.scale(scale, scale, left, top);
        view.draw(canvas);
        canvas.restoreToCount(status);
        Paint alphaPaint = new Paint();
        alphaPaint.setColor(Color.TRANSPARENT);
        canvas.drawRect(0f, 0f, 1f, height, alphaPaint);
        canvas.drawRect(width - 1f, 0f, width, height, alphaPaint);
        canvas.drawRect(0f, 0f, width, 1f, alphaPaint);
        canvas.drawRect(0f, height - 1f, width, height, alphaPaint);
        canvas.setBitmap(null);
        return bitmap;
    }

}
```

##### 17\. How to Convert Bitmap to Base64 String

```java
    public static String convertBitmapToString(Bitmap bitmap) {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();// outputstream
        bitmap.compress(Bitmap.CompressFormat.PNG, 100, baos);
        byte[] b = baos.toByteArray();
        return Base64.encodeToString(b, Base64.DEFAULT);

    }
```

##### 18\. How to Convert String to Bitmap

```java
    public static Bitmap convertStringToBitmap(String st) {
        // OutputStream out;
        Bitmap bitmap = null;
        try
        {
            // out = new FileOutputStream("/sdcard/aa.jpg");
            byte[] bitmapArray;
            bitmapArray = Base64.decode(st, Base64.DEFAULT);
            bitmap = BitmapFactory.decodeByteArray(bitmapArray, 0, bitmapArray.length);
            // bitmap.compress(Bitmap.CompressFormat.PNG, 100, out);
            return bitmap;
        }
        catch (Exception e)
        {
            return null;
        }
```

##### 19\. How to Create a bitmap from the supplied view.

You supply the View from which you want us to create the bitmap.

```java
    public static Bitmap createBitmapFromView(View view) {
        final Bitmap bitmap = Bitmap.createBitmap(view.getWidth(), view.getHeight(), Bitmap.Config.ARGB_8888);
        final Canvas canvas = new Canvas(bitmap);

        view.layout(view.getLeft(), view.getTop(), view.getRight(), view.getBottom());
        view.draw(canvas);

        return bitmap;
    }
```
