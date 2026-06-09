const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function check() {
  const { data, error } = await supabase
    .from('clubs')
    .select('name, exec_user_id');
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
}
check();
