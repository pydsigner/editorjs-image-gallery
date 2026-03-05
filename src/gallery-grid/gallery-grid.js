import './gallery-grid.less';

export class GalleryGrid {

    loadGallery(container) {

        const root = document.querySelector("body, html");
        const images = container.querySelectorAll(".gg-box img");

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
                screenItem.innerHTML = '<div class="gg-current-img"></div><div class="gg-close gg-btn">&times;</div><div class="gg-next gg-btn">&rarr;</div><div class="gg-prev gg-btn">&larr;</div>';

                const imgItem = container.querySelector(".gg-current-img");
                const prevBtn = container.querySelector(".gg-prev");
                const nextBtn = container.querySelector(".gg-next")
                const close = container.querySelector(".gg-close");
                imgItem.innerHTML = `<img src="${currentImg.src}"/>`;

                if (currentImg.nextElementSibling) {
                    nextImg = currentImg.nextElementSibling;
                } else {
                    nextBtn.hidden = true;
                }
                if (currentImg.previousElementSibling) {
                    prevImg = currentImg.previousElementSibling;
                } else {
                    prevBtn.hidden = true;
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
                        imgItem.innerHTML = `<img src="${prevImg.src}"/>`;
                        currentImg = currentImg.previousElementSibling;
                        nextBtn.hidden = !Boolean(currentImg.nextElementSibling);
                        prevBtn.hidden = !Boolean(currentImg.previousElementSibling);
                    }
                };

                const next = () => {
                    nextImg = currentImg.nextElementSibling;
                    if (nextImg) {
                        imgItem.innerHTML = `<img src="${nextImg.src}"/>`;
                        currentImg = currentImg.nextElementSibling;
                        nextBtn.hidden = !Boolean(currentImg.nextElementSibling);
                        prevBtn.hidden = !Boolean(currentImg.previousElementSibling);
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
