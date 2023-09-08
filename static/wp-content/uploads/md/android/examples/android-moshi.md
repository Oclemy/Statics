# Android Moshi Tutorial and Examples

_Moshi Tutorial and Examples._

> Moshi is a modern JSON library for Android and Java.


Moshi is able to read and write Java core's data types

1. Primitives (int, float, char...) and their boxed counterparts (Integer, Float, Character...).
2. Arrays, Collections, Lists, Sets, and Maps
3. Strings
4. Enums

It's very easy to customize how values are converted to and from JSON.

A type adapter is any class that has methods annotated `@ToJson` and `@FromJson`.

Morevover Moshi is designed to help you out when things go wrong.

It does this by always throwing a standard `java.io.IOException` if there is an error reading the JSON document, or if it is malformed. It throws a `JsonDataException` if the JSON document is well-formed, but doesn't match the expected format.

Moshi also uses Okio for simple and powerful I/O. It’s a fine complement to OkHttp, which can share buffer segments for maximum efficiency.

Moshi is very similar to Gson. It uses the same streaming and binding mechanisms as Gson.

Basically it helps us easily parse JSON into Java objects:

```java
String json = ...;

Moshi moshi = new Moshi.Builder().build();
JsonAdapter<BlackjackHand> jsonAdapter = moshi.adapter(BlackjackHand.class);

BlackjackHand blackjackHand = jsonAdapter.fromJson(json);
System.out.println(blackjackHand);
```

It also allows us easily serialize java objects into JSON:

```java
BlackjackHand blackjackHand = new BlackjackHand(
    new Card('6', SPADES),
    Arrays.asList(new Card('4', CLUBS), new Card('A', HEARTS)));

Moshi moshi = new Moshi.Builder().build();
JsonAdapter<BlackjackHand> jsonAdapter = moshi.adapter(BlackjackHand.class);

String json = jsonAdapter.toJson(blackjackHand);
System.out.println(json);
```

#### Moshi Hello World

Let's look at a hello world in moshi.

```java
import com.squareup.moshi.JsonAdapter;
import com.squareup.moshi.Moshi;

import java.io.IOException;

/**
 *  Moshi Hello World
 *
  */
public class MoshiHelloWorld {
    public static void main(String[] args) throws IOException {
        // init class
        Destination destination = new Destination();
        destination.setName("Alpha Centauri");

        Starcraft starcraft = new Starcraft();
        starcraft.setName("Enterprise");
        starcraft.setDestination(destination);

        // convert to json
        Moshi moshi = new Moshi.Builder().build();
        JsonAdapter<Starcraft> jsonAdapter = moshi.adapter(Starcraft.class);

        String jsonString = jsonAdapter.toJson(starcraft);
        System.out.println("json " + jsonString); //print "json {"name":"Enterprise","destination":{"name":"Alpha Centauri"}}"

        // convert from json
        Starcraft newStarcraft = jsonAdapter.fromJson(jsonString);
        newStarcraft.show(); // print "Enterprise , Alpha Centauri!"
    }

    private static class Starcraft {
        private String name;
        private Destination destination;

        String getName() {
            return name;
        }

        void setName(String name) {
            this.name = name;
        }

        Destination getDestination() {
            return destination;
        }

        void setDestination(Destination destination) {
            this.destination = destination;
        }

        void show() {
            System.out.println();
            System.out.println(getName() + " , " + getDestination().getName() + "!");
        }
    }

    private static class Destination {
        private String name;

        String getName() {
            return name;
        }

        void setName(String name) {
            this.name = name;
        }
    }

}
```

## More Examples

Here are more examples

[loop type=example taxonomy=post_tag term=moshi orderby=date order=asc]

## [loop-count]. [field title]

[content]

[Read Individually.]([field url])

* * *

[/loop]
