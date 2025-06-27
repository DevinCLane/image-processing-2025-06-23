# Image Processing Service

This is a demo image processing tool with a React frontend (using Vite) and a Hono + IPX backend.

-   The backend fetches 100 images from [Picsum Photos](https://picsum.photos/)
-   The frontend displays each original photo (scaled down to fit the screen), plus two optimized versions:
    -   Banner size
    -   Square thumbnail
-   Both images are converted to WebP format.

## Run locally

In the root, run:

```
npm run dev
```

This is setup as a monorepo with NPM workspaces so the above command runs `npm run dev` in both the `apps/server` and `apps/client` folder
