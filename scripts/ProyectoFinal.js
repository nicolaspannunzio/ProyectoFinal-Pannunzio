//? Proyecto Final - JavaScript - Octubre 2023

const api = {
    key: '4a3b57d4930a1713b15b6b8028ead20b',
    url: `https://api.openweathermap.org/data/2.5/weather`
}

let temperaturaValor = document.getElementById("temperatura-valor");
let temperaturaDescripcion = document.getElementById("temperatura-descripcion");
let ubicacion = document.getElementById("ubicacion");
let iconoAnimado = document.getElementById("icono-Animado");
let humedad = document.getElementById('humedad') 

function obtenerDatos() {
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          const latSantaFe = -31.6333;
          const lonSantaFe = -60.7000;

          fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latSantaFe}&lon=${lonSantaFe}&lang=es&units=metric&appid=${api.key}`)
                .then((response) => response.json())
                .then(data => {
                console.log(data)
                let temp = Math.round(data.main.temp);
                temperaturaValor.innerHTML = `<h3>${temp} °C</h3>`;
                let desc = data.weather[0].description;
                temperaturaDescripcion.textContent = desc;
                ubicacion.textContent = data.name;
                humedad.innerHTML = `<h3>${data.main.humidity} %</h3>`

                switch (data.weather[0].main){
                    case 'Thunderstorm':
                      iconoAnimado.src='../assets/ImgClima//thunder.svg'
                      console.log('TORMENTA');
                      break;
                    case 'Drizzle':
                      iconoAnimado.src='../assets/ImgClima//rainy-2.svg'
                      console.log('LLOVIZNA');
                      break;
                    case 'Rain':
                      iconoAnimado.src='../assets/ImgClima//rainy-7.svg'
                      console.log('LLUVIA');
                      break;
                    case 'Snow':
                      iconoAnimado.src='../assets/ImgClima//snowy-6.svg'
                      console.log('NIEVE');
                      break;                        
                    case 'Clear':
                      iconoAnimado.src='../assets/ImgClima//day.svg'
                      console.log('LIMPIO');
                      break;
                    case 'Atmosphere':
                      iconoAnimado.src='../assets/ImgClima//weather.svg'
                      console.log('ATMOSFERA');
                      break;  
                    case 'Clouds':
                      iconoAnimado.src='../assets/ImgClima//cloudy-day-1.svg'
                      console.log('NUBES');
                      break;  
                    default:
                      iconoAnimado.src='../assets/ImgClima//cloudy-day-1.svg'
                      console.log('por defecto');
                }
            })
            .catch((error) => {
                console.error("Error al obtener la info", error);
            });
        });
    } else {
        console.error("Geolocalización no es compatible en este navegador.");
    }
}

obtenerDatos();