import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const SoilReport = () => {
  const [soilType, setSoilType] = useState("");
  const [location, setLocation] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!soilType) {
      toast({
        title: "Missing information",
        description: "Please select a soil type.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setReport(null);

    try {
      const { data, error } = await supabase.functions.invoke('soil-analysis', {
        body: { soilType, location, additionalInfo }
      });

      if (error) {
        throw new Error(error.message || "Failed to generate soil report");
      }

      setReport(data.report);
      
      toast({
        title: "Report Generated",
        description: "Your AI-powered soil analysis report is ready.",
      });
    } catch (error) {
      console.error("Error generating report:", error);
      toast({
        title: "Error",
        description: "Failed to generate soil report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-agrihealth-green">Soil Analysis Report</h1>
        <p className="text-lg mb-8 text-gray-600">
          Enter information about your soil to receive a detailed AI-powered analysis and
          recommendations for optimal farming practices.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Soil Information</CardTitle>
              <CardDescription>
                Provide details about your soil for AI analysis
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="soil-type">Soil Type *</Label>
                  <Select value={soilType} onValueChange={setSoilType}>
                    <SelectTrigger id="soil-type">
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clay">Clay Soil</SelectItem>
                      <SelectItem value="sandy">Sandy Soil</SelectItem>
                      <SelectItem value="loam">Loam Soil</SelectItem>
                      <SelectItem value="silt">Silty Soil</SelectItem>
                      <SelectItem value="peaty">Peaty Soil</SelectItem>
                      <SelectItem value="chalky">Chalky Soil</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location (Optional)</Label>
                  <Input
                    id="location"
                    placeholder="e.g., North field, South slope"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="additional-info">Additional Information (Optional)</Label>
                  <Textarea
                    id="additional-info"
                    placeholder="Describe any issues you've observed, crops you want to grow, etc."
                    rows={4}
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  type="submit"
                  className="w-full bg-agrihealth-green hover:bg-agrihealth-green-light"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing with Gemini AI...
                    </>
                  ) : (
                    "Generate AI Report"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <div>
            <Card className={`h-full ${!report && !isLoading ? "flex items-center justify-center" : ""}`}>
              <CardHeader>
                <CardTitle>Soil Analysis Results</CardTitle>
                <CardDescription>
                  AI-powered recommendations based on your soil information
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-auto max-h-[500px]">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <Loader2 className="h-10 w-10 animate-spin text-agrihealth-green mb-4" />
                    <p className="text-gray-500">Analyzing soil data with Google Gemini AI...</p>
                  </div>
                ) : report ? (
                  <div className="prose max-w-none">
                    {report.split('\n').map((line, index) => {
                      if (line.startsWith('##')) {
                        return <h2 key={index} className="text-xl font-bold mt-4 mb-2 text-agrihealth-green">{line.replace('##', '')}</h2>;
                      } else if (line.startsWith('**') && line.endsWith('**')) {
                        return <h3 key={index} className="text-lg font-semibold mt-3 mb-1">{line.replace(/\*\*/g, '')}</h3>;
                      } else if (line.startsWith('-')) {
                        return <li key={index} className="ml-4 my-1">{line.substring(2)}</li>;
                      } else if (line.match(/^\d\./)) {
                        return <div key={index} className="ml-4 my-1">{line}</div>;
                      } else if (line === '') {
                        return <br key={index} />;
                      } else {
                        return <p key={index} className="my-2">{line}</p>;
                      }
                    })}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    <p>Select a soil type and generate a report to see AI-powered recommendations.</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoilReport;
