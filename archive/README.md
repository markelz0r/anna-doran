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

Removed from the code entirely (no historical enquiries used the service, so
nothing depended on it): the `meal-balance-check` option in
`src/collections/ContactSubmissions.ts` and its label in `SERVICE_LABELS` in
`src/app/(frontend)/[locale]/actions.ts`. If any production enquiry ever did use
this value, the value itself is still safe in MongoDB — it would simply display
blank in the admin until the option is restored.

**To restore:**
1. Move `page.tsx` back to `src/app/(frontend)/[locale]/services/meal-balance-check/`
2. Add `'mealBalanceCheck'` back to `SERVICE_KEYS` in `src/components/sections/ServicesV2.tsx`
   and set the grid back to `lg:grid-cols-4`
3. Re-add the option in `src/components/sections/Contact.tsx`, the select option in
   `src/collections/ContactSubmissions.ts`, and the `SERVICE_LABELS` entry in `actions.ts`
4. Re-add the entries in `src/app/(frontend)/[locale]/links/page.tsx` (EN and RU)
   and the footer link in `src/components/sections/Footer.tsx`
5. Add `'3'` back to `TERM_KEYS` in `src/app/(frontend)/[locale]/terms/page.tsx`
   and restore the Meal Balance Check sentence in `terms.term8`
6. Remove the redirect in `next.config.mjs`
7. Reactivate the Stripe payment link
