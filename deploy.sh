#!/bin/sh

hugo --theme=hugo-tranquilpeak-theme
#s3cmd sync --delete-removed --acl-public --reduced-redundancy --cf-invalidate public/ s3://davestagner.com/ --verbose

gsutil rsync -R public gs://davestagner.com
gsutil acl ch -r -u AllUsers:R gs://davestagner.com
