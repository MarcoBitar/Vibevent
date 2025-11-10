export class Event {
  constructor({eventid, clubid, eventtitle, eventdesc, eventdate, eventlocation, eventcdate, eventpic}) {
    this.eventid = eventid;
    this.clubid = clubid;
    this.eventtitle = eventtitle;
    this.eventdesc = eventdesc;
    this.eventdate = eventdate;
    this.eventlocation = eventlocation;
    this.eventcdate = eventcdate;
    this.eventpic = eventpic;
  }
}