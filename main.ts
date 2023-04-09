import { serveDir, serveFile } from "https://deno.land/std@0.182.0/http/file_server.ts";

import { serve } from "https://deno.land/std@0.182.0/http/server.ts";

serve((req: Request) => {

  const pathname = new URL(req.url).pathname;

  if (pathname === "/simple_file") {

    return serveFile(req, "./index.html");
  }

  if (pathname.startsWith("/static")) {

    return serveDir(req, {
      fsRoot: "public",
      urlRoot: "static",
    });
  }

  return new Response("404: Not Found", {
    status: 404,
  });
});