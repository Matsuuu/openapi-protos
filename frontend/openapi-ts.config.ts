import { defineConfig } from "@hey-api/openapi-ts";

export default defineConfig({
    client: "@hey-api/client-fetch",
    input: "http://localhost:8080/q/openapi?format=json",
    output: "src/api",
});
