const menu = document.querySelector('#menu');
const maincontent = document.querySelector("main");

function hideMenu() {
        menu.style.backgroundColor = "var(--primary)";
        document.querySelector("navbar").style.display = "none";
        menuVisibility = true;
}

let menuVisibility = true;
menu.onclick = () => {
    if (menuVisibility) {
        menu.style.backgroundColor = "var(--secondary)";
        document.querySelector("navbar").style.display = "block";
        menuVisibility = false;
    } else {
        hideMenu();
    }
}

maincontent.onclick = () => {
    if (!menuVisibility) {
        hideMenu();
    }
}
