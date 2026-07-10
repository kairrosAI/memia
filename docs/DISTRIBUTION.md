# MEMIA BPOS Distribution

Guide bilingue de publication GitHub, npm, Homebrew, archive ZIP et site public.

Bilingual guide for GitHub, npm, Homebrew, ZIP archive and public website distribution.

## FR - Vue d'ensemble

MEMIA BPOS peut être distribué par plusieurs canaux :

- GitHub pour les sources ;
- npm pour `npx @kairros/memia` ;
- ZIP pour une distribution autonome ;
- Homebrew pour macOS après publication npm ;
- `memia.ai` pour la présentation produit, la documentation publique et les liens d'installation.

Important : le site `memia.ai` ne doit pas servir le dépôt complet. Il doit servir uniquement le dossier statique `site/`.

## EN - Overview

MEMIA BPOS can be distributed through several channels:

- GitHub for sources;
- npm for `npx @kairros/memia`;
- ZIP for standalone distribution;
- Homebrew for macOS after npm publication;
- `memia.ai` for product positioning, public documentation and install links.

Important: the `memia.ai` website must not serve the full repository. It must serve only the static `site/` folder.

## FR - Réponse courte sur `npx`

Mettre le code sur GitHub ne suffit pas pour que :

```bash
npx @kairros/memia bootstrap ./MEMIA
```

fonctionne partout.

Cette commande dépend du registre npm. Il faut publier le package `@kairros/memia` sur npm.

GitHub = dépôt source.  
npm = registre utilisé par `npx`.  
Homebrew = canal d'installation macOS optionnel.  
ZIP = distribution autonome.  
memia.ai = site produit et documentation publique.

## EN - Short answer about `npx`

Putting the code on GitHub is not enough for:

```bash
npx @kairros/memia bootstrap ./MEMIA
```

to work everywhere.

That command depends on the npm registry. The package `@kairros/memia` must be published to npm.

GitHub = source repository.  
npm = registry used by `npx`.  
Homebrew = optional macOS install channel.  
ZIP = standalone distribution.  
memia.ai = product website and public documentation.

## FR - Publier sur GitHub

Créer le dépôt cible :

```text
https://github.com/kairros-ai/memia
```

Depuis le dossier produit :

```bash
git init
git add .
git commit -m "Release MEMIA BPOS 0.1.0"
git branch -M main
git remote add origin https://github.com/kairros-ai/memia.git
git push -u origin main
```

Avant publication, vérifier :

```bash
npm run audit:clean
npm run site:check
npm pack --dry-run
```

## EN - Publish to GitHub

Create the target repository:

```text
https://github.com/kairros-ai/memia
```

From the product folder:

```bash
git init
git add .
git commit -m "Release MEMIA BPOS 0.1.0"
git branch -M main
git remote add origin https://github.com/kairros-ai/memia.git
git push -u origin main
```

Before publication, verify:

```bash
npm run audit:clean
npm run site:check
npm pack --dry-run
```

## FR - Publier sur npm

Préparer :

```bash
npm install
npm run audit:clean
npm run site:check
npm pack --dry-run
```

Se connecter :

```bash
npm login
```

Publier :

```bash
npm publish --access public
```

Tester :

```bash
mkdir /tmp/memia-npx-test
cd /tmp/memia-npx-test
npx @kairros/memia bootstrap ./MEMIA --git --obsidian
cd MEMIA
memia status
```

## EN - Publish to npm

Prepare:

```bash
npm install
npm run audit:clean
npm run site:check
npm pack --dry-run
```

Log in:

```bash
npm login
```

Publish:

```bash
npm publish --access public
```

Test:

```bash
mkdir /tmp/memia-npx-test
cd /tmp/memia-npx-test
npx @kairros/memia bootstrap ./MEMIA --git --obsidian
cd MEMIA
memia status
```

## FR - Installer depuis GitHub sans npm

Avant publication npm :

```bash
npm install -g git+https://github.com/kairros-ai/memia.git
memia bootstrap ~/MEMIA --git --obsidian
```

Ou :

```bash
git clone https://github.com/kairros-ai/memia.git
cd memia
npm install
npm link
memia bootstrap ../MEMIA --git --obsidian
```

## EN - Install from GitHub without npm publication

Before npm publication:

```bash
npm install -g git+https://github.com/kairros-ai/memia.git
memia bootstrap ~/MEMIA --git --obsidian
```

Or:

```bash
git clone https://github.com/kairros-ai/memia.git
cd memia
npm install
npm link
memia bootstrap ../MEMIA --git --obsidian
```

## FR - Archive ZIP

Créer une archive avec une racine propre `memia/` :

```bash
zip -r memia-2026-07-07.zip memia \
  -x "*/node_modules/*" "*/.git/*" "*/.env.local" "*/.DS_Store"
```

L'archive doit conserver :

- `LICENSE` ;
- `LICENSE.md` ;
- `NOTICE` ;
- `CONTENT-LICENSE.md` ;
- `TRADEMARKS.md`.

Vérifier :

```bash
shasum -a 256 memia-2026-07-07.zip > memia-2026-07-07.zip.sha256
unzip -l memia-2026-07-07.zip | head
```

## EN - ZIP archive

Create an archive with a clean `memia/` root:

```bash
zip -r memia-2026-07-07.zip memia \
  -x "*/node_modules/*" "*/.git/*" "*/.env.local" "*/.DS_Store"
```

The archive must preserve:

- `LICENSE`;
- `LICENSE.md`;
- `NOTICE`;
- `CONTENT-LICENSE.md`;
- `TRADEMARKS.md`.

Verify:

```bash
shasum -a 256 memia-2026-07-07.zip > memia-2026-07-07.zip.sha256
unzip -l memia-2026-07-07.zip | head
```

## FR - Homebrew

Tap cible :

```text
kairros-ai/tap/memia
```

Formule indicative :

```ruby
class MemiaBpos < Formula
  desc "MEMIA BPOS - Business and Personal Operating System"
  homepage "https://github.com/kairros-ai/memia"
  url "https://registry.npmjs.org/@kairros/memia/-/memia-0.1.0.tgz"
  version "0.1.0"

  depends_on "node"

  def install
    system "npm", "install", *Language::Node.std_npm_install_args(libexec)
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    system "#{bin}/memia", "--help"
  end
end
```

Installation utilisateur :

```bash
brew tap kairros-ai/tap
brew install memia
memia bootstrap ~/MEMIA --git --obsidian
```

## EN - Homebrew

Target tap:

```text
kairros-ai/tap/memia
```

User install:

```bash
brew tap kairros-ai/tap
brew install memia
memia bootstrap ~/MEMIA --git --obsidian
```

## FR - Publier `memia.ai`

Le site public vit dans `site/`.

Prévisualiser :

```bash
npm run site:check
npm run site:preview
```

Configurer le VPS :

```bash
export MEMIA_VPS_HOST="user@your-vps"
export MEMIA_VPS_ROOT="/var/www/memia.ai"
site/deploy/deploy-vps.sh
```

Installer Nginx avec `site/deploy/nginx-memia.ai.conf`, puis Certbot :

```bash
sudo certbot --nginx -d memia.ai -d www.memia.ai
```

Tester :

```bash
curl -I https://memia.ai/
curl -I https://memia.ai/install/
curl -I https://memia.ai/security/
curl -I https://memia.ai/sitemap.xml
```

## EN - Publish `memia.ai`

The public website lives in `site/`.

Preview:

```bash
npm run site:check
npm run site:preview
```

Configure the VPS:

```bash
export MEMIA_VPS_HOST="user@your-vps"
export MEMIA_VPS_ROOT="/var/www/memia.ai"
site/deploy/deploy-vps.sh
```

Install Nginx with `site/deploy/nginx-memia.ai.conf`, then Certbot:

```bash
sudo certbot --nginx -d memia.ai -d www.memia.ai
```

Test:

```bash
curl -I https://memia.ai/
curl -I https://memia.ai/install/
curl -I https://memia.ai/security/
curl -I https://memia.ai/sitemap.xml
```

## FR - Checklist publication

- `npm run audit:clean` passe.
- `npm run site:check` passe.
- `npm pack --dry-run` contient les fichiers attendus.
- Aucun chemin local, secret ou cache n'est inclus.
- Les licences et marques sont présentes.
- Le site sert uniquement `site/`.
- Le rollback VPS est possible.

## EN - Publication checklist

- `npm run audit:clean` passes.
- `npm run site:check` passes.
- `npm pack --dry-run` includes expected files.
- No local path, secret or cache is included.
- Licenses and trademarks are present.
- The website serves only `site/`.
- VPS rollback is possible.
