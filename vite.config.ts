import { ConfigEnv, defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default (mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd());
  return defineConfig({
    plugins: [vue()],
    base: mode.command === "serve" ? "./" : env.VITE_PUBLIC_PATH,
  });
};
