'use strict';
const d = document;

//Array productos
let aProductos = [
	{
		id: 1,
		nombre: 'Vinchas Skincare',
		imagen: 'imagenes/vinchas300x300.jpg',
		descripcion:'Vinchas para cuidado facial',
		precio: 300,
		link: 'vinchas.html',
		miniatura: 'imagenes/vinchas100x100.jpg',
	},
	{
		id: 2,
		nombre: 'Promoter Exel',
		imagen: 'imagenes/exepromoter300x300.jpg',
		descripcion:'Promoter marca Exel',
		precio: 899,
		link: 'promoterexel.html',
		miniatura: 'imagenes/exepromoter100x100.jpg',
	},
	{
		id: 3,
		nombre: 'Lidherma crema Hydrapore',
		imagen: 'imagenes/hydrapore300x300.jpg',
		descripcion:'crema Hydrapore marca Lidherma',
		precio: 1160,
		link: 'hydrapore.html',
		miniatura: 'imagenes/hydrapore100x100.jpg',
	},
	{
		id: 4,
		nombre: 'Pads reutilizables',
		imagen: 'imagenes/pads300x300.jpg',
		descripcion:'Pads skincare reutilizables',
		precio: 300,
		link: 'pads.html',
		miniatura: 'imagenes/pads100x100.jpg',
	},
	{
		id: 5,
		nombre: 'Idraet Vitamin C serum',
		imagen: 'imagenes/vitaminc300x300.jpg',
		descripcion:'Hidratante con vitamina C',
		precio: 1499,
		link: 'vitaminc.html',
		miniatura: 'imagenes/vitaminc100x100.jpg',
	},
	{
		id: 6,
		nombre: 'Ultra Renova pads',
		imagen: 'imagenes/lidhermapads300x300.jpg',
		descripcion:'Pads Lidherma Ultra Renova',
		precio: 799,
		link: 'ultrarenovapads.html',
		miniatura: 'imagenes/lidhermapads100x100.jpg',
	},
];

//Variables troncales
let contador = d.querySelector('#contador span');
let acumulador = 0;
let carrito = {
	items: [],
	cantidad: [],
	total: 0,
};
let cardHolder = d.querySelector('#cardHolder');

//Creacion de las cartas
for (let producto of aProductos) {
	let divCard = d.createElement('div');
	divCard.className = 'card col-6 productos';
	let divCardBody = d.createElement('div');
	divCardBody.className = 'card-body';
	let a = d.createElement('a');
	a.setAttribute('href', producto.link);
	let img = d.createElement('img');
	img.setAttribute('src', producto.imagen);
	img.className = 'card-img-top img-fluid';
	img.setAttribute('alt', producto.descripcion);
	let h3 = d.createElement('h3');
	h3.className = 'card-title';
	h3.innerHTML = `$${producto.precio}`;
	let p = d.createElement('p');
	p.className = 'card-text';
	p.innerHTML = producto.nombre;
	let agregar = d.createElement('button');
	agregar.className = 'btn btn-primary';
	agregar.innerHTML = 'Agregar al carrito';
	agregar.dataset.id = producto.id;
	agregar.dataset.precio = producto.precio;
	//Appendeamos
	cardHolder.appendChild(divCard);
	divCard.appendChild(a);
	a.appendChild(img);
	divCard.appendChild(divCardBody);
	divCardBody.appendChild(h3);
	divCardBody.appendChild(p);
	divCardBody.appendChild(agregar);
	//Agregar al carrito
	agregar.onclick = function() {
		let id = parseInt(this.dataset.id);
		let val = parseInt(this.dataset.precio);
		let indice = carrito.items.indexOf(id);
		if (indice == -1) {
			carrito.items.push(id);
			carrito.cantidad.push(1);
			acumulador++;
		} else {
			carrito.cantidad[indice]++;
			acumulador++;
		}
		carrito.total = parseInt(carrito.total) + val;
		contador.innerHTML = acumulador;
	}
}

//Carrito
function Carrito(){
	//Creacion de la ventana modal
	let bodyModal = d.createElement('div');
	bodyModal.className = 'modal fade';
	bodyModal.setAttribute('tabindex', '-1');
	bodyModal.setAttribute('role', 'dialog');
	bodyModal.setAttribute('id', 'carritoModal');
	
	let dialogModal = d.createElement('div');
	dialogModal.className = 'modal-dialog';
	dialogModal.setAttribute('role', 'document');
	bodyModal.appendChild(dialogModal);
	
	let contentModal = d.createElement('div');
	contentModal.className = 'modal-content';
	dialogModal.appendChild(contentModal);
	
	let headerModal = d.createElement('div');
	headerModal.className = 'modal-header';
	contentModal.appendChild(headerModal);
	
	let h4 = d.createElement('h4');
	h4.className = 'modal-title';
	h4.innerHTML = 'Tu carrito';
	h4.style.color = '#7c1f5d'
	headerModal.appendChild(h4);
	
	let cruz = d.createElement('button');
	cruz.className = 'close';
	cruz.setAttribute('type', 'button');
	cruz.setAttribute('data-dismiss', 'modal');
	cruz.setAttribute('aria-label', 'Close');
	headerModal.appendChild(cruz);
	let span = d.createElement('span');
	span.setAttribute('aria-hidden', 'true');
	span.innerHTML = '&times;';
	cruz.appendChild(span);

	let cuerpo = d.createElement('div');
	cuerpo.className = 'modal-body';
	//Aca pasa la magia
	if (carrito.total > 0) {
		let divCentrar = d.createElement('div');
		let totalFinal = d.createElement('span');
		divCentrar.className = 'd-flex flex-column justify-content-center align-items-center';
		totalFinal.style.fontWeight = '550';
		totalFinal.style.fontSize = '125%';
		totalFinal.innerHTML = `Total: $${carrito.total}`;
		for (let i = 0; i < carrito.items.length; i++) {
			let productoId = carrito.items[i];
			let productoCantidad = carrito.cantidad[i];
			for (let item of aProductos) {
				if (productoId == item.id) {
					//Si no hago esto y remuevo un item me queda colgado con 0
					if (productoCantidad > 0){
						let divMiniatura = d.createElement('div')
						let miniatura = d.createElement('img');
						let nombre = d.createElement('h4');
						let cantidad = d.createElement('span');
						let total = d.createElement('span');
						let mas = d.createElement('button');
						let menos = d.createElement('button');
						let orden = d.createElement('div');

						total.className = 'productoFinal';
						mas.className = 'btn-primary sumayrestaMiniatura';
						menos.className = 'btn-outline-primary sumayrestaMiniatura';
						cantidad.style.margin = '1px 18px';
						cantidad.style.fontWeight = '400';
						cantidad.style.fontSize = '120%';
						orden.style.marginBottom = '20px';
						orden.style.display = 'inline-block';
						orden.dataset.id = item.id;
						divMiniatura.style.display = 'inline-block';
						divMiniatura.style.marginRight = '20px';
						orden.style.verticalAlign = 'middle';
						miniatura.className = 'img-fluid';
						miniatura.setAttribute('src', item.miniatura);
						miniatura.setAttribute('alt', item.descripcion);
						miniatura.style.display = 'inline-block';

						nombre.innerHTML = item.nombre;
						cantidad.innerHTML = productoCantidad;
						total.innerHTML = `$${productoCantidad * item.precio}`;
						menos.innerHTML = '-';
						mas.innerHTML = '+';
						cuerpo.appendChild(divMiniatura);
						divMiniatura.appendChild(miniatura);
						cuerpo.appendChild(orden);
						orden.appendChild(nombre);
						orden.appendChild(total);
						orden.appendChild(menos);
						orden.appendChild(cantidad);
						orden.appendChild(mas);

						//Boton de borrar item
						let divEliminar = d.createElement('div');
						let eliminar = d.createElement('button');
						divEliminar.style.display = 'block';
						divEliminar.style.marginTop = '10px';
						eliminar.className = 'btn btn-primary';
						eliminar.innerHTML = 'Eliminar item';
						orden.appendChild(divEliminar);
						divEliminar.appendChild(eliminar);

						eliminar.onclick = function(){
							acumulador = acumulador - carrito.cantidad[i];
							contador.innerHTML = acumulador;
							carrito.total = carrito.total - (item.precio * productoCantidad);
							totalFinal.innerHTML = `Total: $${carrito.total}`;
							carrito.items[i] = 0;
							carrito.cantidad[i] = 0;
							if (carrito.total == 0) {
								bodyModal.remove();
								d.body.className = '';
								d.querySelector('.modal-backdrop').remove();
							}
							let idEliminar = orden.dataset.id;
							orden.remove(idEliminar);
						}

						//Boton de mas y menos
						mas.onclick = function(){
							productoCantidad++;
							carrito.cantidad[i]++;
							acumulador++;
							contador.innerHTML = acumulador;
							cantidad.innerHTML = productoCantidad;
							carrito.total = parseInt(carrito.total) + item.precio;
							total.innerHTML = `$${productoCantidad * item.precio}`;
							totalFinal.innerHTML = `Total: $${carrito.total}`;
						}
						menos.onclick = function(){
							if (productoCantidad > 1) {
								productoCantidad--;
								carrito.cantidad[i]--;
								acumulador--;
								contador.innerHTML = acumulador;
								cantidad.innerHTML = productoCantidad;
								carrito.total = parseInt(carrito.total) - item.precio;
								total.innerHTML = `$${productoCantidad * item.precio}`;
								totalFinal.innerHTML = `Total: $${carrito.total}`;
							}
						}
					}
				}
			}
		}
		cuerpo.appendChild(divCentrar);
		divCentrar.appendChild(totalFinal);

		//Boton de vaciar carrito
		let vaciar = d.createElement('button');
		vaciar.className = 'btn btn-outline-primary';
		vaciar.innerHTML = 'Vaciar carrito';
		divCentrar.appendChild(vaciar);
		vaciar.onclick = function(){
			carrito.items = [];
			carrito.cantidad = [];
			carrito.total = 0;
			acumulador = 0;
			contador.innerHTML = 0;
			bodyModal.remove();
			d.body.className = '';
			d.querySelector('.modal-backdrop').remove();
		}

	} else {
		let vacio = d.createElement('p');
		vacio.innerHTML = 'Tu carrito está vacío. ¡Comenzá a comprar!';
		cuerpo.appendChild(vacio);
	}

	contentModal.appendChild(cuerpo);

	//Footer (boton comprar y cerrar)
	let footerModal = d.createElement('div');
	footerModal.className = 'modal-footer';
	contentModal.appendChild(footerModal);

	let botonClose = d.createElement('button');
	botonClose.className = 'btn btn-outline-primary';
	botonClose.setAttribute('type', 'button');
	botonClose.setAttribute('data-dismiss', 'modal');
	botonClose.innerHTML = 'Cerrar';
	footerModal.appendChild(botonClose);
	botonClose.onclick = function() {
		bodyModal.remove();
	}

	let botonComprar = d.createElement('button');
	botonComprar.className = 'btn btn-primary';
	botonComprar.setAttribute('type', 'button');
	botonComprar.innerHTML = 'Comprar';
	footerModal.appendChild(botonComprar);

	d.body.appendChild(bodyModal);
}