// Function to serve the HTML page when accessed
function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

// Function to fetch categories from the spreadsheet
function getCategories() {
  // Open the spreadsheet and get the "Database" tab
  var ss = SpreadsheetApp.openById("14n4mBCE1UJwTeEmVt2RkHRcxouNSerLxxGW6IQKZOMU");
  var sheet = ss.getSheetByName("Database");

  // Fetch data from columns A, B, and C
  var kategori1Data = sheet.getRange("A2:A" + sheet.getLastRow()).getValues().flat().filter(String);
  var kategori2Data = sheet.getRange("B2:B" + sheet.getLastRow()).getValues().flat().filter(String);
  var kategori3Data = sheet.getRange("C2:C" + sheet.getLastRow()).getValues().flat().filter(String);

  // Create a hierarchical structure for the categories
  var categories = {};

  // Loop through the data and build a nested structure
  kategori1Data.forEach((k1, index) => {
    if (!categories[k1]) {
      categories[k1] = {
        kategori2: [],
        kategori3: {}
      };
    }
    
    const k2 = kategori2Data[index];
    const k3 = kategori3Data[index];

    if (k2 && !categories[k1].kategori2.includes(k2)) {
      categories[k1].kategori2.push(k2);
    }
    
    if (k2 && k3) {
      if (!categories[k1].kategori3[k2]) {
        categories[k1].kategori3[k2] = [];
      }
      if (!categories[k1].kategori3[k2].includes(k3)) {
        categories[k1].kategori3[k2].push(k3);
      }
    }
  });

  // Return the hierarchical structure
  return categories;
}

// Function to submit form data to the "FormData" tab in the spreadsheet
function submitForm(data) {
  var ss = SpreadsheetApp.openById("1OMxyVKI3K_eWAymPcitWqnowS-c8Jv7wyLWTdaiN39U");
  var sheet = ss.getSheetByName("FormData");

  var timestamp = new Date(); // Capture the current timestamp

  if (data.skuQuestion === 'yes') {
    // Handle multiple variants for "Yes SKU"
    data.variants.forEach(variant => {
      var row = [
        data.namaKaryawan,            // Nama Karyawan
        data.namaProduk,              // Nama Produk
        data.vendor,                  // Vendor
        data.kategori1,               // Kategori 1
        data.kategori2,               // Kategori 2
        data.kategori3,               // Kategori 3
        data.skuQuestion,             // Does this product have an SKU?
        variant.namaVariant || "",    // Nama Variant (if SKU is yes)
        variant.jumlahBarang || "",   // Jumlah Barang (if SKU is yes)
        variant.expiredDate || "",    // Expired Date (if SKU is yes)
        variant.hargaBeli || "",      // Harga Beli (if SKU is yes)
        timestamp                     // Submission Timestamp
      ];
      sheet.appendRow(row);
    });
  } else {
    // Handle "No SKU" case
    var row = [
      data.namaKaryawan,            // Nama Karyawan
      data.namaProduk,              // Nama Produk
      data.vendor,                  // Vendor
      data.kategori1,               // Kategori 1
      data.kategori2,               // Kategori 2
      data.kategori3,               // Kategori 3
      data.skuQuestion,             // Does this product have an SKU?
      "",                           // Nama Variant (not applicable)
      data.jumlahBarangNoSku || "", // Jumlah Barang Per Unit (if SKU is no)
      data.expiredDateNoSku || "",  // Expired Date (if SKU is no)
      data.hargaBeliNoSku || "",    // Harga Beli (if SKU is no)
      timestamp                     // Submission Timestamp
    ];
    sheet.appendRow(row);
  }
}
