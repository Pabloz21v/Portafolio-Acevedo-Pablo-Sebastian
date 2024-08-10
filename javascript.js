document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('button[data-tech]');
    const modalTitle = document.getElementById('techModalLabel');
    // const modalImg = document.getElementById('techModalImg');
    
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
            // modalImg.textContent = `Proyectos con ${tech}`;
            projectsList.innerHTML = proyectosFiltrados.length > 0
              ? proyectosFiltrados.map(proyecto => `
                <li>
                  <h5>${proyecto.nombre}</h5>
                  <p><strong>Tecnologías:</strong> ${proyecto.tecnologias.join(', ')}</p>
                  <p><a href="${proyecto.link_youtube_esp}" target="_blank">Ver Video (Español)</a></p>
                  <p><a href="${proyecto.link_youtube_eng}" target="_blank">Ver Video (Inglés)</a></p>
                  <p><a href="${proyecto.link_github}" target="_blank">Ver en GitHub</a></p>
                  <p><a href="${proyecto.link_page}" target="_blank">Ver Proyecto</a></p>
                  <img src="${proyecto.imagen}" alt="${proyecto.nombre}" class="img-fluid">
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
  





