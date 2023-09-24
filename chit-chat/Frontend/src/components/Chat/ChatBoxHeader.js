/**
 * Chat Box Header
 * It takes below props
 * @param {string} userName - Username of the person whose chat box is active.
 * @param {string} lastSeen - Last Seen Of the user.
 * @param {string} profilePhotoUrl - (Optional) You can set the profile url also;
 * @returns Chat Box Header Component
 */
const ChatBoxHeader = (props) => {
  return (
    <div className="chat-header clearfix">
      <div className="row">
        <div className="col-lg-6">
          <a href="#" data-toggle="modal" data-target="#view_info">
            <img
              src={
                props.profilePhotoUrl ||
                "https://bootdey.com/img/Content/avatar/avatar2.png"
              }
              alt="avatar"
            />
          </a>
          <div className="chat-about">
            <h6 className="m-b-0">{props.userName || "Aiden Chavez"}</h6>
            <small>Last seen: {props.lastSeen || "2 hours ago"}</small>
          </div>
        </div>
        <div className="col-lg-6 hidden-sm text-right">
          <a href="#" className="btn btn-outline-secondary m-1">
            <i className="fa fa-camera"></i>
          </a>
          <a href="#" className="btn btn-outline-primary m-1">
            <i className="fa fa-image"></i>
          </a>
          <a href="#" className="btn btn-outline-info m-1">
            <i className="fa fa-cogs"></i>
          </a>
          <a href="#" className="btn btn-outline-warning m-1">
            <i className="fa fa-question"></i>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChatBoxHeader;
