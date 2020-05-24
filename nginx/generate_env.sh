#!/bin/bash
filename='/etc/nginx/env.dict'

# start of JS string
config_str="window._env_ = { "

# append curernt variables to JS string
while read line; do
variable_str="${line}: \"${!line}\""
config_str="${config_str}${variable_str}, "
done < $filename

# end of JS string
config_str="${config_str} };"

# remove trailing comma (support introduced only in ECMAScript 5)
config_str="${config_str%,*} ${config_str##*,}"

# put JS string to JS file
echo "Creating config-file with content: \"${config_str}\""
echo "${config_str}" >> /usr/share/nginx/html/config.env.js

