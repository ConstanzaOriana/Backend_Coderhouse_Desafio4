const socket = io();

const inputAdd = document.getElementById('inputAdd');
const btnAdd = document.getElementById('btnAdd');
const inputremove = document.getElementById('inputremove');
const btnremove = document.getElementById('btnremove');

btnAdd.addEventListener('click', () => {
    socket.emit('addProduct', inputAdd.value);
});

btnremove.addEventListener('click', () => {
    socket.emit('removeProduct', inputremove.value);
});

socket.on('viewProducts', data => {
    document.querySelector('p').innerText = data;
})