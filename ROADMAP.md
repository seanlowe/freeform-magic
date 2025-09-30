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
    - [x] sass
    - [x] typescript
  - [x] Decide on storage / database options
    - [x] homebrew version of electron-store (SimpleElectronStore -> src/db/store.ts, for "local storage")
    - [x] prisma client with sqlite (for true database operations)
  - [x] Create a barebones executable

- [ ] Authentication
  - [x] Get user login / logout working
  - [x] add password check / hashing to login and user creation
  - [ ] add ability to select a role at user creation
  - [ ] add a skip login feature for development
    - [x] add key to .env file
    - [x] import .env file into process.env in `main.ts`
      - [x] pass env keys to preload.ts as additional arguments (preload cannot access process.env on its own)
    - [ ] update `initialAuthState` in `auth.context.tsx` to check if SKIP_LOGIN is true
    - [ ] update `Auth.tsx` to auto log in if SKIP_LOGIN is true

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
    - [ ] spell search form (needs redone - see current work notes)
      - [ ] spell search working
      - [ ] add search query "chips" next to filter button when filtering on search
        - [ ] auto refresh to full list when removing query chip
      - [ ] search on hitting enter
      - [ ] add filtering by component
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


current work notes:
- redoing spell search form
  - figure out and/or logic with selbox2.tsx (component options)
  - add and/or logic to selectbox.tsx (component types)
  - [ ] add different forms for non-list components
    - [ ] duration
    - [x] level -> LevelSelector.tsx
    - [ ] range
    - [ ] difficultyclass
    - [x] query -> handled in searchform.tsx
  - touchspinner
    - [x] add less than / greater than
    - [x] add multi selection (only want levels 1 and 2)
    - [x] add and/or logic
  - [x] hitting enter on the query field resets other selected components
  - cannot remove the query chip near the banner by clicking the x
  - add search and back button functionality back
    - [x] back button
    - [ ] search button

ideas:
- break out spells into "user spells" and "api spells"
  - import updated spells from api
  - spells have an "updated at" field
  - add field "source" -> user or API
