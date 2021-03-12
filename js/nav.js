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
            <li><a href="index.html">Inicio</a></li>
            <li><a href="proyectos.html">Proyectos</a></li>
            <li><a href="cv.html">CV</a></li>
            <li><a href="contacto.html">Contacto</a></li>
        </ul>
    </div>
</nav>
</div>
<div class="nav-spacing"></div>`);

const hamburgerBtn = document.querySelector('.toggle-button');
const links = document.querySelector('.navbar-links');
const navHeight = document.querySelector('.nav-stripe').clientHeight;
const navSpacing = document.querySelector('.nav-spacing')


hamburgerBtn.addEventListener('click', () => {
    links.classList.toggle('active');
});

navSpacing.style.height = navHeight + 'px';