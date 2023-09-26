import { useSelector } from "react-redux";
import { messageDateFormat } from "../../utils/dateUtil";

/**
 * It is a Message Item in message/chat box
 * it takes below props
 * @param {string} messageText - The message text.
 * @param {boolean} sentToUs - If message sent by user then false;
 * @param {string} profilePhotoUrl - (Optional) If sentToUs is true you can set the profile url also;
 * @returns Customized Message Item
 */
const MessageItem = (props) => {
  const currentUser = useSelector((state) => state.users.user);
  const sentToUs = !(props.userId === currentUser.id);
  const formattedDate = messageDateFormat(props.createdAt);
  const messageText = props.messageText;
  const profilePhotoUrl = props.profilePhotoUrl;
  return (
    <li className="clearfix">
      <div className={"message-data " + (sentToUs && "message-data-other")}>
        <span className="message-data-time">{formattedDate}</span>
        {sentToUs && (
          <img
            src={
              profilePhotoUrl ||
              "https://bootdey.com/img/Content/avatar/avatar7.png"
            }
            alt="avatar"
          />
        )}
      </div>
      <div
        className={
          "message " + (sentToUs ? "other-message float-right" : "my-message")
        }
      >
        {messageText || "Some dummy weird message"}
      </div>
    </li>
  );
};
export default MessageItem;
