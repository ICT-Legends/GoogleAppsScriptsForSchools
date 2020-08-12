var qkey = "20-OL-1"; // key for the timetable to use in the queries
var period = "2020"; //key for the correct year for the timetable

/* Add custom user */
var customUsers = []
var customRegistrants = [];

/* Add custom settings per meet */
var waitingRoomEnabledSubjects = [];

var customRegistrants = [
];

function testFunc(){
  Logger.log(formatSchoolyear("Y10"));
}

function createClassY7(){
  createClassesByYear('Y07');
}

function createEventsY07(){
  /* Add LDTs and EAs no alert */
  var customLDTRegistrants = [
    {"year":"Y07", "email":"assistant1@school.edu.hk","prefname":"assistiant", "surname":"One"},
    {"year":"Y07", "email":"assistant2@school.edu.hk","prefname":"assistiant", "surname":"Two"},
    {"year":"Y07", "email":"assistant3@school.edu.hk","prefname":"assistiant", "surname":"Three"}
  ];

  /* Add Alternative Host with customized alert */
  var customAlternativeHost = [
    {"year":"Y07", "subject":"07SC101", "email":"assistant3@school.edu.hk", "calendar":false},
    {"year":"Y07", "subject":"07SC102", "email":"assistant3@school.edu.hk", "calendar":false},
    {"year":"Y07", "subject":"07SC103", "email":"assistant3@school.edu.hk", "calendar":false},
    {"year":"Y07", "subject":"07SC104", "email":"assistant@school.edu.hk", "calendar":false},
    {"year":"Y07", "subject":"07MA101", "email":"assistant4@school.edu.hk", "calendar":false},
    {"year":"Y07", "subject":"07MA102", "email":"assistant4@school.edu.hk", "calendar":false},
    {"year":"Y07", "subject":"07MA103", "email":"assistant4@school.edu.hk", "calendar":false},
    {"year":"Y07", "subject":"07MA104", "email":"assistant4@school.edu.hk", "calendar":false},
    {"year":"Y07", "subject":"07IS101", "email":"assistant4@school.edu.hk", "calendar":false},
    {"year":"Y07", "subject":"07IS102", "email":"assistant5@school.edu.hk", "calendar":false},
    {"year":"Y07", "subject":"07IS103", "email":"assistant5@school.edu.hk", "calendar":false},
    {"year":"Y07", "subject":"07IS104", "email":"assistant5@school.edu.hk", "calendar":false},
    {"year":"Y07", "subject":"07EN101", "email":"assistant6@school.edu.hk,assistant7@school.edu.hk", "calendar":false},
    {"year":"Y07", "subject":"07EN102", "email":"assistant6@school.edu.hk,assistant7@school.edu.hk", "calendar":false},
    {"year":"Y07", "subject":"07EN103", "email":"assistant6@school.edu.hk,assistant7@school.edu.hk", "calendar":false},
    {"year":"Y07", "subject":"07EN104", "email":"assistant6@school.edu.hk,assistant7@school.edu.hk", "calendar":false}
  ];
  createEventsByYear('Y07', customLDTRegistrants, customAlternativeHost);
}

function createEventsY08(){
  /* Add LDTs and EAs no alert */
  var customLDTRegistrants = [
    {"year":"Y08", "email":"assistant1@school.edu.hk","prefname":"assistiant", "surname":"One"},
    {"year":"Y08", "email":"assistant2@school.edu.hk","prefname":"assistiant", "surname":"Two"},
    {"year":"Y08", "email":"assistant3@school.edu.hk","prefname":"assistiant", "surname":"Three"}
  ];

  /* Add Alternative Host with customized alert */
  var customAlternativeHost = [
    {"year":"Y08", "subject":"07SC101", "email":"assistant3@school.edu.hk", "calendar":false},
    {"year":"Y08", "subject":"07SC102", "email":"assistant3@school.edu.hk", "calendar":false},
    {"year":"Y08", "subject":"07SC103", "email":"assistant3@school.edu.hk", "calendar":false},
    {"year":"Y08", "subject":"07SC104", "email":"assistant@school.edu.hk", "calendar":false},
  ];
  createEventsByYear('Y08', customLDTRegistrants, customAlternativeHost);
}

function createEventsY09(){
  /* Add LDTs and EAs no alert */
  var customLDTRegistrants = [
    //Same format as above
  ];

  /* Add Alternative Host with customized alert */
  var customAlternativeHost = [
    //Same format as above
  ];
  createEventsByYear('Y09', customLDTRegistrants, customAlternativeHost);
}

function createEventsY10(){
  /* Add LDTs and EAs no alert */
  var customLDTRegistrants = [
    //Same format as above
  ];

  /* Add Alternative Host with customized alert */
  var customAlternativeHost = [
    //Same format as above
  ];
  createEventsByYear('Y10', customLDTRegistrants, customAlternativeHost);
}

function createEventsY11(){
  /* Add LDTs and EAs no alert */
  var customLDTRegistrants = [
   //Same format as above
  ];

  /* Add Alternative Host with customized alert */
  var customAlternativeHost = [
    //Same format as above
  ];
  createEventsByYear('Y11', customLDTRegistrants, customAlternativeHost);
}

function createEventsY12(){
  /* Add LDTs and EAs no alert */
  var customLDTRegistrants = [
    //Same format as above
  ];

  /* Add Alternative Host with customized alert */
  var customAlternativeHost = [];
  createEventsByYear('Y12', customLDTRegistrants, customAlternativeHost);
}

function createClassY8(){
  createClassesByYear('Y08');
}

function createClassY9(){
  createClassesByYear('Y09');
}

function createClassY10(){
  createClassesByYear('Y10');
}

function createClassY11(){
  createClassesByYear('Y11');
}

function createClassY12(){
  createClassesByYear('Y12');
}

function createClassY13(){
  createClassesByYear('Y13');
}

function createEventsY13(){
  /* Add LDTs and EAs no alert */
  var customLDTRegistrants = [
    //Same format as above
  ];

  /* Add Alternative Host with customized alert */
  var customAlternativeHost = [];
  createEventsByYear('Y13', customLDTRegistrants, customAlternativeHost);
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Create Classes')
      .addItem('Y07', 'createY7')
      .addSeparator()
      .addToUi();
}

/* Step 1: Create the list of subject events to be created */
function createClassesByYear(year){
  /* Clear Range */
  clearRangeExisting(year);
  //clearRangeExisting("Participant Log");
  
  /* Set date manually start  
  var tomorrow = new Date('2020-08-12');
  var day = getDayMapping(tomorrow, year); */
  
  /* Current setting: tomorrow start */
  var today = new Date();
  var tomorrow = new Date();
  tomorrow.setDate(today.getDate()+1);
  var day = getDayMapping(tomorrow, year); 
  
  if(day > 0){
    if(isOnline(tomorrow, year)){
      var yearlevel = year.replace(/[A-Za-z$-]/g, "");
      var connection = Jdbc.getConnection("jdbc:mysql://MYSQLServerIP:Port/DatabaseName", "Username", "Password");
      var SQLstatement = connection.createStatement();
      var classlist = SQLstatement.executeQuery("SELECT distinct CONCAT(thtq.subj, LPAD(thtq.class, 2, '0')) AS subj_class, thtq.t1teach as teacher_key, sf.pref_name as prefname, sf.surname as surname, sf.sf_email as teacher_email, sf.user_field05 as meetOption, thtq.qcol as col, thtq.qrow as row FROM (((thtq LEFT JOIN stma ON thtq.ident = stma.ident AND stma.ttperiod = '"+ period +"') LEFT JOIN thtn ON (thtq.qkey = thtn.qkey AND thtq.qrow = thtn.label_number)) LEFT JOIN sf ON thtq.t1teach = sf.sfkey) LEFT JOIN su ON thtq.subj = su.sukey LEFT Join st on st.stkey=stma.skey WHERE thtq.qkey = '"+ qkey +"'  AND thtq.qcol="+ day +" AND left(thtq.subj, 2) = "+ yearlevel +" AND thtq.ident > 0 AND thtq.qrow > 0 AND thtq.qcol <= 10 AND thtq.t1teach != '' order by thtq.qcol, thtq.qrow, teacher_key, CONCAT(thtq.subj, LPAD(thtq.class, 2, '0'))");
      
      var ss = SpreadsheetApp.getActiveSpreadsheet();
      var sheet = ss.getSheetByName(year);
      var cell = sheet.getRange('A2');
      
      var scheduleSet = []; 
      var row = 0;
      while(classlist.next()){
        var subject = classlist.getString(1);
        var teacher = classlist.getString(2);
        var prefname = classlist.getString(3);
        var surname = classlist.getString(4);
        var email = classlist.getString(5);
        var period = classlist.getString(8);
        var start = getBlockStart(period);
        var end = getBlockEnd(period);
        var requestID = generateRequestID();
        
        scheduleSet.push({'subject': subject, 'start': start, 'end': end, 'teacher':teacher, 'prefname':prefname, 'surname':surname, 'email': email, 'requestID': requestID, 'period': period});
        row++;
      }
      SQLstatement.close();
      connection.close();
      
      var removedSet = [];
      var arr= scheduleSet, scheduleSetUniq = arr.filter(function (a) {
        var key = a.email + '|' + a.start + '|' + a.end + '|' + a.period; 
        if (!this[key]) {
          this[key] = true;
          return true;
        }else{
          removedSet.push(a);
        }
      }, Object.create(null));
      
      for(i in removedSet){
        var row = removedSet[i];
        var result = scheduleSetUniq.filter(function(v, i) {
          return ((v["teacher"] == row['teacher'] && v["start"] == row['start'] && v["end"] == row['end'] && v["period"] == row['period']));
        })
        result[0]['subject'] = result[0]['subject'] + "|" + row['subject'];
      } 
      
      var ctr = 0;
      for(i in scheduleSetUniq){
        var row = scheduleSetUniq[i];
        var subject = row['subject'];
        var teacher = row['teacher'];
        var prefname = row['prefname'];
        var surname = row['surname'];
        var email = row['email'];
        var period = row['period'];
        var start = row['start'];
        var end = row['end'];
        var requestID = 'Your Zoom Meeting Password';
        
        cell.offset(i, 0).setValue(subject);
        cell.offset(i, 1).setValue(start);
        cell.offset(i, 2).setValue(end);
        cell.offset(i, 3).setValue(teacher);
        cell.offset(i, 4).setValue(prefname);
        cell.offset(i, 5).setValue(surname);
        cell.offset(i, 6).setValue(email);
        cell.offset(i, 7).setValue(requestID);
      }
    }
  }
}

/* Step 2: Create the Zoom events based on the Daily Schedule Sheet */
function createEventsByYear(year, customLDTRegistrants, customAlternativeHost){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(year);
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
      var alternativeHosts = '';
      var ctr = 0;
      
      var plastrow = psheet.getLastRow() + 1; 
      var pcell = psheet.getRange('A' + plastrow);
      
      /* Add alternative host(s) */
      for(o in customAlternativeHost){
        var iscustomAlternativeHostInvited = "N";
        if(customAlternativeHost[o]['year'] == year){
          if(customAlternativeHost[o]['subject'] == row[0]){
            if(isZoomUser(customAlternativeHost[o]['email'])){
              alternativeHosts = customAlternativeHost[o]['email'];
              if(customAlternativeHost[o]['calendar']){
                googleAttendees.push({'email':customAlternativeHost[o]['email']});
              }
            }
          }
        }
      }
      alternativeHosts = 'assistant2@school.edu.hk';
      var info = {
          "start": tomorrowstr+"T"+row[1],
          "end": tomorrowstr+"T"+row[2],
          "organizer":row[6],
          "subject":row[0],
          "password": row[8],
          "email":row[6],
          "prefname":row[4],
          "surname":row[5],
          "waiting_room": true,
          "alternative_hosts": alternativeHosts
      };
      
      var attendees = getAttendees(info);
      var zoom_info = createZoomMeeting(info);

      for(var j = 0; j < attendees.length; j++) {
        var isAttendeeInvited = "N";
        if(attendees[j]['email'] != row[6]){
          if(isZoomUser(attendees[j]['email'])){
            addRegistrants(zoom_info['id'],attendees[j]);
            Logger.log("Add registrant: " + attendees[j]);
            isAttendeeInvited = "Y";
          }
        }   
        
        googleAttendees.push({'email':attendees[j]['email']});
        pcell.offset(ctr, 0).setValue(row[0]);
        pcell.offset(ctr, 1).setValue(zoom_info['join_url']);
        pcell.offset(ctr, 2).setValue(attendees[j]['email']);
        pcell.offset(ctr, 3).setValue(attendees[j]['prefname']);
        pcell.offset(ctr, 4).setValue(attendees[j]['surname']);
        pcell.offset(ctr, 5).setValue("Y");
        pcell.offset(ctr, 6).setValue(isAttendeeInvited);
        ctr++;
      }
      
      /*
      for(k in customRegistrants){
        for(m in customRegistrants[k]['users']){
          var iscustomRegistrantInvited = "N";
          if(isZoomUser(customRegistrants[k]['users'][m]['email'])){
            addRegistrants(zoom_info['id'],customRegistrants[k]['users'][m]);
            googleAttendees.push({'email':customRegistrants[k]['users'][m]['email']});
            iscustomRegistrantInvited = "Y";
          }
          pcell.offset(ctr, 0).setValue(row[0]);
          pcell.offset(ctr, 1).setValue(zoomlink);
          pcell.offset(ctr, 2).setValue(customRegistrants[k]['users'][m]['email']);
          pcell.offset(ctr, 3).setValue(customRegistrants[k]['users'][m]['prefname']);
          pcell.offset(ctr, 4).setValue(customRegistrants[k]['users'][m]['surname']);
          pcell.offset(ctr, 5).setValue("Y");
          pcell.offset(ctr, 6).setValue(iscustomRegistrantInvited);
          ctr++;
        }
      }*/
      
      for(n in customLDTRegistrants){
        var iscustomLDTRegistrantInvited = "N";
        if(isZoomUser(customLDTRegistrants[n]['email'])){
          addRegistrants(zoom_info['id'],customLDTRegistrants[n]);
          iscustomLDTRegistrantInvited = "Y";
        }
        pcell.offset(ctr, 0).setValue(row[0]);
        pcell.offset(ctr, 1).setValue(zoom_info['join_url']);
        pcell.offset(ctr, 2).setValue(customLDTRegistrants[n]['email']);
        pcell.offset(ctr, 3).setValue(customLDTRegistrants[n]['prefname']);
        pcell.offset(ctr, 4).setValue(customLDTRegistrants[n]['surname']);
        pcell.offset(ctr, 5).setValue("N");
        pcell.offset(ctr, 6).setValue(iscustomLDTRegistrantInvited);
        ctr++;
      }
      //sends meeting to calendar to participants
      var organizer_email = formatSchoolyear(year) + ".online@school.edu.hk";
      var event = {
        "summary": row[0],
        "guestsCanInviteOthers": false,
        "description": 'To join this Zoom meeting, please register and visit ' + zoom_info['join_url'] + '<br><br>Please choose Sign in via Google and use your school e-mail account.<br><br>Should you encounter any issue, please e-mail ICT at ict@school.edu.hk',
        "start": {
          'dateTime': tomorrowstr+"T"+row[1],
          'timeZone': 'Asia/Hong_Kong'
        },
        "end": {
          'dateTime': tomorrowstr+"T"+row[2],
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


function getAttendeeByEmail(s_email){
  var query = "SELECT * from online_users_sdk where s_email = '"+ s_email +"'";
  var resultSet = Jdbc.getConnection("jdbc:mysql://MySQLServerIP:PORT/Database", "UserName", "Password").createStatement().executeQuery(query);  
  var userSet = [];
  while(resultSet.next()){
    if(resultSet.getString(1) != ''){
      userSet.push({'email':resultSet.getString(3), 'prefname':resultSet.getString(2), 'surname': resultSet.getString(1)});
    }
  }
  return userSet;
}

function getAttendees(info){
  var courseQry = '';
  if(info['subject'].indexOf("|")>-1){
    var res = info['subject'].split("|");
    courseQry = "('" + res[0] + "','" + res[1] + "')";
  }else{
    courseQry = "('" + info['subject'] + "')";
  }
  var query = "SELECT distinct st.st_email as email,st.pref_name, st.surname FROM stma inner join st on st.stkey=stma.skey where status='FULL' AND stma.ttperiod='"+ period +"' AND concat(STMA.mkey,LPAD(STMA.class, 2, '0')) in " + courseQry;
  var resultSet = Jdbc.getConnection("jdbc:mysql://MySQLServerIP:PORT/Database", "UserName", "Password").createStatement().executeQuery(query);  
  var userSet = [{'email':info['email'], 'prefname':info['prefname'], 'surname':info['surname']}]
  while(resultSet.next()){
    if(resultSet.getString(1) != ''){
      userSet.push({'email': resultSet.getString(1), 'prefname': resultSet.getString(2), 'surname': resultSet.getString(3)});
    }
  }
  return userSet;
}


function getDayMapping(cdate, year){
  /* Retrieve Day Mapping */
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(year + "-Map");
 
  var cdatestr = Utilities.formatDate(cdate, 'Asia/Hong_Kong', 'yyyy-MM-dd');
  
  var startRow = 2; 
  var lastrow = sheet.getLastRow() + 1; 
  var dataRange = sheet.getRange(startRow, 1, lastrow-2, 2); 
  var data = dataRange.getValues();
  
  var col=0;
  for (i in data) {
    var row = data[i];
    /* get for tomorrow */
    if(row[0] == cdatestr){
      col = row[1];
      break;
    }    
  }
  return col;
}

function isOnline(cdate, year){
  /* Check if isOnline */
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(year + "-Map");
 
  var cdatestr = Utilities.formatDate(cdate, 'Asia/Hong_Kong', 'yyyy-MM-dd');
  
  var startRow = 2; 
  var lastrow = sheet.getLastRow() + 1; 
  var dataRange = sheet.getRange(startRow, 1, lastrow-2, 3); 
  var data = dataRange.getValues();
  
  var isOnline = false;
  for (i in data) {
    var row = data[i];
    /* get for tomorrow */
    if(row[0] == cdatestr){
      if(row[2] == 1){
        isOnline = true;
      }
    }    
  }
  return isOnline;
}

function clearRangeExisting(sheet) {
  var sheet = SpreadsheetApp.getActive().getSheetByName(sheet);
  sheet.getRange('A2:J1000').clearContent();
}

/**NEW**
LT      08:25 - 08:45
Block 1	08.50 - 10.30
Block 2	11.00 - 12:40
Block 3	13.30 - 15.10
*/
function getBlockStart(period){
  var start = '';
  switch(period){
    /* block LT */
    case '1': 
      start = "08:25:00";
      break;
    /* block 1 */
    case '2': 
      start = "09:40:00";
      break;
    /* block 2 */
    case '4': 
      start = "11:00:00";
      break;
    /* block 3 */
    case '6': 
      start = "13:30:00";
      break;
  }
  return start;
}

/**NEW**
LT      08:25 - 08:45
Block 1	08.50 - 10.30
Block 2	11.00 - 12:40
Block 3	13.30 - 15.10
*/
function getBlockEnd(period){
  var end = '';
  switch(period){
    /* block LT */
    case '1': 
      end = "09:30:00";
      break;
    /* block 1 */
    case '2': 
      end = "10:30:00";
      break;
    /* block 2 */
    case '4': 
      end = "12:40:00";
      break;
    /* block 3 */
    case '6': 
      end = "15:10:00";
      break;
  }
  return end;
}

function generateRequestID() {
  var requestID = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for(var i=0;i<8;i++){
    requestID += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return requestID;
}

function formatSchoolyear(year){
  var yearlevel = year.replace(/[A-Za-z$-]/g, "");
  if(yearlevel <= 9){
    yearlevel = year.toLowerCase().replace('0','');
  }else{
    yearlevel = year.toLowerCase();
  }
  return yearlevel;
}

