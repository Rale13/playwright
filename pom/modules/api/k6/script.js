import http from "k6/http";
import { check } from "k6";
import { SharedArray } from "k6/data";
import { randomIntBetween } from "https://jslib.k6.io/k6-utils/1.2.0/index.js";
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export const options = {
  stages: [{ target: 10, duration: "10s" }],
};

const tokens = new SharedArray("token data", () => {
  return JSON.parse(
    open("/home/automaticity-01/Desktop/playwright/fixtures/tokens.json")
  );
});

export default async function () {
  const tokenData = tokens[randomIntBetween(0, 2)];
  const url = "https://automaticityacademy.ngrok.app/api/v1/products/";
  let req = http.get(url, {
    headers: {
      Accept: "application/json",
      authorization: `Bearer ${tokenData}`,
    },
  });

  check(req, {
    "is status 200": (r) => r.status === 200,
  });
}

export function handleSummary(data) {
  return {
    "summary.html": htmlReport(data), 
  };
}
