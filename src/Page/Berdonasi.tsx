import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import FadeInUp from '../ui/FadeInUp';
import CampaignCard from '../ui/CampaignCard';

const Berdonasi = () => {
    const navigate = useNavigate();

    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6 lg:px-12">
                <FadeInUp className="flex items-end justify-between mb-12">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Ayo Bantu Mereka</h2>
                        <p className="text-gray-500">Pilih campaign kebaikan yang ingin Anda dukung</p>
                    </div>
                    <button className="hidden lg:flex items-center gap-2 text-orange-600 font-semibold hover:gap-3 transition-all">
                        Lihat Semua <ArrowRight className="w-4 h-4" />
                    </button>
                </FadeInUp>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            title: "PEDULI BANJIR BANDANG SUMATERA",
                            org: "Lazismu Banjarnegara",
                            collected: "Rp 10.012",
                            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/12/Gambar-WhatsApp-2025-12-04-pukul-05.41.04_ad7c7d6d.jpg",
                            color: "orange"
                        },
                        {
                            title: "ANAK ASUH",
                            org: "Lazismu Banjarnegara",
                            collected: "Rp 1.253.719",
                            image: "https://lazismubanjarnegara.org/wp-content/uploads/2024/12/IMG-20241217-WA0032.jpg",
                            color: "blue"
                        },
                        {
                            title: "KADO RAMADHAN",
                            org: "Lazismu Banjarnegara",
                            collected: "Rp 150.000",
                            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/03/c524a695-73f6-4ab3-afe8-ae961976dcbc.jpg",
                            color: "green"
                        },
                        {
                            title: "YATIM HEBAT",
                            org: "Lazismu Banjarnegara",
                            collected: "Rp 401.013",
                            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/03/48096432-a373-43ad-875c-5ef6959bd03d-1.jpg",
                            color: "purple"
                        },
                        {
                            title: "ZAKAT FITRAH",
                            org: "Lazismu Banjarnegara",
                            collected: "Rp 401.314",
                            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/03/489ec32f-b095-4d59-bc1d-6c1a46a80d82.jpg",
                            color: "yellow"
                        },
                        {
                            title: "TEBAR TAKJIL RAMADHAN",
                            org: "Lazismu Banjarnegara",
                            collected: "Rp 5.200.000",
                            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/03/02f9d167-bbc4-4669-9d0b-1ef85dd89468.jpg",
                            color: "red"
                        },
                        {
                            title: "TEBAR TAKJIL RAMADHAN",
                            org: "Lazismu Banjarnegara",
                            collected: "Rp 5.200.000",
                            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/02/da8d3a20-532b-4dec-b884-45dc330486b1.jpg",
                            color: "red"
                        },
                        {
                            title: "TEBAR TAKJIL RAMADHAN",
                            org: "Lazismu Banjarnegara",
                            collected: "Rp 5.200.000",
                            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/02/231b3af6-059b-46b5-aa37-6ead5dfc00ac.jpg",
                            color: "red"
                        },
                        {
                            title: "TEBAR TAKJIL RAMADHAN",
                            org: "Lazismu Banjarnegara",
                            collected: "Rp 5.200.000",
                            image: "https://lazismubanjarnegara.org/wp-content/uploads/2025/01/1943f6ef-6592-424d-b3ad-c5bf4c47dd13.jpg",
                            color: "red"
                        }
                    ].map((item, index) => (
                        <FadeInUp key={index} delay={index * 0.05}>
                            <CampaignCard
                                item={item}
                                onClick={() => {
                                    navigate('/donasi', {
                                        state: {
                                            selectedProgram: item.title,
                                            fromCampaign: true
                                        }
                                    });
                                }}
                            />
                        </FadeInUp>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Berdonasi