# Kotlin AndroidX Browser Actions Examples

The `androidx.browser` is a jetpack libray that displays webpages in the user's default browser.


### Add as a dependency

To add a dependency on Browser, you must add the Google Maven repository to your project.

Add the dependencies for the artifacts you need in the `build.gradle` file for your app or module:

Groovy:

```groovy
dependencies {
    implementation "androidx.browser:browser:1.4.0"
}
```

Kotlin:

```kotlin
dependencies {
    implementation("androidx.browser:browser:1.4.0")
}
```

It contains the following packages:

```kotlin
androidx.browser.browseractions
androidx.browser.customtabs
androidx.browser.trusted
```

In this tutorial we will look at `androidx.browser.browseractions` examples. We will cover the rest in seperate tutorials.

Here are the step by step examples:

[loop type=example taxonomy=post_tag term=BrowserActions orderby=date order=asc]

<h2>[loop-count]. [field title] </h2>

[content]

<a href="[field url]">Read Individually.</a>
<hr>

[/loop]
