# Domicilio Boilerplate

[![Netlify Status](https://api.netlify.com/api/v1/badges/88cfd08b-053f-4d39-8fdd-2a3b85e0f45d/deploy-status)](https://app.netlify.com/sites/monzadomicilio/deploys)

> If you want to make the same proj for your city, the only thing I ask is to fork the [main repo](https://github.com/tomma5o/ferraraDomicilio) to make it yours.
> Thanks!

## How to

1. Change the specific label related to me and my city are inside the `.env` file, if you change that the js will be clean ;)
2. Change the city in the `template.html` file
3. Change the **name** and **short_name** inside `manifest.json`
4. Change the **name** inside `package.json`

## Data source

All the data are fetched from this gist:
https://gist.githubusercontent.com/edoguido/1042da443dd8cad2cc1c3643726f27df/raw/MonzaDomicilio.json

When you add your gist url remember to delete the last hash because points directly to a specific commit, otherwise you would get an outdated version, so for example:

```
remove the second hash ------------------------------------┐

https://gist.githubusercontent.com/edoguido/<hash>/raw/<removeThisHash>/MonzaDomicilio.json
```

## Netlify deploy & configuration

> The site is developed with some specific https://netlify.com APIs.

### Deploy configuration steps

1. Connect your GitHub account to Netlify
2. Select the project
3. In Settings → Build & Deploy → Set **Build command** to : **_npm run build_**
4. In Settings → Build & Deploy → Set **Publish directory** to : **_build_**

### Google analytics setup

In **Settings** → Build & Deploy → Post processing → Snippet injection: you can add here your GAnalytics snippet

### Contact Form

In **Form** you can find all the submissions.<br>There are two type of submission: **Verified Submission** and **Spam Submission** sometimes they end up in spam

## CLI Commands

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# test the production build locally
npm run serve
```
