function emailQuotaRemaining() {
  var emailQuotaRemaining = MailApp.getRemainingDailyQuota();
  Logger.log("Remaining email quota: " + emailQuotaRemaining);
  return emailQuotaRemaining;
}

function sendReportMail(messageBody) {
  MailApp.sendEmail({
    to      : "admin@school.edu.hk",
    cc      : "",
    subject : "Batch Job Google Sync Daily Report",
    htmlBody: messageBody,
    noReply : true
  });
}

function sendReportMailICT(messageBody) {
  MailApp.sendEmail({
    to      : "admin@school.edu.hk",
    cc      : "",
    subject : "Batch Job Google Sync Daily Report",
    htmlBody: messageBody,
    noReply : true
  });
}

function sendUserMail(email, messageBody){
  MailApp.sendEmail({
    to      : email,
    bcc     : "admin@school.edu.hk",
    subject : "Google Account Suspension",
    htmlBody: messageBody,
    noReply : true
  });
}

function sendReportMailTest(subject, messageBody) {
  MailApp.sendEmail({
    to      : "admin@school.edu.hk",
    subject : subject,
    htmlBody: messageBody,
    noReply : true
  });
}