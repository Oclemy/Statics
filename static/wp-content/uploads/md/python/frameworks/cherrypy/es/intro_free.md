## ¿Por qué CherryPy?

CherryPy se encuentra entre los marcos web más antiguos disponibles para Python, pero muchas personas no saben de su existencia.

Una de las razones de esto es que CherryPy no es una pila completa con soporte integrado para una arquitectura de varios niveles.

No proporciona utilidades de frontend ni le dirá cómo hablar con su almacenamiento. En cambio, la opinión de CherryPy es dejar que el desarrollador tome esas decisiones. Esta es una posición contrastante en comparación con otros marcos bien conocidos.

CherryPy tiene una interfaz limpia y hace todo lo posible para mantenerse fuera de su camino mientras proporciona un andamiaje confiable para que pueda construir.

Los casos de uso típicos de CherryPy van desde una aplicación web normal con interfaces de usuario
(piense en blogs, CMS, portales, comercio electrónico) solo para servicios web.

Aquí hay algunas razones por las que le gustaría elegir CherryPy:

**1. Sencillez**

Desarrollar con CherryPy es una tarea sencilla. "Hola, mundo" tiene solo unas pocas líneas y no requiere que el desarrollador aprenda todo el marco (aunque muy manejable) de una vez. El marco es muy pitónico; es decir, sigue muy bien las convenciones de Python (el código es escaso y limpio).

Compare esto con los marcos web más populares y visibles de J2EE y Python: Django, Zope, Pylons y Turbogears. En todos ellos, la curva de aprendizaje es enorme. En estos marcos, "Hello, world" requiere que el programador configure un andamio grande que abarque varios archivos y escriba una gran cantidad de código repetitivo. CherryPy tiene éxito porque no incluye la sobrecarga de otros marcos, lo que permite al programador escribir su aplicación web rápidamente mientras mantiene un alto nivel de organización y escalabilidad.

CherryPy también es muy modular. El núcleo es rápido y limpio, y las funciones de extensión son fáciles de escribir y conectar usando código o el elegante sistema de configuración. Los componentes principales (servidor, motor, solicitud, respuesta, etc.) son extensibles (incluso reemplazables) y están bien administrados.

En resumen, CherryPy le permite al desarrollador trabajar con el marco, no en su contra ni a su alrededor.

**2. Fuerza**

CherryPy aprovecha todo el poder de Python. Python es un lenguaje dinámico que permite un rápido desarrollo de aplicaciones. Python también tiene una amplia API integrada que simplifica el desarrollo de aplicaciones web. Sin embargo, aún más extensas son las bibliotecas de terceros disponibles para Python. Estos van desde mapeadores relacionales de objetos hasta bibliotecas de formularios, un optimizador automático de Python, un generador de Windows exe, bibliotecas de imágenes, soporte de correo electrónico, motores de plantillas HTML, etc. Las aplicaciones CherryPy son como las aplicaciones regulares de Python. CherryPy no se interpone en tu camino si quieres utilizar estas brillantes herramientas.

CherryPy también proporciona [herramientas] (https://docs.cherrypy.dev/extend.html#tools) y [complementos] (https://docs.cherrypy.dev/extend.html#busplugins), que son poderosos puntos de extensión necesario para desarrollar aplicaciones web de clase mundial.

**3. Madurez**

La madurez es extremadamente importante cuando se desarrolla una aplicación del mundo real. A diferencia de muchos otros marcos web, CherryPy ha tenido muchas versiones finales estables. Está completamente probado, optimizado y probado como confiable para el uso en el mundo real. La API no cambiará repentinamente ni romperá la compatibilidad con versiones anteriores, por lo que se garantiza que sus aplicaciones seguirán funcionando incluso a través de actualizaciones posteriores en la serie de versiones actual.

CherryPy también es un proyecto â3.0â: la primera edición de CherryPy marcó la pauta, la segunda edición lo hizo funcionar y la tercera edición lo hace hermoso. Cada versión se basó en las lecciones aprendidas de la anterior, brindando al desarrollador una herramienta superior para el trabajo.

**4. Comunidad**

CherryPy tiene una comunidad dedicada que desarrolla aplicaciones CherryPy implementadas y está dispuesta y lista para ayudarlo en la lista de correo de CherryPy o Gitter. Los desarrolladores también frecuentan la lista y, a menudo, responden preguntas e implementan funciones solicitadas por los usuarios finales.

**5. Implementabilidad**

A diferencia de muchos otros marcos web de Python, existen formas rentables de implementar su aplicación CherryPy.

Listo para usar, CherryPy incluye su propio servidor HTTP listo para producción para alojar su aplicación. CherryPy también se puede implementar en cualquier puerta de enlace compatible con WSGI (una tecnología para interactuar con numerosos tipos de servidores web): mod_wsgi, FastCGI, SCGI, IIS, uwsgi, tornado, etc. El proxy inverso también es una forma común y fácil de configurarlo. .

Además, CherryPy es Python puro y es compatible con Python 2.3. Esto significa que CherryPy se ejecutará en todas las plataformas principales en las que se ejecutará Python (Windows, MacOSX, Linux, BSD, etc.).

[webfaction.com](https://www.webfaction.com), dirigido por el inventor de CherryPy, es un servidor web comercial que ofrece paquetes de alojamiento CherryPy (además de varios otros).

**6. ¡Es gratis!**

Todo CherryPy tiene la licencia BSD de código abierto, lo que significa que CherryPy se puede usar comercialmente a un costo CERO.

**7. ¿A dónde ir desde aquí?**

Consulte los [tutoriales](https://docs.cherrypy.dev/tutorials.html#tutorials) para comenzar a disfrutar de la diversión.

## Historias de éxito

Estás interesado en CherryPy pero te gustaría saber más de la gente
usarlo, o simplemente ver los productos o aplicaciones que lo ejecutan.

Si desea que su sitio web o producto con tecnología CherryPy se incluya aquí,
contáctenos a través de nuestra [lista de correo](http://groups.google.com/group/cherrypy-users)
o [Gitter](https://gitter.im/cherrypy/cherrypy).

### Sitios web que se ejecutan sobre CherryPy

[Hulu Deejay y Hulu Sod](http://tech.hulu.com/blog/2013/03/13/python-and-hulu) - Hulu usa
CherryPy para algunos proyectos.
âEl servicio debe ser de muy alto rendimiento.
Python, junto con CherryPy,
[gunicorn](http://gunicorn.org), y gevent más que proporciona para esto.â

[Netflix](http://techblog.netflix.com/2013/03/python-at-netflix.html) - Netflix usa CherryPy como elemento básico en su infraestructura: âAPI Restful para
grandes aplicaciones con solicitudes, proporcionando interfaces web con CherryPy y Bottle,
y procesamiento de datos con scipy.â

[Urbanility](http://urbanility.com) - Sitio web francés para activos de vecindarios locales en Rennes, Francia.

[Suministro MROP] (https://www.mropsupply.com) - Tienda web para equipos industriales,
desarrollado usando CherryPy 3.2.2 utilizando Python 3.2,
con bibliotecas: [Jinja2-2.6](http://jinja.pocoo.org/docs), davispuh-MySQL-for-Python-3-3403794,
pyenchant-1.6.5 (para buscar ortografía).
âVengo del desarrollo de .NET y encontré Python y CherryPy para
ser sorprendentemente minimalista. Sin gastos generales innecesarios: construya todo lo que desee
necesita sin la pelusa adicional. ¡Soy un fan!

[CherryMusic](http://www.fomori.org/cherrymusic) - Un servidor de transmisión de música escrito en python:
¡Transmita su propia colección de música a todos sus dispositivos! CherryMusic es de código abierto.

[YouGov Global](http://www.yougov.com) - Empresa de investigación de mercado internacional, lleva a cabo
millones de encuestas en CherryPy anualmente.

[Aculab Cloud](http://cloud.aculab.com) - Aplicaciones de voz y fax en la nube.
Una API de telefonía simple para Python, C#, C++, VB, etcâ¦
El sitio web y todos los servicios web front-end y back-end están construidos con CherryPy,
liderado por nginx (solo manejando el ssh y el proxy inverso), y ejecutándose en AWS en dos regiones.

[Learnit Training](http://www.learnit.nl) - Sitio web holandés para una TI, Gestión y
Empresa de formación en comunicación. Basado en CherryPy 3.2.0 y Python 2.7.3, con
[nuestrosql](http://pythonhosted.org/nuestrosql) y
Bibliotecas [DBUtils](http://www.webwareforpython.org/DBUtils), entre otras.

[Linstic](http://linstic.com) - Notas adhesivas en su navegador (con enlace).

[Página de inicio de Almad] (http://www.almad.net) - Página de inicio simple con blog.

[Fight.Watch](http://fight.watch): portal web Twitch.tv para juegos de lucha.
Basado en CherryPy 3.3.0 y Python 2.7.3 con Jinja 2.7.2 y SQLAlchemy 0.9.4.

### Productos basados en CherryPy

[SABnzbd](http://sabnzbd.org) - Lector de noticias binario de código abierto escrito en Python.

[Auriculares](https://github.com/rembo10/headphones): complemento de terceros para SABnzbd.

[SickBeard](http://sickbeard.com) - âSick Beard es un PVR para usuarios de grupos de noticias (con soporte limitado para torrent). Busca nuevos episodios de sus programas favoritos y, cuando se publican, los descarga, los ordena y les cambia el nombre y, opcionalmente, genera metadatos para ellos”.

[TurboGears](http://www.turbogears.org) - El megaframework de desarrollo web rápido. Turbogears 1.x usó Cherrypy. âCherryPy es el servidor de aplicaciones subyacente para TurboGears. Es responsable de tomar las solicitudes del navegador del usuario, analizarlas y convertirlas en llamadas al código Python de la aplicación web. Su función es similar a la de los servidores de aplicaciones utilizados en otros lenguajes de programación”.

[Indigo](http://www.perceptionautomation.com/indigo/index.html) - âUn control inteligente del hogar
servidor que integra módulos de hardware de control del hogar para proporcionar el control de su hogar. Indigo incorporado
El servidor web y la arquitectura cliente/servidor le brindan control y acceso a su hogar de forma remota desde
otras Mac, PC, tabletas de Internet, PDA y teléfonos móviles.â

[SlikiWiki](http://www.sf.net/projects/slikiwiki) - Wiki construido en CherryPy y con WikiWords, backlinking automático, generación de mapa del sitio, búsqueda de texto completo, bloqueo para ediciones simultáneas, incrustación de fuente RSS, acceso por página listas de control y formato de página usando el marcado PyTextile.â

[read4me](http://sourceforge.net/projects/read4me) - read4me es un servicio web de lectura de feeds de Python.

[Herramientas de control de calidad de Firebird](http://www.firebirdsql.org/en/quality-assurance): las herramientas de control de calidad de Firebird se basan en CherryPy.

[salt-api](https://github.com/saltstack/salt-api): una API REST para Salt, la herramienta de orquestación de infraestructura.

