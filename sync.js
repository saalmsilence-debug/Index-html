import { createClient } from '@supabase/supabase-js';
import { db } from './db';

// Call createSync(supabaseUrl, supabaseAnonKey) when user enables sync
export function createSync(supabaseUrl, supabaseAnonKey){
  const supabase = createClient(supabaseUrl, supabaseAnonKey);
  return {
    async pushLocalToCloud(){
      const tx = await db.transactions.toArray();
      const debts = await db.debts.toArray();
      const inv = await db.inventory.toArray();
      // upsert logic same as index.html
      // supabase.from('transactions').upsert([...], { onConflict:'local_id' })
      // ...
    },
    async pullCloudToLocal(){
      // fetch rows from supabase, merge
    },
    supabase
  };
}
