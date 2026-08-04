# Fleet UI

A travel booking web app — search and browse stays, view listing details, and complete a booking through checkout.

Built with React 18 (Create React App), React Router, and Sass.

## Structure

- `src/pages/stays` — search, category, and product detail pages for stays
- `src/pages/Bookings`, `src/pages/YourTrips`, `src/pages/Wishlists` — user account pages
- `src/features/stays` — stay-specific components (catalog, filters, product description)
- `src/features/session`, `src/features/user` — auth/session state
- `src/components` — shared UI (header, footer, hosts section, travelers selector, etc.)

## Scripts

```
yarn install   # install dependencies
yarn start     # run the dev server at http://localhost:3000
yarn build     # production build
yarn test      # run tests
```
