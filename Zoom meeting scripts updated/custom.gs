function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Custom')
      .addItem('Create Custom Event', 'createCustomEvent')
      .addSeparator()
      .addToUi();
}


var customAlternativeHost = [
  {"year":"Y4", "email":"organiseremail@school.edu.hk", "calendar":true}
];

var customAlternativeHost = [];

/* Option: Create the Zoom events based on the Custom Sheet */
function createCustomEvent(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Custom");
  
  var startRow = 2; 
  var lastrow = sheet.getLastRow() + 1; 
  if(lastrow > 2){
    var dataRange = sheet.getRange(startRow, 1, lastrow-2, 12); 
    var data = dataRange.getValues();

    var tomorrow = new Date('2020-08-12');
    var tomorrowstr = Utilities.formatDate(tomorrow, 'Asia/Hong_Kong', 'yyyy-MM-dd');

    for (i in data) {
      var row = data[i];
      var description = '';
      var googleAttendees = [];
      var alternativeHosts = '';
      var ctr = 0;
      
      /* Add alternative host(s) */
      for(o in customAlternativeHost){
        var iscustomAlternativeHostInvited = "N";
        if(customAlternativeHost[o]['year'] == row[1]){
          if(isZoomUser(customAlternativeHost[o]['email'])){
            alternativeHosts = customAlternativeHost[o]['email'];
            if(customAlternativeHost[o]['calendar']){
              googleAttendees.push({'email':customAlternativeHost[o]['email']});
            }
          }
        }
      }
     
      var info = {
          "start": tomorrowstr+"T"+row[3],
          "end": tomorrowstr+"T"+row[4],
          "duration": row[5],
          "organizer":row[9],
          "subject":row[0],
          "password": row[10],
          "email":row[9],
          "prefname":row[7],
          "surname":row[8],
          "waiting_room":true,
          "alternative_hosts": alternativeHosts
      };
      
      var zoom_info = createCustomZoomMeeting(info);
      var attendees = row[2];
      var attendees_str = attendees.split(",");
      
      for(a in attendees_str){
        if(attendees_str[a] != ''){
           if(isZoomUser(attendees_str[a])){
             var user = getByEmail(attendees_str[a]);
             if(user){
               var prefname = user['name'].givenName;
               var surname = user['name'].familyName;
               var userData = {'email':attendees_str[a], 'prefname':prefname, 'surname':surname};
               //addRegistrants(zoom_info['id'], userData);
               googleAttendees.push({'email':attendees_str[a]});
             }else{
               Logger.log(attendees_str[a] + " not found");
             }
           }
           /*
           else{
             var userData = {"email":attendees_str[a],"prefname":"Student","surname":"Name"}
             addRegistrants(zoom_info['id'], userData);
             googleAttendees.push({'email':attendees_str[a]});
           }*/
        }
      }
      
      googleAttendees.push({'email':row[9]});
      var organizer_email = row[1] + ".admin@school.edu.hk";

      var event = {
        "summary": row[0],
        "guestsCanInviteOthers": false,
        "description": 'To join this Zoom meeting, please register and visit ' + zoom_info['join_url'] + '<br>Please choose Sign in via Google and use your school e-mail account.<br><br>Should you encounter any issue, please e-mail ICT at ict@school.edu.hk',
        "start": {
          'dateTime': tomorrowstr+"T"+row[3],
          'timeZone': 'Asia/Hong_Kong'
        },
        "end": {
          'dateTime': tomorrowstr+"T"+row[4],
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
    }
  }
} 