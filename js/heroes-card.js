const heroes = {
    render: () => {
        const urlAPI = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=a1a5a31847b639232cc9d8c64b6cce63&hash=e17e110e1f14158fa71083af79b6d39c&limit=100';
        const container = document.querySelector('#heroes-row');
        let contentHTML = '';

        fetch(urlAPI)
            .then(res => res.json())
            .then((json)=> {
                for (const card of json.data.results) {
                    contentHTML += `
                        <div class="col-lg-2 col-md-3 col-sm-4 m-2">
                            <!-- CARDS -->
                            <div class="card custom" style="width: 12rem;">
                                <div class="image">
                                    <img src="${card.thumbnail.path}.${card.thumbnail.extension}" class="card-img-top img-thumbnail" alt="${card.name}">
                                </div>
                                <div class="card-body body-card">
                                    <p class="card-title card-name">${card.name}</p>
                                </div>
                            </div>
                        </div>
                    `
                }
                container.innerHTML = contentHTML;
            })
    }
};
heroes.render();