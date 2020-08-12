//Checking for added - attended in testing
function getusertest(){
  var user = getByEmail('adminemail@school.edu.hk');
  Logger.log(user['name'].givenName);
}


/* Step 2: Create the Zoom events based on the Daily Schedule Sheet */
function createPLog(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Daily Schedule");
  var psheet = ss.getSheetByName("Participant Log");
  
  var startRow = 2; 
  var lastrow = sheet.getLastRow() + 1; 
  if(lastrow > 2){
    var dataRange = sheet.getRange(startRow, 1, lastrow-2, 8); 
    var data = dataRange.getValues();
    
    var today = new Date();
    var todaystr = Utilities.formatDate(today, 'Asia/Hong_Kong', 'yyyy-MM-dd');
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    var tomorrowstr = Utilities.formatDate(tomorrow, 'Asia/Hong_Kong', 'yyyy-MM-dd');

    for (i in data) {
      var row = data[i];
      var description = '';
      var googleAttendees = [];
      
      var plastrow = psheet.getLastRow() + 1; 
      var pcell = psheet.getRange('A' + plastrow);
     
      var info = {
          "start": tomorrowstr+"T"+row[1],
          "end": tomorrowstr+"T"+row[2],
          "organizer":row[6],
          "subject":row[0],
          "password": row[8],
          "email":row[6],
          "prefname":row[4],
          "surname":row[5],
          "waiting_room": isWaitingRoomEnabled(row[0])
      };
      
      var attendees = getAttendees(info);
     
      for(var i = 0; i < attendees.length; i++) {
        var isAttendeeInvited = "N";
        if(attendees[i]['email'] != row[6]){
          if(isZoomUser(attendees[i]['email'])){
            isAttendeeInvited = "Y";
          }
        }
        if(attendees[i]['email'] == row[6]){
          isAttendeeInvited = "Y";
        }
        pcell.offset(i, 0).setValue(row[0]);
        pcell.offset(i, 1).setValue(attendees[i]['email']);
        pcell.offset(i, 2).setValue("Y");
        pcell.offset(i, 3).setValue(isAttendeeInvited);
      }
      
      for(i in customRegistrants){
        for(j in customRegistrants[i]['users']){
          var iscustomRegistrantInvited = "N";
          if(isZoomUser(customRegistrants[i]['users'][j]['email'])){
            iscustomRegistrantInvited = "Y";
          }
          pcell.offset(i, 0).setValue(row[0]);
          pcell.offset(i, 1).setValue(customRegistrants[i]['users'][j]['email']);
          pcell.offset(i, 2).setValue("Y");
          pcell.offset(i, 3).setValue(iscustomRegistrantInvited);
        }
      }
      for(k in customLDTRegistrants){
        var iscustomLDTRegistrantInvited = "N";
        if(isZoomUser(customLDTRegistrants[k]['email'])){
          iscustomLDTRegistrantInvited = "Y";
        }
        pcell.offset(i, 0).setValue(row[0]);
        pcell.offset(i, 1).setValue(customLDTRegistrants[k]['email']);
        pcell.offset(i, 2).setValue("N");
        pcell.offset(i, 3).setValue(iscustomLDTRegistrantInvited);
      }
    }
  }
} 
