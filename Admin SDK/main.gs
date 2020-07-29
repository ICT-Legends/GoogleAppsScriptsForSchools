/* This handles account creation based on a query that is referenced from the database settings in the file _libMaze it is looking for a date of entry field to judge when to create the account.*/
function mainStaff(){
  var staffSet = run("select type, email, pref_name, surname, school_year, tag, house, roll_group, entry, lw_date, status from admin_sdk where type = 'staff' and (entry > (curdate() - interval 5 day)) and status in ('T', 'N') and email <>'@school.edu.hk' and surname <>'DELETE' order by surname ");
  if(staffSet){
    handleUser(staffSet);
    handleGroup(staffSet);
  }
}

function mainStudent(){
  var studentSet = run("select type, email, pref_name, surname, school_year, tag, house, TRIM(LEADING '0' FROM roll_group) as roll_group, entry, lw_date, status from admin_sdk where type = 'student' and (entry > (curdate() - interval 5 day)) order by surname");
  if(studentSet){
    handleUser(studentSet);
    handleGroup(studentSet);
  }  
}

function handleUser(userSet){
  var messageBody = '';
  for (var i = 0; i < userSet.length; i++) { 
    if(userSet[i].type == 'student'){
      var orgUnitPath = '/Students/' + userSet[i].tag.replace('*', "");
    }else{
      var orgUnitPath = '/Staff/To be moved';
    }
    var user = getByEmail(userSet[i].email);
    if(user == 0){
      if(messageBody == ''){
        messageBody = messageBody + ' Email account(s) created:<br>';
      }
      messageBody = messageBody + userSet[i].type + ' - ' + userSet[i].pref_name + ' ' + userSet[i].surname + ' - will start on ' + userSet[i].entry + ' - ' + userSet[i].email + ' in class ' + userSet[i].roll_group +'<br>';
      Logger.log('%s not found', userSet[i].email + ', entry: ' + userSet[i].entry);  
      var date = userSet[i].entry.substring(0,10).replace('-', "").replace('-', "");
      var entrydate = userSet[i].entry.substring(0,10);
      var month = entrydate.substring(5,7);
      var year = entrydate.substring(0, 4);
      var password = generatePassword(month, year);
      addUser(userSet[i].email, password, userSet[i].pref_name, userSet[i].surname, orgUnitPath);
      createAlias(userSet[i].email, (userSet[i].pref_name).replace(/\s/g, "") + '.' + (userSet[i].surname).replace(/\s/g, "") + '@school.edu.hk');  
      var dcCal = new Cal("School", "dc.edu.hk_pk23n9ds25j3reljc7su6jnvhg@g768roup.calendar.google.com");
      var dcPriCal = new Cal("School Primary","dc.edu.hk_fo8mspjq876cjcqr4bq9cei43dvp8@group.calendar.google.com");
      var dcSecCal = new Cal("School Secondary","dc.edu.hk_87r0vv1889urppf0pjubqgpk70mlk@group.calendar.google.com");
      shareCalendar(dcCal.addr, userSet[i].email);       
      shareCalendar(dcPriCal.addr, userSet[i].email); 
      shareCalendar(dcSecCal.addr, userSet[i].email);       
      if(userSet[i].type == 'staff'){
        try{
          var dcStaffCal = new Cal("School Staff", "dc.edu.hk_iae1c32l4dpriav87554407enbvi54rk@group.calendar.google.com");
          shareCalendar(dcStaffCal.addr, userSet[i].email);
        }catch(e){
        }      
      }
    }else{ 
      if(user.suspended){
        resumeUser(userSet[i].email);
        moveUserToOrg(userSet[i].email, orgUnitPath);
      }
      Logger.log(userSet[i].pref_name + ' ' + userSet[i].surname + ' found as ' + userSet[i].type);
    }           
    if(userSet[i].type == 'student'){
      var groupkey = userSet[i].roll_group + '@school.edu.hk';
      try{
        AdminDirectory.Members.insert(user, groupkey);
      }catch(e){
      }    
    }
  }
  if(messageBody == ''){}else{sendReportMail(messageBody);}
}  

function handleGroup(userSet){
  for (var i = 0; i < userSet.length; i++) { 
    handleGroupHouse(userSet[i]);
  }  
}

function handleGroupHouse(user){
  if(user.type == 'student'){
    var group = '';
    if(user.school_year != '' && user.house != ''){
      group += formatSchoolyear(user.school_year) + "_";
      switch(user.house){
        case "BLUE": group += "blue";   break;
        case "GREN": group += "green";  break; 
        case "RED" : group += "red";    break; 
        case "YELL": group += "yellow"; break;  
        case "PURP": group += "purple"; break;                 
      } 
      if(group != ""){
        group += "@school.edu.hk";
        var member = AdminDirectory.Members.hasMember(group, user.email);
        if(!member.isMember){
          try{
            addGroupMember(user.email, group);
            Logger.log("Add user " + user.email + " to " + group);
          }catch(e){
          }
        }
        Utilities.sleep(1000);        
      }
    }
  }else{
    var group = '';
    switch(user.house){
      case "BLUE": group += "blue_staff";   break;
      case "GREN": group += "green_staff";  break; 
      case "RED" : group += "red_staff";    break; 
      case "YELL": group += "yellow_staff"; break;  
      case "PURP": group += "purple_staff"; break;                 
    }     
    if(group != ""){
      group += "@school.edu.hk";
      var member = AdminDirectory.Members.hasMember(group, user.email);
      if(!member.isMember){
        try{
          addGroupMember(user.email, group);
          Logger.log("Add user " + user.email + " to " + group);
        }catch(e){
        }
      }
      Utilities.sleep(1000);
    }
  }  
}
