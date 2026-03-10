import './gallery-grid.less';
import { bisector } from 'd3-array';

export class GalleryGrid {

    /**
     * @param {Element} container
     */
    loadGallery(container) {
        const root = document.querySelector("body, html");
        const images = container.querySelectorAll(".gg-box .gg-img");

        images.forEach((image) => {
            // Launch lightbox on click
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
        this.installCarousel(container);
    }

    installCarousel(container) {
        if (container.dataset.layout === "carousel") {
            let caroBox;
            const innerBox = container.querySelector('.gg-box');
            const images = innerBox.querySelectorAll(".gg-img");
            if (!container.querySelector('.scroll-marker-group')) {
                innerBox.style.scrollbarWidth = 'none';
                caroBox = document.createElement('div');
                caroBox.className = "scroll-marker-group";
                innerBox.append(caroBox);

                const caroPrev = document.createElement('div');
                caroPrev.className = "scroll-button scroll-button-left";
                caroPrev.addEventListener("click", function (e) {
                    if (scrollToIdx(getCurrentScrollIdx() - 1)) {
                        e.preventDefault();
                    }
                });
                const caroNext = document.createElement('div');
                caroNext.className = "scroll-button scroll-button-right";
                caroNext.addEventListener("click", function (e) {
                    if (scrollToIdx(getCurrentScrollIdx() + 1)) {
                        e.preventDefault();
                    }
                });
                innerBox.append(caroPrev);
                innerBox.append(caroNext);
            }
            else {
                caroBox = container.querySelector('.scroll-marker-group');
            }
            const scrollBisector = bisector((e) => e.getBoundingClientRect().left + e.clientWidth / 2).center;
            const getCurrentScrollIdx = () => {
                const scrollCenter = container.getBoundingClientRect().left + container.scrollLeft + container.clientWidth / 2;
                return scrollBisector(images, scrollCenter);
            }
            const scrollToIdx = (idx) => {
                if (idx >= 0 && idx < images.length) {
                    images[idx].scrollIntoView({
                        container: 'nearest',
                        inline: 'center',
                        behavior: 'smooth',
                    });
                    innerBox.querySelectorAll('.scroll-marker').forEach((marker, i) => {
                        marker.classList.toggle('scroll-marker-current', i === idx);
                    });
                    innerBox.querySelector('.scroll-button-left').hidden = (idx === 0);
                    innerBox.querySelector('.scroll-button-right').hidden = (idx === images.length - 1 || images.length === 0);
                    return true;
                }
                return false;
            }
            const initialScrollIdx = getCurrentScrollIdx();
            innerBox.querySelector('.scroll-button-left').hidden = (initialScrollIdx === 0);
            innerBox.querySelector('.scroll-button-right').hidden = (initialScrollIdx === images.length - 1 || images.length === 0);
            // Add scroll markers
            caroBox.innerHTML = '';
            images.forEach((image, imgIdx) => {
                const marker = document.createElement('div');
                marker.className = "scroll-marker";
                if (imgIdx === initialScrollIdx) {
                    marker.classList.add('scroll-marker-current');
                }
                marker.addEventListener("click", function (e) {
                    scrollToIdx(imgIdx);
                    e.preventDefault();
                });
                caroBox.append(marker);
            });
        }
    }
}
