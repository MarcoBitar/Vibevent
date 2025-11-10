export class Attendance {
  constructor({attendid, userid, eventid, attendmethod, attendstatus, attendcdate}) {
    this.attendid = attendid;
    this.userid = userid;
    this.eventid = eventid;
    this.attendmethod = attendmethod;
    this.attendstatus = attendstatus;
    this.attenddate = attendcdate;
  }
}