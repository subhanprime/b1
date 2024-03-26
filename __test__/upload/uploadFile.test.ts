import request from "supertest";
import mockServer from "../setup/server.setup";
import * as path from "path";
import * as fs from "fs";
import FormData from "form-data";

describe("File Upload Testing", () => {
  it("should return error if no file is sent", async () => {
    const response = await request(mockServer).post("/api/events/upload");
    expect(response.status).toBe(400);
  });
  it("should upload file to s3 bucket and return uri", async () => {
    const filePath = path.join(__dirname, "randomImage.jpg");

    // Create a FormData object and append the file
    const formData = new FormData();
    formData.append("file", fs.createReadStream(filePath));

    const response = await request(mockServer)
      .post("/api/events/upload")
      .attach("file", filePath); // Attach the file using supertest's attach method

    expect(response.status).toBe(200);
    // Add more assertions based on the response from your server
  });
});
