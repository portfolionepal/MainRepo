# DEPLOYMENT AUDIT — Kriti Print & Pack Frontend

**Audit Date:** 2026-10-01
**Auditor:** AI Deployment Engineer
**Project:** Kriti Print & Pack Industries — Frontend
**Framework:** Next.js 16.3.5 (App Router, Turbopack)
**Target:** Static export (`output: "export"`) deployed to cPanel shared hosting

---

## 1. Executive Summary

The frontend **cannot currently be built** with `output: "export"`. The build fails immediately because **6 admin dynamic routes** (e.g., `/admin/portfolio/[id]`) lack `generateStaticParams()`. Additionally, the **3 public dynamic routes** (`/products/[slug]`, `/services/[slug]`, `/portfolio/[slug]`) *do* have `generateStaticParams()` but they call the backend API at build time — if the backend is unreachable during build, they will return empty arrays and produce no detail pages.

Beyond the blocking build error, the project has several **architectural tensions** between the static-export model and the project's dynamic, CMS-driven nature:

| Concern | Severity | Summary |
|---------|----------|---------|
| 6 admin `[id]` routes missing `generateStaticParams()` | BLOCKER | Build fails immediately. |
| Public detail pages fetch at build time via server components | HIGH | New products/services/portfolio items added via admin won't appear until a full rebuild and redeploy. |
| `sitemap.ts` calls the API at build time | HIGH | Sitemap is frozen at build time; new pages won't appear in it. |
| `HomePage` is a server component calling `fetchAPI` | HIGH | Home page content (stats, featured products, services, portfolio, etc.) is baked in at build time. |
| `router.refresh()` in `AdminForm.tsx` is a no-op in static export | MEDIUM | After CRUD saves, the page won't revalidate server data (but since admin uses client-side fetching, impact is limited). |
| `notFound()` called in public detail pages | MEDIUM | Works only for slugs known at build time. Unknown slugs will 404 or show a blank page. |
| `cache: 'no-store'` in `fetchAPI` | LOW | Ignored during static export (irrelevant at build time). Not harmful. |
| `localhost` fallbacks in API_URL | LOW | All guarded by `process.env.NEXT_PUBLIC_API_URL`; safe if env var is set during build. |

**Bottom line:** The project can be made to build as a static export, but the *design* heavily depends on runtime data from the backend. A pure static export means the public site shows stale data until rebuilt and redeployed. The admin panel can work fine since it's entirely client-side rendered.

---

## 2. Verified Project Configuration

### next.config.ts
```typescript
output: "export"
images.unoptimized: true
images.dangerouslyAllowLocalIP: true
images.remotePatterns: [
  { protocol: "https", hostname: "**" },
  { protocol: "http", hostname: "localhost", port: "5000", pathname: "/uploads/**" }
]
```
- `output: "export"` is set correctly.
- `images.unoptimized: true` is correct (required for static export since `next/image` optimization needs a server).
- The `localhost:5000` remote pattern is a development artifact. Not harmful in production (it's additive), but should be cleaned up.
- `dangerouslyAllowLocalIP: true` is a development setting. Harmless in static export.

### package.json
- **Next.js:** 16.3.5
- **React:** 19.2.8
- **Key deps:** `framer-motion`, `lucide-react`, `react-hot-toast`, `clsx`, `tailwind-merge`, `dotenv`
- `react-hot-toast` **is installed** in `node_modules` (previously reported as missing — now resolved).
- `dotenv` is listed as a dependency but is unnecessary for a Next.js project (Next.js handles `.env` natively). Not harmful.
- **Build script:** `next build` — produces output in `out/` directory when `output: "export"` is set.

### .env
```
NEXT_LOCAL_API_URL=http://localhost:5000/api
NEXT_PUBLIC_API_URL=https://kritiprintpack.com/apiv3/api
```
- `NEXT_PUBLIC_API_URL` is set to the production URL.
- `NEXT_LOCAL_API_URL` is defined but **never referenced** anywhere in the codebase. Unused variable.
- No secrets found in `.env`. The file contains only API base URLs.

### tsconfig.json
- Standard Next.js TypeScript config with `@/*` path alias mapping to `./*`.

### postcss.config.mjs
- Uses `@tailwindcss/postcss` (Tailwind v4 setup).

---

## 3. Complete Route Inventory

### 3A. Static Public Pages (No Dynamic Segments)

| Route | File | Component Type | Data Source |
|-------|------|---------------|-------------|
| `/` | `app/page.tsx` | **Server** (async) | `fetchAPI('/stats')` at build time. Child components `FeaturedProducts`, `Services`, `Portfolio`, `WhyKriti`, `Industries` are all async server components calling `fetchAPI`. |
| `/about` | `app/about/page.tsx` | **Server** | Static content only. No API calls. |
| `/products` | `app/products/page.tsx` | **Client** (`"use client"`) | `fetchAPI('/products')` in `useEffect`. |
| `/services` | `app/services/page.tsx` | **Server** (async) | `fetchAPI('/services')` at build time. |
| `/portfolio` | `app/portfolio/page.tsx` | **Client** (`"use client"`) | `fetchAPI('/portfolio')` in `useEffect`. |
| `/industries` | `app/industries/page.tsx` | **Server** (async) | `fetchAPI('/industries')` at build time. |
| `/contact` | `app/contact/page.tsx` | **Client** (`"use client"`) | `fetchAPI` in `useEffect` for contact info. Form submission via client-side `fetch`. |
| `/request-quote` | `app/request-quote/page.tsx` | **Client** (`"use client"`) | `fetchAPI` in `useEffect`. Form submission via client-side `fetch`. |

**Static export impact:** Server components that call `fetchAPI` will have their data frozen at build time. Client components will fetch fresh data from the API at runtime in the browser — these work correctly with static export.

### 3B. Dynamic Public Pages (Slug-Based)

| Route | File | Dynamic Segment | `generateStaticParams()` | Component Type |
|-------|------|-----------------|--------------------------|----------------|
| `/products/[slug]` | `app/products/[slug]/page.tsx` | `[slug]` | YES — fetches `/products` | **Server** (async) |
| `/services/[slug]` | `app/services/[slug]/page.tsx` | `[slug]` | YES — fetches `/services` | **Server** (async) |
| `/portfolio/[slug]` | `app/portfolio/[slug]/page.tsx` | `[slug]` | YES — fetches `/portfolio` | **Server** (async) |

### 3C. Dynamic Admin Pages (ID-Based)

| Route | File | Dynamic Segment | `generateStaticParams()` | Component Type |
|-------|------|-----------------|--------------------------|----------------|
| `/admin/industries/[id]` | `app/admin/industries/[id]/page.tsx` | `[id]` | **MISSING** | Client (`"use client"`) |
| `/admin/products/[id]` | `app/admin/products/[id]/page.tsx` | `[id]` | **MISSING** | Client (`"use client"`) |
| `/admin/services/[id]` | `app/admin/services/[id]/page.tsx` | `[id]` | **MISSING** | Client (`"use client"`) |
| `/admin/portfolio/[id]` | `app/admin/portfolio/[id]/page.tsx` | `[id]` | **MISSING** | Client (`"use client"`) |
| `/admin/why-choose-us/[id]` | `app/admin/why-choose-us/[id]/page.tsx` | `[id]` | **MISSING** | Client (`"use client"`) |
| `/admin/stats/[id]` | `app/admin/stats/[id]/page.tsx` | `[id]` | **MISSING** | Client (`"use client"`) |

### 3D. Static Admin Pages (No Dynamic Segments)

| Route | File | Component Type |
|-------|------|---------------|
| `/admin` | `app/admin/page.tsx` | Client |
| `/admin/login` | `app/admin/login/page.tsx` | Client |
| `/admin/products` | `app/admin/products/page.tsx` | Client |
| `/admin/services` | `app/admin/services/page.tsx` | Client |
| `/admin/portfolio` | `app/admin/portfolio/page.tsx` | Client |
| `/admin/industries` | `app/admin/industries/page.tsx` | Client |
| `/admin/stats` | `app/admin/stats/page.tsx` | Client |
| `/admin/why-choose-us` | `app/admin/why-choose-us/page.tsx` | Client |
| `/admin/contact` | `app/admin/contact/page.tsx` | Client |
| `/admin/*/new` (6 pages) | `app/admin/*/new/page.tsx` | Client |

### 3E. Special Files

| File | Purpose | Static Export Compatible |
|------|---------|------------------------|
| `app/sitemap.ts` | Dynamic sitemap generation | Calls `fetchAPI` at build time — sitemap is frozen |
| `app/robots.ts` | Robots.txt generation | Yes — static content |
| `app/layout.tsx` | Root layout with fonts and metadata | Yes — server component, static metadata |
| `app/admin/layout.tsx` | Admin layout with auth and sidebar | Yes — client component |

---

## 4. Dynamic Route Compatibility Analysis

### 4A. Admin `[id]` Routes — THE BUILD BLOCKER

**Actual build error (verified):**
```
Error: Page "/admin/portfolio/[id]" is missing "generateStaticParams()"
so it cannot be used with "output: export" config.
```

The build fails on the **first** admin `[id]` route it encounters. Once fixed, it will fail on the next, and so on. **All 6 admin `[id]` routes have the same problem.**

**Root cause:** `output: "export"` requires all dynamic routes to have `generateStaticParams()`. These admin edit pages cannot know all possible IDs at build time because records are created dynamically through the admin panel.

**How these pages work:**
1. Each is a `"use client"` component.
2. Uses `use(params)` from React to unwrap the `Promise<{ id: string }>` params.
3. Passes the `id` to `AdminEditWrapper`, which fetches the record from the API **in the browser at runtime**.
4. All data fetching happens client-side. No server-side rendering.

**Why `generateStaticParams()` is impractical here:**
- Record IDs are database auto-incremented integers created at any time via the admin panel.
- Adding `generateStaticParams()` would require fetching all IDs at build time and pre-rendering a page for each one.
- Any record created after the build would have no matching pre-rendered page and would 404.
- This defeats the purpose of a dynamic admin panel.

**Recommended solutions (evaluated in Section 12):**

| Solution | Approach | Pros | Cons |
|----------|----------|------|------|
| **A. Query-parameter routes** | Replace `/admin/industries/[id]` with `/admin/industries/edit?id=123` | No dynamic segments. Fully static-export compatible. Works for arbitrary IDs. | Requires changing 6 route files plus 6 listing page `editHref` callbacks. Slightly less clean URLs (but these are admin-only). |
| **B. Empty `generateStaticParams()`** | Add `export function generateStaticParams() { return []; }` to all 6 pages | Minimal code change. | Untested with Next.js 16 — behavior of navigating to a non-pre-rendered dynamic path in static export is undefined. Likely results in 404 or blank page on direct navigation/refresh. |
| **C. Catch-all client route** | Use `app/admin/[...path]/page.tsx` with client-side routing | Single entry point for all admin editing. | Major refactor. Adds complexity. |

**Recommended: Solution A** — Query-parameter routes. It is the most reliable, requires the least structural change, and works deterministically with static export.

### 4B. Public `[slug]` Routes

These routes **do** have `generateStaticParams()`, so they will not cause build errors. However, they have a different problem:

**`generateStaticParams()` calls the backend API at build time:**
```typescript
export async function generateStaticParams() {
  const products: Product[] = (await fetchAPI('/products')) || [];
  return products.map((p) => ({ slug: p.slug }));
}
```

**Implications:**
1. Build succeeds if the API is reachable and returns data.
2. If the API is unreachable during build, `fetchAPI` returns `null`, the fallback `|| []` produces an empty array, and **zero product detail pages are generated**.
3. Products created **after** the build will have no pre-rendered pages. Navigating to `/products/new-product-slug` will 404.
4. `generateMetadata()` also fetches from the API at build time — metadata is frozen.

---

## 5. Public Product Detail Routing Analysis

### Current Implementation

**File:** `app/products/[slug]/page.tsx`

| Aspect | Implementation |
|--------|---------------|
| Component type | Async server component |
| Params access | `const { slug } = await params;` |
| Data fetch | `fetchAPI('/products/${slug}')` at build time |
| `generateStaticParams()` | Present — calls `fetchAPI('/products')` |
| `generateMetadata()` | Present — calls `fetchAPI('/products/${slug}')` |
| Not-found handling | `if (!product) notFound();` |
| Image rendering | `<Image src={getImageUrl(product.image)} />` via `next/image` |

### How Product Cards Link to Detail Pages

**File:** `components/products/ProductCard.tsx`
```tsx
<Link href={`/products/${product.slug}`}>View Details</Link>
```
- Links use the product's `slug` field from the API.
- This is correct and works with both static and dynamic approaches.

### Slug Generation
- Slugs are stored in the database and returned by the API.
- The frontend has a `slugify()` utility in `lib/utils.ts` but it is not used in the product detail page — slugs come from the backend.
- The admin create form includes a `slug` field that the admin sets manually.

### Assessment

| Question | Answer |
|----------|--------|
| Are product slugs known at build time? | Yes, if the API is reachable during build. |
| Can new products appear without rebuilding? | No — `generateStaticParams()` runs only at build time. |
| Is `generateStaticParams()` practical? | Yes, but with the caveat above. |
| Would a client-side approach be better? | Depends on requirements. If SEO matters, keep server-rendered. If immediate availability is critical, use client-side but sacrifice SEO. |

### Recommendation for Product Detail Pages

**Option 1 (Recommended if rebuild-on-change is acceptable):** Keep the current server-component approach with `generateStaticParams()`. Set up a simple rebuild trigger.

**Option 2 (If immediate availability is critical):** Convert to a `"use client"` page that reads the slug from the URL path (using `useParams()`) and fetches at runtime. This sacrifices SEO metadata and SSR.

---

## 6. Admin CRUD Routing Analysis

### How CRUD Works (Verified from Source Code)

| Operation | How It Works | Static Export Compatible? |
|-----------|-------------|--------------------------|
| **List** | `AdminCrudTable` (client component) fetches all records via `fetchAPI` in `useEffect`. | Yes — client-side fetch. |
| **Create** | `/admin/*/new` pages use `AdminForm` (client component). Form submits via `fetch()` to the API. | Yes. |
| **Edit (navigate)** | Listing page calls `editHref` to produce a `<Link>` to the dynamic route. | Requires the dynamic route to exist as a pre-rendered page. |
| **Edit (load data)** | `AdminEditWrapper` (client component) fetches **all records** from the collection endpoint, then `Array.find()` to match the `id`. | Yes — client-side, works at runtime. |
| **Edit (save)** | `AdminForm` sends PUT to `${API_URL}${apiEndpoint}/${initialData.id}` with auth token. | Yes — client-side, works at runtime. |
| **Delete** | `AdminCrudTable` sends DELETE with auth token. Removes from local state. | Yes — client-side, works at runtime. |
| **Post-save** | `router.push(redirectPath)` + `router.refresh()`. | `router.refresh()` is a no-op in static export. Harmless. |

### Key Finding: All Admin Data Operations Are Client-Side

The admin CRUD is **already compatible** with static export. The **only problem** is the routing mechanism for edit pages — the `[id]` dynamic segment.

---

## 7. Static Export Compatibility Audit

### Feature-by-Feature Analysis

| Feature | Used? | Location | Impact |
|---------|-------|----------|--------|
| **Server-side rendering (async server components)** | Yes | Home page, services, industries, all `[slug]` pages, home components | Data fetched at build time and baked into static HTML. |
| **Server Actions (`"use server"`)** | No | — | No issue. |
| **API Routes / Route Handlers** | No | — | No issue. |
| **Middleware** | No | No `middleware.ts` file. | No issue. |
| **Dynamic metadata (`generateMetadata`)** | Yes | All 3 public `[slug]` pages | Works at build time. Frozen per pre-rendered slug. |
| **Static metadata** | Yes | Root layout, home, about, services, industries | Fully compatible. |
| **`cookies()`** | No | — | No issue. |
| **`headers()`** | No | — | No issue. |
| **Runtime redirects/rewrites** | No | — | No issue. |
| **`next/image`** | Yes | ProductCard, product detail, Portfolio, Hero, contact | Compatible — `images.unoptimized: true` is set. |
| **`<img>` native** | Yes | PortfolioCard, portfolio detail | Compatible. |
| **`useSearchParams()`** | No | — | Will need `<Suspense>` boundary if introduced. |
| **Client-side navigation** | Yes | Throughout | Compatible. |
| **`router.refresh()`** | Yes | `AdminForm.tsx:252` | No-op in static export. Harmless. |
| **`notFound()`** | Yes | All 3 public `[slug]` pages | Only works for slugs known at build time. |
| **Authentication (localStorage)** | Yes | `app/admin/layout.tsx` | Compatible — purely client-side. |
| **`cache: 'no-store'`** | Yes | `lib/api.ts`, admin components | Ignored during static build. |
| **Google Fonts** | Yes | `app/layout.tsx` (Inter, Sora) | Compatible — fonts downloaded at build time. |
| **`sitemap.ts`** | Yes | `app/sitemap.ts` | Generated at build time but frozen. |
| **`robots.ts`** | Yes | `app/robots.ts` | Static content. |

---

## 8. API Integration Audit

### API URL Configuration

| Variable | Value | Used In |
|----------|-------|---------|
| `NEXT_PUBLIC_API_URL` | `https://kritiprintpack.com/apiv3/api` | Everywhere |
| Fallback | `http://localhost:5000/api` | All files that define `API_URL` |

**Files that reference API_URL:** `lib/api.ts`, `AdminCrudTable.tsx`, `AdminEditWrapper.tsx`, `AdminForm.tsx`, `app/admin/page.tsx`, `app/admin/contact/page.tsx`, `app/admin/login/page.tsx`, `PortfolioCard.tsx`, `app/portfolio/[slug]/page.tsx`

### Authentication Flow
1. Login: POST to `${API_URL}/auth/login` — receives JWT token.
2. Token stored in `localStorage`.
3. Protected requests include `Authorization: Bearer ${token}` header.
4. Auth check in admin layout: checks `localStorage` on mount; redirects to `/admin/login` if missing.

**Static export compatibility:** Fully client-side.

**Potential concerns:**
- Token expiry handling: Only `AdminForm.tsx` handles 401. Other components do not.
- No CORS concerns expected (same domain).

---

## 9. Image Upload and Rendering Audit

### Image URL Construction

**Central helper — `lib/api.ts`:**
```typescript
export const getImageUrl = (path: string) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  if (path.startsWith('/images/')) return path;
  const rootUrl = API_URL.replace('/api', '');
  return `${rootUrl}${path}`;
};
```

**Production resolution:** `/uploads/products/image.jpg` becomes `https://kritiprintpack.com/apiv3/uploads/products/image.jpg`

### Inconsistent Image URL Logic in Portfolio Components

`PortfolioCard.tsx` and `app/portfolio/[slug]/page.tsx` use inline image URL construction instead of `getImageUrl()`. This duplicates logic and uses different path handling. Should be refactored to use `getImageUrl()`.

### Production Image URL Chain
```
Database value: /uploads/products/image.jpg
getImageUrl():  https://kritiprintpack.com/apiv3/uploads/products/image.jpg
```

Confirm that `https://kritiprintpack.com/apiv3/uploads/...` resolves correctly — this cannot be verified from frontend code alone.

---

## 10. Environment and Dependency Audit

| Dependency | Version | Status |
|------------|---------|--------|
| `next` | 16.3.5 | Current |
| `react` / `react-dom` | 19.2.8 | Current |
| `react-hot-toast` | ^2.6.1 | Installed |
| `framer-motion` | ^13.4.0 | Installed |
| `lucide-react` | ^1.47.0 | Installed |
| `clsx` | ^2.1.1 | Installed |
| `tailwind-merge` | ^3.7.0 | Installed |
| `dotenv` | ^18.0.4 | Unnecessary but harmless |

**Missing:** No custom 404 page (`app/not-found.tsx`).

---

## 11. Build Errors and Verification Results

**Command executed:** `npx next build`
**Result:** Build failed (exit code 1)

```
Next.js 16.3.5 (Turbopack)
Compiled successfully in 4.0s
TypeScript completed in 3.7s
Collecting page data...

> Build error occurred
Error: Page "/admin/portfolio/[id]" is missing "generateStaticParams()"
so it cannot be used with "output: export" config.
```

**Analysis:**
1. TypeScript compilation passed — no type errors.
2. Module resolution passed — all imports resolve.
3. Build stops at first dynamic route without `generateStaticParams()`.
4. All 6 admin `[id]` routes have the same issue.

---

## 12. Deployment Architecture Comparison

### Option A: Static Export with Query-Parameter Admin Routes (RECOMMENDED)

Keep `output: "export"`. Convert admin `[id]` routes to query-parameter routes. Keep public `[slug]` routes with `generateStaticParams()`.

| Criterion | Assessment |
|-----------|-----------|
| cPanel compatibility | Perfect |
| Admin CRUD | Fully client-side, works with query-parameter routes |
| Product details | Pre-rendered at build time. New products require rebuild. |
| SEO | Good for pre-rendered pages |
| Maintenance | Simple — rebuild and re-upload |

### Option B: Static Export with ALL Client-Side Rendering

Convert all detail pages to client-side. Remove `generateStaticParams()`.

| Criterion | Assessment |
|-----------|-----------|
| New content | Immediately accessible |
| SEO | **Poor** — no pre-rendered metadata |
| Direct navigation | Requires SPA fallback config |

### Option C: generateStaticParams() for Admin Routes

| Criterion | Assessment |
|-----------|-----------|
| Feasibility | **Incompatible** with admin panel's purpose |

### Option D: Next.js Server (Node.js Runtime)

| Criterion | Assessment |
|-----------|-----------|
| cPanel support | **Unknown/Unlikely** for shared hosting |

---

## 13. Recommended Architecture and Reasons

**Option A — Static Export with Query-Parameter Admin Routes.** This is the most practical approach because:

1. cPanel is designed for static files.
2. Admin panel is already 100% client-side.
3. Public detail pages benefit from pre-rendering for SEO.
4. Content changes are infrequent for a packaging company.
5. Listing pages using client-side fetch already show fresh data.

---

## 14. Complete List of Files That May Need Changes

### MUST CHANGE (Build Blockers)

| # | File | Proposed Change |
|---|------|-----------------|
| 1 | `app/admin/industries/[id]/page.tsx` | Convert to `app/admin/industries/edit/page.tsx` using `useSearchParams()` |
| 2 | `app/admin/products/[id]/page.tsx` | Same conversion |
| 3 | `app/admin/services/[id]/page.tsx` | Same conversion |
| 4 | `app/admin/portfolio/[id]/page.tsx` | Same conversion |
| 5 | `app/admin/why-choose-us/[id]/page.tsx` | Same conversion |
| 6 | `app/admin/stats/[id]/page.tsx` | Same conversion |
| 7 | `app/admin/industries/page.tsx` | Change `editHref` to `/admin/industries/edit?id=${item.id}` |
| 8 | `app/admin/products/page.tsx` | Same change |
| 9 | `app/admin/services/page.tsx` | Same change |
| 10 | `app/admin/portfolio/page.tsx` | Same change |
| 11 | `app/admin/why-choose-us/page.tsx` | Same change |
| 12 | `app/admin/stats/page.tsx` | Same change |

### SHOULD CHANGE (Quality)

| # | File | Proposed Change |
|---|------|-----------------|
| 13 | `components/portfolio/PortfolioCard.tsx` | Use `getImageUrl()` instead of inline logic |
| 14 | `app/portfolio/[slug]/page.tsx` | Use `getImageUrl()` instead of inline logic |
| 15 | `next.config.ts` | Remove `localhost` pattern and `dangerouslyAllowLocalIP` |

### NICE TO HAVE

| # | File | Proposed Change |
|---|------|-----------------|
| 16 | `app/not-found.tsx` (new) | Create branded 404 page |
| 17 | `.env` | Remove unused `NEXT_LOCAL_API_URL` |
| 18 | `package.json` | Remove unused `dotenv` |
| 19 | `public/.htaccess` (new) | Create SPA fallback for cPanel |

---

## 15. Risks, Unknowns, and Items Requiring Confirmation

| # | Item | How to Verify |
|---|------|---------------|
| 1 | Backend API reachable from build machine | `curl https://kritiprintpack.com/apiv3/api/products` |
| 2 | Image URLs resolve in production | Open a known image URL in browser |
| 3 | cPanel supports `.htaccess` rewrites | Check Apache config |
| 4 | CORS configuration | Test API call from deployed site |
| 5 | Where to upload `out/` contents | Confirm `public_html/` target |
| 6 | Rebuild workflow for new content | Decide: manual, CI/CD, or script |
| 7 | cPanel Node.js capability (for future) | Check cPanel Node.js App feature |

---

## 16. Prioritized Implementation Plan

### Phase 1: Fix Build Blockers (Critical)
1. Create 6 new `edit/page.tsx` files with `useSearchParams()` + `<Suspense>`.
2. Update 6 listing pages' `editHref`.
3. Delete 6 old `[id]` directories.
4. Run `next build` and verify success.

### Phase 2: Verify and Clean Up (High)
5. Verify `generateStaticParams()` output.
6. Refactor portfolio image URLs.
7. Clean up `next.config.ts` and `.env`.

### Phase 3: Deployment Preparation (High)
8. Create `.htaccess` and `not-found.tsx`.
9. Full production build with API accessible.
10. Test `out/` directory locally.

### Phase 4: Deploy and Verify (High)
11. Upload to cPanel.
12. End-to-end verification.

---

## 17. Final Verification Checklist

- [ ] All 6 admin `[id]` routes converted to query-parameter routes.
- [ ] All 6 admin listing pages updated with new `editHref`.
- [ ] `next build` completes without errors.
- [ ] TypeScript compilation passes.
- [ ] Product/service/portfolio detail pages generated in `out/`.
- [ ] `sitemap.xml` and `robots.txt` generated.
- [ ] Admin login flow works.
- [ ] Admin CRUD operations work.
- [ ] Images load from correct production URLs.
- [ ] No `localhost` references in production bundles.
- [ ] Direct navigation to all pages works.
- [ ] Contact and quote forms submit successfully.
- [ ] 404 page displays for non-existent routes.

---

*This audit was generated by inspecting every file in the project source code. No source files were modified during the audit. A diagnostic build was executed to verify the actual build error.*
