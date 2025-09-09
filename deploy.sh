#!/bin/bash

# Deploy to Netlify using drag and drop
echo "Deploying to Netlify..."

# Check if index.html exists
if [ ! -f "index.html" ]; then
    echo "Error: index.html not found"
    exit 1
fi

# Create a zip file of the current directory
echo "Creating deployment package..."
zip -r deploy.zip . -x "*.git*" "*.DS_Store" "deploy.sh" "deploy.zip" "*.netlify*"

# Upload to Netlify Drop
echo "Uploading to Netlify Drop..."
echo "Please visit https://app.netlify.com/drop to manually deploy"
echo "Or use: netlify deploy --dir . --prod"

# Clean up
rm -f deploy.zip

echo "Files ready for deployment in current directory"
ls -la *.html