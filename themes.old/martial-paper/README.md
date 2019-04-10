martial paper
===============================

A minimalist, smart, paper theme.

The theme was inspired by the right-angle and the default colours by Starry Night Over the Rhone.

~~A live site using this theme: [socratic.space](http://socratic.space)~~  Nope, it's totally gone.  All that you have to go on is a single screenshot and a sense of adventure.  Plunge forth, valiant one!

## Screenshot

![MP screenshot](https://raw.githubusercontent.com/pedrodude/martial-paper/master/images/screenshot.png "MP screenshot")

## Installation

Generic installation instructions are [here](https://gohugo.io/themes/installing/)

## Setup

### Site configuration

Change the bits of the following config.toml file that start with TK (and get rid of the TK)

---
```toml
#Adjust all settings that start with TK to customise this theme to your site.  Also remove the TK
theme = "martial-paper"
baseurl = "TK http://mysite.com"
languageCode = "en-us"
title = "TK MY SITE'S TITLE"

[params]
  aboutpage = "TK name-of-the-about-post" #This makes the "about" link in the header function.  It must be the exact filename of your about page without the file extension.  E.g. if your about page is called "mysiteabout.md" then enter in "mysiteabout"
  author = "TK Your Name" #Goes in the meta info of your webpage to help identify you as the author of the content
  copyrightstatement = "TK A copyright statement of your choosing." #Will appear in the footer of each page.
  description = "TK A description that will appear in the html meta" #Goes in the meta info of your webpage to describe the content of your site
  siteclass = "TK MY SITE'S SUBTITLE" #Optional.  If you set it, it will display a subtitle in a contrasting color (adjustable within the CSS) on the site's index page.
  tagline = "TK My site's witty tagline" #Optional.  If you set it, it will display a tagline for the website underneath the titles.  By default it appears italicized.
```
---

### Indexintro.md

To add in some introductory spiel to the index page, create a markdown document in your content folder with the following in your toml frontmatter:
```toml
timeless = "indexintro"
title = "indexintro"
```
To keep things simple there's no repositioning of the page index; so perhaps keep this bit short so as not to push the index too far down the page.

### CSS

The CSS is adapted from [HTML5 Boilerplate](https://html5boilerplate.com/).  The theme mainly makes use of flexbox for positioning, with some color tweaks.  In terms of font choice: geometric sans-serifs, monospace, and perhaps even slab serifs all seem to work fine.

### Individual page configuration

Page configuration is largely unchanged from the default but there are some additional bits in the archetype (the template that defines default page settings) which enable additional features.  It's explained in the comments in the template for your page frontmatter below.

---
```toml
+++
streamtitle="" #Optional.  If you set it, it will display a subtitle in a contrasting color (adjustable within the CSS) on the individual page.
timeless = "false" #Optional.  If you set it, it will determine whether the post displays date features (displaying a date on the post summary on the index page, date in the page title).  Changing the value to true suppresses all of these features, with the exception of the last modified date shown by the pedrolastmod parameter
suppress = "false"  If set to true, the page will be suppressed from display on the index page
draft=true
martialpaperlastmod="YYYYMMDD" #Optional.  If you set it, it will display a Last Modified Date under the footer.  This is not automated at all, nor formatted, but simply provides a basic ability to indicate that the creation date differs from the modified date.  If left unchanged, it will display the created date.
+++

LOREM IPSUM PAGE CONTENT GOES HERE
```
---

## Dependencies (and acknowledgements)

### HTML5 Boilerplate [and Normalize.css]

An excellent starting point.  Actually the minified version of Normalize.css; apparently we are preferring robots to humans now... 

### Hugo

Very easy.  Everyone should learn HTML, CSS, and then this.

### Google Fonts

The default configuration uses a rather nice geometric sans-serif font called [Montserrat](https://www.google.com/fonts/specimen/Montserrat) hosted by Google Fonts.

---

And the name?  I had a moment where I thought it looked like official paper that you might find in a military office... [^1].  And yes I know that's rubbish, but I thought about it for like 2 seconds; give me a break.

[^1]: The red version did, and the red is in the CSS if you prefer.
