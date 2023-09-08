## Por que CherryPy?

CherryPy está entre os frameworks web mais antigos disponíveis para Python, mas muitas pessoas não sabem de sua existência.

Uma das razões para isso é que o CherryPy não é uma pilha completa com suporte integrado para uma arquitetura de várias camadas.

Ele não fornece utilitários de front-end nem informa como falar com seu armazenamento. Em vez disso, a opinião do CherryPy é deixar o desenvolvedor tomar essas decisões. Esta é uma posição contrastante em comparação com outras estruturas bem conhecidas.

O CherryPy tem uma interface limpa e faz o possível para ficar fora do seu caminho, ao mesmo tempo em que fornece um andaime confiável para você construir.

Os casos de uso típicos do CherryPy vão desde um aplicativo da web regular com interfaces de usuário
(pense em blogs, CMS, portais, comércio eletrônico) apenas para serviços da web.

Aqui estão algumas razões pelas quais você gostaria de escolher o CherryPy:

**1. Simplicidade**

Desenvolver com CherryPy é uma tarefa simples. “Hello, world” tem apenas algumas linhas e não exige que o desenvolvedor aprenda todo o framework (embora muito gerenciável) de uma só vez. A estrutura é muito pythônica; ou seja, segue as convenções do Python muito bem (o código é esparso e limpo).

Compare isso com os frameworks web mais populares e visíveis de J2EE e Python: Django, Zope, Pylons e Turbogears. Em todos eles, a curva de aprendizado é enorme. Nessas estruturas, "Olá, mundo" exige que o programador configure um grande andaime que abrange vários arquivos e digite muito código clichê. O CherryPy é bem-sucedido porque não inclui o inchaço de outras estruturas, permitindo que o programador escreva seu aplicativo da Web rapidamente, mantendo um alto nível de organização e escalabilidade.

CherryPy também é muito modular. O núcleo é rápido e limpo, e os recursos de extensão são fáceis de escrever e conectar usando código ou o elegante sistema de configuração. Os componentes principais (servidor, mecanismo, solicitação, resposta, etc.) são todos extensíveis (até mesmo substituíveis) e bem gerenciados.

Resumindo, o CherryPy capacita o desenvolvedor a trabalhar com a estrutura, não contra ou em torno dela.

**2. Poder**

O CherryPy aproveita todo o poder do Python. Python é uma linguagem dinâmica que permite o rápido desenvolvimento de aplicações. O Python também possui uma extensa API integrada que simplifica o desenvolvimento de aplicativos da web. Ainda mais extensas, no entanto, são as bibliotecas de terceiros disponíveis para Python. Eles variam de mapeadores objeto-relacionais a bibliotecas de formulários, a um otimizador Python automático, um gerador de exe do Windows, bibliotecas de imagens, suporte a e-mail, mecanismos de modelagem HTML, etc. Os aplicativos CherryPy são exatamente como aplicativos Python comuns. O CherryPy não atrapalha se você quiser usar essas ferramentas brilhantes.

CherryPy também fornece [ferramentas](https://docs.cherrypy.dev/extend.html#tools) e [plugins](https://docs.cherrypy.dev/extend.html#busplugins), que são pontos de extensão poderosos necessários para desenvolver aplicativos da web de classe mundial.

**3. Maturidade**

A maturidade é extremamente importante ao desenvolver um aplicativo do mundo real. Ao contrário de muitos outros frameworks da web, o CherryPy teve muitos lançamentos finais e estáveis. É totalmente testado, otimizado e confiável para uso no mundo real. A API não mudará repentinamente e quebrará a compatibilidade com versões anteriores, portanto, seus aplicativos continuarão funcionando mesmo com atualizações subsequentes na série de versão atual.

CherryPy também é um projeto 3.0â: a primeira edição do CherryPy deu o tom, a segunda edição fez funcionar e a terceira edição o tornou bonito. Cada versão construída com base nas lições aprendidas com a anterior, trazendo ao desenvolvedor uma ferramenta superior para o trabalho.

**4. Comunidade**

CherryPy tem uma comunidade dedicada que desenvolve aplicativos CherryPy implantados e está disposta e pronta para ajudá-lo na lista de discussão CherryPy ou Gitter. Os desenvolvedores também frequentam a lista e frequentemente respondem a perguntas e implementam recursos solicitados pelos usuários finais.

**5. Implantabilidade**

Ao contrário de muitas outras estruturas da web Python, existem maneiras econômicas de implantar seu aplicativo CherryPy.

Pronto para uso, o CherryPy inclui seu próprio servidor HTTP pronto para produção para hospedar seu aplicativo. O CherryPy também pode ser implantado em qualquer gateway compatível com WSGI (uma tecnologia para interfacear vários tipos de servidores da Web): mod_wsgi, FastCGI, SCGI, IIS, uwsgi, tornado, etc. O proxy reverso também é uma maneira comum e fácil de configurá-lo .

Além disso, CherryPy é puro-python e é compatível com Python 2.3. Isso significa que o CherryPy será executado em todas as principais plataformas em que o Python será executado (Windows, MacOSX, Linux, BSD, etc).

[webfaction.com](https://www.webfaction.com), executado pelo inventor do CherryPy, é um host comercial que oferece pacotes de hospedagem CherryPy (além de vários outros).

**6. É grátis!**

Todo o CherryPy é licenciado sob a licença BSD de código aberto, o que significa que o CherryPy pode ser usado comercialmente a custo ZERO.

**7. Para onde ir a partir daqui?**

Confira os [tutoriais](https://docs.cherrypy.dev/tutorials.html#tutorials) para começar a se divertir!

## Histórias de sucesso

Você está interessado no CherryPy, mas gostaria de saber mais sobre as pessoas
usando-o ou simplesmente verifique os produtos ou aplicativos que o executam.

Se você gostaria de ter seu site ou produto com tecnologia CherryPy listado aqui,
entre em contato conosco por meio de nossa [lista de e-mails](http://groups.google.com/group/cherrypy-users)
ou [Gitter](https://gitter.im/cherrypy/cherrypy).

### Sites rodando no CherryPy

[Hulu Deejay e Hulu Sod](http://tech.hulu.com/blog/2013/03/13/python-and-hulu) - Hulu usa
CherryPy para alguns projetos.
âO serviÃ§o precisa ter altíssimo desempenho.
Python, junto com CherryPy,
[gunicorn](http://gunicorn.org), e gevent mais do que fornece para isso.â

[Netflix](http://techblog.netflix.com/2013/03/python-at-netflix.html) - Netflix usa CherryPy como um bloco de construção em sua infraestrutura: âAPIs Restful para
grandes aplicações com requisições, disponibilizando interfaces web com CherryPy e Bottle,
e processamento de dados com scipy.â

[Urbanility](http://urbanility.com) - Site francês para ativos de bairros locais em Rennes, França.

[MROP Supply](https://www.mropsupply.com) - Webshop para equipamentos industriais,
desenvolvido usando CherryPy 3.2.2 utilizando Python 3.2,
com libs: [Jinja2-2.6](http://jinja.pocoo.org/docs), davispuh-MySQL-for-Python-3-3403794,
pyenchant-1.6.5 (para ortografia de pesquisa).
âEstou voltando do desenvolvimento .net e encontrei Python e CherryPy para
seja surpreendentemente minimalista. Sem sobrecarga desnecessária - construa tudo o que você
precisa sem o cotão extra. Sou fã!â

[CherryMusic](http://www.fomori.org/cherrymusic) - Um servidor de streaming de música escrito em python:
Transmita sua própria coleção de músicas para todos os seus dispositivos! CherryMusic é de código aberto.

[YouGov Global](http://www.yougov.com) - Empresa de pesquisa de mercado internacional, conduz
milhões de pesquisas no CherryPy anualmente.

[Aculab Cloud](http://cloud.aculab.com) - Aplicativos de voz e fax na nuvem.
Uma API de telefonia simples para Python, C#, C++, VB, etc…
O site e todos os serviços web front-end e back-end são construídos com CherryPy,
liderado por nginx (apenas lidando com ssh e proxy reverso) e rodando na AWS em duas regiões.

[Learnit Training](http://www.learnit.nl) - Site holandês para um curso de TI, Gestão e
Empresa de treinamento em comunicação. Construído em CherryPy 3.2.0 e Python 2.7.3, com
[oursql](http://pythonhosted.org/oursql) e
[DBUtils](http://www.webwareforpython.org/DBUtils), entre outros.

[Linstic](http://linstic.com) - Sticky Notes no seu navegador (com link).

[Homepage do Almad](http://www.almad.net) - Homepage simples com blog.

[Fight.Watch](http://fight.watch) - Portal da web Twitch.tv para jogos de luta.
Construído em CherryPy 3.3.0 e Python 2.7.3 com Jinja 2.7.2 e SQLAlchemy 0.9.4.

### Produtos baseados em CherryPy

[SABnzbd](http://sabnzbd.org) - Leitor de notícias binário de código aberto escrito em Python.

[Fones de ouvido](https://github.com/rembo10/headphones) - Complemento de terceiros para SABnzbd.

[SickBeard](http://sickbeard.com) - âSick Beard é um PVR para usuários de grupos de notícias (com suporte limitado a torrent). Ele procura por novos episódios de seus programas favoritos e, quando são postados, baixa-os, classifica-os e renomeia-os e, opcionalmente, gera metadados para eles.â

[TurboGears](http://www.turbogears.org) - O megaframework de desenvolvimento web rápido. Turbogears 1.x usado Cherrypy. âCherryPy é o servidor de aplicativos subjacente para TurboGears. Ele é responsável por pegar as requisições do navegador do usuário, analisá-las e transformá-las em chamadas ao código Python da aplicação web. Sua função é semelhante aos servidores de aplicativos usados em outras linguagens de programaçãoâ.

[Indigo](http://www.perceptiveautomation.com/indigo/index.html) - âUm controle doméstico inteligente
servidor que integra módulos de hardware de controle doméstico para fornecer controle de sua casa. Integrado no Indigo
O servidor Web e a arquitetura cliente/servidor oferecem controle e acesso à sua casa remotamente a partir de
outros Macs, PCs, tablets de internet, PDAs e telefones celulares.â

[SlikiWiki](http://www.sf.net/projects/slikiwiki) - Wiki construído em CherryPy e apresentando WikiWords, backlinking automático, geração de mapa do site, pesquisa de texto completo, bloqueio para edições simultâneas, incorporação de feed RSS, acesso por página listas de controle e formatação de página usando a marcação PyTextile.â

[read4me](http://sourceforge.net/projects/read4me) - read4me é um serviço web de leitura de feed Python.

[Ferramentas Firebird QA](http://www.firebirdsql.org/en/quality-assurance) - As ferramentas Firebird QA são baseadas em CherryPy.

[salt-api](https://github.com/saltstack/salt-api) - Uma API REST para Salt, a ferramenta de orquestração de infraestrutura.