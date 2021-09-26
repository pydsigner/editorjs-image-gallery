/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.css":
/*!***********************!*\
  !*** ./src/index.css ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("throw new Error(\"Module parse failed: Unexpected token (1:0)\\nYou may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. See https://webpack.js.org/concepts#loaders\\n> .cdx-simple-image {}\\n| \\n| .cdx-simple-image .cdx-loader {\");\n\n//# sourceURL=webpack:///./src/index.css?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * Build styles\n */\n__webpack_require__(/*! ./index.css */ \"./src/index.css\").toString();\n\n/**\n * ImageGallery Tool for the Editor.js\n * Works only with pasted image URLs and requires no server-side uploader.\n *\n * @typedef {object} ImageGalleryData\n * @description Tool's input and output data format\n * @property {string} url — image URL\n * @property {string} caption — image caption\n * @property {boolean} withBorder - should image be rendered with border\n * @property {boolean} withBackground - should image be rendered with background\n * @property {boolean} stretched - should image be stretched to full width of container\n */\nclass ImageGallery {\n    /**\n     * Render plugin`s main Element and fill it with saved data\n     *\n     * @param {{data: ImageGalleryData, config: object, api: object}}\n     *   data — previously saved data\n     *   config - user config for Tool\n     *   api - Editor.js API\n     *   readOnly - read-only mode flag\n     */\n    constructor({ data, config, api, readOnly }) {\n        /**\n         * Editor.js API\n         */\n        this.api = api;\n        this.readOnly = readOnly;\n\n        /**\n         * When block is only constructing,\n         * current block points to previous block.\n         * So real block index will be +1 after rendering\n         *\n         * @todo place it at the `rendered` event hook to get real block index without +1;\n         * @type {number}\n         */\n        this.blockIndex = this.api.blocks.getCurrentBlockIndex() + 1;\n\n        /**\n         * Styles\n         */\n        this.CSS = {\n            baseClass: this.api.styles.block,\n            loading: this.api.styles.loader,\n            input: this.api.styles.input,\n            settingsButton: this.api.styles.settingsButton,\n            settingsButtonActive: this.api.styles.settingsButtonActive,\n\n            /**\n             * Tool's classes\n             */\n            wrapper: 'cdx-simple-image',\n            imageHolder: 'cdx-simple-image__picture',\n            caption: 'cdx-simple-image__caption',\n        };\n\n        /**\n         * Nodes cache\n         */\n        this.nodes = {\n            wrapper: null,\n            imageHolder: null,\n            image: null,\n            caption: null,\n        };\n\n        /**\n         * Tool's initial data\n         */\n        this.data = {\n            url: data.url || '',\n            caption: data.caption || '',\n            optDarkMode: data.optDarkMode !== undefined ? data.optDarkMode : false,\n            optHorizontalLayout: data.optHorizontalLayout !== undefined ? data.optHorizontalLayout : false,\n            optSquareLayout: data.optSquareLayout !== undefined ? data.optSquareLayout : false,\n            optWithGap: data.optWithGap !== undefined ? data.optWithGap : false,\n            optFixedSize: data.optFixedSize !== undefined ? data.optFixedSize : false,\n        };\n\n        /**\n         * Available Image settings\n         */\n        this.settings = [\n            {\n                name: 'optDarkMode',\n                icon: `<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15.8 10.592v2.043h2.35v2.138H15.8v2.232h-2.25v-2.232h-2.4v-2.138h2.4v-2.28h2.25v.237h1.15-1.15zM1.9 8.455v-3.42c0-1.154.985-2.09 2.2-2.09h4.2v2.137H4.15v3.373H1.9zm0 2.137h2.25v3.325H8.3v2.138H4.1c-1.215 0-2.2-.936-2.2-2.09v-3.373zm15.05-2.137H14.7V5.082h-4.15V2.945h4.2c1.215 0 2.2.936 2.2 2.09v3.42z\"/></svg>`,\n            },\n            {\n                name: 'optHorizontalLayout',\n                icon: `<svg width=\"17\" height=\"10\" viewBox=\"0 0 17 10\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z\"/></svg>`,\n            },\n            {\n                name: 'optSquareLayout',\n                icon: `<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10.043 8.265l3.183-3.183h-2.924L4.75 10.636v2.923l4.15-4.15v2.351l-2.158 2.159H8.9v2.137H4.7c-1.215 0-2.2-.936-2.2-2.09v-8.93c0-1.154.985-2.09 2.2-2.09h10.663l.033-.033.034.034c1.178.04 2.12.96 2.12 2.089v3.23H15.3V5.359l-2.906 2.906h-2.35zM7.951 5.082H4.75v3.201l3.201-3.2zm5.099 7.078v3.04h4.15v-3.04h-4.15zm-1.1-2.137h6.35c.635 0 1.15.489 1.15 1.092v5.13c0 .603-.515 1.092-1.15 1.092h-6.35c-.635 0-1.15-.489-1.15-1.092v-5.13c0-.603.515-1.092 1.15-1.092z\"/></svg>`,\n            },\n            {\n                name: 'optWithGap',\n                icon: `<svg width=\"17\" height=\"10\" viewBox=\"0 0 17 10\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M13.568 5.925H4.056l1.703 1.703a1.125 1.125 0 0 1-1.59 1.591L.962 6.014A1.069 1.069 0 0 1 .588 4.26L4.38.469a1.069 1.069 0 0 1 1.512 1.511L4.084 3.787h9.606l-1.85-1.85a1.069 1.069 0 1 1 1.512-1.51l3.792 3.791a1.069 1.069 0 0 1-.475 1.788L13.514 9.16a1.125 1.125 0 0 1-1.59-1.591l1.644-1.644z\"/></svg>`,\n            },\n            {\n                name: 'optFixedSize',\n                icon: `<svg width=\"20\" height=\"20\" viewBox=\"0 0 20 20\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M10.043 8.265l3.183-3.183h-2.924L4.75 10.636v2.923l4.15-4.15v2.351l-2.158 2.159H8.9v2.137H4.7c-1.215 0-2.2-.936-2.2-2.09v-8.93c0-1.154.985-2.09 2.2-2.09h10.663l.033-.033.034.034c1.178.04 2.12.96 2.12 2.089v3.23H15.3V5.359l-2.906 2.906h-2.35zM7.951 5.082H4.75v3.201l3.201-3.2zm5.099 7.078v3.04h4.15v-3.04h-4.15zm-1.1-2.137h6.35c.635 0 1.15.489 1.15 1.092v5.13c0 .603-.515 1.092-1.15 1.092h-6.35c-.635 0-1.15-.489-1.15-1.092v-5.13c0-.603.515-1.092 1.15-1.092z\"/></svg>`,\n            },\n        ];\n    }\n\n    /**\n     * Creates a Block:\n     *  1) Show preloader\n     *  2) Start to load an image\n     *  3) After loading, append image and caption input\n     *\n     * @public\n     */\n    render() {\n        const wrapper = this._make('div', [this.CSS.baseClass, this.CSS.wrapper]),\n            loader = this._make('div', this.CSS.loading),\n            imageHolder = this._make('div', this.CSS.imageHolder),\n            image = this._make('img'),\n            caption = this._make('div', [this.CSS.input, this.CSS.caption], {\n                contentEditable: !this.readOnly,\n                innerHTML: this.data.caption || '',\n            });\n\n        caption.dataset.placeholder = 'Enter a caption';\n\n        wrapper.appendChild(loader);\n\n        if (this.data.url) {\n            image.src = this.data.url;\n        }\n\n        image.onload = () => {\n            wrapper.classList.remove(this.CSS.loading);\n            imageHolder.appendChild(image);\n            wrapper.appendChild(imageHolder);\n            wrapper.appendChild(caption);\n            loader.remove();\n            this._acceptTuneView();\n        };\n\n        image.onerror = (e) => {\n            // @todo use api.Notifies.show() to show error notification\n            console.log('Failed to load an image', e);\n        };\n\n        this.nodes.imageHolder = imageHolder;\n        this.nodes.wrapper = wrapper;\n        this.nodes.image = image;\n        this.nodes.caption = caption;\n\n        return wrapper;\n    }\n\n    /**\n     * @public\n     * @param {Element} blockContent - Tool's wrapper\n     * @returns {ImageGalleryData}\n     */\n    save(blockContent) {\n        const image = blockContent.querySelector('img'),\n            caption = blockContent.querySelector('.' + this.CSS.input);\n\n        if (!image) {\n            return this.data;\n        }\n\n        return Object.assign(this.data, {\n            url: image.src,\n            caption: caption.innerHTML,\n        });\n    }\n\n    /**\n     * Sanitizer rules\n     */\n    static get sanitize() {\n        return {\n            url: {},\n            withBorder: {},\n            withBackground: {},\n            stretched: {},\n            caption: {\n                br: true,\n            },\n        };\n    }\n\n    /**\n     * Notify core that read-only mode is suppoorted\n     *\n     * @returns {boolean}\n     */\n    static get isReadOnlySupported() {\n        return true;\n    }\n\n    /**\n     * Read pasted image and convert it to base64\n     *\n     * @static\n     * @param {File} file\n     * @returns {Promise<ImageGalleryData>}\n     */\n    onDropHandler(file) {\n        const reader = new FileReader();\n\n        reader.readAsDataURL(file);\n\n        return new Promise(resolve => {\n            reader.onload = (event) => {\n                resolve({\n                    url: event.target.result,\n                    caption: file.name,\n                });\n            };\n        });\n    }\n\n    /**\n     * On paste callback that is fired from Editor.\n     *\n     * @param {PasteEvent} event - event with pasted config\n     */\n    onPaste(event) {\n        switch (event.type) {\n            case 'tag': {\n                const img = event.detail.data;\n\n                this.data = {\n                    url: img.src,\n                };\n                break;\n            }\n\n            case 'pattern': {\n                const { data: text } = event.detail;\n\n                this.data = {\n                    url: text,\n                };\n                break;\n            }\n\n            case 'file': {\n                const { file } = event.detail;\n\n                this.onDropHandler(file)\n                    .then(data => {\n                        this.data = data;\n                    });\n\n                break;\n            }\n        }\n    }\n\n    /**\n     * Returns image data\n     *\n     * @returns {ImageGalleryData}\n     */\n    get data() {\n        return this._data;\n    }\n\n    /**\n     * Set image data and update the view\n     *\n     * @param {ImageGalleryData} data\n     */\n    set data(data) {\n        this._data = Object.assign({}, this.data, data);\n\n        if (this.nodes.image) {\n            this.nodes.image.src = this.data.url;\n        }\n\n        if (this.nodes.caption) {\n            this.nodes.caption.innerHTML = this.data.caption;\n        }\n    }\n\n    /**\n     * Specify paste substitutes\n     *\n     * @see {@link ../../../docs/tools.md#paste-handling}\n     * @public\n     */\n    static get pasteConfig() {\n        return {\n            patterns: {\n                image: /https?:\\/\\/\\S+\\.(gif|jpe?g|tiff|png|webp)$/i,\n            },\n            tags: [ 'img' ],\n            files: {\n                mimeTypes: [ 'image/*' ],\n            },\n        };\n    }\n\n    /**\n     * Makes buttons with tunes: add background, add border, stretch image\n     *\n     * @returns {HTMLDivElement}\n     */\n    renderSettings() {\n        const wrapper = document.createElement('div');\n\n        this.settings.forEach(tune => {\n            const el = document.createElement('div');\n\n            el.classList.add(this.CSS.settingsButton);\n            el.innerHTML = tune.icon;\n\n            el.addEventListener('click', () => {\n                this._toggleTune(tune.name);\n                el.classList.toggle(this.CSS.settingsButtonActive);\n            });\n\n            el.classList.toggle(this.CSS.settingsButtonActive, this.data[tune.name]);\n\n            wrapper.appendChild(el);\n        });\n\n        return wrapper;\n    };\n\n    /**\n     * Helper for making Elements with attributes\n     *\n     * @param  {string} tagName           - new Element tag name\n     * @param  {Array|string} classNames  - list or name of CSS classname(s)\n     * @param  {object} attributes        - any attributes\n     * @returns {Element}\n     */\n    _make(tagName, classNames = null, attributes = {}) {\n        const el = document.createElement(tagName);\n\n        if (Array.isArray(classNames)) {\n            el.classList.add(...classNames);\n        } else if (classNames) {\n            el.classList.add(classNames);\n        }\n\n        for (const attrName in attributes) {\n            el[attrName] = attributes[attrName];\n        }\n\n        return el;\n    }\n\n    /**\n     * Click on the Settings Button\n     *\n     * @private\n     * @param tune\n     */\n    _toggleTune(tune) {\n        this.data[tune] = !this.data[tune];\n        this._acceptTuneView();\n    }\n\n    /**\n     * Add specified class corresponds with activated tunes\n     *\n     * @private\n     */\n    _acceptTuneView() {\n        this.settings.forEach(tune => {\n            this.nodes.imageHolder.classList.toggle(this.CSS.imageHolder + '--' + tune.name.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`), !!this.data[tune.name]);\n\n            if (tune.name === 'stretched') {\n                this.api.blocks.stretchBlock(this.blockIndex, !!this.data.stretched);\n            }\n        });\n    }\n}\n\nmodule.exports = ImageGallery;\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });