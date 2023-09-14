import './ErrorFromApi.css';

function ErrorFromApi({ message, isActive }) {
  return (
    <span className={`error-from-api ${isActive ? 'error-from-api_active' : ''}`}>{message}</span>
  );
}

export default ErrorFromApi;