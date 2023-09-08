# Android SQLite - How to Import from or Export to Excel


The most commonly used spreadsheet is MS Excel. This program is available as part of the microsoft's desktop suite. On the other hand when we are talking about android we are talking about mobile development.

What if you have data in your mobile app that you want to analyze in MS Excel. In that case you need to export the data from SQLite database to Excel. Rather than invent new ways of doing that, this tutorial shows you how to do with already existing solutions in minutes.


## (a). Solution 1: Use SQLiteToExcel

> This is a Light weight Library to Convert SQLite Database to Excel and Convert Excel to SQLite.

How do you use it?

### Step 1: Install it

Being a third party solution, you need to install it via gradle. Add the following implementation statement in your `build.gradle` and sync:

```groovy
implementation 'com.ajts.androidmads.SQLite2Excel:library:1.0.4'
```

### Step 2: Add Necessary Permissions

In this case you need the permission to read from external storage of the device. Thus add the following permission in your `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
```

### Step 3: Export Data

For example to export the sqlite database to the default location, start by instantiating the `SqliteToExcel` class, passing in the context as well as the database name as parameters via the constructor:

```java
SqliteToExcel sqliteToExcel = new SqliteToExcel(this, "helloworld.db");
```

If you want to export and save to a custom destination then use the below line:

```java
SqliteToExcel sqliteToExcel = new SqliteToExcel(this, "helloworld.db", directory_path);
```

What about if you prefer to export only a single table, and export it to a single Excel sheet. In that case you can use the `exportSingleTable()` function, passing in the database table name, the excel sheet name and a callback with three methods:

```java
sqliteToExcel.exportSingleTable("table1", "table1.xls", new SQLiteToExcel.ExportListener() {
     @Override
     public void onStart() {

     }
     @Override
     public void onCompleted(String filePath) {

     }
     @Override
     public void onError(Exception e) {

     }
});
```

And if you want to export a list of tables in the database to Excel, you use the `exportSpecificTables()` function:

```java
sqliteToExcel.exportSpecificTables(tablesList, "table1.xls", new SQLiteToExcel.ExportListener() {
     @Override
     public void onStart() {

     }
     @Override
     public void onCompleted(String filePath) {

     }
     @Override
     public void onError(Exception e) {

     }
});
```

To export every table in the database to excel sheet, you use the `exportAllTables()` function as follows:

```java
sqliteToExcel.exportAllTables("table1.xls", new SQLiteToExcel.ExportListener() {
     @Override
     public void onStart() {

     }
     @Override
     public void onCompleted(String filePath) {

     }
     @Override
     public void onError(Exception e) {

     }
});
```

If you want to exclude specific columns, define them in an arraylist and set them via the `setExcludeColumns()` function, then you pass that arraylist to that method:

```java
ArrayList<String> columnsToExclude = new ArrayList<String>();
columnsToExclude.add("income_id");
sqliteToExcel.setExcludeColumns(columnsToExclude);
...
sqliteToExcel.export...
```

### How to Import from Excel to SQLite

This library also allows you to import from excel into sqlite database. In that case you will use the `ExcelToSQLite` class instead of the `SqliteToExcel` that was used while exporting.

So start by instanting the `ExcelToSQLite` and passing in the context as well as the database name:

```java
ExcelToSQLite excelToSQLite = new ExcelToSQLite(getApplicationContext(), "helloworld.db");
```

To drop a table while importing the excel use the following code:

```java
ExcelToSQLite excelToSQLite = new ExcelToSQLite(getApplicationContext(), "helloworld.db", true);
```

If you want to export Excel sheet from the assets folder in android into sqlite database, use the `importFromAsset()` function, passing in the `.xls` excel file name and an import listener callback:

```java
excelToSQLite.importFromAsset("assetFileName.xls", new ExcelToSQLite.ImportListener() {
    @Override
    public void onStart() {

    }

    @Override
    public void onCompleted(String dbName) {

    }

    @Override
    public void onError(Exception e) {

    }
});
```

If you want to import excel from a directory into database use the `importFromFile()` function and pass the directory path:

```java
excelToSQLite.importFromFile(directory_path, new ExcelToSQLite.ImportListener() {
    @Override
    public void onStart() {

    }

    @Override
    public void onCompleted(String dbName) {

    }

    @Override
    public void onError(Exception e) {

    }
});
```

### Full Example

[Download](https://downgit.github.io/#/home?url=https://github.com/androidmads/SQLite2XL/tree/master/app) the full example.

### Reference

Below are code reference links:

| Number | Link |
| --- | --- |
| 1. | [Download code](https://downgit.github.io/#/home?url=https://github.com/androidmads/SQLite2XL/tree/master/app) |
| 2. | [Read more](https://github.com/androidmads/SQLite2XL/) |
| 3. | [Follow code author](https://github.com/androidmads/) |
