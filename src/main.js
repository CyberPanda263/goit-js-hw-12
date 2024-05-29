const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery-list");
const loader = document.querySelector("#loader");
const up = document.querySelector(".up");
const loadMore = document.querySelector(".show-more-btn");
let page = 1;
let q;
const perPage = 15;

import { errorMassage, noImageMassage, renderGallery } from "./js/render-functions";
import { search } from "./js/pixabay-api";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';

let galleryList;

function initializeLightbox() {
    if (galleryList) {
        galleryList.destroy();
    }
    galleryList = new SimpleLightbox('.gallerys a', {
        captionDelay: 200,
    });
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    gallery.innerHTML = "";
    page = 1;
    loader.style.display = "block";
    q = form.elements.searchItem.value.trim().replace(" ", "+");
    
    try {
        const { images, pageNum } = await search(q, page, perPage);
        loader.style.display = "none";
        
        if (images.hits.length !== 0) {
            renderGallery(images, gallery, loadMore);
            page = pageNum;
            initializeLightbox();
        } else {
            errorMassage();
        }
    } catch (error) {
        loader.style.display = "none";
        console.error("Error fetching images:", error);
        errorMassage();
    }
});

loadMore.addEventListener("click", async () => {
    try {
        const { images, pageNum } = await search(q, page, perPage);
        if ((page * perPage) < images.totalHits) {
            renderGallery(images, gallery, loadMore);
            window.scrollBy({
                top: gallery.firstElementChild.getBoundingClientRect().height * 2,
                behavior: "smooth",
            });
            page = pageNum;
            initializeLightbox();
        } else {
            noImageMassage();
            loadMore.style.display = "none";
        }
    } catch (error) {
        console.error("Error fetching more images:", error);
        noImageMassage();
    }
});

up.addEventListener("click", () => {
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
});

initializeLightbox();