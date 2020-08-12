//Manual function that reads the google invite sheet
function manualGoogleInvite(){
  var year = "Y09";
  var subject = "subjectCode Here";
  var starttime = "08:25:00";
  var endtime = "09:30:00";
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Google Invites");
  
  var startRow = 2; 
  var lastrow = sheet.getLastRow() + 1; 
  if(lastrow > 2){
    var dataRange = sheet.getRange(startRow, 1, lastrow-2, 6); 
    var data = dataRange.getValues();
    var googleAttendees = [];
    var zoomlink = '';
    
    var today = new Date();
    var todaystr = Utilities.formatDate(today, 'Asia/Hong_Kong', 'yyyy-MM-dd');
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    var tomorrowstr = Utilities.formatDate(tomorrow, 'Asia/Hong_Kong', 'yyyy-MM-dd');
    
    for (i in data) {
      var row = data[i];
      if(row[0] == subject){
        if(row[5] == 'Y'){
          zoomlink = row[1];
          googleAttendees.push({'email':row[2]});
        }
      }
    }
    
    var organizer_email = formatSchoolyear(year) + ".admin.email@school.edu.hk";
      var event = {
        "summary": subject,
        "guestsCanInviteOthers": false,
        "description": 'To join this Zoom meeting, please register and visit ' + zoomlink + '<br><br>Please choose Sign in via Google and use your school e-mail account.<br><br>Should you encounter any issue, please e-mail ICT at ict@school.edu.hk',
        "start": {
          'dateTime': tomorrowstr+"T08:25:00",
          'timeZone': 'Asia/Hong_Kong'
        },
        "end": {
          'dateTime': tomorrowstr+"T09:30:00",
          'timeZone': 'Asia/Hong_Kong'
        },
        "organizer": {
          'email': organizer_email
        },
        'attendees': googleAttendees
      };
    
      try{
        Calendar.Events.insert(event, organizer_email, {
          "conferenceDataVersion": 1, "sendUpdates": 'all'}); 
      }catch(e){
        Logger.log(e);
      }
      Utilities.sleep(1000);
    Logger.log(googleAttendees);
  }
}