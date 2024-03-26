import request from "supertest";
import mockServer from "../setup/server.setup";

describe("Express App", () => {
  it("should return welcome message on /", async () => {
    const response = await request(mockServer).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      message: "Welcome to the pendulum admin application.",
    });
  });

  it("should return healthcheck data on /healthcheck", async () => {
    const response = await request(mockServer).get("/healthcheck");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("uptime");
    expect(response.body).toHaveProperty("message", "Ok");
  });
});
