import request from "supertest";
import mockServer from "../setup/server.setup";

/**
 * ----------------------------------------------------------------
 * Unit Tests for Creation of Events
 * ----------------------------------------------------------------
 */

describe("Event Routes", () => {
  it("should create a new Event successfully", async () => {
    const response = await request(mockServer)
      .post("/api/events/")
      .send({
        event: {
          name: "Pendulum Test Event",
          description: "This is a test Description. Lorem Ippsum Gypsum",
          image: "https://pendulum-image.s3.amazonaws.com/fashionCategory.png",
          eventDate: "01-10-2024",
          eventTime: "13:00-15:00",
          addressLine1: "Random Address Lorem Ipsum Gypsum",
          addressLine2: "Random Address for line 2",
          city: "Lahore",
          country: "Pakistan",
          postalCode: "53710",
          coordinates:
            "sdkfjlksjfkljsdlkfjlsjflksdf, dsa312798372198719287491827",
          status: "Draft",
          category: "Sports",
          type: "Ticketed",
        },
        tickets: [
          {
            name: "ticket1",
            description: "This si a random description",
            availableTo: ["Black"],
            price: 200,
            quantityAvailable: 50,
          },
          {
            name: "ticket2",
            description: "This si a random description",
            availableTo: ["Standard"],
            price: 200,
            quantityAvailable: 50,
          },
        ],
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Created New Event Successfully",
    });
  });

  it("should throw error if missing fields or invalid fields", async () => {
    const response = await request(mockServer)
      .post("/api/events/")
      .send({
        event: {
          name: "Pendulum Test Event",
          description: "This is a test Description. Lorem Ippsum Gypsum",
          image: "https://pendulum-image.s3.amazonaws.com/fashionCategory.png",
          eventDate: "01-10-2024",
        },
        tickets: [
          {
            name: "ticket1",
            description: "This si a random description",
          },
          {
            name: "ticket2",
            description: "This si a random description",
          },
        ],
      });
    expect(response.status).toBe(400);
  });
});

/**
 * ----------------------------------------------------------------
 * Unit Tests for filtering events by dates
 * ----------------------------------------------------------------
 */

describe("should get events for the date range provided", () => {
  it("should return data for this week", async () => {
    const response = await request(mockServer).post("/api/events/dates").send({
      period: "This week",
    });
    expect(response.status).toBe(200);
  });
  it("should return data for this month", async () => {
    const response = await request(mockServer).post("/api/events/dates").send({
      period: "This month",
    });
    expect(response.status).toBe(200);
  });
  it("should return data for today", async () => {
    const response = await request(mockServer).post("/api/events/dates").send({
      period: "Today",
    });
    expect(response.status).toBe(200);
  });
  it("should return data for next month", async () => {
    const response = await request(mockServer).post("/api/events/dates").send({
      period: "Next month",
    });
    expect(response.status).toBe(200);
  });
  it("should return data for choose dates", async () => {
    const response = await request(mockServer)
      .post("/api/events/dates")
      .send({
        period: "Choose dates",
        range: {
          fromDate: "01-05-2024",
          toDate: "02-30-2024",
        },
      });
    expect(response.status).toBe(200);
  });

  it("should throw error for invalid fields", async () => {
    const response = await request(mockServer)
      .post("/api/events/dates")
      .send({});
    expect(response.status).toBe(400);
  });

  it("should throw error for invalid date pattern", async () => {
    const response = await request(mockServer)
      .post("/api/events/dates")
      .send({
        period: "Choose dates",
        range: {
          fromDate: "2024-10-02",
          toDate: "02-30-2024",
        },
      });
    expect(response.status).toBe(400);
  });
});

/**
 * ----------------------------------------------------------------
 * Unit Tests for fiiltering top events
 * ----------------------------------------------------------------
 */

describe("Should Return Top events which are flagged as top events", () => {
  it("should return top events", async () => {
    const response = await request(mockServer).post("/api/events/top").send();
    expect(response.status).toBe(200);
  });
  it("should return access events", async () => {
    const response = await request(mockServer)
      .post("/api/events/access")
      .send();
    expect(response.status).toBe(200);
  });
});
