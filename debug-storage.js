// Debug script to check localStorage
const storageKey = 'somaortaklaryolyardim_db';

console.log('=== LocalStorage Debug ===');
console.log('Key:', storageKey);

const stored = localStorage.getItem(storageKey);
if (stored) {
  console.log('Stored data found:');
  console.log(JSON.parse(stored));
} else {
  console.log('No data found in localStorage');
  console.log('Will use default data');
}

// Try to access the data
try {
  const data = JSON.parse(stored || '{}');
  console.log('Parsed data:', data);
  console.log('About section:', data.about);
  console.log('SEO config:', data.seo);
  console.log('Footer info:', data.footer);
} catch (e) {
  console.error('Error parsing stored data:', e);
}
