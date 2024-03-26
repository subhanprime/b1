import { LOCATION } from "../models/index";

const LocationRepository = {
  // Add a new location to database
  addLocation: (location: Object) => LOCATION.create(location),
  // Get a location through a query from database
  getLocation: (query: string[]) => LOCATION.find({ city: { $in: query } }),
};

export default LocationRepository;
