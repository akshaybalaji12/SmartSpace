#!/bin/sh
cd controllers
touch visitors.controller.mjs
cd ../models
touch visitors.model.mjs
cd ../modules
touch visitors.module.mjs
cd ../routes
touch visitors.router.mjs
cd ../services
touch visitors.service.mjs

echo "Files created successfully!"