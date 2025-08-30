#!/bin/bash

# HMR Environment Validation Script
# This script helps validate your .env configuration for Vite HMR

echo "🔍 Validating HMR Environment Configuration..."
echo ""

# Check if .env file exists
if [ ! -f ".env" ]; then
    echo "❌ No .env file found. Please copy example.env to .env and configure it."
    exit 1
fi

# Load environment variables from .env
export $(grep -v '^#' .env | xargs)

# Check required variables
echo "📋 Current Configuration:"
echo "  VITE_DEV_SERVER_HOST: ${VITE_DEV_SERVER_HOST:-'Not set (will default to http://localhost)'}"
echo "  VITE_DEV_SERVER_PORT: ${VITE_DEV_SERVER_PORT:-'Not set (will default to 5173)'}"
echo ""

# Validate host format
if [ -n "$VITE_DEV_SERVER_HOST" ]; then
    if [[ $VITE_DEV_SERVER_HOST =~ ^https?:// ]]; then
        echo "✅ VITE_DEV_SERVER_HOST format is valid"
    else
        echo "⚠️  VITE_DEV_SERVER_HOST should include protocol (http:// or https://)"
        echo "   Example: http://block-theme.local or https://my-site.local"
    fi
else
    echo "ℹ️  Using default host: http://localhost"
fi

# Validate port
if [ -n "$VITE_DEV_SERVER_PORT" ]; then
    if [[ $VITE_DEV_SERVER_PORT =~ ^[0-9]+$ ]]; then
        echo "✅ VITE_DEV_SERVER_PORT format is valid"
    else
        echo "❌ VITE_DEV_SERVER_PORT must be a number"
    fi
else
    echo "ℹ️  Using default port: 5173"
fi

echo ""
echo "🚀 Full dev server URL will be: ${VITE_DEV_SERVER_HOST:-http://localhost}:${VITE_DEV_SERVER_PORT:-5173}"
echo ""

# Check if WordPress site URL might be different
echo "💡 Tips:"
echo "  - Make sure VITE_DEV_SERVER_HOST matches your WordPress site URL"
echo "  - For Local by Flywheel: use https://your-site.local"
echo "  - For Laravel Valet: use http://your-site.test"
echo "  - For DDEV: use http://your-site.ddev.site"
echo ""
echo "  Run 'npm run dev' or 'pnpm dev' to start the development server"
