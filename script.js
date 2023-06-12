let jsonData = [
    {
        "nombre": "Juan",
        "edad": 25,
        "ciudad": "México"
    },
    {
        "nombre": "María",
        "edad": 30,
        "ciudad": "Madrid"
    }
];

// Obtén la referencia a la tabla en el HTML
let tabla = document.getElementById("results");

// Crea la cabecera de la tabla
let thead = document.createElement("thead");
let trHead = document.createElement("tr");

for (let key in jsonData[0]) {
    let th = document.createElement("th");
    th.innerHTML = key;
    trHead.appendChild(th);
}

thead.appendChild(trHead);
tabla.appendChild(thead);

// Crea el cuerpo de la tabla
let tbody = document.createElement("tbody");

jsonData.forEach(function (obj) {
    let trBody = document.createElement("tr");
    
    for (let key in obj) {
        let td = document.createElement("td");
        td.innerHTML = obj[key];
        trBody.appendChild(td);
    }
    
    tbody.appendChild(trBody);
});

tabla.appendChild(tbody);