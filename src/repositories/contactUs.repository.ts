import { CONTACT_US } from "../models/index";

const ContactUsRepository = {
  // Add a new enquiry to database
  addEnquiry: (body: Object) => CONTACT_US.create(body),
};

export default ContactUsRepository;
