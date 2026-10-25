// Asserts that every `src/`-relative path cited in the documentation and in the
// code comments still names a file that exists, that every image a markdown
// points at is there, and that what the marketplace renders carries no dashes
// and no typographic quotes.
//
// The architecture prose is prose: nothing compiles it, so a path that goes
// stale keeps reading as true and actively misdirects. When this check was first
// written the guide still cited `src/webview/contextmenu.js` and
// `src/webview/webview.js`, months after the client became TypeScript. A rename
// that updates every import and leaves the guide behind passes `compile`.
//
// Only DIRECTORY-PREFIXED references are checked (`utils/pathFormatters.ts`,
// `src/webview/main.ts`, `scripts/check-layers.js`). A bare filename is
// deliberately out of scope: it survives a move, so it cannot rot.
//
// Scope is `src/` and `scripts/` alone: `dist/` and `out/` are build outputs
// that need not exist.

const fs   = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');

/** Top-level directories under src/ that a citation may start with. */
/**
 * Lo que cuenta como CITA: una ruta con directorio. Un nombre suelto sobrevive
 * a cualquier movimiento, asi que no puede pudrirse y queda fuera a proposito.
 *
 * La frontera de cola es lo que impide leer `themes/x.jsonc` como una cita de
 * `themes/x.json`.
 */
const CITATION = new RegExp(
	String.raw`\b(?:themes|scripts)\/[A-Za-z0-9_.\/-]*\.(?:json|js|md)(?![A-Za-z0-9])`,
	'g',
);

/** A citation with a glob or a `<placeholder>` names a set, not a file. */
function isTemplate(ref) {
	return /[*<>{}]/.test(ref);
}

/**
 * Every markdown of the repository EXCEPT the work notes.
 *
 * Discovered instead of listed, which is the whole reason this scales: a
 * hand-written list leaves the next document out, silently.
 *
 * `plan*.md` is skipped by the same pattern that keeps it out of the `.vsix`:
 * work notes are a snapshot of a moment and are allowed to name what that moment
 * had. `CHANGELOG.md` is skipped for the same reason — a released entry
 * describes the code as it was. `.remember/` holds a plugin's session notes:
 * git-ignored, and they cite paths from whichever repo the session was in.
 */
function docFiles(dir, out = []) {
	const SKIP = new Set(['node_modules', 'dist', 'out', '.git', '.vscode-test', '.remember']);
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		if (SKIP.has(entry.name)) { continue; }
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			docFiles(full, out);
		} else if (entry.name.endsWith('.md')
			&& !/^plan.*\.md$/i.test(entry.name)
			&& entry.name !== 'CHANGELOG.md') {
			out.push(full);
		}
	}
	return out;
}

/**
 * src/test/ is skipped: it is the one place where a path-shaped string is DATA
 * and not a citation, and no rename should ever be blocked by a fixture.
 */
function sourceFiles(dir, out = []) {
	for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) {
			if (entry.name !== 'test') { sourceFiles(full, out); }
		} else if (/\.(ts|css)$/.test(entry.name)) {
			out.push(full);
		}
	}
	return out;
}

/**
 * Every image a doc points at has to exist. The marketplace renders README.md as
 * the extension's page, so a path that names nothing does not fail here or at
 * package time: it fails on the published page, as a broken image on the first
 * thing anyone sees.
 *
 * HTML comments are stripped first — an image slot still to be captured lives
 * commented out and breaks nothing. Remote URLs are somebody else's to keep
 * alive.
 */
const IMAGE = /!\[[^\]]*\]\(([^)]+)\)/g;

function checkImages(scanned) {
	const misses = new Map();
	let checked = 0;

	for (const file of scanned) {
		if (!file.endsWith('.md')) { continue; }
		const text = fs.readFileSync(file, 'utf8').replace(/<!--[\s\S]*?-->/g, '');

		for (const [, ref] of text.matchAll(IMAGE)) {
			if (/^(https?:)?\/\//.test(ref)) { continue; }
			checked++;
			const target = path.join(ROOT, ref.split('#')[0].split('?')[0]);
			if (!fs.existsSync(target)) {
				const where = misses.get(ref) ?? new Set();
				where.add(path.relative(ROOT, file).replace(/\\/g, '/'));
				misses.set(ref, where);
			}
		}
	}

	return { misses, checked };
}

//= THE PUNCTUATION OF WHAT SHIPS

// No dashes and no typographic quotes in what the marketplace renders. The
// rule, its exceptions (the `…` of a UI label, the arrows, native CJK
// typography) and its reasons are the kit's, shared by every Lovervoid
// extension so the copies cannot drift apart: scripts/lib/punctuation.js.
const punctuation = require('./lib/punctuation');

function checkPunctuation() {
	return punctuation.checkPunctuation(ROOT);
}

function check() {
	// Los comentarios de los scripts del build citan rutas y se pudren igual que
	// la prosa, asi que estan en el corpus. No hay `src/`: aqui el codigo es JSON.
	const scanned = [
		...docFiles(ROOT),
		...sourceFiles(path.join(ROOT, 'scripts')),
	];

	const misses = new Map(); // ref -> Set of files citing it
	let checked = 0;

	for (const file of scanned) {
		const text = fs.readFileSync(file, 'utf8');
		for (const [ref] of text.matchAll(CITATION)) {
			if (isTemplate(ref)) { continue; }
			checked++;

			// Una cita ya lleva su directorio de verdad (`themes/x.json`), asi que
			// se resuelve contra la raiz tal cual: aqui no hay ningun prefijo que
			// la prosa se deje por sobreentendido.
			const target = path.join(ROOT, ref);

			if (!fs.existsSync(target)) {
				const where = misses.get(ref) ?? new Set();
				where.add(path.relative(ROOT, file).replace(/\\/g, '/'));
				misses.set(ref, where);
			}
		}
	}

	const images = checkImages(scanned);
	for (const [ref, where] of images.misses) { misses.set(ref, where); }

	if (misses.size > 0) {
		console.error(`[check-docs] ${misses.size} path(s) cited but not found:\n`);
		for (const [ref, where] of [...misses].sort()) {
			console.error(`  ${ref}`);
			console.error(`      cited in: ${[...where].sort().join(', ')}`);
		}
		console.error('\nUpdate the citation, or restore the file.');
		process.exit(1);
	}

	const shipped = checkPunctuation();

	console.log(
		`[check-docs] ${checked} path citation(s) and ${images.checked} image(s) `
		+ `across ${scanned.length} file(s): all resolve; `
		+ `${shipped} shipped file(s) carry no dash and no typographic quote`,
	);
}

check();
