
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2, FileText, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type SoilReport = {
  id: string;
  soil_type: string;
  location: string | null;
  additional_info: string | null;
  report_content: string;
  created_at: string;
};

const Account = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [reports, setReports] = useState<SoilReport[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<SoilReport | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [reportToDelete, setReportToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      toast({
        title: "Authentication required",
        description: "Please login to view your account",
        variant: "destructive",
      });
      navigate("/login");
    } else if (user) {
      fetchReports();
    }
  }, [user, loading, navigate]);

  const fetchReports = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("soil_reports")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        throw error;
      }

      setReports(data || []);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast({
        title: "Error",
        description: "Failed to load your soil reports.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteReport = async () => {
    if (!reportToDelete) return;

    try {
      setIsDeleting(true);
      const { error } = await supabase
        .from("soil_reports")
        .delete()
        .eq("id", reportToDelete);

      if (error) {
        throw error;
      }

      setReports(reports.filter((report) => report.id !== reportToDelete));
      toast({
        title: "Report deleted",
        description: "The soil report has been deleted successfully.",
      });
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Error deleting report:", error);
      toast({
        title: "Error",
        description: "Failed to delete the soil report.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setReportToDelete(null);
    }
  };

  const confirmDelete = (id: string) => {
    setReportToDelete(id);
    setIsDeleteDialogOpen(true);
  };

  const renderReportContent = (content: string) => {
    return content.split("\n").map((line, index) => {
      if (line.startsWith("##")) {
        return (
          <h2 key={index} className="text-xl font-bold mt-4 mb-2 text-agrihealth-green">
            {line.replace("##", "")}
          </h2>
        );
      } else if (line.startsWith("**") && line.endsWith("**")) {
        return (
          <h3 key={index} className="text-lg font-semibold mt-3 mb-1">
            {line.replace(/\*\*/g, "")}
          </h3>
        );
      } else if (line.startsWith("-")) {
        return (
          <li key={index} className="ml-4 my-1">
            {line.substring(2)}
          </li>
        );
      } else if (line.match(/^\d\./)) {
        return (
          <div key={index} className="ml-4 my-1">
            {line}
          </div>
        );
      } else if (line === "") {
        return <br key={index} />;
      } else {
        return (
          <p key={index} className="my-2">
            {line}
          </p>
        );
      }
    });
  };

  if (loading || (isLoading && user)) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-agrihealth-green" />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-agrihealth-green">My Account</h1>
        
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your profile details and account information</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-lg mb-2">
              <span className="font-medium">Email:</span> {user?.email}
            </p>
            <p className="text-lg">
              <span className="font-medium">User ID:</span>{" "}
              <span className="text-gray-500 text-sm">{user?.id}</span>
            </p>
          </CardContent>
        </Card>

        <h2 className="text-2xl font-bold mb-4 text-agrihealth-green">My Soil Reports</h2>
        
        {reports.length === 0 ? (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500 mb-4">You don't have any soil reports yet.</p>
              <Button 
                onClick={() => navigate("/soil-report")}
                className="bg-agrihealth-green hover:bg-agrihealth-green-light"
              >
                Create Your First Soil Report
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="p-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Soil Type</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Date Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium capitalize">
                        {report.soil_type} Soil
                      </TableCell>
                      <TableCell>{report.location || "Not specified"}</TableCell>
                      <TableCell>
                        {new Date(report.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setSelectedReport(report)}
                              >
                                <FileText className="h-4 w-4 mr-1" /> View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle className="capitalize">
                                  {report.soil_type} Soil Report
                                </DialogTitle>
                                <DialogDescription>
                                  {report.location && <span>Location: {report.location}</span>}
                                  <span className="block text-sm text-gray-500">
                                    Created on {new Date(report.created_at).toLocaleDateString()}
                                  </span>
                                </DialogDescription>
                              </DialogHeader>
                              <div className="prose max-w-none mt-4">
                                {selectedReport && renderReportContent(selectedReport.report_content)}
                              </div>
                            </DialogContent>
                          </Dialog>

                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => confirmDelete(report.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" /> Delete
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </div>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this soil report? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteReport}
              disabled={isDeleting}
            >
              {isDeleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Account;
