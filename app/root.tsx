import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "react-router";
import type { Route } from "./+types/root";
import "@/assets/css/app.css";
import Nav from "@/component/Nav";
import NotFound from "@/component/NotFound";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.ico" },
];

export const meta: Route.MetaFunction = () => [
  { title: "Le avventure di Barein" },
  { name: "description", content: "" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className="h-full antialiased">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="min-h-full">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {

  return (
    <>
      <Nav />
      <Outlet />
    </>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();

  // Solo i 404 sono davvero "pagina non trovata": mostrare NotFound per qualsiasi
  // errore nasconde i crash veri (es. un modulo che non si carica) dietro una
  // schermata identica a una rotta inesistente.
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <>
        <Nav />
        <NotFound />
      </>
    );
  }

  const titolo = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "Errore imprevisto";
  const messaggio = error instanceof Error ? error.message : String(error);

  return (
    <>
      <Nav />
      <div className="container mx-auto my-8">
        <h1 className="text-2xl mb-2">{titolo}</h1>
        <p className="mb-4">{messaggio}</p>
        {import.meta.env.DEV && error instanceof Error && error.stack ? (
          <pre className="overflow-x-auto text-sm p-3 border border-black">
            {error.stack}
          </pre>
        ) : null}
      </div>
    </>
  );
}
