import './MessageFromApi.css';

function MessageFromApi({ message, isSuccess = false }) {
  return (
    <span className={`message-from-api ${isSuccess ? 'message-from-api_type_success' : ''}`}>{message}</span>
  );
}

export default MessageFromApi;