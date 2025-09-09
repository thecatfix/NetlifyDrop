#!/bin/bash
set -euo pipefail

# Update Katana Signals Table with Latest KatanaSignalEngine Results
# This script converts the latest CSV results to JSON and updates the HTML table

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
KATANA_ENGINE_DIR="/Users/johnshelburne/MyProjects/KatanaSignalEngine"
JSON_OUTPUT="${SCRIPT_DIR}/katana_signals_data.json"
CONVERTER_SCRIPT="${SCRIPT_DIR}/convert_csv_to_json.py"

echo "🔄 Updating Katana Signals Table..."

# Check if KatanaSignalEngine directory exists
if [[ ! -d "$KATANA_ENGINE_DIR" ]]; then
    echo "❌ KatanaSignalEngine directory not found: $KATANA_ENGINE_DIR"
    exit 1
fi

# Check if converter script exists
if [[ ! -f "$CONVERTER_SCRIPT" ]]; then
    echo "❌ Converter script not found: $CONVERTER_SCRIPT"
    exit 1
fi

# Find the latest enhanced results
ENHANCED_DIR="${KATANA_ENGINE_DIR}/output/hyg_results_enhanced"
if [[ ! -d "$ENHANCED_DIR" ]]; then
    echo "⚠️  Enhanced results directory not found, checking regular results..."
    RESULTS_DIR="${KATANA_ENGINE_DIR}/output/hyg_results"
    if [[ ! -d "$RESULTS_DIR" ]]; then
        echo "❌ No results directory found in KatanaSignalEngine"
        exit 1
    fi
    LATEST_CSV=$(find "$RESULTS_DIR" -name "hyg_signals_*.csv" -type f -exec stat -f "%m %N" {} \; | sort -n | tail -1 | cut -d' ' -f2-)
else
    LATEST_CSV=$(find "$ENHANCED_DIR" -name "hyg_signals_enhanced_*.csv" -type f -exec stat -f "%m %N" {} \; | sort -n | tail -1 | cut -d' ' -f2-)
fi

if [[ -z "$LATEST_CSV" ]]; then
    echo "❌ No CSV results found in KatanaSignalEngine output"
    exit 1
fi

echo "📊 Found latest results: $(basename "$LATEST_CSV")"

# Convert CSV to JSON
echo "🔄 Converting CSV to JSON..."
if python3 "$CONVERTER_SCRIPT"; then
    echo "✅ Successfully updated JSON data"
    
    # Check JSON file was created and has content
    if [[ -f "$JSON_OUTPUT" ]]; then
        RECORD_COUNT=$(jq length "$JSON_OUTPUT" 2>/dev/null || echo "0")
        echo "📈 Updated with $RECORD_COUNT signal records"
        
        # Show a few sample records
        echo "📋 Sample records:"
        jq -r '.[0:3][] | "  \(.priority). \(.buy_description) -> \(.sell_description) (\(.signal_strength), \(.confidence)%)"' "$JSON_OUTPUT" 2>/dev/null || echo "  (Unable to parse sample records)"
        
    else
        echo "❌ JSON output file was not created"
        exit 1
    fi
else
    echo "❌ Failed to convert CSV to JSON"
    exit 1
fi

echo "🎉 Katana Signals Table data updated successfully!"
echo "💡 Refresh your browser to see the latest signals"

# Optionally start local server if not running
if ! lsof -i :8000 >/dev/null 2>&1; then
    echo "🌐 Starting local server on http://localhost:8000"
    echo "🔗 View table at: http://localhost:8000/katana-hyg-signals.html"
    python3 -m http.server 8000 > /dev/null 2>&1 &
    echo "   Server PID: $!"
    
    # Wait a moment then open browser
    sleep 2
    open "http://localhost:8000/katana-hyg-signals.html" 2>/dev/null || echo "   (Open the URL manually in your browser)"
else
    echo "🌐 Server already running at http://localhost:8000"
    echo "🔗 View updated table at: http://localhost:8000/katana-hyg-signals.html"
fi