/**
 * It is a suser List item for the all connected in message/chat box
 * it takes below props
 * @param {string} userName - The name of the person.
 * @param {boolean} status - If online set true;
 * @param {string} lastSeen - Last Seen Of the user.
 * @param {boolean} active -  To set current as selected;
 * @param {string} profilePhotoUrl - (Optional) You can set the profile url also;
 * @returns Customized user List  Item
 */

const UsersListItem = (props) => {
  return (
    <li className={"clearfix " + (props.active && "active")}>
      <img
        src={
          props.profilePhotoUrl ||
          "https://bootdey.com/img/Content/avatar/avatar2.png"
        }
        alt="avatar"
      />
      <div className="about">
        <div className="name">{props.userName || "Aiden Chavez"}</div>
        <div className="status">
          {" "}
          <i className={"fa fa-circle " + (props.status?"online":"offline")}></i>
          {" " +props.lastSeen}
        </div>
      </div>
    </li>
  );
};
export default UsersListItem;
