let searchBtn = document.getElementById("search-btn");
let countryInp = document.getElementById("country-inp");
let countryContainer = document.querySelector("#result");
//`https://restcountries.com/v3.1/name/${countryName}?fullText=true`

const getUserCountry = function () {
  return new Promise(function (resolve, reject) {
    resolve(countryInp.value);
    reject("No country found");
  });
};

const renderCountry = function (country) {
  let countryEl = `
        <img src="${country.flags.svg}" class="flag-img">
        <h2>${country.name.common}</h2>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Capital:</h4>
                <span>${country.capital[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Continent:</h4>
                <span>${country.continents[0]}</span>
            </div>
        </div>
         <div class="wrapper">
            <div class="data-wrapper">
                <h4>Population:</h4>
                <span>${country.population}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Currency:</h4>
                <span>${
                  country.currencies[Object.keys(country.currencies)].name
                } - ${Object.keys(country.currencies)[0]}</span>
            </div>
        </div>
        <div class="wrapper">
            <div class="data-wrapper">
                <h4>Language:</h4>
                <span>${Object.values(country.languages)[0]}</span>
            </div>
        </div>
         
      `;
  countryContainer.innerHTML = countryEl;
};

const getCountryGuid = async function () {
  try {
    const getInput = await getUserCountry();
    const data = await fetch(
      `https://restcountries.com/v3.1/name/${getInput.toLowerCase()}?fullText=true`
    );
    const country = await data.json();
    renderCountry(country[0]);
  } catch (err) {
    countryContainer.innerHTML = `<h3>Please type a country name</h3>`;
  }
};
searchBtn.addEventListener("click", getCountryGuid);
