function getGroupSettings() {
  var groupArray = ['staff@dc.edu.hk', 'support_staff@dc.edu.hk','teachers@dc.edu.hk','y07_la@dc.edu.hk','y08_la@dc.edu.hk','y09_la@dc.edu.hk','y10_la@dc.edu.hk','y11_la@dc.edu.hk','y12_la@dc.edu.hk','y13_la@dc.edu.hk','y1_teachers@dc.edu.hk','y1ea@dc.edu.hk','y2_teachers@dc.edu.hk','y2ea@dc.edu.hk','y3_teachers@dc.edu.hk','y3_yellow@dc.edu.hk','y3ea@dc.edu.hk','y4_teachers@dc.edu.hk','y4ea@dc.edu.hk','y5_teachers@dc.edu.hk','y5ea@dc.edu.hk','y6_teachers@dc.edu.hk','yellow_staff@dc.edu.hk','blue_staff@dc.edu.hk', 'green_staff@dc.edu.hk', 'purple_staff@dc.edu.hk', 'red_staff@dc.edu.hk'];
  var groupId = [];
  var group = AdminGroupsSettings.newGroups();
for (var i = groupArray; i < groupArray.length ; i++) 
  {
    groupId(groupArray[i]);
    if  (group.spamModerationLevel != 'ALLOW')
      {
      group.spamModerationLevel = 'ALLOW';
      AdminGroupsSettings.Groups.patch(group, groupId);
      }
}
  
}

function updateGroupSettings() {
  var groupId = 'secondary_la@dc.edu.hk';
  var group = AdminGroupsSettings.newGroups();
  if
  (group.spamModerationLevel != 'ALLOW'){
  group.spamModerationLevel = 'ALLOW';
  AdminGroupsSettings.Groups.patch(group, groupId);
  }
}

function getGroups(groups){
  try {
    var group = AdminGroupsSettings.Groups.list(groupId); 
  } catch (e) {
    Logger.log(e);
    return 0;
  }  
  return group;
}