/**
 * ----------------------------------------------------------------
 * Interface for Expo Notifications
 * ----------------------------------------------------------------
 */
interface INotificationMessage {
  to: string;
  sound: string;
  body: string;
  data: { [key: string]: string };
}

export default INotificationMessage;
