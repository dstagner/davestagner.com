#!/bin/sh

gulp build
cd exampleSite && {
	mkdir -p themes || exit 1
	ln -s ../.. themes/oldnew-mashup || exit 1
	sed -i -e '/BaseURL = '\''https:\/\/example.com'\''/d' config.toml
	hugo || exit 1
} || exit 1
