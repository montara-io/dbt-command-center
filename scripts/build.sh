#!/bin/bash

echo "Building web app..."
cd web
npm run build
echo "Web app built successfully."
echo "Building Python package..."
cd ..
rm -rf dist
python setup.py
sdist bdist_wheel
echo "Python package built successfully."
 