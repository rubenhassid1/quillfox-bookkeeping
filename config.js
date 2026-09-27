// Public settings only. The publishable key is designed to live in the browser:
// the database's row-level security decides what it can do (here: add a lead, never read one).
window.QF_CONFIG = {
  supabaseUrl: "https://cyfxswmcjijmqwefconm.supabase.co",
  supabaseKey: "sb_publishable_BsoSkJbaqyvPU7cjDDYnfw_JYeiPGJc",
  table: "ccd_quillfox_leads",
  // The public demo does not store readers' details. Local tests do.
  saveLeads: ["localhost", "127.0.0.1"].includes(location.hostname)
};
