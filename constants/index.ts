import { RNKeycloak } from "@react-keycloak/native";

export const keycloak = new RNKeycloak({
  url: "http://192.168.1.2:8081",
  realm: "ems",
  clientId: "dipantan-ems",
});
