# Utilities



Blitz provides some handy utility functions

## `validateZodSchema`

This utility function will validate input using a
[`zod`](https://github.com/colinhacks/zod) schema, and format any errors
to be usable with your form library.

This is currently compatible with both React Final Form and Formik and any
others with the same API.

### Example


```typescript
import {validateZodSchema} from 'blitz'

<FinalForm
  initialValues={initialValues}
  validate={validateZodSchema(schema)}
  ...
```
### API


```typescript
const validationFunction = validateZodSchema(MyZodSchema)
```
#### Arguments

* `ZodSchema:` a [zod](https://github.com/colinhacks/zod) schema
	+ **Required**
* `parserType:` pass in either the string "sync" or "async" to this
parameter to indicate the type of parsing that must be performed. If
omitted, it defaults to async
	+ **Optional**

#### Returns

A validation function to pass to a Form component's `validate` prop. It
accepts some values and returns an Promise or object containing any
errors.


```typescript
(values: any, parserType?: "sync" | "async") =>  Promise<Object> | Object
```

> **Note**: Passing in a variable that could be either "sync" or "async"
> is currently not supported. You need to explicitly pass in either "sync"
> or "async" if you are using the optional parserType parameter.
> 
> Please open an issue on Github if you have a compelling use case for
> this feature
> 
> 

## `formatZodError`

This utility function will take a ZodError and format it nicely to be
usable with your form library.

This is currently compatible with both React Final Form and Formik and any
others with the same API.

### Example


```typescript
import {formatZodError} from 'blitz'

<FinalForm
  initialValues={initialValues}
  validate={values => {
    try {
      schema.parse(values)
    } catch (error) {
      return formatZodError(error)
    }
  }}
  ...
```
### API


```typescript
const formattedErrorsObject = formatZodError(myZodError)
```
#### Arguments

* `ZodError:` a [zod](https://github.com/colinhacks/zod) error
	+ **Required**

#### Returns

An object with errors that makes the same shape as the original schema



---

