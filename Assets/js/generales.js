const modoNocheBtn = document.getElementById('theme-toggle');
const actualModo = localStorage.getItem('theme') || 'light';
const temaPagina = document.body;

let isDark = true;

if(actualModo == "dark"){
    temaPagina.classList.add('dark-theme');
    modoNocheBtn.innerHTML = '<i class="ri-sun-fill"></i>';
}else{
    modoNocheBtn.innerHTML = '<i class="ri-moon-line"></i>';
}


function themeMode(){
    isDark = !isDark;
    isDark ? modoNocheBtn.innerHTML = '<i class="ri-moon-line"></i>' : modoNocheBtn.innerHTML = '<i class="ri-sun-fill"></i>';
    temaPagina.classList.toggle('dark-theme');

    let theme = "light";
    if(temaPagina.classList.contains('dark-theme')){
        theme = "dark";
    }
    localStorage.setItem("theme", theme);

    console.log(localStorage.getItem('theme'));
}

modoNocheBtn.addEventListener('click', themeMode);

/*
document.addEventListener("DOMContentLoaded", async function() {
    try {
        const response = await fetch(base_url + "AdminPage/ListaDispositivoEmpresa", { method: 'GET' });
        const data = await response.json();
        contenidoPrincipal.innerHTML = data.text;

        // Modo noche
        const modoNocheBtn = document.getElementById('theme-toggle');
        const actualModo = localStorage.getItem('theme') || 'light';
        const doc = document.getElementById('contenidoPrincipal');
        const cards = doc.querySelectorAll('.card');

        let isDark = actualModo === "dark";

        if (isDark) {
            modoNocheBtn.innerHTML = '<i class="ri-sun-fill"></i>';
            cards.forEach(card => card.classList.add('dark-mode'));
        } else {
            modoNocheBtn.innerHTML = '<i class="ri-moon-line"></i>';
        }

        function themeMode() {
            isDark = !isDark;
            if (isDark) {
                modoNocheBtn.innerHTML = '<i class="ri-sun-fill"></i>';
                cards.forEach(card => card.classList.add('dark-mode'));
            } else {
                modoNocheBtn.innerHTML = '<i class="ri-moon-line"></i>';
                cards.forEach(card => card.classList.remove('dark-mode'));
            }

            let theme = isDark ? "dark" : "light";
            localStorage.setItem("theme", theme);
        }

        modoNocheBtn.addEventListener('click', themeMode);

        // Llamadas a otras funciones
        graficoPastel();
        graficoBarra();
        dataTableNestle();
        MapaLeaflet();
        alarmaModal();
        mensajeModal();
        horasModal();
        mostrarMasContenido();

    } catch (err) {
        alert(err);
    }
});*/