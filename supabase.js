const supabaseUrl =
"https://hosaktzhuylgnptndljv.supabase.co";

const supabaseKey =
"sb_publishable_a5mrnp07tu9rac7NHtzeIg_UKriasWX";

const supabaseClient =
supabase.createClient(
    supabaseUrl,
    supabaseKey
);

console.log("Supabase Ready");
