// main variables
const form = document.getElementById('form');
const search = document.querySelector('#search');
const content = document.querySelector('.main-content');
const spinner = document.querySelector('.spinner-wrapper');
const reload = document.querySelector('header a');

// event listeners
form.addEventListener('submit' , (e) => {
  e.preventDefault();
  spinner.style.display = 'flex';
  const weatherSource = `https://api.openweathermap.org/data/2.5/weather?q=${search.value}&appid=cb4b316ea7ff3ec1b3b96455c376cb8a`;
  const photoSource = `https://pixabay.com/api/?key=14392760-281ce1fc01330fca172fd23a0&q=${search.value}`
  getData(weatherSource, data => {
    getData(photoSource, photo => {
      updateUI(data, photo);
      setTimeout(() => spinner.style.display = 'none', 2000);
    });
  });
  form.reset();
});
// reload page
reload.addEventListener('click', () => location.reload());

// unix to GMT
function timeConvert(data, type) {
  let date = new Date(data * 1000);
  date = date.toLocaleString();
  if(type === 'full'){
    return date;
  } else {
    date = date.slice(11, 17);
    return date;
  }
}

// get random number for photos
function getRandom(){
  // from 0 to 18
  return Math.floor(Math.random() * 19);
}

// update the UI 
function updateUI(data, photo) {
  if(data === 'Error 404(Not Found)'){
    template = `
    <div class="error">
      <h2>Error 404(Not Found)</h2>
    </div>`
    // add error template to content
    content.innerHTML = template;
  } else {
    let template =  `
    <div class="city">
            <h3>${data.name}</h3>
            <h5>${timeConvert(data.dt, 'full')}</h5>
          </div>
          <div class="card">
            <div class="photo">
              <img src="${photo.hits[getRandom()].webformatURL}" alt="london-day">
            </div>
    
            <div class="details">
              <ul>
                <li>Temperature: ${((data.main.temp) - 273.15).toFixed(1)}°C</li>
                <li>Cloudiness: ${data.weather[0].description}</li>
                <li>Wind: ${data.wind.speed} m/s</li>
                <li>Wind-Direction: ${data.wind.deg}°</li>
                <li>Humidity: ${data.main.humidity}%</li>
                <li>Sunrise:	${timeConvert(data.sys.sunrise, 'min')}</li>
                <li>Sunset:	${timeConvert(data.sys.sunset, 'min')}</li>
              </ul>
            </div>
          </div>`
    // add the template to the content
    content.innerHTML = template;
  }
}