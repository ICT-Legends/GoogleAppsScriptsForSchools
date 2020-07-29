/* Format the school_year for the group naming */
function formatSchoolyear(school_year){
  var yearlevel = school_year.replace(/[A-Za-z$-]/g, "");
  if(yearlevel <= 9){
    return school_year.toLowerCase().replace('0','');
  }else{
    return school_year.toLowerCase();
  }
}

function generateSchoolyear(month, year){
  var currentdate = new Date();
  var past_year = parseInt(year) - 1;
  var next_year = parseInt(year) + 1;
  var schoolyear = '';
  if(month <= 12 && month >= 8){
    schoolyear = year.toString() + '-' + next_year.toString();
  }else{
    schoolyear = past_year.toString() + '-' + year.toString();
  }
  return schoolyear;
}