export class ClubAchDTO {
  constructor({ caid, clubid, achid, clubachdate }) {
    this.caid = caid;
    this.clubid = clubid;
    this.achid = achid;
    this.clubachdate = clubachdate;
  }

  static fromEntity(entity){
    return new ClubAchDTO(entity);
  }
}