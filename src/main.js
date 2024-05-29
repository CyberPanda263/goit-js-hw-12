const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery-list");
const loader = document.querySelector("#loader");
const up = document.querySelector(".up");
const loadMore = document.querySelector(".show-more-btn");
let page = 1;
let q;
const perPage = 15;

import { errorMassage, noImageMassage, startRender, renderGallery } from "./js/render-functions";
import { search } from "./js/pixabay-api";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';

let galleryList;

export function initializeLightbox() {
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
        const images = await search(q, page, perPage);
        loader.style.display = "none";
        
        if (images.hits.length !== 0) {
            startRender(images, page, gallery);
            page += 1;
            if(images.totalHits > perPage) {
                loadMore.style.display = "block";
            }else {
                loadMore.style.display = "none";
            }
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
        const images = await search(q, page, perPage);
        if ((page * perPage) < images.totalHits) {
            startRender(images, page, gallery);
            page += 1;
        } else {
            if(images.hits.length !== 0){
                startRender(images, page, gallery);
                page += 1;
                if(images.totalHits <= perPage) {
                    loadMore.style.display = "block";
                }else {
                    noImageMassage();
                    loadMore.style.display = "none";
                }
            }
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
