// Algunas variables
let d = grid.getElementsByTagName('div');
let col = numeroColumnas();
let fila = numeroFilas();

// Calculo numero filas y columnas

function numeroFilas() {
    let filaelem = document.querySelector(':root');
    let filastyle = getComputedStyle(filaelem);
    let fila = filastyle.getPropertyValue('--rows');
    return fila;
}

function numeroColumnas() {
    let colelem = document.querySelector(':root');
    let colstyle = getComputedStyle(colelem);
    let col = colstyle.getPropertyValue('--cols');
    return col;
}

// Cambio blanco - negro - x

function clickeado(el) {
    return el.classList.contains('clicked') || Boolean(el.innerHTML);
}

function drawX(el){
    el.oncontextmenu = function() {
        if (this.classList.contains('clicked')) return;
        Boolean(el.innerHTML) ? el.innerHTML="" :
        el.innerHTML="<svg><line x1='5' y1='5' x2='35' y2='35' style='stroke:black;stroke-width:1.5px;'/><line x1='5' y1='35' x2='35' y2='5' style='stroke:black;stroke-width:1.5px;'/></svg>";
    }
}

function blackWhite(el){
    el.onclick = function(){
        if (Boolean(el.innerHTML)) return;
        this.classList.contains('clicked') ? this.classList.remove('clicked') : this.classList.add('clicked');
    }
}

for (let i=0; i<=d.length-1; ++i) {
    blackWhite(d[i]);
    drawX(d[i]);
}

// Botones que añaden o quitan filas y columnas

function addRow() {
    document.querySelector(':root').style.setProperty('--rows',++fila)

    textfilas.value = fila;

    for(let i = 1; i<= col; i++){
        divi = document.createElement('div');
        grid.append(divi);
        blackWhite(divi)
        drawX(divi)
    }
    casillas_vertical.append(document.createElement('div'));
}

function removeRow() {
    if (fila==1) return;
    
    document.querySelector(':root').style.setProperty('--rows',--fila)

    textfilas.value = fila;

    for(let i = 1; i<= col; i++){
        grid.lastElementChild.remove();
    }
    casillas_vertical.lastElementChild.remove();
}

function addCol() {

    document.querySelector(':root').style.setProperty('--cols',++col)

    textcol.value = col;

    for(let i = 1; i<=fila ; i++){
        divi = document.createElement('div');
        d[col*i-2].after(divi);
        blackWhite(divi);
        drawX(divi);
    }
    casillas_horizontal.append(document.createElement('div'));
}

function removeCol() {
    if (col==1) return;

    document.querySelector(':root').style.setProperty('--cols',--col)

    textcol.value = col;

    for(let i = 1; i<=fila; i++){
        d[col*i].remove();
    }
    casillas_horizontal.lastElementChild.remove();
}

// Cambio de color fondo

Juega.onclick = function () {
    body = document.getElementsByTagName("body")[0]
    body.classList.remove(body.className);
    body.classList.add("jugar")
}

Crea.onclick = function () {
    body = document.getElementsByTagName("body")[0]
    body.classList.remove(body.className);
    body.classList.add("crear")
}

Solucionador.onclick = function () {
    body = document.getElementsByTagName("body")[0]
    body.classList.remove(body.className);
    body.classList.add("solucionar")
}

// Solo numeros en input numbers

function soloNumeros(tecla) {
    return (tecla >= '0' && tecla <= '9') || ['ArrowLeft','ArrowRight','Delete','Backspace','Tab'].includes(tecla);
}

// Modo CREA: generacion numeros vertical y horizontal

for (i=0;i<=col-1;i++){
    casillas_horizontal.getElementsByTagName('div')[i].innerHTML="<p>0</p>"
}

//casillas_horizontal.getElementsByTagName('div')[0].innerHTML="<p>0</p><p>1</p><p>2</p>"