const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://hifdlutdyxgmlbjchcon.supabase.co',
  'sb_publishable_HXDNyQPDhK1unPrDvbgGuA_0eWeIrA6'
);
supabase
  .from('club_posts')
  .select('*')
  .limit(1)
  .then((res) => console.log(res));
