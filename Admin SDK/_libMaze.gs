function run(query){
  var resultSet = Jdbc.getConnection("jdbc:mysql://222.126.222.81:3306/database", "user", "password").createStatement().executeQuery(query),
      userSet = [];
  while(resultSet.next()) {
    userSet.push({'type'       : resultSet.getString(1),
                  'email'      : resultSet.getString(2),
                  'pref_name'  : resultSet.getString(3),
                  'surname'    : resultSet.getString(4), 
                  'school_year': resultSet.getString(5),
                  'tag'        : resultSet.getString(6),
                  'house'      : resultSet.getString(7),
                  'roll_group' : resultSet.getString(8),
                  'entry'      : resultSet.getString(9),
                  'lw_date'    : resultSet.getString(10),
                  'web_login'  : resultSet.getString(11)
                 });
  }
  return userSet;
}


/* Connects to mysql database and pulls out the information needed to create accounts and assigne to groups */