const searchBtn = document.getElementById('searchBtn');
const countryInput = document.getElementById('countryInput');
const resultDiv = document.getElementById('result');

searchBtn.addEventListener('click', () => {
    let countryName = countryInput.value.trim();
    if (countryName === "") return;

    let url = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("País no encontrado");
            return response.json();
        })
        .then(data => {
            const country = data[0]; 
            
            resultDiv.innerHTML = `
                <img src="${country.flags.svg}" alt="Bandera">
                <h2>${country.name.common}</h2>
                <div class="info-item">
                    <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
                    <p><strong>Población:</strong> ${country.population.toLocaleString()}</p>
                    <p><strong>Continente:</strong> ${country.region}</p>
                    <p><strong>Moneda:</strong> ${Object.values(country.currencies)[0].name}</p>
                </div>
            `;
        })
        .catch(error => {
            resultDiv.innerHTML = `<p style="color:red;">${error.message}</p>`;
        });
});