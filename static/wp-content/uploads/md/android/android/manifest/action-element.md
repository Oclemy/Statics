# `<action>`

syntax:

`<action  android:name\="*string*"  />`

contained in:

`<intent-filter>`

description:

Adds an action to an intent filter. An `<intent-filter>` element must contain one or more `<action>` elements. If there are no `<action>` elements in an intent filter, the filter doesn't accept any `Intent` objects. See Intents and Intent Filters for details on intent filters and the role of action specifications within a filter.

attributes:

`android:name`

The name of the action. Some standard actions are defined in the `Intent` class as `ACTION_*string*` constants. To assign one of these actions to this attribute, prepend "`android.intent.action.`" to the `*string*` that follows `ACTION_`. For example, for `ACTION_MAIN`, use "`android.intent.action.MAIN`" and for `ACTION_WEB_SEARCH`, use "`android.intent.action.WEB_SEARCH`".

For actions you define, it's best to use your app's package name as a prefix to ensure uniqueness. For example, a `TRANSMOGRIFY` action might be specified as follows:

```xml
<action  android:name\="com.example.project.TRANSMOGRIFY"  />
```
introduced in:

API Level 1