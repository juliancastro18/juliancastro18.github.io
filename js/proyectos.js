function getProyectos(){
    fetch('proyectos.json')
    .then(res => res.json())
    .then(data => {
        let output = '';
        data.forEach( proyecto => {
            output += `
            <div class="proyecto-container">

                    <img class="img-content" src="${proyecto.img_url}" \>

                <div class="text-container">
                    <h2>${proyecto.titulo}</h2>
                    <h3>${proyecto.subtitulo}</h3>
                    <p>${proyecto.descripcion}</p>
                    <div class="botones-container">
                        <a class="btn ver ${proyecto.proyecto_url === undefined ? "disabled" : ""}" href="${proyecto.proyecto_url === undefined ? "#" : proyecto.proyecto_url}">ver</a>
                        <a class="btn github ${proyecto.github_url === undefined ? "disabled" : ""}" href="${proyecto.github_url === undefined ? "#" : proyecto.github_url}">github</a>
                    </div>
                </div>
            </div>
            `;
        });
        document.querySelector('#output').innerHTML = output;
})};

getProyectos();