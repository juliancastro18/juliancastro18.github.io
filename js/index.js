const clickCatcher = document.querySelector('.click-catcher');
const modal = document.querySelector('#simpleModal');
const closeBtn = document.querySelector('.closeBtn');

const loading = document.querySelector('.loading');
const wrapper = document.querySelector('.sketchfab-embed-wrapper')
const iframe = document.querySelector( '#api-frame' );
const uid = '23a500c2e3e44cea8c0d467f7b7eba50';
const client = new Sketchfab( iframe );

const openModal = () => {
    modal.style.display = 'block';
}

const closeModal = () => {
    modal.style.display = 'none';
}

const clickOutside = e => {
    if(e.target == modal) {
        modal.style.display = 'none';
    }
}

// Listen for open click
clickCatcher.addEventListener('click', openModal);

// Listen for close click
closeBtn.addEventListener('click', closeModal);
// Listen for outside click
window.addEventListener('click', clickOutside);


client.init( uid, {
    success: function onSuccess( api ){
        api.start();
        api.addEventListener( 'viewerready', function() {
            iframe.style.display = "block";
            setTimeout( () => {
                loading.classList.add("disabled");
                setTimeout( ()=> {
                    loading.classList.add("hidden");
                }, 1000)
            }, 2000)
        } );
    },
    error: function onError() {
        console.log( 'Viewer error' );
    },
    autospin: 0.3,
    camera: 0,
    scrollwheel: 0,
    ui_hint: 0
} );