/* eslint-disable no-await-in-loop */
/* eslint-disable @typescript-eslint/comma-dangle */
import { ExpoPushMessage } from "expo-server-sdk";
import expoServer from "../helpers/expo.helpers";
import INotificationMessage from "../interfaces/notificationMessage.interface";

// Send notification to Mobile Application by recieving their expoToken
const sendNotification = async (data: INotificationMessage) => {
  const expo = expoServer;

  // Creating chunks for sending notification in batches if needed
  // Need to update the data field
  const chunks = expo.chunkPushNotifications([{ ...data } as ExpoPushMessage]);
  const tickets = [];

  /**
   * Expo only allows sending notifications in batches/chunks
   * therefore using a single generic fucntion for sending notifications
   * for both batches and 1 request
   * As mentioned in the Docs
   * https://github.com/expo/expo-server-sdk-node
   */
  for (const chunk of chunks) {
    try {
      // Sending noitification chunk by chunk
      const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      // Saving notification ticket (for error handling e.g "DeviceNotRegistered")
      tickets.push(...ticketChunk);
    } catch (error) {
      console.error(error);
    }
  }

  let response = "";

  //  Handling If DeviceNotRegistered error, revoked permission or deleted applcation
  for (const ticket of tickets) {
    if (ticket.status === "error") {
      if (ticket.details && ticket.details.error === "DeviceNotRegistered") {
        response = "DeviceNotRegistered";
      }
    }

    if (ticket.status === "ok") {
      response = ticket.id;
    }
  }

  console.log("Response: ", response);

  return response;
};

// Retrieving Notification reciept by passing ticket.id returned from sendNotification
// For confirming if notification was sent and error handling
const getReceipt = async (receiptId: string) => {
  const expo = expoServer;

  const receiptIdChunks = expo.chunkPushNotificationReceiptIds([receiptId]);

  let receipt;

  for (const chunk of receiptIdChunks) {
    try {
      receipt = await expo.getPushNotificationReceiptsAsync(chunk);
    } catch (error) {
      console.error(error);
    }
  }

  return receipt ? receipt[receiptId] : null;
};

export { sendNotification, getReceipt };
