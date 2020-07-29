/* Clear Rollgroup group - This script empties your groups so that they can be repopulated when you have updated your class groups in your sms. */

function clearRollgroupsMembers(){
  var groupkey = "";
  var query = "select distinct TRIM(LEADING '0' FROM roll_group) as roll_group from ST where roll_group != '' and substring(roll_group, 1,2) >= 3"; 
  rollgroupSet = Jdbc.getConnection("jdbc:mysql://222.16.227.81:3306/database", "user", "password").createStatement().executeQuery(query);  
  while(rollgroupSet.next()) {
    groupkey = rollgroupSet.getString(1) + '@school.edu.hk';
    var member = AdminDirectory.Members.list(groupkey).members;
    if(member){
      for (var i = 0; i < member.length; i++) {
        try{
          AdminDirectory.Members.remove(groupkey, member[i].email);
        }catch(e){
          Logger.log(e);
        }
      } 
      Logger.log('Cleared ' + groupkey);
    }else{Logger.log('No member on ' + groupkey);}      
  }
}

/* Clear House Group - This script empties your groups so that they can be repopulated when you have updated your house groups in your sms. */
function clearHouseMembers(){
  var houses = ['green', 'blue', 'red', 'yellow', 'purple'];
  var query = "select distinct school_year from ST where substring(school_year, 2,3) >= 3"; 
  var schoolyearSet = Jdbc.getConnection("jdbc:mysql://222.16.227.81:3306/database", "user", "password").createStatement().executeQuery(query);  
  
  while(schoolyearSet.next()) {
    var groupkey = '';
    for(var i = 0; i < houses.length; i++){
      groupkey = formatSchoolyear(schoolyearSet.getString(1)) + '_' + houses[i] +'@dschool.edu.hk';
      Logger.log(groupkey);
      var member = AdminDirectory.Members.list(groupkey).members;
      if(member){
        for (var i = 0; i < member.length; i++) {
          try{
            AdminDirectory.Members.remove(groupkey, member[i].email);
          }catch(e){
            Logger.log(e);
          }
        } 
        Logger.log('Cleared ' + groupkey);
      }else{Logger.log('No member on ' + groupkey);} 
    }
  }
}

/* Add current students to NEW rollgroup groups - Run after Gateway frozen */