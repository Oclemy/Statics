# AMP Validation


AMP pages are automatically validated with amphtml-validator during development. Errors and warnings will appear in the terminal where you started Next.js.


Pages are also validated during [Static HTML export and any warnings / errors will be printed to the terminal. Any AMP errors will cause the export to exit with status code `1` because the export is not valid AMP.


You can set up custom AMP validator in `next.config.js` as shown below:



```javascript
module.exports = {
  amp: {
    validator: './custom_validator.js',
  },
}

```

To turn off AMP validation add the following code to `next.config.js`



```javascript
experimental: {
  amp: {
    skipValidation: true
  }
}

```



