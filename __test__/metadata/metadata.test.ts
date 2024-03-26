import request from "supertest";
import mockServer from "../setup/server.setup";

jest.mock("../../src/services/metadata.service", () => ({
  __esModule: true,
  ...jest.requireActual("../../src/services/metadata.service"), // Keep the original functions from the actual module
  getEventStatusService: jest.fn(() => {
    if ((global as any).mockErrorCondition) {
      throw new Error("Simulated error from getEventStatusService");
    }
    return ["Mocked", "Values"];
  }),
  getEventTypeService: jest.fn(() => {
    if ((global as any).mockErrorCondition) {
      throw new Error("Simulated error from getEventTypeService");
    }
    return ["Mocked", "EventType", "Values"];
  }),
  getMembershipTypeService: jest.fn(() => {
    if ((global as any).mockErrorCondition) {
      throw new Error("Simulated error from getMembershipTypeService");
    }
    return ["Mocked", "MembershipType", "Values"];
  }),
  getCategoriesService: jest.fn(() => {
    if ((global as any).mockErrorCondition) {
      throw new Error("Simulated error from getCategoriesService");
    }
    return ["Mocked", "EventCategory", "Values"];
  }),
}));

describe("Express App", () => {
  /**
   *================================================================
                Testing for Event Status
    ================================================================
   */
  it("should return string of EventStatus", async () => {
    const response = await request(mockServer).get("/api/events/status");
    expect(response.status).toBe(200);
  });

  it("should handle errors and return a proper response", async () => {
    // Set the global condition to trigger the error in the mock
    (global as any).mockErrorCondition = true;

    const response = await request(mockServer).get("/api/events/status");
    expect(response.status).toBe(500);

    // Reset the global condition after the test
    (global as any).mockErrorCondition = false;
  });

  /**
   *================================================================
                Testing for Event Types
    ================================================================
   */
  it("should return string of Event Types", async () => {
    const response = await request(mockServer).get("/api/events/type");
    expect(response.status).toBe(200);
  });

  it("should handle errors and return a proper response", async () => {
    // Set the global condition to trigger the error in the mock
    (global as any).mockErrorCondition = true;

    const response = await request(mockServer).get("/api/events/type");
    expect(response.status).toBe(500);

    // Reset the global condition after the test
    (global as any).mockErrorCondition = false;
  });

  /**
   *================================================================
                Testing for Membership Types
    ================================================================
   */
  it("should return string of Membership Types", async () => {
    const response = await request(mockServer).get(
      "/api/events/membership/type"
    );
    expect(response.status).toBe(200);
  });

  it("should handle errors and return a proper response", async () => {
    // Set the global condition to trigger the error in the mock
    (global as any).mockErrorCondition = true;

    const response = await request(mockServer).get(
      "/api/events/membership/type"
    );
    expect(response.status).toBe(500);

    // Reset the global condition after the test
    (global as any).mockErrorCondition = false;
  });

  /**
   *================================================================
                Testing for Event Categories
    ================================================================
   */
  it("should return string of Categories", async () => {
    const response = await request(mockServer).get("/api/events/category");
    expect(response.status).toBe(200);
  });

  it("should handle errors and return a proper response", async () => {
    // Set the global condition to trigger the error in the mock
    (global as any).mockErrorCondition = true;

    const response = await request(mockServer).get("/api/events/category");
    expect(response.status).toBe(500);

    // Reset the global condition after the test
    (global as any).mockErrorCondition = false;
  });
});
