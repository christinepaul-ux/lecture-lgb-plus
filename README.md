# LGB Primaire — Outils Google Apps Script

Outils scolaires 100% Google Apps Script pour le primaire de l'École internationale de Genève (LGB).

---

## Outil de lecture enregistrée

Enregistre la lecture orale d'un enfant, compare mot à mot avec le texte original, et génère un rapport avec toutes les erreurs surlignées.

### Fonctionnalités

- **Transcription automatique** via Web Speech API (FR / EN)
- **Détection des erreurs** : substitutions (mauvais mot lu) et omissions (mot sauté)
- **Texte annoté** : mots erronés surlignés en rouge, omissions en orange barré
- **Bibliothèque de textes** niveaux 1A → 3B (français et anglais)
- **Saisie libre** pour des textes personnalisés
- **Sauvegarde** dans Google Sheets (date, élève, langue, niveau, erreurs, précision)
- Fonctionne sur **ordinateur** (Chrome/Edge) et **iPad** (Safari iOS 14.5+)

### Déploiement

1. Créez un nouveau projet Google Apps Script sur [script.google.com](https://script.google.com)
2. Liez-le à un Google Spreadsheet (Éditeur > Ressources > Projet Google Apps Script associé)
3. Copiez `Code.gs` et `Index.html` dans le projet
4. Copiez le contenu de `appsscript.json` dans le manifest (Afficher > Manifest)
5. Déployez comme **Application Web** :
   - Exécuter en tant que : *Utilisateur accédant à l'application*
   - Accès : *Toute personne au sein de l'organisation*
6. Partagez l'URL avec les enseignants

### Compatibilité navigateur

| Navigateur | Transcription automatique |
|---|---|
| Chrome (desktop) | ✅ |
| Edge (desktop) | ✅ |
| Safari iOS 14.5+ (iPad) | ✅ |
| Firefox | ❌ (affiche un avertissement) |

---

## Structure du projet

```
Code.gs          — Backend Apps Script (web app + Google Sheets)
Index.html       — Interface utilisateur complète
appsscript.json  — Manifest du projet
```
