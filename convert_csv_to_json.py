#!/usr/bin/env python3
"""
Convert KatanaSignalEngine CSV results to JSON format for HTML table consumption.
Maps CSV fields to the expected table data contract.
"""

import csv
import json
import sys
from pathlib import Path

def map_signal_strength(signal_str):
    """Map signal strength to consistent format"""
    if isinstance(signal_str, str):
        return signal_str.upper()
    return "MODERATE"  # default fallback

def map_boolean_match(value):
    """Convert string boolean to actual boolean"""
    if isinstance(value, str):
        return value.lower() in ('true', '1', 'yes')
    return bool(value)

def convert_csv_to_json(csv_file_path, output_path=None):
    """
    Convert CSV to JSON format matching the table data contract:
    
    Required fields from CSV:
    - execution_priority -> priority
    - buy_description -> buy_description  
    - buy_price -> buy_price
    - sell_description -> sell_description
    - sell_price -> sell_price
    - price_differential -> price_diff
    - yield_differential -> yield_diff
    - signal_strength -> signal_strength
    - confidence_score -> confidence
    - duration_match -> duration_match
    - sector_match -> sector_match
    """
    
    results = []
    
    try:
        with open(csv_file_path, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            
            for row_num, row in enumerate(reader, 1):
                try:
                    # Map CSV fields to table contract
                    signal_data = {
                        'priority': int(float(row.get('execution_priority', row_num))),
                        'buy_description': row.get('buy_description', '').strip(),
                        'buy_price': float(row.get('buy_price', 0)),
                        'sell_description': row.get('sell_description', '').strip(),
                        'sell_price': float(row.get('sell_price', 0)),
                        'price_diff': float(row.get('price_differential', 0)),
                        'yield_diff': float(row.get('yield_differential', 0)),
                        'signal_strength': map_signal_strength(row.get('signal_strength', 'MODERATE')),
                        'confidence': int(float(row.get('confidence_score', 50))),
                        'duration_match': map_boolean_match(row.get('duration_match', 'False')),
                        'sector_match': map_boolean_match(row.get('sector_match', 'False'))
                    }
                    
                    # Validation - skip rows with missing critical data
                    if not signal_data['buy_description'] or not signal_data['sell_description']:
                        print(f"Skipping row {row_num}: Missing bond descriptions")
                        continue
                        
                    if signal_data['buy_price'] <= 0 or signal_data['sell_price'] <= 0:
                        print(f"Skipping row {row_num}: Invalid prices")
                        continue
                    
                    results.append(signal_data)
                    
                except (ValueError, KeyError) as e:
                    print(f"Error processing row {row_num}: {e}")
                    continue
    
    except FileNotFoundError:
        print(f"Error: CSV file not found: {csv_file_path}")
        return None
    except Exception as e:
        print(f"Error reading CSV file: {e}")
        return None
    
    if not results:
        print("No valid data found in CSV file")
        return None
    
    # Sort by priority for consistent display
    results.sort(key=lambda x: x['priority'])
    
    # Output to JSON
    if output_path:
        try:
            with open(output_path, 'w', encoding='utf-8') as json_file:
                json.dump(results, json_file, indent=2, ensure_ascii=False)
            print(f"Successfully converted {len(results)} records to {output_path}")
        except Exception as e:
            print(f"Error writing JSON file: {e}")
            return None
    
    return results

def main():
    # Find the latest enhanced CSV file
    katana_path = Path("/Users/johnshelburne/MyProjects/KatanaSignalEngine")
    enhanced_dir = katana_path / "output" / "hyg_results_enhanced"
    
    if not enhanced_dir.exists():
        print(f"Enhanced results directory not found: {enhanced_dir}")
        sys.exit(1)
    
    # Find the latest enhanced CSV file
    csv_files = list(enhanced_dir.glob("hyg_signals_enhanced_*.csv"))
    if not csv_files:
        print("No enhanced CSV files found")
        sys.exit(1)
    
    # Get the most recent file
    latest_csv = max(csv_files, key=lambda x: x.stat().st_mtime)
    
    # Output to NetlifyDrop directory
    output_path = "/Users/johnshelburne/MyProjects/NetlifyDrop/katana_signals_data.json"
    
    print(f"Converting {latest_csv} to JSON...")
    
    results = convert_csv_to_json(latest_csv, output_path)
    
    if results:
        print(f"Successfully converted {len(results)} records")
        print("JSON data ready for HTML table consumption")
        
        # Show first few records for verification
        print("\nFirst 3 records preview:")
        for i, record in enumerate(results[:3]):
            print(f"  {i+1}. {record['buy_description']} -> {record['sell_description']}")
            print(f"     Priority: {record['priority']}, Signal: {record['signal_strength']}, Confidence: {record['confidence']}%")
    else:
        print("Conversion failed")
        sys.exit(1)

if __name__ == "__main__":
    main()