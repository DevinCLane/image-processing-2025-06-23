import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import {
    createIPX,
    createIPXWebServer,
    ipxFSStorage,
    ipxHttpStorage,
} from "ipx";

const ipx = createIPX({
    storage: ipxFSStorage({ dir: "../client/public" }),
    httpStorage: ipxHttpStorage({
        domains: ["picsum.photos"],
    }),
});

// hono instance for image routes
const img = new Hono();
img.use(cors());

img.use("/optimize/*", async (c) => {
    const url = new URL(c.req.raw.url.replace(/\/optimize/, ""));
    return createIPXWebServer(ipx)(new Request(url));
});

img.get("/api/images", async (c) => {
    try {
        const res = await fetch(
            "https://picsum.photos/v2/list?page=1&limit=100"
        );
        if (!res.ok) {
            throw new Error(`Response status: ${res.status}`);
        }
        const images = await res.json();
        return c.json(images);
    } catch (error) {
        console.error(error);
    }
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
