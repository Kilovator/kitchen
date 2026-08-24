async function testSupermarketsApi() {
  try {
    const url = 'http://localhost:5000/api/supermarkets?lat=51.101696&lng=17.022976';
    const res = await fetch(url);
    console.log('Status:', res.status);
    const data = await res.json();
    console.log('Loaded stores:', data.length);
    data.forEach(s => {
      console.log(`- ${s.logo} ${s.name} @ ${s.address.pl} (${s.distanceMeters}m)`);
    });
  } catch (e) {
    console.error('Error:', e.message);
  }
}

testSupermarketsApi();
