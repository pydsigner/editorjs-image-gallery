import './gallery-grid.less';

export class GalleryGrid {

    /**
     * @param {Element} container
     */
    loadGallery(container) {
        const root = document.querySelector("body, html");
        const images = container.querySelectorAll(".gg-box .gg-img");

        images.forEach((image) => {
            image.addEventListener("click", function (i) {
                let currentImg = image;
                const screenItem = document.createElement('div');

                screenItem.className = "gg-screen";
                container.prepend(screenItem);

                let route = currentImg.id;

                const rootOverflow = root.style.overflow;
                root.style.overflow = 'hidden';
                screenItem.innerHTML = '<div class="gg-current-img"></div><div class="gg-close gg-btn">&times;</div><div class="gg-next gg-btn">&rarr;</div><div class="gg-prev gg-btn">&larr;</div>';

                const imgItem = container.querySelector(".gg-current-img");
                const prevBtn = container.querySelector(".gg-prev");
                const nextBtn = container.querySelector(".gg-next")
                const close = container.querySelector(".gg-close");

                const updateSelection = () => {
                    let src;
                    if (currentImg.tagName === 'IMG') {
                        src = currentImg.src;
                    } else {
                        src = currentImg.querySelector('img').src;
                    }
                    imgItem.innerHTML = `<img src="${src}"/>`;
                    if (!currentImg.nextElementSibling) {
                        nextBtn.hidden = true;
                    }
                    if (!currentImg.previousElementSibling) {
                        prevBtn.hidden = true;
                    }
                }

                updateSelection();

                screenItem.addEventListener("click", function (e) {
                    if (e.target === this || e.target === close) hide();
                });

                root.addEventListener("keydown", function (e) {
                    if (e.keyCode === 37 || e.keyCode === 38) prev();
                    if (e.keyCode === 39 || e.keyCode === 40) next();
                    if (e.keyCode === 27) hide();
                });

                const prev = () => {
                    if (currentImg.previousElementSibling) {
                        currentImg = currentImg.previousElementSibling;
                        updateSelection();
                    }
                };

                const next = () => {
                    if (currentImg.nextElementSibling) {
                        currentImg = currentImg.nextElementSibling;
                        updateSelection();
                    }
                };

                const hide = () => {
                    root.style.overflow = rootOverflow;
                    screenItem.remove();
                };

                prevBtn.addEventListener("click", prev);
                nextBtn.addEventListener("click", next);
            });
        });
    }
}
