const openMenu = document.querySelector("#menu-hamburguesa");
const closeMenu = document.querySelector("#menu-hamburguesa-cerrar");
const aside = document.querySelector("aside");

openMenu.addEventListener("click", () => {
    aside.classList.add("aside-active");
})

closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-active");
})

btnCategorias.forEach(boton => boton.addEventListener("click", () => {
    aside.classList.remove("aside-active");
}))