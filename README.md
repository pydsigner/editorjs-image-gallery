<div align="center">

![](/assets/logo_small.png "editorjs-image-gallery")

</div>


# Image Gallery Tool for Editor.js

Image Gallery Tool is a plugin for [Editor.js](https://editorjs.io) that provides an Image Gallery Block with a flexible layout.

The gallery operates on image URLs and does not require a server-side uploader, but offers a way to integrate one.

![](/assets/editorjs-image-gallery.webm)

The gallery also supports drag and drop to rearrange images and one-click image removal.

## Installation

### Install via NPM

Get the package:

```shell
npm i @d48io/editorjs-image-gallery
```

Include module in your application:

```javascript
import {ImageGallery} from '@d48io/editorjs-image-gallery';
```

### Include as CJS script

Download `dist/bundle.js` and add to your project:
```html
<script src="/static/editorjs-image-gallery/bundle.js"></script>
```

Or load from a CDN:
```html
<script src="https://cdn.jsdelivr.net/npm/@d48io/editorjs-image-gallery@latest"></script>
```

Then add to your Editor:
```html
<script>
var editor = EditorJS({
  ...
  tools: {
    ...
    imageGallery: imageGallery.ImageGallery,
  }
});
```

## Config Params

This tool accepts one optional configuration parameter, a function that returns a promise for an array of URLs to add to the gallery:

```js
{
  addImages: () => {
    return new Promise((resolve, reject) => {
      resolve([
        "https://picsum.photos/300/200",
        "https://picsum.photos/200/300",
      ]);
    }
  }
}
```

If this parameter is supplied, the default text entry for URLs is disabled.

## Tool's settings

![](/assets/options_small.png)

1. Show and hide image urls
2. Activate/Deactivate dark mode
3. Set default layout
4. Set horizontal layout
5. Set square layout
6. Set layout with gap
7. Set layout width fixed size

&nbsp;
&nbsp;
&nbsp;

## Output data

| Field               | Type       | Description                   |
| ------------------- | ---------- | ----------------------------- |
| urls                | `string[]` | image's url                   |
| editImages          | `boolean`  | Show and hide image urls      |
| bkgMode             | `boolean`  | Activate/Deactivate dark mode |
| layoutDefault       | `boolean`  | Set default layout            |
| layoutHorizontal    | `boolean`  | Set horizontal layout         |
| layoutSquare        | `boolean`  | Set square layout             |
| layoutWithGap       | `boolean`  | Set layout with gap           |
| layoutWithFixedSize | `boolean`  | Set layout width fixed size   |


```json
{
  "type": "imageGallery",
  "data": {
    "urls": [
      "https://wallpapercave.com/wp/6L4TVMP.jpg",
      "https://wallpapercave.com/wp/wp9810772.jpg",
      "https://wallpapercave.com/wp/wp9121482.jpg",
      "https://wallpapercave.com/wp/wp9100484.jpg",
      "https://cdn.wallpapersafari.com/94/22/4H3mFp.jpg"
    ],
    "editImages": true,
    "bkgMode": false,
    "layoutDefault": true,
    "layoutHorizontal": false,
    "layoutSquare": false,
    "layoutWithGap": false,
    "layoutWithFixedSize": false
  }
}
```

## LICENSE

[MIT License](/LICENSE)
