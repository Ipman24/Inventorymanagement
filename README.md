# Inventorymanagement
Project to organized, structured, and process inventory management data by creating custom input form and any other programs needed

Overview
The system consists of an HTML-based user interface and a Google Apps Script backend to manage a product registration form. The system dynamically interacts with spreadsheet data to manage product categories and save submitted data to a centralized spreadsheet. It allows users to handle products with or without SKUs, and provides dynamic functionality such as auto-suggestions and the ability to add multiple product variants.

Features
Dynamic Form:

Input fields for product and category data.
Conditional fields based on whether the product has an SKU or not.
Auto-suggestions for category fields (Kategori 1, 2, and 3) based on existing spreadsheet data.
Dynamic addition/removal of multiple variants.
Spreadsheet Integration:

Fetches category data dynamically from a Google Spreadsheet.
Saves the submitted form data into a specific tab in another Google Spreadsheet.
Validation:

Form fields are required for completion (validated in HTML).
Dropdowns for Kategori 2 and Kategori 3 are enabled only after valid selections in the previous categories.
Timestamps:

Each submission is recorded with a timestamp for tracking purposes.
Components
1. HTML File (index.html)
The front-end user interface of the system.

Key Elements:
Input Fields:

namaKaryawan (Employee Name)
namaProduk (Product Name)
vendor (Vendor Name)
kategori1, kategori2, kategori3:
Auto-suggest dropdowns populated dynamically based on spreadsheet data.
Conditional fields for SKU (skuQuestion):
If "Yes", input fields for variants appear with the ability to add multiple variants.
If "No", input fields for price, expiration date, and item quantity appear.
Dynamic Sections:

SKU Section:
Allows adding/removing multiple product variants with fields like namaVariant, jumlahBarang, expiredDate, and hargaBeli.
No SKU Section:
Displays fields for price, expiration date, and quantity when the product does not have an SKU.
JavaScript Logic:

Fetches and handles category data.
Dynamically updates the UI based on category selection and SKU responses.
Manages form submission by sending data to the Google Apps Script backend.
2. Apps Script Backend (code.gs)
The backend logic to process and save data.

Key Functions:
doGet():

Serves the HTML form when the app is accessed.
getCategories():

Fetches category data from the "Database" tab of the spreadsheet.
Constructs a hierarchical structure of categories for kategori1, kategori2, and kategori3.
submitForm(data):

Processes form submissions and saves the data to the "FormData" tab of the output spreadsheet.
Handles conditional logic for products with or without SKUs.
Appends a timestamp for every submission.
How It Works
1. Dynamic Dropdowns for Categories
Auto-suggestions:

Data is fetched from the "Database" tab of the Google Spreadsheet.
Dropdowns for kategori2 and kategori3 are enabled only after a valid selection in kategori1 and kategori2, respectively.
The logic ensures that only valid options are shown based on hierarchical dependencies.
Behavior:

Clicking on the input fields for categories shows suggestions.
Typing filters the dropdown list to match the input query.
Selecting a suggestion populates the input field and enables the next dropdown.
2. Conditional SKU Fields
The field skuQuestion determines which input sections appear:
"Yes" (with SKU):
Fields for product variants are shown.
A button allows users to dynamically add multiple variants.
"No" (without SKU):
Fields for price, expiration date, and quantity are shown.
These fields are relevant for products not associated with variants.
3. Data Submission
Form data is submitted via the submitForm() function in the backend.
Data is saved in the "FormData" tab of the specified output spreadsheet.
Fields saved include:
Employee Name, Product Name, Vendor Name, Categories, SKU question response, variant details, and a timestamp.
Variants:
Each variant is saved as a separate row with corresponding data.
No SKU Products:
A single row is saved with relevant fields for products without an SKU.
Spreadsheet Integration
1. Input Spreadsheet (for Category Data)
Spreadsheet ID: 14n4mBCE1UJwTeEmVt2RkHRcxouNSerLxxGW6IQKZOMU
Tab: Database
Columns Used:
Column A: Kategori 1
Column B: Kategori 2
Column C: Kategori 3
2. Output Spreadsheet (for Submitted Data)
Spreadsheet ID: 1OMxyVKI3K_eWAymPcitWqnowS-c8Jv7wyLWTdaiN39U
Tab: FormData
Columns Saved:
Employee Name
Product Name
Vendor
Kategori 1
Kategori 2
Kategori 3
SKU Question Response
Variant Details (if applicable)
Price, Expiration Date, and Quantity (if no SKU)
Timestamp
Deployment
Deploy the App:

Open the Apps Script editor in Google Sheets.
Deploy as a Web App (Deploy > New Deployment > Web App).
Set permissions to "Anyone with the link."
Access the App:

Share the generated URL with users to access the form.
Example Output
Submitted Data in "FormData" Tab:
Employee Name	Product Name	Vendor	Kategori 1	Kategori 2	Kategori 3	SKU Question	Variant Name	Quantity	Expiration Date	Price	Timestamp
John Doe	Shampoo	ABC Co	Beauty	Hair Care	Shampoo	Yes	Travel Pack	100	2024-12-31	50	2024-12-15 10:30:00
John Doe	Shampoo	ABC Co	Beauty	Hair Care	Shampoo	Yes	Family Pack	200	2024-12-31	100	2024-12-15 10:30:00
Jane Smith	Detergent	XYZ Co	Cleaning	Laundry	Detergent	No		300	2025-01-15	30	2024-12-15 11:00:00
Future Improvements
Add email notifications for each form submission.
Add real-time validations to ensure correct data entry.
Enhance the UI with advanced CSS frameworks like Bootstrap.
