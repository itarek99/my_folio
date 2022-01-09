const countryBox = document.querySelector('.search-country');
const neighbourCountry = document.querySelector('.neighbour-country');
const seacrhBtn = document.querySelector('.search-btn');
const input = document.querySelector('.input');
const cardBody = document.querySelectorAll('.card-body');

// Render Main Country
const renderCountry = function (data) {
    const { flag, name, region, capital, population, currencies, languages, alpha3Code, area } = data;
    const html = `<div class="col-lg-6">
    <div class="card">
    <a href="${flag}" target="_blank"><img src="${flag}" class="card-img-top"></a>
    <div class="card-body">
        <h5 class="card-title fs-3 mb-0 fw-bold">${name}</h5>
        <p class="card-text">${region}</p>
        
        <p class="card-text mb-2"><span class='fw-bold'>Capital:</span> ${capital}</p>
        <p class="card-text mb-2"><span class='fw-bold'>Population:</span> ${(population / 1000000).toFixed(0)}M</p>
	    <p class="card-text mb-2"><span class='fw-bold'>Area:</span> ${area} km<sup>2</sup></p>
        <p class="card-text mb-2"><span class='fw-bold'>Language:</span> ${languages[0].name}</p>
        <p class="card-text mb-2 text-capitalize"><span class='fw-bold'>Currency:</span> ${currencies[0].name}</p>
        <p class="card-text mb-2"><span class='fw-bold'>Alpha 3 Code:</span> ${alpha3Code}</p>
        
    </div>
</div>
</div>`;

    countryBox.innerHTML = html;
};

// Render Neighbour Country
const renderNeighbour = function (data) {
    const { flag, name, region, capital, population, currencies, languages, alpha3Code, area } = data;
    const html = `
    <div class="col-lg-4 col-md-6 mb-4">
        <div class="card neighbour" style="height:31rem">
        <a href="${flag}" target="_blank"><img src="${flag}" class="card-img-top neighbour-card-img"></a>
            <div class="card-body" data-alpha="${alpha3Code}" onclick="myFunction(event)">
                <h5 class="card-title fs-4 mb-0 fw-bold">${name}</h5>
                <p class="card-text">${region}</p>
               
                    <p class="card-text mb-2"><span class='fw-bold'>Capital:</span> ${capital}</p>
                    <p class="card-text mb-2"><span class='fw-bold'>Population:</span> ${(population / 1000000).toFixed(
                        0
                    )}M</p>
		            <p class="card-text mb-2"><span class='fw-bold'>Area:</span> ${area} km<sup>2</sup></p>
                    <p class="card-text mb-2"><span class='fw-bold'>Language:</span> ${languages[0].name}</p>
                    <p class="card-text mb-2 text-capitalize"><span class='fw-bold'>Currency:</span> ${
                        currencies[0].name
                    }</p>
                    <p class="card-text mb-2"><span class='fw-bold'>Alpha 3 Code:</span> ${alpha3Code}</p>
                
        </div>
        </div>
    </div>`;

    neighbourCountry.insertAdjacentHTML('beforeend', html);
};

// Fetching API
const getCountry = function (countryCode) {
    fetch(`https://restcountries.com/v2/alpha/${countryCode}`)
        .then((res) => {
            if (!res) throw new Error('Plese Check Alpha Code');
            return res.json();
        })
        .then((data) => {
            renderCountry(data);
            return data.borders;
        })
        .then((res) => {
            if (!res) throw new Error('No Neighbour Found');
            res.forEach((neighbour) => {
                fetch(`https://restcountries.com/v2/alpha/${neighbour}`)
                    .then((res) => res.json())
                    .then((data) => renderNeighbour(data));
            });
        })
        .catch(() => {
            neighbourCountry.innerHTML = `<h2>No Neighbour Found</h2>`;
        });
};

// Get Content By Search
seacrhBtn.addEventListener('click', function (e) {
    e.preventDefault();
    neighbourCountry.innerHTML = '';
    countryBox.innerHTML = '';
    const alphaCode = input.value;
    getCountry(alphaCode);
    input.value = '';
});

// Get Content By Clicking Neighbour Country Card
function myFunction(event) {
    const cardB = event.target.closest('.card-body');
    const eAlpha = cardB.dataset.alpha;
    neighbourCountry.innerHTML = '';
    countryBox.innerHTML = '';
    getCountry(eAlpha);
}

// Get Content By Clicking Tabel Cell
const alpha3s = document.querySelectorAll('table td:nth-of-type(3)');
alpha3s.forEach((alpha3) => {
    alpha3.setAttribute('data-bs-dismiss', 'modal');
    alpha3.addEventListener('click', function (e) {
        e.preventDefault();
        const talbeAlpha = alpha3.innerText;
        neighbourCountry.innerHTML = '';
        countryBox.innerHTML = '';
        getCountry(talbeAlpha);
    });
});

input.addEventListener('input', function () {
    if (input.value.length > 3 || input.value.length < 2) {
        input.classList.add('border-danger');
    } else {
        input.classList.remove('border-danger');
    }
});
