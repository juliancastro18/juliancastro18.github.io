let player;
const modal = document.querySelector('#simpleModal');
let videoBtns = document.querySelectorAll('.video-btn');
let playerCreado = false;
let playerReady = false;

// CARGAR PROYECTOS

function getProyectos() {
    return new Promise(function(resolve, reject) {
        fetch('proyectos.json')
        .then(res => res.json())
        .then(data => {
            let output = '<div class="proyectos-container">';
            data.forEach( proyecto => {
                output += `
                    <img class="img-content" src="${proyecto.img_url}" \>
                    
                    <div class="text-container">
                        <h2>${proyecto.titulo}</h2>
                        <h3>${proyecto.subtitulo}</h3>
                        <p>${proyecto.descripcion}</p>
                        <div class="botones-container">
                            <a class="btn ver ${proyecto.proyecto_obj ? "" : "disabled"}" href="${proyecto.proyecto_obj.url ? proyecto.proyecto_obj.url : "#"}">${proyecto.proyecto_obj.btn_name ? proyecto.proyecto_obj.btn_name : "ver"}</a>
                            ${proyecto.btn_extra ? `<a data-value="${proyecto.btn_extra.value ? proyecto.btn_extra.value : ""}" class="btn ver ${proyecto.btn_extra.class ? proyecto.btn_extra.class : ""}" href="${proyecto.btn_extra.url ? proyecto.btn_extra.url : "#video"}">${proyecto.btn_extra.btn_name ? proyecto.btn_extra.btn_name : "ver"}</a>` : ""}
                            <a class="btn github ${proyecto.github_url ? "" : "disabled"}" href="${proyecto.github_url ? proyecto.github_url : "#"}">github</a>
                        </div>
                    </div>

                    <div class="divisor"><div class="linea"></div></div>
                
                `;
            });
            output += "</div>"
            document.querySelector('#output').innerHTML = output;
        }).then(resolve)
    })
};


// FUNCIONES MODAL

const openModal = (videoUrl) => {
    crearPlayerYT() //si no está cargado el script, lo cargo

    const intervalo = setInterval(()=>{
        if(playerReady){
            player.loadVideoById(videoUrl, 0, "large")
            clearInterval(intervalo)
        }
    },200) // espero a que esté el script listo para cargar el video

    modal.style.display = 'block'; // muestro el modal
}
const closeModal = () => {
    stopVideo();
    modal.style.display = 'none';
}
const clickOutside = e => {
    if(e.target == modal) {
        stopVideo();
        modal.style.display = 'none';
    }
}

// CARGAR LISTENERS

const cargarListeners = () => {
    videoBtns = document.querySelectorAll('.video-btn');

    videoBtns.forEach( button => {
        button.addEventListener('click', e => {openModal(e.target.dataset.value)})
    } )
}

// PLAYER YOUTUBE

const crearPlayerYT = () => {
    if(!playerCreado){
        let tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        
        let firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        playerCreado = true;
    }
}

function onYouTubePlayerAPIReady() {
    player = new YT.Player('player', {
        width: '640',
        height: '480',
        videoId: null,
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}


function onPlayerReady() {
    playerReady = true;
}
// when video ends
function onPlayerStateChange(event) {        
    if(event.data === 0) {          
        closeModal();
    }
}

const playVideo = () => {
    if(player) player.playVideo();
}
const stopVideo = () => {
    if(player) player.stopVideo();
}



// Listen for outside click
window.addEventListener('click', clickOutside);
// Cargar proyectos, luego listeners
getProyectos().then(cargarListeners);
