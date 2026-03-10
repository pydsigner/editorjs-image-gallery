import './index.less';
import {GalleryGrid} from './gallery-grid.js';
import Sortable from 'sortablejs';

/**
 * ImageGallery Tool for the Editor.js
 * Works with image URLs and requires no server-side uploader.
 *
 * @typedef {object} ImageGalleryData
 * @property {string[]} urls — images URL
 * @property {boolean} editImages - activate or deactivate for show textarea with images urls
 * @property {boolean} bkgMode - activate or deactivate dark mode
 * @property {string} layout - layout of gallery: 'flexible', 'masonry', 'square' or 'landscape'
 */

/**
 * @typedef {object} ImageGalleryConfig
 * @property {function():Promise<string[]>} [addImages] - Callback that should launch a file picker and return URLs. Replaces default URL text entry.
 */

export class ImageGallery {
    static get toolbox() {
        return {
            title: 'Image Gallery',
            icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-images" viewBox="0 0 16 16"><path d="M4.502 9a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/> <path d="M14.002 13a2 2 0 0 1-2 2h-10a2 2 0 0 1-2-2V5A2 2 0 0 1 2 3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v8a2 2 0 0 1-1.998 2zM14 2H4a1 1 0 0 0-1 1h9.002a2 2 0 0 1 2 2v7A1 1 0 0 0 15 11V3a1 1 0 0 0-1-1zM2.002 4a1 1 0 0 0-1 1v8l2.646-2.354a.5.5 0 0 1 .63-.062l2.66 1.773 3.71-3.71a.5.5 0 0 1 .577-.094l1.777 1.947V5a1 1 0 0 0-1-1h-10z"/></svg>'
        };
    }

    /**
     * Render plugin`s main Element and fill it with saved data
     *
     * @param {{data: ImageGalleryData, config: ImageGalleryConfig, api: object}}
     *   data — previously saved data
     *   api - Editor.js API
     */
    constructor({data, config, api}) {

        this.config = config
        this.addImages = config.addImages

        /**
         * Tool's initial data
         */
        this.data = {
            urls: data.urls || [],
            editImages: data.editImages !== undefined ? data.editImages : true,
            bkgMode: data.bkgMode !== undefined ? data.bkgMode : false,
            layout: data.layout !== undefined ? data.layout : 'flexible',
        };

        /**
         * Editor.js API
         */
        this.api = api
        this.wrapper = undefined;

        /**
         * Available Gallery settings
         */
        this.settings = [
            {
                name: 'bkgMode',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-layers-fill" viewBox="0 0 16 16"><path d="M7.765 1.559a.5.5 0 0 1 .47 0l7.5 4a.5.5 0 0 1 0 .882l-7.5 4a.5.5 0 0 1-.47 0l-7.5-4a.5.5 0 0 1 0-.882l7.5-4z"/><path d="m2.125 8.567-1.86.992a.5.5 0 0 0 0 .882l7.5 4a.5.5 0 0 0 .47 0l7.5-4a.5.5 0 0 0 0-.882l-1.86-.992-5.17 2.756a1.5 1.5 0 0 1-1.41 0l-5.17-2.756z"/></svg>`,
                title: 'Background Mode',
            },
            {
                name: 'layoutFlexible',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid-1x2" viewBox="0 0 16 16"><path d="M6 1H1v14h5zm9 0h-5v5h5zm0 9v5h-5v-5zM0 1a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1zm9 0a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1h-5a1 1 0 0 1-1-1zm1 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-5a1 1 0 0 0-1-1z"/></svg>`,
                title: 'Flexible Layout',
            },
            {
                name: 'layoutMasonry',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-columns-gap" viewBox="0 0 16 16"><path d="M6 1v3H1V1h5zM1 0a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1H1zm14 12v3h-5v-3h5zm-5-1a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-5zM6 8v7H1V8h5zM1 7a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V8a1 1 0 0 0-1-1H1zm14-6v7h-5V1h5zm-5-1a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h5a1 1 0 0 0 1-1V1a1 1 0 0 0-1-1h-5z"/></svg>`,
                title: 'Masonry Layout',
            },
            {
                name: 'layoutGapless',
                // Based on bi-grid-3x2-gap
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi" viewBox="0 0 16 16"><path d="M 9,4V 6H 2V 4ZM 5,9V 9C 5,8.45 4.55,8 4,8H 2C 1.45,8 1,8.45 1,9v 2c 0,0.55 0.45,1 1,1h 2c 0.55,0 1,-0.45 1,-1M 10,6V 4c 0,-0.55 -0.45,-1 -1,-1H 2C 1.45,3 1,3.45 1,4v 2c 0,0.55 0.45,1 1,1h 7c 0.55,0 1,-0.45 1,-1M 10,11V 9C 10,8.45 9.55,8 9,8H 7C 6.45,8 6,8.45 6,9v 2c 0,0.55 0.45,1 1,1h 2c 0.55,0 1,-0.45 1,-1m 4,-7h -2v 7h 2zM 4,9v 2H 2V 9Zm 5,0v 2H 7V 9Zm 2,-5c 0,-0.55 0.45,-1 1,-1h 2c 0.55,0 1,0.45 1,1v 7c 0,0.55 -0.45,1 -1,1h -2c -0.55,0 -1,-0.45 -1,-1z"/></svg>`,
                title: 'Gapless Layout',
            },
            {
                name: 'layoutSquare',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-grid" viewBox="0 0 16 16"><path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zM2.5 2a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zM1 10.5A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5zm6.5.5A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5zm1.5-.5a.5.5 0 0 0-.5.5v3a.5.5 0 0 0 .5.5h3a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5z"/></svg>`,
                title: 'Square Layout',
            },
            {
                name: 'layoutLandscape',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-aspect-ratio" viewBox="0 0 16 16"><path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h13A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 12.5zM1.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"/><path d="M2 4.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1H3v2.5a.5.5 0 0 1-1 0zm12 7a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1 0-1H13V8.5a.5.5 0 0 1 1 0z"/></svg>`,
                title: 'Landscape Layout',
            },
        ];
        if (this.addImages) {
            this.settings.splice(0, 0, {
                name: 'addImages',
                icon: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-file-plus" viewBox="0 0 16 16"><path d="M8.5 6a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V10a.5.5 0 0 0 1 0V8.5H10a.5.5 0 0 0 0-1H8.5z"/><path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2zm10-1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1"/></svg>',
                title: 'Add Images'
            });
        } else {
            this.settings.splice(0, 0, {
                name: 'editImages',
                icon: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16"><path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/><path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/></svg>`,
                title: 'Edit Images',
            });
        }

        this.gg = new GalleryGrid();
    }

    /**
     * Creates a Block:
     *  1) Creates a textarea to paste images urls
     *  2) Start to load all urls
     *  3) After loading, append images to gallery
     *
     * @public
     */
    render() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('image-gallery');

        if (!this.addImages) {
            const textarea = document.createElement('textarea');
            textarea.placeholder = 'Paste your photos URL ...';
            textarea.value = this.data.urls.map((img) => img.src).join('\n');
            ['paste', 'change'].forEach(evt =>
                textarea.addEventListener(evt, (event) => {
                    const urls = (evt === 'paste' ? event.clipboardData.getData('text') : textarea.value);
                    this._imageGallery(urls.split("\n").filter((v) => v.trim()));
                }, false)
            );
            this.wrapper.appendChild(textarea);
        }

        if (this.data && this.data.urls) {
            this._imageGallery(this.data.urls);
            return this.wrapper;
        } else if (this.addImages) {
            this._toggleTune('addImages');
        }
        return this.wrapper;
    }

    /**
     * @public
     * @param {Element} blockContent - Tool's wrapper
     * @returns {ImageGalleryData}
     */
    save(blockContent) {
        const photos = blockContent.querySelectorAll('.gg-box img');
        const urls = [];
        const meta = [];
        photos.forEach((img) => {
            urls.push(img.src);
            meta.push({
                width: img.naturalWidth,
                height: img.naturalHeight,
            });
        });
        return Object.assign(this.data, {
            urls: urls,
            meta: meta
        });
    }

    validate(savedData) {
        let imagesToSave = [];
        let indexCount = 0;

        savedData.urls.forEach((url) => {
            if (url.trim()) {
                imagesToSave[indexCount] = url;
                indexCount++;
            }
        });

        savedData.urls = imagesToSave

        return true;
    }

    /**
     * Sanitizer rules
     */
    static get sanitize() {
        return {
            urls: {},
            editImages: {},
            bkgMode: {},
            layout: {},
        };
    }


    /**
     * Returns images data
     *
     * @returns {ImageGalleryData}
     */
    get data() {
        return this._data;
    }

    /**
     * Set images data and update the view
     *
     * @param {ImageGalleryData} data
     */
    set data(data) {
        this._data = Object.assign({}, this.data, data);
    }

    /**
     * Makes buttons with tunes: background mode, layout default, layout horizontal,
     * square layout, layout with gap and layout with fixed size
     *
     * @returns {HTMLDivElement}
     */
    renderSettings() {
        const wrp = document.createElement('div');

        this.settings.forEach(tune => {
            let button = document.createElement('div');

            button.classList.add('cdx-settings-button');
            if (this._tuneActive(tune.name)) {
                button.classList.add('cdx-settings-button--active');
            }
            button.innerHTML = tune.icon;
            button.title = tune.title;
            button.dataset.tuneName = tune.name;
            wrp.appendChild(button);

            button.addEventListener('click', () => {
                this._toggleTune(tune.name);
                wrp.querySelectorAll('.cdx-settings-button').forEach(e => {
                    if (this._tuneActive(e.dataset.tuneName)) {
                        e.classList.add('cdx-settings-button--active');
                    } else {
                        e.classList.remove('cdx-settings-button--active');
                    }
                });
            });
        });

        return wrp;
    }

    _tuneToLayout(tune) {
        return tune.substring(6).toLowerCase();
    }
    _tuneActive(tune) {
        return (tune.startsWith('layout') && this.data.layout === this._tuneToLayout(tune)) || this.data[tune];
    }


    /**
     * @private
     * Click on the Settings Button
     * @param {string} tune — tune name from this.settings
     */
    _toggleTune(tune) {
        if (tune === "bkgMode" || tune === "editImages") {
            this.data[tune] = !this.data[tune];
        } else if (tune === 'addImages') {
            this.addImages().then((urls) => {
                this.data.urls.push(...urls);
                this._imageGallery(this.data.urls);
            });
        } else if (tune.startsWith('layout')) {
            this.data['layout'] = this._tuneToLayout(tune);
        } else {
            console.warn(`Unknown tune ${tune}`);
        }

        this._acceptTuneView();
    }

    /**
     * Add specified logic corresponds with activated tunes
     * @private
     */
    _acceptTuneView() {

        const container = this.wrapper.querySelector('.gg-container');
        const urlsInput = this.wrapper.querySelector('textarea');

        if (urlsInput) {
            if (this.data.editImages) {
                urlsInput.classList.remove('textarea-hide');
            } else {
                urlsInput.classList.add('textarea-hide');
            }
        }

        if (!container) {
            return;
        }

        if (this.data.bkgMode) {
            container.setAttribute("data-theme", "dark");
        } else {
            container.removeAttribute('data-theme');
        }
        container.setAttribute('data-layout', this.data.layout);
    }

    /**
     * @private
     * Create image gallery
     * @param {string[]} urls — list of gallery url images
     */
    _imageGallery(urls) {

        let imgCount = 0;

        const oldContainers = this.wrapper.querySelectorAll('.gg-container');
        oldContainers.forEach((oldContainer) => {
            if (oldContainer !== null) {
                oldContainer.remove();
            }
        });

        const box = document.createElement('div');
        box.className = 'gg-box';
        const urlsInput = this.wrapper.querySelector('textarea');
        const updateUrlsInput = () => {
            if (urlsInput) {
                urlsInput.value = Array.from(wrapper.querySelectorAll('.gg-box img')).map((img) => img.src).join('\n');
            }
        }
        const wrapper = this.wrapper;
        this.sortable = new Sortable(box, {
            onSort: updateUrlsInput
        });

        urls.forEach((url, index) => {
            imgCount += 1;
            const imgWrap = document.createElement('div');
            imgWrap.className = 'gg-img';
            const deleteBtn = document.createElement('div');
            deleteBtn.className = 'gg-delete';
            deleteBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">' +
                '<path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"/>' +
                '</svg>';
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                imgWrap.remove();
                updateUrlsInput();
            });
            imgWrap.appendChild(deleteBtn);
            const img = document.createElement('img');
            img.addEventListener('load', () => {
                imgWrap.style.setProperty('--gg-h', img.naturalHeight);
                imgWrap.style.setProperty('--gg-w', img.naturalWidth);
            });
            img.src = url;
            imgWrap.appendChild(img);
            box.appendChild(imgWrap);
        });

        const gallery = document.createElement('div');
        gallery.className = 'gg-container';
        gallery.appendChild(box)

        if (imgCount > 0) this.wrapper.appendChild(gallery);

        this.gg.loadGallery(gallery);

        this._acceptTuneView();
    }
}
