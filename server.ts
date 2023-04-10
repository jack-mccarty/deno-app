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

  if(pathname === "/denoserver") {
    return serveFile(req, "./public/denoserver.html");
  }


  //serve the public directory  
  if (pathname.startsWith("/public")) {
    return serveDir(req, {
      fsRoot: "public",
      urlRoot: "public",
    });
  }

    //serve the apis
  if (pathname.startsWith("/api")) {
    //sple the pathname into an array
    const path = pathname.split("/");
    if(path[2] === "time") {
        if(path[3] === "currentdatetime") {
            return new Response(time.getCurrentDateTime(), json200);
        }
    }
    }

    //return the 404.html page

    return serveFile(req, "./public/404.html");
});
