// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ylkpvwrlnouuffigvgfj.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlsa3B2d3Jsbm91dWZmaWd2Z2ZqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM1MTU0MDEsImV4cCI6MjA1OTA5MTQwMX0.jfmvelg4p5KMJMWf_HquoiIjx1FdFMrafGTGXSo30VM";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);