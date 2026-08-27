import type { Config } from "@react-router/dev/config";

export default {
  basename: "/",
  // Nessun server: le pagine sono generate staticamente in build.
  ssr: false,
} satisfies Config;
