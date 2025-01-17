#### Timeline for Development progress:

- [x] Platform / Tooling
  - [x] Decide on Language
    - [x] electron
  - [x] Decide on basic user experience, (TUI vs. **GUI**)
  - [x] Decide on which tools / framework(s) to use, if any
    - [x] vite
    - [x] electron-forge
    - [x] electron
    - [x] react
    - [x] typescript
  - [x] Decide on storage / database options
    - [x] homebrew version of electron-store (SimpleElectronStore -> src/db/store.ts, for "local storage")
    - [x] prisma client with sqlite (for true database operations)
  - [x] Create a barebones executable

- [ ] Authentication
  - [x] Get user login / logout working
  - [x] add password check / hashing to login and user creation
  - [ ] add ability to select a role at user creation

- [ ] Home page
  - [ ] Get user role-specific homepages working
    - [ ] DM page
    - [ ] Player page

- [ ] Compendium page
  - [ ] basic compendium page (compendium v1)
    - [x] all spells list working
    - [x] favorites list
      - [x] add spell to favorites
      - [x] remove spell from favorites
    - [x] spell search form
      - [x] spell search working
      - [x] add search query "chips" next to filter button when filtering on search
        - [x] auto refresh to full list when removing query chip
      - [x] search on hitting enter
      - [x] add filtering by component
    - [x] recently viewed list
    - [x] get spell import working
      - [x] get spell components working
  - [ ] compendium v2
    - [ ] persist user favorites to db
    - [ ] recently searched keyword list
    - [ ] multiple search chips / more complex searching

- [ ] Spell creation
  - [x] basic spell creation (add spells form)
  - [ ] persist user spells to db
  - [ ] get custom spell component creation working

- [ ] Character page
  - [ ] DnDBeyond character sheet import?

- [ ] Spell casting
  - [ ] get dice rolling working

---

Currently known bugs:
- [ ] and / or logic not correct when searching on compendium
- [ ] can't filter by nested component values (e.g. damage -> element -> fire)
