/* Raio-X do condomínio: recalcula a simulação ilustrativa. */
( function () {
	'use strict';
	function brl( v ) {
		var s = ( Math.abs( v ) / 1000 ).toFixed( 1 ).replace( '.', ',' ).replace( /\B(?=(\d{3})+(?!\d))/g, '.' );
		return ( v < 0 ? '−' : '' ) + 'R$ ' + s + ' mil';
	}
	document.querySelectorAll( '.ff-rx' ).forEach( function ( el ) {
		var refs = JSON.parse( el.getAttribute( 'data-refs' ) || '[]' );
		var f = el.querySelector( 'form' );
		function calc() {
			var u = +f.elements[ 'ff-rx-unidades' ].value, t = +f.elements[ 'ff-rx-taxa' ].value, i = +f.elements[ 'ff-rx-inad' ].value;
			f.querySelectorAll( 'output' ).forEach( function ( o ) {
				var v = f.elements[ o.htmlFor.value ].value, k = o.getAttribute( 'data-fmt' );
				o.textContent = k === 'brl' ? 'R$ ' + v : ( k === 'pct' ? v + '%' : v );
			} );
			var pot = u * t, saldo = pot - pot * i / 100;
			el.querySelector( '[data-k="pot"]' ).textContent = brl( pot );
			el.querySelector( '[data-k="inad"]' ).textContent = brl( -pot * i / 100 );
			refs.forEach( function ( r, n ) { var v = -pot * r[ 1 ] / 100; saldo += v; el.querySelector( '[data-k="r' + n + '"]' ).textContent = brl( v ); } );
			el.querySelector( '[data-k="saldo"]' ).textContent = brl( saldo );
			el.querySelector( '.ff-rx__saldo' ).classList.toggle( 'is-neg', saldo < 0 );
			el.querySelector( '.ff-rx__alerta' ).hidden = saldo >= 0;
		}
		f.addEventListener( 'input', calc );
		f.addEventListener( 'submit', function ( e ) { e.preventDefault(); } );
		calc();
	} );
} )();
