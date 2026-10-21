# Changelog

All notable changes to Dark Mode Lover.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Odd minor versions (0.9, 1.1, …) ship on the marketplace's **pre-release**
channel; even ones are stable releases.

## [0.11.3] - 2026-10-21

### Changed

- Every variant is built from seven base colours: a bright accent, a muted accent, a button fill, its label, a button hover, and the badge with its label. Keys that did the same job in a variant now share one colour.
- The tab border, progress bar, panel title border, active links and active input options use the bright accent.
- The remote status item and the prominent extension button use the button fill and its label.
- Button hover is its own colour in each variant.
- The editor is the same in every variant: cursor and Ctrl links `#709bff`, type hints `#ffdb70`, parameter hints `#ffa947`, and blue peek and minimap highlights.
- **Lover**: bright accent `#4ba3fb`, muted `#226fd3`, button `#215497`, badge `#974021` with a light label.
- **Wasp**: bright accent `#fbc523`, muted `#a77511`, button `#fbcf4b` with a dark label, badge `#4b80fb`.
- **Fire**, **Sea** and **Salt** have a light button with a dark label; **Ruby**, **Leaf**, **Berry** and **Ash** a deep button with a white label.
- **Ruby** and **Berry** are less saturated (`#ec656d`, `#c582ef`), and every muted accent is darker.
- **Salt** is pure white and neutral grey.

## [0.11.2] - 2026-10-16

### Changed

- The button fills and the muted accent (inactive activity-bar icons, the title bar) of eight variants are lighter again, back to the lightness they had in 0.10.3 with their new hues: Wasp `#ffc572` and `#9d6622`, Ruby `#c4404d`, Leaf `#27865f` and `#348b72`, Berry `#8b46d0` and `#7946d2`, Sea `#55c8c6` and `#348991`, Salt `#bcbbcb` and `#888998`, Fire's muted tone `#b16d14`, Ash `#767586` and `#666776`. Every button label stays at 4.5:1 or more.
- Links use the bright accent instead of the button fill.

### Fixed

- **Ruby**'s active and inactive activity-bar icons were nearly the same red. The active one is `#ff4d60` and the inactive one a deeper `#b0223c`.

## [0.11.1] - 2026-10-16

### Changed

- **Fire** is a yellower, more saturated amber: the accent is `#ffaa22`, the button `#f5a020` and the muted tone `#a86400`. Its notification badge is fire red (`#d92b1a`).
- **Ruby** is a deep red instead of a coral pink: the accent is `#f03e52`, the button `#a01830` and the muted tone `#b81d38`.
- **Berry**'s notification badge is a clean yellow (`#ffd23c`).
- Every badge, button, menu selection, prominent extension button and remote status item now takes a light or dark label by measured contrast, and the label is opaque. All of them reach at least 4.5:1, which moved Lover's badge to `#c7502e`, Leaf's badge to `#a9754d` and Leaf's remote item to `#318642`.

### Fixed

- The buttons of **Wasp**, **Sea**, **Salt** and **Fire** were too dark for their dark label (4.5:1 at best). They are lighter again and reach about 8:1: Wasp `#dea042`, Sea `#48bcbb`, Salt `#acabbb`.

## [0.11.0] - 2026-10-16

### Changed

- **The workbench is now neutral grey.** Every background, border and translucent surface the nine variants share keeps its lightness and drops its violet tint: `editor.background` goes from `#1c1d26` to `#1e1e1e`, `sideBar.background` from `#16161d` to `#171717`, `tab.activeBackground` from `#242432` to `#262626`. The tint was faint enough to pass for grey, but it sat under every accent and pulled the warm ones (Wasp, Fire, Ruby) toward mud. On a neutral base each accent carries its own colour, which is the same choice VS Code's own Dark Modern makes.
- **Workbench text is brighter, all of it by the same step.** Every text colour gains the same lightness and takes the neutral hue of the backgrounds, so the hierarchy between them stays as it was. Secondary text, icons and inactive tabs go from `#707580` to `#8d8d8d` (3.9:1 to 5.4:1 on the sidebar), and the sidebar tree, section headers, breadcrumbs, menus, the status bar, CodeLens and placeholders follow.
- **Editor text** goes from `#969fa3` to `#b6b6b6` (6.2:1 to 8.2:1). The syntax colours are untouched.
- **Line numbers** use the darkest grey of the new scale, `#5f5f5f`, in place of the near-invisible `#363648`. The active line number is `#dadada`.
- **Each accent's darker tones now follow one rule instead of being picked by hand.** Button fills, menu selections and links reach 4.5:1 against their label in all nine variants, and the inactive activity-bar icons and the title bar sit at the same contrast on black in every variant. Going darker, each tone turns toward a deeper neighbouring hue and keeps its saturation, so it no longer fades to brown or grey: Ruby toward crimson, Leaf toward emerald, Sea toward petrol, Lover and Berry toward indigo, and Fire toward a lighter amber.
- **Lover**'s button and its inactive icons are no longer the same colour: the fill is `#2c5dc5` and the muted tone `#3f53c0`.
- New notification badges for five variants, each with dark text: **Berry** red (`#ee5060`), **Leaf** tree-bark brown (`#a8744c`), **Sea** light beach sand (`#ead5aa`), **Salt** sky blue (`#7cc6f0`) and **Ash** reddish orange (`#ec6a3e`).
- The marketplace banner follows the neutral base.

### Feedback

- This ships on the pre-release channel because it changes how every variant looks. If something reads worse for you (a background you miss, an accent that lost its character, text that is now too bright), open an issue at https://github.com/Kailuss/dark-mode-lover/issues. Opinions decide what goes into the next stable release.

## [0.10.3] - 2026-09-08
- Declared the six `charts.*` colors in every variant, taken from the theme's own terminal palette. They had never been set, so VS Code derived them from unrelated keys and `charts.orange` came out as the translucent mauve of the minimap find highlight. Extensions that color by category, such as Bays, now read the theme's own palette.

## [0.10.2] - 2026-09-07

### Changed

- The command center (the box in the middle of the title bar, its magnifier and its back and forward arrows) now carries the same muted accent as the rest of that bar, and brightens to the full accent on hover. It was the one thing up there still in the light neutral, so the title, the menu, the window controls and the layout icons read as one strip.

## [0.10.1] - 2026-09-07

### Fixed

- **Lover**'s menu bar and window title now use the same muted tone as its own inactive activity-bar icons (`#25b`), which is what the other eight variants already did. It was the one theme still a step brighter than its own sidebar.

## [0.10.0] - 2026-09-07

### Changed

- **This release is stable, and it carries 0.9.2 and 0.9.3 with it.** Both of those went out on the pre-release channel, so a stable install never saw them: the muted accent on the menu bar and window title, Wasp's neutral status bar and the reworked extension icon all arrive here.
- The marketplace page is rewritten: it opens with what the theme is for and the screenshot, each section leads with a sentence and then a list, and there is a section saying plainly what the family does not do.
- This changelog carries the Keep a Changelog category headings it had never had, and every entry is sorted into them.

## [0.9.3] - 2026-09-07

### Changed

- Reworked the extension icon: the flat charcoal tile becomes a warm to cool gradient, amber into deep blue, spanning the range the theme family now covers. The toggle gains a lighter rim.

## [0.9.2] - 2026-09-07

### Changed

- The menu bar and window title now use each theme's muted accent tone instead of the bright one, matching what Wasp already did. Focused and unfocused windows share it.
- **Wasp**'s status bar drops its amber tint for the same neutral white the other eight variants already used, so every theme reports the same way down there.

## [0.9.1] - 2026-07-04

### Added

- A ninth variant, **Ash**: a dimmer monochrome companion to Salt.

### Changed

- Muted the inactive activity-bar icons on every variant so they read clearly against the active ones (matching Wasp).
- Reworked accent contrast across the family: each theme now uses light or dark text on its accent based on the accent's brightness, so buttons, menus and selections stay readable. Badges switched to vivid complementary colors with legible foregrounds.
- Warmed **Ruby** toward a subtler rosy red and pushed **Sea** to a brighter Caribbean teal.
- The minimap scrollbar now uses a neutral gray instead of the accent color.

### Fixed

- Made non-active window titles legible again (opaque muted tone instead of a faint alpha) and fixed Lover's inactive title.

## [0.9.0] - 2026-07-03

### Added

- Six new dark accent variants, bringing the family to eight themes: **Ruby**, **Fire**, **Leaf**, **Berry**, **Sea** (teal), and **Salt** (monochrome).
- All variants share the same neutral workbench palette and the shared syntax layer, so they color code identically and differ only in their accent (and a complementary badge).

### Changed

- Refreshed the primary **Lover** UI with a warmer, calmer neutral gray palette (unified with Wasp) for a more cohesive workbench.
- The window title bar is now tinted with each theme's accent color.

## [0.8.35] - 2026-07-01

### Added

- Modern workbench colors (command center, sticky scroll, inlay hints, ghost text, folding controls, and more).
- `$schema` for editor validation.

### Changed

- Modularized the dark themes into a shared syntax layer (`dark-mode-syntax.json`) included by Lover and Wasp, following VS Code's Dark Modern pattern.
- Wasp now colors code identically to Lover, with its brackets, accent borders and shadows aligned to the primary theme (amber accent).

### Removed

- Invalid and deprecated color keys.

## [0.8.4] - 2026-02-15

### Added

- A new screenshot showcasing the latest version of the theme.

### Changed

- Updated the README with a new overview section and improved formatting.

### Fixed

- Minor typos, and the overall presentation of the README.

## [0.8.2] - 2026-02-14

### Added

- A new icon for the extension in the marketplace.

### Fixed

- Scrollbar colors not matching the theme.

## [0.8.1] - 2026-02-14

### Fixed

- Activity bar background color.

## [0.8.0] - 2026-02-14

### Added

- Support for new Visual Studio Code features and APIs.

### Changed

- Refined color palette for enhanced visual appeal and reduced eye strain.
- Renamed the extension to "DarkMode Lover" to better reflect its focus on dark themes.
- Enhanced language support for various programming languages.
- Semantic highlighting improvements for better code clarity.

### Fixed

- Minor bugs, and performance.

## [0.7.2] - 2026-02-13

### Added

- First public release of DarkMode Lover for Visual Studio Code.
- Dark theme inspired by One Dark and Monokai.
- Balanced contrast and broad language support.
