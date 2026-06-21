# Contributing to the Embershroud Wiki

Thanks for helping build the Embershroud wiki. Please read this before contributing.

## Two content layers

- **Reference layer (generated, do not edit):** Skill/Zone/Item/etc. pages are generated from the
  game's canonical data. The generated block is fenced like this:

  ```
  <!-- AUTO-GENERATED: DO NOT EDIT below this line ... -->
  ...stats...
  <!-- /AUTO-GENERATED -->
  ```

  Edits inside that block are overwritten on the next build (CI rejects manual edits there). To fix a
  stat, fix the game data, not the page.

- **Knowledge layer (write freely):** the `## Notes` section of any page and the `systems/` guides are
  human-authored and preserved across regeneration. This is where guides, strategy, and theorycraft go.

## Contribution lanes

| You are | How to contribute |
| --- | --- |
| Team | direct commits |
| Trusted technical contributor | GitHub pull request |
| Non-technical fan | post in the Discord guide forum; a maintainer curates it in |

Discord popularity alone does not make something canonical - a maintainer reviews and approves.

## Rules

- Use canonical Embershroud terminology (see the in-wiki glossary). Don't rename locked terms.
- No datamined or unreleased content. Only what's already public in the game.
- No exploit guides; no build claims without the patch/build they apply to.
- AI-assisted guides are allowed only if a human reviews them and they don't invent mechanics.
- Guides should carry a status: `Current for build X`, `Needs review`, or `Historical`.

## Licensing

See [LICENSE.md](./LICENSE.md). In short: human-written guides and notes are **CC BY-SA 4.0**;
auto-generated game-data pages, Embershroud names, and assets are © Iterative Studios. By
contributing you grant Iterative Studios a license to publish, edit, relicense, and migrate your
contribution (published under CC BY-SA 4.0 for human-written content).
