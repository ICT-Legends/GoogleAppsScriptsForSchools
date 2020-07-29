/* Please set variables, enter school year to be created and password. This will bulk create accounts for a group, e aware of timing and quotas, Our year groups are 120 students */
var school_year = 'Y03';
var password = 'dc201920';

function createStudentAccounts() {
 var query = "select 'student' as type, concat(web_login,'@school.edu.hk') as email, pref_name, surname, tag, house, TRIM(LEADING '0' FROM roll_group) as roll_group, entry, lw_date, web_login from ST where substring(school_year, 2,3) <= 3 and status in ('FULL', 'EXP') and tag >= 2028 and school_year='" + school_year +"' order by roll_group, surname";
 var studentSet = Jdbc.getConnection("jdbc:mysql://222.16.227.81:3306/database", "user", "password").createStatement().executeQuery(query);  
 if(studentSet){
    handleStudent(studentSet);
    //handleGroup(studentSet);
  }  
}

function createStudentAccountsByEntry() {
 var entry = '2020-06-01';
 var query = "select 'student' as type, concat(web_login,'@school.edu.hk') as email, pref_name, surname, tag, house, TRIM(LEADING '0' FROM roll_group) as roll_group, entry, lw_date, web_login from ST where substring(school_year, 2,3) <= 3 and status in ('FULL', 'EXP') and tag >= 2028 and entry='" + entry +"' order by roll_group, surname";
 var studentSet = Jdbc.getConnection("jdbc:mysql://222.16.227.81:3306/database", "user", "password").createStatement().executeQuery(query);  
 if(studentSet){
    handleStudent(studentSet);
    //handleGroup(studentSet);
  }  
}

function handleStudent(studentSet){
  var messageBody = '';
  while(studentSet.next()) {
    var userType = studentSet.getString(1);
    var email = studentSet.getString(2);
    var pref_name = studentSet.getString(3);
    var surname = studentSet.getString(4);
    var tag = studentSet.getString(5);
    var house = studentSet.getString(6);
    var roll_group = studentSet.getString(7);
    if(userType == 'student'){
      var orgUnitPath = '/Students/' + tag.replace('*', "");
    }
    var user = getByEmail(email);
    if(user == 0){
      if(messageBody == ''){
        messageBody = messageBody + ' Email account(s) created:<br>';
      }
      messageBody = messageBody + userType + ' - ' + pref_name + ' ' + surname + ' - ' + email + ' in class ' + roll_group +'<br>';
      addUser(email, password, pref_name, surname, orgUnitPath);
      createAlias(email, (pref_name).replace(/\s/g, "") + '.' + (surname).replace(/\s/g, "") + '@school.edu.hk'); 
      Logger.log("Student created: " + email);
      var dcCal = new Cal("School Calendar", "school.edu.hk_pk23n9ds25j3relj7eeesu6jnvhg@group.calendar.google.com");
      var dcPriCal = new Cal("School Primary","school.edu.hk_fo8mspjqcjcqr4bq9ceee43dvp8@group.calendar.google.com");
      var dcSecCal = new Cal("School Secondary","school.edu.hk_87r0vv1urppf0pjubeeepk70mlk@group.calendar.google.com");
      shareCalendar(dcCal.addr, email);       
      shareCalendar(dcPriCal.addr, email); 
      shareCalendar(dcSecCal.addr, email);       
    }else{ 
      if(user.suspended){
        resumeUser(email);
        moveUserToOrg(email, orgUnitPath);
      }
    } 
    var user = getByEmail(email);
    if(userType == 'student'){
      var groupkey = roll_group + '@school.edu.hk';
      try{
        AdminDirectory.Members.insert(user, groupkey);
        Logger.log("Student " + email + " addded to group: " + groupkey);
      }catch(e){
      }    
    }
  }
  if(messageBody == ''){}else{sendReportMailICT(messageBody);}
}  