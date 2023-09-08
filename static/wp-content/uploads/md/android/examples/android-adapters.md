# Types of Android Adapters and AdapterViews Introduction


In this piece we want to look at android adapters as well as adapterviews.


## ListAdapter

_`ListAdapter` is an interface that's used to bind a `ListView` to its data._

This inteface resides inside the `android.widget` package:

```java
package android.widget;
```

It derives from `android.widget.Adapter`, an interface that contains several signatures to be implemented by it's implementers.

```java
public interface ListAdapter extends Adapter {}
```

Majority of the times that data needs to come from a `Cursor` object, however it's not mandatory. ListView can display any data as long as it's contained in a `ListAdapter`.

#### Methods in ListAdapter

This interface has only two method signatures. The rest it inherits from the `Adapter` interface.

1. `public boolean areAllItems Enabled()` : This method clearly returns a boolean. This boolean indicates whether all items in this adapter are enabled. If true then it means that all the items in the List can be selected and clicked.
2. `isEnabled(int position)`: This method takes the position of the item. It will return true if that item(at that position) is not a separator. Remember separators are list items that can neither be clicked nor selected.

#### Classes that Implement ListAdapter

ListAdapter is an interface that's implemented by 7 classes and one interface.

All these are defined inside the `android.widget` package:

| No. | Method | Definition |
| --- | --- | --- |
| 1. | BaseAdapter | A super class of common implementations for an `android.widget.Adapter` interface.It implements both `ListAdapter` and `SpinnerAdapter` interfaces. |
| 2. | ArrayAdapter | A `BaseAdapter` child which uses an array of arbitrary objects as data source. |
| 3. | CursorAdapter | An abstract `BaseAdapter` child used to expose data from `android.database.Cursor` to a ListView. |
| 4. | ResourceCursorAdapter | An abtract `CursorAdapter` child that provides an easy way to create views defined in an xml file. |
| 5. | SimpleAdapter | An easy `BaseAdapter` child used to map static data to views defined in an XML file. |
| 6. | SimpleCursorAdapter | A `ResourceCursorAdapter` child that provides an easy way to map columns from a cursor to TextViews or ImageViews defined in an XML file. |
| 7. | WrapperListAdapter | This is an interface that wraps another list adapter. |
| 8. | HeaderViewListAdapter | This is an indirect list adapter used with a ListView when the [ListView](https://camposha.info/android/listview) has header views. |

## SpinnerAdapter

_`SpinnerAdapter` is an interface that binds `android.widget.Spinner` to its data._

This interface lives inside the `android.widget` package:

```java
package android.widget;
```

Like the `ListAdapter`, this interface derives majority of its methods from the `android.widget.Adapter` interface.

```java
public interface SpinnerAdapter extends Adapter {}
```

Spinners in android show data in dropdowns. They are the equivalence of `ComboBox` in say `Swing` or `WinForms`.

However,because of the `SpinnerAdapter`, spinners are very customizable.

This is because spinner adapter allows for definition of two different views:

1. One showing the data in the spinner itself.
2. One showing the data in a dropdown list when the spinner is pressed.

#### Methods in SpinnerAdapter

We said `SpinnerAdapter` inherits all its methods from the `Adapter` apart from the `getDropDownView()`.

`public View getDropDownView(int position,View convertView,ViewGroup parent)`: This method will return a `android.view.View` object that will display data at the specified position in the dropdown popup.

- The `position` parameter is the index of the item whose view we want to return
- The `convertView` is the old view we are recycling. Normally you check if it's null first before using it. You can also create a new View as well.
- The `parent` parameter is the parent view onto which we will attach this View.

#### Classes that Implement SpinnerAdapter

SpinnerAdapter is an interface that's implemented by 6 classes and 1 interface. Some of classes are abstract but most concrete.

All these are defined inside the `android.widget` package:

1. `BaseAdapter` - A super class of common implementations for an `android.widget.Adapter` interface.It implements both `ListAdapter` and `SpinnerAdapter` interfaces.
2. `ArrayAdapter` - A `BaseAdapter` child which uses an array of arbitrary objects as data source.
3. `CursorAdapter` - An abstract `BaseAdapter` child used to expose data from `android.database.Cursor` to a ListView.
4. `ResourceCursorAdapter` - An abtract `CursorAdapter` child that provides an easy way to create views defined in an xml file.
5. `SimpleAdapter` - An easy `BaseAdapter` child used to map static data to views defined in an XML file.
6. `SimpleCursorAdapter` - A `ResourceCursorAdapter` child that provides an easy way to map columns from a cursor to TextViews or ImageViews defined in an XML file.
7. `ThemedSpinnerAdapter` - This is an interface that provides extensions over SpinnerAdapter and is capable of inflating drop-down views againts a different theme than normal views.

## BaseAdapter

_BaseAdapter as the name suggests `BaseAdapter` is a **base adapter**, or super adapter. An adapter is a class that acts as a bridge between an adapterview and the underlying data source._

By being a **base adapter** `BaseAdapter` provides a common implementation for adapters that can be used in:

1. ListView,GridView - By use of listAdapter.
2. Spinner - By use of spinnerAdapter.

#### BaseAdapter Details

1. BaseAdapter was introduced back in Android API level 1.
    
2. It's actually an abstract class in that it has some abstract methods that need overriding. Therefore you have to either choose to implement those methods or make your child class as well.
    
    ```java
    public abstract class BaseAdapter ..{}
    ```
    
3. BaseAdapter derives from java.lang.Object.
    
    ```java
    public abstract class BaseAdapter extends Object ...{}
    ```
    
4. BaseAdapter implements ListAdapter and SpinnerAdapter. SpinnerAdapter is used for spinners while ListAdapter for ListViews and GridViews.
    
    ```java
    public abstract class BaseAdapter extends Object implements ListAdapter, SpinnerAdapter{..}
    ```
    

#### BaseAdapter Children and GrandChildren

BaseAdapter has several direct and indirect sub-classes.

| No. | Class | Type | Description |
| --- | --- | --- | --- |
| 1. | ArrayAdapter | Direct | While BaseAdapter is always abstract, this is a concrete implementation of BaseAdapter backed by an array of arbitrary objects. |
| 2. | SimpleAdapter | Direct | A BaseAdapter child we can use to provide mapping between static data to views defined in XML file. |
| 3. | CursorAdapter | Direct | A BaseAdapter child that exposes data from a cursor to a ListView. |
| 4. | ResourceCursorAdapter | Indirect | A CursorAdapter child that creates views defined in an XML file. |
| 5. | SimpleCursorAdapter | Indirect | A a ResourceCursorAdapter child that can map columns from Cursor or TextViews or ImageViews defined in an XML file. |

# Android AdapterViews

## AdapterView

Some types of views rely on an Adapter for the purpose of data binding.

These types of views are called **AdapterViews**.

AdapterView belongs to `android.widget` package.

```java
package android.widget
```

It's a generic class with the Adapter as the generic type.

```java
android.widget.AdapterView<T extends android.widget.Adapter>
```

#### Examples of AdapterViews

There are three abstract classes inheriting from the AdapterView directly:

| Subclass | Description |
| --- | --- |
| AbsListView | Base class used to create virtualized lists. Direct parent of [ListView](https://camposha.info/android/listview) and GridView. |
| AbsSpinner | Base class used to create spinner and gallery. |
| AdapterViewAnimator | Class used by other adapterview children as base for creation of animations when switching between views. |

There are also many classes that do inherit from this class indirectly. Here the most popular among them:

| View | Description |
| --- | --- |
| GridView | Renders Items ina 2D scrolling grid. |
| ListView | Renders items in a scrollable vertical list. |
| ExpandableListeView | Renders items in a scrollable vertical two level list. |
| Spinner | Renders items in a dropdown, allowing user pick one at a time. |

### Android AbsListView

This is an abstract class that meant to be used to implement virtualized lists(and grids,carousels,stacks etc) of items.

This class derives from AdapterView.

```java
public abstract class AbsListView extends AdapterView<ListAdapter>
```

Several classes derive from this class:

| View | SubClass Type | Description |
| --- | --- | --- |
| GridView | Direct | Renders Items in a 2D scrolling grid. |
| [ListView](https://camposha.info/android/listview) | Direct | Renders items in a scrollable vertical list. |
| ExpandableListView | Indirect | Renders items in a scrollable vertical two level list. |

`AbsListView` has been available since Android API Level 1 and resides in the `android.widget` package.

Normally to render items, you won't use AbsListView, instead you'll use its children like [ListView](https://camposha.info/android/listview) and GridView.

AbsListView is just the base class that provides the necessary abstraction to hold any type of list, be it grid, carousel or stack for these views.

AbsListView's subclasses like [ListView](https://camposha.info/android/listview) and GridView rely on adapter for data binding. This is because AbsListView itself is an AdapterView.

#### Quick AbsListView Usage Examples

##### 1\. How to determine if an AbsListView can scroll vertically Up or Down.

We want to create a method that can help us determine if our abslistview widget can scroll vertically in both directions, up or down.

We'll start by creating a method returns us a boolean value. This method takes a View object as well as an integer. This view is what we will cast to our AbsListView.

The integer on the other hand will represent the direction of scroll as follows:

- `-1` - Scroll Up.
- `1` - Scroll Down.

```java
    public static boolean canScrollVertically(View targetView, int direction) {..}
```

Here's the full method:

```java
    @SuppressWarnings("deprecation")
    public static boolean canScrollVertically(View targetView, int direction) {
        if (Build.VERSION.SDK_INT < 14) {
            if (direction < 0) {
                if (targetView instanceof AbsListView) {
                    final AbsListView absListView = (AbsListView) targetView;
                    return absListView.getChildCount() > 0
                            && (absListView.getFirstVisiblePosition() > 0
                            || absListView.getChildAt(0).getTop() < absListView.getPaddingTop());
                } else {
                    return ViewCompat.canScrollVertically(targetView, direction) || targetView.getScrollY() > 0;
                }
            }else{
                if (targetView instanceof AbsListView) {
                    final AbsListView absListView = (AbsListView) targetView;
                    if (absListView.getCount() <= 0) {
                        return false;
                    } else if (absListView.getLastVisiblePosition() < (absListView.getCount() - 1)) {
                        return true;
                    } else {
                        View lastView = absListView.getChildAt(absListView.getLastVisiblePosition() - absListView.getFirstVisiblePosition());
                        return !(lastView != null && lastView.getBottom() <= absListView.getMeasuredHeight());
                    }
                } else if (targetView instanceof ScrollView) {
                    ScrollView scrollView = (ScrollView) targetView;
                    View child = scrollView.getChildAt(0);
                    return child != null && scrollView.getScrollY() < (child.getHeight() - scrollView.getMeasuredHeight());
                } else if (targetView instanceof WebView) {
                    WebView webView = (WebView) targetView;
                    return webView.getScrollY() < (webView.getContentHeight() * webView.getScale() - webView.getMeasuredHeight());
                } else {
                    return ViewCompat.canScrollVertically(targetView, direction);
                }
            }
        }else{
            returnViewCompat.canScrollVertically(targetView,direction);
        }
    }
```

Then here is how we can expose that method:

```java
    /**
     * Determine if the view can scroll up
     */
    public static boolean canScrollUp(View targetView) {
        return canScrollVertically(targetView, -1);
    }

    /**
     * Determine if the view can scroll down
     */
    public static boolean canScrollDown(View targetView) {
        return canScrollVertically(targetView, 1);
    }
```

## AbsSpinner

AbsSpinner is the parent class for Spinner.

Spinner is a view that allows us display items in a dropdown manner, allowing user pick a single item at a time.

Spinner relies on abstractions defined in this AbsSpinner class, inheriting several concrete and abstract methods.

The fact that this class has abstract methods means it's also abstract.

```java
public abstract class AbsSpinner...{}
```

This class is an adapterview. So it's children will rely on an Adapter for binding of data. Specifically a **SpinnerAdapter**.

```java
public abstract class AbsSpinner extends AdapterView<SpinnerAdapter>
```

This class like other adapterviews is defined in the `android.widget` package. It's existed since the first release of Android, API Level 1.

You won't use this class in your day to day projects since it's a base class meant to provide abstraction to the Spinner class. Instead you'll use Spinner.

This class has 3 children:

| Subclass | Description |
| --- | --- |
| Spinner | view used to provide a quick way to select a single value from a set. |
| Gallery | view that shows items in a center-locked, horizontally scrolling list.DEPRECATED IN API LEVEL 16. |

## Android AdapterViewAnimator

This is a base class for some adapterviews to help in implementation of animations when switching from one view to another.

This class is abstract and derives from AdapterView.

```java
public abstract class AdapterViewAnimator
extends AdapterView<Adapter>...{}
```

This class has existed since API 11.

Furthermore this class implements `android.widget.Adanceable` interface. **Advanceable** interface allows our **AdapterViewAnimator** to progress through its set of children .

AdapterViewAnimator has two direct children:

| Subclass | Description |
| --- | --- |
| StackView | Shows views in a stack. |
| AdapterViewFlipper | Class that animates between two or more views added onto it. |
