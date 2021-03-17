// Inserto navbar en html
document.write(`<div class="nav-stripe sticky">
<nav class="navbar">
    <div class="wrapper">
        <div class="brand-title"><a href="index.html"><h1>Julian Castro</h1></a></div>
        <a href="#" class="toggle-button">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
        </a>
    </div>
    <div class="navbar-links">
        <ul>
            <li><a class="navbar-btn" href="index.html">Inicio</a></li>
            <li><a class="navbar-btn" href="proyectos.html">Proyectos</a></li>
            <li><a class="navbar-btn" href="cv.html">CV</a></li>
            <li><a class="navbar-btn" href="contacto.html">Contacto</a></li>
        </ul>
    </div>
</nav>
</div>
<div class="nav-spacing"></div>`);

// Guardo elementos en constantes
const hamburgerBtn = document.querySelector('.toggle-button');
const links = document.querySelector('.navbar-links');
const navHeight = document.querySelector('.nav-stripe').clientHeight;
const navSpacing = document.querySelector('.nav-spacing');
const botones = document.querySelectorAll('.navbar-btn');

// Obtengo nombre de página
const nombreHtmlFromPath = path => (path.split("/").pop().split(".html")[0]);
const path = window.location.pathname;
const page = nombreHtmlFromPath(path);

// Si se presiona el hamburger button muestro/oculto menú
hamburgerBtn.addEventListener('click', () => {
    links.classList.toggle('active');
});

// Dejo margen superior del tamaño del navbar
navSpacing.style.height = navHeight + 'px';

// Le asigno la clase "activo" al botón correspondiente según página actual
if(page==="")page = "index"; //root = index
botones.forEach( boton => {
    if (nombreHtmlFromPath(boton.href) === page){
        boton.classList.add('active');
    }
})