# SQLite Introduction


In this piece we will look at several HowTo snippets before proceeding to write full sqlite examples.


## Cursor

_Android Cursor Example and Tutorial._

#### 1\. How to Close a Cursor

```java
    /**
     * Closes the passed in {@link Cursor}.
     *
     * @param cursor The {@link Cursor} to be closed.
     */
    public static void close(final Cursor cursor) {
        if ((cursor != null) && (!cursor.isClosed())) {
            cursor.close();
        }
    }
```

#### 2\. How to determine if a Cursor has Data

```java
    /**
     * Determines if the passed in {@link Cursor} contains any data.
     *
     * @param cursor    The {@link Cursor} that will be checked.
     * @param moveFirst Indicates if the {@link Cursor} has data, move to the first record.
     *
     * @return A {@link Boolean} indicating whether the passed in {@link Cursor} has data.
     */
    public static boolean hasData(final Cursor cursor, final boolean moveFirst) {
        boolean success;

        try {
            success = (cursor != null && cursor.getCount() > 0);
            if (success && moveFirst) {
                success = cursor.moveToFirst();
            }
        }
        catch (Exception ex) {
            success = false;
        }

        return success;
    }
```

## Quick SQlite snippets

### Quick SQLite Example Snippets

#### (1). How to Execute Multiple SQL statements

Suppose you have several SQL statements, maybe in a String array. And you want to execute them. We can create a method that does that for us. The method will receive a SQLiteDatabase object as a String array which will contain multiple SQL statements.

```java
    public static void execMultipleSQL(final SQLiteDatabase db, final String[] sql) {
        for (final String s : sql) {
            if (!TextUtils.isEmpty(s.trim())) {
                try {
                    Logger.debug(TAG, s.replace('|', ';'));
                    db.execSQL(s.replace('|', ';'));
                }
                catch (final Exception ex) {
                    Logger.error(TAG, ex.getMessage(), ex);
                }
            }
        }
    }
```

#### (2). SQLite How to Search By Tags

Let's say we want to get all the emoticons that matches the search tag. If the icon for the emoticon is supported by the emoticon provider then, that emoticon will be added to list.

```java
/**
 * @param searchQuery      Search string.
 * @param emoticonProvider  EmoticonProvider or null for system emoticons.
 * @return List of all the supported emoticons for given emoticon icon pack.
 */
@NonNull
ArrayList<Emoticon> searchEmoticons(@NonNull final String searchQuery,
                                    @Nullable EmoticonProvider emoticonProvider) {
    SQLiteDatabase sqLiteDatabase = getReadableDatabase();
    Cursor cursor = sqLiteDatabase.query(EmoticonTagsColumns.TABLE,
            new String[]{EmoticonTagsColumns.UNICODE},      //Unicode.
            EmoticonTagsColumns.TAG + " LIKE ?", new String[]{searchQuery.trim() + "%"}, //Search for the tag
            null, null, null);

    ArrayList<Emoticon> emoticons = new ArrayList<>();
    while (cursor.moveToNext()) {
        String unicode = cursor.getString(cursor.getColumnIndex(EmoticonTagsColumns.UNICODE));

        //Check if there is icon available to display for custom emoticon page.
        if (emoticonProvider == null || emoticonProvider.hasEmoticonIcon(unicode)) {
            Emoticon emoticon = new Emoticon(unicode);
            if (!emoticons.contains(emoticon))  //Prevent duplicates.
                emoticons.add(new Emoticon(unicode));
        }
    }
    cursor.close();
    sqLiteDatabase.close();
    return emoticons;
}
```
