export class UserDTO {
  constructor({ userid, username, useremail, userpass, userpoints, usercdate, userpic }) {
    this.userid = userid;
    this.username = username;
    this.useremail = useremail;
    this.userpass = userpass;
    this.userpoints = userpoints;
    this.usercdate = usercdate;
    this.userpic = userpic;
  }

  static fromEntity(entity){
    return new UserDTO(entity);
  }
}