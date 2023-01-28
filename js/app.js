const container = document.querySelector(".container");
const resultado = document.querySelector("#resultado");
const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  // Validar
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  if (ciudad === "" || pais === "") {
    mostrarError("Ambos campos son obligatorios");
    return;
  }
  // Consultar la API
  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
  const alerta = document.createElement("div");
  if (!document.querySelector(".error")) {
    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center",
      "error"
    );
    alerta.innerHTML = `
           <strong class="font-bold">Error!</strong>
           <span class="block">${mensaje}</span> 
        `;

    container.appendChild(alerta);
    setTimeout(() => {
      alerta.remove();
    }, 3000);
  }
}

function consultarAPI(ciudad, pais) {
  const appID = "2e6bad3350a95ba981395d777619756f";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;

  Spinner();

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      // limpiar el html previo del resultado
      limpiarHTML();
      if (datos.cod === "404") {
        mostrarError("No se ha encontrado la ciudad");
        return;
      }
      // imprime la respuesta en el html
      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const {
    name,
    main: { temp, temp_max, temp_min },
  } = datos;

  const centigrados = kelvinACentigrados(temp);
  const minCentigrados = kelvinACentigrados(temp_min);
  const maxCentigrados = kelvinACentigrados(temp_max);

  const nombreCiudad = document.createElement("p");
  nombreCiudad.textContent = `Clima en ${name}`;
  nombreCiudad.classList.add("font-bold", "text-2xl");

  const actual = document.createElement("p");
  actual.innerHTML = `${centigrados} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const tempMaxima = document.createElement("p");
  tempMaxima.innerHTML = `Max: ${maxCentigrados} &#8451`;
  tempMaxima.classList.add("text-xl");

  const tempMin = document.createElement("p");
  tempMin.innerHTML = `Min: ${minCentigrados} &#8451`;
  tempMin.classList.add("text-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(tempMin);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(tempMaxima);

  resultado.appendChild(resultadoDiv);
}

const kelvinACentigrados = (grados) => parseInt(grados - 273.15);

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function Spinner() {
    limpiarHTML();
    const divSpinner = document.createElement("div");
    divSpinner.classList.add("sk-cube-grid");
    divSpinner.innerHTML = `
            <div class="sk-cube sk-cube1"></div>
            <div class="sk-cube sk-cube2"></div>
            <div class="sk-cube sk-cube3"></div>
            <div class="sk-cube sk-cube4"></div>
            <div class="sk-cube sk-cube5"></div>
            <div class="sk-cube sk-cube6"></div>
            <div class="sk-cube sk-cube7"></div>
            <div class="sk-cube sk-cube8"></div>
            <div class="sk-cube sk-cube9"></div>
        `;

    resultado.appendChild(divSpinner);
}
