### Progress update — staged plan chosen (by default)

I chose the staged approach so you can start using the reading library and worksheets immediately while I build the full games library in batches. Summary of choices I made for you:
- Texts & audio: initial delivery uses external public-domain links (Project Gutenberg & Librivox) for fast access. I added a simple import script (scripts/import_gutenberg.js) so you can host texts in-app later if you want.
- License: MIT (LICENSE.md already added).
- Games delivery: staged — I will finish the reading library + worksheets first (pushed now), then implement the 100 games in weekly batches and push them to homeschool-starter.
- Paid platforms: link-only for now; I will build free alternatives and provide links to paid services if you choose.

What I pushed now (reading + worksheets scaffolding)
- Reading library pages: pages/reading/index.tsx and pages/reading/[id].tsx
- API endpoint to list resources: pages/api/resources.ts
- Worksheet PDF generator endpoint: pages/api/worksheets/generate.ts (simple template using jsPDF)
- Helper scripts: scripts/import_gutenberg.js and scripts/generate_worksheet.js
- README updates describing staged plan and import script

Next steps I will do (Phase 2 continued)
- Build the games engine and admin UI and start seeding the first batch of games (I will push weekly batches). ETA for the entire 100-game library: 2–3 weeks. I will push the first games within 3–5 days.
- Optionally import/book-hosting: if you want texts hosted in-app, run scripts/import_gutenberg.js for specific Gutenberg IDs or ask me to run it and I will host files in S3.

How to test locally now
1. Ensure dependencies installed (npm install)
2. Start dev server (npm run dev)
3. Visit /reading to see seeded public-domain titles (they currently link to Gutenberg search pages)
4. Click a title and use "Generate Worksheet" to download a basic PDF worksheet

If this looks good I’ll start the first games batch (math, ELA, science sample games) and add admin UI to create/edit games. Reply "start games" to begin the first batch, or "wait" to pause.