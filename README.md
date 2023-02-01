## Feature

This plugin will help you remove the hash from a bundle file name(only support parcel v2.x).

## Why

If you are using parcel to package files, you may encounter the following situations.
When you package index.html that references other files, parcel treats those files as shared bundles and adds a hash to the file name by default, even if you set `--no-content-hash` in package.json.

So when you need a filename without any hash value, using this plugin can help you. For example, when you are developing a web browser extension, you need all file names to be stable and hashless

## Installation

`npm install --save-dev parcel-namer-hashless`

`yarn add parcel-namer-hashless -D`

## Useage

Edit .parcelrc file to add new namer:

```
/* .parcelrc */
{
  "extends": "@parcel/config-default",
  "namers": [ "parcel-namer-hashless" ]
}
```

## Configuration


`parcel-namer-hashless` exists as an optional field in package.json.

If you want to remove the hash values of all filenames, ignore this field.

If you want precise control over certain files, you can configure the `include` or `exclude` field

`include: string[]`: The file that you want to remove the hash from
`exclude: string[]`: The file that you don't want to remove the hash from

use regular expressions
```
// package.json

"parcel-namer-hashless": {
    "include": [".js$", ".css$", '.card.png$']
}
// or
"parcel-namer-hashless": {
    "exclude": [".css$"]
}
// or
"parcel-namer-hashless": {
  "include": [".js$", ".css$", '.card.png$']
  "exclude": [".background.png$"]
}
 
```

`mode` allows you to control which environments take effect
`mode: 'all' | 'development' | 'production'`: `production` as default.
```
// package.json

"parcel-namer-hashless": {
    "include": [".js$", ".css$", '.card.png$'],
    "mode": 'all'
}
 
```

## Result

If you run the plugin successfully, the terminal will output：

```
parcel-namer-hashless: index.794a6267.js -> index.js
```
