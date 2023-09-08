# Kotlin Android Fresco Examples

> Step by step Fresco examples.

Fresco is an Android library for managing images and the memory they use. Learn about it via several simple examples in this tutorial.


### What is Fesco?

> It is an Android library for managing images and the memory they use.

Fresco is a powerful system for displaying images in Android applications.

Fresco takes care of image loading and display, so you don't have to. It will load images from the network, local storage, or local resources, and display a placeholder until the image has arrived. It has two levels of cache; one in memory and another in internal storage.

In Android 4.x and lower, Fresco puts images in a special region of Android memory. This lets your application run faster - and suffer the dreaded `OutOfMemoryError` much less often.

Fresco also supports:

*   streaming of progressive JPEGs
*   display of animated GIFs and WebPs
*   extensive customization of image loading and display
*   and much more!

### How to Install Fresco

Declare it in your `app/build.gradle` file as an implementation statement:

```groovy
implementation 'com.facebook.fresco:fresco:2.6.0'
```

Here are Fresco examples:

[loop type=example taxonomy=post_tag term=fresco orderby=date order=asc]
<h2>[loop-count]. [field title-link] </h2>
[content]
<a href="[field url]">Read More.</a>
[/loop]
