## Feature

This plugin will help you remove the hash from a bundle file name(only support parcel v2).

## Why

If you are using parcel to package files, you may encounter the following situations.
When you package index.html that references other files, parcel treats those files as shared bundles and adds a hash to the file name by default, even if you set `--no-content-hash` in package.json.

So when you need a filename without any hash value, using this plugin can help you. For example, when you are developing a web browser extension, you need all file names to be stable and hashless

## Installation

`npm install --save-dev parcel-namer-hashless`

## Useage

Edit .parcelrc file to add new namer:

```
/* .parcelrc */
{
  "extends": "@parcel/config-default",
  "namers": [ "parcel-namer-hashless" ]
}
```

If you want to packge your index.html, make sure add "source" to your package.json:

```
/* package.json */
{
  "source": "src/index.html"
}
```

## development

If you are running in development, hash can not be removed.
(cause parcel need every file has a unique name);

## Result

If you run the plugin successfully, the terminal will output：

```
parcel-namer-hashless: index.794a6267.js -> index.js
```
