import json
from bs4 import BeautifulSoup
import time
import random
import csv


# Read the input.html file
with open('input.txt', 'r', encoding='utf-8') as input_file:
    input_data = input_file.read()



# Remove '\n' from the input data
input_data = input_data.replace('\n', '')

# Parse the HTML using Beautiful Soup
soup = BeautifulSoup(input_data, 'html.parser')



# Find and assign URL
url_element = soup.find('url')
url = url_element.text if url_element else ''
url = url.replace('\n', '')

# Find and assign page title
page_title_element = soup.find('pagetitle')
page_title = page_title_element.text if page_title_element else ''
page_title = page_title.replace('\n', '')

# Find and assign section title
section_title_element = soup.find('sectiontitle')
section_title = section_title_element.text if section_title_element else ''
section_title = section_title.replace('\n', '')


# Find and assign section text
section_text_element = soup.find('sectiontext')
section_text = section_text_element.text if section_text_element else ''
section_text = section_text.replace('\n', '')


# Generate a unique example_id
current_time = int(time.time())
random_number = random.randint(1, 1000)  # Adjust the range as needed
example_id = f"{current_time}_{random_number}"


# Initialize variables to store the structured data
structured_data = {
    'table': [],  # Initialize an empty 2D array
    'table_webpage_url': url,
    'table_page_title': page_title,
    'table_section_title': section_title,
    'table_section_text': section_text,
    'highlighted_cells': [], # 2D array [[3,0],[3,2]]
    'example_id': example_id,
    'overlap_subset': False,
    'sentence_annotations': [{
        "orginal_sentence":"",
        "sentence_after_deletion":"",
        "sentence_after_ambiguity":"",
        "final_sentence":"",
        
    },
    {
        "orginal_sentence":"",
        "sentence_after_deletion":"",
        "sentence_after_ambiguity":"",
        "final_sentence":"",
        
    },
    {
        "orginal_sentence":"",
        "sentence_after_deletion":"",
        "sentence_after_ambiguity":"",
        "final_sentence":"",
        
    }
    ],
    "isValidate": 0,        
    "isShow":0
}

row = []

# Variables to keep track of header cells
in_header = False
header_row_span = 1
header_col_span = 1

# Find all table rows and iterate through them
for tr in soup.find_all('tr'):
    # Iterate through the cells in each row
    for cell in tr.find_all(['th', 'td']):
        is_header = cell.name == 'th'
        row_span = int(cell.get('rowspan', 1))
        col_span = int(cell.get('colspan', 1))
        value = cell.get_text()

        row.append({
            'value': value,
            'is_header': is_header,
            'row_span': row_span,
            'col_span': col_span
        })

        if not is_header:
            in_header = False

        if is_header:
            in_header = True

    structured_data['table'].append(row)
    row = []


# Generate a random index for selecting a subarray within the table
table_index = random.randint(2, len(structured_data['table']) - 1)

# Select the subarray from the table
selected_subarray = structured_data['table'][table_index]

# Generate unique random numbers for selecting objects within the subarray
unique_indices = set()  # Use a set to ensure uniqueness

while len(unique_indices) < random.randint(3,5):
    object_index = random.randint(0, len(selected_subarray) - 1)
    unique_indices.add((table_index, object_index))


highlighted_cells_list = [list(idx) for idx in unique_indices]


# Convert the set to a list and append to highlighted_cells
structured_data['highlighted_cells'] = highlighted_cells_list


# Write the structured data to the output.txt file in JSON format
with open('output.json', 'a', encoding='utf-8') as output_file:
    json.dump(structured_data, output_file, ensure_ascii=False)
    output_file.write('\n')


# # Write the structured data to the output.csv file in CSV format
# with open('output1.csv', 'a', newline='', encoding='utf-8') as output_file:
#     csv_writer = csv.writer(output_file)


# # run it first time just than comment it
#     # # Write the header row
#     # csv_writer.writerow([
#     #     'table',
#     #     'table_webpage_url',
#     #     'table_page_title',
#     #     'table_section_title',
#     #     'table_section_text',
#     #     'highlighted_cells',
#     #     'example_id',
#     #     'sentence_annotations'
#     # ])

#     # Write the data for this specific example
#     csv_writer.writerow([
#         structured_data['table'],
#         structured_data['table_webpage_url'],
#         structured_data['table_page_title'],
#         structured_data['table_section_title'],
#         structured_data['table_section_text'],
#         structured_data['highlighted_cells'],
#         structured_data['example_id'],
#         json.dumps(structured_data['sentence_annotations'])
#     ])

print("Data has been structured and saved to output.csv")








print("Data has been structured and saved to output.txt")
