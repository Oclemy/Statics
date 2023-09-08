# SQLite Libraries


The defacto local database storage for android development is the SQLite database. It has been like that since the inception of android in the mid 2000s. However working with sqlite database using the standard APIs does involve lots of boilerplate.

Google helped by providing the Room framework which came alongside other jetpack components. However that still does involve writing some good amount of code. If you prefer simpler solutions, then this article is for you.

We will look at the easiest to use SQLite database helpers and ORMs(Object Relational Mappers) for android development. We will look at examples to see how to use them so that you can choose which is best for your situation.


## (a). KongzueDB

> KongzueDB is an encapsulation of SQLite, opening up the mutual conversion with Json, suitable for light-weight database usage scenarios, semi-automatic and rapid creation of table structure.

Here are it's features:

- KongzueDB is an encapsulation of SQLite in Android. Because of the simplified storage method and the use of self-generated SQL statements, it can only be used in scenarios with light-weight requirements. If you need heavy scenarios such as multi-table joint query, and the type of data stored in the database Do not use this framework for projects with strict requirements;
    
- KongzueDB framework uses the DBData object for database data operations, and its structure and usage are consistent with Map, and the queried data can be directly connected to the Adapter.
    
- KongzueDB provides a perfect connection with json data, which can be output as json or directly create database data from json.
    
- The purpose of this framework is to solve the problem of difficulty in getting started with SQLite. It further encapsulates its additions, deletions, and changes to make it easier to use and easier to use, and the process is easier, but in essence it is still operating in the database. Please note that it has at least a database , Tables, items, and basic knowledge of the database;
    
- This framework will insert an additional auto-increment key named "_id" into the inserted data, please do not modify it in any way.
    
- For the first use after initialization, the framework will create a data table based on the keyArray in the first DBData you added as a "column". If a new key is added to the DBData added later, the data table will **be updated automatically** .
    
- In this framework, you only need to pay attention to the DB class. For DBHelper, it is not recommended to directly manipulate the methods in it.
    

### Step 1: Install it

The first step is to install as it is a third party library. It's hosted in maven so register jitpack as a maven url repository:

```groovy
allprojects {
    repositories {
        ...
        maven { url 'https://jitpack.io' }
    }
}
```

Then provide the implementation statement in your dependencies closure:

```groovy
implementation 'com.github.kongzue:DBV3:3.0.3.8'
```

### Step 2: Initialize Database

The first step is to initialize the database:

```java
DB.init(this, "testDB");  
DB.init(this, "testDB", true);  
```

You are passing the context, database name and whether to print logs. It is recommended to use the Application as the context.

### Step 3: Write Code

**How to Insert to Database**

Let's start by seeing how to insert data into sqlite database using the this library:

```java
DB.getTable("user")                     
    .add(                               
        new DBData()                    
            .set("username", "John")
            .set("age", 13)
            .set("gender", 0)
            .set("isVIP", true)
    );
```

Clearly you can see that different data types are being inserted into our database columns, for example strings, integers and booleans.

**How to Retrieve data in database**

The following returns a collection:

```java
List<DBData> result = DB.getTable("user").find();
```

You can then filter the collection using queries:

```java
List<DBData> result = DB.getTable("user")
        .whereEqual("name", "John")
        .whereGreater("age", 10)
        .whereLess("grade", 100)
        .whereLike("introduction","%Serious%") 
        .whereNot("gender",1)   
        .find();    
```

You can also write your own query:

```java
List<DBData> result = DB.getTable("user")
        .where("name='John'")
        .find();
```

When you write your own query conditions, the query condition statement does not need to contain spaces, and the text value needs to be added with single quotes.

If you want to obtain only a single element from the database:

```java
DBData data = DB.getTable("user").where(...).findSingle();
```

**How to page data**

When paging is needed, only the starting position of the paging and the number of queries need to be set:

```java
List<DBData> result = DB.getTable("user")
        .limit(0, 3)  
        .find();
```

**How to Delete Data**

To delete data from SQLite datbase:

```java
DB.getTable("user")
        .delete(dbData);
```

Or :

```java
DB.getTable("user")
        .delete(new DBData()                  
            .set("name", "John")
        );
```

Or:

```java
DB.getTable("user")
        .where("name='John'") 
        .delete();
```

**How to Update Data**

You can also easily update existing data:

```java
List<DBData> result = DB.getTable("user")                       
        .find();

for (DBData dbData : result) {                
    DB.getTable("user").update(
        dbData.set("isVIP", true)
    );      
}
```

**How to Sort data**

To sort sqlite data:

```java
.setSort(SORT)
```

**Others**

To clear table:

```java
.cleanAll();
```

Delete data table

```java
.deleteTable();
```

Close the database

```java
DB.closeDB();
```

**How to Convert JSON data to SQLite database data**

For a JsonObject, for example:

```java
{
    "name":"John",
    "age":16,
    "phone":18888888888
}
```

To convert it into a DBData object, use:

```java
String json = "{\"name\":\"John\",\"age\":16,\"phone\":18888888888}";
DBData result = new DBData(json);
```

For the queried object, to convert it to json, use the toString() output that comes with DBData:

```java
List<DBData> result = DB.getTable("user").find();
for (DBData dbData : result) {
    Log.i("json输出：", dbData.toString());
}
```

### Reference

Find more info about DBV3 [here](https://github.com/kongzue/DBV3)
