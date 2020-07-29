/* Retrieve a user resources in the domain */
function getByEmail(email){
  try {
    var user = AdminDirectory.Users.get(email);

  } catch (e) {
    Logger.log(e);
    return 0;
  }  
  return user;
}

/* Alias a user email address */
function createAlias(userEmail, alias) {
  var x = {
    alias: alias
  };  
  try {
    alias = AdminDirectory.Users.Aliases.insert(x, userEmail);
  } catch (e) {
    Logger.log(e);
    return e;
  }
  Logger.log('Created alias %s for user %s.', x.alias, userEmail);
}

/**
 * Adds a new user to the domain, including only the required information. For
 * the full list of user fields, see the API's reference documentation:
 * https://developers.google.com/admin-sdk/directory/v1/reference/users/insert
 */
function addUser(primaryEmail, password, givenName, familyName, orgUnitPath) {
  var user = {
    primaryEmail: primaryEmail,
    name: {
      givenName: givenName,
      familyName: familyName
    },
    // Generate a random password string.
    // password: Math.random().toString(36)
    password: password,
    changePasswordAtNextLogin: false,
    orgUnitPath: orgUnitPath,
    includeInGlobalAddressList: true,
    isMailboxSetup: true    
  };
  user = AdminDirectory.Users.insert(user);
  Logger.log('User %s created with ID %s.', user.primaryEmail, user.id);
  Logger.log('%s %s > %s', givenName, familyName, orgUnitPath );
}


/**
 * Adds a user to an existing group in the domain.
 */
function addGroupMember(userEmail, groupEmail) {
  var member = {
    email: userEmail,
    role: 'MEMBER'
  };
  member = AdminDirectory.Members.insert(member, groupEmail);
  Logger.log('User %s added as a member of group %s.', userEmail, groupEmail);
}

/**
 * Delete a user in the domain.
 */
function deleteUser(userEmail) {
  try{
    AdminDirectory.Users.remove(userEmail);
    return 1;
  }catch(e){
    Logger.log(e);
    return 0;
  }
}

/**
 * Rename a user primary email address and alias the old one.
 */
function renameUser(userEmail, newEmail){
  var user = getByEmail(userEmail);
  user.primaryEmail = newEmail;
  try{
    AdminDirectory.Users.update(user, userEmail);
  }catch(e){
    Logger.log(e);
  }  
}

/**
 * Move a user to another organization path
 */
function moveUserToOrg(userEmail, orgUnitPath){
  var user = getByEmail(userEmail);
  user.orgUnitPath = orgUnitPath;
  try{
    AdminDirectory.Users.update(user, userEmail);
  }catch(e){
    Logger.log(e);
  }  
}

/**
 * Update User Password
 */
function updateUserPassword(userEmail, newPassword){
  var user = getByEmail(userEmail);
  user.password = newPassword;
  try{
    AdminDirectory.Users.update(user, userEmail);
  }catch(e){
    Logger.log(e);
  }  
}

/* Self generating password based on entry */
/* If entry is July, old SY password  */
/* If entry is August, new SY password already  */
function generatePassword(month, year){
  var past_year = parseInt(year) - 1;
  var next_year = parseInt(year) + 1;
  var schoolyear = '';
  if(month <= 12 && month >= 8){
    password = 'dc_' + year.toString() + next_year.toString().substring(2,4);
  }else{
    password = 'dc_' + past_year.toString() + year.toString().substring(2,4);
  }
  Logger.log(password);
  return password;
}

/* Suspend a user */
function suspendUser(userEmail){
  var user = getByEmail(userEmail);
  user.suspended = true;
  try{
    AdminDirectory.Users.update(user, userEmail);
  }catch(e){
    Logger.log(e);
  }  
}

/* Resume a suspended user */ 
function resumeUser(userEmail){
  var user = getByEmail(userEmail);
  user.suspended = false;
  try{
    AdminDirectory.Users.update(user, userEmail);
  }catch(e){
    Logger.log(e);
  }  
}