# Converting from JS

ReScript offers a unique project conversion methodology which:

* Ensures minimal disruption to your teammates (very important!).
* Remove the typical friction of verifying conversion's correctness and performance guarantees.
* Doesn't force you to search for pre-made binding libraries made by others. **ReScript doesn't need the equivalent of TypeScript's `DefinitelyTyped`**.

## Step 1: Install ReScript

Run `npm install rescript` on your project, then imitate our [New Project](installation#new-project) workflow by adding a `bsconfig.json` at the root. Then start `npx rescript build -w`.

## Step 2: Copy Paste the Entire JS File

Let's work on converting a file called `src/main.js`.


```javascript
JS

`const school = require('school');

const defaultId = 10;

function queryResult(usePayload, payload) {
 if (usePayload) {
 return payload.student;
 } else {
 return school.getStudentById(defaultId);
 }
}`


```
First, copy the entire file content over to a new file called `src/Main.res` by using our [`%%raw` JS embedding trick](embed-raw-javascript):


```javascript
%%raw(`
const school = require('school');

const defaultId = 10;

function queryResult(usePayload, payload) {
  if (usePayload) {
    return payload.student;
  } else {
    return school.getStudentById(defaultId);
  }
}
`)

```
Add this file to `bsconfig.json`:


```javascript
JSON

 `"sources": {
 "dir" : "src",
 "subdirs" : true
 },`


```
Open an editor tab for `src/Main.bs.js`. Do a command-line `diff -u src/main.js src/Main.bs.js`. Aside from whitespaces, you should see only minimal, trivial differences. You're already a third of the way done!

**Always make sure** that at each step, you keep the ReScript output `.bs.js` file open to compare against the existing JavaScript file. Our compilation output is very close to your hand-written JavaScript; you can simply eye the difference to catch conversion bugs!

## Step 3: Extract Parts into Idiomatic ReScript

Let's turn the `defaultId` variable into a ReScript let-binding:


```javascript
let defaultId = 10

%%raw(`
const school = require('school');

function queryResult(usePayload, payload) {
  if (usePayload) {
    return payload.student;
  } else {
    return school.getStudentById(defaultId);
  }
}
`)

```
Check the output. Diff it. Code still works. Moving on! Extract the function:


```javascript
%%raw(`
const school = require('school');
`)

let defaultId = 10

let queryResult = (usePayload, payload) => {
 if usePayload {
 payload.student
 } else {
 school.getStudentById(defaultId)
 }
}

```
Format the code: `./node_modules/.bin/rescript format src/Main.res`.

We have a type error: "The record field student can't be found". That's fine! **Always ensure your code is syntactically valid first**. Fixing type errors comes later.

## Step 4: Add `external`s, Fix Types

The previous type error is caused by `payload`'s record declaration (which supposedly contains the field `student`) not being found. Since we're trying to convert as quickly as possible, let's use our <object> feature to avoid needing type declaration ceremonies:


```javascript
%%raw(`
const school = require('school');
`)

let defaultId = 10

let queryResult = (usePayload, payload) => {
 if usePayload {
 payload["student"]
 } else {
 school["getStudentById"](. defaultId)
 }
}

```
Now this triggers the next type error, that `school` isn't found. Let's use [`external`](external) to bind to that module:


```javascript
@module external school: 'whatever = "school"

let defaultId = 10

let queryResult = (usePayload, payload) => {
  if usePayload {
    payload["student"]
  } else {
    school["getStudentById"](. defaultId)
  }
}

```
We hurrily typed `school` as a polymorphic `'whatever` and let its type be inferred by its usage below. The inference is technically correct, but within the context of bringing it a value from JavaScript, slightly dangerous. This is just the interop trick we've shown in the [`external`](external) page.

Anyway, the file passes the type checker again. Check the `.bs.js` output, diff with the original `.js`; we've now converted a file over to ReScript!

Now, you can delete the original, hand-written `main.js` file, and grep the files importing `main.js` and change them to importing `Main.bs.js`.

## (Optional) Step 5: Cleanup

If you prefer more advanced, rigidly typed `payload` and `school`, feel free to do so:


```javascript
type school
type student
type payload = {
  student: student
}

@module external school: school = "school"
@send external getStudentById: (school, int) => student = "getStudentById"

let defaultId = 10

let queryResult = (usePayload, payload) => {
  if usePayload {
    payload.student
  } else {
    school->getStudentById(defaultId)
  }
}

```
We've:

* introduced an opaque types for `school` and `student` to prevent misusages their values
* typed the payload as a record with only the `student` field
* typed `getStudentById` as the sole method of `student`

Check that the `.bs.js` output didn't change. How rigidly to type your JavaScript code is up to you; we recommend not typing them too elaborately; it's sometime an endless chase, and produces diminishing returns, especially considering that the elaborate-ness might turn off your potential teammates.

## Tips & Tricks

In the same vein of idea, **resist the urge to write your own wrapper functions for the JS code you're converting**. Use [`external`s](external), which are guaranteed to be erased in the output. And avoid trying to take the occasion to convert JS data structures into ReScript-specific data structures like variant or list. **This isn't the time for that**.

The moment you produce extra conversion code in the output, your skeptical teammate's mental model might switch from "I recognize this output" to "this conversion might be introducing more problems than it solves. Why are we testing ReScript again?". Then you've lost.

## Conclusion

* Paste the JS code into a new ReScript file as embedded raw JS code.
* Compile and keep the output file open. Check and diff against original JS file. Free regression tests.
* Always make sure your file is syntactically valid. Don't worry about fixing types before that.
* (Ab)use <object> accesses to quickly convert things over.
* Optionally clean up the types for robustness.
* Don't go overboard and turn off your boss and fellow teammates.
* Proudly display that you've conserved the semantics and performance characteristics during the conversion by showing your teammates the eerily familiar output.
* Get promoted for introducing a new technology the safer, mature way.


