import { Document } from "mongoose";
import EventStatus from "../constants/enums/eventStatus.enum";
import EventCategories from "../constants/enums/eventCategory.enum";
import EventType from "../constants/enums/eventType.enum";
/**
 * ----------------------------------------------------------------
 * Interface for Event model
 * ----------------------------------------------------------------
 */
interface IEventDocument extends Document {
  name?: string;
  description?: string;
  pageImage?: string;
  image?: string;
  feedImage?: string;
  eventDate?: Date;
  eventTime?: string;
  startTime?: Date;
  endTime?: Date;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  latitudes?: number;
  longitudes?: number;
  status?: EventStatus;
  category?: EventCategories;
  type?: EventType;
  availableTo?: string[];
  ticketId?: string[];
  topEvent?: boolean;
  displayOnAccess?: boolean;
  membershipType?: string;
}

export default IEventDocument;
