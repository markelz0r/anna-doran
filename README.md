# Anna Doran - Nutritionist Website

Bilingual (EN/RU) website for Anna Doran, a clinical nutritionist. Built with Next.js 15, Payload CMS v3, and MongoDB.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **CMS:** Payload CMS v3 (integrated into Next.js)
- **Database:** MongoDB 7
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **i18n:** next-intl (English & Russian, route-based: `/en`, `/ru`)
- **Deployment:** Docker Compose

## Getting Started

### Prerequisites

- Node.js 22+
- Docker & Docker Compose (for MongoDB, or use a local MongoDB instance)

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/markelz0r/anna-doran.git
   cd anna-doran
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start MongoDB:
   ```bash
   docker compose up mongo -d
   ```

4. Create a `.env` file:
   ```env
   DATABASE_URI=mongodb://127.0.0.1:27017/anna-doran
   PAYLOAD_SECRET=your-secret-key-here
   NEXT_PUBLIC_SERVER_URL=http://localhost:3000
   ```

5. Seed the database:
   ```bash
   npm run seed
   ```

6. Start the dev server:
   ```bash
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) for the site and [http://localhost:3000/admin](http://localhost:3000/admin) for the CMS.

   Default admin credentials after seeding: `admin@annadoranhealth.com` / `changeme123`

### Docker Development

```bash
docker compose up --build
```

This starts both the app (with hot reload) and MongoDB.

## Production Deployment

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

Make sure to set proper environment variables in `.env`:
- `PAYLOAD_SECRET` — a strong random secret
- `NEXT_PUBLIC_SERVER_URL` — your public URL

After first deploy, seed the database:
```bash
docker compose -f docker-compose.prod.yml exec app npx cross-env PAYLOAD_CONFIG_PATH=payload.config.ts tsx src/seed/index.ts
```

## Project Structure

```
src/
├── app/
│   ├── (frontend)/          # Public-facing site
│   │   └── [locale]/        # i18n route segment
│   │       ├── layout.tsx   # Root HTML layout
│   │       ├── page.tsx     # Homepage (fetches all CMS data)
│   │       └── actions.ts   # Contact form server action
│   └── (payload)/           # Payload CMS admin panel
├── collections/             # CMS collections (9 total)
├── globals/                 # CMS globals (4 total)
├── components/
│   ├── sections/            # Page sections (Hero, About, Services, etc.)
│   ├── shared/              # Reusable components
│   └── ui/                  # shadcn/ui primitives
├── i18n/                    # Internationalization config & messages
└── seed/                    # Database seed script
```

## CMS Collections

| Collection | Description |
|---|---|
| Users | Admin users |
| Media | Uploaded images/files |
| Testimonials | Client testimonials |
| Services | Service offerings with pricing |
| Problems | Problems addressed |
| Conditions | Conditions treated |
| Goals | Achievable goals |
| EducationTimeline | Education & qualifications |
| ContactSubmissions | Contact form entries |

## CMS Globals

| Global | Description |
|---|---|
| SiteSettings | Site name, social links, contact info |
| HeroContent | Hero section content |
| AboutContent | About section, mission, credentials |
| FooterContent | Footer text & links |
