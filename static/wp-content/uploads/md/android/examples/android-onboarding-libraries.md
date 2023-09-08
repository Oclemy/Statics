# Android AppIntro and Onboarding - Libraries and Examples

In this article we want to explore solutions for easing up your app oboarding process.Basically see how to create an app intro page using several cool libraries.


### Concepts You will Learn

This tutorial will teach you the following:

1. How to create an onboarding screen.
2. How to create an Intro slider.

## (a). Onboarding

> Android Library for easing up the onboarding process.

Here are its features:

- Written in Kotlin
- No boilerplate code
- Easy initialization
- Supports Lottie Animation View and Images with a Title and Description.

Here are the demos:

![Android App OnBoarding](https://camo.githubusercontent.com/93b89f4f9ca7ec8e61d36eb64cd1eb57b0c571233681adf7526ac7d9dcdea166/68747470733a2f2f692e706f7374696d672e63632f33774b3235704a4a2f53637265656e73686f742d323032312d30352d32362d32332d34302d32302d3837362d636f6d2d6c696d657273652d6f6e626f617264696e672e6a7067)

![Android into page](https://camo.githubusercontent.com/2609129cfe444bbf71f83684ed76f02d2199c4ef28af6e2ac12176ce5b246138/68747470733a2f2f692e706f7374696d672e63632f79787146474744322f657a6769662d636f6d2d6769662d6d616b65722d312e676966)

### Step 1: Install Onboarding

Start by specifying jitpack as a repository in your project's build.gradle:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Then specify the dependency in the app's build.gradle:

```groovy
implementation 'com.github.akshaaatt:Onboarding:1.0.1'
```

### Step 2: Write Code

**Activity**

To use Onboarder, you simply have to create a new Activity that extends OnboardAdvanced or OnboardLegacy like the following:

```kotlin
class MyCustomOnboarder : OnboardAdvanced() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Make sure you don't call setContentView!

        // Call addSlide passing your Fragments.
        // You can use OnboardFragment to use a pre-built fragment
        addSlide(OnboardFragment.newInstance(
                title = "Welcome...",
                description = "This is the first slide of the example"
        ))
        addSlide(OnboardFragment.newInstance(
                title = "...Let's get started!",
                description = "This is the last slide, I won't annoy you more :)"
        ))
    }

    override fun onSkipPressed(currentFragment: Fragment?) {
        super.onSkipPressed(currentFragment)
        // Decide what to do when the user clicks on "Skip"
        finish()
    }

    override fun onDonePressed(currentFragment: Fragment?) {
        super.onDonePressed(currentFragment)
        // Decide what to do when the user clicks on "Done"
        finish()
    }
}
```

**Fragment**

You can use the AppIntroFragment if you just want to customize title, description, image and colors. That's the suggested approach if you want to create a quick intro:

```kotlin
addSlide(OnboardFragment.newInstance(
    title = "The title of your slide",
    description = "A description that will be shown on the bottom",
    resourceId = R.drawable.the_central_icon, //or R.raw.your_json for LottieAnimationView
    backgroundDrawable = R.drawable.the_background_image,
    titleColor = Color.YELLOW,
    descriptionColor = Color.RED,
    backgroundColor = Color.BLUE,
    titleTypefaceFontRes = R.font.opensans_regular,
    descriptionTypefaceFontRes = R.font.opensans_regular,
    isLottie = true //To hide the imageView and enable the LottieAnimationView
))
```

### Example

Here's a full example, you do not need a layout:

```kotlin
package com.limerse.onboarding

import android.os.Bundle
import androidx.fragment.app.Fragment
import com.limerse.onboard.OnboardAdvanced
import com.limerse.onboard.OnboardFragment
import com.limerse.onboard.OnboardPageTransformerType
import com.limerse.onboard.model.SliderPage

class IntroActivity : OnboardAdvanced() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        addSlide(
            OnboardFragment.newInstance(
            "Welcome!",
            "Ever wondered what was missing in your life?",
            resourceId = R.raw.teen,
            titleTypefaceFontRes = R.font.lato,
            descriptionTypefaceFontRes = R.font.lato,
                backgroundDrawable = R.drawable.back_slide2,
                isLottie = true
        ))

        addSlide(OnboardFragment.newInstance(
            SliderPage(
            "Tired of Searching?",
            "Congratulations, you are at the right place!",
            resourceId = R.raw.location,
            backgroundDrawable = R.drawable.back_slide1,
            titleTypeface = "OpenSans-Light.ttf",
            descriptionTypeface = "OpenSans-Light.ttf",
                isLottie = true
        )
        ))

        addSlide(OnboardFragment.newInstance(
            "Meet, Code and Discuss",
            "Connect with the community of fierce developers!",
            resourceId = R.raw.rocket,
            backgroundDrawable = R.drawable.back_slide3,
            titleTypefaceFontRes = R.font.opensans_regular,
            descriptionTypefaceFontRes = R.font.opensans_regular,
            isLottie = true
        ))

        addSlide(OnboardFragment.newInstance(
            "Explore and Learn",
            "Contribute to the community and build your reputation!",
            resourceId = R.raw.trophy,
            backgroundDrawable = R.drawable.back_slide4,
            isLottie = true
        ))

        addSlide(OnboardFragment.newInstance(
            "Are you ready?",
            "Join us, support us and become a part of us!",
            resourceId = R.drawable.metabrainz,
        ))

        setTransformer(OnboardPageTransformerType.Parallax())
    }

    public override fun onSkipPressed(currentFragment: Fragment?) {
        super.onSkipPressed(currentFragment)
        finish()
    }

    public override fun onDonePressed(currentFragment: Fragment?) {
        super.onDonePressed(currentFragment)
        finish()
    }
}
```

[Here's](https://github.com/akshaaatt/Onboarding/tree/master/app) the reference

### Reference

Find the code reference [here](https://github.com/akshaaatt/Onboarding)

## (b). AppIntro

> Make a cool intro for your Android app.

AppIntro is an Android Library that helps you build a cool carousel intro for your App. AppIntro has support for requesting permissions and helps you create a great onboarding experience in just a couple of minutes.

Here are its features:

- **API >= 14** compatible.
- 100% Kotlin Library.
- **AndroidX** Compatible.
- Support for **runtime permissions**.
- Dependent only on AndroidX AppCompat/Annotations, ConstraintLayout and Kotlin JDK.
- Full RTL support.

### Step 1: Install AppIntro

It's also hosted in jitpack so you need to specify jitpack in your project level build.gradle:

```groovy
repositories {
    maven { url "https://jitpack.io" }
}
```

Then you add the implementation statement:

```groovy
implementation 'com.github.AppIntro:AppIntro:6.1.0'
```

### Step 2: Write Code

It's usage is quite similar to that of the Onboarding library, as that library is inspired by AppIntro:

```kotlin
class MyCustomAppIntro : AppIntro() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // Make sure you don't call setContentView!

        // Call addSlide passing your Fragments.
        // You can use AppIntroFragment to use a pre-built fragment
        addSlide(AppIntroFragment.newInstance(
                title = "Welcome...",
                description = "This is the first slide of the example"
        ))
        addSlide(AppIntroFragment.newInstance(
                title = "...Let's get started!",
                description = "This is the last slide, I won't annoy you more :)"
        ))
    }

    override fun onSkipPressed(currentFragment: Fragment?) {
        super.onSkipPressed(currentFragment)
        // Decide what to do when the user clicks on "Skip"
        finish()
    }

    override fun onDonePressed(currentFragment: Fragment?) {
        super.onDonePressed(currentFragment)
        // Decide what to do when the user clicks on "Done"
        finish()
    }
}
```

And if you are using fragment:

```kotlin
addSlide(AppIntroFragment.newInstance(
    title = "The title of your slide",
    description = "A description that will be shown on the bottom",
    imageDrawable = R.drawable.the_central_icon,
    backgroundDrawable = R.drawable.the_background_image,
    titleColor = Color.YELLOW,
    descriptionColor = Color.RED,
    backgroundColor = Color.BLUE,
    titleTypefaceFontRes = R.font.opensans_regular,
    descriptionTypefaceFontRes = R.font.opensans_regular,
))
```

### Example

Find example [here](https://github.com/AppIntro/AppIntro/tree/master/example)

### Reference

Find compltere documentation [here](https://github.com/AppIntro/AppIntro)
