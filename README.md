## Feature

This plugin will help you remove the hash from a bundle file name(parcel v2).

## Why

If you are using parcel to package files, you may encounter the following situations.
When you package index.html that references other files, parcel treats those files as shared bundles and adds a hash to the file name by default, even if you set --no-content-hash in package.json.

So when you need a filename without any hash value, using this plugin can help you. For example, when you are developing a web browser extension, you need all file names to be stable and hashless

## Installation

`npm install --save-dev parcel-namer-hashless -D`

## Useage

Edit .parcelrc file to add new namer:

```
/* .parcelrc */
{
  "extends": "@parcel/config-default",
  "namers": [ "parcel-namer-rewrite" ]
}
```

## Result

If you run the plugin successfully, the terminal will output：

```
parcel-namer-hashless: index.794a6267.js -> index.js
```
