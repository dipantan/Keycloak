import { RNKeycloak } from "@react-keycloak/native";

export const keycloak = new RNKeycloak({
  url: "http://localhost:8081/auth",
  realm: "ems",
  clientId: "admin",
});
