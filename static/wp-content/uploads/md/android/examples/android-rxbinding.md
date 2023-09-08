# Introduction to RxBinding


[RxBinding](https://github.com/JakeWharton/RxBinding) is a RxJava-based library that simplifies complex UI interactions in Android through binding APIs for UI widgets. It simplifies especially the following:

1. Click listeners.
2. Text change listeners
3. Other mundane callbacks.
4. Event handlers

It simplifies them by providing a consitent way of handling them unlike the standard way providing by the Android platform.


Futhermore through RxBinding we can utilize the powerful reactive architecture of programming. Through this architecture, we can easily handle scenarios where inputs or actions of some widgets are to be used by other widgets. This type of scenario can of course be handled by the imperative way of programming. However it tends to be overly complex and unnatural,involving lots of boilerplate code, leading to what is infamously known as the _Callback Hell_.

### Advantages of RxBinding

1. Easy and Consistent application of callbacks.
2. Clean and maintenable code with less boilerplate. RxBinding provides a syntactic sugar more concise and readable than the framework APIs.
3. Easy handling of complex scenarios where inputs of a view are used by other views.
4. Easy to describe interaction pattern among multiple UI components.

RxBinding was built by [Jake Wharton](https://github.com/JakeWharton) off RxJava. RxJava's main selling point is its ability to allow us compose asynchronous events in a more straightforward way. However this is isn't limited to just data but also User interface and that's where RxBinding comes into play. RxBinding allows us to react to user interface events via the RxJava paradigm.

Such that instead of having this:

```java
Button b = (Button)findViewById(R.id.button);
b.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
              // do some work here
            }
        });
```

You can have this:

```java
Button b = (Button)findViewById(R.id.button);
Subscription sub =
                RxView.clicks(b).subscribe(new Action1<Void>() {
                    @Override
                    public void call(Void aVoid) {
                        // do some work here
                    }
                });
// you'll then have to unsubscribe the subscription
```

And then for TextWatcher instead of this:

```java
final EditText name = (EditText) v.findViewById(R.id.name);
name.addTextChangedListener(new TextWatcher() {
    @Override
    public void beforeTextChanged(CharSequence s, int start, int count, int after) {

    }

    @Override
    public void onTextChanged(CharSequence s, int start, int before, int count) {
        // do some work here with the updated text
    }

    @Override
    public void afterTextChanged(Editable s) {

    }
});
```

With RxBinding you'll have this:

```java
final EditText name = (EditText) v.findViewById(R.id.name);
Subscription editTextSub =
    RxTextView.textChanges(name)
            .subscribe(new Action1<String>() {
                @Override
                public void call(String value) {
                    // do some work with the updated text
                }
            });
// you'll then unsubscribe the subscription
```

You can see that it's not only easy but also consistent, thus saving from memorizing lots of listeners while allowing you to write clean simple code free of boilerplate. For example in the above EditText we don't have to implement `beforeTextChanged()` and `afterTextChanged()`, instead the code we've written looks almost similar to that of click listeners.

Here's for ViewPager:

```java
viewPager.addOnAdapterChangeListener(object : ViewPager.OnPageChangeListener {
    override fun onPageScrolled(position: Int, positionOffset: Float, positionOffsetPixels: Int) {

    }

    override fun onPageSelected(position: Int) {
        if (position == 1){
            button.visibility = VISIBLE
        }
    }

    override fun onPageScrollStateChanged(state: Int) {

    }
})
```

and with RxBinding:

```java
RxViewPager.pageSelections(viewPager).subscribe {
    it -> if (it == 1) button.visibility = VISIBLE
}
```

and Button with lambda expression:

```java
button.setOnClickListener {
    Toast.makeText(this, "OK", Toast.LENGTH_SHORT).show()
}
```

and with RxBinding:

```java
RxView.clicks(button).subscribe { Toast.makeText(this, "OK", Toast.LENGTH_SHORT).show() }
```

### Transformation with Operators

You can take advantage of powerful Reactive Design pattern features available in RxJava in your RxBinding app. For example you can apply transformations to your data stream being emitted.

For example as the user types data in your edittext, you'd want to transform it in a way like capitalizing, it reversing it before rendering it in a different widget.

```java
final TextView nameLabel = (TextView) findViewById(R.id.name_label);

final EditText name = (EditText) findViewById(R.id.name);
Subscription editTextSub =
    RxTextView.textChanges(name)
            .map(new Func1<CharSequence, String>() {
                @Override
                public String call(CharSequence charSequence) {
                    return new StringBuilder(charSequence).reverse().toString();
                }
            })
            .subscribe(new Action1<String>() {
                @Override
                public void call(String value) {
                    nameLabel.setText(value);
                }
            });
```

### Installation

RxBinding is a popular library by a popular developer and is actively being maintained.

To install it add the following in your app level build.gradle:

```groovy
implementation 'com.jakewharton.rxbinding3:rxbinding:3.0.0'
```

### Example

A Full example is coming soon.
