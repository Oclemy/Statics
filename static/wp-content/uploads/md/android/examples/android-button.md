# Android Button Tutorial and Example

_Android Button Tutorial and Examples._

A Button is a special type of TextView that has push capabilities like being pressed or clicked to perform an action.

[lwtoc]

Buttons have been available since API level 1.

#### Uses of a Button

Buttons are used in almost all type of applications with GUI components.

| No. | Use |
| --- | --- |
| 1. | Provide ability for users to initiate any type of action. |

#### Programmatic Characteristics of a Button

1. A button is a class like any other class:
    
    ```java
    public class Button..{}
    ```
    
2. A button is a widget:
    
    ```java
    package android.widget;
    ```
    
3. A button is a TextView.
    
    ```java
    public class Button extends TextView {...}
    ```
    

#### Creating a Button

There are two general ways of creating a button in android.

1. Imperatively via java code.
2. Declaratively via XML code.

##### Imperativey

The Button class provides us 4 public constructors to programmatically create a button:

| No. | Constructor |
| --- | --- |
| 1. | `Button(Context context)` |
| 2. | `Button(Context context, AttributeSet attrs)` |
| 3. | `Button(Context context, AttributeSet attrs, int defStyleAttr)` |
| 4. | `Button(Context context, AttributeSet attrs, int defStyleAttr, int defStyleRes)` |

| ######## Advantages of Imperative Way | No. | Advantage |
| --- | --- | --- |
| 1. | Imperative creation of buttons allows us to use Java language so we have everything under one roof. |
| 2. | You can easily create buttons at runtime depending on various conditions. |

Example:

```java
Button myButton=new Button(MainActivity.this);
```

##### Declaratively

Buttons can also be created declaratively via XML. This is the most commonly used as it's very flexible.

| ######## Advantages of Declarative Way | No. | Advantage |
| --- | --- | --- |
| 1. | Declarative creation of buttons allows us to use a declarative language XML which makes it quite easy |
| 2. | It's easily maintanable as the user interface is decoupled from your Java logic. |
| 3. | It's easier to share or download code and safely test them before runtime. |
| 4. | You can use XML generated tools to generate XML |

Here's an example:

```xml
    <Button
        android_id="@+id/myButton"
        android_text="Start"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
        />
```

#### Example

Here's a simple button example that when clicked shows a Toast message.

```java
public class MainActivity extends Activity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        final Button showToastBtn=findViewById(R.id.showToastBtn);
        showToastBtn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Toast.makeText(MainActivity.this,"IC1011 is the largest Galaxy ever discovered",Toast.LENGTH_SHORT).show();
            }
        });
        }
```

And here's the button xml code that you can add in a layout:

```xml
<Button
        android_id="@+id/showToastBtn"
        android_text="Show Toast"
        android_layout_width="wrap_content"
        android_layout_height="wrap_content"
 />
```

#### Children and Grandchildren of Button

Buttons have direct and indirect subclasses:

##### Button Children

Here are the direct subclasses:

| No. | Class | Description |
| --- | --- | --- |
| 1. | AppCompatButton | A Button with compatible features on older versions of Android. |
| 2. | CompoundButton | A CompoundButton is a button with two states: checked and unchecked. |

##### Button Grandchildren

Here are the indirect subclasses of the Button class:

| No. | Class | Description |
| --- | --- | --- |
| 1. | CheckBox | A type of CompoundButton that can be checked and unchecked. |
| 2. | AppCompatCheckBox | A CheckBox supporting compatible features on older version of Android. |
| 3. | RadioButton | A type of CompoundButton that can be either be checked or unchecked. But unlike a CheckBox once a radiobutton is checked user cannot uncheck it. |
| 4. | ToggleButton | A type of CompoundButton that renders the checked or unchecked states with a "light" indicator that can be toggled "ON" or "OFF". |
| 5. | Switch | A type of CompoundButton allows us swicth between two options. |
| 6. | SwitchCompat | A Switch button that supports devices as old as API v7. |

Best Regards.
