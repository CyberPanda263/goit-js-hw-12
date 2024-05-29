const form = document.querySelector(".search-form");
const gallery = document.querySelector(".gallery-list");
const loader = document.querySelector("#loader");
const up = document.querySelector(".up");
const loadMore = document.querySelector(".show-more-btn");
let galleryList = document.querySelector(".gallerys");
let page = 1;
let q;
const perPage = 15;

import {errorMassage} from "./js/render-functions";
import {noImageMassage} from "./js/render-functions";
import {renderGallery} from "./js/render-functions";
import {search} from "./js/pixabay-api";
import {startRender} from "./js/render-functions";
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.css';

form.addEventListener("submit", async event => {
    event.preventDefault();
    gallery.innerHTML = "";
    page = 1;
    loader.style.display = "block";
    q = form.elements.searchItem.value.replace(" ", "+");
    search(q, page, perPage)
    .then(
        ({images, pageNum}) => {
            loader.style.display = "none";
            if(images.hits.length != 0) {
                galleryList.refresh();
                renderGallery(images, gallery, loadMore);
                page = pageNum;
            }else{
                errorMassage();
            }
        }
    )
})

loadMore.addEventListener("click", async event => {
    search(q, page, perPage)
    .then(
        ({images, pageNum}) => {
            if((page * perPage) < images.totalHits) {
                //galleryList.refresh();
                renderGallery(images, gallery, loadMore);
                window.scrollBy({
                   top: gallery.firstElementChild.getBoundingClientRect().height * 2,
                   behavior: "smooth",
                });
                page = pageNum;
            }else{
                noImageMassage();
                loadMore.style.display = "none";
            }

        }
    )
});

up.addEventListener("click", event => {
    window.scroll({
        top: 0,
        behavior: "smooth",
})
})



galleryList = new SimpleLightbox('.gallerys a', {
    captionDelay: 200,
  });