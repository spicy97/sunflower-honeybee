# GitHub Pages Website — Requirements Document

> **Project:** 3-Day Surprise Party VBS Website
> **Date:** 2026-06-17
> **Author:** Christ Central Buffalo / Spicy97repo
> **Status:** Draft

---

## 1. Project Overview

| Field | Details |
|---|---|
| **Purpose** | Promote the church's 3-Day Surprise Party Vacation Bible School (VBS) event, allow families to save their spot, and introduce the church to prospective visitors |
| **Target audience** | Families with children ages **4–12**, parents looking for VBS programs, prospective church members in the local community |
| **Success criteria** | Families can easily find event details and register through the CCB website. Popup displays once per browser session. A dedicated VBS tab is accessible from the main navigation. |
| **Launch deadline** | Before 8/21/2026 (event starts August 21) — ideally 2–4 weeks prior for promotion |

---

## 2. Site Type & Repository

| Field | Details |
|---|---|
| **Site type** | ☑ Project site (`Spicy97repo.github.io/repo-name`) — hosted under Spicy97repo's GitHub account |
| **Repository name** | *e.g., `christ-central-vbs` or `vbs-2026` — to be confirmed* |
| **GitHub username/org** | `Spicy97repo` |
| **Repository visibility** | ☑ Public |
| **Published URL** | `https://vbs.christcentralbuffalo.com/` — subdomain CNAME pointing to `spicy97repo.github.io` |

---

## 3. Content & Structure

### Pages

| Page | URL Path | Description |
|---|---|---|
| Home | `/` | Main landing page with event hero banner, brief description, and call-to-action to register |
| VBS Event | `/vbs/` | Dedicated VBS tab — full event details, schedule, activities, cost, and registration |
| About / Our Church | `/about/` | Introduction to the church, values, and community for prospective families |
| Contact | `/contact/` | Contact information for questions about the event |
| 404 | `/404.html` | Custom error page (required) |

### Navigation Structure

```
[Header Nav]
├── Home
├── VBS Event          ← dedicated tab as requested
├── About Our Church
└── Contact

[Footer]
└── Christ Central Buffalo | jonathan.choi@christcentralbuffalo.com | 716-218-0777 | copyright
```

### Key Content Blocks (VBS Page)
The VBS event page must include:
- **Event name:** "3-Day Surprise Party VBS"
- **Tagline:** "Every day brings a new surprise, a new story, and a new reminder that God's love is for everyone."
- **Age range:** Children ages 4–12
- **Theme description:** Kids dive into the Bible, discover how Jesus welcomed all kinds of people, and learn God's love is freely given — not earned. Activities include games, crafts, music, snacks, and laughter.
- **Theme verse:** Luke 5:29 — *"Then Levi held a great banquet for Jesus at his house, and a large crowd of tax collectors and others were eating with them."*
- **Family angle:** Chance for families to meet the church, connect with other parents, and see what the church is about.
- **Schedule:**
  - Day 1 — Thursday, August 21: 9:00 AM – 3:00 PM (lunch and snacks provided)
  - Day 2 — Friday, August 22: 9:00 AM – 3:00 PM (lunch and snacks provided)
  - Day 3 — Sunday, August 23: 10:30 AM church service, followed by backyard party with food and bounce house for the entire family
- **Cost:** $5 per child
- **Call to action:** "Save your spot today!" / Registration button linking to registration form
- **Contact:** Jonathan Choi — jonathan.choi@christcentralbuffalo.com | 716-218-0777
- **Popup:** Modal/popup appearing **once per browser session** (using `sessionStorage`) promoting the VBS event with a "Register Now" call-to-action and dismiss button. Reappears on the next visit after the browser is closed.

### Content Ownership
| Field | Details |
|---|---|
| **Who provides content?** | Church staff / requester |
| **Update frequency** | Low — static event page; may need last-minute detail changes |
| **Content format** | ☑ Markdown |

---

## 4. Technology Stack

| Field | Details |
|---|---|
| **Static site generator** | ☑ Jekyll (GitHub built-in) |
| **Jekyll theme** | Recommended: `minima` as base, customized with the official VBS 6-color palette and CHALOPS font |
| **Required plugins** | `jekyll-seo-tag` (meta tags), `jekyll-sitemap` (sitemap) |
| **Unsupported plugins?** | ☑ No — standard supported plugins are sufficient |
| **JavaScript frameworks** | Vanilla JS for the popup modal (no framework needed) |
| **CSS approach** | ☑ Sass/SCSS — custom styles built on top of theme |

---

## 5. Design & Branding

| Field | Details |
|---|---|
| **Brand colors** | Six-color party palette from official VBS Style Guide:<br>• `#3387c8` — Blue (primary)<br>• `#fdd31b` — Yellow<br>• `#ec342a` — Red<br>• `#00b401` — Green<br>• `#dc39d3` — Pink/Magenta<br>• `#323095` — Dark Navy/Purple |
| **Typography** | **CHALOPS** — official VBS display/heading font (from Style Guide). Body text: standard readable sans-serif (e.g., system font stack or Google Font pairing TBD). |
| **Logo/favicon** | ☑ **Provided** — black circle with white lettermark badge centered inside (Christ Central Buffalo logo mark). The black circle with badge IS the logo.<br>• **Favicon:** Export as `favicon.ico` (16×16, 32×32) and `apple-touch-icon.png` (180×180) — the circular shape works perfectly as a favicon<br>• **Site header:** Display as circular logo mark alongside church name text<br>• **Formats needed:** PNG with transparent background (for flexible placement), ICO (for favicon)<br>• **⚠️ Action required:** Save the logo image file to `assets/images/logo.png` in the repository before build |
| **Theme verse** | Luke 5:29 — *"Then Levi held a great banquet for Jesus at his house, and a large crowd of tax collectors and others were eating with them."* |
| **Available brand assets** | Official VBS kit in `C:\Users\Elliot\OneDrive\Documents\GitHub\VBS Branding\`: Background Slides, Balloons graphics, Memory Verse art, Message Slides, Name Tags, Postcards, Posters and Banners, T-shirt Files, Editable EPS — extract relevant graphics from ZIPs for use on site |
| **Design reference** | Festive, welcoming, family-friendly. Official 6-color party palette. CHALOPS for headings. |
| **Responsive design** | ☑ Mobile-first — parents will likely view on phones. Breakpoints: 320px, 768px, 1024px |
| **Accessibility target** | ☑ WCAG 2.1 AA (minimum) — verify color contrast ratios for all 6 brand colors against backgrounds |

---

## 6. Deployment & CI/CD

| Field | Details |
|---|---|
| **Deployment method** | ☑ GitHub Actions (recommended) |
| **Publishing source** | ☑ `main` branch |
| **Workflow file** | `.github/workflows/pages.yml` |
| **Branch strategy** | ☑ Feature branches + PRs (recommended) |
| **Environment protection** | ☑ Enable `github-pages` deployment environment |

---

## 7. Domain & DNS

| Field | Details |
|---|---|
| **Domain type** | ☑ Custom subdomain — `vbs.christcentralbuffalo.com` (Option A chosen) |
| **Custom domain** | `vbs.christcentralbuffalo.com` — VBS site root at `https://vbs.christcentralbuffalo.com/` |
| **Apex domain redirect** | N/A — subdomain only; existing `christcentralbuffalo.com` Squarespace site is unaffected |
| **DNS provider** | ✅ **Squarespace** — nameservers confirmed as `ns01–ns04.squarespacedns.com` (verified via `nslookup`) |
| **⚠️ Important** | `christcentralbuffalo.com` is an **active Squarespace website**. Pointing the root domain to GitHub Pages would **replace** the existing Squarespace site. **Recommended approach:** use a subdomain — see DNS Strategy below. |
| **Domain verified?** | ☐ Not yet — must verify domain in GitHub account settings before adding to repo |
| **HTTPS enforcement** | ☑ Required (always enable in Settings > Pages > Enforce HTTPS) |

### DNS Strategy — Squarespace + GitHub Pages

Since `christcentralbuffalo.com` is an active Squarespace site, there are two options:

**Option A (Recommended): Subdomain — `vbs.christcentralbuffalo.com`**
- Add a `CNAME` record in Squarespace DNS: `vbs` → `spicy97repo.github.io`
- VBS site lives at `https://vbs.christcentralbuffalo.com/`
- Existing Squarespace site is **completely unaffected**
- Steps: Squarespace Dashboard → Domains → DNS Settings → Add Record (Type: CNAME, Host: `vbs`, Value: `spicy97repo.github.io`)

**Option B: Link from Squarespace to GitHub Pages URL**
- Keep the VBS site at the default GitHub Pages URL: `https://spicy97repo.github.io/<repo-name>/`
- Add a navigation link or button on the existing Squarespace site pointing to that URL
- No DNS changes required — simplest approach

> **Note on how to find any website's DNS provider:**
> Run `nslookup -type=NS yourdomain.com` in Command Prompt or Terminal. The nameserver names reveal the provider:
> - `squarespacedns.com` → Squarespace
> - `cloudflare.com` → Cloudflare
> - `godaddy.com` → GoDaddy
> - `namecheap.com` → Namecheap
> - `amazonaws.com` → AWS Route 53
> - `google.com` → Google Domains / Cloud DNS
> Alternatively, use [lookup.icann.org](https://lookup.icann.org) to check nameservers without a command line.

---

## 8. Registration

> **Chosen Solution: Google Forms** — free, zero setup, accessible from any Google account.

### Setup Instructions
1. Go to [forms.google.com](https://forms.google.com) and sign in with the church's Google account
2. Create a new form titled "3-Day Surprise Party VBS Registration — Christ Central Buffalo"
3. Add the required fields listed below
4. Under **Responses**, click the Google Sheets icon to auto-collect responses in a spreadsheet for tracking
5. Click **Send** → **Link** icon → copy the shareable form URL
6. Embed the link as a button on the VBS page and in the popup CTA
7. **$5 fee is collected at the door** (Google Forms does not process payments)

### Registration Form Fields (Required)
- Child's full name
- Child's age (dropdown: 4, 5, 6, 7, 8, 9, 10, 11, 12)
- Child's grade (dropdown: Pre-K, K, 1st–6th)
- Parent/guardian name
- Parent/guardian phone number
- Parent/guardian email address
- Emergency contact name and phone number
- Allergies or medical conditions (paragraph text — type "None" if none)
- T-shirt size (optional — dropdown: Youth S, M, L, XL)
- Days attending (checkboxes: Thu Aug 21 / Fri Aug 22 / Sun Aug 23 service + party)
- Acknowledgment: "I understand the cost is $5 per child, payable at the door." (checkbox — required)

---

## 9. SEO Requirements

| Field | Details |
|---|---|
| **Site title** | "3-Day Surprise Party VBS — Christ Central Buffalo" |
| **Site description** | "Join us for our 3-Day Surprise Party VBS August 21–23 at Christ Central Buffalo! Games, crafts, music, snacks, and Bible stories for kids ages 4–12. $5 per child. Lunch and snacks provided." |
| **SEO plugin** | ☑ `jekyll-seo-tag` |
| **Sitemap** | ☑ Required — `jekyll-sitemap` plugin |
| **Robots.txt** | ☑ Required — allow all crawlers |
| **Open Graph / social cards** | ☑ Required — families will share on Facebook, Instagram, etc. |
| **URL / permalink format** | `/:title/` |
| **Google Analytics / tracking** | ☑ **Recommended — Google Analytics 4 (GA4). Free. See details below.** |

---

## 9a. Google Analytics 4 — What It Provides & Cost

### Cost
**Google Analytics 4 (GA4) is completely free** for standard use. There is a paid enterprise tier called Google Analytics 360 (~$150,000/year) designed for massive corporations — it is not relevant here. For a church event website, GA4 is 100% free with no usage limits that would apply at this scale.

### What It Provides for This Site
Once a small tracking snippet is added to the site's HTML, Google Analytics automatically tracks:

| What You Can See | Why It's Useful |
|---|---|
| **Total visitors & page views** | Know how many families found the site |
| **Which pages were viewed** | See if families visited the VBS page vs. just the homepage |
| **Where visitors came from** | Know if traffic came from Facebook, Instagram, Google search, a direct link in a text/email, or the church's existing website |
| **Registration button clicks** | Track how many people clicked "Register Now" (event tracking) |
| **Device type** | See if visitors used phones vs. computers (confirms mobile-first was right) |
| **Geographic location** | Confirm most visitors are in the Buffalo, NY area |
| **Time on page** | See if families are actually reading the VBS details |
| **Bounce rate** | See if people leave immediately or explore the site |
| **Real-time visitors** | Watch live traffic when you share the site on social media |
| **Peak traffic days/times** | See which day your Facebook post drove the most visitors |

### Setup (Takes ~10 Minutes)
1. Go to [analytics.google.com](https://analytics.google.com) and sign in with the church's Google account
2. Create a new GA4 property for `christcentralbuffalo.com`
3. Copy the **Measurement ID** (format: `G-XXXXXXXXXX`)
4. Add the GA4 tracking snippet to the site's `_layouts/default.html` before `</head>`
5. Verify data is flowing in the GA4 dashboard within 24–48 hours

### Recommendation
**Yes — add Google Analytics.** It is free, takes 10 minutes to set up, and gives the church valuable insight into whether the VBS promotion is working. Knowing that "80 families visited the site from Facebook" or "most visitors come on phones" helps improve outreach for future events at no cost.

---

## 10. Performance Requirements

| Field | Details |
|---|---|
| **Target Lighthouse score** | Performance: 90+/100 &nbsp;&nbsp; Accessibility: 95+/100 &nbsp;&nbsp; Best Practices: 90+/100 &nbsp;&nbsp; SEO: 95+/100 |
| **Target page load time** | < 3 seconds on mobile on 4G |
| **Image optimization** | ☑ Compress all images before committing &nbsp;&nbsp; ☑ Use WebP format |
| **Asset minification** | ☑ Minify CSS &nbsp;&nbsp; ☑ Minify JS |
| **Caching strategy** | GitHub Pages default caching — no special requirements |

---

## 11. Security & Compliance

| Field | Details |
|---|---|
| **HTTPS** | ☑ Enforced (required) |
| **Sensitive data policy** | No personal data collected or stored on the GitHub Pages site. Registration data is handled entirely by Google Forms — not stored in the repository. |
| **Secrets in CI/CD** | None anticipated |
| **Dependency updates** | ☑ Dependabot alerts enabled |
| **Content policy** | ☑ Church event, family-friendly, community-oriented. No prohibited content. |

---

## 12. GitHub Pages Hard Constraints

| Constraint | Limit | Status |
|---|---|---|
| Repository size | < 1 GB (recommended) | ☑ Well within limit |
| Published site size | < 1 GB (hard limit) | ☑ Well within limit |
| Monthly bandwidth | 100 GB soft limit | ☑ Acceptable for a local church event's traffic |
| Build timeout | 10 minutes max | ☑ Simple Jekyll build < 1 minute |
| Deployment type | Static files only | ☑ No server-side code required |

---

## 13. Maintenance & Ownership

| Field | Details |
|---|---|
| **Site owner** | Christ Central Buffalo — repository under `Spicy97repo` GitHub account |
| **Primary maintainer** | `Spicy97repo` |
| **Event contact** | Jonathan Choi — jonathan.choi@christcentralbuffalo.com \| 716-218-0777 |
| **Update process** | Feature branch → PR review → merge to main → auto-deploy via GitHub Actions |
| **Review cadence** | Monitor leading up to event (August 21–23); archive or repurpose after event |
| **Backup strategy** | Git history provides full version control |
| **Monitoring** | Check GitHub Actions build status after each update |

---

## 14. Out of Scope

- ☑ User authentication or login
- ☑ E-commerce or payment processing on the GitHub Pages site ($5 fee collected at the door)
- ☑ Server-side API endpoints
- ☑ Database integration
- ☑ Storing registration data in the repository

---

## 15. Open Questions

| # | Question | Status | Owner | Due Date |
|---|---|---|---|---|
| 1 | What is the church's name? | ✅ **Christ Central Buffalo** | — | Resolved |
| 2 | What is the GitHub username? | ✅ **`Spicy97repo`** | — | Resolved |
| 3 | Does the church have an existing website / custom domain? | ✅ **Yes — `https://christcentralbuffalo.com/`** | — | Resolved |
| 4 | What is the preferred URL? | ✅ **`https://vbs.christcentralbuffalo.com/`** (Option A — subdomain, chosen) | — | Resolved |
| 5 | What are the church's brand colors and fonts? | ✅ **VBS Style Guide — 6-color palette + CHALOPS font** | — | Resolved |
| 6 | Does the church have a logo/favicon file? | ✅ **Provided** — black circle with white lettermark badge. Save to `assets/images/logo.png`; generate `favicon.ico` and `apple-touch-icon.png` before build (see Section 5) | — | Resolved |
| 7 | What is the age range for children? | ✅ **Ages 4–12** | — | Resolved |
| 8 | How should families register? | ✅ **Through CCB website — see Section 8 for recommended solutions** | — | Resolved |
| 9 | Contact info for event questions? | ✅ **Jonathan Choi — jonathan.choi@christcentralbuffalo.com \| 716-218-0777** | — | Resolved |
| 10 | Who manages DNS for `christcentralbuffalo.com`? | ✅ **Squarespace** — DNS managed via Squarespace Dashboard → Domains (see Section 7 DNS Strategy) | — | Resolved |
| 11 | Does the church want Google Analytics or tracking? | ✅ **Yes — GA4 recommended and free (see Section 9a)** | — | Resolved |
| 12 | Any photos or graphics available? | ✅ **Yes — official VBS brand kit in `VBS Branding\` folder** | — | Resolved |
| 13 | Should the popup appear once per session or every page load? | ✅ **Once per browser session** (using `sessionStorage`) | — | Resolved |
| 14 | Registration platform preference? | ✅ **Google Forms chosen (see Section 8)** | — | Resolved |

---

## 16. Approvals

| Role | Name | Signature | Date |
|---|---|---|---|
| Requester | | | |
| Developer | | | |
| Reviewer | | | |

---


*This document was generated from the [GitHub Pages Website Requirements Template](./requirements-template.md) based on a project description provided by the event requester.*
