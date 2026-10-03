# CLAUDE.md

Guía para trabajar en este repositorio.

**Idioma**: todo lo que se publica está **en inglés** — el README y el CHANGELOG,
y los rótulos de los temas en el manifiesto. Este fichero es la excepción y va en
español: es la guía interna, no viaja en el `.vsix` y no la lee nadie de fuera.
Es la misma regla que siguen Atria y Bays, las otras dos extensiones.

**Puntuación de lo que se publica**: nada de RAYAS (`—`, `–`) ni de comillas
tipográficas (`’`, `“`, `”`) en el README ni en el CHANGELOG. Se leen como texto
de máquina, que es exactamente lo que una ficha de marketplace no puede parecer.
Cada raya se sustituye por lo que de verdad estaba haciendo, y hay que mirarla
una a una: dos puntos cuando lo que sigue explica lo de antes, paréntesis cuando
es una enumeración metida en medio, coma cuando el inciso es corto, y punto y
frase nueva cuando eran dos ideas. Un reemplazo a ciegas por guiones deja la
prosa peor que como estaba.

La regla tiene tres excepciones, y aquí hoy solo cuenta la tercera:

- **Los `…` de una etiqueta de UI** se quedan: en VS Code ese carácter significa
  «esto abre un diálogo», así que quitarlo cambia lo que la etiqueta promete. Lo
  mismo las flechas cuando nombran una tecla. Este repositorio no tiene ninguna:
  no contribuye comandos, y lo único que publica con palabras son los rótulos de
  los nueve temas, que son nombres propios.
- **El chino y el japonés se quedan como están**, donde `“”` son las comillas
  nativas y `——` el guión estándar: sustituirlos por ASCII no despersonaliza la
  traducción, la escribe mal. Aquí no hay traducciones, y la excepción se queda
  escrita en el escaneo porque es la regla y no un caso.
- **Este fichero y los comentarios de los JSON**, por lo mismo que la regla de
  idioma de arriba: son internos, no viajan en el `.vsix` y están escritos con
  esa voz de cabo a rabo.

**Lo barre `check-docs`**, sobre los dos ficheros que el marketplace renderiza.
Lo que el check **no** decide es el reemplazo: cuál toca es un juicio por frase,
y por eso corta en vez de arreglar. Los rótulos del manifiesto quedan fuera del
escaneo: son nombres y no prosa.

## Cómo contestar en el chat

**Corto.** Contexto en una línea, el bug, el cambio, y lo que cuesta. Nada de
folios: quien lee esto tiene TDA y un muro de texto no se lee, se salta — así
que una respuesta larga no es más útil, es menos.

Sirve para el CHAT y no para el repo: los comentarios de los temas, los mensajes
de commit y este fichero siguen explicando el porqué entero, porque ahí se leen
una vez y se consultan cuando hacen falta. Lo que se recorta es la conversación.

Reglas prácticas: la conclusión primero; una tabla antes que tres párrafos; los
detalles solo si se piden; y no repetir en prosa lo que ya dice un diff o un
comando en verde.

## Tareas — el tablero de Trello

**Tablero:** [Dark Mode Lover](https://trello.com/b/68RE66HM/dark-mode-lover) (workspace *Proyectos*). Es uno por proyecto: Atria,
Bays y Dark Mode Lover son tres repos que solo comparten el `Lovervoid.code-workspace` que
los abre juntos, y cada uno lleva su tablero y esta misma sección con sus ids. **Manda el
tablero**, no el doc: el estado vivo de cada tarea está en Trello. Se opera con las
herramientas MCP de Trello (`trelloWriteCard` · `trelloReadCard` · …).

**Un documento apunta, no repite.** Si algo del repo habla de una tarea, la enlaza por su
número —`[#12](https://trello.com/c/<shortLink>)`— y no copia su título ni su estado, que
es lo primero que se desincroniza. Siempre como enlace, nunca un `#12` suelto. El doc se
queda con lo que no cabe en una tarjeta: el porqué, el orden entre tareas, lo descartado.
`plan-backlog.md` sigue siendo el buzón de notas sin trackear, no un segundo tablero: lo
que de ahí se decide hacer pasa a tarjeta.

**Listas** (prefijo `ari:cloud:trello::list/workspace/61a4866a8aeb30111cab2111/`):

| Lista | Para qué | id |
|---|---|---|
| Backlog | Lo que toca, ordenado por prioridad (`pos` 1…N) | `6ab272c4c87c4e95cfe0d8ec` |
| En proceso | Solo lo que tiene trabajo abierto ahora mismo | `6ab272c52cd901060c8aabd3` |
| Por verificar | Código hecho y commiteado; falta la prueba real (F5, el `.vsix`) o una decisión de Alfonso | `6ab272c6bda339badff2643a` |
| Hecho | Cerrado | `6ab272c7d79bd38e267e0711` |
| Planes de futuro | Ideas grandes sin fecha: se apuntan para no perderlas, no para hacerlas ya | `6ab272c91625bc5d42b33152` |
| Aparcado | Empezado o decidido, pero bloqueado por algo concreto y nombrado | `6ab272c958af903b0c719190` |

*Aparcado* y *Planes de futuro* no son lo mismo: lo aparcado espera a que se quite un
bloqueo concreto; un plan de futuro espera a que se decida hacerlo.

**Etiquetas** (prefijo `ari:cloud:trello::label/workspace/61a4866a8aeb30111cab2111/`): una
de área por tarjeta, y *Avería* encima si además está roto en lo publicado o bloquea.
Aquí no hay colores a propósito: se cambian y la tabla envejecería sola. Lo que no cambia es
el id, que es lo que se pasa a `attach_label`.

| Etiqueta | Área | id |
|---|---|---|
| Workbench | los colores de la UI de VS Code (`colors`) | `6ab272bcb1f9a2f294df0742` |
| Sintaxis | el resaltado: `tokenColors` y los tokens semánticos | `6ab272bcb1f9a2f294df0741` |
| Infra | checks · docs · release | `6ab272bcb1f9a2f294df073d` |
| Avería | roto en lo publicado / bloqueante (se suma al área) | `6ab272bcb1f9a2f294df0740` |

Ante duda, leer el tablero (`trelloReadBoard` → `list_labels`); esta tabla es un espejo, no
la fuente. Y un cambio que toca a los tres repos (los scripts de `scripts/` están copiados en
cada uno) es una tarjeta *Infra* en cada tablero donde aterriza, enlazadas entre sí.

### El flujo

Alfonso propone un cambio en conversación y no se hace en el acto → **creo la tarjeta**,
pensada y redactada, sin pedir permiso ni esperar a que diga "apunta esto". Si se hace en el
acto, no hay tarjeta: hay commit.

**Anatomía.** Título `#<n> [área] qué pasa, en una línea`, con el verbo o el síntoma
delante; nada de "revisar X". El área es el nombre de la etiqueta en minúscula y sin tilde
(`workbench` · `sintaxis` · `infra`). El `<n>` es el **idShort de Trello**, el número que la tarjeta lleva en su URL
(`/c/<shortLink>/87-…`): no se inventa ni se lleva cuenta aparte. Trello no lo asigna hasta
que la tarjeta existe, así que crearla son dos pasos: `create` con el título sin número y
`update` con el `#<n>` delante, leído de la url que devuelve el create. Cuerpo:

```
**Qué pasa.** El problema o la oportunidad, con el porqué. Si hay una decisión de diseño
detrás, va aquí: la tarjeta tiene que valer sola dentro de tres meses, leída en frío.
**Dónde.** Rutas y símbolos reales (`fichero:línea` cuando se sepa).
**Hecho cuando.** Criterio observable. Nada de "funciona bien".
**Esfuerzo:** S/M/L · **Origen:** de dónde sale (conversación, bug, revisión…)
```

Lo que NO va: el plan de implementación paso a paso (eso se decide al hacerla), ni una
decisión ya tomada disfrazada de pregunta abierta.

**Movimientos.** Empiezo algo → *En proceso*. Termino el código pero no puedo verificarlo yo
→ *Por verificar*, con un "Te queda: …" concreto en la tarjeta. Lo cierro → *Hecho*
(`mark_done`), y si el cierre dejó una decisión que importa, la anoto en la tarjeta **antes**
de moverla. Lo que depende de otra cosa → *Aparcado*, diciendo de qué. Una tarea que resulta
ser el comportamiento correcto se cierra con el porqué escrito, no se borra.

**Un commit que menciona una tarjeta no la cierra.** Antes de mover algo a *Hecho* se
comprueba contra su "Hecho cuando" que está hecho de verdad.

**El orden del Backlog lo llevo yo**, con criterio y sin preguntar (Alfonso lo delegó el
2026-09-22): lo que se ve roto o se paga a diario y es barato va arriba, lo que depende de una
decisión suya o de trabajo manual va abajo, y lo que ni siquiera está decidido si se quiere va a
*Planes de futuro*. Al reordenar, una línea en el chat con el porqué del orden.

**Lo que no hago solo:** archivar tarjetas que escribió Alfonso, ni marcar hecho lo que no he
verificado.

## Qué es

Un **tema de color de VS Code** (`Lovervoid.dark-mode-lover`), y nada más: **no
hay código de aplicación, ni build, ni `node_modules`**. El «código» son ficheros
JSON en `themes/`, y todo el trabajo es editar valores de color y reglas de
ámbito.

Eso cambia dónde están los fallos. Un tema no compila y no se ejecuta, así que
**ninguno de sus errores se reporta**: VS Code IGNORA una clave de color que no
conoce, de modo que un nombre mal escrito no da error — ese elemento se queda con
el color por defecto y hay que darse cuenta MIRANDO. Ya pasó: un
`editorBracketHighlight.foreground1` acabó con un espacio dentro, y con él la
llave de cierre del fichero.

## Comandos

```bash
npm run compile        # la puerta de calidad: check-themes + check-docs
npm run check-themes   # los temas parsean, las variantes dicen lo mismo, ningún color se escribe dos veces
npm run check-docs     # las rutas que cita la prosa existen, y lo publicado no lleva rayas
npm run check-release  # la versión del manifiesto tiene entrada propia, fechada y única, en el changelog
npm run vsix           # empaqueta, con el canal derivado de la versión
npm run release        # lo mismo, publicando
```

No hay lint ni tests: no hay nada que lintar ni nada que ejecutar. La puerta son
los dos escaneos.

## La familia son NUEVE temas, y ésa es la invariante

`Lover` · `Wasp` · `Fire` · `Ruby` · `Leaf` · `Berry` · `Sea` · `Salt` · `Ash`.

**Son UN tema en nueve acentos**: la misma estructura con distintos valores. Cada
uno lleva su propio bloque `colors` (la UI) y **todos incluyen la misma capa de
sintaxis**, así que colorean el código de forma idéntica y lo único que cambia es
el acento — botones, foco, pestaña activa, barra de título, enlaces — y la
insignia complementaria.

De ahí sale la comprobación más útil de este repositorio: **sus conjuntos de
claves tienen que ser el mismo**. Esa comparación es EXACTA —no necesita ninguna
lista de referencia— y corta el fallo de arriba en el acto, porque un nombre mal
escrito aparece en una de nueve.

- Una clave que **falta** en una variante es un elemento que ahí cae en el color
  por defecto de VS Code, no en el nuestro, y se ve como un tema a medias.
- Una clave que **solo** tiene una variante es casi siempre un nombre mal
  escrito. El check reporta el lado menor a propósito: dicho como «a las otras
  ocho les falta» acusa a los inocentes y esconde el fichero que hay que abrir.

## La estructura de un fichero de tema

Sigue la práctica de **Dark Modern**, el propio tema de VS Code: una capa de
sintaxis compartida, y cada variante la `include` y sobreescribe solo la UI.

| fichero | qué es |
|---|---|
| `themes/dark-mode-syntax.json` | **la capa de sintaxis compartida** (`semanticTokenColors` + `tokenColors`). No está registrada y no es seleccionable: existe solo como destino de `include`. **Tocarla cambia el color del código de las nueve a la vez** |
| `themes/dark-mode-lover*.json` | las nueve variantes: `$schema`, `name`, `type`, `semanticHighlighting`, el `include` y su bloque `colors`. **No llevan `tokenColors` propios** |
| `themes/dark-mode-hater.json` | una variante **clara**, autocontenida (su paleta no tiene nada que ver con la capa oscura, así que no la incluye). Está en disco y **no** registrada: es trabajo sin publicar |

**Lo que REGISTRA un tema es el manifiesto**, y nada más: un fichero que no esté
en `contributes.themes` no existe para VS Code por mucho que esté en `themes/`.
Al revés también — una ruta declarada que no exista deja una entrada en la lista
de temas que no se puede seleccionar.

**Cómo funde `include`** (verificado contra los temas de VS Code): `colors` y
`semanticTokenColors` se funden POR CLAVE y gana el fichero que incluye; los
`tokenColors` se CONCATENAN. Es intra-extensión: una ruta relativa a un fichero
del propio paquete, nunca al tema de otra extensión.

**Y el resaltado tiene dos capas**: `semanticTokenColors` va ENCIMA de
`tokenColors`. Cuando un token sale de un color raro, lo primero es averiguar
cuál de las dos está ganando — la semántica gana donde un servidor de lenguaje
aporta tokens — antes de tocar nada.

**Dónde se hace un cambio**: la sintaxis de los oscuros, en la capa compartida y
una sola vez; la del claro, en su propio fichero; y la UI, en el bloque `colors`
de cada variante — si tiene que ser consistente, en las nueve.

## Convenciones

- **Todo fichero abre con `"$schema": "vscode://schemas/color-theme"`**, y es lo
  primero. Da validación y autocompletado al editar, que en un repositorio cuyo
  trabajo entero es teclear nombres de color no es un adorno: es lo único que
  avisa de un nombre inventado ANTES de publicarlo.
- **Son JSONC y no JSON estricto.** Llevan comentarios `//!` para las secciones
  mayores y `//?` para las subsecciones, y ésa es la forma de navegarlos.
  Consérvalos, y conserva la alineación en columnas. **No pases un formateador
  que se lleve los comentarios o colapse la alineación.**
- **Los colores van en hex abreviado con alfa**: `#rgb` y `#rgba` (`#fff7` es
  blanco al 47 %, `#fa5` es opaco). El alfa se usa mucho y a propósito, para
  capas sutiles de UI: conserva la forma corta en vez de expandirla a 6 u 8
  dígitos.
- **Una clave escrita dos veces no la rechaza nadie**: JSON se queda con la
  ÚLTIMA en silencio, así que un color afinado a mano puede estar pisado por otro
  cincuenta líneas más abajo. Lo corta `check-themes`.

## Los mensajes de commit

**Todo commit abre con un GITMOJI**, el emoji en sí y nunca el `:shortcode:`, que
es lo que este repositorio ya hace:

```
💄 Quiet the menu bar to the muted accent
```

Un emoji, un espacio, y detrás el asunto de siempre — en INGLÉS, en imperativo y
sin punto final. El resto del mensaje no cambia: el porqué entero sigue yendo en
el cuerpo, que es uno de los dos sitios donde se lee completo (el otro es esta
guía).

- **El emoji y no el código.** `:lipstick:` es lo que gitmoji escribe donde no se
  puede teclear un emoji, y aquí sí se puede: en un `git log` y en la ficha del
  marketplace el carácter se ve y el código hay que traducirlo.
- **Uno solo, y al principio.** Es la marca de qué clase de cambio es el commit,
  no una lista de todo lo que toca; dos emojis son dos respuestas a una pregunta
  que solo tiene una, y uno en medio de la frase no se puede ojear en una columna
  de log.
- **Qué emoji lo dice el cambio y no el fichero que toca**, y en un repositorio
  de temas eso empuja a media docena: 💄 lo que solo cambia cómo se ve, que es
  casi todo; 🎨 una clave que se declara donde faltaba; 🐛 un color mal escrito o
  ilegible; 📝 documentación, esta guía incluida; 🔧 los scripts de la puerta;
  🔖 cortar una versión; ✨ una variante nueva; 🔥 quitar una; y 💥 un cambio que
  rompe lo que alguien tenía seleccionado.
- **💄 y 🎨 no son lo mismo, y conviene no mezclarlos**: aquél mueve un valor que
  ya se estaba pintando y éste declara una clave que ninguna variante tenía, o
  sea un elemento que hasta ahora caía en el color por defecto de VS Code.
- **No se usa conventional commits.** Los dos juntos serían dos prefijos delante
  del asunto para decir lo mismo: `style: 💄 …` gasta media línea en repetirse.
- **Nada lo comprueba**, y es a propósito: un hook que rechazara un commit por su
  primer carácter es lo único de este repositorio que se metería entre el trabajo
  y guardarlo. Es una convención de la casa, como la puntuación del changelog.

## Lo que la puerta se niega a dejar pasar

`scripts/check-themes.js`, que es la guarda propia de este repositorio:

- **Un fichero que no parsea.** Es el único fallo que sí revienta al cargar, y
  aun así no lo dice nadie hasta que se selecciona el tema.
- **Un tema declarado que no existe, y un `include` que no resuelve.** El segundo
  deja la variante sin NINGÚN color de sintaxis.
- **Las nueve variantes desacordadas**, en las dos direcciones (arriba).
- **Un valor que no es un color.** Se descarta entero, así que el elemento queda
  con el defecto: el mismo fallo callado que una clave mal escrita.
- **Una clave escrita dos veces** dentro de `colors`. Solo ahí: en `tokenColors`
  las mismas claves se repiten una vez por regla y ésa es su forma correcta.

Lo que **no** comprueba es que una clave EXISTA en VS Code. El registro de
colores solo está dentro del bundle minificado del workbench, y lo que se saca de
ahí sale incompleto: una lista de referencia que necesita excepciones el primer
día es una lista mal extraída y no un check. Lo que sí afirma es que las nueve
dicen lo mismo, que es lo que corta el fallo de verdad.

Y dos escaneos más, genéricos, que vienen de Atria sin tocar una línea:

- **`check-docs`** afirma que toda ruta que cita la prosa sigue nombrando un
  fichero que existe, que toda imagen está, y que lo que el marketplace renderiza
  no lleva rayas ni comillas tipográficas. Este fichero describía DOS temas meses
  después de que la familia creciera a nueve, y el README se quedó en ocho.
- **`check-release`** afirma que la versión del manifiesto tiene su propia
  entrada en el changelog, fechada, escrita y única, y la primera. La versión la
  rechaza `vsce publish` y nadie más; el changelog **no lo rechaza NADIE**, así
  que una release sin entrada se publica perfectamente y aterriza como una
  versión de la que su página no sabe decir qué cambió.

## Cuando pido «dale salida»

**«Darle salida» —o «sácalo», o «ciérralo»— significa CERRAR la versión, y son
cuatro pasos en este orden**: subir `version` en `package.json`, escribir su
entrada en CHANGELOG.md, commitear todo lo que quede suelto, y construir el
paquete con `npm run vsix`. Lo que se entrega al final es la RUTA del `.vsix`,
que es lo que de verdad se ha pedido.

No es una pregunta: dicho eso, se hacen los cuatro sin volver a preguntar por
ninguno. Qué número toca y qué forma tiene la entrada lo dice la sección que
sigue; los commits van con su gitmoji y se parten por lo que cambia cada uno,
nunca en uno solo que diga «cambios».

**Lo que NO incluye es publicar.** `npm run release` sube al marketplace y una
versión no se despublica, así que la salida acaba en un fichero en el disco y
quien lo sube es él.

## Antes de empaquetar: la versión y el changelog

**Todo paquete que vaya a publicarse necesita una versión que no se haya
publicado nunca y una entrada del changelog que la nombre.** Son dos escrituras
a mano —`version` en `package.json` y una cabecera `## [x.y.z]` fechada en
CHANGELOG.md— y las dos van **antes** de construir el `.vsix`, porque el
changelog viaja dentro. Cuál de las dos falla en silencio y quién corta cada una
está arriba, en `check-release`; aquí cuelga de `npm run vsix` y de
`npm run release`, así que corta ANTES de empaquetar nada.

Qué número toca lo dice la convención que el propio CHANGELOG.md declara en su
cabecera: los minor IMPARES (0.9, 1.1, …) salen por el canal **pre-release** del
marketplace y los pares son releases estables.

**Y cada entrada es una LISTA de lo que cambió, y nada más.** Una bala nombra el
cambio y se acaba ahí: ni por qué se hizo, ni contra qué se pesó, ni qué había
antes, ni qué cuesta. Todo eso vive en el commit que lo hizo y en esta guía, que
son los dos sitios donde se puede leer entero y donde se mantiene al día; en la
página del marketplace es un párrafo por bala que nadie lee y que además envejece
solo, porque la razón de un cambio la sustituye el cambio siguiente y la nota de
la versión vieja se queda escrita. Nada de párrafos sueltos entre las balas: si
algo no cabe en una bala es que no es un cambio. La única prosa que puede quedar
dentro de una bala es la que el lector NECESITA para actuar sobre ella: qué clave
de color se ha movido, qué variante hay que volver a seleccionar.

**Y la regla NO se declara en la cabecera del changelog.** Una nota diciendo que
ahí no se explica nada es prosa sobre el documento en un documento del que se
acaba de barrer justo eso, y encima justifica una ausencia a quien solo ha venido
a ver qué cambió. Lo que la cabecera sí dice es lo que el LECTOR necesita: qué
significan las categorías, y que el minor impar es el canal pre-release, o sea
qué número está a punto de instalar.

Lo que hay escrito hasta 0.10.3 no sigue esa forma —hay balas de cuatro líneas
explicando contra qué se pesó cada cambio— y no se reescribe hacia atrás: lo que
se añada de aquí en adelante sí.

## Al publicar: `npm run vsix` y `npm run release`

**`vsce` no se teclea a mano.** Lo componen esos dos scripts
(`scripts/release.js`), y lo que hacen es derivarlo en vez de recordarlo.

- **El CANAL lo decide la paridad del minor**: un minor **IMPAR** sale por el
  canal **pre-release** y uno par es estable. El marketplace no deduce ninguno de
  los dos —quien lo dice es `--pre-release`— y olvidarlo en un impar publica esa
  versión como la última ESTABLE para todo el mundo, actualizando sola. Una
  versión no se despublica, así que la única salida es publicar otra encima: es
  el fallo más caro de aquí, callado, en el último paso de todos y el único sin
  vuelta atrás.
  - **Se dice en voz alta antes de correr nada**, con el número del que sale:

    ```
    [release] 0.9.1: minor 9 is odd, so PRE-RELEASE
    ```

    Una línea que nombra la premisa y la conclusión se puede leer como
    equivocada ANTES de la subida, que es el único momento en que leerla sirve
    de algo.
  - **Y pasarla a mano se RECHAZA**: lo que se le añada al comando se le entrega
    a `vsce` tal cual —una ruta de salida, por ejemplo—, pero teclear de vuelta
    la derivada es exactamente el acordarse que esto existe para quitar.
  - **No hay ningún campo del manifiesto que diga el canal**, y conviene saberlo
    para no ir a buscarlo: es una bandera de publicación y nada más.
- **`--allow-missing-repository` NO se pasa, y es deliberado**: este paquete
  declara `repository`, así que los enlaces que `vsce` deriva de él resuelven y
  la pregunta no se hace. Una bandera que calla una pregunta que nadie está
  haciendo es una bandera que esconde el día que el campo desaparezca.

Lo que el script **no** puede hacer, porque no está de su lado: saber si esa
versión ya se ha publicado. Esa respuesta vive en el marketplace y quien la da es
`vsce publish` negándose. La otra mitad la cubre `check-release`.

Y **`vsce` no es una dependencia de este proyecto** —aquí no hay ninguna— y no
necesita serlo: se ejecuta de donde esté instalado.

**Consecuencia práctica**: la serie 0.10.x es estable, así que la siguiente
pre-release sería 0.11.0 y la estable de después 0.12.0.

## Qué hay en el repositorio además de los temas

| | |
|---|---|
| `README.md` | la página del marketplace: en inglés, para quien evalúa el tema |
| `CHANGELOG.md` | lo renderiza el marketplace en su pestaña; formato Keep a Changelog |
| `CLAUDE.md` | esto: la guía interna, en español, excluida del `.vsix` |
| `icon.png` | el icono de la ficha. **Viaja**, así que no dejes nada más a su lado |
| `screenshot.jpg` | para el README; excluido del paquete |
| `scripts/` | la puerta de calidad; excluida del paquete |

`.vscodeignore` decide qué viaja, y es una lista de **exclusiones**: **una
carpeta nueva viaja salvo que se añada ahí**. Conviene mirar `npx vsce ls` antes
de publicar — hoy son 15 ficheros y ninguno sobra.

**`dark-mode-hater.json` está excluido a propósito**: no está registrado, así que
en el paquete sería peso muerto.

## Cómo se prueba

No hay forma de automatizarlo: un tema se mira. **F5** abre un Extension
Development Host y el tema se elige en `Preferences > Color Theme`; editar un
JSON actualiza el host en vivo.

Lo que sí conviene hacer a mano, porque ningún escaneo puede: mirar **una
variante clara y una oscura del sistema**, y comprobar que lo que se ha tocado se
lee en las nueve — el acento cambia, y un contraste que funciona sobre el azul de
Lover puede no funcionar sobre el ámbar de Wasp.
