var jwt_token = "Create your jwt token here: https://marketplace.zoom.us/develop/create";

function createZoomMeeting(info){
  var url = "https://api.zoom.us/v2/users/"+info['organizer']+"/meetings";
  var formData = {
    "topic": info['subject'],
    "type": 2,
    "start_time": info['start'],
    "timezone": "Asia/Hong_Kong",
    "duration": 100,
    "password": info['password'],
    "settings": {
      "host_video": true,
      "participant_video": true,
      "approval_type": 0,
      "enforce_login": true,
      "enforce_login_domains": "School.edu.hk", //Enter your zoom domain here must be the default authentication method
      "registrants_email_notification": false,
      "mute_upon_entry": true,
      "waiting_room":true,
      "alternative_hosts": info['alternative_hosts']
    }
  };
  var options = {
    "method": "post",
    "headers": {
      'Content-Type':'application/json',
      'Authorization': jwt_token
    },
    "payload": JSON.stringify(formData)
  };
  var response = UrlFetchApp.fetch(url, options);  
  var json = response.getContentText();
  var data = JSON.parse(json);
  return data;
}

function createCustomZoomMeeting(info){
  var url = "https://api.zoom.us/v2/users/"+info['organizer']+"/meetings";
  var formData = {
    "topic": info['subject'],
    "type": 2,
    "start_time": info['start'],
    "timezone": "Asia/Hong_Kong",
    "duration": info['duration'],
    "password": info['password'],
    "settings": {
      "host_video": true,
      "participant_video": true,
      "approval_type": 0,
      "enforce_login": true,
      "enforce_login_domains": "school.edu.hk", // Change to your zoom domain you must set authentication methods in zoom and this must be the default one
      "registrants_email_notification": false,
      "mute_upon_entry": true,
      "alternative_hosts": info['alternative_hosts']
    }
  };
  var options = {
    "method": "post",
    "headers": {
      'Content-Type':'application/json',
      'Authorization': jwt_token
    },
    "payload": JSON.stringify(formData)
  };
  var response = UrlFetchApp.fetch(url, options);  
  var json = response.getContentText();
  var data = JSON.parse(json);
  return data;
}

function addRegistrants(meetingId, user){
  var url = "https://api.zoom.us/v2/meetings/"+meetingId+"/registrants";
  var formData = {
    "email": user['email'],
    "first_name": user['prefname'],
    "last_name": user['surname']
  };
  var options = {
    "method": "post",
    "headers": {
      'Content-Type':'application/json',
      'Authorization': jwt_token
    },
    "payload": JSON.stringify(formData)
  };
  var response = UrlFetchApp.fetch(url, options); 
  var json = response.getContentText();
  var data = JSON.parse(json); 
}

function isWaitingRoomEnabled(subject){
  if(waitingRoomEnabledSubjects.indexOf(subject)+1){
    return true;
  }else{
    return false;
  }
}

/* Check if a user is a zoom user */
function isZoomUser(userId){
  var url = "https://api.zoom.us/v2/users/" + userId;
  var options = {
    "method": "get",
    "headers": {
      'Content-Type':'application/json',
      'Authorization': jwt_token
    }
  };
  try{
    var response = UrlFetchApp.fetch(url, options); 
    var json = response.getContentText();
    var data = JSON.parse(json);
    if(data["email"] == userId){
      return true;
    }
  }catch(e){
    return false;
  };
}

function addRegistrantsManually(){
  var meetingId = "451425542";
  var url = "https://api.zoom.us/v2/meetings/"+meetingId+"/registrants";
  /*
  Add users not scheduled in the class on the timetable
  var customUsers = [{"email":"custom1@school.edu.hk","prefname":"Custom", "surname":"1"}, 
    {"email":"custom2@school.edu.hk","prefname":"Custom", "surname":"2"}]; */
  var customUsers = [{"email":"administratorsemail@school.edu.hk","prefname":"Admin", "surname":"email"}];
  for(i in customUsers){
    addRegistrants(meetingId,customUsers[i]);  
  } 
}