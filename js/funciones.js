const url = 'http://localhost:8686/api/colegio';

const listarColegio = async () => {
  let body = document.getElementById('contenido');
  if (body) {
    let mensaje = '';

    fetch(url)
      .then(res => res.json())
      .then(function (data) {
        let listarColegios = data.colegios;
        listarColegios.map((colegios) => {
          mensaje += `<tr><td>${colegios.direccion}</td>` +
            `<td>${colegios.latitud}</td>` +
            `<td>${colegios.longitud}</td>` +
            `<td>${colegios.fechaReporte}</td>` +
            `<td>${colegios.descripcion}</td>` +
            `<td><a class="waves-effect waves-light btn modal-trigger" href="#idModal" onclick='editar(${JSON.stringify(colegios)})'>Editar</a>
            <a class="waves-effect waves-light btn modal-trigger red" href="#" onclick='eliminar("${colegios._id}")'>Eliminar</a>
            </td></tr>` 
            
            
            body.innerHTML = mensaje;
                
            });
        });
    }
};

listarColegio();

const registrarColegio = async () => {
  let direccion = document.getElementById('direccion').value;
  let latitud = parseFloat(document.getElementById('latitud').value);
  let longitud = parseFloat(document.getElementById('longitud').value);
  let descripcion = document.getElementById('descripcion').value;

  let colegios = {
    direccion: direccion,
    latitud: latitud,
    longitud: longitud,
    descripcion: descripcion
  };

  if (
    (latitud >= 6.14 && latitud <= 6.200 && !isNaN(latitud)) &&
  (longitud >= -75.50 && longitud <= -75.43 && !isNaN(longitud))

  ) {
    fetch(url, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(colegios),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.location.href = "listar.html";
      });
  } else {
    alert('No se puede registrar');
  }
};



const editar = (colegios) => {
  document.getElementById('_id').value = '';
  document.getElementById('direccion').value = '';
  document.getElementById('latitud').value = '';
  document.getElementById('longitud').value = '';
  document.getElementById('descripcion').value = '';

  document.getElementById('_id').value = colegios._id;
  document.getElementById('direccion').value = colegios.direccion;
  document.getElementById('latitud').value = colegios.latitud;
  document.getElementById('longitud').value = colegios.longitud;
  document.getElementById('descripcion').value = colegios.descripcion;
};

const actualizarColegio = async () => {
  let direccion = document.getElementById('direccion').value;
  let latitud = parseFloat(document.getElementById('latitud').value);
  let longitud = parseFloat(document.getElementById('longitud').value);
  let descripcion = document.getElementById('descripcion').value;

  let colegios = {
    _id: document.getElementById('_id').value,
    direccion: direccion,
    latitud: latitud,
    longitud: longitud,
    descripcion: descripcion,
    tipoModificacion: 'Unitaria'
  };

  if (
    (latitud >= 6.14 && latitud <= 6.200 && !isNaN(latitud)) &&
    (longitud >= -75.50 && longitud <= -75.43 && !isNaN(longitud))
  ) {
    fetch(url, {
      method: 'PUT',
      mode: 'cors',
      body: JSON.stringify(colegios),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        window.location.href = "listar.html";
      });
  } else {
    alert('No se puede actualizar');
  }
};



const eliminar = (_id) => {
  if (confirm('¿Está seguro de realizar la eliminación?') == true) {
      let colegios = {
          _id: _id
        };

        fetch(url, {
            method: 'DELETE',
      mode: 'cors',
      body: JSON.stringify(colegios),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    })
    .then(response => response.json())
    .then(json => {
        alert(json.mensaje);
        window.location.href = "listar.html";
      });
  }
};

if (document.querySelector('#btnActualizar')) {
  document.querySelector('#btnActualizar')
    .addEventListener('click', actualizarColegio);
}

if (document.querySelector('#btnRegistrar')) {
  document.querySelector('#btnRegistrar')
    .addEventListener('click', registrarColegio);
}
