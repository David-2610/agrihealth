
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GEMINI_API_KEY = Deno.env.get('GEMINI_API_KEY');
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { soilType, location, additionalInfo } = await req.json();
    
    console.log(`Processing soil analysis for soil type: ${soilType}, location: ${location}`);

    const prompt = `
      As an agricultural AI expert, analyze this soil type: "${soilType}" ${location ? `in location: ${location}` : ''}.
      ${additionalInfo ? `Additional information: ${additionalInfo}` : ''}
      
      Provide a comprehensive analysis including:
      1. Detailed soil composition
      2. Key characteristics
      3. Best crops to grow in this soil
      4. Improvement strategies for this soil
      5. Optimal pH range
      6. Recommended fertilizers
      
      Format your response using Markdown with clear sections.
    `;

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt }
            ]
          }
        ],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 1024,
        }
      }),
    });

    const data = await response.json();
    console.log("Gemini response received");

    if (data.error) {
      console.error("Gemini API error:", data.error);
      throw new Error(data.error.message || "Error from Gemini API");
    }

    const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    return new Response(
      JSON.stringify({ report: generatedText }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: error.message || "An unexpected error occurred" }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
