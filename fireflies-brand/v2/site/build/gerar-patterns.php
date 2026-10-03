<?php
/**
 * Gera wp-content/themes/fireflies/patterns/*.php a partir de secoes.php.
 * Uso: php build/gerar-patterns.php
 */

require_once __DIR__ . '/editorial.php';

$dir = dirname( __DIR__ ) . '/wp-content/themes/fireflies/patterns/';

function para_php( string $m ): string {
	$m = preg_replace_callback( '/\{\{A\}\}([^"\'\s)]+)/', fn( $x ) => "<?php echo fireflies_asset( '{$x[1]}' ); ?>", $m );
	$m = preg_replace_callback( '/\{\{U\}\}([^"\'\s<]*)/', fn( $x ) => "<?php echo fireflies_url( '" . ( $x[1] ?: '/' ) . "' ); ?>", $m );
	return $m;
}

function pattern( string $slug, string $titulo, string $desc, array $cats, string $markup, array $extra = array() ): void {
	global $dir;
	$cab  = "<?php\n/**\n * Title: {$titulo}\n * Slug: fireflies/{$slug}\n * Categories: " . implode( ', ', $cats ) . "\n * Description: {$desc}\n";
	foreach ( $extra as $k => $v ) {
		$cab .= " * {$k}: {$v}\n";
	}
	$cab .= " *\n * @package fireflies\n */\n?>\n";
	file_put_contents( $dir . $slug . '.php', $cab . para_php( $markup ) );
	echo "  {$slug}\n";
}

$WA    = wa();
$P     = array( 'fireflies' );
$E     = array( 'fireflies', 'fireflies-editorial' );
$diag  = array( 'Agendar diagnóstico gratuito', u( '/contato/' ) );

// ---------------------------------------------------------------- páginas

pattern(
	'hero-anil',
	'Hero Anil',
	'Abertura sangrada em Anil de Junho, com retícula sutil, título em caixa alta e a constelação dos serviços.',
	$P,
	s_hero_anil(
		array(
			'rotulo' => 'Consultoria financeira, contábil e fiscal em São Paulo',
			'h1'     => 'Números em sincronia.',
			'lead'   => 'Notas, contas, balancetes e rateios chegam dispersos. A gente coloca cada número no lugar, com origem e responsável, e o que era ruído vira decisão.',
			'botoes' => array( $diag, array( 'Conversar no WhatsApp', $WA, 'outline' ) ),
			'lado'   => html( svg_constelacao_servicos() ),
		)
	)
);

pattern(
	'hero-cal',
	'Abertura clara (Cal)',
	'Abertura de página em Cal Virgem com trilha de navegação, título, fio de rubrica e emblema do serviço.',
	$P,
	s_hero_cal(
		array(
			'trilha' => array( array( 'Início', u( '/' ) ), array( 'Serviços', u( '/servicos/' ) ), array( 'Auditoria de condomínios', '' ) ),
			'h1'     => 'Auditoria de condomínios',
			'lead'   => 'A gente confere a prestação de contas do seu condomínio, linha por linha, e entrega um relatório que o conselho lê em uma reunião.',
			'botoes' => array( array( 'Pedir uma proposta', u( '/contato/?assunto=auditoria-de-condominios' ) ) ),
			'lado'   => constelacao( 'auditoria', 'claro', array( 'w' => '240px', 'class' => 'is-style-emblema aligncenter' ) ),
		)
	)
);

pattern(
	'numeros-destaque',
	'Números em destaque',
	'Faixa de provas em livro-razão: número ou palavra grande em Sora e rótulo em mono, separados por fios.',
	$P,
	s_numeros(
		array(
			array( 'CRC ativo', 'Escritório registrado no CRC-SP sob o nº 2SP053069' ),
			array( '8+ anos', 'De contabilidade, auditoria e gestão financeira' ),
			array( '30 dias', 'Até o primeiro painel mensal' ),
			array( 'São Paulo', 'Empresas e condomínios' ),
		)
	)
);

$servicos = array(
	array( 'Auditoria de condomínios', 'Prestação de contas conferida, com relatório executivo que síndico, conselho e administradora entendem.', u( '/servicos/auditoria-de-condominios/' ) ),
	array( 'Consultoria contábil', 'Fechamento mensal no prazo, plano de contas que faz sentido e a DRE explicada em reunião.', u( '/servicos/consultoria-contabil/' ) ),
	array( 'Consultoria fiscal', 'Regime tributário revisado, guias conferidas e planejamento tributário dentro da lei.', u( '/servicos/consultoria-fiscal/' ) ),
	array( 'Consultoria financeira', 'Fluxo de caixa, orçamento e indicadores para decidir com o número do mês.', u( '/servicos/consultoria-financeira/' ) ),
	array( 'Gestão de projetos e processos', 'Rotinas, ERP e automação, para que o controle continue funcionando depois do projeto.', u( '/servicos/gestao-de-projetos-e-processos/' ) ),
	array( 'Sindicância', 'Apuração independente de fatos, com documentos, cronologia e relatório técnico.', u( '/servicos/sindicancia/' ) ),
);
pattern(
	'servicos-lista',
	'Serviços em índice editorial',
	'A especialidade em destaque com emblema e os demais serviços em linhas de índice com fios. Nada de cards iguais.',
	$P,
	s_servicos(
		array(
			'h2'    => 'Nada trabalha sozinho.',
			'texto' => 'Contábil, fiscal, financeiro e auditoria conversam entre si. Quando uma área muda, a gente olha o efeito nas outras antes de você precisar perguntar.',
			'itens' => $servicos,
			'link'  => array( 'Ver todos os serviços', u( '/servicos/' ) ),
		)
	)
);

pattern(
	'servico-detalhe',
	'Serviço: escopo, entregáveis e base legal',
	'Bloco de página de serviço: quando faz sentido, tabela de escopo, entregáveis em grade e base legal.',
	$P,
	s_lista(
		array(
			'h2'    => 'Quando faz sentido',
			'texto' => 'A auditoria é mais útil quando vem antes do problema.',
			'itens' => array( 'Troca de síndico ou de administradora.', 'Assembleia de prestação de contas chegando.', 'Taxa extra se repetindo ou fundo de reserva diminuindo.' ),
		)
	)
	. s_tabela(
		array(
			'h2'     => 'O que entra no trabalho',
			'cab'    => array( 'Frente', 'O que é conferido' ),
			'linhas' => array(
				array( 'Receitas', 'Arrecadação das cotas contra os boletos emitidos, acordos, multas e juros.' ),
				array( 'Despesas', 'Notas fiscais e recibos contra os pagamentos e aprovação conforme a convenção.' ),
				array( 'Bancos e saldos', 'Conciliação de todas as contas, aplicações e do fundo de reserva com os extratos.' ),
			),
			'nota'   => 'O escopo é fechado na proposta, por período.',
		),
		'cal'
	)
	. s_grade(
		array(
			'h2'    => 'Entregáveis',
			'itens' => array(
				array( 'Relatório executivo', 'Na primeira página, um resumo para o conselho com os principais achados.' ),
				array( 'Relatório detalhado', 'Cada achado com documento de origem, valor, período e o que fazer.' ),
				array( 'Plano de correção', 'O que ajustar, quem ajusta e em que prazo.' ),
				array( 'Apresentação', 'O resultado explicado em linguagem simples, quando contratada.' ),
			),
		)
	)
	. s_base_legal( array( array( 'Código Civil, art. 1.348, VIII', 'Compete ao síndico "prestar contas à assembléia, anualmente e quando exigidas".' ) ) )
);

pattern(
	'passos-30-dias',
	'30 dias até a primeira luz',
	'Quatro etapas numa linha de constelação: nós pontilhados e a última estrela acesa.',
	$P,
	s_passos(
		array(
			'h2'     => '30 dias até a primeira luz.',
			'texto'  => 'Do primeiro contato ao primeiro relatório mensal, com o mesmo responsável do começo ao fim.',
			'passos' => array(
				array( 'Semana 1', 'Diagnóstico', 'Uma conversa sem custo e a leitura dos números como estão hoje.', 'leitura do cenário atual' ),
				array( 'Semanas 2–3', 'Organização', 'Conciliação, plano de contas, processos e acessos colocados em ordem.', 'base organizada e plano de trabalho' ),
				array( 'Semana 4', 'Primeiro fechamento', 'O primeiro relatório mensal, explicado numa reunião com você.', 'primeiro painel mensal' ),
				array( 'Todo mês', 'Rotina', 'Fechamento, indicadores e alertas, sempre com o mesmo responsável.', 'painel e reunião mensal' ),
			),
			'link'   => array( 'Ver o método em detalhe', u( '/como-trabalhamos/' ) ),
		)
	)
);

pattern(
	'painel-mensal',
	'Painel mensal (matriz de pontos)',
	'Explica o painel mensal com estados (forma + palavra + cor) e um gráfico em matriz de pontos com dados de exemplo.',
	$P,
	s_painel(
		array(
			'h2'      => 'Todo mês, o seu negócio em uma tela.',
			'texto'   => 'Um painel que você lê em dois minutos, com o que mudou, o que preocupa e o que já está resolvido, explicado numa reunião com quem assina.',
			'alertas' => array(
				array( 'atencao', '<strong>Atenção.</strong> Inadimplência acima da meta definida com você.' ),
				array( 'ok', '<strong>Resolvido.</strong> Impostos do próximo mês provisionados e guias conferidas.' ),
				array( 'critico', '<strong>Aviso.</strong> Contrato de aluguel reajusta no próximo mês. Impacto já projetado.' ),
			),
			'colunas' => array(
				array( 'O que mudou', 'Receita, custos e caixa comparados ao mês anterior.' ),
				array( 'O que preocupa', 'Alertas com causa e proposta, nunca só o número.' ),
				array( 'O que está resolvido', 'Pendências fechadas, com responsável e data.' ),
			),
		)
	)
);

pattern(
	'condominios-raio-x',
	'Raio-X do condomínio (chamada)',
	'Chamada em Anil para a linha Fireflies Condomínios, com o emblema Domus.',
	$P,
	s_raio_x(
		array(
			'h2'     => 'Raio-X do seu condomínio.',
			'texto'  => 'Sua taxa paga o que deveria? A gente mostra para onde vai cada real, confere a prestação de contas e leva o relatório pronto para o conselho.',
			'itens'  => array( 'Receitas, despesas e contratos conferidos por período', 'Fundo de reserva e inadimplência por unidade', 'Relatório executivo para o conselho e a assembleia' ),
			'botoes' => array( array( 'Fazer o raio-X com os números reais', u( '/contato/?assunto=auditoria-de-condominios' ) ), array( 'Conhecer a linha Condomínios', u( '/condominios/' ), 'outline' ) ),
		)
	)
);

pattern(
	'sobre-responsavel',
	'Responsável técnico',
	'Quem conduz: retrato, nome, cargo em mono, fio de rubrica e áreas.',
	$P,
	s_responsavel(
		array(
			'cargo'  => 'Fundador e contador responsável',
			'textos' => array( 'São mais de 8 anos em contabilidade, auditoria e gestão financeira. Gabriel fundou a Fireflies para que todo cliente tivesse o que costuma faltar: alguém que assina o número e explica o que ele quer dizer.' ),
			'areas'  => array( 'Contabilidade gerencial', 'Auditoria', 'Planejamento tributário', 'Gestão de projetos e processos', 'ERP e tecnologia', 'Treinamento empresarial' ),
			'link'   => array( 'Conhecer a Fireflies', u( '/sobre/' ) ),
		)
	)
);

pattern(
	'academy-cursos',
	'Academy: cursos',
	'Lista dos cursos (consulta do tipo curso) em linhas: trilha, nome, resumo e ficha compacta.',
	$P,
	s_academy(
		array(
			'h2'    => 'Capacitação para quem lida com o número todo dia.',
			'texto' => 'Treinamentos em contabilidade, fiscal, finanças, auditoria e ERP, in company ou online.',
			'botao' => array( 'Montar um treinamento', u( '/contato/?assunto=academy' ) ),
		)
	)
);

pattern(
	'faq',
	'Perguntas frequentes',
	'Perguntas em core/details com sinal de mais/menos, título à esquerda e atalho para o WhatsApp.',
	$P,
	s_faq(
		array(
			'h2'    => 'Antes de conversar.',
			'texto' => 'Não encontrou o que procurava? Pergunte direto pelo WhatsApp.',
			'qas'   => array(
				array( 'Como funciona o diagnóstico gratuito?', 'É uma conversa sem custo. A gente entende a situação atual, lê os números como estão e aponta os principais riscos e oportunidades.' ),
				array( 'A Fireflies assume a contabilidade da minha empresa?', 'Sim. A troca é feita de forma organizada, com transição planejada para que nenhuma obrigação fique para trás.' ),
				array( 'Vocês substituem a administradora do condomínio?', 'Não. A auditoria dá segurança ao síndico e ao conselho e trabalha em parceria com a administradora.' ),
			),
		),
		'cal'
	)
);

pattern(
	'cta-diagnostico',
	'Chamada: diagnóstico',
	'Fechamento em Anil com campo de estrelas, botão Âmbar e linha de contato.',
	$P,
	s_cta(
		array(
			'h2'     => 'Comece pelo diagnóstico.',
			'texto'  => 'Uma conversa sem custo e sem compromisso para entender o que está travando os seus números.',
			'botoes' => array( array( 'Conversar no WhatsApp', $WA ), array( 'Agendar pelo formulário', u( '/contato/' ), 'outline' ) ),
			'linha'  => 'contato@fireflies.com.br · Segunda a sexta, 8h às 18h',
		)
	)
);

pattern(
	'cta-whatsapp',
	'Chamada: WhatsApp',
	'Faixa clara e compacta com o botão de WhatsApp do plugin.',
	$P,
	s_cta_whatsapp(
		array(
			'h2'    => 'Receba as atualizações da Reforma Tributária para condomínios.',
			'texto' => 'Quando sair norma nova, a gente avisa com o resumo e o que fazer.',
			'texto_botao' => 'Quero receber pelo WhatsApp',
			'mensagem'    => 'Quero receber as atualizações do blog',
		)
	)
);

pattern(
	'blog-destaques',
	'Blog: destaques',
	'Três posts recentes em grade assimétrica (um maior), com categoria, data e tempo de leitura.',
	$P,
	s_blog_destaques(
		array(
			'h2'   => 'O que mudou e o que fazer.',
			'link' => array( 'Ir para o blog', u( '/blog/' ) ),
		)
	)
);

pattern(
	'blog-lista',
	'Blog: lista',
	'Lista de posts em linhas com fio: data e categoria à esquerda, título, resumo e tempo de leitura.',
	$P,
	secao(
		consulta_posts(
			array( 'perPage' => 9 ),
			post_template( blog_lista_template() ),
			array( 'class' => 'ff-lista-posts', 'id' => 40, 'extra' => ff_b( 'query-pagination', array( 'paginationArrow' => 'none', 'layout' => array( 'type' => 'flex', 'justifyContent' => 'space-between' ) ), ff_v( 'query-pagination-previous', array( 'label' => 'Anteriores' ) ) . ff_v( 'query-pagination-numbers' ) . ff_v( 'query-pagination-next', array( 'label' => 'Próximos' ) ) ) )
		)
	)
);

pattern(
	'newsletter',
	'Newsletter (slot)',
	'Slot para o shortcode da newsletter (Configurações › Geral); sem ele, oferece a lista do WhatsApp.',
	$P,
	secao(
		colunas(
			array(
				array( 'html' => h( 2, 'Uma leitura por mês, sem ruído.', array( 'size' => 'titulo-3' ) ) . p( 'O resumo do que mudou na lei e o que fazer, com a norma citada.' ), 'w' => '55%' ),
				array( 'html' => shortcode( '[fireflies_newsletter]' ), 'va' => 'center' ),
			),
			array( 'va' => 'center', 'gap' => sp( '50' ) )
		),
		'cal',
		array( 'pad' => array( 'top' => sp( '60' ), 'bottom' => sp( '60' ) ) )
	)
);

pattern(
	'contato',
	'Contato: canais e formulário',
	'Canais em ficha (WhatsApp, e-mail, horário, local, responsável) e o slot do formulário [fireflies_formulario].',
	$P,
	s_contato()
);

pattern(
	'citacao-anil',
	'Citação em Anil',
	'Citação grande em Sora sobre Anil, com aspa em Vermelhão.',
	$P,
	s_citacao( 'Os números de um condomínio são muitos pontos, cada um no seu tempo. A gente mede, nomeia e coloca cada ponto no lugar.', 'Gabriel Alvares, contador responsável' )
);

pattern(
	'tabela-editorial',
	'Tabela editorial',
	'Tabela com cabeçalho em mono, fios finos, números em mono à direita e linha de total.',
	$P,
	s_tabela(
		array(
			'h2'     => 'Para onde vai a taxa (exemplo)',
			'cab'    => array( 'Item', 'Valor (R$)', '% da receita' ),
			'linhas' => array(
				array( 'Pessoal e portaria', '35.600,00', '38,0%' ),
				array( 'Contratos e manutenção', '20.600,00', '22,0%' ),
				array( 'Água, luz e gás', '14.000,00', '15,0%' ),
				array( 'Fundo de reserva', '8.200,00', '8,8%' ),
			),
			'foot'   => array( 'Total', '78.400,00', '83,8%' ),
			'estilo' => 'numeros',
			'nota'   => 'Dados de exemplo.',
		)
	)
);

pattern( 'manifesto', 'Manifesto (frase grande)', 'Frase em Sora grande sobre Cal, com texto de apoio e nota de margem.', $P, s_manifesto( array( 'frase' => 'Enquanto muitos entregam relatórios, nós entregamos controle, clareza e poder de decisão.', 'texto' => array( 'Cada projeto tem um contador responsável, que conduz do início ao fim, apoiado por especialistas escolhidos para o tamanho do desafio.' ), 'nota' => 'Sem pacote genérico: primeiro entendemos o negócio, depois propomos o caminho.' ) ) );

pattern( 'diferenciais', 'Diferenciais (grade com fios)', 'Grade 2 × 2 com fios, sem cards e sem ícones em círculo.', $P, s_grade( array( 'h2' => 'Por que a Fireflies', 'itens' => array( array( 'Controle, não só relatórios.', 'Indicadores que você acompanha e decisões que consegue tomar.' ), array( 'Um responsável, vários especialistas.', 'Um contador responsável conduz o projeto do início ao fim.' ), array( 'Processo e tecnologia junto.', 'Rotinas, ERP e automação entram no trabalho.' ), array( 'Sob medida desde o diagnóstico.', 'Cada proposta nasce de uma conversa sobre o seu negócio.' ) ) ) ) );

pattern( 'publicos', 'Públicos em três colunas', 'Três colunas com fio, título em Sora e link.', $P, s_publicos( array( 'itens' => array( array( 'Síndico', 'Você responde pelas contas perante a assembleia. A gente confere antes e dá respaldo técnico.' ), array( 'Conselho', 'Vocês dão parecer sobre as contas do síndico. A gente entrega o material em linguagem simples.' ), array( 'Administradora', 'Vocês operam o dia a dia. A gente faz a conferência independente. Parceria, não fiscalização.' ) ) ) ) );

pattern( 'linha-do-tempo', 'Linha do tempo', 'Quando e o quê, em linhas de índice.', $P, s_linha_tempo( array( 'h2' => 'Onde a gente entra no ano do condomínio', 'itens' => array( array( 'Antes da assembleia ordinária', 'Conferência da prestação de contas e apoio à previsão orçamentária.' ), array( 'Na assembleia', 'Apresentação do relatório, quando contratada.' ) ) ) ) );

pattern( 'nota-destaque', 'Nota em destaque', 'Frase de posicionamento com fio de rubrica.', $P, s_nota_destaque( 'A Fireflies não substitui a administradora. A auditoria dá ao síndico um respaldo técnico e à administradora uma lista objetiva do que ajustar.' ) );

pattern( 'por-onde-comecar', 'Por onde começar (triagem)', 'Quatro caminhos com mensagem pronta para o WhatsApp, sem JavaScript.', $P, s_triagem( array( 'h2' => 'Três perguntas, um caminho.', 'pergunta' => 'Quem é você nessa história?', 'opcoes' => array( array( 'A', 'Síndico, conselho ou administradora', 'Caminho Condomínios', u( '/condominios/' ), 'Sou síndico/conselho/administradora e quero um diagnóstico.' ), array( 'B', 'Empresa em crescimento', 'Caminho Empresas', u( '/servicos/consultoria-financeira/' ), 'Minha empresa está crescendo e quero um diagnóstico.' ) ) ) ) );

// ---------------------------------------------------------------- editoriais de post

pattern( 'nossa-leitura', 'Nossa leitura', 'Bloco Anil com a interpretação da Fireflies sobre a norma.', $E, nossa_leitura( 'Uma NFS-e por condômino e por vencimento, emitida contra o proprietário, mesmo quando a unidade estiver alugada.' ), array( 'Block Types' => 'core/group' ) );

pattern( 'em-aberto', 'Em aberto', 'O que a norma ainda não definiu, com rótulo de atenção (Rapadura).', $E, em_aberto( 'Quem é o tomador quando a unidade está alugada?', 'A nota técnica não esclarece. Enquanto não sair a regra, a recomendação é manter o cadastro do proprietário completo.' ) );

pattern( 'base-legal', 'Base legal', 'Fundo Cal com a fonte em mono e a citação literal da norma.', $E, base_legal( array( array( 'Código Civil, art. 1.348, VIII', 'Compete ao síndico "prestar contas à assembléia, anualmente e quando exigidas".' ) ) ) );

pattern( 'consulte-na-integra', 'Consulte na íntegra', 'Lista numerada de fontes oficiais com link e detalhe em mono.', $E, consulte( array( array( 'Nota Técnica SE/CGNFS-e nº 009', 'https://www.gov.br/nfse', 'PDF, versão 1.01' ), array( 'Lei Complementar nº 214/2025', 'https://www.planalto.gov.br/ccivil_03/leis/lcp/lcp214.htm', 'texto compilado' ) ) ) );

pattern( 'passos-checklist', 'Passos com checklist', 'Lista numerada com caixas de marcar, para planos de ação.', $E, passos_checklist( array( array( 'Revise a forma de recebimento.', ' A nota pode vincular o pagamento: confira o meio usado em cada boleto.' ), array( 'Atualize o cadastro das unidades.', ' Inscrição imobiliária e CIB de cada unidade.' ), array( 'Combine com o conselho.', ' Explique a mudança antes da primeira emissão.' ) ) ) );

pattern( 'voce-sabe', 'Você sabe?', 'Glossário em destaque: interrogação em Rubrica, pergunta e explicação curta.', $E, voce_sabe( 'O que é o CIB?', 'O Cadastro Imobiliário Brasileiro é o "CPF do imóvel": um código nacional único para cada imóvel, urbano ou rural.' ) );

pattern( 'nota-margem', 'Nota de margem', 'Nota curta em mono que vai para a margem em telas largas.', $E, nota_margem( 'Prazo: 01/12/2026, data do cronograma oficial da Receita.' ) );

pattern( 'indice-post', 'Índice do post', 'Lista os H2 do post (bloco do plugin Fireflies Core).', $E, ff_v( 'fireflies/indice' ) );


// ---------------------------------------------------------------- templates (Inserter: no)

$curso_cab = secao(
	colunas(
		array(
			array(
				'html' => nota( '<a href="{{U}}/academy/">Fireflies Academy</a> / <a href="{{U}}/academy/cursos/">Cursos</a>', array( 'class' => 'ff-trilha', 'text' => 'fumaca' ) )
					. ff_v( 'fireflies/eyebrow' )
					. ff_v( 'post-title', array( 'level' => 1, 'fontSize' => 'titulo-1' ) )
					. ff_v( 'post-excerpt', array( 'className' => 'is-style-abertura' ) )
					. ff_v( 'fireflies/curso-ficha' ),
				'w'    => '66%',
			),
			array( 'html' => constelacao( 'academy', 'escuro', array( 'w' => '240px', 'class' => 'is-style-emblema aligncenter' ) ), 'va' => 'center', 'class' => 'ff-hero__lado' ),
		),
		array( 'va' => 'center', 'gap' => sp( '60' ) )
	),
	'noite',
	array( 'tag' => 'header', 'class' => 'ff-hero ff-cabecalho-curso', 'pad' => array( 'top' => sp( '60' ), 'bottom' => sp( '60' ) ) )
);
pattern( 'curso-cabecalho', 'Cabeçalho do curso', 'Trilha, título, resumo e ficha do curso sobre Anil, com o emblema Liber.', $P, $curso_cab, array( 'Inserter' => 'no' ) );

pattern(
	'cta-academy',
	'Chamada: Academy',
	'Fechamento da Academy: montar um treinamento.',
	$P,
	s_cta(
		array(
			'h2'     => 'Monte o treinamento da sua equipe.',
			'texto'  => 'Conte o tema, o tamanho da turma e o formato. A gente responde com programa e proposta.',
			'botoes' => array( array( 'Montar um treinamento', u( '/contato/?assunto=academy' ) ), array( 'Conversar no WhatsApp', wa( 'Quero montar um treinamento da Fireflies Academy.' ), 'outline' ) ),
		)
	),
	array( 'Inserter' => 'no' )
);

$arq = secao(
	estreito(
		nota( '<a href="{{U}}/academy/">Fireflies Academy</a>', array( 'class' => 'ff-trilha', 'text' => 'fumaca' ) )
		. ff_v( 'query-title', array( 'type' => 'archive', 'showPrefix' => false, 'level' => 1, 'className' => 'is-style-versal' ) )
		. ff_v( 'term-description', array( 'className' => 'is-style-abertura' ) )
		. shortcode( '[fireflies_trilhas]' ),
		'860px'
	),
	'noite',
	array( 'tag' => 'header', 'class' => 'ff-hero ff-padrao', 'pad' => array( 'top' => sp( '60' ), 'bottom' => sp( '60' ) ) )
)
. secao(
	ff_b(
		'query',
		array( 'queryId' => 2, 'query' => array( 'inherit' => true ), 'className' => 'ff-indice ff-cursos' ),
		'<div class="wp-block-query ff-indice ff-cursos">' . "\n" . post_template(
			colunas(
				array(
					array( 'html' => ff_v( 'post-terms', array( 'term' => 'trilha', 'className' => 'is-style-rotulo' ) ), 'w' => '20%' ),
					array( 'html' => ff_v( 'post-title', array( 'level' => 2, 'isLink' => true, 'fontSize' => 'titulo-3' ) ) . ff_v( 'post-excerpt', array( 'excerptLength' => 30 ) ), 'w' => '52%' ),
					array( 'html' => ff_v( 'fireflies/curso-ficha', array( 'compacta' => true ) ), 'w' => '28%' ),
				),
				array( 'class' => 'is-style-linha-indice ff-linha-curso' )
			)
		) . '</div>'
	)
);
pattern( 'academy-arquivo', 'Arquivo de cursos', 'Cabeçalho Anil com as trilhas e a lista dos cursos (arquivo e trilha).', $P, $arq, array( 'Inserter' => 'no' ) );

$p404 = secao(
	estreito(
		p( '404', array( 'class' => 'ff-404-num' ) )
		. h( 1, 'Esta página saiu de órbita.', array( 'size' => 'titulo-1' ) )
		. p( 'O endereço pode ter mudado. Tente a busca ou volte para o início.', array( 'size' => 'lead' ) )
		. ff_v( 'search', array( 'label' => 'Buscar no site', 'showLabel' => false, 'placeholder' => 'Buscar artigos, serviços e cursos', 'buttonText' => 'Buscar', 'className' => 'ff-busca-404' ) )
		. botoes( array( array( 'Ir para o início', u( '/' ) ), array( 'Ver serviços', u( '/servicos/' ), 'outline' ) ), array( 'mar' => array( 'top' => sp( '50' ) ) ) ),
		'760px'
	),
	'noite',
	array( 'class' => 'ff-404 ff-padrao ff-padrao--constelacao', 'pad' => array( 'top' => sp( '80' ), 'bottom' => sp( '80' ) ) )
);
pattern( 'pagina-404', 'Página 404', 'Página não encontrada, com busca e atalhos.', $P, $p404, array( 'Inserter' => 'no' ) );

echo "ok\n";
