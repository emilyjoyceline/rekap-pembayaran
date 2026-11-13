/**
 * GOOGLE APPS SCRIPT: BACKEND CLOUD SYNC REKAP PEMBAYARAN
 * -------------------------------------------------------------
 * Salin (copy) seluruh kode ini, lalu tempel (paste) ke Google Sheet Anda:
 * 1. Buka Google Sheet baru (beri nama misal: "Rekap Pembayaran DP Perusahaan")
 * 2. Klik menu: Ekstensi (Extensions) > Apps Script
 * 3. Hapus kode lama, lalu tempel seluruh isi skrip ini.
 * 4. Klik "Simpan" (ikon disket / Ctrl+S).
 * 5. Klik "Terapkan" (Deploy) > "Penerapan baru" (New deployment).
 * 6. Pilih jenis: "Aplikasi web" (Web app).
 * 7. Konfigurasi:
 *    - Jalankan sebagai (Execute as): "Saya" (Me)
 *    - Yang memiliki akses (Who has access): "Siapa saja" (Anyone) -> PENTING!
 * 8. Klik "Terapkan" (Deploy) & Izinkan Akses (Review Permissions).
 * 9. Salin "URL Aplikasi Web" (contoh: https://script.google.com/macros/s/.../exec)
 * 10. Buka aplikasi web kita di HP/PC > Klik "☁️ Cloud Sync" > Tempel URL tersebut.
 */

function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) || 'list';
  var projectName = e && e.parameter && e.parameter.projectName;

  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = getOrCreateSummarySheet(ss);

  if (action === 'get' && projectName) {
    var data = sheet.getDataRange().getValues();
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] == projectName) {
        return createJsonResponse({
          status: 'success',
          projectName: data[i][0],
          updatedAt: data[i][1],
          jsonData: data[i][6] ? JSON.parse(data[i][6]) : null
        });
      }
    }
    return createJsonResponse({ status: 'error', message: 'Proyek tidak ditemukan' });
  }

  // Default: list all projects
  var data = sheet.getDataRange().getValues();
  var projects = [];
  for (var i = 1; i < data.length; i++) {
    if (data[i][0]) {
      projects.push({
        projectName: data[i][0],
        updatedAt: data[i][1],
        totalTagihan: data[i][2],
        totalSetoran: data[i][3],
        sisaSaldo: data[i][4],
        status: data[i][5]
      });
    }
  }

  return createJsonResponse({ status: 'success', projects: projects });
}

function doPost(e) {
  try {
    var postData;
    if (e.postData && e.postData.contents) {
      postData = JSON.parse(e.postData.contents);
    } else {
      postData = e.parameter;
    }

    if (!postData || !postData.projectName) {
      return createJsonResponse({ status: 'error', message: 'Data tidak lengkap (nama proyek kosong)' });
    }

    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = getOrCreateSummarySheet(ss);
    var data = sheet.getDataRange().getValues();

    var now = Utilities.formatDate(new Date(), "Asia/Jakarta", "yyyy-MM-dd HH:mm:ss");
    var grandTagihan = postData.grandTagihan || 0;
    var totalSetoran = postData.totalSetoran || 0;
    var sisaSaldo = postData.sisaSaldo || 0;
    var statusText = sisaSaldo <= 0 ? "LUNAS" : "BELUM LUNAS";
    var jsonPayload = JSON.stringify(postData.appState || postData);

    var existingRow = -1;
    for (var i = 1; i < data.length; i++) {
      if (data[i][0] == postData.projectName) {
        existingRow = i + 1;
        break;
      }
    }

    if (existingRow > 0) {
      // Update existing row
      sheet.getRange(existingRow, 1, 1, 7).setValues([[
        postData.projectName,
        now,
        grandTagihan,
        totalSetoran,
        sisaSaldo,
        statusText,
        jsonPayload
      ]]);
    } else {
      // Append new row
      sheet.appendRow([
        postData.projectName,
        now,
        grandTagihan,
        totalSetoran,
        sisaSaldo,
        statusText,
        jsonPayload
      ]);
    }

    // Format numbers
    var lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      sheet.getRange(2, 3, lastRow - 1, 3).setNumberFormat("#,##0");
    }

    return createJsonResponse({
      status: 'success',
      message: 'Data berhasil disinkronkan ke Google Sheets!',
      updatedAt: now
    });
  } catch (err) {
    return createJsonResponse({ status: 'error', message: err.toString() });
  }
}

function getOrCreateSummarySheet(ss) {
  var sheet = ss.getSheetByName("Rekap_Proyek");
  if (!sheet) {
    sheet = ss.insertSheet("Rekap_Proyek");
    // Setup header
    var headers = [
      "Nama Proyek / Klien", 
      "Terakhir Diperbarui", 
      "Total Tagihan (Rp)", 
      "Total Pembayaran (Rp)", 
      "Sisa Saldo (Rp)", 
      "Status", 
      "Data_JSON_Aplikasi"
    ];
    sheet.appendRow(headers);
    
    // Style headers
    var headerRange = sheet.getRange("A1:G1");
    headerRange.setBackground("#2b7293");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    headerRange.setHorizontalAlignment("center");
    
    // Set widths
    sheet.setColumnWidth(1, 250);
    sheet.setColumnWidth(2, 160);
    sheet.setColumnWidth(3, 160);
    sheet.setColumnWidth(4, 160);
    sheet.setColumnWidth(5, 160);
    sheet.setColumnWidth(6, 120);
    sheet.setColumnWidth(7, 100);
    
    // Hide JSON column for clean viewing if desired
    // sheet.hideColumns(7);
  }
  return sheet;
}

function createJsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
