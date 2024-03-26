/**
 * ----------------------------------------------------------------
 * Interface for Business Model
 * ----------------------------------------------------------------
 */
interface IBusiness {
  logo?: string;
  businessName?: string;
  businessWebsite?: string;
  primaryEmailAddress?: string;
  businessCategory?: string[];
  description?: string;
  instagramHandler?: string;
  linkedInURL?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  accountManager?: object;
}

export default IBusiness;
