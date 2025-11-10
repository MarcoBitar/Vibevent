export class AchievementDTO {
  constructor({ achid, achtitle, achdesc, achbadge, achpointsreq, achcdate }) {
    this.achid = achid;
    this.achtitle = achtitle;
    this.achdesc = achdesc;
    this.achbadge = achbadge;
    this.achpointsreq = achpointsreq;
    this.achcdate = achcdate;
  }

  static fromEntity(entity){
    return new AchievementDTO(entity);
  }
}