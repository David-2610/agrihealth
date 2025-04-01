
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

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
      // This is a simulation of API call to a Gemini-powered backend
      // In a real application, you would call a backend API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate AI response based on soil type
      const soilReports: Record<string, string> = {
        "clay": `## Clay Soil Analysis Report

**Soil Composition:**
Clay soil consists of very fine mineral particles and not much organic material. The particles bind together tightly, creating a heavy soil that holds water well but drains poorly.

**Key Characteristics:**
- High in nutrients
- Retains moisture well
- Poor drainage
- Slow to warm in spring
- Compacts easily when wet

**Recommended Crops:**
- Brassicas (cabbage, broccoli)
- Summer vegetables (beans, peas)
- Perennial flowers
- Late-season crops

**Improvement Strategies:**
1. Add organic matter regularly (compost, aged manure)
2. Avoid walking on wet clay soil
3. Raised beds can improve drainage
4. Add coarse sand or fine gravel to improve structure
5. Consider deep-rooted cover crops to break up the soil

**Optimal pH Range:** 6.0-7.0

**Fertilizer Recommendations:**
Focus on balanced NPK fertilizers, with additional phosphorus to encourage root growth. Avoid excessive nitrogen which can lead to lush foliage but poor fruit production.`,

        "sandy": `## Sandy Soil Analysis Report

**Soil Composition:**
Sandy soil consists of large particles with significant space between them, resulting in quick drainage and low nutrient retention.

**Key Characteristics:**
- Drains quickly
- Warms up quickly in spring
- Low in nutrients
- Low water retention
- Easy to work with

**Recommended Crops:**
- Root vegetables (carrots, radishes, potatoes)
- Drought-resistant plants
- Mediterranean herbs (rosemary, thyme)
- Bulbs
- Asparagus

**Improvement Strategies:**
1. Add organic matter frequently (compost, manure)
2. Use mulch to retain moisture
3. Add clay or vermiculite to improve water retention
4. Consider more frequent but lighter watering
5. Use cover crops to prevent erosion

**Optimal pH Range:** 5.5-7.0

**Fertilizer Recommendations:**
Use slow-release fertilizers to prevent leaching. Consider organic options that improve soil structure while adding nutrients. Frequent light applications work better than infrequent heavy ones.`,

        "loam": `## Loam Soil Analysis Report

**Soil Composition:**
Loam is an ideal soil that contains a balanced mixture of clay, sand, and silt particles, along with organic matter. This creates a soil with excellent structure.

**Key Characteristics:**
- Good drainage
- Retains moisture well
- Rich in nutrients
- Easy to work with
- Warms up reasonably in spring

**Recommended Crops:**
- Almost all garden vegetables
- Fruit trees
- Berries
- Annual flowers
- Most perennials

**Improvement Strategies:**
1. Maintain organic matter content with regular compost additions
2. Use cover crops in the off-season to build soil
3. Practice crop rotation
4. Minimal tilling to preserve soil structure
5. Add balanced fertilizers as needed

**Optimal pH Range:** 6.0-7.0

**Fertilizer Recommendations:**
Typically requires modest fertilization. Conduct annual soil tests to monitor nutrient levels and adjust accordingly. Focus on maintaining the excellent natural balance of this soil type.`,

        "silt": `## Silty Soil Analysis Report

**Soil Composition:**
Silty soil contains mainly silt particles, which are smaller than sand but larger than clay. It has a smooth, sometimes slick texture when wet.

**Key Characteristics:**
- Retains moisture well
- Rich in nutrients
- Poor drainage when compacted
- Can form a crust when dry
- Moderate warming in spring

**Recommended Crops:**
- Moisture-loving vegetables (cucumbers, lettuces)
- Shrubs
- Ornamental trees
- Perennial flowers
- Most berry varieties

**Improvement Strategies:**
1. Add coarse organic matter to improve structure
2. Avoid walking on garden beds to prevent compaction
3. Use raised beds in very wet areas
4. Add limestone or gypsum to improve structure
5. Mulch to prevent crusting

**Optimal pH Range:** 6.0-7.0

**Fertilizer Recommendations:**
Usually rich in nutrients but may benefit from phosphorus additions. Conduct soil tests to determine specific needs. Avoid heavy nitrogen applications which can lead to overly lush growth susceptible to disease.`,

        "peaty": `## Peaty Soil Analysis Report

**Soil Composition:**
Peaty soil is high in organic material and typically found in historically water-logged areas. It tends to be darker in color and very lightweight when dry.

**Key Characteristics:**
- High water retention
- Slow to warm in spring
- Acidic pH
- Low in some nutrients despite high organic content
- Low density

**Recommended Crops:**
- Acid-loving plants (blueberries, rhododendrons)
- Moisture-loving vegetables
- Leafy greens
- Brassicas
- Some root crops

**Improvement Strategies:**
1. Add lime to reduce acidity if needed
2. Improve drainage for many crops
3. Add balanced minerals and nutrients
4. Consider raised beds for better drainage
5. Add clay or sand to improve structure in some cases

**Optimal pH Range:** 5.0-6.0 (naturally acidic)

**Fertilizer Recommendations:**
Often requires additional phosphorus, potassium, and trace minerals. Use fertilizers formulated for acid-loving plants when appropriate. May need copper supplements as this is often deficient in peaty soils.`,

        "chalky": `## Chalky Soil Analysis Report

**Soil Composition:**
Chalky soil contains limestone and typically has many small stones throughout. It tends to be light in color and alkaline in pH.

**Key Characteristics:**
- Free-draining
- Shallow
- Stony
- Alkaline pH
- Warms quickly in spring
- Often lacks nutrients

**Recommended Crops:**
- Mediterranean herbs
- Lavender and similar plants
- Spinach and some brassicas
- Plants that prefer alkaline conditions
- Drought-resistant varieties

**Improvement Strategies:**
1. Add humus-rich organic matter regularly
2. Use acidic composts for acid-loving plants
3. Add iron supplements for plants showing yellowing leaves
4. Mulch to improve water retention
5. Consider container gardening for acid-loving plants

**Optimal pH Range:** 7.0-8.0 (naturally alkaline)

**Fertilizer Recommendations:**
Use fertilizers containing chelated minerals which remain available in alkaline soils. Plants may need additional iron, manganese, and boron. Consider specialized fertilizers designed for alkaline conditions.`,
      };

      setReport(soilReports[soilType] || "No specific information available for this soil type. Please contact our agricultural experts for personalized advice.");
      
      toast({
        title: "Report Generated",
        description: "Your soil analysis report is ready.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate soil report. Please try again.",
        variant: "destructive",
      });
      console.error("Error generating report:", error);
    } finally {
      setIsLoading(false);
    }
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
