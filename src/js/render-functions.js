import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


export function errorMassage() {
    iziToast.show({
        message: "Sorry, there are no images matching your search query. Please try again!",
        position: 'topRight',
        backgroundColor: 'rgb(239, 64, 64)',
        theme: 'dark',
    });
}

export function noImageMassage() {
    iziToast.show({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
        backgroundColor: '#4e75ff',
        theme: 'dark',
    });
}

export function startRender(q, page, gallery) {
    search(q, page)
    .then(
    ({images, pageNum}) => {
        loader.style.display = "none";
        if(images.hits.length != 0) {
            renderGallery(images, gallery);
            page = pageNum;
        }else{
            errorMassage();
        }
    }
)
.catch((error) => console.log(`error ${error}`));
}


export function renderGallery(images, gallery, loadMore) {
    
    const galleryArr = [];

    images.hits.forEach(image => {

        const li = document.createElement("li");
        li.classList = "gallery-item";

        const divGallerys = document.createElement("div");
        divGallerys.classList = "gallerys";

        const a = document.createElement("a");
        a.classList = "gallery-link";
        a.setAttribute("href", `${image.largeImageURL}`);

        const img = document.createElement("img");
        img.classList = "gallery-image";
        img.setAttribute("src",`${image.webformatURL}`);
        img.setAttribute("alt", `${image.tags}`);

        const divItem = document.createElement("div");
        divItem.classList = "gallery-item-description";
        
        const ul = document.createElement("ul");
        ul.classList = "gallery-item-list";
        
        const h3Value = ["likes", "views", "comments", "downolads"];
        const pValue = [`${image.likes}`, `${image.views}`, `${image.comments}`, `${image.downloads}`];

        for(let i = 0; i < 4 ; i++) {
            const li = document.createElement("li");
            li.classList = "gallery-item-list-item";
            const h3 = document.createElement("h3");
            h3.textContent = `${h3Value[i]}`;
            const p = document.createElement("p");
            p.textContent = `${pValue[i]}`;
            li.append(h3);
            li.append(p);
            ul.append(li);
        }

        divItem.append(ul);
        a.append(img);
        divGallerys.append(a);
        li.append(divGallerys);
        li.append(divItem);

        galleryArr.push(li);
    })

    gallery.append(...galleryArr);
    loadMore.style.display = "block";
}