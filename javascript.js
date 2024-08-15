const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))

document.addEventListener('DOMContentLoaded', function () {
  const buttons = document.querySelectorAll('button[data-tech]');
  const modalTitle = document.getElementById('techModalLabel');
  const projectsList = document.getElementById('projectsList');
  const techModal = new bootstrap.Modal(document.getElementById('techModal'));

  buttons.forEach(button => {
    button.addEventListener('click', function () {
      const tech = this.getAttribute('data-tech');

      // Simulación de solicitud a API
      fetch('projects.json')
        .then(response => response.json())
        .then(data => {
          const proyectos = data.proyectos || [];
          const proyectosFiltrados = proyectos.filter(proyecto =>
            proyecto.tecnologias.includes(tech)
          );

          modalTitle.textContent = `Proyectos con ${tech}`;
          projectsList.innerHTML = proyectosFiltrados.length > 0
            ? proyectosFiltrados.map(proyecto => `
                <li  >
                  <div class="card mb-3 ">
                    <div class="row g-0">
                      <div class="col-md-4 my-auto d-flex justify-content-center" >
                        <img src="${proyecto.imagen}" alt="${proyecto.nombre}" class="img-fluid">
                      </div>
                      <div class="col-md-8">
                        <div class="card-body">
                          <h5 class="card-title">${proyecto.nombre}</h5>
                          <p class="card-text"><strong>Tecnologías:</strong> ${proyecto.tecnologias.join(', ')}</p>
                          <p class="card-text">${proyecto.descripcion}</p>
                          <div class="list-group list-group-horizontal gap-2">
                            <ul class="list-group">
                              <li class="list-group-item">
                                <p class="card-text"><a href="${proyecto.link_github}" target="_blank">Ver en GitHub</a></p>
                              </li>
                              <li class="list-group-item">
                                <p class="card-text"><a href="${proyecto.link_page}" target="_blank">Ver Proyecto</a></p>
                              </li>
                            </ul>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              `).join('')
            : `<p>No hay proyectos con ${tech} aún.</p>`;

          // Mostrar el modal
          techModal.show();
        })
        .catch(error => console.error('Error al cargar los datos:', error));
    });
  });

  // Asegurarse de cerrar completamente el modal
  document.getElementById('techModal').addEventListener('hidden.bs.modal', function () {
    document.body.classList.remove('modal-open');
    document.querySelector('.modal-backdrop').remove();
  });
});






// <ul class="list-group">
//                               <li class="list-group-item">
//                                 <p class="card-text"><a href="${proyecto.link_youtube_esp}" target="_blank">Ver Video (Español)</a></p>
//                               </li>
//                               <li class="list-group-item">
//                                 <p class="card-text"><a href="${proyecto.link_youtube_eng}" target="_blank">Ver Video (Inglés)</a></p>
//                               </li>
//                             </ul>

{/* <p class="card-text"><small class="text-body-secondary">Last updated 3 mins ago</small></p> */ }