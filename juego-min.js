const miModulo=(()=>{"use strict";
let e=[];
const t=["C","D","H","S"],
n=["A","J","Q","K"];
let r=[];
const l=document.querySelector("#btnhit"),
a=document.querySelector("#btnGive"),
o=document.querySelector("#btnstart"),
s=document.querySelectorAll(".divCartas"),
d=document.querySelectorAll("small"),
c=(t=2)=>{e=i(),r=[];for(let e=0;e<t;e++)r.push(0);
    d.forEach(e=>e.innerText=0),
    s.forEach(e=>e.innerHTML=""),
    l.disabled=!1,
    a.disabled=!1},
    i=()=>{e=[];
        for(let n=2;n<=10;n++)for(let r of t)e.push(n+r);
        for(let r of t)for(let t of n)e.push(t+r);
        return _.shuffle(e)},
        u=()=>{if(0===e.length)throw"No hay cartas en el deck";
        return e.pop()},
        f=(e,t)=>(r[t]=r[t]+(e=>{const t=e.substring(0,e.length-1);
            return isNaN(t)?"A"===t?11:10:1*t})(e),
            d[t].innerText=r[t],r[t]),
            h=(e,t)=>{const n=document.createElement("img");
            n.src=`assets/cartas/${e}.png`,
            n.classList.add("carta"),
            s[t].append(n)},
            b=e=>{let t=0;
                do{
                    const e=u();
                    t=f(e,r.length-1),
                    h(e,r.length-1)}
                    while(t<e&&e<=21);
                    (()=>{
                        const[e,t]=r;
                        let n=r[0];
                        setTimeout(()=>{t===e?alert("Nadie gana :("):n>t&&n<=21||t>21?alert("Jugador gana"):(n<t&&t<=21||n>21)&&alert("Computadora gana")},100)})()};
                        return l.addEventListener("click",()=>{
                            const e=u(),
                            t=f(e,0);
                            h(e,0),
                            t>21?(l.disabled=!0,a.disabled=!0,b(t)):21===t&&(l.disabled=!0,a.disabled=!0,b(t))}),
                            a.addEventListener("click",()=>{l.disabled=!0,a.disabled=!0,b(r[0])}),
                            o.addEventListener("click",()=>{c()}),{nuevoJuego:c}})();
