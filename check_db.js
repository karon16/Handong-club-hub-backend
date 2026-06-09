const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function check() {
  const { data, error } = await supabase.from('clubs').select('*').limit(1);
  if (error) {
    console.error(error);
  } else if (data.length > 0) {
    console.log(Object.keys(data[0]));
  } else {
    console.log('No rows, but query succeeded');
  }
}
check();
