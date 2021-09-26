<div align="center">
<img width="400" src="https://i.ibb.co/PtY33xF/logo-small.png" alt="editorjs-image-gallery logo">
<br><br>
<img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" >
<img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" >
<img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" >
<br><br><br>
<a href="#"><img src="https://img.shields.io/badge/Editor.js-2.22.2-blue"></a>
<a href="https://paypal.me/rodrigoodhin"><img src="https://img.shields.io/badge/donate-PayPal-blue"></a>
</div>


# Image Gallery Tool for Editor.js  

Image Gallery Tool is a plugin for [Editor.js](https://editorjs.io) that's provides an Image Gallery Block and using the available options, it's possible to adapt the layout as you like.

Works only with image URLs and requires no server-side uploader.

![](https://i.ibb.co/DWMtSG2/image-gallery-01-small.gif)
![](https://i.ibb.co/mz2hMgQ/image-gallery-02-small.gif)
![](https://i.ibb.co/HP8k3YD/image-gallery-03-small.gif)
![](https://i.ibb.co/vXLFy89/image-gallery-04-small.gif)

&nbsp;
&nbsp;
&nbsp;

## Installation

### Install via NPM

Get the package

```shell
npm i --save-dev @rodrigoodhin/editorjs-image-gallery
```

Include module at your application

```javascript
const ImageGallery = require('@rodrigoodhin/editorjs-image-gallery');
```

&nbsp;
&nbsp;
&nbsp;

### Download to your project's source dir

1. Upload folder `dist` from repository
2. Add `dist/bundle.js` file to your page.

&nbsp;
&nbsp;
&nbsp;

### Load from CDN

You can load specific version of package from [jsDelivr CDN](https://www.npmjs.com/package/@rodrigoodhin/editorjs-image-gallery).

`https://cdn.jsdelivr.net/npm/@rodrigoodhin/editorjs-image-gallery@latest`

Then require this script on page with Editor.js.

```html
<script src="..."></script>
```

&nbsp;
&nbsp;
&nbsp;

## Usage

Add a new Tool to the `tools` property of the Editor.js initial config.

```javascript
var editor = EditorJS({
  ...
  
  tools: {
    ...
    imageGallery: ImageGallery,
  }
  
  ...
});
```

&nbsp;
&nbsp;
&nbsp;

## Config Params

This Tool has no config params

&nbsp;
&nbsp;
&nbsp;

## Tool's settings

![](https://i.ibb.co/zFhjngg/options-small.png)

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
| urls                | `[]string` | image's url                   |
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
      "https://www.nawpic.com/media/2020/ocean-nawpic-15.jpg",
      "https://www.nawpic.com/media/2020/ocean-nawpic-18.jpg",
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

&nbsp;
&nbsp;
&nbsp;

## Example

[JSFiddle with an example](https://jsfiddle.net/rodrigoodhin/1mr32g8n/19)

&nbsp;
&nbsp;
&nbsp;

## LICENSE

[MIT License](/LICENSE)
