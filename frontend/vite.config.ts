import { defineConfig } from "vite";
import { exec, ExecException } from "child_process";

export default defineConfig({
    plugins: [openapiTsWatcher()],
});

function openapiTsWatcher() {
    return {
        name: "openapi-ts-watcher",
        buildStart(id) {
            exec("npm run openapi-ts -- -w", (error: ExecException | null, stdout: string, stderr: string) => {
                if (stdout) {
                    console.log(stdout);
                }
                if (stderr) {
                    console.error(stderr);
                }
                if (error) {
                    console.error(error);
                }
            });
        },
    };
}
