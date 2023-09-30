#!/bin/sh
cd controllers
touch metadata.controller.mjs
cd ../models
touch metadata.model.mjs
cd ../modules
touch metadata.module.mjs
cd ../routes
touch metadata.router.mjs
cd ../services
touch metadata.service.mjs

echo "Files created successfully!"