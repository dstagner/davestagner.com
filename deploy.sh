#!/bin/sh

hugo --theme=hugo-tranquilpeak-theme
s3cmd sync --delete-removed --acl-public --reduced-redundancy --cf-invalidate public/ s3://davestagner.com/ --verbose
