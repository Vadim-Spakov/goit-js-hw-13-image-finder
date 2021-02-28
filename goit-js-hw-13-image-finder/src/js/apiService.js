export default class ImageApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchImages() {
    const API_KEY = '18452046-d075d28130c097165687e8e16';
    const BASE_URL = 'https://pixabay.com/api';

    const response = await fetch(
      `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
    );

    const newImages = await response.json();

    this.page += 1;
    return newImages.hits;
  }

  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}

// Промисы

// fetchImages() {
//   const API_KEY = '18452046-d075d28130c097165687e8e16';
//   const BASE_URL = 'https://pixabay.com/api';

//   return fetch(
//     `${BASE_URL}/?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=12&key=${API_KEY}`,
//   )
//     .then(r => r.json())
//     .then(data => {
//       this.page += 1;
//       return data.hits;
//     });
// }
