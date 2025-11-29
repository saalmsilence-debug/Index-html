import Dexie from 'dexie';
export const db = new Dexie('BookPesa_offline');
db.version(1).stores({
  transactions: '++id,date,type,amount,description,createdAt',
  debts: '++id,person,type,status,amount,createdAt',
  inventory: '++id,name,qty,price',
  meta: 'key'
});

export async function initMeta(){
  if(!await db.meta.get('createdAt')) await db.meta.put({key:'createdAt', value: new Date().toISOString()});
}
