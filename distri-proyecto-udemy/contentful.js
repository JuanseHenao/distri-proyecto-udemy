import { createClient } from "contentful";

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space: "xg0i8oe16h1i",
  accessToken: "Q18bj2cHDI5-lLcp_AbEX__KrO8DQdvk-J5xCVUoC-c",
});

export default client;
