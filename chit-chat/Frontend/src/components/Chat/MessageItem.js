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
  // const fileUrl =
  //   "https://expensetrackerabhay.s3.amazonaws.com/Expense-Abhay+Hasrani-Sun+Sep+10+2023+21%3A58%3A04+GMT%2B0530+(India+Standard+Time).txt";
  const fileUrl = props.fileUrl;
  const fileName = props.fileName;
  const profilePhotoUrl = props.profilePhotoUrl;
  function createDownloadLink(fileUrl) {
    return (
      <>
        <a href={fileUrl} download={fileName} className="fs-2 ">
          <i className="fa fa-download" />
        </a>
        <p className="fw-bolder">{fileName}</p>
      </>
    );
  }
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
        {fileUrl && createDownloadLink(fileUrl)}
        {messageText || "Some dummy weird message"}
      </div>
    </li>
  );
};
export default MessageItem;
