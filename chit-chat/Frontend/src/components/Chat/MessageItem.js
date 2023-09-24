import { useSelector } from "react-redux";
import { messageDateFormat } from "../../utils/dateUtil";

/**
 * It is a Message Item in message/chat box
 * it takes below props
 * @param {string} messageText - The message text.
 * @param {boolean} sentByOther - If message sent by user then false;
 * @param {string} profilePhotoUrl - (Optional) If sentByOther is true you can set the profile url also;
 * @returns Customized Message Item
 */
const MessageItem = (props) => {
  const currentUser = useSelector((state) => state.users.user);
  const sentByOther = props.receiverId === currentUser.id;
  const formattedDate = messageDateFormat(props.createdAt);
  return (
    <li className="clearfix">
      <div className={"message-data " + (sentByOther && "message-data-other")}>
        <span className="message-data-time">
          {formattedDate}
        </span>
        {sentByOther && (
          <img
            src={
              props.profilePhotoUrl ||
              "https://bootdey.com/img/Content/avatar/avatar7.png"
            }
            alt="avatar"
          />
        )}
      </div>
      <div
        className={
          "message " +
          (sentByOther ? "other-message float-right" : "my-message")
        }
      >
        {props.messageText || "Some dummy weird message"}
      </div>
    </li>
  );
};
export default MessageItem;
