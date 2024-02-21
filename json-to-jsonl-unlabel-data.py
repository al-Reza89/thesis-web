import json

with open("new-bangla-data.json", "r", encoding="utf-8") as f:  # Open with UTF-8 encoding
    data = json.load(f)


filtered_data = [item for item in data if item["isValidate"] == 0 and item["isShow"] == 0]
for item in filtered_data:
    if "_id" in item:
        del item["_id"]
    if "userId" in item:
        del item["userId"]
    
    if "isShow" in item:
        del item["isShow"]
    if "isValidate" in item:
        del item["isValidate"]
    if "sentence_annotations" in item:
        del item["sentence_annotations"]
    
    if "table" in item:
        for row in item["table"]:
            for cell in row:
                if "col_span" in cell:
                    cell["column_span"] = cell.pop("col_span")

# Write the modified data to a JSONL file
with open("new-bangla-unlabel-data.jsonl", "w", encoding="utf-8") as f:  # Write with UTF-8 encoding
    for item in filtered_data:
        json.dump(item, f, ensure_ascii=False)  # Disable ASCII-only encoding
        f.write("\n")



