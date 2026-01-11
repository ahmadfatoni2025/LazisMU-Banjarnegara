import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. Import useNavigate

// --- TIPE DATA ---
type ZakatType = 'profesi' | 'maal';

interface CalculationResult {
  amount: number;
  isWajib: boolean;
  message: string;
  nishab: number;
  label: string;
}

// --- KONFIGURASI ---
const HARGA_EMAS_PER_GRAM = 1350000; 

// --- DESKRIPSI TEXT ---
const DESCRIPTIONS = {
  profesi: "Zakat yang dikeluarkan dari penghasilan rutin (gaji, tunjangan, jasa) saat diterima, jika telah mencapai nishab (setara 85gr emas per tahun).",
  maal: "Zakat atas harta simpanan (uang, emas, aset investasi) yang telah dimiliki selama 1 tahun (haul) dan mencapai nishab."
};

const KalkulatorZakat: React.FC = () => {
  const navigate = useNavigate(); // 2. Init Hook Navigasi
  const [activeTab, setActiveTab] = useState<ZakatType>('profesi');
  
  // State Input
  const [inputs, setInputs] = useState({
    gaji: '',
    lain: '',
    hutangProfesi: '',
    tabungan: '',
    emas: '',
    saham: '',
    hutangMaal: ''
  });

  const [result, setResult] = useState<CalculationResult | null>(null);

  // --- HELPER FORMATTING ---
  const formatRupiah = (value: string) => {
    const numberString = value.replace(/[^,\d]/g, '').toString();
    const split = numberString.split(',');
    const sisa = split[0].length % 3;
    let rupiah = split[0].substr(0, sisa);
    const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

    if (ribuan) {
      const separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    return split[1] !== undefined ? rupiah + ',' + split[1] : rupiah;
  };

  const parseNumber = (value: string) => {
    return parseInt(value.replace(/\./g, '') || '0', 10);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const formatted = formatRupiah(value);
    setInputs(prev => ({ ...prev, [name]: formatted }));
  };

  // --- LOGIKA HITUNG ZAKAT ---
  const handleCalculate = () => {
    let totalHarta = 0;
    let nishab = 0;
    let zakatAmount = 0;
    let isWajib = false;
    let label = "";

    if (activeTab === 'profesi') {
      const gaji = parseNumber(inputs.gaji);
      const lain = parseNumber(inputs.lain);
      const hutang = parseNumber(inputs.hutangProfesi);
      
      totalHarta = (gaji + lain) - hutang;
      nishab = (85 * HARGA_EMAS_PER_GRAM) / 12;
      label = "Zakat Profesi";

    } else {
      const uang = parseNumber(inputs.tabungan);
      const emas = parseNumber(inputs.emas);
      const saham = parseNumber(inputs.saham);
      const hutang = parseNumber(inputs.hutangMaal);

      totalHarta = (uang + emas + saham) - hutang;
      nishab = 85 * HARGA_EMAS_PER_GRAM;
      label = "Zakat Maal";
    }

    if (totalHarta >= nishab) {
      zakatAmount = totalHarta * 0.025;
      isWajib = true;
    }

    setResult({
      amount: zakatAmount,
      isWajib,
      nishab,
      label,
      message: isWajib 
        ? "Alhamdulillah, harta Anda mencapai nishab."
        : "Harta belum mencapai nishab. Namun, sangat dianjurkan berinfak."
    });
  };

  // --- NAVIGASI ---
  
  // Ke Halaman Donasi (Membawa Data)
  const handleLanjutBayar = () => {
    if (!result) return;
    navigate('/salurkan-donasi', { 
      state: { 
        nominal: result.amount, 
        kategori: result.isWajib ? 'ZAKAT' : 'INFAQ',
        sumber: 'KALKULATOR'
      } 
    });
  };

  // Ke Halaman Home (Balik)
  const handleBackHome = () => {
    navigate('/'); // Asumsi route home adalah '/'
  };

  // --- STYLING OBJECTS ---
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '40px auto',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      backgroundColor: '#fff',
      fontFamily: "'Poppins', sans-serif",
      border: '1px solid #f0f0f0',
      position: 'relative' as const // Untuk positioning
    },
    // Style Tombol Home Baru
    homeBtn: {
      background: 'none',
      border: 'none',
      color: '#888',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      marginBottom: '15px',
      transition: 'color 0.2s'
    },
    header: { textAlign: 'center' as const, marginBottom: '25px' },
    title: { color: '#F27121', fontSize: '28px', fontWeight: '800', marginBottom: '5px' },
    subtitle: { color: '#666', fontSize: '14px', margin: 0 },
    
    tabContainer: { display: 'flex', gap: '15px', marginBottom: '20px', borderBottom: '2px solid #eee' },
    tabBtn: (isActive: boolean) => ({
      flex: 1, padding: '12px', border: 'none', background: 'none', cursor: 'pointer',
      fontSize: '15px', fontWeight: '600',
      color: isActive ? '#F27121' : '#888',
      borderBottom: isActive ? '3px solid #F27121' : '3px solid transparent',
      transition: 'all 0.3s'
    }),
    
    infoBox: {
      backgroundColor: '#e3f2fd',
      color: '#0d47a1',
      padding: '12px 15px',
      borderRadius: '8px',
      fontSize: '13px',
      lineHeight: '1.5',
      marginBottom: '20px',
      borderLeft: '4px solid #2196f3'
    },

    inputGroup: { marginBottom: '15px' },
    label: { display: 'block', marginBottom: '6px', color: '#444', fontWeight: '600', fontSize: '13px' },
    input: {
      width: '100%', padding: '12px 15px', borderRadius: '8px', border: '1px solid #ddd',
      fontSize: '16px', outline: 'none', boxSizing: 'border-box' as const, transition: '0.2s'
    },
    note: { fontSize: '12px', color: '#888', marginTop: '4px', fontStyle: 'italic' },
    
    button: {
      width: '100%', padding: '14px', backgroundColor: '#F27121', color: 'white', border: 'none',
      borderRadius: '8px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px',
      transition: 'background 0.3s'
    },
    
    resultBox: {
      marginTop: '30px', padding: '25px', backgroundColor: '#FFF8F0',
      borderRadius: '12px', border: '1px dashed #F27121', textAlign: 'center' as const
    },
    resultAmount: { fontSize: '32px', fontWeight: '800', color: '#F27121', margin: '10px 0' },
    resultMsg: { fontSize: '14px', color: '#555', marginBottom: '20px', lineHeight: '1.5' },
    
    actionBtn: {
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '12px 30px',
      backgroundColor: '#25D366', color: 'white', borderRadius: '50px', 
      textDecoration: 'none', fontWeight: '700', fontSize: '15px',
      boxShadow: '0 4px 10px rgba(37, 211, 102, 0.2)', border: 'none', cursor: 'pointer', width: '100%'
    },
    actionBtnInfaq: {
      backgroundColor: '#333', boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
    }
  };

  return (
    <div style={styles.container}>
      {/* TOMBOL HOME / KEMBALI */}
      <button 
        style={styles.homeBtn} 
        onClick={handleBackHome}
        onMouseOver={(e) => e.currentTarget.style.color = '#F27121'}
        onMouseOut={(e) => e.currentTarget.style.color = '#888'}
      >
        &#8592; Kembali ke Beranda
      </button>

      <div style={styles.header}>
        <h2 style={styles.title}>Kalkulator Zakat</h2>
        <p style={styles.subtitle}>Hitung kewajiban zakat Anda secara akurat & syar'i</p>
      </div>

      <div style={styles.tabContainer}>
        <button 
          style={styles.tabBtn(activeTab === 'profesi')} 
          onClick={() => { setActiveTab('profesi'); setResult(null); }}
        >
          Zakat Profesi
        </button>
        <button 
          style={styles.tabBtn(activeTab === 'maal')} 
          onClick={() => { setActiveTab('maal'); setResult(null); }}
        >
          Zakat Maal
        </button>
      </div>

      <div style={styles.infoBox}>
        <strong>{activeTab === 'profesi' ? 'Zakat Profesi: ' : 'Zakat Maal: '}</strong>
        {DESCRIPTIONS[activeTab]}
      </div>

      <div className="form-content">
        {activeTab === 'profesi' ? (
          <>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Pendapatan Tetap Bulanan</label>
              <input 
                name="gaji" value={inputs.gaji} onChange={handleInputChange}
                style={styles.input} placeholder="Rp 0" 
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Pendapatan Lainnya (Bonus/Tunjangan)</label>
              <input 
                name="lain" value={inputs.lain} onChange={handleInputChange}
                style={styles.input} placeholder="Rp 0" 
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Hutang Jatuh Tempo (Cicilan Bulan Ini)</label>
              <input 
                name="hutangProfesi" value={inputs.hutangProfesi} onChange={handleInputChange}
                style={styles.input} placeholder="Rp 0" 
              />
              <div style={styles.note}>*Pengurang: Hanya hutang kebutuhan pokok yang harus dibayar bulan ini</div>
            </div>
          </>
        ) : (
          <>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Total Uang Tunai / Tabungan / Deposito</label>
              <input 
                name="tabungan" value={inputs.tabungan} onChange={handleInputChange}
                style={styles.input} placeholder="Rp 0" 
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Total Nilai Emas / Logam Mulia</label>
              <input 
                name="emas" value={inputs.emas} onChange={handleInputChange}
                style={styles.input} placeholder="Rp 0" 
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Total Nilai Saham / Surat Berharga</label>
              <input 
                name="saham" value={inputs.saham} onChange={handleInputChange}
                style={styles.input} placeholder="Rp 0" 
              />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Hutang Jatuh Tempo</label>
              <input 
                name="hutangMaal" value={inputs.hutangMaal} onChange={handleInputChange}
                style={styles.input} placeholder="Rp 0" 
              />
            </div>
          </>
        )}

        <button style={styles.button} onClick={handleCalculate}>
          Hitung Zakat Sekarang
        </button>
      </div>

      {result && (
        <div style={styles.resultBox}>
          <div style={styles.label}>
             {result.isWajib ? `Wajib Mengeluarkan ${result.label}:` : "Jumlah Zakat:"}
          </div>
          <div style={styles.resultAmount}>Rp {result.amount.toLocaleString('id-ID')}</div>
          
          <div style={styles.resultMsg}>
            {result.message} <br/>
            <small style={{ color: '#888' }}>(Batas Nishab: Rp {Math.round(result.nishab).toLocaleString('id-ID')})</small>
          </div>

          <button 
            onClick={handleLanjutBayar}
            style={{ 
              ...styles.actionBtn, 
              ...(result.isWajib ? {} : styles.actionBtnInfaq) 
            }}
          >
            {result.isWajib ? "Lanjut Bayar Zakat" : "Lanjut Berinfak"}
          </button>
        </div>
      )}
    </div>
  );
};

export default KalkulatorZakat;