`<activity-alias>`
================

syntax:

```xml
<activity-alias android:enabled\=\["true" | "false"\]
        android:exported\=\["true" | "false"\]
        android:icon\="_drawable resource_"
        android:label\="_string resource_"
        android:name\="_string_"
        android:permission\="_string_"
        android:targetActivity\="_string_" >
  . . .
</activity-alias>
```

contained in: `<application>` can contain: `<intent-filter>`
`<meta-data>` description: An alias for an activity, named by the `targetActivity` attribute. The target must be in the same application as the alias and it must be declared before the alias in the manifest.

The alias presents the target activity as an independent entity. It can have its own set of intent filters, and they, rather than the intent filters on the target activity itself, determine which intents can activate the target through the alias and how the system treats the alias. For example, the intent filters on the alias may specify the "`` `android.intent.action.MAIN` ``" and "`` `android.intent.category.LAUNCHER` ``" flags, causing it to be represented in the application launcher, even though none of the filters on the target activity itself set these flags.

With the exception of `targetActivity`, `<activity-alias>` attributes are a subset of `<activity>` attributes. For attributes in the subset, none of the values set for the target carry over to the alias. However, for attributes not in the subset, the values set for the target activity also apply to the alias.

attributes: `android:enabled` Whether or not the target activity can be instantiated by the system through this alias — "`true`" if it can be, and "`false`" if not. The default value is "`true`".

The `<application>` element has its own `enabled` attribute that applies to all application components, including activity aliases. The `<application>` and `<activity-alias>` attributes must both be "`true`" for the system to be able to instantiate the target activity through the alias. If either is "`false`", the alias does not work.

`android:exported` Whether or not components of other applications can launch the target activity through this alias — "`true`" if they can, and "`false`" if not. If "`false`", the target activity can be launched through the alias only by components of the same application as the alias or applications with the same user ID.

The default value depends on whether the alias contains intent filters. The absence of any filters means that the activity can be invoked through the alias only by specifying the exact name of the alias. This implies that the alias is intended only for application-internal use (since others would not know its name) — so the default value is "`false`". On the other hand, the presence of at least one filter implies that the alias is intended for external use — so the default value is "`true`".

`android:icon` An icon for the target activity when presented to users through the alias. See the `<activity>` element's `icon` attribute for more information. `android:label` A user-readable label for the alias when presented to users through the alias. See the `<activity>` element's `label` attribute for more information.

`android:name` A unique name for the alias. The name should resemble a fully qualified class name. But, unlike the name of the target activity, the alias name is arbitrary; it does not refer to an actual class.`android:permission` The name of a permission that clients must have to launch the target activity or get it to do something via the alias. If a caller of `` `startActivity())` `` or `` `startActivityForResult())` `` has not been granted the specified permission, the target activity will not be activated.

This attribute supplants any permission set for the target activity itself. If it is not set, a permission is not needed to activate the target through the alias.

For more information on permissions, see the Permissions section in the introduction.

`android:targetActivity` The name of the activity that can be activated through the alias. This name must match the `name` attribute of an `<activity>` element that precedes the alias in the manifest.

introduced in: API Level 1 see also: `<activity>`