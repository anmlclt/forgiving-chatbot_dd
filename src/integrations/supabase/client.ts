// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://cczcueogekivqbfnrtaf.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNjemN1ZW9nZWtpdnFiZm5ydGFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg4MDU0ODksImV4cCI6MjA1NDM4MTQ4OX0.p7U2R7UbLsJ16fS7U_iXlQTL4Y3orf57HKOPSDPDUoo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);