// Check current database
const db = JSON.parse(localStorage.getItem('somaortaklaryolyardim_db') || '{}');
console.log('=== SERVICES ===');
console.log(JSON.stringify(db.services, null, 2));
console.log('=== TOTAL COUNT ===');
console.log('Services:', db.services?.length || 0);
