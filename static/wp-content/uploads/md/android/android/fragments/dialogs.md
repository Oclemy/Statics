# Displaying dialogs with DialogFragment

A `DialogFragment` is a special fragment subclass that is designed for creating and hosting dialogs. Strictly speaking, you do not need to host your dialog within a fragment, but doing so allows the `FragmentManager` to manage the state of the dialog and automatically restore the dialog when a configuration change occurs.

Create a `DialogFragment`
-------------------------

To create a `DialogFragment`, first create a class that extends `DialogFragment`, and override `onCreateDialog()`), as shown in the following example.

### Kotlin

```kotlin
class PurchaseConfirmationDialogFragment : DialogFragment() {
    override fun onCreateDialog(savedInstanceState: Bundle?): Dialog =
            AlertDialog.Builder(requireContext())
                .setMessage(getString(R.string.order_confirmation))
                .setPositiveButton(getString(R.string.ok)) { _,_ -> }
                .create()

    companion object {
        const val TAG = "PurchaseConfirmationDialog"
    }
}
```

### Java

```java
public class PurchaseConfirmationDialogFragment extends DialogFragment {
   @NonNull
   @Override
   public Dialog onCreateDialog(@Nullable Bundle savedInstanceState) {
       return new AlertDialog.Builder(requireContext())
               .setMessage(getString(R.string.order_confirmation))
               .setPositiveButton(getString(R.string.ok), (dialog, which) -> {} )
               .create();
   }

   public static String TAG = "PurchaseConfirmationDialog";
}
```

Similar to how `onCreateView()`) should create a root `View` in an ordinary fragment, `onCreateDialog()` should create a `Dialog` to display as part of the `DialogFragment`. The `DialogFragment` handles displaying the `Dialog` at appropriate states in the fragment's lifecycle.

Just like with `onCreateView()`, you can return any subclass of `Dialog` from `onCreateDialog()` and are not limited to using only `AlertDialog`.

Showing the `DialogFragment`
----------------------------

It is not necessary to manually create a `FragmentTransaction` to display your `DialogFragment`. Instead, use the `show()` method to display your dialog. You can pass a reference to a `FragmentManager` and a `String` to use as a `FragmentTransaction` tag. When creating a `DialogFragment` from within a `Fragment`, you must use the `Fragment`'s child `FragmentManager` to ensure that the state is properly restored after configuration changes. A non-null tag allows you to use `findFragmentByTag()` to retrieve the `DialogFragment` at a later time.

### Kotlin

```kotlin
// From another Fragment or Activity where you wish to show this
// PurchaseConfirmationDialogFragment.
PurchaseConfirmationDialogFragment().show(
     childFragmentManager, PurchaseConfirmationDialog.TAG)
```

### Java

```java
// From another Fragment or Activity where you wish to show this
// PurchaseConfirmationDialogFragment.
new PurchaseConfirmationDialogFragment().show(
       getChildFragmentManager(), PurchaseConfirmationDialog.TAG);
```

For more control over the `FragmentTransaction`, you can use the `show()`) overload that accepts an existing `FragmentTransaction`.

`DialogFragment` lifecycle
--------------------------

A `DialogFragment` follows the standard fragment lifecycle. In addition `DialogFragment` has a few additional lifecycle callbacks. The most common ones are as follows:

*   `onCreateDialog()`) - Override this callback to provide a `Dialog` for the fragment to manage and display.
*   `onDismiss()`) - Override this callback if you need to perform any custom logic when your `Dialog` is dismissed, such as releasing resources, unsubscribing from observable resources, and so on.
*   `onCancel()`) - Override this callback if you need to perform any custom logic when your `Dialog` is cancelled.

`DialogFragment` also contains methods to dismiss or set the cancellability of your `DialogFragment`:

*   `dismiss()`) - Dismiss the fragment and its dialog. If the fragment was added to the back stack, all back stack state up to and including this entry are popped. Otherwise, a new transaction is committed to remove the fragment.
*   `setCancellable()`) - Control whether the shown `Dialog` is cancelable. This method should be used instead of directly calling `Dialog.setCancelable(boolean)`).

Notice that you do not override `onCreateView()` or `onViewCreated()`) when using a `DialogFragment` with a `Dialog`. Dialogs are not only views—they have their own window. As such, it is insufficient to override `onCreateView()`. Moreover, `onViewCreated()` is never called on a custom `DialogFragment` unless you've overridden `onCreateView()` and provided a non-null view.

Using custom views
------------------

You can create a `DialogFragment` and display a dialog by overriding `onCreateView()`), either giving it a `layoutId` as you would with a typical fragment or using the `DialogFragment` constructor).

The `View` returned by onCreateView()) is automatically added to the dialog. In most cases, this means that you don't need to override `onCreateDialog()`), as the default empty dialog is populated with your view.

Certain subclasses of `DialogFragment`, such as `BottomSheetDialogFragment`, embed your view in a dialog that is styled as a bottom sheet.