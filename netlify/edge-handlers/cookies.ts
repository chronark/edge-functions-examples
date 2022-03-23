import type { Context } from "netlify:edge";

export default async (req: Request, { next, cookies }: Context) => {
  
  const url = new URL(req.url);

  switch (url.searchParams.get("action")) {
    case "set":
      cookies.set({
        name: "action",
        value: "hello",
      });

      return new Response(
        'Cookie value has been set. Reload this page without the "action" parameter to see it.',
      );

    case "clear":
      cookies.delete("action");

      return new Response(
        'Cookie value has been cleared. Reload this page without the "action" parameter to see the new state.',
      );
  }

  const value = cookies.get("action");
  const message = value
    ? `Cookie value is "${value}". You can clear it by using "?action=clear".`
    : 'Cookie has not been set. You can do so by adding "?action=set" to the URL.';

  return new Response(message);
};

