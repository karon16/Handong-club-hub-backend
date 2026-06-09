const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

async function check() {
  const { data, error } = await supabase
    .from('users')
    .update({ role: 'club_executive' })
    .eq('email', 'christopherbuhendwa@handong.ac.kr');
  console.log({ data, error });
}
check();
