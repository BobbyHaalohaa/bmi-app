// helper utk tampilkan hasil
function setHasil(html) {
  document.getElementById('hasil').innerHTML = html;
}

// render riwayat dari localStorage
function renderHistory() {
  const historyEl = document.getElementById('history');
  const history = JSON.parse(localStorage.getItem('bmiHistory') || '[]');
  if (!history.length) {
    historyEl.innerHTML = '<i>Belum ada riwayat</i>';
    return;
  }
  historyEl.innerHTML = history.map(h => 
    `<div class="item">${h.date} — Berat: ${h.berat}kg, Tinggi: ${h.tinggi}cm → BMI: ${h.bmi}</div>`
  ).join('');
}

document.getElementById('bmiForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const berat = parseFloat(document.getElementById('berat').value);
  const tinggiCm = parseFloat(document.getElementById('tinggi').value);

  // validasi sederhana
  if (!berat || !tinggiCm || berat <= 0 || tinggiCm <= 0) {
    setHasil('<span style="color:red">Masukkan berat & tinggi yg valid!</span>');
    return;
  }

  const tinggiM = tinggiCm / 100;
  const bmi = berat / (tinggiM * tinggiM);
  const bmiFix = bmi.toFixed(2);

  let kategori = '';
  if (bmi < 18.5) kategori = 'Kurus (Underweight)';
  else if (bmi >= 18.5 && bmi < 24.9) kategori = 'Normal';
  else if (bmi >= 25 && bmi < 29.9) kategori = 'Overweight';
  else kategori = 'Obesitas';

  setHasil(`BMI Anda: <strong>${bmiFix}</strong><br>Kategori: <strong>${kategori}</strong>`);

  // simpan ke localStorage (riwayat)
  const history = JSON.parse(localStorage.getItem('bmiHistory') || '[]');
  history.unshift({ date: new Date().toLocaleString(), berat, tinggi: tinggiCm, bmi: bmiFix });
  localStorage.setItem('bmiHistory', JSON.stringify(history.slice(0,50))); // simpan maksimal 50 entri
  renderHistory();
});

// render awal
renderHistory();
