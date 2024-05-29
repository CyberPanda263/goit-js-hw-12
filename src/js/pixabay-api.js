import axios from 'axios';

export async function search(q, page, perPage) {
    const options = new URLSearchParams({
        per_page: perPage,
        page: page,
        key: "44067044-e8359f631c20f41f339c4060c",
        q: q,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: "true",
    });

  const response = await axios.get(`https://pixabay.com/api/?${options}`);

  return response.data;
};
