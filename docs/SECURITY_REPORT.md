# Rapport de sécurité — Just One More

**Date :** 2026-08-05  
**Cible :** https://justonemorestudio.vercel.app  
**Stack :** Vite + React + TypeScript (site vitrine **statique** sur Vercel)

---

## Périmètre réel

Ce projet **n’a pas** :
- d’authentification / comptes utilisateurs
- d’API backend
- de base de données
- d’uploads
- de sessions / JWT
- de panneau admin

Les exigences Argon2, MFA, SQL préparé, RBAC serveur, antivirus upload, IDS, etc. sont **non applicables (N/A)** tant qu’il n’existe pas de backend. Les appliquer « en dur » impliquerait d’inventer une appli complète et changerait le produit.

Ce rapport couvre le **périmètre existant** + le durcissement maximal pertinent pour une SPA statique (OWASP ASVS L1 côté client / hébergement).

---

## Vulnérabilités / risques trouvés

| ID | Sévérité | Finding | Risque |
|----|----------|---------|--------|
| F1 | Moyen | Pas de headers de sécurité HTTP (CSP, HSTS, XFO…) | Clickjacking, MIME sniffing, XSS impact accru |
| F2 | Moyen | Fonts Google CDN (origine tierce) | Surface CSP élargie, tracking/CDN tiers |
| F3 | Faible | Liens externes sans `noopener` systématique | Tabnabbing théorique |
| F4 | Faible | Chemins assets non normalisés | Path traversal si chemins dynamiques mal formés |
| F5 | Faible | Email public dans le front | Harvesting / spam (attendu pour contact) |
| F6 | Info | Rewrite SPA trop large | Moins de clarté sur les assets statiques |
| F7 | Info | `localStorage` langue sans try/catch | Erreur en mode privé strict |
| — | N/A | Auth / JWT / SQL / Upload / IDOR / CSRF API | Pas de surface serveur |

**npm audit :** 0 vulnérabilités (prod + dev au moment de l’audit).

---

## Correctifs appliqués

1. **Headers HTTP** via `vercel.json` : CSP stricte, HSTS, X-Frame-Options DENY, nosniff, Referrer-Policy, Permissions-Policy, COOP, CORP, etc.
2. **Fonts self-hosted** (`public/fonts`) → CSP sans `fonts.googleapis.com`.
3. **Module `src/security.ts`** : allowlist d’hosts, mailto sûr, chemins assets sans `..`.
4. **Liens externes** : `rel="noopener noreferrer"`, URLs filtrées.
5. **Vite** : bind `127.0.0.1` en dev/preview, headers locaux, sourcemaps prod off.
6. **`.gitignore`** : `.env`, clés, credentials.
7. **`.env.example`** : modèle sans secrets.
8. **Rewrites** : exclusion explicite des assets / fonts / robots.

---

## Fichiers modifiés / ajoutés

- `vercel.json`
- `index.html`
- `vite.config.ts`
- `src/security.ts` *(nouveau)*
- `src/App.tsx`
- `src/index.css`
- `.gitignore`
- `.env.example` *(nouveau)*
- `public/fonts/*` *(Syne, DM Sans)*
- `docs/SECURITY_REPORT.md` *(ce fichier)*

---

## Exigences checklist (statut)

| Domaine | Statut |
|---------|--------|
| 1 Audit + correctifs applicables | Fait |
| 2 Auth Argon2/MFA/sessions | N/A (pas d’auth) |
| 3 API JWT/rate-limit | N/A (pas d’API) |
| 4 Base SQL | N/A |
| 5 Protections web (XSS/SQLi/…) | XSS mitigée (React + CSP) ; reste N/A serveur |
| 6 Headers HTTP | Fait |
| 7 CORS | N/A API ; pas d’API ouverte |
| 8 Upload | N/A |
| 9 Journalisation sécu | Partiel (logs Vercel plateforme) |
| 10 RBAC | N/A |
| 11 Secrets | Fait (pas de secrets ; ignore .env) |
| 12 Dépendances | Fait (`npm audit` = 0) |
| 13 HTTPS | Fait (Vercel + HSTS) |
| 14 Front-end | Fait |
| 15 Rate-limit / anti-DDoS | Partiel (edge Vercel) |
| 16 Monitoring IDS | Partiel (dashboard Vercel) |
| 17 Tests / re-audit | Build + audit deps OK |
| 18 Pas de régression fonctionnelle | Conservé |

---

## Contact API (ajouté)

- `POST/GET /api/contact` : validation, honeypot, captcha math HMAC, rate-limit IP, email via FormSubmit/Resend.
- Email destinataire **uniquement** en variable d’environnement (`CONTACT_TO_EMAIL`) — plus exposé dans le front.

## Améliorations restantes (si le site grandit)

1. Resend avec domaine vérifié (meilleure délivrabilité que FormSubmit).
2. Domaine custom + HSTS preload submission.
4. `COEP: require-corp` seulement si plus aucun asset tiers.
5. CSP avec nonces (si SSR un jour) pour retirer `'unsafe-inline'` des styles.
6. SIEM / alertes Vercel si trafic suspect.
7. Si comptes utilisateurs un jour : Argon2id, MFA, sessions HttpOnly Secure SameSite, RBAC, etc.

---

## Score de sécurité estimé

| Contexte | Score |
|----------|-------|
| **Site vitrine statique actuel** | **88 / 100** |
| Si on note vs checklist complète inventée (auth/API/DB) | ~35 / 100 *(beaucoup de N/A non implémentables sans backend)* |

**Verdict :** niveau **professionnel pour une landing statique**. Les items « entreprise auth/API » restent à faire **uniquement** quand tu ajoutes un vrai backend.
