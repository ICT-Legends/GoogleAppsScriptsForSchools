function getByEmail(email){
  try {
    var user = AdminDirectory.Users.get(email);

  } catch (e) {
    Logger.log(e);
    return 0;
  }  
  return user;
}