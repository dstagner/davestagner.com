# Hugo OldNew Mashup

Version 0.6.0

[Hugo](https://gohugo.io) theme mixing old school design elements
with new-era CSS3, HTML5, etc. That is the look is a combination of
90's and postmodern.

/exampleSite contains some example content as per
"[Add a theme to hugoThemes list](https://github.com/gohugoio/hugoThemes#adding-a-theme-to-the-list)",
including this documentation page and a sample of how to use this theme.
The theme is in early release form in that while it is usable for
simple sites, there is quite a bit of  work to do before it's truly
ready for full scale launch.

## Even Lazier Blogger Menus and Navigation

This theme automatically creates the top nav bar based on the top level
sections and their sibling pages and sub-sections.  On each page we
generate buttons for linear traversal (Previous|Next) and Up.
Finally the right sidebar will contain a navigation menu for the
current section and one level of subsections.

The right sidebar can be suppressed on a per page basis, or globally.

## A note on navigation and display order

The linear travseral mentioned above uses Hugo's default Page ordering,
which means you can set the 'weight' metadata in the frontmatter of
pages that are not naturally in the order you wish (basic ordering
is by date).  Lower weight sorts earlier.

For top-level sections (subdirectories of `content`) are not
in the correct order, or you want to use a different name for the
section than subdir name, you need to create an _index.md in the
appropriate subdir (for example to rename `content/lorem1` as
`Lorem`, under `content/lorem1` add a content file `_index.md`
with front matter such as:

```yaml
---
date: 2018-05-20T01:21:20-04:00
title: "Lorem"
copyright: 2018 Daniel F. Dickinson and Expired
license: Expired&CC0-1.0
weight: 100
---
```

Note that the above information also applies to the automatically
created floating navbar.  Submenus are for sub-sections (that is,
nested sections aka `topsection1/subsection1/_index.md`).
**NB** for Hugo, subsections *must* have an _index.md.

## A note on licenses

This theme has an archetype and layouts that make it easy to indicate
the copyright and licensing for your pages.  In the frontmatter add
the license (or licenses, separated by &) in a license field.

E.g. for YAML:

```yaml
---
date: (some date)
title: An Essay
copyright: 2018 Joe Smith and 1818 John Smith (expired)
license: CC-BY-SA-4.0&Expired
---
```

Plaintext license files are store in the `assets/licenses` folder(s).
E.g. create 'assets/Expired' which contains the license:

```txt
Copyright expires after a certain number of years in each jurisdiction.
This work's copyright has expired in all known jurisdictions.
```

Likewise create a file assets/CC-BY-SA-4.0 with the
content of [CC-BY-SA-4.0 Plaintext](https://raw.githubusercontent.com/cshoredaniel/hugo-oldnew-mashup/master/assets/licenses/CC-BY-SA-4.0)

Then issue the command ``hugo new licenses/Expired.md`` and
``hugo new licenses/CC-BY-SA-4.0.md``.

(This presumes that the CC-BY-SA-4.0 license is being applied to the
overall page and look and Expired applies to the primary content).

You can mix and match licenses as you wish (in terms of the above scheme,
whether the licenses can actually work together is another story).

-------
This theme Copyright (C) 2018 Daniel F. Dickinson and released under the
Creative Commons BY (Attribution) 4.0 License.
See [CC-BY-4.0 Plaintext](https://github.com/cshoredaniel/hugo-oldnew-mashup/blob/master/assets/licenses/CC-BY-4.0)
for terms.
