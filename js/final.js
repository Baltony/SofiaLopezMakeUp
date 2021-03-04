'use strict';
const d = document;

//Array productos
let aProductos = [
	{
		id: 1,
		nombre: 'Vinchas Skincare',
		imagen: 'imagenes/vinchas300x300.jpg',
		descripcion:'Cómodas, funcionales y muy combinables. Además son reutilizables.',
		precio: 300,
		miniatura: 'imagenes/vinchas100x100.jpg',
	},
	{
		id: 2,
		nombre: 'Promoter Exel',
		imagen: 'imagenes/exepromoter300x300.jpg',
		descripcion:'Una fórmula creada por el laboratorio Exel para lograr unas pestañas y cejas que destaquen tu mirada.',
		precio: 899,
		miniatura: 'imagenes/exepromoter100x100.jpg',
	},
	{
		id: 3,
		nombre: 'Lidherma crema Hydrapore',
		imagen: 'imagenes/hydrapore300x300.jpg',
		descripcion:'Alivia la sensación de tirantez y brinda elasticidad y suavidad.',
		precio: 1160,
		miniatura: 'imagenes/hydrapore100x100.jpg',
	},
	{
		id: 4,
		nombre: 'Pads reutilizables',
		imagen: 'imagenes/pads300x300.jpg',
		descripcion:'Los pads estan hechos a manos, hechos de tela lavable, muy suaves de un lado para desmaquillar y del otro lado son de tela de toalla como para exfoliar o retirar una mascarilla.',
		precio: 300,
		miniatura: 'imagenes/pads100x100.jpg',
	},
	{
		id: 5,
		nombre: 'Idraet Vitamin C serum',
		imagen: 'imagenes/vitaminc300x300.jpg',
		descripcion:'Repara las pieles dañadas o prematuramente envejecidas⁣.',
		precio: 1499,
		miniatura: 'imagenes/vitaminc100x100.jpg',
	},
	{
		id: 6,
		nombre: 'Ultra Renova pads',
		imagen: 'imagenes/lidhermapads300x300.jpg',
		descripcion:'Sirven para realizar una limpieza profunda y renovar nuestra piel. Mejora manchas, lesiones por sol, acné, control de sebo (oleosidad).',
		precio: 799,
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
let mostrarTotal = d.querySelector('#total span');
mostrarTotal.innerHTML = `$${carrito.total}`;

//Creacion de las cartas
for (let producto of aProductos) {
	let divCard = d.createElement('div');
	divCard.className = 'card col-6 productos';
	let divCardBody = d.createElement('div');
	divCardBody.className = 'card-body';
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
	divCard.appendChild(img);
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
		mostrarTotal.innerHTML = `$${carrito.total}`;
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
	cuerpo.className = 'modal-body centrar';
	//Aca pasa la magia
	if (carrito.total > 0) {
		let divCentrar = d.createElement('div');
		let totalFinal = d.createElement('span');
		divCentrar.className = 'centrar';
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
						let miniatura = d.createElement('img');
						let nombre = d.createElement('h4');
						let cantidad = d.createElement('span');
						let total = d.createElement('span');
						let mas = d.createElement('button');
						let menos = d.createElement('button');
						let orden = d.createElement('div');
						let centrar = d.createElement('div');

						total.className = 'productoFinal';
						mas.className = 'btn-primary sumayrestaMiniatura';
						menos.className = 'btn-outline-primary sumayrestaMiniatura';
						cantidad.style.margin = '1px 18px';
						cantidad.style.fontWeight = '400';
						cantidad.style.fontSize = '120%';
						orden.className = 'orden';
						centrar.dataset.id = item.id;
						miniatura.className = 'img-fluid ordenMini';
						miniatura.setAttribute('src', item.miniatura);
						miniatura.setAttribute('alt', item.descripcion);
						if (orden.dataset.id == 3 || orden.dataset.id == 5){
							orden.style.width = '60%';
						}

						nombre.innerHTML = item.nombre;
						cantidad.innerHTML = productoCantidad;
						total.innerHTML = `$${productoCantidad * item.precio}`;
						menos.innerHTML = '-';
						mas.innerHTML = '+';
						cuerpo.appendChild(centrar);
						centrar.appendChild(miniatura);
						centrar.appendChild(orden);
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
								d.body.style.paddingRight = '0';
								d.querySelector('.modal-backdrop').remove();
							}
							let idEliminar = orden.dataset.id;
							orden.remove(idEliminar);
							miniatura.remove(idEliminar);
							mostrarTotal.innerHTML = `$${carrito.total}`;
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
							mostrarTotal.innerHTML = `$${carrito.total}`;
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
								mostrarTotal.innerHTML = `$${carrito.total}`;
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
			d.body.style.paddingRight = '0';
			d.querySelector('.modal-backdrop').remove();
			mostrarTotal.innerHTML = `$${carrito.total}`;
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

	//Boton comprar y checkout
	botonComprar.onclick = function() {
		//Removemos el carrito
		if (carrito.total > 0) {
			bodyModal.remove();
			d.body.className = '';
			d.querySelector('.modal-backdrop').remove();

			//Pasamos a formar la modal del checkout
			let fondoModalCheck = d.createElement('div');
			fondoModalCheck.className = 'container-fluid fondoCompra';
			d.body.appendChild(fondoModalCheck);

			let cuerpoModalCheck = d.createElement('div');
			cuerpoModalCheck.className = 'compra';
			fondoModalCheck.appendChild(cuerpoModalCheck);

			let tituloModalCheck = d.createElement('div');
			tituloModalCheck.className = 'titulillo';
			cuerpoModalCheck.appendChild(tituloModalCheck);

			let equis = d.createElement('span');
			equis.className = 'equis';
			equis.innerHTML = '&times;';
			tituloModalCheck.appendChild(equis);

			let h4ModalCheck = d.createElement('h4');
			h4.innerHTML = 'Checkout';
			tituloModalCheck.appendChild(h4);

			let form = d.createElement('form');
			form.setAttribute('action', '#');
			form.setAttribute('method', 'post');
			form.setAttribute('enctype', 'multipart/form-data');
			cuerpoModalCheck.appendChild(form);

			let nombreApellido = d.createElement('div');
			nombreApellido.className = 'form-row';
			form.appendChild(nombreApellido);

			let divNombre = d.createElement('div');
			divNombre.className = 'form-group col-md-6';
			nombreApellido.appendChild(divNombre);

			let labelNombre = d.createElement('label');
			labelNombre.setAttribute('for', 'inputNombre');
			labelNombre.innerHTML = 'Nombre';
			divNombre.appendChild(labelNombre);

			let inputNombre = d.createElement('input');
			inputNombre.setAttribute('type', 'text');
			inputNombre.required = true;
			inputNombre.setAttribute('id', 'inputNombre');
			inputNombre.setAttribute('name', 'nombre');
			inputNombre.setAttribute('placeholder', 'Nombre');
			inputNombre.className = 'form-control';
			divNombre.appendChild(inputNombre);

			let divApellido = d.createElement('div');
			divApellido.className = 'form-group col-md-6';
			nombreApellido.appendChild(divApellido);

			let labelApellido = d.createElement('label');
			labelApellido.setAttribute('for', 'inputApellido');
			labelApellido.innerHTML = 'Apellido';
			divApellido.appendChild(labelApellido);

			let inputApellido = d.createElement('input');
			inputApellido.setAttribute('type', 'text');
			inputApellido.required = true;
			inputApellido.setAttribute('id', 'inputApellido');
			inputApellido.setAttribute('name', 'apellido');
			inputApellido.setAttribute('placeholder', 'Apellido');
			inputApellido.className = 'form-control';
			divApellido.appendChild(inputApellido);

			let divTelefono = d.createElement('div');
			divTelefono.className = 'form-group';
			form.appendChild(divTelefono);

			let labelTelefono = d.createElement('label');
			labelTelefono.setAttribute('for', 'inputTelefono');
			labelTelefono.innerHTML = 'Teléfono';
			divTelefono.appendChild(labelTelefono);

			let inputTelefono = d.createElement('input');
			inputTelefono.setAttribute('type', 'number');
			inputTelefono.required = true;
			inputTelefono.setAttribute('id', 'inputTelefono');
			inputTelefono.setAttribute('name', 'telefono');
			inputTelefono.setAttribute('placeholder', 'Teléfono');
			inputTelefono.className = 'form-control';
			divTelefono.appendChild(inputTelefono);

			let divEmail = d.createElement('div');
			divEmail.className = 'form-group';
			form.appendChild(divEmail);

			let labelEmail = d.createElement('label');
			labelEmail.setAttribute('for', 'inputEmail');
			labelEmail.innerHTML = 'Email';
			divEmail.appendChild(labelEmail);

			let inputEmail = d.createElement('input');
			inputEmail.setAttribute('type', 'email');
			inputEmail.required = true;
			inputEmail.setAttribute('id', 'inputEmail');
			inputEmail.setAttribute('name', 'email');
			inputEmail.setAttribute('placeholder', 'Email');
			inputEmail.className = 'form-control';
			divEmail.appendChild(inputEmail);

			let divLugarYFecha = d.createElement('div');
			divLugarYFecha.className = 'form-row';
			form.appendChild(divLugarYFecha);

			let divLugar = d.createElement('div');
			divLugar.className = 'form-group col-md-6';
			divLugarYFecha.appendChild(divLugar);

			let labelLugar = d.createElement('label');
			labelLugar.setAttribute('for', 'inputEntrega');
			labelLugar.innerHTML = 'Lugar de entrega';
			divLugar.appendChild(labelLugar);

			let inputLugar = d.createElement('input');
			inputLugar.setAttribute('type', 'text');
			inputLugar.required = true;
			inputLugar.setAttribute('id', 'inputEntrega');
			inputLugar.setAttribute('name', 'lugar');
			inputLugar.setAttribute('placeholder', 'Av. Corrientes 1564');
			inputLugar.className = 'form-control';
			divLugar.appendChild(inputLugar);

			let divFecha = d.createElement('div');
			divFecha.className = 'form-group col-md-6';
			divLugarYFecha.appendChild(divFecha);

			let labelFecha = d.createElement('label');
			labelFecha.setAttribute('for', 'inputFecha');
			labelFecha.innerHTML = 'Fecha de entrega';
			divFecha.appendChild(labelFecha);

			let inputFecha = d.createElement('input');
			inputFecha.setAttribute('type', 'date');
			inputFecha.required = true;
			inputFecha.setAttribute('id', 'inputFecha');
			inputFecha.setAttribute('name', 'fecha');
			inputFecha.setAttribute('value', '2021-03-03');
			inputFecha.setAttribute('min', '2021-03-03');
			inputFecha.setAttribute('max', '2022-03-03');
			inputFecha.className = 'form-control';
			divFecha.appendChild(inputFecha);

			let divMetodo = d.createElement('div');
			divMetodo.className = 'form-group col-md-12';
			form.appendChild(divMetodo);

			let spanMetodo = d.createElement('span');
			spanMetodo.innerHTML = 'Método de pago:';
			spanMetodo.style.marginRight = '0.5rem';
			divMetodo.appendChild(spanMetodo);

			let labelEfv = d.createElement('label');
			labelEfv.setAttribute('for', 'inputEfv');
			labelEfv.innerHTML = 'Efectivo';
			labelEfv.style.marginRight = '0.2rem';
			divMetodo.appendChild(labelEfv);

			let inputEfv = d.createElement('input');
			inputEfv.setAttribute('type', 'radio');
			inputEfv.setAttribute('name', 'metodo');
			inputEfv.setAttribute('value', 'efectivo');
			inputEfv.setAttribute('id', 'efectivo');
			divMetodo.appendChild(inputEfv);

			let spanSeparador = d.createElement('span');
			spanSeparador.innerHTML = '-';
			spanSeparador.style.marginRight = '1rem';
			spanSeparador.style.marginLeft = '1rem';
			divMetodo.appendChild(spanSeparador);

			let labelMP = d.createElement('label');
			labelMP.setAttribute('for', 'inputMP');
			labelMP.innerHTML = 'MercadoPago';
			labelMP.style.marginRight = '0.2rem';
			divMetodo.appendChild(labelMP);

			let inputMP = d.createElement('input');
			inputMP.setAttribute('type', 'radio');
			inputMP.setAttribute('name', 'metodo');
			inputMP.setAttribute('value', 'mercadopago');
			inputMP.setAttribute('id', 'mercadopago');
			divMetodo.appendChild(inputMP);

			let divFinalizar = d.createElement('div');
			divFinalizar.className = 'col d-flex justify-content-center align-self-center';
			form.appendChild(divFinalizar);

			let botonFinalizar = d.createElement('button');
			botonFinalizar.setAttribute('type', 'button');
			botonFinalizar.className = 'btn btn-primary';
			botonFinalizar.innerHTML = 'Finalizar compra';
			divFinalizar.appendChild(botonFinalizar);

			let divCancelar = d.createElement('div');
			divCancelar.className = 'col d-flex justify-content-center align-self-center';
			form.appendChild(divCancelar);

			let botonCancelar = d.createElement('button');
			botonCancelar.setAttribute('type', 'button');
			botonCancelar.className = 'btn btn-outline-primary';
			botonCancelar.innerHTML = 'Cancelar';
			divCancelar.appendChild(botonCancelar);

			let fueraScroll = d.body;
			fueraScroll.style.overflowY = 'hidden';

			//Funciones
			equis.onclick = function() {
			fondoModalCheck.remove();
			fueraScroll.style.overflowY = 'scroll';
			fueraScroll.style.paddingRight = 0;
			}
			botonCancelar.onclick = function() {
			fondoModalCheck.remove();
			fueraScroll.style.overflowY = 'scroll';
			fueraScroll.style.paddingRight = 0;
			}

			let aviso = d.createElement('span');
			let aviso2 = d.createElement('span');
			let aviso3 = d.createElement('span');
			let aviso4 = d.createElement('span');
			let aviso5 = d.createElement('span');
			let aviso6 = d.createElement('span');
			let aviso7 = d.createElement('span');
			botonFinalizar.onclick = function() {
				let flag = true;
				if ( !isNaN(inputNombre.value) || inputNombre.value == ""){
					flag = false;
					let noRepetidor = aviso.innerHTML;
					if (noRepetidor != 'Nombre inválido') {
						aviso.style.color = 'red';
						aviso.style.fontSize = '80%';
						aviso.style.marginLeft = '10px';
						aviso.innerHTML = 'Nombre inválido';
						divNombre.appendChild(aviso);
					}
				}
				if ( !isNaN(inputApellido.value) || inputApellido.value == ""){
					flag = false;
					let noRepetidor = aviso2.innerHTML;
					if (noRepetidor != 'Apellido inválido') {
						aviso2.style.color = 'red';
						aviso2.style.fontSize = '80%';
						aviso2.style.marginLeft = '10px';
						aviso2.innerHTML = 'Apellido inválido';
						divApellido.appendChild(aviso2);
					}
				}
				if ( isNaN(inputTelefono.value) || inputTelefono.value == ""){
					flag = false;
					let noRepetidor = aviso3.innerHTML;
					if (noRepetidor != 'Teléfono inválido') {
						aviso3.style.color = 'red';
						aviso3.style.fontSize = '80%';
						aviso3.style.marginLeft = '10px';
						aviso3.innerHTML = 'Teléfono inválido';
						divTelefono.appendChild(aviso3);
					}
				}
				if ( !isNaN(inputEmail.value) || inputEmail.value == ""){
					flag = false;
					let noRepetidor = aviso4.innerHTML;
					if (noRepetidor != 'Email inválido') {
						aviso4.style.color = 'red';
						aviso4.style.fontSize = '80%';
						aviso4.style.marginLeft = '10px';
						aviso4.innerHTML = 'Email inválido';
						divEmail.appendChild(aviso4);
					}
				}
				if ( !isNaN(inputLugar.value) || inputLugar.value == ""){
					flag = false;
					let noRepetidor = aviso5.innerHTML;
					if (noRepetidor != 'Dirección inválida') {
						aviso5.style.color = 'red';
						aviso5.style.fontSize = '80%';
						aviso5.style.marginLeft = '10px';
						aviso5.innerHTML = 'Dirección inválido';
						divLugar.appendChild(aviso5);
					}
				}
				let fechaMin = '2021-03-03';
				let fechaMax = '2022-03-03';
				if ( inputFecha.value < fechaMin || inputFecha.value > fechaMax){
					flag = false;
					let noRepetidor = aviso6.innerHTML;
					if (noRepetidor != 'Fecha inválida') {
						aviso6.style.color = 'red';
						aviso6.style.fontSize = '80%';
						aviso6.style.marginLeft = '10px';
						aviso6.innerHTML = 'Fecha inválida';
						divFecha.appendChild(aviso6);
					}
				}

				if (inputMP.checked == false && inputEfv.checked == false){
					flag = false;
					let noRepetidor = aviso7.innerHTML;
					if (noRepetidor != 'Seleccione una opción') {
						aviso7.style.color = 'red';
						aviso7.style.fontSize = '80%';
						aviso7.style.marginLeft = '10px';
						aviso7.innerHTML = 'Seleccione una opción';
						divMetodo.appendChild(aviso7);
					}
				}

				if (flag) {
					form.submit();
				}
			}
		} else {
			let vacio = d.querySelector('.modal-body p');
			vacio.innerHTML = ' Aun no añadiste nada, ¡el aire es gratis!';
		}
	}

	let main = d.querySelector('main');
	main.appendChild(bodyModal);
}