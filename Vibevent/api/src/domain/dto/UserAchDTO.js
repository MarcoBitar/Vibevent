export class UserAchDTO {
  constructor({ uaid, userid, achid, userachdate }) {
    this.uaid = uaid;
    this.userid = userid;
    this.achid = achid;
    this.userachdate = userachdate;
  }

  static fromEntity(entity){
    return new UserAchDTO(entity);
  }
}