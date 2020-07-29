// Add user as reader
function test(){
  var dcCal = new Cal("School Calendar", "school.edu.hk_pk25n9ds23j3reljc7su6jnvhg@group.calendar.google.com");

  var rule = shareCalendar( dcCal.addr, email );
}

var Cal = function(name, addr){
  this.name = name;
  this.addr = addr;
};

/**
 * Set up calendar sharing for a single user. Refer to 
 * https://developers.google.com/google-apps/calendar/v3/reference/acl/insert.
 *
 * @param {string} calId   Calendar ID
 * @param {string} user    Email address to share with
 * @param {string} role    Optional permissions, default = "reader":
 *                         "none, "freeBusyReader", "reader", "writer", "owner"
 *
 * @returns {aclResource}  See https://developers.google.com/google-apps/calendar/v3/reference/acl#resource
 */
function shareCalendar( calId, user, role ) {
  role = role || "reader";

  var acl = null;

  // Check whether there is already a rule for this user
  try {
    var acl = Calendar.Acl.get(calId, "user:"+user);
  }
  catch (e) {
    // no existing acl record for this user - as expected. Carry on.
  }

  if (!acl) {
    // No existing rule - insert one.
    acl = {
      "scope": {
        "type": "user",
        "value": user
      },
      "role": role
    };
    var newRule = Calendar.Acl.insert(acl, calId);
  }
  else {
    // There was a rule for this user - update it.
    acl.role = role;
    newRule = Calendar.Acl.update(acl, calId, acl.id)
  }

  return newRule;
}

