export class Notification {
  constructor({notifid, userid, notiftype, notifcontent, notifstatus, notifcdate}) {
    this.notifid = notifid;
    this.userid = userid;
    this.notiftype = notiftype;
    this.notifcontent = notifcontent;
    this.notifstatus = notifstatus;
    this.notifcdate = notifcdate;
  }
}