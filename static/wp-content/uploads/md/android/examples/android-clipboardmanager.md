# ClipboardManager- Put or Get


This is a practical example to teach you how to use the ClipboardManager class. You can use this class to achieve copy/paste functionality in android app.


**How to Put String into Clipboard**

Here's how:

```java
public static void putStringToClipboard(@NonNull String content){
        ClipData data = ClipData.newPlainText(null,content);
        sClipboardManager.setPrimaryClip(data);
    }
```

**How to get string from clipboard**

here's how:

```java
public static String getStringFromClipboard(){
        ClipData clipData = sClipboardManager.getPrimaryClip();
        if (clipData != null){
            Log.d(TAG, "getStringFromClipboard: nclipData = " + clipData.toString());
            if (clipData.getItemCount() > 0){
                return clipData.getItemAt(0).getText().toString();
            }
        }
        return "";
    }
```

Here's the full class:

```java
import android.content.ClipData;
import android.content.ClipDescription;
import android.content.ClipboardManager;
import android.content.Context;
import android.support.annotation.NonNull;
import android.util.Log;

import com.jiangkang.tools.King;

public class ClipboardUtils {

    private static final String TAG = ClipboardUtils.class.getSimpleName();
    private static ClipboardManager sClipboardManager;

    static {
        sClipboardManager = (ClipboardManager) King.getApplicationContext().getSystemService(Context.CLIPBOARD_SERVICE);
    }

    public static void putStringToClipboard(@NonNull String content){
        ClipData data = ClipData.newPlainText(null,content);
        sClipboardManager.setPrimaryClip(data);
    }

    public static String getStringFromClipboard(){
        ClipData clipData = sClipboardManager.getPrimaryClip();
        if (clipData != null){
            Log.d(TAG, "getStringFromClipboard: nclipData = " + clipData.toString());
            if (clipData.getItemCount() > 0){
                return clipData.getItemAt(0).getText().toString();
            }
        }
        return "";
    }

}
```
