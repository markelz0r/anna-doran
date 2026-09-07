# Archive

Code and content for things removed from the live site but kept so they can be
restored without rebuilding them from scratch.

## meal-balance-check

Archived 7 September 2026. The Meal Balance Check service (£39) was withdrawn
from the website.

**Still in place (nothing to rebuild):**
- `archive/meal-balance-check/page.tsx` — the full service page
- `mealBalanceCheck` namespace in `src/i18n/messages/{en,ru}.json` — all page copy
- `servicesV2.mealBalanceCheck.*` — the homepage service card copy
- `form.serviceMealCheck` — the contact form dropdown label
- `terms.term3` — the delivery-timescale clause
- `meal-balance-check` option in `src/collections/ContactSubmissions.ts`, kept so
  historical enquiries still display their service correctly in the admin

**To restore:**
1. Move `page.tsx` back to `src/app/(frontend)/[locale]/services/meal-balance-check/`
2. Add `'mealBalanceCheck'` back to `SERVICE_KEYS` in `src/components/sections/ServicesV2.tsx`
   and set the grid back to `lg:grid-cols-4`
3. Re-add the option in `src/components/sections/Contact.tsx`
4. Re-add the entries in `src/app/(frontend)/[locale]/links/page.tsx` (EN and RU)
5. Add `'3'` back to `TERM_KEYS` in `src/app/(frontend)/[locale]/terms/page.tsx`
   and restore the Meal Balance Check sentence in `terms.term8`
6. Remove the redirect in `next.config.mjs`
7. Reactivate the Stripe payment link
