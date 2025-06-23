import { serve } from "@hono/node-server";
import { Hono } from "hono";
import {
    createIPX,
    createIPXWebServer,
    ipxFSStorage,
    ipxHttpStorage,
} from "ipx";

const ipx = createIPX({
    storage: ipxFSStorage({ dir: "../client/public" }),
    // todo: which domain hosts my remote images? unsplash?
    httpStorage: ipxHttpStorage({
        domains: [],
    }),
});

// hono instance for image routes
const img = new Hono();

img.use("/optimize/*", async (c) => {
    const url = new URL(c.req.raw.url.replace(/\/optimize/, ""));
    return createIPXWebServer(ipx)(new Request(url));
});

// mount routes to main app
const app = new Hono();
app.route("/", img);

serve(
    {
        fetch: app.fetch,
        port: 3000,
    },
    (info) => {
        console.log(
            `image optimization server is running on http://localhost:${info.port}`
        );
    }
);
