import '../styles/dark-mode.css';

const cookies = document.cookie.split(";");
cookies.some(e => e.includes("color-scheme=dark"))
    ? document.getElementsByTagName("html")[0].setAttribute("color-scheme", "dark")
    : cookies.some(e => e.includes("color-scheme=light")) && document.getElementsByTagName("html")[0].setAttribute("color-scheme", "light");
