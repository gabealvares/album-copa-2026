/* Fireflies Core: registro dos blocos dinâmicos no editor, sem build. */
( function ( wp ) {
	const el = wp.element.createElement;
	const SSR = wp.serverSideRender;
	const { useBlockProps, InspectorControls } = wp.blockEditor;
	const { PanelBody, TextControl, SelectControl, ToggleControl } = wp.components;

	function preview( name ) {
		return function ( props ) {
			return el( 'div', useBlockProps(), el( SSR, {
				block: name,
				attributes: props.attributes,
				urlQueryArgs: props.context && props.context.postId ? { post_id: props.context.postId } : {},
				EmptyResponsePlaceholder: function () {
					return el( 'span', { className: 'ff-meta' }, wp.blocks.getBlockType( name ).title );
				}
			} ) );
		};
	}

	const comum = { apiVersion: 3, category: 'widgets', usesContext: [ 'postId', 'postType' ], save: function () { return null; } };

	wp.blocks.registerBlockType( 'fireflies/tempo-leitura', Object.assign( {}, comum, {
		title: 'Tempo de leitura', icon: 'clock', description: 'Minutos de leitura do post, calculados ao salvar.',
		edit: function () { return el( 'p', Object.assign( useBlockProps(), { className: 'ff-leitura' } ), 'Leitura de 7 minutos' ); }
	} ) );

	wp.blocks.registerBlockType( 'fireflies/indice', Object.assign( {}, comum, {
		title: 'Índice do post', icon: 'list-view', description: 'Lista os títulos H2 do post (aparece com 2 ou mais).',
		edit: function () { return el( 'nav', Object.assign( useBlockProps(), { className: 'ff-indice-post' } ), el( 'p', { className: 'is-style-rotulo' }, 'Neste artigo' ), el( 'p', { className: 'ff-meta' }, 'O índice é montado com os títulos H2 deste post.' ) ); }
	} ) );

	wp.blocks.registerBlockType( 'fireflies/curso-ficha', Object.assign( {}, comum, {
		title: 'Ficha do curso', icon: 'welcome-learn-more', description: 'Trilha, carga horária, modalidade e público do curso.',
		attributes: { compacta: { type: 'boolean', default: false } },
		edit: function ( props ) {
			return el( wp.element.Fragment, null,
				el( InspectorControls, null, el( PanelBody, { title: 'Ficha' },
					el( ToggleControl, { label: 'Versão compacta (listas)', checked: props.attributes.compacta, onChange: function ( v ) { props.setAttributes( { compacta: v } ); } } ) ) ),
				el( 'div', useBlockProps(), el( 'dl', { className: 'ff-ficha-curso' + ( props.attributes.compacta ? ' ff-ficha-curso--compacta' : '' ) },
					el( 'div', null, el( 'dt', null, 'Carga horária' ), el( 'dd', null, '—' ) ),
					el( 'div', null, el( 'dt', null, 'Modalidade' ), el( 'dd', null, '—' ) ) ) ) );
		}
	} ) );

	wp.blocks.registerBlockType( 'fireflies/whatsapp', Object.assign( {}, comum, {
		title: 'Botão de WhatsApp', icon: 'format-chat', description: 'Abre uma conversa com a Fireflies Consultoria.',
		attributes: {
			texto: { type: 'string', default: 'Conversar no WhatsApp' },
			mensagem: { type: 'string', default: 'Olá! Vim pelo site da Fireflies Consultoria e quero agendar um diagnóstico.' },
			estilo: { type: 'string', default: 'botao' }
		},
		edit: function ( props ) {
			const a = props.attributes;
			const set = function ( k ) { return function ( v ) { const o = {}; o[ k ] = v; props.setAttributes( o ); }; };
			return el( wp.element.Fragment, null,
				el( InspectorControls, null, el( PanelBody, { title: 'WhatsApp' },
					el( TextControl, { label: 'Texto do botão', value: a.texto, onChange: set( 'texto' ) } ),
					el( TextControl, { label: 'Mensagem inicial', value: a.mensagem, onChange: set( 'mensagem' ) } ),
					el( SelectControl, { label: 'Estilo', value: a.estilo, options: [ { label: 'Botão', value: 'botao' }, { label: 'Contorno', value: 'contorno' }, { label: 'Link', value: 'link' } ], onChange: set( 'estilo' ) } ) ) ),
				preview( 'fireflies/whatsapp' )( props ) );
		}
	} ) );
} )( window.wp );
