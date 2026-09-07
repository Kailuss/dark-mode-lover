# Changelog

All notable changes to Dark Mode Lover.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project follows [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
Odd minor versions (0.9, 1.1, …) ship on the marketplace's **pre-release**
channel; even ones are stable releases.

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
