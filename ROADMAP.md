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
    - [x] update `initialAuthState` in `auth.context.tsx` to check if SKIP_LOGIN is true
    - [x] update `Auth.tsx` to auto log in if SKIP_LOGIN is true
      - [x] fix infinite calls to doLogin in `Auth.tsx`
      - [x] put username/password in the env file
  - [ ] add password obfuscation on the client side

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

- [ ] Random Work:
  - [x] add keyboard shortcuts
    - [x] ctrl+shift+s   -> spell compendium
      - [x] ctrl+shift+f -> open spell search form
      - [x] ctrl+escape  -> close spell search form
    - [x] ctrl+shift+c   -> character compendium
    - [x] ctrl+shift+h   -> home page

---

current work notes:
- [ ] redo the spell search form
  - [ ] figure out and/or logic with selbox2.tsx (component options)
  - [ ] add and/or logic to selectbox.tsx (component types)
  - [ ] add different forms for non-list components
    - [ ] duration
    - [x] level -> LevelSelector.tsx
    - [ ] range
    - [ ] difficultyclass
    - [x] query -> handled in searchform.tsx
  - [ ] finish the "touchspinner" (level selector)
    - [x] add less than / greater than
    - [x] add multi selection (only want levels 1 and 2)
    - [x] add and/or logic
  - [/] hitting enter on the query field resets other selected components (fixed for most)
    - [ ] hitting enter on query field only resets the level selector for some reason
  - [ ] cannot remove the query chip near the banner by clicking the x
  - [ ] add search and back button functionality back
    - [x] back button
    - [ ] search button
  - [ ] hide "filter/search" button in banner when searching


ideas:
- break out spells into "user spells" and "api spells"
  - import updated spells from api
  - spells have an "updated at" field
  - add field "source" -> user or API
- add a visual indicator for when a spell is user created vs imported
