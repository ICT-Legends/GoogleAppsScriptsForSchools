/* replace with your own from zoom I have altered this one. https://marketplace.zoom.us/develop/create */
var jwt_token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGci111iJIUzI1NiJ9.eyJcyI6IkdfVnNtVGF4UzB1b0hWMmRveUprBNMAUKKKll99OjE1OTI4OTc0MDAsImlhdCI6MTU4NzQ1ODgxNX0.V9H-LPhA_k859t9wJvEP1zdHOd_kaMvKyzRdoAUn97Y";

function createZoomMeeting(info){
  var url = "https://api.zoom.us/v2/users/"+info['organizer']+"/meetings";
  var formData = {
    "topic": info['subject'],
    "type": 2,
    "start_time": info['start'],
    "timezone": "Asia/Hong_Kong",
    "duration": 45,
    "password": 'dconline',
    "settings": {
      "host_video": true,
      "participant_video": true,
      "approval_type": 0,
      "enforce_login": true,
      "enforce_login_domains": "school.edu",
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
  var customUsers = [{"email":"adminEmail@school.edu","prefname":"Name", "surname":"SURNAME"}];
  for(i in customUsers){
    addRegistrants(meetingId,customUsers[i]);  
  } 
}