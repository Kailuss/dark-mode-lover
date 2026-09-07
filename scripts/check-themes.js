// Lo que un tema puede romper SIN QUE NADIE LO DIGA.
//
// Un tema no compila, no tiene tests y no se ejecuta: es JSON que VS Code lee y
// aplica. Eso hace que sus fallos sean todos de la clase que este repositorio
// tiene que cortar a mano — el editor IGNORA una clave de color que no conoce,
// así que un nombre mal escrito no da error: ese elemento se queda con el color
// por defecto y hay que darse cuenta MIRANDO. Ya pasó: un `editorBracketHighli
// ght.foreground1` con un espacio dentro, y con él la llave de cierre del
// fichero, que sí habría reventado al cargar.
//
// La invariante de la que cuelga casi todo lo de aquí es que **las variantes son
// UN tema en nueve acentos**: la misma estructura con distintos valores. Así que
// sus conjuntos de claves tienen que ser idénticos, y esa comparación es EXACTA
// —no necesita ninguna lista de referencia— y corta el fallo de arriba en el
// acto, porque un typo aparece en una de nueve.
//
// Lo que deliberadamente NO se comprueba es que una clave EXISTA en VS Code. El
// registro de colores solo está dentro del bundle minificado del workbench, y lo
// que se saca de ahí sale incompleto: una lista de referencia que necesita
// excepciones el primer día es una lista mal extraída y no un check. Lo que sí
// se afirma es que las nueve dicen lo mismo.

const fs   = require('fs');
const path = require('path');

const ROOT   = path.join(__dirname, '..');
const THEMES = path.join(ROOT, 'themes');

let failures = 0;
function fail(message) {
	console.error(`[check-themes] ${message}`);
	failures++;
}

/**
 * Un fichero de tema es JSONC, no JSON: lleva comentarios `//!` y `//?` que son
 * la forma de navegarlo. Se quitan las líneas de comentario y las comas de cola
 * antes de parsear.
 *
 * Solo líneas COMPLETAS de comentario: un `//` a media línea dentro de una
 * cadena se llevaría por delante un valor de verdad.
 */
function parseJsonc(file) {
	const raw = fs.readFileSync(file, 'utf8');
	const clean = raw
		.split('\n')
		.filter(line => !/^\s*\/\//.test(line))
		.join('\n')
		.replace(/,(\s*[}\]])/g, '$1');
	try {
		return JSON.parse(clean);
	} catch (error) {
		fail(`${path.basename(file)} is not valid JSON: ${error.message}`);
		return null;
	}
}

//= 1. TODO TEMA DECLARADO EXISTE, Y TODO `include` RESUELVE
//
// El manifiesto es lo único que REGISTRA un tema: un fichero que no esté ahí no
// existe para VS Code por mucho que esté en disco. Y al revés, una ruta que el
// manifiesto nombre y no exista deja al usuario con una entrada en la lista de
// temas que no se puede seleccionar.

function checkDeclared() {
	const manifest = JSON.parse(fs.readFileSync(path.join(ROOT, 'package.json'), 'utf8'));
	const declared = manifest.contributes?.themes ?? [];

	if (declared.length === 0) {
		fail('package.json declares no theme: the extension would install and contribute nothing');
		return [];
	}

	const files = [];
	for (const theme of declared) {
		const file = path.join(ROOT, theme.path);
		if (!fs.existsSync(file)) {
			fail(`package.json declares "${theme.label}" at ${theme.path}, which does not exist`);
			continue;
		}
		if (!theme.label) { fail(`the theme at ${theme.path} has no label: the picker would show it blank`); }
		if (!theme.uiTheme) { fail(`the theme at ${theme.path} has no uiTheme`); }
		files.push(file);
	}
	return files;
}

/** Un `include` que no resuelve deja el tema sin NINGÚN color de sintaxis. */
function checkIncludes(file, theme) {
	if (!theme?.include) { return; }
	const target = path.resolve(path.dirname(file), theme.include);
	if (!fs.existsSync(target)) {
		fail(`${path.basename(file)} includes ${theme.include}, which does not exist`);
	}
}

//= 2. LAS VARIANTES DICEN LO MISMO
//
// Son un tema en nueve acentos, así que sus claves de `colors` tienen que ser el
// mismo conjunto. Una que sobre en una es casi siempre un nombre mal escrito;
// una que falte es un elemento que en ESA variante cae en el color por defecto
// —el de VS Code, no el nuestro— y se ve como si el tema estuviera a medias.

function checkFamily(themes) {
	const family = [...themes.entries()].filter(([file]) => /dark-mode-lover.*\.json$/.test(file));
	if (family.length < 2) { return; }

	const keysOf = new Map(family.map(([file, theme]) =>
		[path.basename(file), new Set(Object.keys(theme.colors ?? {}))]));

	const union = new Set([...keysOf.values()].flatMap(keys => [...keys]));

	for (const key of union) {
		const has = [...keysOf].filter(([, keys]) => keys.has(key)).map(([name]) => name);
		if (has.length === family.length) { continue; }
		const lacks = [...keysOf.keys()].filter(name => !has.includes(name));

		// Se reporta el lado MENOR, que es el que nombra al culpable. Una clave
		// que solo tiene una variante es casi siempre un nombre mal escrito ahí,
		// y decirlo como «a las otras ocho les falta» acusa a los inocentes y
		// esconde el fichero que hay que abrir. Fue exactamente ese fallo.
		if (has.length <= lacks.length) {
			fail(`"${key}" is declared ONLY by ${has.join(', ')} and by none of the other ${lacks.length} variants: almost always a misspelled key, which VS Code ignores in silence`);
		} else {
			fail(`${lacks.join(', ')} ${lacks.length === 1 ? 'has' : 'have'} no "${key}", which the other ${has.length} variants declare: that element falls back to the VS Code default`);
		}
	}
}

//= 3. LO QUE UN VALOR PUEDE SER
//
// Un color mal escrito se descarta entero, así que el elemento queda con el
// defecto: exactamente el mismo fallo callado que una clave mal escrita. Se
// aceptan las cuatro formas que VS Code lee y ninguna más.

const HEX = /^#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/;

function checkValues(file, theme) {
	const name = path.basename(file);
	for (const [key, value] of Object.entries(theme.colors ?? {})) {
		if (typeof value !== 'string') {
			fail(`${name}: "${key}" is not a string`);
			continue;
		}
		if (!HEX.test(value)) {
			fail(`${name}: "${key}" is "${value}", which is not a hex colour: VS Code drops it and the element takes its default`);
		}
	}
}

//= 4. UNA CLAVE ESCRITA DOS VECES
//
// JSON no lo rechaza: se queda con la ÚLTIMA en silencio. Así que un color
// afinado a mano puede estar pisado por otro cincuenta líneas más abajo, y lo
// que se ve no es lo que se lee.
//
// Solo dentro de `colors`, que es un objeto plano. En `tokenColors` las mismas
// claves (`name`, `scope`, `settings`) se repiten UNA VEZ POR REGLA y eso es su
// forma correcta.

function checkDuplicates(file) {
	const lines = fs.readFileSync(file, 'utf8').split('\n');
	const name  = path.basename(file);
	const seen  = new Map();
	let inColors = false;

	for (const [index, line] of lines.entries()) {
		if (/^\s*"colors"\s*:\s*\{/.test(line)) { inColors = true; continue; }
		if (inColors && /^\s*\}/.test(line))    { inColors = false; continue; }
		if (!inColors) { continue; }

		// Todas las de la línea, no la primera: dos claves caben en una sola y la
		// segunda se escapaba de un escaneo que paraba en el primer match.
		for (const match of line.matchAll(/"([^"]+)"\s*:/g)) {
			const key = match[1];
			if (seen.has(key)) {
				fail(`${name}: "${key}" is written twice (lines ${seen.get(key)} and ${index + 1}); JSON silently keeps the last`);
			} else {
				seen.set(key, index + 1);
			}
		}
	}
}

//= 5. EL FICHERO SE PUEDE SEGUIR LEYENDO
//
// El `$schema` es lo que da validación y autocompletado al editarlo, que en un
// repositorio cuyo trabajo entero es teclear nombres de color no es un adorno:
// es lo único que avisa de un nombre inventado ANTES de publicarlo.

function checkShape(file, theme) {
	const name = path.basename(file);
	if (theme.$schema !== 'vscode://schemas/color-theme') {
		fail(`${name} has no "$schema": editing it loses key validation and autocompletion`);
	}
	if (!theme.name) { fail(`${name} has no "name"`); }
	if (!theme.type) { fail(`${name} has no "type"`); }
}

//= EJECUCIÓN

const declared = checkDeclared();
const themes   = new Map();

for (const file of fs.readdirSync(THEMES).map(f => path.join(THEMES, f))) {
	if (!file.endsWith('.json')) { continue; }
	const theme = parseJsonc(file);
	if (!theme) { continue; }
	themes.set(file, theme);
	checkIncludes(file, theme);
	checkDuplicates(file);
}

for (const file of declared) {
	const theme = themes.get(file);
	if (!theme) { continue; }
	checkShape(file, theme);
	checkValues(file, theme);
}

checkFamily(themes);

if (failures > 0) {
	console.error(`[check-themes] ${failures} problem(s)`);
	process.exit(1);
}
console.log(`[check-themes] ${themes.size} theme file(s): all parse, every declared path and include resolves, the ${declared.length} variants share one key set, and no colour is written twice`);
