let player;
const modal = document.querySelector('#simpleModal');
const modalContent = document.querySelector('.modal-content')
let videoBtns = document.querySelectorAll('.video-btn');
let playerCreado = false;
let playerReady = false;


// FUNCIONES DE BOTONES

const verDisabled = () => (
    `<a class="btn ver disabled">ver</a>`
)
const verBtn = proyecto_obj => (
    `<a class="btn ver" href="${proyecto_obj.url ? proyecto_obj.url : '#'}">${proyecto_obj.btn_name ? proyecto_obj.btn_name : "ver"}</a>`
)
const btnExtra = btn_extra => (
    `<a data-value="${btn_extra.value ? btn_extra.value : ""}" class="btn ver ${btn_extra.class ? btn_extra.class : ""}" href="${btn_extra.url ? btn_extra.url : "#video"}">${btn_extra.btn_name ? btn_extra.btn_name : "ver"}</a>`
)

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
                            ${proyecto.proyecto_obj ? verBtn(proyecto.proyecto_obj) : verDisabled()}
                            ${proyecto.btn_extra ? btnExtra(proyecto.btn_extra) : ""}
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

    if(videoUrl==="dyyGB_A7ap4"){
        modalContent.classList.add('content-sd')
    } else if (modalContent.classList.contains('content-sd')) {
        modalContent.classList.remove('content-sd')
    }

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
