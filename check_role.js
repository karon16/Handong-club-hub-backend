const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function check() {
  const { data, error } = await supabase
    .from('users')
    .select('id, email, role');
  if (error) {
    console.error(error);
  } else {
    console.log(data);
  }
}
check();
