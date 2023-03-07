const content = JSON.stringify({
  "blocks": ["Show", "Hide", "Minimal"],
  "operators": ["=", "!", "<=", ">=", "<", ">","=="],
  "GemQualityType": ["Superior", "Divergent", "Anomalous", "Phantasmal"],
  "Rarity": ["Normal", "Magic", "Rare", "Unique"],
  "rules": {
    "SocketFilters": [
      {"instance": "Numeric", "defaultVal": {"operator": ">", "value": "4"}, "property": "LinkedSockets", "min": "2", "max": "6"},
    ],
    
//    {"instance": "Numeric", "defaultVal": {"operator": ">", "value": "4"}, "property": "LinkedSockets", "min": "2", "max": "6"},
//    {"instance": "Select", "defaultVal": {"operator": ">", "value": "Magic"}, "property": "Rarity", "options": "Rarity"},
//    {"instance": "Select", "defaultVal": {"value": "Superior"}, "property": "GemQualityType", "options": "GemQualityType"},
//    {"instance": "Numeric", "defaultVal": {"operator": ">", "value": "30"}, "property": "AreaLevel", "min": "1", "max": "100"},
//    {"instance": "Boolean", "defaultVal": {"value": "False"}, "property": "AlternateQuality"}
  }
});

export default content;