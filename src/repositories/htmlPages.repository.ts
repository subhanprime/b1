/* eslint-disable @typescript-eslint/comma-dangle */
import { HTML_PAGES } from "../models/index";

const HtmlPageRepository = {
  // Get the html pages stored in database
  getHtmlPages: () => HTML_PAGES.findOne(),

  // Get selective html pages
  findHtmlPage: (field: string) => HTML_PAGES.findOne().select(field),
};

export default HtmlPageRepository;
