# Android Jackson Tutorial and Examples

_Java Jackson Tutorial and Examples._

Jackson is a JSON API for java comprising:

1. Jackson Core(Streaming API) - defines low-level streaming API, and includes JSON-specific implementations
2. Jackson Annotations - contains standard Jackson annotations.
3. Jackson Databind - implements data-binding (and object serialization) support on streaming package; it depends both on streaming and annotations packages.


These three require each other in the sequence we've listed them. Jackson Annotation uses the Jackson Core features, and the Jackson Databind uses Jackson Annotation.

Jackson has been one of the main java data binding libraries. And as such it has inspired other libraries in other languages:

1. [Pyckson](https://github.com/antidot/Pyckson) - a Python library that aims for same goals as Java Jackson, such as Convention over Configuration
2. [Rackson](https://github.com/griffindy/rackson) -a Ruby library that offers Jackson-like functionality on Ruby platform

#### Installation

The following is a set of Maven dependency declarations for the most common components, with some comments. In all cases here, `${jackson-2-version}` is presumed to be a property set to the version you want to use.

```xml
<!-- the core, which includes Streaming API, shared low-level abstractions (but NOT data-binding) -->
 <dependency>
   <groupId>com.fasterxml.jackson.core</groupId>
   <artifactId>jackson-core</artifactId>
   <version>${jackson-2-version}</version>
 </dependency>

 <!-- Just the annotations; use this dependency if you want to attach annotations
      to classes without connecting them to the code. -->
 <dependency>
   <groupId>com.fasterxml.jackson.core</groupId>
   <artifactId>jackson-annotations</artifactId>
   <version>${jackson-2-version}</version>
</dependency>

<!-- databinding; ObjectMapper, JsonNode and related classes are here -->
<dependency>
  <groupId>com.fasterxml.jackson.core</groupId>
  <artifactId>jackson-databind</artifactId>
  <version>${jackson-2-version}</version>
</dependency>

<!-- smile (binary JSON). Other artifacts in this group do other formats. -->
<dependency>
  <groupId>com.fasterxml.jackson.dataformat</groupId>
  <artifactId>jackson-dataformat-smile</artifactId>
  <version>${jackson-2-version}</version>
</dependency>
<!-- JAX-RS provider -->
<dependency>
   <groupId>com.fasterxml.jackson.jaxrs</groupId>
   <artifactId>jackson-jaxrs-json-provider</artifactId>
   <version>${jackson-2-version}</version>
</dependency>
<!-- Support for JAX-B annotations as additional configuration -->
<dependency>
  <groupId>com.fasterxml.jackson.module</groupId>
  <artifactId>jackson-module-jaxb-annotations</artifactId>
  <version>${jackson-2-version}</version>
</dependency>
```

You can find more documentation about Jackson [here](https://github.com/FasterXML/jackson-docs/wiki).

#### Jackson Hello World

Here's a Hello world for java jackson.

First in your `pom.xml` add dependencies for Jackson as follows:

```xml
 <properties>
        <!-- Use the latest version whenever possible. -->
        <jackson.version>2.7.3</jackson.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-core</artifactId>
            <version>${jackson.version}</version>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>${jackson.version}</version>
        </dependency>
    </dependencies>
```

You can see we have added both the jackson core and jackson databind as the latter depends on the former.

We will import `ObjectMapper` from `com.fasterxml.jackson.databind` and `JsonProcessingException` from `com.fasterxml.jackson.core`.

Then we create our class:

```java
public class MrHelloWorld { ..}
```

Then we'll create two inner classes and a main method inside our `MrHelloWorld`:

```java
public class MrHelloWorld {
    private static class Place { ...}
    private static class Human { ...}
    public static void main(String[] args) throws IOException {..}
}
```

`Place` represents a place and will have a `name` property with getter and setter.

Then a `Human` object with `message` and `Place` propert and getter and setter methods.

To convert to our object to json we need an `ObjectMapper` instance:

```java
        ObjectMapper mapper = new ObjectMapper();
```

Then we can easily convert our object to json by invoking the `writeValueAsString()` method,passing in our object.

```java
        String jsonString = mapper.writeValueAsString(human);
```

Then to convert the json data to an object we use the ObjectMapper `readValue()` method:

```java
        Human newHuman = mapper.readValue(jsonString, Human.class);
```

Here's the code:

```java
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.IOException;

/**
 *  Jackson Hello World
 *
  */
public class MrHelloWorld {

    private static class Place {
        private String name;

        public String getName() {
            return name;
        }

        public void setName(String name) {
            this.name = name;
        }
    }
    private static class Human {
        private String message;
        private Place place;

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public Place getPlace() {
            return place;
        }

        public void setPlace(Place place) {
            this.place = place;
        }

        public void say() {
            System.out.println();
            System.out.println(getMessage() + " , " + getPlace().getName() + "!");
        }
    }

    public static void main(String[] args) throws IOException {
        // init class
        Place place = new Place();
        place.setName("World");

        Human human = new Human();
        human.setMessage("Hi");
        human.setPlace(place);

        // convert to json
        ObjectMapper mapper = new ObjectMapper();
        String jsonString = mapper.writeValueAsString(human);
        System.out.println("json " + jsonString); // print "json {"message":"Hi","place":{"name":"World"}}"

        // convert from json
        Human newHuman = mapper.readValue(jsonString, Human.class);
        newHuman.say(); // print "Hi , World!"
    }
}
```

#### Top Quick Java Jackson Examples

##### 1\. Jackson Write and Read JSON using TreeModel

This is an Example of how to read and write JSON data using TreeModel.

TreeModel conceptually has many similarities to DOM XML tree model; although there are also many differences due to structural and semantic differences between JSON and XML.

First let's create a class with three methods:

```java
public class TreeModel {
    public static void main(String[] args) throws IOException {...}
    private static void readJson() throws IOException {...}
    private static void writeJson() throws IOException {...}
}
```

To write JSON using TreeModel first we instantiate a `ByteArrayOutputStream`:

```java
        OutputStream outputStream = new ByteArrayOutputStream();
```

Then instantiate an `ObjectMapper`:

```java
        ObjectMapper mapper = new ObjectMapper();
```

Then create an Object node using the `createObjectNode()` method of the `ObjectMapper` class:

```java
        ObjectNode rootNode = mapper.createObjectNode();
```

First we put our message in our root node of our `ObjectNode`:

```java
        rootNode.put("message", "Hi");
```

Then put the `place` in the child nodes:

```java
        ObjectNode childNode = rootNode.putObject("place");
        childNode.put("name", "World!");
```

And write our childnode into our outputstream, then cast it to string and print it out:

```java
        mapper.writeValue(outputStream, childNode);
        System.out.println(outputStream.toString()); // print "{"message":"Hi","place":{"name":"World!"}}"
    }
```

Then we also read json using the tree model:

```java
    private static void readJson() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readValue("{"message":"Hi","place":{"name":"World!"}}", JsonNode.class);
        String message = rootNode.get("message").asText(); // get property message
        JsonNode childNode =  rootNode.get("place"); // get object Place
        String place = childNode.get("name").asText(); // get property name
        System.out.println(message + " " + place); // print "Hi World!"
    }
```

Here's the full code:

```java
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;

public class TreeModel {
    public static void main(String[] args) throws IOException {
        System.out.print("readJson: ");
        readJson();
        System.out.println();
        System.out.print("writeJson: ");
        writeJson();
    }

    /**
     *  Example to readJson using TreeModel
     */
    private static void readJson() throws IOException {
        ObjectMapper mapper = new ObjectMapper();
        JsonNode rootNode = mapper.readValue("{"message":"Hi","place":{"name":"World!"}}", JsonNode.class);
        String message = rootNode.get("message").asText(); // get property message
        JsonNode childNode =  rootNode.get("place"); // get object Place
        String place = childNode.get("name").asText(); // get property name
        System.out.println(message + " " + place); // print "Hi World!"
    }

    /**
     * Example to writeJson using TreeModel
     */
    private static void writeJson() throws IOException {
        OutputStream outputStream = new ByteArrayOutputStream();

        ObjectMapper mapper = new ObjectMapper();
        ObjectNode rootNode = mapper.createObjectNode();
        rootNode.put("message", "Hi");
        ObjectNode childNode = rootNode.putObject("place");
        childNode.put("name", "World!");
        mapper.writeValue(outputStream, childNode);

        System.out.println(outputStream.toString()); // print "{"message":"Hi","place":{"name":"World!"}}"
    }
}
```

##### 2\. Jackson Write and Read JSON using Streaming API

Let's now look at an example to write and read using JSON Streaming API. Streaming Processing is also known as Incremental Processing.

Here are the advantages of Streaming Processing:

1. It's the most efficient way to process JSON content.
2. It has the lowest memory and processing overhead.
3. It can often match performance of many binary data formats available on Java platform.

Here's our class structure:

```java
public class StreamingAPI {
    private static void writeJson() throws IOException {...}
    private static void readJson() throws IOException {...}
    public static void main(String[] args) throws IOException { }
}
```

Let's start by seeing how write JSON using streaming API. We create a method that will throw an IOException:

```java
    private static void writeJson() throws IOException {
```

Then instantiate the `JsonFactory` class as well as a `ByteArrayOutputStream`:

```java
        JsonFactory jsonFactory = new JsonFactory();
        OutputStream outputStream = new ByteArrayOutputStream();
```

Then create our `JsonGenerator` using the `createGenerator()` method of the `JsonFactory`. We will pass our `ByteArrayOutputStream` object as well as the JSON encoding:

```java
        JsonGenerator jsonGenerator = jsonFactory.createGenerator(outputStream, JsonEncoding.UTF8); // or Stream, Reader
```

Then write our start object, our string field name, then end the object, close our JsonGenerator and print out our toString() version of ByteArrayOutputStream.

All writing is by using JsonGenerator (or its sub-classes, in case of data formats other than JSON), instance of which is constructed by JsonFactory:

```java
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("message", "Hi");
        jsonGenerator.writeFieldName("place");
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("name", "World!");
        jsonGenerator.writeEndObject();
        jsonGenerator.writeEndObject();
        jsonGenerator.close();
        System.out.println(outputStream.toString()); // print "{"message":"Hi","place":{"name":"World!"}}"
    }
```

Let's also see how to read json using the JSON Streaming API:

```java
    private static void readJson() throws IOException {
        JsonFactory jsonFactory = new JsonFactory();
        JsonParser jsonParser = jsonFactory.createParser("{"message":"Hi","place":{"name":"World!"}}");
        JsonToken jsonToken = jsonParser.nextToken();
        while(jsonParser.hasCurrentToken()) {
            if(jsonToken == VALUE_STRING) {
                System.out.print(jsonParser.getText() + " "); // print "Hi World!"
            }
            jsonToken = jsonParser.nextToken();
        }
        System.out.println();
    }
```

Here's the full code:

```java
import com.fasterxml.jackson.core.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import static com.fasterxml.jackson.core.JsonToken.VALUE_STRING;

public class StreamingAPI {
    public static void main(String[] args) throws IOException {
        System.out.print("readJson: ");
        readJson();
        System.out.println();
        System.out.print("writeJson: ");
        writeJson();
    }

    /**
     *  Example to readJson using StreamingAPI
     */
    private static void readJson() throws IOException {
        JsonFactory jsonFactory = new JsonFactory();
        JsonParser jsonParser = jsonFactory.createParser("{"message":"Hi","place":{"name":"World!"}}");
        JsonToken jsonToken = jsonParser.nextToken();
        while(jsonParser.hasCurrentToken()) {
            if(jsonToken == VALUE_STRING) {
                System.out.print(jsonParser.getText() + " "); // print "Hi World!"
            }
            jsonToken = jsonParser.nextToken();
        }
        System.out.println();
    }

    /**
     * Example to writeJson using StreamingAPI
     */
    private static void writeJson() throws IOException {
        JsonFactory jsonFactory = new JsonFactory();
        OutputStream outputStream = new ByteArrayOutputStream();
        JsonGenerator jsonGenerator = jsonFactory.createGenerator(outputStream, JsonEncoding.UTF8); // or Stream, Reader
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("message", "Hi");
        jsonGenerator.writeFieldName("place");
        jsonGenerator.writeStartObject();
        jsonGenerator.writeStringField("name", "World!");
        jsonGenerator.writeEndObject();
        jsonGenerator.writeEndObject();
        jsonGenerator.close();
        System.out.println(outputStream.toString()); // print "{"message":"Hi","place":{"name":"World!"}}"
    }
}
```
