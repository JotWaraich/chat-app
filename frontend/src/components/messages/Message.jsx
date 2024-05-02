import { useAuthContext } from "../../context/AuthContext";
import useConversation from "../../zustand/userConversation";
import { extractTime } from "../../utils/extractTime";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();
  const fromMe = message.senderId === authUser._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = fromMe ? "chat-end" : "chat-start";
  const profilePic = fromMe
    ? authUser.profilePicture
    : selectedConversation.profilePicture;
  const bubbleColor = fromMe ? "bg-blue-500" : "bg-gray-500";

  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img src={profilePic} alt="User Profile Pic" />
        </div>
      </div>
      <div
        className={`chat-bubble text-white ${bubbleColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className={`chat-footer opacity-50 text-xs flex gap-1 items-center`}>
        <span>{formattedTime}</span>
      </div>
    </div>
  );
};

export default Message;
