# Rusty theme

A theme for [Hugo](https://gohugo.io).

Sample site:

![theme screenshot](https://raw.githubusercontent.com/cecyc/hugo-theme-rusty/master/images/screenshot.png)

## Install

- [Install Hugo](https://gohugo.io/getting-started/quick-start/)
- Create or `cd` into your new site
- Run this command to add this theme to the correct directory:

```
git submodule add https://github.com/cecyc/hugo-theme-rusty.git themes/rusty
```

With your theme in `themes/rusty`, you should now modify your config file and add the following:

```
baseURL = "URL_OF_YOUR_SITE"
title = "TITLE_OF_YOUR_SITE"
theme = "Rusty"

[params] 
    twitter_username = "YOUR_TWITTER_USERNAME"
    github_username = "YOUR_GITHUB_USERNAME"
    description = "A DESCRIPTION OF YOUR SITE"
```
