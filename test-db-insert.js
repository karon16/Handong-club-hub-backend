const { createClient } = require('@supabase/supabase-js');
const supabase = createClient(
  'https://hifdlutdyxgmlbjchcon.supabase.co',
  'sb_publishable_HXDNyQPDhK1unPrDvbgGuA_0eWeIrA6'
);
supabase
  .from('club_posts')
  .insert({
    title: 'test',
    content: 'test',
    type: 'write',
    url: 'http://example.com',
  })
  .then((res) => console.log(JSON.stringify(res, null, 2)));
