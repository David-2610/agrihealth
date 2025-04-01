
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
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const SoilReport = () => {
  const [soilType, setSoilType] = useState("");
  const [location, setLocation] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<string | null>(null);
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

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

    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to generate and save soil reports.",
        variant: "destructive",
      });
      navigate("/login");
      return;
    }

    setIsLoading(true);
    setReport(null);

    try {
      // Generate a mock soil report based on the soil type
      const mockReport = generateMockSoilReport(soilType, location, additionalInfo);
      setReport(mockReport);
      
      // Save the report to Supabase
      const { error } = await supabase.from('soil_reports').insert({
        user_id: user.id,
        soil_type: soilType,
        location: location || null,
        additional_info: additionalInfo || null,
        report_content: mockReport
      });

      if (error) {
        throw new Error(error.message || "Failed to save soil report");
      }
      
      toast({
        title: "Report Generated",
        description: "Your soil analysis report is ready and saved to your account.",
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

  // Function to generate mock soil report based on soil type
  const generateMockSoilReport = (soilType: string, location?: string, additionalInfo?: string) => {
    const reports: Record<string, string> = {
      clay: `## Clay Soil Analysis Report
      
**Soil Composition:**
Clay soil contains fine particles that hold together when wet. It has high mineral content including calcium, potassium, and magnesium.

**Key Characteristics:**
- Holds water well, sometimes too well
- Slow to warm in spring
- Can become compacted easily
- High in nutrients

**Best Crops:**
- Cabbage and broccoli
- Summer vegetables like tomatoes and peppers
- Perennial flowers
- Fruit trees

**Improvement Strategies:**
- Add organic matter regularly
- Avoid working when wet
- Consider raised beds for better drainage
- Add grit or sand for better structure

**Optimal pH Range:** 6.0-7.0

**Recommended Fertilizers:**
- Organic compost
- Well-rotted manure
- Gypsum to improve structure`,

      sandy: `## Sandy Soil Analysis Report
      
**Soil Composition:**
Sandy soil consists of larger particles with significant space between them. It has lower organic matter content.

**Key Characteristics:**
- Drains quickly, sometimes too quickly
- Warms up fast in spring
- Easy to work with
- Lower in nutrients that wash away easily

**Best Crops:**
- Root vegetables like carrots and potatoes
- Mediterranean herbs like rosemary and thyme
- Drought-tolerant plants
- Melons and strawberries

**Improvement Strategies:**
- Add plenty of organic matter
- Use mulch to retain moisture
- Consider more frequent, smaller waterings
- Use slow-release fertilizers

**Optimal pH Range:** 5.5-6.5

**Recommended Fertilizers:**
- Compost with high organic matter
- Kelp meal
- Worm castings`,

      loam: `## Loam Soil Analysis Report
      
**Soil Composition:**
Loam soil is a balanced mixture of sand, silt, and clay particles with good organic matter content.

**Key Characteristics:**
- Excellent drainage while retaining moisture
- Warms up moderately in spring
- Easy to work with in most conditions
- Good nutrient retention

**Best Crops:**
- Almost all garden vegetables
- Most flowers and ornamentals
- Fruit trees and berries
- Lawn grasses

**Improvement Strategies:**
- Maintain with regular additions of compost
- Rotate crops annually
- Use cover crops in winter
- Light tilling when needed

**Optimal pH Range:** 6.0-7.0

**Recommended Fertilizers:**
- Balanced organic fertilizers
- Compost
- Aged manure`,

      silt: `## Silty Soil Analysis Report
      
**Soil Composition:**
Silty soil contains medium-sized particles that hold water well but can become compacted.

**Key Characteristics:**
- Retains moisture well
- Fertile with good nutrient content
- Can form a crust when dry
- Smooth texture, sometimes slippery when wet

**Best Crops:**
- Moisture-loving perennials
- Many vegetables including leafy greens
- Shrubs and climbers
- Ornamental grasses

**Improvement Strategies:**
- Add organic matter to improve structure
- Avoid walking on planting areas
- Use mulch to prevent crusting
- Consider raised beds

**Optimal pH Range:** 6.0-7.0

**Recommended Fertilizers:**
- Balanced organic matter
- Aged compost
- Fish emulsion for nitrogen`,

      peaty: `## Peaty Soil Analysis Report
      
**Soil Composition:**
Peaty soil is rich in organic matter and has high water retention capability.

**Key Characteristics:**
- Excellent water retention
- Slow to warm in spring
- Acidic pH typically
- High in decomposed organic material

**Best Crops:**
- Acid-loving plants like blueberries
- Vegetables that prefer acidic soil
- Water-loving plants
- Many shrubs like rhododendrons

**Improvement Strategies:**
- May need lime to adjust pH for some crops
- Improve drainage if necessary
- Add balanced minerals
- Consider raised beds for better warming

**Optimal pH Range:** 4.5-6.0

**Recommended Fertilizers:**
- Balanced minerals
- Rock dust
- Seaweed extracts`,

      chalky: `## Chalky Soil Analysis Report
      
**Soil Composition:**
Chalky soil contains large quantities of calcium carbonate, making it alkaline.

**Key Characteristics:**
- Free-draining, sometimes excessively
- Warms up quickly in spring
- Shallow topsoil often
- Prone to nutrient deficiencies

**Best Crops:**
- Mediterranean herbs
- Lavender and other aromatic plants
- Some vegetables like spinach and beets
- Drought-resistant ornamentals

**Improvement Strategies:**
- Add organic matter regularly
- Use acidic fertilizers for acid-loving plants
- Mulch heavily to retain moisture
- Consider raised beds with imported soil

**Optimal pH Range:** 7.0-8.0

**Recommended Fertilizers:**
- Organic matter high in acidity
- Sulfur for acid-loving plants
- Iron supplements for chlorosis prevention`,
    };

    const defaultReport = `## General Soil Analysis Report
    
**Note:** This is a general report as the soil type provided is not in our standard categories.

**Recommended Actions:**
- Consider getting a professional soil test
- Add organic matter to improve soil structure
- Monitor plant growth for signs of deficiencies
- Adjust watering based on drainage characteristics`;

    return reports[soilType] || defaultReport;
  };

  return (
    <div className="container mx-auto py-12 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-bold mb-6 text-agrihealth-green">Soil Analysis Report</h1>
        <p className="text-lg mb-8 text-gray-600">
          Enter information about your soil to receive a detailed analysis and
          recommendations for optimal farming practices.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Soil Information</CardTitle>
              <CardDescription>
                Provide details about your soil for analysis
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
                      Analyzing...
                    </>
                  ) : (
                    "Generate Report"
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
                  Recommendations based on your soil information
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-auto max-h-[500px]">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <Loader2 className="h-10 w-10 animate-spin text-agrihealth-green mb-4" />
                    <p className="text-gray-500">Analyzing soil data...</p>
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
                    <p>Select a soil type and generate a report to see recommendations.</p>
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
