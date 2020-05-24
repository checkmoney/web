#!/bin/bash

bash /etc/nginx/generate_env.sh

nginx -g "daemon off;"
