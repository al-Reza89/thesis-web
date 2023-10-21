import csv
import json

# Open the JSONL file for reading
with open('output.txt', 'r', encoding='utf-8') as jsonl_file:
    jsonl_data = jsonl_file.readlines()

# Create a CSV file for writing
with open('output1.csv', 'w', newline='', encoding='utf-8') as csv_file:
    csv_writer = csv.writer(csv_file)

    # Write the CSV header
    csv_writer.writerow([
        'table',
        'table_webpage_url',
        'table_page_title',
        'table_section_title',
        'table_section_text',
        'highlighted_cells',
        'example_id',
        'sentence_annotations'
    ])

    # Parse each JSONL line and write it to CSV
    for line in jsonl_data:
        json_data = json.loads(line)

        # Decode escaped characters to obtain the actual text
        decoded_table = [[cell['value'].encode('utf-8').decode('unicode-escape') for cell in row] for row in json_data['table']]
        decoded_highlighted_cells = [(str(cell[0]), str(cell[1])) for cell in json_data['highlighted_cells']]
        decoded_sentence_annotations = [annotation.encode('utf-8').decode('unicode-escape') for annotation in json_data['sentence_annotations']]

        # Write the decoded data to CSV
        csv_writer.writerow([
            json.dumps(decoded_table),
            json_data['table_webpage_url'],
            json_data['table_page_title'],
            json_data['table_section_title'],
            json_data['table_section_text'],
            json.dumps(decoded_highlighted_cells),
            json_data['example_id'],
            json.dumps(decoded_sentence_annotations)
        ])

print("Data has been converted to CSV format and saved to output.csv")
