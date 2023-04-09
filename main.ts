import {
  serveDir,
  serveFile,
} from "https://deno.land/std@0.182.0/http/file_server.ts";

import { serve } from "https://deno.land/std@0.182.0/http/server.ts";

import * as time from "./api/time.ts";

const text200 =  {
  status: 200,
  headers: {
    "Content-Type": "text/plain",
  },
};

const json200 =  {
  status: 200,
  headers: {
    "Content-Type": "application/json",
  },
};

serve((req: Request) => {
  const pathname = new URL(req.url).pathname;

  if (pathname === "/") {
    return serveFile(req, "./public/index.html");
  }

  if (pathname.startsWith("/public")) {
    return serveDir(req, {
      fsRoot: "public",
      urlRoot: "public",
    });
  }

  if (pathname.startsWith("/api")) {
    //get the path after /api
    const apiPath = pathname.replace("/api", "");
    if (apiPath === "/time") {
      return new Response(time.getDateTime(), json200);
    }
  }

  return new Response("404: Not Found", {
    status: 404,
  });
});
