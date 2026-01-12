import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Page/home';
import LatarBelakang from './Page/LatarBelakang';
import VisiMisi from './Page/VisiMisi';
import StrukturManajemen from './Page/StrukturManajemen';
import LaporanKeuangan from './Page/LaporanKeuangan';
import Kantor from './Page/Kantor';
import Artikel from './Page/Artikel';
import Berita from './Page/Berita';
import BeritaDetail from './Page/BeritaDetail';
import Konsultasi from './Page/Konsultasi';
import Video from './Page/Video';
import LaporanSemester from './Page/LaporanSemester';
import DokumentasiBulanan from './Page/DokumentasiBulanan';
import Program from './Page/Program';
import KalkulatorZakat from './Page/KalkulatorZakat';
import Donasi from './Page/Donasi';
import Pembayaran from './Page/Pembayaran';
import ScrollToTop from './ui/ScrollToTop';

function App() {
    return (
        <Router>
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />

                {/* Tentang Kami Routes */}
                <Route path="/latar-belakang" element={<LatarBelakang />} />
                <Route path="/visi-misi" element={<VisiMisi />} />
                <Route path="/struktur-manajemen" element={<StrukturManajemen />} />
                <Route path="/laporan-keuangan" element={<LaporanKeuangan />} />
                <Route path="/kantor" element={<Kantor />} />

                {/* Info Routes */}
                <Route path="/artikel" element={<Artikel />} />
                <Route path="/berita" element={<Berita />} />
                <Route path="/berita/:slug" element={<BeritaDetail />} />
                <Route path="/konsultasi" element={<Konsultasi />} />
                <Route path="/video" element={<Video />} />
                <Route path="/laporan-semester" element={<LaporanSemester />} />
                <Route path="/dokumentasi-bulanan" element={<DokumentasiBulanan />} />

                {/* Other Main Routes */}
                <Route path="/program" element={<Program />} />
                <Route path="/kalkulator-zakat" element={<KalkulatorZakat />} />
                <Route path="/donasi" element={<Donasi />} />
                <Route path="/pembayaran" element={<Pembayaran />} />
            </Routes>
        </Router>
    );
}

export default App;
