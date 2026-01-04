# 🎸 Guitar Songs App

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.4.

A personal web application to store, read and play guitar songs with chords.  
Designed to be **simple, readable and usable while playing**, both on desktop and mobile.

The app supports:
- Lyrics with chords displayed **above the text** (Ultimate Guitar–style)
- Chord transposition
- Auto-scroll (useful while playing)
- Dark / Light mode
- Mobile-friendly layout
- Converting raw chord sheets into structured JSON

---

## 🧠 Motivation

This project was created as a **learning project with Angular**, but also as a **real tool** to use while practicing guitar.  
The goal is to progressively add features while keeping the app lightweight and easy to use.

---

## 🛠️ Tech Stack

- **Angular** (standalone components)
- TypeScript
- HTML / CSS
- GitHub Pages for deployment

No backend required — everything runs on the client.

---

## 🧪 Development

### Develop locally

Upload changes to git
```bash
git add .
git commit -m "mensaje"
git push
```

### Run locally

```bash
ng serve
```
Then open: http://localhost:4200

---

## 🚀 Deployment (GitHub Pages)

This projectis doployed **GitHub Pages** using `angular-cli-ghpages`.

### 🔧 Requirements
- Node.js
- Angular CLI

### 🧪 Upload Deployment
```bash
ng build --configuration production --base-href /guitar-songs-app/
npx angular-cli-ghpages --dir=dist/guitar-songs/browser
```
The app will be available in https://YOUR_USER.github.io/guitar-songs-app/
