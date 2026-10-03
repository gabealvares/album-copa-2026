/* Fireflies Core: realces progressivos (sem dependências). */
( function () {
	'use strict';
	function ler( k ) { try { return JSON.parse( localStorage.getItem( k ) || '[]' ); } catch ( e ) { return []; } }
	function gravar( k, v ) { try { localStorage.setItem( k, JSON.stringify( v ) ); } catch ( e ) {} }

	// Checklist com progresso salvo neste navegador.
	document.querySelectorAll( 'ol.is-style-checklist.ff-com-progresso' ).forEach( function ( ol, n ) {
		var chave = 'ff-passos:' + location.pathname + ':' + n;
		var feitos = ler( chave );
		var itens = Array.prototype.slice.call( ol.children );
		var barra = document.createElement( 'p' );
		barra.className = 'ff-progresso';
		barra.innerHTML = '<span aria-live="polite"></span><span aria-hidden="true"><i></i></span>';
		ol.parentNode.insertBefore( barra, ol );
		function atualizar() {
			var total = itens.filter( function ( li ) { return li.classList.contains( 'ff-feito' ); } ).length;
			barra.firstChild.textContent = total + ' de ' + itens.length + ' concluídos';
			barra.querySelector( 'i' ).style.width = ( 100 * total / itens.length ) + '%';
		}
		itens.forEach( function ( li, i ) {
			var cb = document.createElement( 'input' );
			cb.type = 'checkbox';
			var titulo = li.querySelector( 'strong' );
			cb.setAttribute( 'aria-label', 'Concluído: ' + ( titulo ? titulo.textContent : 'passo ' + ( i + 1 ) ) );
			cb.checked = feitos.indexOf( i ) > -1;
			li.classList.toggle( 'ff-feito', cb.checked );
			cb.addEventListener( 'change', function () {
				li.classList.toggle( 'ff-feito', cb.checked );
				gravar( chave, itens.map( function ( x, j ) { return x.classList.contains( 'ff-feito' ) ? j : -1; } ).filter( function ( j ) { return j > -1; } ) );
				atualizar();
			} );
			li.insertBefore( cb, li.firstChild );
		} );
		ol.classList.add( 'ff-ativo' );
		atualizar();
	} );

	// Busca em listas de códigos (ignora acentos).
	function norm( s ) { return s.normalize( 'NFD' ).replace( /[̀-ͯ]/g, '' ).toLowerCase(); }
	document.querySelectorAll( 'ul.is-style-codigos.ff-buscavel' ).forEach( function ( ul, n ) {
		var itens = Array.prototype.slice.call( ul.children );
		var box = document.createElement( 'div' );
		box.className = 'ff-busca';
		var id = 'ff-busca-' + n;
		box.innerHTML = '<label for="' + id + '">Buscar pelo código ou pelo nome</label><input id="' + id + '" type="search" autocomplete="off"><output aria-live="polite"></output>';
		ul.parentNode.insertBefore( box, ul );
		var out = box.querySelector( 'output' );
		var vazio = document.createElement( 'p' );
		vazio.textContent = 'Nenhum tipo encontrado para essa busca.';
		vazio.hidden = true;
		ul.parentNode.insertBefore( vazio, ul.nextSibling );
		function filtrar( q ) {
			var t = norm( q.trim() ), k = 0;
			itens.forEach( function ( li ) { var ok = ! t || norm( li.textContent ).indexOf( t ) > -1; li.hidden = ! ok; if ( ok ) { k++; } } );
			out.textContent = k + ' de ' + itens.length + ' tipos';
			vazio.hidden = k > 0;
		}
		box.querySelector( 'input' ).addEventListener( 'input', function ( e ) { filtrar( e.target.value ); } );
		filtrar( '' );
	} );
} )();
