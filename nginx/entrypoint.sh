#!/bin/bash


# This script can be used when you have webpack or parcel builds that 
# insert env variables at build time, usually as build args. 
# Just set the build args to an a unique string for replacement,
# and do it post build instead. Uncomment `echo` through `done` and modify
# to match your env variables
# --- Start Insert ENV to JS bundle ---
# echo "Inserting env variables"
# for file in ./dist/**/*.js
# do
#   echo "env sub for $file"
#   sed -i "s/REPLACE_MIXPANEL_TOKEN/${MIXPANEL_TOKEN}/g" $file
# done
# --- End Insert ENV to JS bundle ---

# And if you need env variables in Nginx, use this instead of `cp`
# --- Start Insert ENV to Nginx---
# echo "Injecting Nginx ENV Vars..."
# envsubst '${GRAPHQL_URL}' < nginx/nginx.conf.template > /etc/nginx/nginx.conf
# --- End Insert ENV to Nginx---
cp nginx/nginx.conf.template /etc/nginx/nginx.conf

echo "Using config:"
cat /etc/nginx/nginx.conf

echo "Starting nginx..."
nginx -c '/etc/nginx/nginx.conf' -g 'daemon off;'