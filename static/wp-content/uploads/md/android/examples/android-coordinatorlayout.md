# Android CoordinatorLayout Tutorial

_Android cordinatorlayout Tutorials and Examples._

According to Android SDK documentation, the _CoordinatorLayout_ is a super-powered FrameLayout.

It is a ViewGroup that resides in the `android.support.design.widget.` package.

This layout is meant to be used mainly in two cases:

1. As a top-level application decor or chrome layout.
2. As a container for a specific interaction with one or more child views.

When you create an application using android studio and choose Basic Activity as you layout, then android studio will automatically create for an aactivity_main.xml with cordinatorlayout as you top-level element.


Here's a sample usage for `CoordinatorLayout`:

```xml
<?xml version="1.0" encoding="utf-8"?>
<android.support.design.widget.CoordinatorLayout

    android_layout_width="match_parent"
    android_layout_height="match_parent"
    android_fitsSystemWindows="true"
    tools_context="com.tutorials.hp.androidmdmysqlsave.MainActivity">

    <android.support.design.widget.AppBarLayout
        ...
        >

        <android.support.v7.widget.Toolbar
            ...
             />

    </android.support.design.widget.AppBarLayout>

    <include layout="@layout/content_main" />

    <android.support.design.widget.FloatingActionButton
        ...
         />

</android.support.design.widget.CoordinatorLayout>
```

Suppose a view wants to specify a default behavior wehn used as a child of CoordinatorLayout, then it can use the `CoordinatorLayout.DefaultBehavior` annotation.

This behaviors can then be used to implement many types of interactions and additional layout modifications ranging from sliding drawers and panels to swipe-dismissable elements and buttons that stick to other elements as they move and animate.

Children of a CoordinatorLayout may have an anchor. This view id must correspond to an arbitrary descendant of the CoordinatorLayout, but it may not be the anchored child itself or a descendant of the anchored child. This can be used to place floating views relative to other arbitrary content panes.

Children can specify insetEdge to describe how the view insets the CoordinatorLayout. Any child views which are set to dodge the same inset edges by dodgeInsetEdges will be moved appropriately so that the views do not overlap.

#### CoordinatorLayout API Definition

`CoordinatorLayout` was introduced in the `API Level 24.1.0` and belongs to Maven artifact `com.android.support:coordinatorlayout:latest_version`.

As a class it derives from ViewGroup and implements the `NestedScrollingParent2` interface.

```java
public class CoordinatorLayout
extends ViewGroup implements NestedScrollingParent2
```

Here's inheritance hierarchy:

```java
java.lang.Object
   ↳    android.view.View
       ↳    android.view.ViewGroup
           ↳    android.support.design.widget.CoordinatorLayout
```

#### Behaviors

`Behavior` with regards to CoordinatorLayout is a interaction behavior plugin for child views of CoordinatorLayout.

```java
public static abstract class CoordinatorLayout.Behavior
extends Object
```

Here's it it's inheritance tree:

```java
java.lang.Object
   ↳    android.support.design.widget.CoordinatorLayout.Behavior<V extends android.view.View>
```

A Behavior implements one or more interactions that a user can take on a child view. These interactions may include drags, swipes, flings, or any other gestures.

Since the introduction of `CoordinatorLayout`, a couple of new behaviors got implemented by developers. Then Framework designers implemented some of them in the design support library.

From BottomSheetBehavior to AnchorSheetBehavior The new Coordinator Layout from the support library gave the developers a big toy to play with. Since then, many new behaviors popped up. Most of them were included in the new design support library.

Some of those behaviors include:

1. BottomSheetBehavior - a panel that slides from the bottom showing some content.
2. AnchoredBehavior
