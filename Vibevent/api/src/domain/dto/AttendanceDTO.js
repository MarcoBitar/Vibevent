export class AttendanceDTO {
  constructor({ attendid, userid, eventid, attendmethod, attendstatus, attendcdate }) {
    this.attendid = attendid;
    this.userid = userid;
    this.eventid = eventid;
    this.attendmethod = attendmethod;
    this.attendstatus = attendstatus;
    this.attendcdate = attendcdate;
  }

  static fromEntity(entity){
    return new AttendanceDTO(entity);
  }
}