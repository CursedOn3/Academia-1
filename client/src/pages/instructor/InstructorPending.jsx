// src/pages/instructor/InstructorPending.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ClockIcon } from "lucide-react";

const InstructorPending = () => {
  return (
    <div className="flex items-center justify-center min-h-screen p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ClockIcon size={48} className="text-amber-500" />
          </div>
          <CardTitle className="text-2xl">Application Pending Review</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <p>
            Thank you for applying to be an instructor at Academia. Your application has been received and is currently under review.
          </p>
          <p>
            This process typically takes 1-3 business days. We'll notify you via email once a decision has been made.
          </p>
          <Button asChild className="w-full">
            <Link to="/login">Return to Login</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InstructorPending;