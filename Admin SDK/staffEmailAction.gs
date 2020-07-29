/* Send notification to leaving staff 3 days before departure */
function notifyLeavingStaff(){  
  var query = "select type, email, Date(leftDate) as leftDate, Date(NOW()) as sendDate, DATE(DATE_ADD(leftDate, INTERVAL 60 DAY)) as suspendDate, 'No' as bypass, month(leftDate) as month, year(leftDate) as year from admin_sdk where type = 'staff' and leftDate = DATE_ADD(DATE(NOW()), INTERVAL 3 DAY)";
  var staffSet = Jdbc.getConnection("jdbc:mysql://222.16.227.81:3306/database", "user", "password").createStatement().executeQuery(query);  
  var row = 0;
  
  /* Create spreadsheet for tracking */
  var sheetID = 'yyy105ybQdIsyYKq9vBWumwM01QNom4UI93G9YbS7DIBe4g'; /replace with your spreadsheet id
  var today = new Date();
  var month = today.getMonth();
  var year = today.getYear();
  var sheet = SpreadsheetApp.openById(sheetID).getSheetByName(generateSchoolyear(month,year));
  var lastrow = sheet.getLastRow() + 1; 
  var cell = sheet.getRange('A' + lastrow);
  
  while(staffSet.next()) {
    var messageBody = '';
    var email = staffSet.getString(2);
    messageBody += '<p>School e-mail <b><i>' + email + '</i></b> will automatically be suspended 60 days after your departure from School.</p>';
    messageBody += '<p>You are advised to visit <i><a href="https://takeout.google.com" target="_blank">Google Takeout</a></i> to export your data from the Google products you use, like your email, calendar, and drive.<br>Please visit the ICT office or email ict@school.edu.hk if you need assistance or an extension. </p>';
    messageBody += '<p>However, if you <b>ARE NOT LEAVING</b> School and have received this e-mail, <b>please ignore this e-mail</b> as this is based on a contract end date. </p>';
    messageBody += '<p><i>This is an automatically generated email, please do not reply.</i></p>';
    for(var i=0; i<6; i++) {    
       cell.offset(row, i).setValue(staffSet.getString(i+1));
    }
    row++; 
    sendUserMail(email, messageBody);
  }
}

/* Suspend user 60 days after exit date */
function bulkSuspendStaff(){
  var query = "select type, email, month(leftDate) as month, year(leftDate) as year from admin_sdk where type = 'staff' and leftDate = DATE_SUB(DATE(NOW()), INTERVAL 60 DAY)";
  var staffSet = Jdbc.getConnection("jdbc:mysql://222.16.227.81:3306/database", "user", "password").createStatement().executeQuery(query);  
  
  /* Create spreadsheet for tracking */
  var sheetID = '105ybQdIsyYKq9vBWumwM01QNom4UI93G9ttttYbS7DIBe4g';
  var today = new Date();
  var month = today.getMonth();
  var year = today.getYear();
  var sheet = SpreadsheetApp.openById(sheetID).getSheetByName(generateSchoolyear(month,year));
  var lastrow = sheet.getLastRow() + 1; 
  var cell = sheet.getRange('A' + lastrow);
  
  /* go through first column */
  var startRow = 2; 
  var dataRange = sheet.getRange(startRow, 2, lastrow-2, 6); 
  var data = dataRange.getValues();
  
  while(staffSet.next()) {
    var usertype = staffSet.getString(1);
    var email = staffSet.getString(2);
    var month = staffSet.getString(3);
    var year = staffSet.getString(4);    
    if(usertype == 'staff'){
      var orgUnitPath = '/Suspended/Staff/' + generateSchoolyear(month, year);
    }
    for (i in data) {
      var row = data[i];
      if(row[0] == email){
        /* Bypass: No */
        if(row[4] == 'No'){
          var cellrow = Number(i) + Number(2);
          var cell = sheet.getRange('G' + cellrow);
          cell.setValue('Suspended at ' + today);
          moveUserToOrg(email, orgUnitPath);
          Utilities.sleep(1000);   
          try{
            suspendUser(email);
            Utilities.sleep(1000);   
          }catch(e){    
          } 
        }
      }
    }
  }
}
