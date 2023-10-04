import dotenv from "dotenv";
import { Redis } from "ioredis";

dotenv.config();

const inputCity = document.querySelector(".location-input");

const getRedisURL = () => {
  if (process.env.REDIS_URL) {
    return process.env.REDIS_URL;
  }
  throw new Error("redis url not found");
};

export const redis = new Redis(getRedisURL());
