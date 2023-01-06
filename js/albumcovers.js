// Album Covers
const AlbumCovers = {
  apiKey: '6d5c450633d451aae5bfdcb8e817167b',
  //btn: document.getElementById('load'),
  coversList: document.getSelection('covers-list'),
  albumCovers: [],
  get() {
    let out = '';
    let covers = document.getElementById('covers');
    const btn = document.getElementById('load');
    btn.addEventListener('click', () => {
      let listTxtArea = document.getElementById('albumlist');
      let albumList = listTxtArea.value.split('\n');
      const promises = albumList.map(async el => {
        let split = el.split(' - ');
        const r = await fetch(`https://ws.audioscrobbler.com/2.0/?method=album.getinfo&api_key=${this.apiKey}&artist=${split[1]}&album=${split[0]}&format=json`);
        return await r.json();
      });
      Promise.all(promises)
        .then((results) => {
          results.forEach(r => {
            out += `
              <div class="album-item">
                <img src="${r.album.image[3]["#text"]}"/>
              </div>
            `;
          });
        })
        .catch((error) => {
          console.log(error);
        });
      covers.innerHTML = out;
    });
  }
}