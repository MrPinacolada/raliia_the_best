import { type NuxtConfig } from "@nuxt/types";

declare module "@nuxt/types" {
  interface NuxtConfig {
    buildModules?: string[];
  }
}
const nuxtConfig: NuxtConfig = {
  components: [
    {
      path: "~/components",
      pathPrefix: false,
      global: true,
    },
  ],
  plugins: [{ src: "~/plugins/lottie.ts", mode: "client" }],

  app: {
    head: {
      title: "Love you!",
      link: [],
    },
  },

  ssr: false,
  router: {
    options: {
      linkActiveClass: "active",
      hashMode: true,
    },
    base: "/",
    routes: [
      {
        name: "index",
        path: "/",
        component: () => import("~/pages/index.vue"),
      },
    ],
  },
  runtimeConfig: {
    public: {
      devtools: {
        enabled: true,
      },
    },
  },
};
export default nuxtConfig as NuxtConfig;
