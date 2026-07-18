# 🌻🐝 Sunflower & Honeybee — GitHub Pages Site

A romantic, animated, bilingual (English + Korean) website asking "Sunflower" to be "Honeybee's" girlfriend.

## 🗂️ Site Structure

```
index.html              ← Landing: Bee wanders garden, finds his Sunflower
pages/
  chapter1.html         ← "How It Started" — day scene, characters meet
  chapter2.html         ← "What You Mean to Me" — floating reason cards
  chapter3.html         ← "One Wish Left..." → The Question
  response.html         ← Celebration! She said YES! 🎉
assets/
  css/styles.css        ← All global styles & animations
  js/main.js            ← Music, navigation, GSAP helpers, utilities
  js/particles.js       ← Canvas particle system (petals, hearts, confetti)
  svg/honeybee.svg      ← Animated honeybee character (#022658)
  svg/sunflower.svg     ← Animated sunflower character (#FFF778)
```

## 🚀 Deploy to GitHub Pages

1. **Create a new GitHub repo** (e.g. `sunflower-site` — can be private if you upgrade)
2. **Push this folder:**
   ```bash
   cd sunflower-site
   git init
   git add .
   git commit -m "🌻 Initial commit — For my Sunflower"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/sunflower-site.git
   git push -u origin main
   ```
3. **Enable GitHub Pages:**
   - Go to repo → Settings → Pages
   - Source: **Deploy from a branch** → `main` → `/ (root)`
   - Click Save
4. **Your site will be live at:** `https://YOUR_USERNAME.github.io/sunflower-site/`

> The `.nojekyll` file is already included to prevent Jekyll processing.

## 🎵 Music

"Sunflower" by Post Malone & Swae Lee plays via a hidden YouTube embed.
- Music starts when the user clicks "Begin our story"
- Toggle button (🎵) in the top-right corner on every page
- Loops continuously across all pages

## ✨ Features

- 🌻 **Animated SVG characters** — honeybee (navy) and sunflower (yellow)
- 🎬 **GSAP-powered animations** — bee wanders garden, visits nope flowers, finds sunflower
- 💛 **Bilingual text** — every line in English + Korean (한국어)
- ✨ **Canvas particle system** — floating petals, sparkles, hearts, confetti
- 🎵 **Background music** — "Sunflower" via YouTube embed
- 🎉 **Canvas-confetti** on the YES celebration page
- 🐝 **Easter egg** — click the bee 3x to make it dance
- 📱 **Mobile responsive** — works on phones!
- 🌙 **Click anywhere** for floating heart/emoji burst

## 🎨 Colors

| | Hex | Role |
|---|---|---|
| 🌻 Sunflower Yellow | `#FFF778` | Her color — text, accents, glows |
| 🐝 Honeybee Navy | `#022658` | His color — backgrounds, contrast |
| ✨ Gold | `#F5C518` | Buttons, highlights |
| 🌿 Cream | `#FFFEF0` | Light backgrounds |

## 💡 Customization Tips

- **Change the messages:** Edit the text directly in each `.html` file
- **Add your name:** Search for "honeybee" and replace with your name
- **Change music:** Update the `videoId` in `assets/js/main.js` (line ~18)
- **Add photos:** Drop images in `assets/images/` and add `<img>` tags
