# FoundForYou - AI-Powered Personalized Products E-commerce

Una piattaforma e-commerce moderna per la vendita di prodotti personalizzati con assistenza AI. Realizzato con Next.js 16, React 19, Firebase e Tailwind CSS.

> 🔒 **Nota sulla Sicurezza**: Questa è una repository pubblica. Non commitare le tue credenziali API qui! Usa `.env.local` (nel .gitignore).

## 📋 Requisiti

- **Node.js** 18.0 o superiore
- **npm** 9.0 o superiore
- Un account **Firebase** (gratuito su [firebase.google.com](https://firebase.google.com))
- API keys per servizi opzionali (aggiungi quando necessario)

## 🚀 Installazione Locale

### 1️⃣ Clonare il Repository

```bash
git clone https://github.com/Peuderoy88/foundforyou.git
cd foundforyou
```

### 2️⃣ Installare Dipendenze

```bash
npm install
```

Questo installerà:
- Next.js 16.2.2
- React 19.2.4
- Firebase 12.11.0
- Tailwind CSS 4
- Anthropic SDK (Claude API)
- E altro...

### 3️⃣ Configurare Variabili d'Ambiente

```bash
# Copia il template
cp .env.local.example .env.local
```

Apri `.env.local` e inserisci le tue credenziali Firebase (vedi la guida sotto).

### 4️⃣ Avviare il Dev Server

```bash
npm run dev
```

Il server avvierà a: **http://localhost:3000** 🎉

## 🔥 Setup Firebase (Passo Importante!)

### Creare un Progetto Firebase

1. Vai a [Firebase Console](https://console.firebase.google.com/)
2. Clicca **"Crea Progetto"**
3. Nome: `FoundForYou`
4. Disabilita Google Analytics (opzionale per dev)
5. Clicca **"Crea"**

### Ottenere le Credenziali

1. Nel progetto Firebase, clicca sull'icona **⚙️ Impostazioni** (in alto a sinistra)
2. Vai al tab **"Il mio progetto"**
3. Scorri fino a **"App Web"** e clicca **"</>"**
4. Copia la configurazione:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSy...",           // → NEXT_PUBLIC_FIREBASE_API_KEY
  authDomain: "project.firebaseapp.com",
  projectId: "project-id",       // → NEXT_PUBLIC_FIREBASE_PROJECT_ID
  storageBucket: "project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc..."
};
```

5. Incolla i valori nel `.env.local`

### Configurare Firestore Database

1. Nel menu Firebase, clicca **"Firestore Database"**
2. Clicca **"Crea database"**
3. Seleziona **"Modalità test"** (per sviluppo locale)
4. Location: **"eur3"** (Europa)
5. Clicca **"Abilita"**

### Configurare Authentication

1. Nel menu, vai a **"Autenticazione"**
2. Tab **"Provider di accesso"**
3. Abilita:
   - ✅ **Email/Password**
   - ✅ **Google** (opzionale)

## 📁 Struttura del Progetto

```
/foundforyou
├── /app                     # Pagine e API routes
│   ├── /admin              # Dashboard admin
│   ├── /api                # Backend endpoints
│   ├── /support            # Chat servizio clienti
│   ├── /auth               # Auth pages
│   ├── /shop, /create, /gallery, /cart, /checkout
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Homepage
│
├── /components             # React components
│   ├── /layout             # Header, Footer, Providers
│   └── /support            # Chat widget
│
├── /src
│   ├── /context            # React Context
│   │   ├── AuthContext.tsx (Firebase Auth + Firestore)
│   │   └── CartContext.tsx (Cart + localStorage)
│   │
│   ├── /lib
│   │   ├── /services
│   │   │   ├── chatService.ts       # Claude AI chat
│   │   │   ├── firebaseService.ts   # Database operations
│   │   │   └── aiService.ts         # AI generazione
│   │   └── firebase.ts              # Firebase config
│   │
│   └── /components         # Additional components
│
├── /public                 # Static assets (images, icons)
├── .env.local.example      # Template variabili ambiente
├── tailwind.config.ts      # Tailwind configuration
├── tsconfig.json           # TypeScript config
└── package.json            # Dependencies
```

## 🎯 Features Principali

### ✅ Completate

- **Homepage** - Design moderno con tema spaziale
- **Shop** - Catalogo con filtri e ricerca
- **Dettaglio Prodotto** - Reviews, certificato, info creator
- **Creazione Prodotto** - Wizard AI in 5 step
- **Carrello** - Gestione con localStorage persistence
- **Checkout** - 3 step (shipping, payment, review)
- **Profilo** - Dashboard personale
- **Galleria Community** - Showcase prodotti
- **Admin Dashboard** - Stats, gestione prodotti/ordini/utenti/analytics/settings
- **AI Customer Service** - Chat intelligente con Claude
- **Auth** - Firebase authentication

## 🔐 Variabili d'Ambiente

### Obbligatorie (Firebase)

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:your_app_id
```

### Opzionali (Servizi AI)

```env
# Claude API - per AI chat servizio clienti
NEXT_PUBLIC_ANTHROPIC_API_KEY=your_anthropic_key

# Replicate - per generazione immagini (non ancora implementato)
NEXT_PUBLIC_REPLICATE_API_TOKEN=your_replicate_token

# Stripe - per pagamenti (struttura presente, non ancora implementato)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
```

## 🛠️ Comandi Disponibili

```bash
npm run dev       # Start dev server (localhost:3000)
npm run build     # Build per produzione
npm start         # Run production server
npm run lint      # Esegui linting
```

## 🐛 Troubleshooting

### "Module not found" Error

```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Firebase Connection Error

1. ✅ Verifica che `.env.local` abbia TUTTE le variabili Firebase
2. ✅ Apri [Firebase Console](https://console.firebase.google.com/) e controlla il progetto
3. ✅ Assicurati che Firestore database sia **Abilitato**
4. ✅ Controlla che i Security Rules permettano lettura (Test Mode)

### Build Fallisce

```bash
rm -rf .next
npm run build
```

## 📖 Stack Tecnologico

| Layer | Tecnologia |
|-------|-----------|
| **Frontend** | Next.js 16.2.2, React 19.2.4, TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **Database** | Firebase Firestore |
| **Auth** | Firebase Authentication |
| **AI** | Claude 3.5 Sonnet (Anthropic) |
| **Components** | Lucide React Icons |
| **Build** | Webpack (Next.js) |

## 🚀 Deploy (Quando Pronto)

### Vercel (Consigliato)

```bash
# Installa Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### GitHub Pages (Static Export)

```bash
npm run build  # Genera cartella /out
# Poi deploya /out su GitHub Pages
```

## 📝 Note Importanti

⚠️ **Sicurezza:**
- Mai committare `.env.local` 
- Usa solo chiavi pubbliche con `NEXT_PUBLIC_` prefix
- Le chiavi Stripe SECRET devono restare server-side

🔄 **Development:**
- Hot reload automatico quando modifichi file
- Verifica i log in console (Ctrl+Shift+J)
- Usa DevTools di Next.js (localhost:3000/__nextjs/monorepo)

## ❓ Domande Frequenti

**D: Come aggiungere una nuova API route?**
A: Crea file in `/app/api/` seguendo pattern di Next.js

**D: Come usare la chat AI?**
A: Vai a http://localhost:3000/support o clicca il widget in basso a destra

**D: Come testare l'admin dashboard?**
A: Usa email con "admin" nel nome (es: admin@example.com) - in dev mode!

**D: Dove vedo i dati su Firestore?**
A: Firebase Console → Firestore Database → Visualizza i documenti

## 🤝 Contributing

1. Crea un branch `feature/something`
2. Fai commit con messaggi chiari
3. Push e apri una PR

## 📜 Licenza

Progetto privato. Non è autorizzato l'uso commerciale senza permesso.

---

**Buona codifica! 🚀**

Per problemi: Apri un issue o contatta il team.
