import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Page/home';
import Program from './Page/Program';
import Laporan from './Page/Laporan';
import Artikel from './Page/Artikel';
import Tentang from './Page/Tentang';
import KalkulatorZakat from './Page/KalkulatorZakat';
import LatarBelakang from './Page/LatarBelakang';
import VisiMisi from './Page/VisiMisi';
import StrukturManajemen from './Page/StrukturManajemen';
import LaporanKeuangan from './Page/LaporanKeuangan';
import Kantor from './Page/Kantor';
import Berita from './Page/Berita';
import Konsultasi from './Page/Konsultasi';
import Video from './Page/Video';
import LaporanSemester from './Page/LaporanSemester';
import DokumentasiBulanan from './Page/DokumentasiBulanan';
import Pembayaran from './Page/Pembayaran';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/program" element={<Program />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/tentang" element={<Tentang />} />
        <Route path="/kalkulator-zakat" element={<KalkulatorZakat />} />

        {/* Tentang Kami Submenu */}
        <Route path="/latar-belakang" element={<LatarBelakang />} />
        <Route path="/visi-misi" element={<VisiMisi />} />
        <Route path="/struktur-manajemen" element={<StrukturManajemen />} />
        <Route path="/laporan-keuangan" element={<LaporanKeuangan />} />
        <Route path="/kantor" element={<Kantor />} />

        {/* Info Submenu */}
        <Route path="/berita" element={<Berita />} />
        <Route path="/konsultasi" element={<Konsultasi />} />
        <Route path="/video" element={<Video />} />
        <Route path="/laporan-semester" element={<LaporanSemester />} />
        <Route path="/dokumentasi-bulanan" element={<DokumentasiBulanan />} />

        {/* Donation Flow */}
        <Route path="/pembayaran" element={<Pembayaran />} />
      </Routes>
    </Router>
  )
}

export default App
