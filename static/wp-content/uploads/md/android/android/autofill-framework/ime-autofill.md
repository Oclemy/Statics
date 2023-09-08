# Integrate autofill with keyboards

Beginning in Android 11, keyboards and other input-method editors (_IMEs_) can display autofill suggestions inline, in a suggestion strip or something similar, instead of the system displaying these in a dropdown menu. Since these autofill suggestions can contain private data, such as passwords or credit-card information, the suggestions are hidden from the IME until the user selects one. IMEs and password managers both need to be updated to make use of this feature. If an IME or a password manager does not support inline autofill, suggestions are shown in a drop-down menu, as they were before Android 11.

Workflow
--------

To understand how inline autofill works, it's helpful to walk through the process. In this flow, _IME_ means the current keyboard or other input editor, and _suggestion provider_ means the appropriate provider of that autofill suggestion. Depending on the input field and the user's settings, the suggestion provider might be the platform or an autofill service.

1.  The user focuses on an input field that triggers autofill, like a password or credit-card input field.
    
2.  The platform queries the current IME and the appropriate suggestion provider to see if they support inline autofill. If either the IME or the suggestion provider does not support inline autofill, the suggestion is shown in a drop-down menu, as on Android 10 and lower.
    
3.  The platform asks the IME to provide a _suggestion request_. This suggestion request specifies the maximum number of suggestions the IME would like, and also provides _presentation specs_ for each suggestion. The presentation specs specify things like maximum size, text size, colors, and font data, allowing the suggestion provider to match the look and feel of the IME.
    
4.  The platform asks the suggestion provider to provide up to the requested number of suggestions. Each suggestion includes a callback to inflate a `View` containing the suggestion's UI.
    
5.  The platform informs the IME that suggestions are ready. The IME displays the suggestions by calling the callback method to inflate each suggestion's `View`. To protect the user's private information, the IME does _not_ see what the suggestions are at this stage.
    
6.  If the user chooses one of the suggestions, the IME is informed the same way it would have been if the user had chosen a suggestion from a drop-down list.
    

The following sections describe how to configure your IME or password manager to support inline autofill.

Configure IMEs to support inline autofill
-----------------------------------------

This section describes how to configure your IME to support inline autofill. If your IME does not support inline autofill, the platform defaults to showing autofill suggestions in a drop-down menu.

Your IME must set the `supportsInlinedSuggestions` attribute to `true`:

```xml
    <input-method
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:supportsInlineSuggestions="true"/>
```

When the platform needs an autofill suggestion, it calls your IME's `InputMethodService.onCreateInlineSuggestionsRequest()`) method. You must implement this method. Return an `InlineSuggestionsRequest` specifying the following:

*   How many suggestions your IME would like
*   An `InlinePresentationSpec` for each suggestion, defining how the suggestion should be presented
    

When the platform has suggestions, it calls your IME's `onInlineSuggestionsResponse()`) method, passing an `InlineSuggestionsResponse` containing the suggestions. You must implement this method. Your implementation calls `InlineSuggestionsResponse.getInlineSuggestions()`) to get the list of suggestions, then inflates each suggestion by calling its `InlineSuggestion.inflate()`) method.

Configure autofill services to support inline autofill
------------------------------------------------------

This section describes how to configure your password manager to support inline autofill. If your app does not support inline autofill, the platform defaults to showing its autofill suggestions in a drop-down menu.

Your password manager must set the `supportsInlinedSuggestions` attribute to `true`:

```xml
    <autofill-service
        xmlns:android="http://schemas.android.com/apk/res/android"
        android:supportsInlineSuggestions="true"/>
```

When the IME needs autofill suggestions, the platform calls your autofill service's `onFillRequest()`) method, just as it did before Android 11. However, your service must call the passed `FillRequest` object's `getInlineSuggestionsRequest()`) method to get the `InlineSuggestionsRequest` created by the IME. The `InlineSuggestionsRequest` specifies how many inline suggestions are needed, and how each one should be presented. If the IME does not support inline suggestions, the method returns `null`.

Your autofill service creates `InlinePresentation` objects, up to the maximum number requested in the `InlineSuggestionsRequest`. Your presentations must obey the size constraints specified by the `InlineSuggestionsRequest`. To return your suggestions to the IME, call `Dataset.Builder.setValue()`) once for each suggestion. Android 11 provides new versions of `Dataset.Builder.setValue()` to support inline suggestions.

> **Note:** While the IME is supposed to use the suggestions your service provides, there is no guarantee that it will do so.