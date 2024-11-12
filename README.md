<h1 align="center">
parcel-namer-hashless
</h1>

<div align="center">

![](https://flat.badgen.net/npm/v/parcel-namer-hashless) ![npm](https://flat.badgen.net/npm/dm/parcel-namer-hashless) ![](https://flat.badgen.net/npm/license/parcel-namer-hashless) 

</div>

## Feature

This plugin will help you remove the hash from a bundle file name(only support parcel v2.x).

> Note: since v1.0.4, need your parcel >= v2.8.3

## Why

If you are using parcel to package files, you may encounter the following situations.
When you package index.html that references other files, parcel treats those files as shared bundles and adds a hash to the file name by default, even if you set `--no-content-hash` in package.json.

So when you need a filename without any hash value, using this plugin can help you. For example, when you are developing a web browser extension, you need all file names to be stable and hashless

## Installation

npm:
`npm i parcel-namer-hashless -D`

yarn:
`yarn add parcel-namer-hashless -D`

pnpm:
`pnpm add parcel-namer-hashless -D`

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

- `include: string[]`: The file that you want to remove the hash from
- `exclude: string[]`: The file that you don't want to remove the hash from

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
- `mode: 'all' | 'development' | 'production'`: `production` as default.
```
// package.json

"parcel-namer-hashless": {
    "include": [".js$", ".css$", '.card.png$'],
    "mode": 'all'
}
```

`log` allows you to disable logging info.
- `log: true | false`: `true` as default
  
```
// package.json

"parcel-namer-hashless": {
    "log": false
}

```

## Result

If you run the plugin successfully, the terminal will output：

```
parcel-namer-hashless: index.794a6267.js -> index.js
```

## Issue
- Error: Bundles must have unique names: There is a <script> tag in your index.html file. In this case, parcel will generate a index.js file. So if you have another <script> tag to import 'main.ts', parcel will generate two index.js file. But we should notice that the first index.js file will not output as a file in your dist. So i delete your first <script> tag, then everything works fine.
