// src/components/ErrorPage.jsx
import { useRouteError } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">Oops!</h1>
      <p className="text-xl mb-6">Sorry, an unexpected error has occurred.</p>
      <p className="text-gray-500 mb-8">
        {error.statusText || error.message || "Unknown error"}
      </p>
      <Button asChild>
        <Link to="/">Return to Homepage</Link>
      </Button>
    </div>
  );
}