## Deploy guide (quick)

I added route middleware to require authentication for student/teacher pages and sensitive APIs. Next steps to get the site live and student-ready on Vercel:

1) Ensure your repo's homeschool-starter branch is up to date and contains the latest commits (it does).

2) Create a Vercel project
   - Sign in to Vercel and import the GitHub repo `platerrobin/schoolfromhome`.
   - When asked which branch to deploy, select `homeschool-starter` (or merge to `main` if you prefer to deploy main).

3) Add Environment Variables in Vercel (Project Settings → Environment Variables). Copy/paste exactly:
   - NEXTAUTH_SECRET = (generate with: `openssl rand -hex 32`)
   - SMTP_URL = (for example, SendGrid SMTP: `smtp://username:password@smtp.sendgrid.net:587`)
   - EMAIL_FROM = no-reply@yourdomain.example
   - TEMP_LOGIN_PASSWORD = (optional; only for testing, e.g., a strong temporary password)
   - OPENWEATHER_API_KEY = (if you want the weather dashboard working)
   - NEXT_PUBLIC_DEFAULT_UNITS = metric
   - DATABASE_URL = (if using a managed DB; default local SQLite is not for production)
   - REDIS_URL = (optional, for caching using Upstash or another provider)
   - AWS_S3_BUCKET, AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY (optional; for hosting books/audio)

4) Deploy
   - Click Deploy. Vercel will build and deploy the preview URL.
   - Visit the URL. When you try to access /reading, /attendance, or /dashboard you will be redirected to /auth/signin if not authenticated.

5) Test sign-in flows
   - Temp credentials: Use a seeded student email (e.g., jayce.plater@example.test) with the TEMP_LOGIN_PASSWORD you set to sign in immediately.
   - Email magic link: Configure SMTP_URL and NEXTAUTH_SECRET to enable email sign-ins.

6) Production checklist
   - Disable or remove CredentialsProvider from NextAuth before long-term production, or keep only for admin accounts.
   - Use a managed Postgres DB (Neon, Supabase) not SQLite. Update DATABASE_URL accordingly.
   - Replace in-memory cache with Redis (Upstash recommended for serverless). Set REDIS_URL in env.
   - Host books/audio on S3 and serve via signed URLs or a protected API endpoint.

If you want, I can open a Pull Request from homeschool-starter → main, or help you step-by-step while you deploy in the Vercel UI.
