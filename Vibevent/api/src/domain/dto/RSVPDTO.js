export class RSVPDTO {
  constructor({ rsvpid, rsvpstatus, rsvpcdate, userid, eventid }) {
    this.rsvpid = rsvpid;
    this.rsvpstatus = rsvpstatus;
    this.rsvpcdate = rsvpcdate;
    this.userid = userid;
    this.eventid = eventid;
  }

  static fromEntity(entity){
    return new RSVPDTO(entity);
  }
}