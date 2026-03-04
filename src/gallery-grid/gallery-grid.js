class GalleryGrid {

    loadGallery(container) {

        const root = document.querySelector("body, html");
        const images = container.querySelectorAll(".gg-box > img");
        const l = images.length;

        images.forEach((image) => {
            image.addEventListener("click", function (i) {
                let nextImg;
                let prevImg;
                let currentImg = this;
                const parentItem = currentImg.parentElement, screenItem = document.createElement('div');

                screenItem.className = "gg-screen";
                container.prepend(screenItem);

                if (parentItem.hasAttribute('data-theme')) screenItem.setAttribute("data-theme", "dark");

                let route = currentImg.id;

                const rootOverflow = root.style.overflow;
                root.style.overflow = 'hidden';
                screenItem.innerHTML = '<div class="gg-image"></div><div class="gg-close gg-btn">&times</div><div class="gg-next gg-btn">&rarr;</div><div class="gg-prev gg-btn">&larr;</div>';

                const first = images[0].id, last = images[l - 1].id;
                const imgItem = document.querySelector(".gg-image"), prevBtn = document.querySelector(".gg-prev"),
                    nextBtn = document.querySelector(".gg-next"), close = document.querySelector(".gg-close");
                imgItem.innerHTML = '<img src="' + currentImg.src + '" id="' + currentImg.id + '" />';

                if (l > 1) {
                    if (route === first) {
                        prevBtn.hidden = true;
                        prevImg = false;
                        let nextImg = currentImg.nextElementSibling;
                    } else if (route === last) {
                        nextBtn.hidden = true;
                        nextImg = false;
                        let prevImg = currentImg.previousElementSibling;
                    } else {
                        let prevImg = currentImg.previousElementSibling;
                        let nextImg = currentImg.nextElementSibling;
                    }
                } else {
                    prevBtn.hidden = true;
                    nextBtn.hidden = true;
                }

                screenItem.addEventListener("click", function (e) {
                    if (e.target === this || e.target === close) hide();
                });

                root.addEventListener("keydown", function (e) {
                    if (e.keyCode === 37 || e.keyCode === 38) prev();
                    if (e.keyCode === 39 || e.keyCode === 40) next();
                    if (e.keyCode === 27) hide();
                });

                const prev = () => {
                    prevImg = currentImg.previousElementSibling;
                    if (prevImg) {
                        imgItem.innerHTML = '<img src="' + prevImg.src + '" id="' + prevImg.id + '" />';
                        currentImg = currentImg.previousElementSibling;
                        nextBtn.hidden = false;
                        prevBtn.hidden = getMainImg() === first;
                    }
                };

                const next = () => {
                    nextImg = currentImg.nextElementSibling;
                    if (nextImg) {
                        imgItem.innerHTML = '<img src="' + nextImg.src + '" id="' + nextImg.id + '" />';
                        currentImg = currentImg.nextElementSibling;
                        prevBtn.hidden = false;
                        nextBtn.hidden = getMainImg() === last;
                    }
                };

                const hide = () => {
                    root.style.overflow = rootOverflow;
                    screenItem.remove();
                };

                prevBtn.addEventListener("click", prev);
                nextBtn.addEventListener("click", next);

                const getMainImg = () => {
                    return container.querySelector(".gg-image > img").id;
                };
            });
        });
    }

    galleryOptions(element, options) {
        if (options.darkMode) element.setAttribute("data-theme", "dark");
        if (options.layout === "horizontal" || options.layout === "square") element.setAttribute("data-layout", options.layout);
        if (options.gapLength) element.style.setProperty('--gap-length', options.gapLength + 'px');
        if (options.rowHeight) element.style.setProperty('--row-height', options.rowHeight + 'px');
        if (options.columnWidth) element.style.setProperty('--column-width', options.columnWidth + 'px');
    }
}

if(typeof module !== 'undefined') module.exports = GalleryGrid;
else if(window) window.GalleryGrid = GalleryGrid;
