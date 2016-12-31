Properly Verify
===============

Properly is a simple property object verification tool. You use it to verify that a properties object has all the right properties.

Install
-------

```
npm install properly-verify
```

Usage
-----

```javascript

const properly = require('properly-verify');

var myFunction = function(propertiesToVerify) {
  var properties = properly.check(propertiesToVerify)
    .require('a') // requires the object have a property, a
    .requireNonNull('b') // requires the object have a non-null property b
    .optional('c') // adds the optional property test
    .optional('d', 3) // adds the optional property, d, with a default of 3
    .validate(); // validates the properties and gives you back the object

  // use properties here, knowing you can safely access required members
}

```

If a property is required but not found, an [Error](https://nodejs.org/api/errors.html#errors_errors) will be thrown.

Validate and Close
------------------

In the above example, validate can be replaced with close(). This will give you back your properties object without doing any validation.

Intermediate Validation
-----------------------

If at any point in the validation process you want to stop and do some validation yourself, you can.

After calling properly.check(properties), you get back an object with the form:

```javascript

{
  'properties': Object, // The original properties object
  'missing': [String], // Any properties missing
  'failed': Boolean // If any of the previous validation steps failed
}

```

Missing gets entries added to it as they fail to meet requirements. For example:

```javascript

properly.check({})
  .require('a')
  .optional('b')
  .optional('c', 4);

// properly.missing = ['a', 'b']

```

Here, a and b are missing because they weren't found. C is not missing, because it's default value of four was used instead.
