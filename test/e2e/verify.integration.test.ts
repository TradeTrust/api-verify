import request from "supertest";
import { ropstenDocument, ropstenResponse } from "../fixtures/sampleDocument";
import { tamperedDocument, tamperedResponse } from "../fixtures/tamperedDocument";

const API_ENDPOINT = process.env.ENDPOINT || "http://localhost:3000/";

describe("verify", () => {
  beforeEach(() => {
    jest.setTimeout(10000);
  });

  test("should works for valid Ropsten document", async () => {
    await request(API_ENDPOINT)
      .post("/")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(ropstenDocument)
      .expect("Content-Type", /application\/json/)
      .expect(200)
      .expect(res => {
        expect(res.body).toStrictEqual(ropstenResponse);
      });
  });

  test("should not works for invalid document", async () => {
    await request(API_ENDPOINT)
      .post("/")
      .set("Content-Type", "application/json")
      .set("Accept", "application/json")
      .send(tamperedDocument)
      .expect("Content-Type", /application\/json/)
      .expect(200)
      .expect(res => {
        expect(res.body).toStrictEqual(tamperedResponse);
      });
  });
});
