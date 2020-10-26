import '@babel/polyfill'

export default {
  _query: '',
  page: 1,
  apiKey: '18864496-11c272d8a93d1bf5ea508818e',


// toGetFetch() {
//   let url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this.query}&page=${this.page}&per_page=12&key=${this.apiKey}`;

//   fetch(url)
//   .then(res => res.json())
//   .then(data => console.log(data))
//   }

async toGetFetch() {
  let url = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${this._query}&page=${this.page}&per_page=12&key=${this.apiKey}`;

  let response = await fetch(url);
  let result = await response.json();
  console.log(result.hits);

  return result.hits;
},

get query() {
  return this._query;
},
set query(value) {
  return this._query = value;
},

setPage() {
  return this.page +=1;
}
}