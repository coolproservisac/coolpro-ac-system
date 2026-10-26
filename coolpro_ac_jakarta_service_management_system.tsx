import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard, Users, Wrench, Calendar, FileText, Package, 
  DollarSign, BarChart3, Settings, Phone, MapPin, Search, 
  Plus, Edit2, Trash2, CheckCircle2, Clock, XCircle, 
  ChevronRight, Printer, Briefcase, UserCheck, MessageSquare, Camera, Star, Shield, UserPlus, Lock, Key, AlertTriangle, CheckSquare, Download, Send, AlertCircle
} from 'lucide-react';

// --- INITIAL MOCK / SEED DATA ---
const INITIAL_SERVICE_TYPES = [
  { id: 'SRV-01', name: 'Cuci AC', category: 'Cuci', defaultFee: 150000, warrantyDays: 30, description: 'Pencucian indoor & outdoor jet cleaner standar.' },
  { id: 'SRV-02', name: 'Perawatan Berkala', category: 'Cuci', defaultFee: 200000, warrantyDays: 30, description: 'Maintenance 3-6 bulanan cek tekanan freon.' },
  { id: 'SRV-03', name: 'Perbaikan / Repair (On-Site Check)', category: 'Repair', defaultFee: 250000, warrantyDays: 90, description: 'Pemeriksaan di lokasi, diagnosa kerusakan, dan estimasi biaya.' },
  { id: 'SRV-04', name: 'Instalasi AC Baru', category: 'Instalasi', defaultFee: 350000, warrantyDays: 90, description: 'Pasang unit baru pipa & kabel standar.' },
  { id: 'SRV-05', name: 'Bongkar Pasang', category: 'Instalasi', defaultFee: 450000, warrantyDays: 90, description: 'Pindah lokasi unit AC lama ke tempat baru.' }
];

const INITIAL_TECHNICIANS = [
  { id: 'TECH-01', username: 'USR73921', password: 'password123', name: 'Budi Santoso', phone: '081234567890', roleType: 'Teknisi Spesialis Cuci', specialty: 'cuci', active: true, jobsCompleted: 42, performanceNotes: 'Sangat rapi dan tepat waktu' },
  { id: 'TECH-02', username: 'USR88210', password: 'password123', name: 'Agus Setiawan', phone: '081345678901', roleType: 'Teknisi Spesialis Cuci', specialty: 'cuci', active: true, jobsCompleted: 38, performanceNotes: 'Ramah dan teliti' },
  { id: 'TECH-03', username: 'USR90123', password: 'password123', name: 'Joko Widodo', phone: '081456789012', roleType: 'Teknisi Spesialis Cuci', specialty: 'cuci', active: true, jobsCompleted: 29, performanceNotes: 'Cepat dalam pengerjaan cuci berkala' },
  { id: 'TECH-04', username: 'USR44512', password: 'password123', name: 'Ahmad Repair', phone: '081567890123', roleType: 'Teknisi Spesialis Repair', specialty: 'repair', active: true, jobsCompleted: 55, performanceNotes: 'Spesialis bongkar pasang & perbaikan berat' },
  { id: 'STAFF-01', username: 'USR11223', password: 'password123', name: 'Siti Aminah', phone: '081678901234', roleType: 'Admin', specialty: 'admin', active: true, jobsCompleted: 0, performanceNotes: 'Admin operasional & customer service' },
  { id: 'STAFF-02', username: 'USR66778', password: 'password123', name: 'Dewi Lestari', phone: '081789012345', roleType: 'Karyawan', specialty: 'staff', active: true, jobsCompleted: 0, performanceNotes: 'Staff administrasi & keuangan' },
  { id: 'MGR-01', username: 'USR10001', password: 'manager123', name: 'H. Suhendra', phone: '081890123456', roleType: 'Manager', specialty: 'manager', active: true, jobsCompleted: 0, performanceNotes: 'Direktur Utama Coolpro AC' }
];

const INITIAL_CUSTOMERS = [
  { id: 'CUST-001', name: 'Ibu Siska Wijaya', phone: '08111222333', whatsapp: '08111222333', address: 'Jl. Sudirman Kav. 52-53, SCBD', district: 'Kebayoran Baru', city: 'Jakarta Selatan', mapLink: 'https://maps.google.com/?q=-6.225,106.805', notes: 'Apartemen lantai 15, parkir basement.', createdAt: '2026-01-10' },
  { id: 'CUST-002', name: 'Bapak Hendra Gunawan', phone: '08122333444', whatsapp: '08122333444', address: 'Jl. Pluit Karang Indah Blok M', district: 'Penjaringan', city: 'Jakarta Utara', mapLink: 'https://maps.google.com/?q=-6.125,106.790', notes: 'Rumah tinggal gerbang hitam.', createdAt: '2026-01-15' },
  { id: 'CUST-003', name: 'PT Maju Sejahtera', phone: '0215558888', whatsapp: '08133444555', address: 'Jl. HR Rasuna Said Blok X-2', district: 'Setiabudi', city: 'Jakarta Selatan', mapLink: 'https://maps.google.com/?q=-6.220,106.830', notes: 'Gedung kantor lantai 3 ruang meeting.', createdAt: '2026-02-01' }
];

const INITIAL_UNITS = [
  { id: 'UNIT-001', customerId: 'CUST-001', brand: 'Daikin', model: 'FTM25NV14', type: 'Split Wall', pk: '1 PK', serialNo: 'DK9982341', location: 'Kamar Utama', installDate: '2024-05-10', warrantyStatus: 'Aktif', warrantyExpiry: '2027-05-10', notes: 'AC inverter, filter baru diganti' },
  { id: 'UNIT-002', customerId: 'CUST-001', brand: 'Panasonic', model: 'CS-XU9WK', type: 'Split Wall', pk: '1 PK', serialNo: 'PS8872391', location: 'Ruang Keluarga', installDate: '2023-11-20', warrantyStatus: 'Habis', warrantyExpiry: '2024-11-20', notes: '' },
  { id: 'UNIT-003', customerId: 'CUST-002', brand: 'Sharp', model: 'AH-AP7ZS', type: 'Split Wall', pk: '0.75 PK', serialNo: 'SH1129384', location: 'Kamar Anak', installDate: '2025-01-05', warrantyStatus: 'Aktif', warrantyExpiry: '2028-01-05', notes: 'Pipa agak panjang (7 meter)' },
  { id: 'UNIT-004', customerId: 'CUST-003', brand: 'LG', model: 'B18END', type: 'Cassette', pk: '2 PK', serialNo: 'LG5543219', location: 'Ruang Direksi', installDate: '2025-06-15', warrantyStatus: 'Aktif', warrantyExpiry: '2028-06-15', notes: 'Perlu tangga tinggi saat cuci' }
];

const INITIAL_INVENTORY = [
  { id: 'PART-001', code: 'FREON-R32', name: 'Freon R32 (Tabung 3kg)', category: 'Freon', unit: 'Tabung', stock: 12, minStock: 3, buyPrice: 350000, sellPrice: 500000 },
  { id: 'PART-002', code: 'FREON-R410', name: 'Freon R410A (Tabung 3kg)', category: 'Freon', unit: 'Tabung', stock: 8, minStock: 2, buyPrice: 400000, sellPrice: 600000 },
  { id: 'PART-003', code: 'CAP-35', name: 'Kapasitor Kompresor 35uF', category: 'Sparepart', unit: 'Pcs', stock: 15, minStock: 5, buyPrice: 45000, sellPrice: 120000 },
  { id: 'PART-004', code: 'MCB-10A', name: 'MCB Schneider 10A', category: 'Elektrikal', unit: 'Pcs', stock: 20, minStock: 4, buyPrice: 60000, sellPrice: 135000 },
  { id: 'PART-005', code: 'PIPA-14', name: 'Pipa Tembaga 1/4 + 3/8 (Meter)', category: 'Material', unit: 'Meter', stock: 45, minStock: 10, buyPrice: 65000, sellPrice: 110000 }
];

const INITIAL_WORK_ORDERS = [
  {
    id: 'WO-20261024-001',
    orderDate: '2026-10-24',
    customerId: 'CUST-002',
    unitId: 'UNIT-003',
    jobTypes: ['Cuci AC'],
    complaint: 'AC kurang dingin dan berdebu.',
    diagnosis: 'Filter evaporator kotor berdebu tebal.',
    action: 'Pencucian standar jet cleaner indoor dan outdoor.',
    techNotes: 'Selesai dicuci bersih, tekanan freon normal 150 psi.',
    beforePhoto: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    partsUsed: [],
    serviceFee: 150000,
    partsFee: 0,
    discount: 0,
    totalCost: 150000,
    technicianId: 'TECH-01',
    scheduleDate: '2026-10-24',
    startTime: '10:00',
    endTime: '12:00',
    adminNotes: 'Kemarin selesai tepat waktu.',
    status: 'Selesai',
    rating: 5,
    customerReview: 'Pelayanan sangat memuaskan, teknisi ramah dan AC dingin kembali.',
    warrantyDays: 30,
    warrantyUsed: false,
    statusHistory: [
      { status: 'Permintaan baru', time: '2026-10-24 08:00' },
      { status: 'Selesai', time: '2026-10-24 12:00' }
    ]
  },
  {
    id: 'WO-20261025-001',
    orderDate: '2026-10-25',
    customerId: 'CUST-001',
    unitId: 'UNIT-001',
    jobTypes: ['Cuci AC', 'Perawatan Berkala'],
    complaint: 'AC kurang dingin dan sedikit berbau apek.',
    diagnosis: 'Filter kotor berdebu dan evaporator berlendir.',
    action: 'Pencucian total indoor & outdoor menggunakan mesin jet cleaner steam.',
    techNotes: 'Pekerjaan selesai, suhu kembali normal.',
    beforePhoto: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    partsUsed: [],
    serviceFee: 350000,
    partsFee: 0,
    discount: 0,
    totalCost: 350000,
    technicianId: 'TECH-01',
    scheduleDate: '2026-10-25',
    startTime: '09:00',
    endTime: '11:00',
    adminNotes: 'Pelanggan minta tepat jam 9 pagi.',
    status: 'Selesai',
    rating: 5,
    customerReview: 'Teknisi Budi sangat profesional.',
    warrantyDays: 30,
    warrantyUsed: false,
    statusHistory: [
      { status: 'Permintaan baru', time: '2026-10-25 08:00' },
      { status: 'Selesai', time: '2026-10-25 11:30' }
    ]
  },
  {
    id: 'WO-20261025-002',
    orderDate: '2026-10-25',
    customerId: 'CUST-002',
    unitId: 'UNIT-003',
    jobTypes: ['Perbaikan / Repair (On-Site Check)'],
    complaint: 'AC mati total / tidak mau nyala.',
    diagnosis: 'Kapasitor kompresor lemah dan out of range setelah pengecekan di lokasi.',
    action: 'Penggantian kapasitor 35uF.',
    techNotes: 'Kompresor kembali menyala normal.',
    beforePhoto: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80',
    partsUsed: [{ partId: 'PART-003', qty: 1, name: 'Kapasitor Kompresor 35uF', price: 120000 }],
    serviceFee: 250000,
    partsFee: 120000,
    discount: 0,
    totalCost: 370000,
    technicianId: 'TECH-04',
    scheduleDate: '2026-10-25',
    startTime: '13:00',
    endTime: '15:00',
    adminNotes: 'Harap bawa tangga.',
    status: 'Disetujui Pelanggan',
    onSiteRequestNotes: 'Flushing & tambah oli Kompresor R32 & Isi Freon R32 Baru [Tambahan Layanan: Perbaikan / Repair (On-Site Check)]',
    onSiteRequestRead: true,
    customerApproved: true,
    adminApprovedForTech: true,
    rating: 0,
    customerReview: '',
    warrantyDays: 90,
    warrantyUsed: false,
    statusHistory: [
      { status: 'Permintaan baru', time: '2026-10-25 10:00' },
      { status: 'Menunggu Persetujuan Pelanggan', time: '2026-10-25 13:45' },
      { status: 'Disetujui Pelanggan', time: '2026-10-25 14:00' }
    ]
  },
  {
    id: 'WO-20261026-001',
    orderDate: '2026-10-25',
    customerId: 'CUST-003',
    unitId: 'UNIT-004',
    jobTypes: ['Perawatan Berkala'],
    complaint: 'Maintenance rutin 3 bulanan AC Kantor.',
    diagnosis: '',
    action: '',
    techNotes: '',
    beforePhoto: '',
    afterPhoto: '',
    partsUsed: [],
    serviceFee: 200000,
    partsFee: 0,
    discount: 0,
    totalCost: 200000,
    technicianId: 'TECH-02',
    scheduleDate: '2026-10-26',
    startTime: '10:00',
    endTime: '12:00',
    adminNotes: 'Jadwal untuk besok pagi.',
    status: 'Terjadwal',
    rating: 0,
    customerReview: '',
    warrantyDays: 30,
    warrantyUsed: false,
    statusHistory: [
      { status: 'Terjadwal', time: '2026-10-25 15:00' }
    ]
  }
];

const INITIAL_INVOICES = [
  {
    id: 'INV-2026-001',
    woId: 'WO-20260301-001',
    customerId: 'CUST-001',
    date: '2026-03-02',
    dueDate: '2026-03-09',
    subtotal: 150000,
    partsFee: 0,
    discount: 0,
    total: 150000,
    status: 'Lunas',
    paymentMethod: 'Transfer BCA',
    paymentDate: '2026-03-02'
  },
  {
    id: 'INV-2026-002',
    woId: 'WO-20261025-001',
    customerId: 'CUST-001',
    date: '2026-10-25',
    dueDate: '2026-11-01',
    subtotal: 350000,
    partsFee: 0,
    discount: 0,
    total: 350000,
    status: 'Lunas',
    paymentMethod: 'Transfer BCA',
    paymentDate: '2026-10-25'
  },
  {
    id: 'INV-2026-003',
    woId: 'WO-20261024-001',
    customerId: 'CUST-002',
    date: '2026-10-24',
    dueDate: '2026-10-31',
    subtotal: 150000,
    partsFee: 0,
    discount: 0,
    total: 150000,
    status: 'Pending',
    paymentMethod: 'Cash / Tunai',
    paymentDate: ''
  }
];

const INITIAL_WHATSAPP_TEMPLATES = [
  {
    id: 'TMP-01',
    title: 'Pengingat Jadwal Servis Besok',
    content: 'Halo Bapak/Ibu [NAMA_PELANGGAN], kami dari Coolpro AC Jakarta ingin mengingatkan jadwal kunjungan servis AC ([JENIS_JASA]) untuk unit [MEREK_UNIT] di lokasi [LOKASI_UNIT] besok pada tanggal [TANGGAL] pukul [JAM_MULAI] WIB. Teknisi kami yang bertugas adalah [NAMA_TEKNISI]. Terima kasih.'
  },
  {
    id: 'TMP-02',
    title: 'Pengingat Cuci Rutin 3 Bulan',
    content: 'Halo Bapak/Ibu [NAMA_PELANGGAN], sudah 3 bulan sejak servis terakhir unit AC [MEREK_UNIT] di [LOKASI_UNIT]. Agar AC tetap dingin dan sejuk, yuk jadwalkan cuci berkala bersama Coolpro AC Jakarta!'
  },
  {
    id: 'TMP-03',
    title: 'Estimasi Biaya & Invoice Perbaikan (On-Site)',
    content: 'Halo Bapak/Ibu [NAMA_PELANGGAN], berikut adalah rincian estimasi biaya perbaikan dan suku cadang untuk unit AC [MEREK_UNIT] berdasarkan hasil pengecekan di lokasi:\n\n- Catatan Pengecekan / Tindakan: [CATATAN_LAPANGAN]\n- Layanan/Jasa: [JENIS_JASA] (Rp [BIAYA_JASA])\n- Suku Cadang: [NAMA_SPAREPART] (Rp [BIAYA_SPAREPART])\n- Total Tagihan: Rp [TOTAL_BIAYA]\n\nMohon konfirmasinya untuk melanjutkan perbaikan. Terima kasih!'
  },
  {
    id: 'TMP-04',
    title: 'Kirim Invoice Fisik & Tagihan Resmi',
    content: 'Halo Bapak/Ibu [NAMA_PELANGGAN], terima kasih telah menggunakan layanan Coolpro AC Jakarta. Berikut adalah rincian Invoice Resmi ([NOMOR_INVOICE]) untuk unit [MEREK_UNIT]:\n\n- Layanan/Jasa: [JENIS_JASA]\n- Tanggal Servis: [TANGGAL]\n- Total Tagihan: Rp [TOTAL_BIAYA]\n- Status: [STATUS_INVOICE]\n\nPembayaran dapat ditransfer ke rekening BCA 1234567890 an. PT Coolpro AC Jakarta. Terima kasih atas kepercayaan Anda!'
  },
  {
    id: 'TMP-05',
    title: 'Permintaan Penilaian & Kepuasan Pelanggan',
    content: 'Halo Bapak/Ibu [NAMA_PELANGGAN], terima kasih telah menggunakan layanan Coolpro AC Jakarta ([JENIS_JASA]). Mohon kesediaannya untuk memberikan penilaian kepuasan (1-5 Bintang) dan ulasan atas kinerja teknisi kami [NAMA_TEKNISI]. Kepuasan Anda adalah prioritas kami!'
  }
];

const INITIAL_COMPANY_SETTINGS = {
  name: 'Coolpro AC Jakarta',
  phone: '021-55512345',
  whatsapp: '081199887766',
  email: 'support@coolprojakarta.com',
  address: 'Jl. Gatot Subroto No. 45, RT.1/RW.4, Kuningan Timur, Setiabudi',
  city: 'Jakarta Selatan, DKI Jakarta 12950',
  currency: 'IDR',
  timezone: 'Asia/Jakarta'
};

const formatWhatsAppNumber = (phone) => {
  let clean = (phone || '').replace(/\D/g, '');
  if (clean.startsWith('0')) {
    clean = '62' + clean.slice(1);
  }
  return clean;
};

// ==========================================
// 1. DASHBOARD VIEW
// ==========================================
function DashboardView({ workOrders, customers, units, technicians, invoices, setActiveTab, formatIDR }) {
  const todayStr = '2026-10-25';
  const todayJobs = workOrders.filter(w => w.scheduleDate === todayStr);
  const pendingJobs = workOrders.filter(w => ['Permintaan baru', 'Menunggu penjadwalan', 'Terjadwal', 'Menunggu Persetujuan Pelanggan'].includes(w.status));
  const inProgressJobs = workOrders.filter(w => ['Konfirmasi', 'Dalam perjalanan', 'Sedang dikerjakan', 'Disetujui Pelanggan'].includes(w.status));
  const completedJobs = workOrders.filter(w => w.status === 'Selesai');

  const totalRevenue = invoices.filter(i => i.status === 'Lunas').reduce((acc, curr) => acc + curr.total, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-gradient-to-r from-slate-900 to-slate-800 text-white p-6 rounded-2xl shadow-lg">
        <div>
          <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Dashboard Utama</span>
          <h2 className="text-2xl font-black mt-1">Sistem Manajemen Coolpro AC Jakarta</h2>
          <p className="text-slate-300 text-sm mt-1">Kelola operasional teknisi, work order, CRM pelanggan, dan laporan servis HVAC.</p>
        </div>
        <div className="flex space-x-3">
          <button onClick={() => setActiveTab('workorders')} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-2">
            <Plus className="w-4 h-4"/>
            <span>Buat Work Order Baru</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Pelanggan</p>
          <p className="text-2xl font-black text-slate-900">{customers.length}</p>
          <p className="text-[11px] text-emerald-600 font-semibold">CRM Terdaftar</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase">Unit AC Terdaftar</p>
          <p className="text-2xl font-black text-slate-900">{units.length}</p>
          <p className="text-[11px] text-cyan-600 font-semibold">Indoor & Outdoor</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase">Pekerjaan Hari Ini</p>
          <p className="text-2xl font-black text-blue-600">{todayJobs.length}</p>
          <p className="text-[11px] text-slate-500 font-semibold">{todayStr}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase">Pendapatan Lunas</p>
          <p className="text-xl font-black text-emerald-600 truncate">{formatIDR(totalRevenue)}</p>
          <p className="text-[11px] text-slate-500 font-semibold">Dari Invoice Lunas</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-base">Work Order Terbaru</h3>
            <button onClick={() => setActiveTab('workorders')} className="text-xs font-bold text-cyan-600 hover:text-cyan-700">Lihat Semua →</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
                  <th className="pb-3">No. WO</th>
                  <th className="pb-3">Pelanggan</th>
                  <th className="pb-3">Jenis Jasa</th>
                  <th className="pb-3">Jadwal</th>
                  <th className="pb-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {workOrders.slice(0, 5).map(wo => {
                  const cust = customers.find(c => c.id === wo.customerId);
                  const jobTypesStr = wo.jobTypes ? wo.jobTypes.join(', ') : (wo.jobType || '-');
                  return (
                    <tr key={wo.id} className="hover:bg-slate-50">
                      <td className="py-3 font-mono font-bold text-cyan-700">{wo.id}</td>
                      <td className="py-3 font-bold text-slate-800">{cust?.name || '-'}</td>
                      <td className="py-3 text-slate-600">{jobTypesStr}</td>
                      <td className="py-3 text-slate-600">{wo.scheduleDate}</td>
                      <td className="py-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${wo.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' : wo.status === 'Menunggu Persetujuan Pelanggan' ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-blue-100 text-blue-800'}`}>
                          {wo.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-slate-900 text-base">Status Ringkasan Tugas</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700">Pekerjaan Menunggu</span>
              <span className="text-sm font-black text-amber-600">{pendingJobs.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700">Sedang Berlangsung</span>
              <span className="text-sm font-black text-cyan-600">{inProgressJobs.length}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-xs font-bold text-slate-700">Selesai Dikerjakan</span>
              <span className="text-sm font-black text-emerald-600">{completedJobs.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 2. CUSTOMERS & UNITS VIEW
// ==========================================
function CustomersView({ customers, units, setCustomers, setUnits, showToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCust, setSelectedCust] = useState(null);
  const [showAddCustModal, setShowAddCustModal] = useState(false);
  const [showAddUnitModal, setShowAddUnitModal] = useState(false);

  const [formCust, setFormCust] = useState({ name: '', phone: '', whatsapp: '', address: '', district: '', city: 'Jakarta Selatan', mapLink: '', notes: '' });
  const [formUnit, setFormUnit] = useState({ brand: '', model: '', type: 'Split Wall', pk: '1 PK', serialNo: '', location: 'Kamar Utama', installDate: '', notes: '' });

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.phone.includes(searchQuery) || 
    c.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveCust = (e) => {
    e.preventDefault();
    if (!formCust.name || !formCust.phone) {
      showToast('Nama dan nomor telepon wajib diisi!', 'error');
      return;
    }
    const newCust = {
      id: `CUST-${String(customers.length + 1).padStart(3, '0')}`,
      ...formCust,
      whatsapp: formCust.whatsapp || formCust.phone,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCustomers([newCust, ...customers]);
    setShowAddCustModal(false);
    setFormCust({ name: '', phone: '', whatsapp: '', address: '', district: '', city: 'Jakarta Selatan', mapLink: '', notes: '' });
    showToast('Pelanggan berhasil ditambahkan!');
  };

  const handleSaveUnit = (e) => {
    e.preventDefault();
    if (!selectedCust || !formUnit.brand) {
      showToast('Pilih pelanggan dan merek AC!', 'error');
      return;
    }
    const newUnit = {
      id: `UNIT-${String(units.length + 1).padStart(3, '0')}`,
      customerId: selectedCust.id,
      ...formUnit,
      warrantyStatus: 'Aktif',
      warrantyExpiry: new Date(Date.now() + 365*3*24*60*60*1000).toISOString().split('T')[0]
    };
    setUnits([...units, newUnit]);
    setShowAddUnitModal(false);
    setFormUnit({ brand: '', model: '', type: 'Split Wall', pk: '1 PK', serialNo: '', location: 'Kamar Utama', installDate: '', notes: '' });
    showToast('Unit AC berhasil ditambahkan!');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">CRM Pelanggan & Database Unit AC</h2>
          <p className="text-xs text-slate-500">Kelola data pelanggan Jakarta dan unit AC yang terhubung.</p>
        </div>
        <button onClick={() => setShowAddCustModal(true)} className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center space-x-2">
          <Plus className="w-4 h-4"/>
          <span>Tambah Pelanggan Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5"/>
            <input 
              type="text" 
              placeholder="Cari nama, telp, alamat..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredCustomers.map(cust => (
              <div 
                key={cust.id} 
                onClick={() => setSelectedCust(cust)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${selectedCust?.id === cust.id ? 'bg-cyan-50 border-cyan-500 shadow-sm' : 'bg-white border-slate-200 hover:bg-slate-50'}`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-slate-900 text-sm">{cust.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{cust.phone}</p>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">{cust.id}</span>
                </div>
                <p className="text-xs text-slate-600 mt-2 truncate">{cust.address}, {cust.district}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          {selectedCust ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-4">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-2 py-1 rounded">{selectedCust.id}</span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">{selectedCust.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{selectedCust.address}, {selectedCust.district}, {selectedCust.city}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <a href={`https://wa.me/${formatWhatsAppNumber(selectedCust.whatsapp || selectedCust.phone)}?text=Halo%20${encodeURIComponent(selectedCust.name)},%20kami%20dari%20Coolpro%20AC%20Jakarta.`} target="_blank" rel="noreferrer" className="px-3.5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-sm">
                    <Phone className="w-3.5 h-3.5"/>
                    <span>WhatsApp</span>
                  </a>
                  {selectedCust.mapLink && (
                    <a href={selectedCust.mapLink} target="_blank" rel="noreferrer" className="px-3.5 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-xl text-xs flex items-center space-x-1.5 shadow-sm">
                      <MapPin className="w-3.5 h-3.5"/>
                      <span>Shareloc Maps</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-base">Daftar Unit AC Milik Pelanggan</h4>
                  <button onClick={() => setShowAddUnitModal(true)} className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 rounded-xl text-xs font-bold flex items-center space-x-1">
                    <Plus className="w-3.5 h-3.5"/>
                    <span>Tambah Unit AC</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {units.filter(u => u.customerId === selectedCust.id).map(unit => (
                    <div key={unit.id} className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-[10px] font-mono font-bold text-cyan-700">{unit.id}</span>
                          <h5 className="font-bold text-slate-900 text-sm">{unit.brand} — {unit.model}</h5>
                        </div>
                        <span className="text-xs bg-cyan-100 text-cyan-800 px-2 py-0.5 rounded font-bold">{unit.pk}</span>
                      </div>
                      <p className="text-xs text-slate-600">Lokasi: <b>{unit.location}</b> ({unit.type})</p>
                      <p className="text-xs text-slate-500">Garansi: {unit.warrantyStatus} (s.d {unit.warrantyExpiry})</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-16 text-center space-y-2">
              <Users className="w-12 h-12 text-slate-300 mx-auto"/>
              <p className="text-slate-700 font-bold">Pilih salah satu pelanggan di sebelah kiri untuk melihat detail CRM dan unit AC.</p>
            </div>
          )}
        </div>
      </div>

      {showAddCustModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveCust} className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-black text-slate-900 text-lg">Tambah Pelanggan Baru</h3>
              <button type="button" onClick={() => setShowAddCustModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-6 h-6"/></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap *</label>
                <input type="text" required value={formCust.name} onChange={e => setFormCust({...formCust, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">No. Telepon / HP *</label>
                  <input type="text" required value={formCust.phone} onChange={e => setFormCust({...formCust, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">No. WhatsApp</label>
                  <input type="text" value={formCust.whatsapp} onChange={e => setFormCust({...formCust, whatsapp: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Alamat Lengkap</label>
                <textarea rows="2" value={formCust.address} onChange={e => setFormCust({...formCust, address: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kecamatan</label>
                  <input type="text" value={formCust.district} onChange={e => setFormCust({...formCust, district: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kota / Wilayah</label>
                  <input type="text" value={formCust.city} onChange={e => setFormCust({...formCust, city: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Link Shareloc Google Maps (URL)</label>
                <input type="text" placeholder="https://maps.google.com/?q=..." value={formCust.mapLink} onChange={e => setFormCust({...formCust, mapLink: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
              </div>
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={() => setShowAddCustModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs">Batal</button>
              <button type="submit" className="px-5 py-2 bg-cyan-600 text-white rounded-xl font-bold text-xs shadow-md">Simpan Pelanggan</button>
            </div>
          </form>
        </div>
      )}

      {showAddUnitModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveUnit} className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-black text-slate-900 text-lg">Tambah Unit AC Baru</h3>
              <button type="button" onClick={() => setShowAddUnitModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-6 h-6"/></button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Merek AC *</label>
                  <input type="text" required placeholder="Daikin / Panasonic / Sharp" value={formUnit.brand} onChange={e => setFormUnit({...formUnit, brand: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Model / Tipe</label>
                  <input type="text" placeholder="FTM25NV14" value={formUnit.model} onChange={e => setFormUnit({...formUnit, model: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kapasitas PK</label>
                  <select value={formUnit.pk} onChange={e => setFormUnit({...formUnit, pk: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500">
                    <option>0.5 PK</option>
                    <option>0.75 PK</option>
                    <option>1 PK</option>
                    <option>1.5 PK</option>
                    <option>2 PK</option>
                    <option>2.5 PK+</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Lokasi Pemasangan</label>
                  <input type="text" placeholder="Kamar Utama / Ruang Tamu" value={formUnit.location} onChange={e => setFormUnit({...formUnit, location: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
                </div>
              </div>
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={() => setShowAddUnitModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs">Batal</button>
              <button type="submit" className="px-5 py-2 bg-cyan-600 text-white rounded-xl font-bold text-xs shadow-md">Simpan Unit AC</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 3. SERVICES VIEW (Master Jasa Layanan with Warranty Duration)
// ==========================================
function ServicesView({ serviceTypes, setServiceTypes, showToast, formatIDR }) {
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'Cuci', defaultFee: 150000, warrantyDays: 30, description: '' });

  const handleOpenAdd = () => {
    setEditItem(null);
    setForm({ name: '', category: 'Cuci', defaultFee: 150000, warrantyDays: 30, description: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (srv) => {
    setEditItem(srv);
    setForm({ name: srv.name, category: srv.category, defaultFee: srv.defaultFee, warrantyDays: srv.warrantyDays || 30, description: srv.description });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name || !form.defaultFee) {
      showToast('Nama layanan dan tarif wajib diisi!', 'error');
      return;
    }
    if (editItem) {
      setServiceTypes(serviceTypes.map(s => s.id === editItem.id ? { ...s, ...form, defaultFee: Number(form.defaultFee), warrantyDays: Number(form.warrantyDays) } : s));
      showToast('Layanan berhasil diperbarui!');
    } else {
      const newSrv = {
        id: `SRV-${String(serviceTypes.length + 1).padStart(2, '0')}`,
        ...form,
        defaultFee: Number(form.defaultFee),
        warrantyDays: Number(form.warrantyDays)
      };
      setServiceTypes([...serviceTypes, newSrv]);
      showToast('Layanan baru berhasil ditambahkan!');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus jenis layanan ini?')) {
      setServiceTypes(serviceTypes.filter(s => s.id !== id));
      showToast('Layanan berhasil dihapus.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Master Jasa Layanan HVAC & Durasi Garansi</h2>
          <p className="text-xs text-slate-500">Kelola daftar layanan servis, kategori, tarif standar, dan durasi garansi manual.</p>
        </div>
        <button onClick={handleOpenAdd} className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center space-x-2">
          <Plus className="w-4 h-4"/>
          <span>Tambah Layanan Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {serviceTypes.map(srv => (
          <div key={srv.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 relative">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">{srv.id}</span>
                <h3 className="font-bold text-slate-900 text-base mt-1">{srv.name}</h3>
              </div>
              <span className="text-xs bg-slate-100 text-slate-800 px-2.5 py-1 rounded-full font-bold">{srv.category}</span>
            </div>
            <p className="text-xs text-slate-600">{srv.description || 'Tidak ada deskripsi.'}</p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 flex justify-between items-center text-xs">
              <span className="text-slate-500">Durasi Garansi:</span>
              <span className="font-bold text-cyan-700">{srv.warrantyDays || 30} Hari</span>
            </div>
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400">Tarif Standar</p>
                <p className="text-base font-black text-emerald-600">{formatIDR(srv.defaultFee)}</p>
              </div>
              <div className="flex space-x-2">
                <button onClick={() => handleOpenEdit(srv)} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"><Edit2 className="w-3.5 h-3.5"/></button>
                <button onClick={() => handleDelete(srv.id)} className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl"><Trash2 className="w-3.5 h-3.5"/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-black text-slate-900 text-lg">{editItem ? 'Edit Jasa Layanan' : 'Tambah Jasa Layanan'}</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-6 h-6"/></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Layanan *</label>
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Kategori</label>
                  <select value={form.category} onChange={e => setForm({...form, category: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500">
                    <option value="Cuci">Cuci</option>
                    <option value="Repair">Repair / Perbaikan</option>
                    <option value="Instalasi">Instalasi</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tarif Standar (IDR) *</label>
                  <input type="number" required value={form.defaultFee} onChange={e => setForm({...form, defaultFee: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Durasi Garansi Manual (Hari) *</label>
                <input type="number" required placeholder="Contoh: 30 atau 90 hari" value={form.warrantyDays} onChange={e => setForm({...form, warrantyDays: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
                <p className="text-[10px] text-slate-400 mt-1">Masukkan jumlah hari masa garansi pengerjaan berlaku secara otomatis setelah servis selesai.</p>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Deskripsi Layanan</label>
                <textarea rows="2" value={form.description} onChange={e => setForm({...form, description: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"></textarea>
              </div>
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs">Batal</button>
              <button type="submit" className="px-5 py-2 bg-cyan-600 text-white rounded-xl font-bold text-xs shadow-md">Simpan</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. REMINDERS VIEW (Pengingat Cuci 3 Bulan with Direct WhatsApp)
// ==========================================
function RemindersView({ units, customers, workOrders, whatsappTemplates, showToast }) {
  const today = new Date('2026-10-25');
  const [showWaModal, setShowWaModal] = useState(false);
  const [activeItemForWa, setActiveItemForWa] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState(whatsappTemplates[1]?.id || whatsappTemplates[0]?.id || '');

  const unitsWithReminder = units.map(unit => {
    const unitWos = workOrders.filter(w => w.unitId === unit.id && w.status === 'Selesai').sort((a,b) => new Date(b.scheduleDate) - new Date(a.scheduleDate));
    const lastWo = unitWos[0];
    const lastDateStr = lastWo ? lastWo.scheduleDate : unit.installDate || '2026-01-01';
    
    const lastDateObj = new Date(lastDateStr);
    const dueDateObj = new Date(lastDateObj);
    dueDateObj.setMonth(dueDateObj.getMonth() + 3);

    const diffDays = Math.ceil((dueDateObj - today) / (1000 * 60 * 60 * 24));
    let statusBadge = 'Aman';
    let badgeColor = 'bg-emerald-100 text-emerald-800';

    if (diffDays < 0) {
      statusBadge = `Terlambat ${Math.abs(diffDays)} hari`;
      badgeColor = 'bg-rose-100 text-rose-800';
    } else if (diffDays <= 14) {
      statusBadge = `Jatuh tempo dlm ${diffDays} hari`;
      badgeColor = 'bg-amber-100 text-amber-800';
    }

    return {
      unit,
      customer: customers.find(c => c.id === unit.customerId),
      lastDate: lastDateStr,
      dueDate: dueDateObj.toISOString().split('T')[0],
      diffDays,
      statusBadge,
      badgeColor
    };
  });

  const openWaReminderModal = (item) => {
    setActiveItemForWa(item);
    setSelectedTemplateId(whatsappTemplates.find(t => t.id === 'TMP-02')?.id || whatsappTemplates[0]?.id || '');
    setShowWaModal(true);
  };

  const sendReminderWa = () => {
    if (!activeItemForWa) return;
    const { unit, customer } = activeItemForWa;
    const tmp = whatsappTemplates.find(t => t.id === selectedTemplateId);
    if (!customer || !tmp) return;

    let message = tmp.content
      .replace(/\[NAMA_PELANGGAN\]/g, customer.name || '')
      .replace(/\[JENIS_JASA\]/g, 'Cuci Berkala 3 Bulan')
      .replace(/\[MEREK_UNIT\]/g, `${unit.brand} (${unit.model})` || '')
      .replace(/\[LOKASI_UNIT\]/g, unit.location || '')
      .replace(/\[TANGGAL\]/g, activeItemForWa.dueDate || '')
      .replace(/\[ALAMAT_PELANGGAN\]/g, customer.address || '');

    const phoneNum = formatWhatsAppNumber(customer.whatsapp || customer.phone);
    const waUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setShowWaModal(false);
    showToast('Membuka WhatsApp untuk mengirim pengingat cuci...');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Pengingat Cuci Berkala (3 Bulan)</h2>
        <p className="text-xs text-slate-500">Daftar unit AC yang mendekati atau melewati jadwal rutin cuci 3 bulanan beserta tombol pengingat WhatsApp.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Unit AC</th>
              <th className="pb-3">Pelanggan & Kontak</th>
              <th className="pb-3">Lokasi / PK</th>
              <th className="pb-3">Servis Terakhir</th>
              <th className="pb-3">Jatuh Tempo (3 Bln)</th>
              <th className="pb-3">Status Pengingat</th>
              <th className="pb-3 text-right">Kirim WhatsApp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {unitsWithReminder.map((item, idx) => {
              const { unit, customer, lastDate, dueDate, statusBadge, badgeColor } = item;
              return (
                <tr key={unit.id || idx} className="hover:bg-slate-50">
                  <td className="py-3 font-bold text-slate-900">{unit.brand} ({unit.model})</td>
                  <td className="py-3">
                    <p className="font-bold text-slate-800">{customer?.name || '-'}</p>
                    <p className="text-slate-500 text-[11px]">{customer?.phone}</p>
                  </td>
                  <td className="py-3 text-slate-600">{unit.location} ({unit.pk})</td>
                  <td className="py-3 font-mono text-slate-700">{lastDate}</td>
                  <td className="py-3 font-mono font-bold text-cyan-700">{dueDate}</td>
                  <td className="py-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${badgeColor}`}>{statusBadge}</span>
                  </td>
                  <td className="py-3 text-right">
                    <button onClick={() => openWaReminderModal(item)} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm flex items-center space-x-1 ml-auto">
                      <MessageSquare className="w-3.5 h-3.5"/>
                      <span>Kirim WA Pengingat</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showWaModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-black text-slate-900 text-lg">Kirim Pengingat Cuci 3 Bulan</h3>
              <button type="button" onClick={() => setShowWaModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-6 h-6"/></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Pilih Template Pesan</label>
                <select value={selectedTemplateId} onChange={e => setSelectedTemplateId(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500">
                  {whatsappTemplates.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Preview Isi Pesan WhatsApp:</label>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700 whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {(() => {
                    const tmp = whatsappTemplates.find(t => t.id === selectedTemplateId);
                    if (!tmp || !activeItemForWa) return '';
                    const { unit, customer } = activeItemForWa;
                    return tmp.content
                      .replace(/\[NAMA_PELANGGAN\]/g, customer?.name || '')
                      .replace(/\[JENIS_JASA\]/g, 'Cuci Berkala 3 Bulan')
                      .replace(/\[MEREK_UNIT\]/g, `${unit.brand} (${unit.model})` || '')
                      .replace(/\[LOKASI_UNIT\]/g, unit.location || '')
                      .replace(/\[TANGGAL\]/g, activeItemForWa.dueDate || '')
                      .replace(/\[ALAMAT_PELANGGAN\]/g, customer?.address || '');
                  })()}
                </div>
              </div>
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={() => setShowWaModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs">Batal</button>
              <button type="button" onClick={sendReminderWa} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md flex items-center space-x-1.5">
                <MessageSquare className="w-4 h-4"/>
                <span>Buka WhatsApp Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 5. WHATSAPP TEMPLATE MANAGER VIEW
// ==========================================
function WhatsappTemplatesView({ whatsappTemplates, setWhatsappTemplates, showToast }) {
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: '', content: '' });

  const handleOpenAdd = () => {
    setEditItem(null);
    setForm({ title: '', content: '' });
    setShowModal(true);
  };

  const handleOpenEdit = (tmp) => {
    setEditItem(tmp);
    setForm({ title: tmp.title, content: tmp.content });
    setShowModal(true);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      showToast('Judul dan isi template wajib diisi!', 'error');
      return;
    }
    if (editItem) {
      setWhatsappTemplates(whatsappTemplates.map(t => t.id === editItem.id ? { ...t, ...form } : t));
      showToast('Template WhatsApp berhasil diperbarui!');
    } else {
      const newTmp = {
        id: `TMP-${String(whatsappTemplates.length + 1).padStart(2, '0')}`,
        ...form
      };
      setWhatsappTemplates([...whatsappTemplates, newTmp]);
      showToast('Template WhatsApp baru berhasil ditambahkan!');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus template WhatsApp ini?')) {
      setWhatsappTemplates(whatsappTemplates.filter(t => t.id !== id));
      showToast('Template berhasil dihapus.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Template Pesan WhatsApp & Kepuasan Pelanggan</h2>
          <p className="text-xs text-slate-500">Kelola template pesan pengingat, notifikasi, dan penilaian kepuasan untuk dikirimkan ke pelanggan.</p>
        </div>
        <button onClick={handleOpenAdd} className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center space-x-2">
          <Plus className="w-4 h-4"/>
          <span>Tambah Template Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {whatsappTemplates.map(tmp => (
          <div key={tmp.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 relative">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">{tmp.id}</span>
                <h3 className="font-bold text-slate-900 text-base mt-1">{tmp.title}</h3>
              </div>
              <div className="flex space-x-1.5">
                <button onClick={() => handleOpenEdit(tmp)} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"><Edit2 className="w-3.5 h-3.5"/></button>
                <button onClick={() => handleDelete(tmp.id)} className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl"><Trash2 className="w-3.5 h-3.5"/></button>
              </div>
            </div>
            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs text-slate-700 whitespace-pre-wrap font-mono">
              {tmp.content}
            </div>
            <p className="text-[10px] text-slate-400 italic">Variabel: [NAMA_PELANGGAN], [JENIS_JASA], [MEREK_UNIT], [LOKASI_UNIT], [TANGGAL], [JAM_MULAI], [NAMA_TEKNISI], [CATATAN_LAPANGAN], [BIAYA_JASA], [NAMA_SPAREPART], [BIAYA_SPAREPART], [TOTAL_BIAYA], [NOMOR_INVOICE], [STATUS_INVOICE]</p>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-black text-slate-900 text-lg">{editItem ? 'Edit Template WhatsApp' : 'Tambah Template WhatsApp'}</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-6 h-6"/></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Judul / Nama Template *</label>
                <input type="text" required placeholder="Contoh: Permintaan Penilaian Pelanggan" value={form.title} onChange={e => setForm({...form, title: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Isi Pesan Template *</label>
                <textarea rows="5" required value={form.content} onChange={e => setForm({...form, content: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-mono text-xs focus:outline-none focus:border-cyan-500" placeholder="Halo [NAMA_PELANGGAN]..."></textarea>
              </div>
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs">Batal</button>
              <button type="submit" className="px-5 py-2 bg-cyan-600 text-white rounded-xl font-bold text-xs shadow-md">Simpan Template</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 6. MASTER TECHNICIANS & STAFF VIEW
// ==========================================
function TechniciansView({ technicians, setTechnicians, workOrders, showToast }) {
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    username: '',
    password: 'password123',
    roleType: 'Teknisi Spesialis Cuci',
    specialty: 'cuci',
    active: true,
    performanceNotes: ''
  });

  const generateAutoUsername = () => {
    const randNum = Math.floor(10000 + Math.random() * 90000);
    return `USR${randNum}`;
  };

  const handleOpenAdd = () => {
    setEditItem(null);
    setForm({
      name: '',
      phone: '',
      username: generateAutoUsername(),
      password: 'password123',
      roleType: 'Teknisi Spesialis Cuci',
      specialty: 'cuci',
      active: true,
      performanceNotes: 'Karyawan / Teknisi baru'
    });
    setShowModal(true);
  };

  const handleOpenEdit = (tech) => {
    setEditItem(tech);
    setForm({
      name: tech.name,
      phone: tech.phone,
      username: tech.username || generateAutoUsername(),
      password: tech.password || 'password123',
      roleType: tech.roleType || 'Teknisi Spesialis Cuci',
      specialty: tech.specialty || 'cuci',
      active: tech.active,
      performanceNotes: tech.performanceNotes || ''
    });
    setShowModal(true);
  };

  const handleRoleTypeChange = (roleType) => {
    let specialty = 'cuci';
    if (roleType === 'Teknisi Spesialis Repair') specialty = 'repair';
    else if (roleType === 'Admin') specialty = 'admin';
    else if (roleType === 'Karyawan') specialty = 'staff';
    else if (roleType === 'Manager') specialty = 'manager';
    else specialty = 'cuci';

    setForm({ ...form, roleType, specialty });
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.username || !form.password) {
      showToast('Semua kolom wajib diisi (Nama, Telp, Username, Password)!', 'error');
      return;
    }

    if (editItem) {
      setTechnicians(technicians.map(t => t.id === editItem.id ? { ...t, ...form } : t));
      showToast('Data staf/teknisi berhasil diperbarui!');
    } else {
      const prefix = form.roleType.includes('Manager') ? 'MGR' : form.roleType.includes('Admin') ? 'STAFF' : form.roleType.includes('Repair') ? 'TECH-REP' : 'TECH';
      const newTech = {
        id: `${prefix}-${String(technicians.length + 1).padStart(2, '0')}`,
        ...form,
        jobsCompleted: 0
      };
      setTechnicians([...technicians, newTech]);
      showToast('Staf atau teknisi baru berhasil ditambahkan!');
    }
    setShowModal(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Hapus staf/teknisi ini dari sistem?')) {
      setTechnicians(technicians.filter(t => t.id !== id));
      showToast('Staf/teknisi berhasil dihapus.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Master Teknisi & Karyawan (Akses Login)</h2>
          <p className="text-xs text-slate-500">Kelola daftar teknisi, admin, karyawan, dan manager beserta username 8-karakter & password manual.</p>
        </div>
        <button onClick={handleOpenAdd} className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center space-x-2">
          <UserPlus className="w-4 h-4"/>
          <span>Tambah Staf / Teknisi Baru</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {technicians.map(tech => {
          const techJobs = workOrders.filter(w => w.technicianId === tech.id);
          const completedCount = techJobs.filter(w => w.status === 'Selesai').length;
          return (
            <div key={tech.id} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-4 relative">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-mono font-bold text-cyan-700 bg-cyan-50 px-2 py-0.5 rounded">{tech.id}</span>
                  <h3 className="font-bold text-slate-900 text-base mt-1">{tech.name}</h3>
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase ${tech.roleType?.includes('Repair') ? 'bg-rose-100 text-rose-800' : tech.roleType?.includes('Cuci') ? 'bg-cyan-100 text-cyan-800' : 'bg-purple-100 text-purple-800'}`}>
                  {tech.roleType || tech.specialty}
                </span>
              </div>
              
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1 font-mono">
                <p className="text-slate-600 flex items-center space-x-1">
                  <Lock className="w-3.5 h-3.5 text-slate-400"/>
                  <span>Username: <b>{tech.username || 'USR12345'}</b></span>
                </p>
                <p className="text-slate-600 flex items-center space-x-1">
                  <Key className="w-3.5 h-3.5 text-slate-400"/>
                  <span>Password: <b>{tech.password || '••••••••'}</b></span>
                </p>
              </div>

              <p className="text-xs text-slate-600">Telp/WA: <b>{tech.phone}</b></p>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs space-y-1">
                <p className="text-slate-500">Total Tugas: <b className="text-slate-800">{techJobs.length}</b></p>
                <p className="text-slate-500">Selesai: <b className="text-emerald-600">{completedCount}</b></p>
              </div>
              <p className="text-[11px] text-slate-500 italic">Catatan: {tech.performanceNotes}</p>
              <div className="pt-3 border-t border-slate-100 flex justify-end space-x-2">
                <button onClick={() => handleOpenEdit(tech)} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl"><Edit2 className="w-3.5 h-3.5"/></button>
                <button onClick={() => handleDelete(tech.id)} className="p-2 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl"><Trash2 className="w-3.5 h-3.5"/></button>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSave} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-black text-slate-900 text-lg">{editItem ? 'Edit Staf / Teknisi' : 'Tambah Staf / Teknisi Baru'}</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-6 h-6"/></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Nama Lengkap *</label>
                <input type="text" required value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Username Login (Otomatis 8 Karakter)</label>
                  <input type="text" required value={form.username} onChange={e => setForm({...form, username: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-mono font-bold text-cyan-700 focus:outline-none focus:border-cyan-500"/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Password Manual (Dapat Diubah) *</label>
                  <input type="text" required value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-mono font-bold text-slate-800 focus:outline-none focus:border-cyan-500"/>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">No. Telepon / WhatsApp *</label>
                  <input type="text" required value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pilih Jabatan / Role *</label>
                  <select value={form.roleType} onChange={e => handleRoleTypeChange(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500">
                    <option value="Teknisi Spesialis Cuci">Teknisi Spesialis Cuci</option>
                    <option value="Teknisi Spesialis Repair">Teknisi Spesialis Repair</option>
                    <option value="Admin">Admin</option>
                    <option value="Karyawan">Karyawan</option>
                    <option value="Manager">Manager</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Catatan Performa / Keterangan</label>
                <textarea rows="2" value={form.performanceNotes} onChange={e => setForm({...form, performanceNotes: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"></textarea>
              </div>
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs">Batal</button>
              <button type="submit" className="px-5 py-2 bg-cyan-600 text-white rounded-xl font-bold text-xs shadow-md">Simpan Staf</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 7. SCHEDULE VIEW
// ==========================================
function ScheduleView({ workOrders, technicians, customers }) {
  const [selectedDate, setSelectedDate] = useState('2026-10-25');
  const dateJobs = workOrders.filter(w => w.scheduleDate === selectedDate);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Jadwal Kunjungan Teknisi & Kalender</h2>
          <p className="text-xs text-slate-500">Pantau jadwal harian dan cegah tumpang tindih penugasan.</p>
        </div>
        <div>
          <input 
            type="date" 
            value={selectedDate} 
            onChange={e => setSelectedDate(e.target.value)}
            className="bg-white border border-slate-200 px-3 py-2 rounded-xl text-xs font-bold shadow-sm focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 text-base">Jadwal Tanggal: {selectedDate}</h3>
        {dateJobs.length === 0 ? (
          <p className="text-xs text-slate-500 py-8 text-center">Tidak ada jadwal kunjungan pada tanggal ini.</p>
        ) : (
          <div className="space-y-3">
            {dateJobs.map(wo => {
              const cust = customers.find(c => c.id === wo.customerId);
              const tech = technicians.find(t => t.id === wo.technicianId);
              const jobTypesStr = wo.jobTypes ? wo.jobTypes.join(', ') : (wo.jobType || '-');
              return (
                <div key={wo.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-700">{wo.id}</span>
                    <h4 className="font-bold text-slate-900 text-sm mt-0.5">{jobTypesStr} — {cust?.name}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{cust?.address} ({wo.startTime} - {wo.endTime} WIB)</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs bg-slate-200 px-3 py-1 rounded-lg font-bold text-slate-700">Teknisi: {tech?.name}</span>
                    <span className="text-xs bg-cyan-100 text-cyan-800 px-3 py-1 rounded-lg font-bold">{wo.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ==========================================
// 8. WORK ORDERS VIEW (With Multiple Service Types Selection & Admin Invoice Sender)
// ==========================================
function WorkOrdersView({ workOrders, setWorkOrders, customers, units, technicians, serviceTypes, whatsappTemplates, checkScheduleConflict, showToast, formatIDR }) {
  const [showModal, setShowModal] = useState(false);
  const [editWoItem, setEditWoItem] = useState(null);
  const [showWaModal, setShowWaModal] = useState(false);
  const [activeWoForWa, setActiveWoForWa] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState(whatsappTemplates[0]?.id || '');

  const [form, setForm] = useState({
    customerId: customers[0]?.id || '',
    unitId: units[0]?.id || '',
    jobTypes: [serviceTypes[0]?.name || 'Cuci AC'],
    complaint: '',
    diagnosis: '',
    serviceFee: 150000,
    warrantyDays: 30,
    technicianId: technicians[0]?.id || '',
    scheduleDate: '2026-10-25',
    startTime: '09:00',
    endTime: '11:00',
    adminNotes: ''
  });

  const handleOpenAdd = () => {
    setEditWoItem(null);
    const initialService = serviceTypes[0] || { name: 'Cuci AC', defaultFee: 150000, warrantyDays: 30 };
    setForm({
      customerId: customers[0]?.id || '',
      unitId: units[0]?.id || '',
      jobTypes: [initialService.name],
      complaint: '',
      diagnosis: '',
      serviceFee: initialService.defaultFee,
      warrantyDays: initialService.warrantyDays || 30,
      technicianId: technicians[0]?.id || '',
      scheduleDate: '2026-10-25',
      startTime: '09:00',
      endTime: '11:00',
      adminNotes: ''
    });
    setShowModal(true);
  };

  const handleOpenEdit = (wo) => {
    setEditWoItem(wo);
    const jTypes = wo.jobTypes && wo.jobTypes.length > 0 ? wo.jobTypes : (wo.jobType ? [wo.jobType] : [serviceTypes[0]?.name || 'Cuci AC']);
    setForm({
      customerId: wo.customerId,
      unitId: wo.unitId,
      jobTypes: jTypes,
      complaint: wo.complaint || '',
      diagnosis: wo.diagnosis || '',
      serviceFee: wo.serviceFee || 150000,
      warrantyDays: wo.warrantyDays || 30,
      technicianId: wo.technicianId,
      scheduleDate: wo.scheduleDate || '2026-10-25',
      startTime: wo.startTime || '09:00',
      endTime: wo.endTime || '11:00',
      adminNotes: wo.adminNotes || ''
    });
    setShowModal(true);
  };

  const handleJobTypeCheckboxToggle = (srvName) => {
    let updatedJobTypes = [...form.jobTypes];
    if (updatedJobTypes.includes(srvName)) {
      if (updatedJobTypes.length === 1) {
        showToast('Work Order harus memiliki minimal 1 jenis layanan!', 'error');
        return;
      }
      updatedJobTypes = updatedJobTypes.filter(j => j !== srvName);
    } else {
      updatedJobTypes.push(srvName);
    }

    let totalFee = 0;
    let maxWarranty = 30;
    updatedJobTypes.forEach(name => {
      const match = serviceTypes.find(s => s.name === name);
      if (match) {
        totalFee += match.defaultFee;
        if ((match.warrantyDays || 30) > maxWarranty) {
          maxWarranty = match.warrantyDays || 30;
        }
      }
    });

    setForm({
      ...form,
      jobTypes: updatedJobTypes,
      serviceFee: totalFee > 0 ? totalFee : form.serviceFee,
      warrantyDays: maxWarranty
    });
  };

  const handleSaveWO = (e) => {
    e.preventDefault();
    const tech = technicians.find(t => t.id === form.technicianId);

    const hasRepair = form.jobTypes.some(j => j.toLowerCase().includes('perbaikan') || j.toLowerCase().includes('repair') || j.toLowerCase().includes('instalasi') || j.toLowerCase().includes('bongkar'));
    if (tech && (tech.roleType?.includes('Cuci') || tech.specialty === 'cuci') && hasRepair) {
      showToast(`Aturan Spesialisasi Dilanggar: Teknisi ${tech.name} adalah Teknisi Spesialis Cuci dan hanya boleh ditugaskan untuk layanan Cuci AC / Perawatan Berkala!`, 'error');
      return;
    }

    const excludeId = editWoItem ? editWoItem.id : null;
    const conflict = checkScheduleConflict(form.technicianId, form.scheduleDate, form.startTime, form.endTime, excludeId);
    if (conflict) {
      showToast(`Jadwal Bentrok: Teknisi ${tech?.name} sudah memiliki tugas pada jam yang sama (${conflict.startTime} - ${conflict.endTime})!`, 'error');
      return;
    }

    if (editWoItem) {
      setWorkOrders(workOrders.map(w => {
        if (w.id === editWoItem.id) {
          return {
            ...w,
            ...form,
            jobType: form.jobTypes.join(', '),
            serviceFee: Number(form.serviceFee),
            totalCost: Number(form.serviceFee) + (w.partsFee || 0),
            warrantyDays: Number(form.warrantyDays || 30)
          };
        }
        return w;
      }));
      setShowModal(false);
      showToast('Work Order berhasil diperbarui!');
    } else {
      const todayStr = '20261025';
      const newWo = {
        id: `WO-${todayStr}-${String(workOrders.length + 1).padStart(3, '0')}`,
        orderDate: '2026-10-25',
        ...form,
        jobType: form.jobTypes.join(', '),
        partsUsed: [],
        partsFee: 0,
        discount: 0,
        totalCost: Number(form.serviceFee),
        status: 'Terjadwal',
        rating: 0,
        customerReview: '',
        warrantyDays: Number(form.warrantyDays || 30),
        warrantyUsed: false,
        statusHistory: [{ status: 'Terjadwal', time: new Date().toLocaleString() }]
      };

      setWorkOrders([newWo, ...workOrders]);
      setShowModal(false);
      showToast('Work Order berhasil dibuat!');
    }
  };

  const handleOpenWaModalAndMarkRead = (wo) => {
    if (wo.onSiteRequestNotes && !wo.onSiteRequestRead) {
      setWorkOrders(workOrders.map(w => w.id === wo.id ? { ...w, onSiteRequestRead: true } : w));
    }
    openWaModal(wo);
  };

  const handleApproveCustomerAndTech = (wo) => {
    setWorkOrders(workOrders.map(w => {
      if (w.id === wo.id) {
        return {
          ...w,
          status: 'Disetujui Pelanggan',
          customerApproved: true,
          adminApprovedForTech: true,
          onSiteRequestRead: true, // Clear unread red badge notification upon approval
          statusHistory: [...(w.statusHistory || []), { status: 'Disetujui Pelanggan & Disetujui Admin untuk Teknisi', time: new Date().toLocaleString() }]
        };
      }
      return w;
    }));
    showToast(`Persetujuan dicatat! Teknisi kini mendapat notifikasi hijau untuk mulai perbaikan dan notifikasi merah permintaan hilang.`);
  };

  const openWaModal = (wo) => {
    setActiveWoForWa(wo);
    const hasRepairOrParts = (wo.jobTypes && wo.jobTypes.some(j => j.includes('Repair'))) || wo.partsFee > 0 || wo.onSiteRequestNotes;
    const defaultTmp = hasRepairOrParts ? (whatsappTemplates.find(t => t.id === 'TMP-03')?.id || whatsappTemplates[0]?.id) : (whatsappTemplates.find(t => t.id === 'TMP-04')?.id || whatsappTemplates[0]?.id);
    setSelectedTemplateId(defaultTmp);
    setShowWaModal(true);
  };

  const sendWaMessage = () => {
    if (!activeWoForWa) return;
    const cust = customers.find(c => c.id === activeWoForWa.customerId);
    const unit = units.find(u => u.id === activeWoForWa.unitId);
    const tech = technicians.find(t => t.id === activeWoForWa.technicianId);
    const tmp = whatsappTemplates.find(t => t.id === selectedTemplateId);

    if (!cust || !tmp) return;

    const sparepartName = activeWoForWa.partsUsed?.map(p => `${p.name} (x${p.qty})`).join(', ') || 'Belum ada sparepart';
    const sparepartFeeStr = formatIDR(activeWoForWa.partsFee || 0);
    const serviceFeeStr = formatIDR(activeWoForWa.serviceFee || 0);
    const totalCostStr = formatIDR(activeWoForWa.totalCost || 0);
    const fieldNotes = activeWoForWa.onSiteRequestNotes || activeWoForWa.diagnosis || 'Pemeriksaan standar on-site.';
    const jobTypesStr = activeWoForWa.jobTypes ? activeWoForWa.jobTypes.join(', ') : (activeWoForWa.jobType || '');

    let message = tmp.content
      .replace(/\[NAMA_PELANGGAN\]/g, cust.name || '')
      .replace(/\[JENIS_JASA\]/g, jobTypesStr)
      .replace(/\[MEREK_UNIT\]/g, unit ? `${unit.brand} (${unit.model})` : '')
      .replace(/\[LOKASI_UNIT\]/g, unit?.location || '')
      .replace(/\[TANGGAL\]/g, activeWoForWa.scheduleDate || '')
      .replace(/\[JAM_MULAI\]/g, activeWoForWa.startTime || '')
      .replace(/\[NAMA_TEKNISI\]/g, tech?.name || '')
      .replace(/\[ALAMAT_PELANGGAN\]/g, cust.address || '')
      .replace(/\[CATATAN_LAPANGAN\]/g, fieldNotes)
      .replace(/\[BIAYA_JASA\]/g, serviceFeeStr)
      .replace(/\[NAMA_SPAREPART\]/g, sparepartName)
      .replace(/\[BIAYA_SPAREPART\]/g, sparepartFeeStr)
      .replace(/\[TOTAL_BIAYA\]/g, totalCostStr)
      .replace(/\[NOMOR_INVOICE\]/g, `INV-2026-${activeWoForWa.id.replace('WO-', '')}`)
      .replace(/\[STATUS_INVOICE\]/g, activeWoForWa.status === 'Selesai' ? 'Lunas / Tagihan Selesai' : 'Menunggu Pembayaran');

    const phoneNum = formatWhatsAppNumber(cust.whatsapp || cust.phone);
    const waUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setShowWaModal(false);
    showToast('Admin membuka WhatsApp untuk mengirim pesan / invoice fisik ke pelanggan...');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Work Orders (Pesanan Servis)</h2>
          <p className="text-xs text-slate-500">Kelola pesanan servis AC, penugasan teknisi, persetujuan tindakan on-site, dan pengiriman invoice WhatsApp (Admin).</p>
        </div>
        <button onClick={handleOpenAdd} className="bg-cyan-600 hover:bg-cyan-700 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center space-x-2">
          <Plus className="w-4 h-4"/>
          <span>Buat Work Order Baru</span>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">No. WO</th>
              <th className="pb-3">Pelanggan</th>
              <th className="pb-3">Jenis Jasa (Multiple)</th>
              <th className="pb-3">Permintaan Tindakan (On-Site)</th>
              <th className="pb-3">Total Biaya</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Aksi / Kirim Invoice WA (Admin)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {workOrders.map(wo => {
              const cust = customers.find(c => c.id === wo.customerId);
              const hasUnreadRequest = wo.onSiteRequestNotes && !wo.onSiteRequestRead;
              const jobTypesStr = wo.jobTypes ? wo.jobTypes.join(', ') : (wo.jobType || '-');

              return (
                <tr key={wo.id} className={`hover:bg-slate-50 ${hasUnreadRequest ? 'bg-rose-50/70' : ''}`}>
                  <td className="py-3 font-mono font-bold text-cyan-700">{wo.id}</td>
                  <td className="py-3 font-bold text-slate-900">{cust?.name || '-'}</td>
                  <td className="py-3 text-slate-600 font-medium">{jobTypesStr}</td>
                  <td className="py-3">
                    {wo.onSiteRequestNotes ? (
                      <div className="flex items-center space-x-1.5">
                        {hasUnreadRequest && (
                          <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-ping shrink-0" title="Belum dibaca Admin"></span>
                        )}
                        <span className={`font-medium ${hasUnreadRequest ? 'text-rose-900 font-bold' : 'text-slate-700'}`}>
                          {wo.onSiteRequestNotes}
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Tidak ada permintaan</span>
                    )}
                  </td>
                  <td className="py-3 font-bold text-slate-900">{formatIDR(wo.totalCost)}</td>
                  <td className="py-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${wo.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' : wo.status === 'Menunggu Persetujuan Pelanggan' ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-blue-100 text-blue-800'}`}>
                      {wo.status}
                    </span>
                  </td>
                  <td className="py-3 text-right flex items-center justify-end space-x-2">
                    {wo.onSiteRequestNotes && !wo.adminApprovedForTech && (
                      <button onClick={() => handleApproveCustomerAndTech(wo)} className="px-2.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm text-[10px] flex items-center space-x-1" title="Setujui Tindakan & Beri Izin Teknisi">
                        <CheckCircle2 className="w-3.5 h-3.5"/>
                        <span>Setujui</span>
                      </button>
                    )}
                    <button onClick={() => handleOpenEdit(wo)} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg shadow-sm" title="Edit Work Order">
                      <Edit2 className="w-3.5 h-3.5"/>
                    </button>
                    <button onClick={() => handleOpenWaModalAndMarkRead(wo)} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm flex items-center space-x-1">
                      <Send className="w-3.5 h-3.5"/>
                      <span>Kirim Invoice WA</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveWO} className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-black text-slate-900 text-lg">{editWoItem ? 'Edit Work Order' : 'Buat Work Order Baru'}</h3>
              <button type="button" onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-6 h-6"/></button>
            </div>
            <div className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Pelanggan *</label>
                  <select value={form.customerId} onChange={e => setForm({...form, customerId: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500">
                    {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Unit AC *</label>
                  <select value={form.unitId} onChange={e => setForm({...form, unitId: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500">
                    {units.filter(u => u.customerId === form.customerId).map(u => <option key={u.id} value={u.id}>{u.brand} ({u.location})</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1.5">Pilih Jasa Layanan (Bisa Lebih Dari 1) *</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-200 max-h-40 overflow-y-auto">
                  {serviceTypes.map(srv => {
                    const isChecked = form.jobTypes.includes(srv.name);
                    return (
                      <label key={srv.id} className={`flex items-center space-x-2 p-2 rounded-lg border cursor-pointer transition-all ${isChecked ? 'bg-cyan-50 border-cyan-400 font-bold text-slate-900' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'}`}>
                        <input 
                          type="checkbox" 
                          checked={isChecked} 
                          onChange={() => handleJobTypeCheckboxToggle(srv.name)}
                          className="rounded text-cyan-600 focus:ring-cyan-500 w-4 h-4"
                        />
                        <span className="truncate">{srv.name} <span className="text-[10px] text-emerald-600">({formatIDR(srv.defaultFee)})</span></span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Total Biaya Jasa Otomatis (IDR)</label>
                  <input type="number" value={form.serviceFee} onChange={e => setForm({...form, serviceFee: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Garansi (Hari)</label>
                  <input type="number" value={form.warrantyDays} onChange={e => setForm({...form, warrantyDays: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Teknisi Ditugaskan *</label>
                <select value={form.technicianId} onChange={e => setForm({...form, technicianId: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500">
                  {technicians.filter(t => t.roleType?.includes('Teknisi') || t.specialty === 'cuci' || t.specialty === 'repair').map(t => <option key={t.id} value={t.id}>{t.name} ({t.roleType || t.specialty})</option>)}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Tanggal</label>
                  <input type="date" value={form.scheduleDate} onChange={e => setForm({...form, scheduleDate: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jam Mulai</label>
                  <input type="time" value={form.startTime} onChange={e => setForm({...form, startTime: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Jam Selesai</label>
                  <input type="time" value={form.endTime} onChange={e => setForm({...form, endTime: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Keluhan Pelanggan</label>
                <textarea rows="2" value={form.complaint} onChange={e => setForm({...form, complaint: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500" placeholder="Keluhan yang dilaporkan pelanggan..."></textarea>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Hasil Pemeriksaan & Diagnosis Awal Teknisi</label>
                <textarea rows="2" value={form.diagnosis} onChange={e => setForm({...form, diagnosis: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500" placeholder="Hasil pemeriksaan awal unit AC..."></textarea>
              </div>
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs">Batal</button>
              <button type="submit" className="px-5 py-2 bg-cyan-600 text-white rounded-xl font-bold text-xs shadow-md">Simpan Work Order</button>
            </div>
          </form>
        </div>
      )}

      {showWaModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-black text-slate-900 text-lg">Admin Mengirim Invoice WhatsApp</h3>
              <button type="button" onClick={() => setShowWaModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-6 h-6"/></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Pilih Template Pesan / Invoice</label>
                <select value={selectedTemplateId} onChange={e => setSelectedTemplateId(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500">
                  {whatsappTemplates.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Preview Isi Pesan WhatsApp:</label>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700 whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {(() => {
                    const tmp = whatsappTemplates.find(t => t.id === selectedTemplateId);
                    if (!tmp) return '';
                    const cust = customers.find(c => c.id === activeWoForWa?.customerId);
                    const unit = units.find(u => u.id === activeWoForWa?.unitId);
                    const tech = technicians.find(t => t.id === activeWoForWa?.technicianId);
                    const sparepartName = activeWoForWa?.partsUsed?.map(p => `${p.name} (x${p.qty})`).join(', ') || 'Belum ada sparepart';
                    const sparepartFeeStr = formatIDR(activeWoForWa?.partsFee || 0);
                    const serviceFeeStr = formatIDR(activeWoForWa?.serviceFee || 0);
                    const totalCostStr = formatIDR(activeWoForWa?.totalCost || 0);
                    const fieldNotes = activeWoForWa?.onSiteRequestNotes || activeWoForWa?.diagnosis || 'Pemeriksaan standar on-site.';
                    const jobTypesStr = activeWoForWa?.jobTypes ? activeWoForWa.jobTypes.join(', ') : (activeWoForWa?.jobType || '');

                    return tmp.content
                      .replace(/\[NAMA_PELANGGAN\]/g, cust?.name || '')
                      .replace(/\[JENIS_JASA\]/g, jobTypesStr)
                      .replace(/\[MEREK_UNIT\]/g, unit ? `${unit.brand} (${unit.model})` : '')
                      .replace(/\[LOKASI_UNIT\]/g, unit?.location || '')
                      .replace(/\[TANGGAL\]/g, activeWoForWa?.scheduleDate || '')
                      .replace(/\[JAM_MULAI\]/g, activeWoForWa?.startTime || '')
                      .replace(/\[NAMA_TEKNISI\]/g, tech?.name || '')
                      .replace(/\[ALAMAT_PELANGGAN\]/g, cust?.address || '')
                      .replace(/\[CATATAN_LAPANGAN\]/g, fieldNotes)
                      .replace(/\[BIAYA_JASA\]/g, serviceFeeStr)
                      .replace(/\[NAMA_SPAREPART\]/g, sparepartName)
                      .replace(/\[BIAYA_SPAREPART\]/g, sparepartFeeStr)
                      .replace(/\[TOTAL_BIAYA\]/g, totalCostStr)
                      .replace(/\[NOMOR_INVOICE\]/g, `INV-2026-${activeWoForWa?.id.replace('WO-', '')}`)
                      .replace(/\[STATUS_INVOICE\]/g, activeWoForWa?.status === 'Selesai' ? 'Lunas / Tagihan Selesai' : 'Menunggu Pembayaran');
                  })()}
                </div>
              </div>
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={() => setShowWaModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs">Batal</button>
              <button type="button" onClick={sendWaMessage} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md flex items-center space-x-1.5">
                <Send className="w-4 h-4"/>
                <span>Buka WhatsApp Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 9. SERVICE HISTORY VIEW
// ==========================================
function ServiceHistoryView({ workOrders, setWorkOrders, customers, units, technicians, formatIDR, showToast }) {
  const [selectedWo, setSelectedWo] = useState(null);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [ratingVal, setRatingVal] = useState(5);
  const [reviewVal, setReviewVal] = useState('');

  const completedWos = workOrders.filter(w => w.status === 'Selesai');

  const handleSaveRating = (e) => {
    e.preventDefault();
    if (!selectedWo) return;

    setWorkOrders(workOrders.map(w => {
      if (w.id === selectedWo.id) {
        return {
          ...w,
          rating: Number(ratingVal),
          customerReview: reviewVal
        };
      }
      return w;
    }));

    setSelectedWo({
      ...selectedWo,
      rating: Number(ratingVal),
      customerReview: reviewVal
    });

    setShowRatingModal(false);
    showToast('Penilaian & kepuasan pelanggan berhasil disimpan!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Riwayat Servis Detail & Kepuasan Pelanggan</h2>
        <p className="text-xs text-slate-500">Pilih riwayat pekerjaan selesai untuk memeriksa rincian pengerjaan, foto laporan, dan penilaian kepuasan.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 max-h-[600px] overflow-y-auto">
          <h3 className="font-bold text-slate-900 text-sm">Daftar Servis Selesai ({completedWos.length})</h3>
          {completedWos.map(wo => {
            const cust = customers.find(c => c.id === wo.customerId);
            const jobTypesStr = wo.jobTypes ? wo.jobTypes.join(', ') : (wo.jobType || '-');
            return (
              <div 
                key={wo.id}
                onClick={() => setSelectedWo(wo)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${selectedWo?.id === wo.id ? 'bg-cyan-50 border-cyan-500 shadow-sm' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold text-cyan-700">{wo.id}</span>
                  <span className="text-[10px] font-mono text-slate-500">{wo.scheduleDate}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mt-1">{jobTypesStr}</h4>
                <p className="text-xs text-slate-600 mt-0.5">Pelanggan: {cust?.name}</p>
                {wo.rating > 0 && (
                  <div className="flex items-center space-x-1 mt-2 text-amber-500">
                    {[...Array(wo.rating)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current"/>)}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          {selectedWo ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded">{selectedWo.id}</span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">{selectedWo.jobTypes ? selectedWo.jobTypes.join(', ') : selectedWo.jobType}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Tanggal Pengerjaan: <b>{selectedWo.scheduleDate} ({selectedWo.startTime} - {selectedWo.endTime} WIB)</b></p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => {
                    setRatingVal(selectedWo.rating || 5);
                    setReviewVal(selectedWo.customerReview || '');
                    setShowRatingModal(true);
                  }} className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-xs flex items-center space-x-1 shadow-sm">
                    <Star className="w-3.5 h-3.5 fill-current"/>
                    <span>{selectedWo.rating ? 'Edit Penilaian' : 'Beri Penilaian'}</span>
                  </button>
                  <span className="text-xs bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full font-bold">Selesai</span>
                </div>
              </div>

              {selectedWo.rating > 0 && (
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-1">
                  <div className="flex items-center space-x-1 text-amber-500">
                    {[...Array(selectedWo.rating)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current"/>)}
                    <span className="text-xs font-bold text-amber-900 ml-2">Penilaian Kepuasan Pelanggan ({selectedWo.rating}/5 Bintang)</span>
                  </div>
                  <p className="text-xs text-amber-800 italic">"{selectedWo.customerReview || 'Tidak ada ulasan tertulis.'}"</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                  <p className="font-bold text-slate-900 text-sm">Informasi Pelanggan & Unit</p>
                  <p className="text-slate-600">Pelanggan: <b>{customers.find(c => c.id === selectedWo.customerId)?.name}</b></p>
                  <p className="text-slate-600">Unit AC: <b>{units.find(u => u.id === selectedWo.unitId)?.brand} ({units.find(u => u.id === selectedWo.unitId)?.location})</b></p>
                  <p className="text-slate-600">Teknisi: <b>{technicians.find(t => t.id === selectedWo.technicianId)?.name}</b></p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                  <p className="font-bold text-slate-900 text-sm">Biaya & Keuangan</p>
                  <p className="text-slate-600">Biaya Jasa: {formatIDR(selectedWo.serviceFee)}</p>
                  <p className="text-slate-600">Biaya Sparepart: {formatIDR(selectedWo.partsFee)}</p>
                  <p className="text-slate-900 font-bold pt-1 border-t border-slate-200">Total Biaya: {formatIDR(selectedWo.totalCost)}</p>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 space-y-1">
                  <p className="font-bold text-amber-900 text-sm">Keluhan Pelanggan:</p>
                  <p className="text-amber-800">{selectedWo.complaint || 'Tidak ada keluhan khusus.'}</p>
                </div>
                <div className="bg-blue-50/70 p-4 rounded-xl border border-blue-200 space-y-1">
                  <p className="font-bold text-blue-900 text-sm">Hasil Pemeriksaan & Diagnosis Teknisi:</p>
                  <p className="text-blue-800">{selectedWo.diagnosis || 'Pemeriksaan standar selesai dengan baik.'}</p>
                </div>
                <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200 space-y-1">
                  <p className="font-bold text-emerald-900 text-sm">Tindakan Perbaikan & Catatan Teknisi:</p>
                  <p className="text-emerald-800">{selectedWo.action || selectedWo.techNotes || 'Pekerjaan diselesaikan sesuai standar operasional.'}</p>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-3">
                  <p className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
                    <Camera className="w-4 h-4 text-cyan-600"/>
                    <span>Dokumentasi Foto Sebelum & Sesudah Pengerjaan</span>
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[11px] font-bold text-slate-500 mb-1">Foto Sebelum (Before):</p>
                      {selectedWo.beforePhoto ? (
                        <img src={selectedWo.beforePhoto} alt="Before" className="w-full h-32 object-cover rounded-xl border border-slate-300 shadow-sm"/>
                      ) : (
                        <div className="w-full h-32 bg-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-[11px] italic">Tidak ada foto</div>
                      )}
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-500 mb-1">Foto Sesudah (After):</p>
                      {selectedWo.afterPhoto ? (
                        <img src={selectedWo.afterPhoto} alt="After" className="w-full h-32 object-cover rounded-xl border border-slate-300 shadow-sm"/>
                      ) : (
                        <div className="w-full h-32 bg-slate-200 rounded-xl flex items-center justify-center text-slate-400 text-[11px] italic">Tidak ada foto</div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-16 text-center space-y-2">
              <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto"/>
              <p className="text-slate-700 font-bold">Pilih salah satu riwayat servis di sebelah kiri untuk melihat detail lengkap pengerjaan.</p>
            </div>
          )}
        </div>
      </div>

      {showRatingModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveRating} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-black text-slate-900 text-lg">Penilaian & Kepuasan Pelanggan</h3>
              <button type="button" onClick={() => setShowRatingModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-6 h-6"/></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Rating Bintang (1 - 5) *</label>
                <div className="flex space-x-2 py-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setRatingVal(num)}
                      className={`p-2 rounded-xl border flex items-center space-x-1 font-bold ${ratingVal >= num ? 'bg-amber-50 border-amber-400 text-amber-600' : 'bg-slate-50 border-slate-200 text-slate-400'}`}
                    >
                      <Star className={`w-4 h-4 ${ratingVal >= num ? 'fill-current' : ''}`}/>
                      <span>{num}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Ulasan / Testimoni Pelanggan</label>
                <textarea rows="3" value={reviewVal} onChange={e => setReviewVal(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500" placeholder="Tuliskan ulasan atau feedback pelanggan..."></textarea>
              </div>
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={() => setShowRatingModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs">Batal</button>
              <button type="submit" className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl font-bold text-xs shadow-md">Simpan Penilaian</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 10. SPK MANAGER VIEW
// ==========================================
function SpkManagerView({ workOrders, customers, units, technicians, companySettings, showToast }) {
  const [selectedWoId, setSelectedWoId] = useState(workOrders[0]?.id || '');
  const [showSpkModal, setShowSpkModal] = useState(false);

  const selectedWo = workOrders.find(w => w.id === selectedWoId) || workOrders[0];
  const cust = customers.find(c => c.id === selectedWo?.customerId);
  const unit = units.find(u => u.id === selectedWo?.unitId);
  const tech = technicians.find(t => t.id === selectedWo?.technicianId);

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    showToast('Mengunduh SPK dalam format PDF...');
    window.print();
  };

  const handleViewSpk = () => {
    setShowSpkModal(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Surat Perintah Kerja (SPK) Otomatis</h2>
        <p className="text-xs text-slate-500">Pilih work order di bawah untuk melihat rincian SPK, mencetak, atau menyimpan dokumen SPK.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 max-h-[600px] overflow-y-auto">
          <h3 className="font-bold text-slate-900 text-sm">Pilih SPK berdasarkan Work Order</h3>
          {workOrders.map(wo => {
            const c = customers.find(x => x.id === wo.customerId);
            const jobTypesStr = wo.jobTypes ? wo.jobTypes.join(', ') : (wo.jobType || '-');
            return (
              <div 
                key={wo.id}
                onClick={() => setSelectedWoId(wo.id)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${selectedWoId === wo.id ? 'bg-cyan-50 border-cyan-500 shadow-sm' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-mono font-bold text-cyan-700">{wo.id}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${wo.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>{wo.status}</span>
                </div>
                <h4 className="font-bold text-slate-900 text-sm mt-1">{jobTypesStr}</h4>
                <p className="text-xs text-slate-600 mt-0.5">{c?.name} — {wo.scheduleDate}</p>
              </div>
            );
          })}
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          {selectedWo ? (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-200 gap-3">
                <div>
                  <h3 className="font-black text-slate-900 text-lg">SURAT PERINTAH KERJA (SPK)</h3>
                  <p className="text-xs text-slate-500 font-mono">{companySettings.name}</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <button onClick={handleViewSpk} className="bg-cyan-600 hover:bg-cyan-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm">
                    <FileText className="w-3.5 h-3.5"/>
                    <span>Lihat SPK</span>
                  </button>
                  <button onClick={handlePrint} className="bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm">
                    <Printer className="w-3.5 h-3.5"/>
                    <span>Cetak SPK</span>
                  </button>
                  <button onClick={handleDownloadPdf} className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-sm">
                    <Download className="w-3.5 h-3.5"/>
                    <span>Simpan PDF</span>
                  </button>
                </div>
              </div>

              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4 text-xs">
                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <p className="text-slate-400 uppercase font-bold">No. SPK / WO:</p>
                    <p className="font-mono font-bold text-slate-900 text-sm">{selectedWo.id}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase font-bold">Tanggal Kunjungan:</p>
                    <p className="font-bold text-slate-900 text-sm">{selectedWo.scheduleDate} ({selectedWo.startTime} - {selectedWo.endTime})</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pb-4 border-b border-slate-200">
                  <div>
                    <p className="text-slate-400 uppercase font-bold">Pelanggan:</p>
                    <p className="font-bold text-slate-900 text-sm">{cust?.name}</p>
                    <p className="text-slate-600">{cust?.phone} — {cust?.address}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase font-bold">Teknisi Ditugaskan:</p>
                    <p className="font-bold text-slate-900 text-sm">{tech?.name}</p>
                    <p className="text-slate-600">Telp: {tech?.phone} ({tech?.roleType || tech?.specialty})</p>
                  </div>
                </div>

                <div>
                  <p className="text-slate-400 uppercase font-bold mb-1">Unit AC & Jenis Jasa (Multiple):</p>
                  <p className="font-bold text-slate-900 text-sm">{selectedWo.jobTypes ? selectedWo.jobTypes.join(', ') : selectedWo.jobType} — {unit?.brand} ({unit?.model}, {unit?.pk}) di {unit?.location}</p>
                  <p className="text-slate-600 mt-1"><b>Keluhan:</b> {selectedWo.complaint || 'Servis rutin berkala.'}</p>
                  <p className="text-slate-600 mt-1"><b>Hasil Pemeriksaan / Diagnosis:</b> {selectedWo.diagnosis || 'Pemeriksaan standar.'}</p>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 text-center py-12">Pilih Work Order untuk menampilkan SPK.</p>
          )}
        </div>
      </div>

      {showSpkModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <div>
                <h3 className="font-black text-slate-900 text-lg">DETAIL SURAT PERINTAH KERJA (SPK)</h3>
                <p className="text-xs text-slate-500">{companySettings.name}</p>
              </div>
              <button type="button" onClick={() => setShowSpkModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-6 h-6"/></button>
            </div>
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded">{selectedWo?.id}</span>
                    <h4 className="font-black text-slate-900 text-base mt-1">{selectedWo?.jobTypes ? selectedWo.jobTypes.join(', ') : selectedWo?.jobType}</h4>
                  </div>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">{selectedWo?.status}</span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 uppercase font-bold">Pelanggan</p>
                    <p className="font-bold text-slate-900 text-sm">{cust?.name}</p>
                    <p className="text-slate-600">{cust?.phone}</p>
                    <p className="text-slate-600">{cust?.address}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase font-bold">Teknisi</p>
                    <p className="font-bold text-slate-900 text-sm">{tech?.name}</p>
                    <p className="text-slate-600">{tech?.phone}</p>
                  </div>
                </div>
                <div>
                  <p className="text-slate-400 uppercase font-bold">Unit AC & Lokasi</p>
                  <p className="font-bold text-slate-900">{unit?.brand} ({unit?.model}, {unit?.pk}) — Lokasi: {unit?.location}</p>
                </div>
                <div>
                  <p className="text-slate-400 uppercase font-bold">Jadwal Pelaksanaan</p>
                  <p className="font-bold text-slate-900">{selectedWo?.scheduleDate} pukul {selectedWo?.startTime} - {selectedWo?.endTime} WIB</p>
                </div>
              </div>
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={() => setShowSpkModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs">Tutup</button>
              <button type="button" onClick={() => { setShowSpkModal(false); handlePrint(); }} className="px-5 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs shadow-md">Cetak Sekarang</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 11. WARRANTY MANAGEMENT VIEW
// ==========================================
function WarrantyView({ workOrders, setWorkOrders, customers, units, showToast }) {
  const [selectedWarranty, setSelectedWarranty] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editDays, setEditDays] = useState(30);

  const todayStr = '2026-10-25';
  const todayDate = new Date(todayStr);

  const warranties = workOrders
    .filter(w => w.status === 'Selesai')
    .map((wo, index) => {
      const cust = customers.find(c => c.id === wo.customerId);
      const unit = units.find(u => u.id === wo.unitId);
      
      const startDate = wo.scheduleDate || '2026-10-25';
      const startObj = new Date(startDate);
      
      const daysValid = wo.warrantyDays || 30;
      const expiryObj = new Date(startObj);
      expiryObj.setDate(startObj.getDate() + daysValid);
      const expiryStr = expiryObj.toISOString().split('T')[0];

      const diffDays = Math.ceil((expiryObj - todayDate) / (1000 * 60 * 60 * 24));
      
      let status = 'Aktif';
      let badgeColor = 'bg-emerald-100 text-emerald-800';

      if (wo.warrantyUsed) {
        status = 'Sudah Digunakan (Claimed)';
        badgeColor = 'bg-purple-100 text-purple-800';
      } else if (diffDays < 0) {
        status = 'Sudah Tidak Berlaku (Expired)';
        badgeColor = 'bg-rose-100 text-rose-800';
      } else if (diffDays <= 15) {
        status = `Hampir Habis (${diffDays} hari lagi)`;
        badgeColor = 'bg-amber-100 text-amber-800';
      }

      const jobTypesStr = wo.jobTypes ? wo.jobTypes.join(', ') : (wo.jobType || '-');

      return {
        id: `GAR-${index + 101}`,
        woId: wo.id,
        jobType: jobTypesStr,
        customerName: cust?.name || '-',
        customerPhone: cust?.phone || '-',
        unitInfo: unit ? `${unit.brand} (${unit.model}, ${unit.location})` : '-',
        startDate,
        expiryDate: expiryStr,
        daysValid,
        daysRemaining: diffDays,
        status,
        badgeColor,
        isUsed: !!wo.warrantyUsed
      };
    });

  const activeCount = warranties.filter(w => w.status === 'Aktif' || w.status.includes('Hampir Habis')).length;
  const usedCount = warranties.filter(w => w.isUsed).length;
  const expiredCount = warranties.filter(w => w.status.includes('Expired')).length;

  const handleToggleWarrantyUsed = (woId) => {
    setWorkOrders(workOrders.map(w => {
      if (w.id === woId) {
        return { ...w, warrantyUsed: !w.warrantyUsed };
      }
      return w;
    }));
    showToast('Status penggunaan garansi berhasil diperbarui!');
    if (selectedWarranty) {
      setSelectedWarranty({ ...selectedWarranty, isUsed: !selectedWarranty.isUsed });
    }
  };

  const handleSaveEditWarranty = (e) => {
    e.preventDefault();
    if (!selectedWarranty) return;

    setWorkOrders(workOrders.map(w => {
      if (w.id === selectedWarranty.woId) {
        return { ...w, warrantyDays: Number(editDays) };
      }
      return w;
    }));

    setShowEditModal(false);
    showToast('Durasi masa garansi berhasil diperbarui!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Manajemen Garansi Pengerjaan & Cuci AC</h2>
        <p className="text-xs text-slate-500">Pantau status garansi, detail jenis servis, klaim garansi, dan durasi masa berlaku.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Garansi Tercatat</p>
          <p className="text-2xl font-black text-slate-900">{warranties.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase">Garansi Aktif</p>
          <p className="text-2xl font-black text-emerald-600">{activeCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase">Garansi Digunakan (Claim)</p>
          <p className="text-2xl font-black text-purple-600">{usedCount}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase">Garansi Berakhir / Habis</p>
          <p className="text-2xl font-black text-rose-600">{expiredCount}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3 max-h-[600px] overflow-y-auto">
          <h3 className="font-bold text-slate-900 text-sm">Daftar Garansi Servis</h3>
          {warranties.map(item => (
            <div 
              key={item.id}
              onClick={() => setSelectedWarranty(item)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer ${selectedWarranty?.id === item.id ? 'bg-cyan-50 border-cyan-500 shadow-sm' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
            >
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-mono font-bold text-cyan-700">{item.id}</span>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${item.badgeColor}`}>{item.status}</span>
              </div>
              <h4 className="font-bold text-slate-900 text-sm mt-1">{item.jobType}</h4>
              <p className="text-xs text-slate-600 mt-0.5">{item.customerName}</p>
              <p className="text-[11px] font-mono text-slate-500 mt-1">Berlaku s.d {item.expiryDate} ({item.daysValid} Hari)</p>
            </div>
          ))}
        </div>

        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-6">
          {selectedWarranty ? (
            <div className="space-y-6">
              <div className="flex justify-between items-start pb-4 border-b border-slate-200">
                <div>
                  <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded">{selectedWarranty.id}</span>
                  <h3 className="text-xl font-black text-slate-900 mt-1">{selectedWarranty.jobType}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">Referensi Work Order: <b>{selectedWarranty.woId}</b></p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => {
                    setEditDays(selectedWarranty.daysValid);
                    setShowEditModal(true);
                  }} className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl text-xs flex items-center space-x-1 shadow-sm">
                    <Edit2 className="w-3.5 h-3.5"/>
                    <span>Edit Durasi</span>
                  </button>
                  <button onClick={() => handleToggleWarrantyUsed(selectedWarranty.woId)} className={`px-3 py-1.5 font-bold rounded-xl text-xs shadow-sm ${selectedWarranty.isUsed ? 'bg-emerald-600 hover:bg-emerald-700 text-white' : 'bg-purple-600 hover:bg-purple-700 text-white'}`}>
                    {selectedWarranty.isUsed ? 'Tandai Belum Diklaim' : 'Tandai Sudah Diklaim'}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                  <p className="font-bold text-slate-900 text-sm">Informasi Pelanggan & Unit</p>
                  <p className="text-slate-600">Pelanggan: <b>{selectedWarranty.customerName}</b></p>
                  <p className="text-slate-600">No. Telp: <b>{selectedWarranty.customerPhone}</b></p>
                  <p className="text-slate-600">Unit AC: <b>{selectedWarranty.unitInfo}</b></p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
                  <p className="font-bold text-slate-900 text-sm">Masa Berlaku Garansi</p>
                  <p className="text-slate-600">Tanggal Servis: <b>{selectedWarranty.startDate}</b></p>
                  <p className="text-slate-600">Durasi Garansi: <b>{selectedWarranty.daysValid} Hari</b></p>
                  <p className="text-cyan-700 font-bold">Berakhir Pada: {selectedWarranty.expiryDate}</p>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
                <p className="font-bold text-slate-900 text-sm">Status Garansi Saat Ini:</p>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${selectedWarranty.badgeColor}`}>
                  {selectedWarranty.status}
                </span>
                <p className="text-xs text-slate-500 pt-1">
                  {selectedWarranty.isUsed 
                    ? 'Catatan: Garansi untuk pengerjaan ini sudah pernah diklaim atau digunakan oleh pelanggan.' 
                    : 'Garansi aktif dan siap digunakan jika pelanggan mengajukan komplain atau klaim servis ulang sesuai jenis pekerjaan.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="p-16 text-center space-y-2">
              <Shield className="w-12 h-12 text-slate-300 mx-auto"/>
              <p className="text-slate-700 font-bold">Pilih salah satu garansi di sebelah kiri untuk memeriksa detail dan mengedit durasinya.</p>
            </div>
          )}
        </div>
      </div>

      {showEditModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveEditWarranty} className="bg-white rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-black text-slate-900 text-base">Edit Durasi Garansi</h3>
              <button type="button" onClick={() => setShowEditModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-6 h-6"/></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Masa Garansi (Hari) *</label>
                <input type="number" required value={editDays} onChange={e => setEditDays(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
              </div>
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={() => setShowEditModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs">Batal</button>
              <button type="submit" className="px-5 py-2 bg-cyan-600 text-white rounded-xl font-bold text-xs shadow-md">Simpan</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 12. INVENTORY VIEW
// ==========================================
function InventoryView({ inventory, formatIDR }) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Inventaris Suku Cadang & Material</h2>
        <p className="text-xs text-slate-500">Kelola stok sparepart, freon, dan material instalasi AC.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">Kode</th>
              <th className="pb-3">Nama Barang</th>
              <th className="pb-3">Kategori</th>
              <th className="pb-3">Stok Tersedia</th>
              <th className="pb-3">Harga Jual</th>
              <th className="pb-3">Status Stok</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {inventory.map(item => (
              <tr key={item.id} className="hover:bg-slate-50">
                <td className="py-3 font-mono font-bold text-cyan-700">{item.code}</td>
                <td className="py-3 font-bold text-slate-900">{item.name}</td>
                <td className="py-3 text-slate-600">{item.category}</td>
                <td className="py-3 font-bold text-slate-900">{item.stock} {item.unit}</td>
                <td className="py-3 font-bold text-slate-900">{formatIDR(item.sellPrice)}</td>
                <td className="py-3">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${item.stock <= item.minStock ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'}`}>
                    {item.stock <= item.minStock ? 'Stok Rendah' : 'Aman'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ==========================================
// 13. INVOICES VIEW (With Admin Physical Invoice WhatsApp Sender & PDF/Print)
// ==========================================
function InvoicesView({ invoices, setInvoices, customers, workOrders, units, whatsappTemplates, formatIDR, showToast, companySettings }) {
  const [showWaModal, setShowWaModal] = useState(false);
  const [activeInvoice, setActiveInvoice] = useState(null);
  const [selectedTemplateId, setSelectedTemplateId] = useState(whatsappTemplates[3]?.id || whatsappTemplates[0]?.id || '');
  const [showDetailModal, setShowDetailModal] = useState(false);

  const openInvoiceWaModal = (inv) => {
    setActiveInvoice(inv);
    setSelectedTemplateId(whatsappTemplates[3]?.id || whatsappTemplates[0]?.id || '');
    setShowWaModal(true);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  const handleDownloadInvoicePdf = () => {
    showToast('Mengunduh Invoice dalam format PDF...');
    window.print();
  };

  const handleChangeStatus = (invId, newStatus) => {
    setInvoices(invoices.map(inv => inv.id === invId ? { ...inv, status: newStatus } : inv));
    showToast(`Status invoice berhasil diubah ke: ${newStatus}`);
  };

  const handleChangePaymentMethod = (invId, newMethod) => {
    setInvoices(invoices.map(inv => inv.id === invId ? { ...inv, paymentMethod: newMethod } : inv));
    showToast(`Metode pembayaran diubah ke: ${newMethod}`);
  };

  const sendInvoiceWa = () => {
    if (!activeInvoice) return;
    const cust = customers.find(c => c.id === activeInvoice.customerId);
    const wo = workOrders.find(w => w.id === activeInvoice.woId);
    const unit = units.find(u => u.id === wo?.unitId);
    const tmp = whatsappTemplates.find(t => t.id === selectedTemplateId);

    if (!cust || !tmp) return;

    let message = tmp.content
      .replace(/\[NAMA_PELANGGAN\]/g, cust.name || '')
      .replace(/\[JENIS_JASA\]/g, wo?.jobTypes ? wo.jobTypes.join(', ') : (wo?.jobType || 'Servis AC'))
      .replace(/\[MEREK_UNIT\]/g, unit ? `${unit.brand} (${unit.model})` : 'Unit AC')
      .replace(/\[LOKASI_UNIT\]/g, unit?.location || '')
      .replace(/\[TANGGAL\]/g, activeInvoice.date || '')
      .replace(/\[TOTAL_BIAYA\]/g, formatIDR(activeInvoice.total))
      .replace(/\[BIAYA_JASA\]/g, formatIDR(activeInvoice.subtotal))
      .replace(/\[BIAYA_SPAREPART\]/g, formatIDR(activeInvoice.partsFee || 0))
      .replace(/\[NAMA_SPAREPART\]/g, 'Suku cadang & material servis')
      .replace(/\[NOMOR_INVOICE\]/g, activeInvoice.id)
      .replace(/\[STATUS_INVOICE\]/g, activeInvoice.status);

    const phoneNum = formatWhatsAppNumber(cust.whatsapp || cust.phone);
    const waUrl = `https://wa.me/${phoneNum}?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
    setShowWaModal(false);
    showToast('Admin membuka WhatsApp untuk mengirim invoice fisik ke pelanggan...');
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Invoice & Pembayaran</h2>
        <p className="text-xs text-slate-500">Daftar tagihan dan status pembayaran layanan servis, ubah status Belum Lunas / Pending / Lunas, metode pembayaran, serta kirim invoice fisik via WhatsApp.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 uppercase font-semibold">
              <th className="pb-3">No. Invoice</th>
              <th className="pb-3">Pelanggan</th>
              <th className="pb-3">Tanggal</th>
              <th className="pb-3">Total Tagihan</th>
              <th className="pb-3">Status Pembayaran</th>
              <th className="pb-3">Metode Pembayaran</th>
              <th className="pb-3 text-right">Aksi / Kirim Invoice Fisik (WA)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {invoices.map(inv => {
              const cust = customers.find(c => c.id === inv.customerId);
              return (
                <tr key={inv.id} className="hover:bg-slate-50">
                  <td className="py-3 font-mono font-bold text-cyan-700">{inv.id}</td>
                  <td className="py-3 font-bold text-slate-900">{cust?.name || '-'}</td>
                  <td className="py-3 text-slate-600">{inv.date}</td>
                  <td className="py-3 font-bold text-slate-900">{formatIDR(inv.total)}</td>
                  <td className="py-3">
                    <select 
                      value={inv.status} 
                      onChange={e => handleChangeStatus(inv.id, e.target.value)}
                      className={`px-2.5 py-1.5 rounded-xl font-bold text-xs border focus:outline-none ${inv.status === 'Lunas' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' : inv.status === 'Pending' ? 'bg-amber-50 text-amber-800 border-amber-300' : 'bg-rose-50 text-rose-800 border-rose-300'}`}
                    >
                      <option value="Belum Lunas">Belum Lunas</option>
                      <option value="Pending">Pending</option>
                      <option value="Lunas">Lunas</option>
                    </select>
                  </td>
                  <td className="py-3">
                    <select 
                      value={inv.paymentMethod} 
                      onChange={e => handleChangePaymentMethod(inv.id, e.target.value)}
                      className="bg-slate-50 border border-slate-200 px-2.5 py-1.5 rounded-xl font-medium text-slate-700 focus:outline-none focus:border-cyan-500"
                    >
                      <option value="Transfer BCA">Transfer BCA</option>
                      <option value="Transfer Mandiri">Transfer Mandiri</option>
                      <option value="Transfer BNI">Transfer BNI</option>
                      <option value="Cash / Tunai">Cash / Tunai</option>
                      <option value="QRIS">QRIS</option>
                    </select>
                  </td>
                  <td className="py-3 text-right flex items-center justify-end space-x-1.5">
                    <button onClick={() => { setActiveInvoice(inv); setShowDetailModal(true); }} className="p-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg shadow-sm" title="Lihat & Cetak Invoice">
                      <FileText className="w-3.5 h-3.5"/>
                    </button>
                    <button onClick={() => openInvoiceWaModal(inv)} className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-sm flex items-center space-x-1">
                      <Send className="w-3.5 h-3.5"/>
                      <span>Kirim WA</span>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {showDetailModal && activeInvoice && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 border-b border-slate-200">
              <div>
                <h3 className="font-black text-slate-900 text-lg">INVOICE RESMI / TAGIHAN</h3>
                <p className="text-xs text-slate-500 font-mono">{companySettings.name}</p>
              </div>
              <button type="button" onClick={() => setShowDetailModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-6 h-6"/></button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-4">
                <div className="flex justify-between items-center border-b pb-3">
                  <div>
                    <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded">{activeInvoice.id}</span>
                    <p className="text-slate-500 mt-1">Referensi WO: <b>{activeInvoice.woId}</b></p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${activeInvoice.status === 'Lunas' ? 'bg-emerald-100 text-emerald-800' : activeInvoice.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}`}>
                    {activeInvoice.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-slate-400 uppercase font-bold">Pelanggan</p>
                    <p className="font-bold text-slate-900 text-sm">{customers.find(c => c.id === activeInvoice.customerId)?.name}</p>
                    <p className="text-slate-600">{customers.find(c => c.id === activeInvoice.customerId)?.phone}</p>
                    <p className="text-slate-600">{customers.find(c => c.id === activeInvoice.customerId)?.address}</p>
                  </div>
                  <div>
                    <p className="text-slate-400 uppercase font-bold">Tanggal & Jatuh Tempo</p>
                    <p className="font-bold text-slate-900">Tanggal: {activeInvoice.date}</p>
                    <p className="text-slate-600">Jatuh Tempo: {activeInvoice.dueDate}</p>
                    <p className="text-slate-600 mt-1">Metode: <b>{activeInvoice.paymentMethod}</b></p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span>Subtotal Biaya Layanan:</span>
                    <span className="font-bold">{formatIDR(activeInvoice.subtotal)}</span>
                  </div>
                  {activeInvoice.partsFee > 0 && (
                    <div className="flex justify-between text-slate-700">
                      <span>Biaya Suku Cadang:</span>
                      <span className="font-bold">{formatIDR(activeInvoice.partsFee)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-slate-900 font-black text-sm pt-2 border-t border-slate-300">
                    <span>Total Tagihan:</span>
                    <span className="text-emerald-600">{formatIDR(activeInvoice.total)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap justify-end gap-2">
              <button type="button" onClick={() => setShowDetailModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs">Tutup</button>
              <button type="button" onClick={handlePrintInvoice} className="px-4 py-2 bg-slate-900 text-white rounded-xl font-bold text-xs shadow-md flex items-center space-x-1">
                <Printer className="w-3.5 h-3.5"/>
                <span>Cetak Invoice</span>
              </button>
              <button type="button" onClick={handleDownloadInvoicePdf} className="px-4 py-2 bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-md flex items-center space-x-1">
                <Download className="w-3.5 h-3.5"/>
                <span>Simpan PDF</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {showWaModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-black text-slate-900 text-lg">Admin Mengirim Invoice Fisik via WhatsApp</h3>
              <button type="button" onClick={() => setShowWaModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-6 h-6"/></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Pilih Template Pesan Invoice</label>
                <select value={selectedTemplateId} onChange={e => setSelectedTemplateId(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500">
                  {whatsappTemplates.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Preview Isi Invoice WhatsApp:</label>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 font-mono text-[11px] text-slate-700 whitespace-pre-wrap max-h-48 overflow-y-auto">
                  {(() => {
                    const tmp = whatsappTemplates.find(t => t.id === selectedTemplateId);
                    if (!tmp) return '';
                    const cust = customers.find(c => c.id === activeInvoice?.customerId);
                    const wo = workOrders.find(w => w.id === activeInvoice?.woId);
                    const unit = units.find(u => u.id === wo?.unitId);

                    return tmp.content
                      .replace(/\[NAMA_PELANGGAN\]/g, cust?.name || '')
                      .replace(/\[JENIS_JASA\]/g, wo?.jobTypes ? wo.jobTypes.join(', ') : (wo?.jobType || 'Servis AC'))
                      .replace(/\[MEREK_UNIT\]/g, unit ? `${unit.brand} (${unit.model})` : 'Unit AC')
                      .replace(/\[LOKASI_UNIT\]/g, unit?.location || '')
                      .replace(/\[TANGGAL\]/g, activeInvoice?.date || '')
                      .replace(/\[TOTAL_BIAYA\]/g, formatIDR(activeInvoice?.total))
                      .replace(/\[BIAYA_JASA\]/g, formatIDR(activeInvoice?.subtotal))
                      .replace(/\[BIAYA_SPAREPART\]/g, formatIDR(activeInvoice?.partsFee || 0))
                      .replace(/\[NAMA_SPAREPART\]/g, 'Suku cadang & material servis')
                      .replace(/\[NOMOR_INVOICE\]/g, activeInvoice?.id || '')
                      .replace(/\[STATUS_INVOICE\]/g, activeInvoice?.status || '');
                  })()}
                </div>
              </div>
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={() => setShowWaModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs">Batal</button>
              <button type="button" onClick={sendInvoiceWa} className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md flex items-center space-x-1.5">
                <Send className="w-4 h-4"/>
                <span>Buka WhatsApp Sekarang</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// 14. REPORTS VIEW
// ==========================================
function ReportsView({ workOrders, units, invoices, formatIDR }) {
  const totalRevenue = invoices.filter(i => i.status === 'Lunas').reduce((a, b) => a + b.total, 0);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Laporan & Analitik Operasional</h2>
        <p className="text-xs text-slate-500">Ringkasan pendapatan, volume pekerjaan, dan analitik servis HVAC.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Pendapatan Lunas</p>
          <p className="text-2xl font-black text-emerald-600">{formatIDR(totalRevenue)}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase">Total Work Orders</p>
          <p className="text-2xl font-black text-slate-900">{workOrders.length}</p>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-1">
          <p className="text-xs font-bold text-slate-400 uppercase">Unit AC Terdaftar</p>
          <p className="text-2xl font-black text-cyan-600">{units.length}</p>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 15. SETTINGS VIEW
// ==========================================
function SettingsView({ companySettings, setCompanySettings, handleResetDemo, handleClearAll }) {
  return (
    <div className="space-y-6 max-w-xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Pengaturan Perusahaan & Sistem</h2>
        <p className="text-xs text-slate-500">Kelola identitas perusahaan dan data demo aplikasi.</p>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="space-y-3 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1">Nama Perusahaan</label>
            <input type="text" value={companySettings.name} onChange={e => setCompanySettings({...companySettings, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Nomor Telepon</label>
            <input type="text" value={companySettings.phone} onChange={e => setCompanySettings({...companySettings, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"/>
          </div>
          <div>
            <label className="font-bold text-slate-700 block mb-1">Alamat Kantor</label>
            <textarea rows="2" value={companySettings.address} onChange={e => setCompanySettings({...companySettings, address: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500"></textarea>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 flex space-x-3">
          <button onClick={handleResetDemo} className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-md">Reset Data Demo</button>
          <button onClick={handleClearAll} className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-4 py-2.5 rounded-xl text-xs font-bold">Bersihkan Semua Data</button>
        </div>
      </div>
    </div>
  );
}

// ==========================================
// 16. TECH MOBILE VIEW (Strict 4-Step Workflow for Washing Specialists)
// ==========================================
function TechMobileView({ technicians, workOrders, setWorkOrders, inventory, customers, units, serviceTypes, selectedTechMobile, setSelectedTechMobile, showToast, formatIDR }) {
  const activeTech = technicians.find(t => t.id === selectedTechMobile) || technicians[0];
  const assignedJobs = workOrders.filter(w => w.technicianId === activeTech?.id);
  
  const todayStr = '2026-10-25';
  const [selectedDateStr, setSelectedDateStr] = useState(todayStr);

  const [showReportModal, setShowReportModal] = useState(false);
  const [activeWoForReport, setActiveWoForReport] = useState(null);
  const [reportForm, setReportForm] = useState({
    diagnosis: '',
    action: '',
    techNotes: '',
    beforePhoto: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
    afterPhoto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'
  });

  const [showOnSiteRequestModal, setShowOnSiteRequestModal] = useState(false);
  const [onSiteRequestText, setOnSiteRequestText] = useState('Pengecekan unit AC & Jadwalkan Teknisi Servis');
  const [additionalServiceType, setAdditionalServiceType] = useState('Pengecekan Unit AC');

  const isWashingSpecialist = activeTech?.roleType?.includes('Cuci') || activeTech?.specialty === 'cuci';

  const todayDateObj = new Date('2026-10-25');
  const weekDays = [];
  for (let i = -3; i <= 3; i++) {
    const d = new Date('2026-10-25');
    d.setDate(todayDateObj.getDate() + i);
    const dStr = d.toISOString().split('T')[0];
    const count = assignedJobs.filter(w => w.scheduleDate === dStr).length;
    const completedCount = assignedJobs.filter(w => w.scheduleDate === dStr && w.status === 'Selesai').length;
    weekDays.push({
      dateStr: dStr,
      dayName: d.toLocaleDateString('id-ID', { weekday: 'short' }),
      dayNum: d.getDate(),
      fullDateLabel: d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }),
      isToday: dStr === todayStr,
      isSelected: dStr === selectedDateStr,
      total: count,
      completed: completedCount
    });
  }

  const weekDateStrs = weekDays.map(w => w.dateStr);
  const weeklyAssignedJobs = assignedJobs.filter(w => weekDateStrs.includes(w.scheduleDate));
  const totalWeeklyUnits = weeklyAssignedJobs.length;

  const selectedDateJobs = assignedJobs.filter(w => w.scheduleDate === selectedDateStr);
  const pendingSelectedJobs = selectedDateJobs.filter(w => w.status !== 'Selesai');
  const completedSelectedJobs = selectedDateJobs.filter(w => w.status === 'Selesai');

  const handleNextStatus = (wo) => {
    if (wo.scheduleDate > todayStr) {
      showToast(`Pekerjaan ini terjadwal pada ${wo.scheduleDate}. Anda belum dapat mengonfirmasi atau memulai pekerjaan sebelum tanggal tersebut tiba!`, 'error');
      return;
    }

    let nextStatus = '';
    const current = wo.status;

    if (current === 'Terjadwal') nextStatus = 'Konfirmasi';
    else if (current === 'Konfirmasi') nextStatus = 'Dalam perjalanan';
    else if (current === 'Dalam perjalanan' || current === 'Disetujui Pelanggan') nextStatus = 'Sedang dikerjakan';
    else if (current === 'Sedang dikerjakan') {
      setActiveWoForReport(wo);
      setReportForm({
        diagnosis: wo.diagnosis || 'Pengecekan di lokasi & pencucian rutin.',
        action: wo.action || 'Pencucian indoor & outdoor jet cleaner selesai.',
        techNotes: wo.techNotes || 'AC kembali bersih dan dingin.',
        beforePhoto: wo.beforePhoto || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
        afterPhoto: wo.afterPhoto || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'
      });
      setShowReportModal(true);
      return;
    }
    else return;

    setWorkOrders(workOrders.map(w => {
      if (w.id === wo.id) {
        return {
          ...w,
          status: nextStatus,
          statusHistory: [...(w.statusHistory || []), { status: nextStatus, time: new Date().toLocaleString() }]
        };
      }
      return w;
    }));
    showToast(`Status WO ${wo.id} diperbarui ke: ${nextStatus}`);
  };

  const handleOpenOnSiteRequest = (wo) => {
    if (wo.scheduleDate > todayStr) {
      showToast(`Pekerjaan ini terjadwal pada ${wo.scheduleDate}. Belum dapat melakukan permintaan tindakan on-site sebelum hari H!`, 'error');
      return;
    }
    setActiveWoForReport(wo);
    setOnSiteRequestText(isWashingSpecialist ? 'Pengecekan unit AC & Jadwalkan Teknisi Servis' : 'Flushing & tambah oli Kompresor R32 & Isi Freon R32 Baru');
    setAdditionalServiceType(isWashingSpecialist ? 'Pengecekan Unit AC' : 'Perbaikan / Repair (On-Site Check)');
    setShowOnSiteRequestModal(true);
  };

  const handleSubmitOnSiteRequest = (e) => {
    e.preventDefault();
    if (!activeWoForReport) return;

    setWorkOrders(workOrders.map(w => {
      if (w.id === activeWoForReport.id) {
        return {
          ...w,
          status: 'Menunggu Persetujuan Pelanggan',
          onSiteRequestNotes: `${onSiteRequestText} [Tambahan Layanan: ${additionalServiceType}]`,
          onSiteRequestRead: false,
          adminApprovedForTech: false,
          statusHistory: [...(w.statusHistory || []), { status: 'Menunggu Persetujuan Pelanggan', time: new Date().toLocaleString() }]
        };
      }
      return w;
    }));

    setShowOnSiteRequestModal(false);
    showToast('Permintaan tindakan on-site & jenis layanan tambahan berhasil dikirim ke Admin!');
  };

  const handleSaveReportAndComplete = (e) => {
    e.preventDefault();
    if (!activeWoForReport) return;

    setWorkOrders(workOrders.map(w => {
      if (w.id === activeWoForReport.id) {
        return {
          ...w,
          status: 'Selesai',
          diagnosis: reportForm.diagnosis,
          action: reportForm.action,
          techNotes: reportForm.techNotes,
          beforePhoto: reportForm.beforePhoto,
          afterPhoto: reportForm.afterPhoto,
          statusHistory: [...(w.statusHistory || []), { status: 'Selesai', time: new Date().toLocaleString() }]
        };
      }
      return w;
    }));

    setShowReportModal(false);
    showToast('Laporan akhir, diagnosis & catatan teknisi berhasil disimpan! Invoice fisik otomatis dibuat.');
  };

  const getNextActionLabel = (status) => {
    switch (status) {
      case 'Terjadwal': return '1. Konfirmasi';
      case 'Konfirmasi': return '2. Mulai Perjalanan';
      case 'Dalam perjalanan': return '3. Mulai Pengerjaan';
      case 'Disetujui Pelanggan': return '3. Mulai Pengerjaan';
      case 'Sedang dikerjakan': return '4. Selesai & Buat Laporan Akhir';
      default: return '4. Selesai & Buat Laporan Akhir';
    }
  };

  const getNextActionColor = (status) => {
    switch (status) {
      case 'Terjadwal': return 'bg-cyan-600 hover:bg-cyan-700 text-white';
      case 'Konfirmasi': return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'Dalam perjalanan': return 'bg-amber-600 hover:bg-amber-700 text-white';
      case 'Disetujui Pelanggan': return 'bg-amber-600 hover:bg-amber-700 text-white';
      case 'Sedang dikerjakan': return 'bg-emerald-600 hover:bg-emerald-700 text-white';
      default: return 'bg-emerald-600 hover:bg-emerald-700 text-white';
    }
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto pb-16">
      <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-lg space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">Dashboard Teknisi Lapangan</span>
            <h3 className="text-xl font-black">{activeTech?.name}</h3>
            {isWashingSpecialist && (
              <span className="inline-block mt-1 px-2.5 py-0.5 bg-cyan-500 text-slate-950 font-bold text-[10px] rounded-full">
                Teknisi Spesialis Cuci (Workflow: Konfirmasi → Mulai Perjalanan → Mulai Pengerjaan → Selesai)
              </span>
            )}
          </div>
          <select value={selectedTechMobile} onChange={e => setSelectedTechMobile(e.target.value)} className="bg-slate-800 text-white text-xs px-3 py-2 rounded-xl border border-slate-700 font-semibold focus:outline-none focus:border-cyan-500">
            {technicians.filter(t => t.roleType?.includes('Teknisi') || t.specialty === 'cuci' || t.specialty === 'repair').map(t => <option key={t.id} value={t.id}>{t.name} ({t.roleType || t.specialty})</option>)}
          </select>
        </div>

        <div className="bg-cyan-950/60 border border-cyan-800/60 p-3.5 rounded-xl flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="bg-cyan-500 p-2 rounded-lg text-slate-950 font-bold">
              <Wrench className="w-4 h-4"/>
            </div>
            <div>
              <p className="text-[10px] text-cyan-300 uppercase font-bold tracking-wider">Total Unit Pengerjaan Minggu Ini</p>
              <p className="text-sm font-black text-white">{totalWeeklyUnits} Unit AC Terjadwal</p>
            </div>
          </div>
          <span className="text-[10px] bg-cyan-500 text-slate-950 font-bold px-2.5 py-1 rounded-full">7 Hari Terakhir</span>
        </div>

        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center">
          <div className="bg-slate-800/80 p-2.5 rounded-xl">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Total Tugas</p>
            <p className="text-xl font-black text-cyan-400 mt-0.5">{selectedDateJobs.length}</p>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded-xl">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Belum Selesai</p>
            <p className="text-xl font-black text-amber-400 mt-0.5">{pendingSelectedJobs.length}</p>
          </div>
          <div className="bg-slate-800/80 p-2.5 rounded-xl">
            <p className="text-[10px] text-slate-400 uppercase font-bold">Selesai</p>
            <p className="text-xl font-black text-emerald-400 mt-0.5">{completedSelectedJobs.length}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm space-y-3">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-slate-900 text-sm flex items-center space-x-1.5">
            <Calendar className="w-4 h-4 text-cyan-600"/>
            <span>Pilih Tanggal (Kalender 1 Minggu)</span>
          </h4>
          <span className="text-xs text-cyan-700 font-bold">Klik tanggal untuk cek tugas</span>
        </div>
        <div className="grid grid-cols-7 gap-1.5 pt-1">
          {weekDays.map((item, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedDateStr(item.dateStr)}
              className={`p-2 rounded-xl text-center border transition-all cursor-pointer ${item.isSelected ? 'bg-cyan-600 text-white border-cyan-600 shadow-md ring-2 ring-cyan-400/30' : item.isToday ? 'bg-cyan-50 border-cyan-400' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
            >
              <p className={`text-[10px] uppercase font-bold ${item.isSelected ? 'text-cyan-100' : 'text-slate-500'}`}>{item.dayName}</p>
              <p className={`text-sm font-black my-0.5 ${item.isSelected ? 'text-white' : item.isToday ? 'text-cyan-700' : 'text-slate-800'}`}>{item.dayNum}</p>
              <div className="mt-1 flex flex-col items-center">
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold ${item.isSelected ? 'bg-cyan-800 text-white' : item.total > 0 ? (item.completed === item.total ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800') : 'bg-slate-200 text-slate-600'}`}>
                  {item.total} job
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-slate-900 text-base">Daftar Tugas ({selectedDateStr})</h4>
          <span className="text-xs font-mono font-bold text-cyan-700 bg-cyan-50 px-2.5 py-1 rounded-lg border border-cyan-200">
            {selectedDateStr === todayStr ? 'Hari Ini' : selectedDateStr > todayStr ? 'Mendatang (Besok)' : 'Riwayat Lalu (Kemarin)'}
          </span>
        </div>

        {selectedDateJobs.length === 0 ? (
          <div className="bg-white p-12 text-center rounded-2xl border border-slate-200 shadow-sm">
            <CheckCircle2 className="w-12 h-12 text-slate-300 mx-auto mb-2"/>
            <p className="text-slate-800 font-bold text-base">Tidak ada jadwal kunjungan pada tanggal {selectedDateStr}.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingSelectedJobs.length > 0 && (
              <div className="space-y-3">
                <p className="text-xs font-bold text-amber-700 uppercase tracking-wider flex items-center space-x-1">
                  <Clock className="w-3.5 h-3.5"/>
                  <span>Pekerjaan Aktif ({pendingSelectedJobs.length})</span>
                </p>
                {pendingSelectedJobs.map(wo => {
                  const cust = customers.find(c => c.id === wo.customerId);
                  const unit = units.find(u => u.id === wo.unitId);
                  const isWaitingApproval = wo.status === 'Menunggu Persetujuan Pelanggan';
                  const isApproved = wo.status === 'Disetujui Pelanggan';
                  const jobTypesStr = wo.jobTypes ? wo.jobTypes.join(', ') : (wo.jobType || '-');
                  const isFutureJob = wo.scheduleDate > todayStr;

                  return (
                    <div key={wo.id} className={`bg-white rounded-2xl border-2 p-5 shadow-md space-y-4 relative overflow-hidden ${isWaitingApproval ? 'border-amber-400 bg-amber-50/20' : isApproved ? 'border-emerald-500 bg-emerald-50/10' : 'border-slate-200'} ${isFutureJob ? 'opacity-80 bg-slate-50' : ''}`}>
                      <div className={`absolute top-0 right-0 font-bold text-[10px] px-3 py-1 rounded-bl-xl uppercase tracking-wider ${isWaitingApproval ? 'bg-amber-500 text-slate-950 animate-pulse' : isApproved ? 'bg-emerald-600 text-white font-bold' : isFutureJob ? 'bg-slate-400 text-white' : 'bg-slate-900 text-white'}`}>
                        {isFutureJob ? `Terjadwal (${wo.scheduleDate})` : wo.status}
                      </div>

                      <div className="pr-20">
                        <span className="text-xs font-mono font-bold text-cyan-700">{wo.id}</span>
                        <h4 className="font-bold text-slate-900 text-base">{jobTypesStr}</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Jam Kunjungan: <b className="text-slate-800">{wo.startTime} - {wo.endTime} WIB</b></p>
                      </div>

                      <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-200 text-xs space-y-1.5">
                        <p className="font-bold text-slate-900 text-sm flex items-center space-x-1">
                          <Users className="w-3.5 h-3.5 text-slate-500"/>
                          <span>{cust?.name}</span>
                        </p>
                        <p className="text-slate-600 flex items-start space-x-1">
                          <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0"/>
                          <span>{cust?.address}, {cust?.district}</span>
                        </p>
                        <div className="pt-2 flex flex-wrap gap-2">
                          <a href={`https://wa.me/${formatWhatsAppNumber(cust?.whatsapp || cust?.phone)}?text=Halo%20${encodeURIComponent(cust?.name || '')},%20saya%20teknisi%20Coolpro%20AC%20siap%20menuju%20lokasi.`} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg flex items-center space-x-1 shadow-sm">
                            <Phone className="w-3.5 h-3.5"/>
                            <span>WhatsApp Pelanggan</span>
                          </a>
                          {cust?.mapLink && (
                            <a href={cust.mapLink} target="_blank" rel="noreferrer" className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg flex items-center space-x-1 shadow-sm">
                              <MapPin className="w-3.5 h-3.5"/>
                              <span>Buka Maps</span>
                            </a>
                          )}
                        </div>
                      </div>

                      <div className="p-3 bg-blue-50/70 rounded-xl border border-blue-200 text-xs space-y-1">
                        <p className="font-bold text-blue-900">Unit AC: {unit?.brand} ({unit?.pk}) — {unit?.location}</p>
                        <p className="text-blue-800"><b>Keluhan Pelanggan:</b> {wo.complaint || 'Pemeriksaan / Perawatan berkala standar.'}</p>
                        {wo.diagnosis && <p className="text-blue-700 pt-1 border-t border-blue-200"><b>Diagnosis Awal:</b> {wo.diagnosis}</p>}
                        
                        {wo.onSiteRequestNotes && (
                          <div className={`mt-2 p-3 rounded-lg border text-xs ${wo.adminApprovedForTech ? 'bg-emerald-100 border-emerald-300 text-emerald-900 font-bold' : 'bg-amber-100 border-amber-300 text-amber-900'}`}>
                            <p className="font-bold">Permintaan Tindakan On-Site:</p>
                            <p className="italic">{wo.onSiteRequestNotes}</p>
                            <p className="mt-1">
                              {wo.adminApprovedForTech ? '✓ Disetujui Admin! Silakan klik Mulai Pengerjaan.' : '⏳ Menunggu persetujuan admin & pelanggan...'}
                            </p>
                          </div>
                        )}
                      </div>

                      {isFutureJob && (
                        <div className="p-3 bg-rose-50 rounded-xl border border-rose-200 text-xs text-rose-800 font-bold flex items-center space-x-2">
                          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0"/>
                          <span>Pekerjaan ini terjadwal pada tanggal {wo.scheduleDate}. Tombol aksi dikunci hingga hari H tiba.</span>
                        </div>
                      )}

                      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <p className="text-[11px] font-bold text-slate-400 uppercase">Tahapan Sistem:</p>
                          <p className="text-xs font-semibold text-slate-700">Status: <span className="text-cyan-700 font-bold">{wo.status}</span></p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          {(wo.status === 'Sedang dikerjakan' || wo.status === 'Disetujui Pelanggan') && (
                            <button onClick={() => handleOpenOnSiteRequest(wo)} disabled={isFutureJob} className={`px-3 py-2.5 rounded-xl text-xs font-bold shadow-md flex items-center space-x-1.5 ${isFutureJob ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 text-white'}`}>
                              <Wrench className="w-4 h-4"/>
                              <span>{isWashingSpecialist ? 'Tambah/Ganti Layanan (Pengecekan/Jadwal)' : 'Tambah Tindakan & Jenis Layanan'}</span>
                            </button>
                          )}
                          <button 
                            onClick={() => {
                              if (wo.status === 'Sedang dikerjakan') {
                                setActiveWoForReport(wo);
                                setReportForm({
                                  diagnosis: wo.diagnosis || 'Pengecekan di lokasi & tindakan on-site selesai.',
                                  action: wo.action || 'Perbaikan dan pencucian sesuai permintaan.',
                                  techNotes: wo.techNotes || 'AC berfungsi normal kembali.',
                                  beforePhoto: wo.beforePhoto || 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
                                  afterPhoto: wo.afterPhoto || 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=400&q=80'
                                });
                                setShowReportModal(true);
                              } else {
                                handleNextStatus(wo);
                              }
                            }} 
                            disabled={isFutureJob || isWaitingApproval || (wo.onSiteRequestNotes && !wo.adminApprovedForTech && wo.status !== 'Disetujui Pelanggan')} 
                            className={`px-4 py-2.5 rounded-xl text-xs font-bold shadow-md transition-all flex items-center space-x-2 ${(isFutureJob || isWaitingApproval || (wo.onSiteRequestNotes && !wo.adminApprovedForTech && wo.status !== 'Disetujui Pelanggan')) ? 'bg-slate-300 text-slate-500 cursor-not-allowed' : getNextActionColor(wo.status)}`}
                          >
                            <span>{isFutureJob ? 'Terkunci (Bukan Hari Ini)' : isWaitingApproval ? 'Menunggu Persetujuan Pelanggan' : (wo.onSiteRequestNotes && !wo.adminApprovedForTech && wo.status !== 'Disetujui Pelanggan') ? 'Menunggu Persetujuan Admin' : getNextActionLabel(wo.status)}</span>
                            <ChevronRight className="w-4 h-4"/>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {completedSelectedJobs.length > 0 && (
              <div className="space-y-3 pt-2">
                <p className="text-xs font-bold text-emerald-700 uppercase tracking-wider flex items-center space-x-1">
                  <CheckCircle2 className="w-3.5 h-3.5"/>
                  <span>Riwayat Servis Selesai ({completedSelectedJobs.length})</span>
                </p>
                {completedSelectedJobs.map(wo => {
                  const cust = customers.find(c => c.id === wo.customerId);
                  const unit = units.find(u => u.id === wo.unitId);
                  const jobTypesStr = wo.jobTypes ? wo.jobTypes.join(', ') : (wo.jobType || '-');
                  return (
                    <div key={wo.id} className="bg-slate-50 rounded-2xl border border-emerald-200 p-5 shadow-sm space-y-3">
                      <div className="flex justify-between items-start">
                        <div>
                          <span className="text-xs font-mono font-bold text-emerald-700">{wo.id} — SELESAI</span>
                          <h4 className="font-bold text-slate-900 text-base">{jobTypesStr}</h4>
                        </div>
                        <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full font-bold">Selesai</span>
                      </div>
                      <p className="text-xs text-slate-600">Pelanggan: <b>{cust?.name}</b> ({cust?.address})</p>
                      <p className="text-xs text-slate-500">Unit: {unit?.brand} ({unit?.location}) — Total Tagihan: <b className="text-emerald-700">{formatIDR(wo.totalCost)}</b></p>
                      <div className="bg-emerald-50/70 p-3 rounded-xl border border-emerald-200 text-xs space-y-1.5">
                        <p className="font-bold text-emerald-900">Hasil Diagnosis & Pemeriksaan On-Site:</p>
                        <p className="text-emerald-800">{wo.diagnosis || 'Pemeriksaan standar selesai.'}</p>
                        <p className="font-bold text-emerald-900 pt-1 border-t border-emerald-200">Catatan Pengerjaan & Tindakan:</p>
                        <p className="text-emerald-800">{wo.action || wo.techNotes || 'Pekerjaan selesai dengan baik tanpa kendala.'}</p>

                        <div className="pt-2 border-t border-emerald-200 grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-[10px] font-bold text-slate-500 mb-1">Foto Sebelum:</p>
                            {wo.beforePhoto ? (
                              <img src={wo.beforePhoto} alt="Before" className="w-full h-24 object-cover rounded-lg border"/>
                            ) : (
                              <div className="text-[10px] text-slate-400 italic">Tidak ada foto</div>
                            )}
                          </div>
                          <div>
                            <p className="text-[10px] font-bold text-slate-500 mb-1">Foto Sesudah:</p>
                            {wo.afterPhoto ? (
                              <img src={wo.afterPhoto} alt="After" className="w-full h-24 object-cover rounded-lg border"/>
                            ) : (
                              <div className="text-[10px] text-slate-400 italic">Tidak ada foto</div>
                            )}
                          </div>
                        </div>
                      </div>
                      <p className="text-[11px] text-slate-400 italic text-right">* Invoice fisik otomatis dibuat dan dikirim ke customer oleh Admin.</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>

      {showOnSiteRequestModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSubmitOnSiteRequest} className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <h3 className="font-black text-slate-900 text-base">{isWashingSpecialist ? 'Tambah / Ganti Layanan (Pengecekan / Jadwal Teknisi)' : 'Permintaan Tindakan & Tambah Jenis Layanan'}</h3>
              <button type="button" onClick={() => setShowOnSiteRequestModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-6 h-6"/></button>
            </div>
            <div className="space-y-3 text-xs">
              <p className="text-slate-600">
                {isWashingSpecialist 
                  ? 'Sebagai Teknisi Spesialis Cuci, Anda dapat memilih pengecekan atau menjadwalkan teknisi servis lanjutan untuk dilaporkan ke admin.' 
                  : 'Beritahu Admin mengenai temuan kerusakan dan tindakan on-site serta pilih jenis layanan tambahan.'}
              </p>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Pilih Jenis Layanan / Pengecekan</label>
                <select value={additionalServiceType} onChange={e => setAdditionalServiceType(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500">
                  {isWashingSpecialist ? (
                    <>
                      <option value="Pengecekan Unit AC">Pengecekan Unit AC (Rp 100.000)</option>
                      <option value="Jadwalkan Teknisi Servis Lanjutan">Jadwalkan Teknisi Servis Lanjutan (Rp 250.000)</option>
                    </>
                  ) : (
                    serviceTypes.map(s => <option key={s.id} value={s.name}>{s.name} ({formatIDR(s.defaultFee)})</option>)
                  )}
                </select>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Catatan Tindakan & Keterangan *</label>
                <textarea rows="4" required value={onSiteRequestText} onChange={e => setOnSiteRequestText(e.target.value)} className="w-full bg-slate-50 border border-slate-200 p-3 rounded-xl font-medium focus:outline-none focus:border-cyan-500" placeholder="Keterangan pengecekan atau penjadwalan..."></textarea>
              </div>
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={() => setShowOnSiteRequestModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs">Batal</button>
              <button type="submit" className="px-5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-md">Kirim Permintaan ke Admin</button>
            </div>
          </form>
        </div>
      )}

      {showReportModal && (
        <div className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <form onSubmit={handleSaveReportAndComplete} className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200">
              <div>
                <span className="text-xs font-mono font-bold text-cyan-700">{activeWoForReport?.id}</span>
                <h3 className="font-black text-slate-900 text-lg">Laporan Akhir Pengerjaan (Teknisi)</h3>
              </div>
              <button type="button" onClick={() => setShowReportModal(false)} className="text-slate-400 hover:text-slate-600"><XCircle className="w-6 h-6"/></button>
            </div>
            <div className="space-y-3 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Hasil Diagnosis & Pemeriksaan Lapangan *</label>
                <textarea rows="2" required value={reportForm.diagnosis} onChange={e => setReportForm({...reportForm, diagnosis: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500" placeholder="Hasil pemeriksaan & temuan kerusakan di lokasi..."></textarea>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Tindakan Perbaikan yang Dilakukan *</label>
                <textarea rows="2" required value={reportForm.action} onChange={e => setReportForm({...reportForm, action: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500" placeholder="Tindakan perbaikan atau pencucian..."></textarea>
              </div>
              <div>
                <label className="font-bold text-slate-700 block mb-1">Catatan Akhir Teknisi *</label>
                <textarea rows="2" required value={reportForm.techNotes} onChange={e => setReportForm({...reportForm, techNotes: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2.5 rounded-xl font-medium focus:outline-none focus:border-cyan-500" placeholder="Kondisi unit AC setelah selesai pengerjaan..."></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">URL Foto Sebelum (Before)</label>
                  <input type="text" value={reportForm.beforePhoto} onChange={e => setReportForm({...reportForm, beforePhoto: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs"/>
                  {reportForm.beforePhoto && <img src={reportForm.beforePhoto} alt="Preview Before" className="mt-2 w-full h-20 object-cover rounded-lg border"/>}
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">URL Foto Sesudah (After)</label>
                  <input type="text" value={reportForm.afterPhoto} onChange={e => setReportForm({...reportForm, afterPhoto: e.target.value})} className="w-full bg-slate-50 border border-slate-200 p-2 rounded-xl text-xs"/>
                  {reportForm.afterPhoto && <img src={reportForm.afterPhoto} alt="Preview After" className="mt-2 w-full h-20 object-cover rounded-lg border"/>}
                </div>
              </div>
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button type="button" onClick={() => setShowReportModal(false)} className="px-4 py-2 rounded-xl border border-slate-300 font-bold text-slate-700 text-xs">Batal</button>
              <button type="submit" className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shadow-md">Simpan Laporan & Selesaikan Tugas</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

// ==========================================
// MAIN APP COMPONENT
// ==========================================
export default function App() {
  const [role, setRole] = useState('Manager');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedTechMobile, setSelectedTechMobile] = useState('TECH-01');

  const [serviceTypes, setServiceTypes] = useState(() => {
    const saved = localStorage.getItem('coolpro_servicetypes');
    return saved ? JSON.parse(saved) : INITIAL_SERVICE_TYPES;
  });

  const [technicians, setTechnicians] = useState(() => {
    const saved = localStorage.getItem('coolpro_technicians');
    return saved ? JSON.parse(saved) : INITIAL_TECHNICIANS;
  });

  const [customers, setCustomers] = useState(() => {
    const saved = localStorage.getItem('coolpro_customers');
    return saved ? JSON.parse(saved) : INITIAL_CUSTOMERS;
  });

  const [units, setUnits] = useState(() => {
    const saved = localStorage.getItem('coolpro_units');
    return saved ? JSON.parse(saved) : INITIAL_UNITS;
  });

  const [inventory, setInventory] = useState(() => {
    const saved = localStorage.getItem('coolpro_inventory');
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [workOrders, setWorkOrders] = useState(() => {
    const saved = localStorage.getItem('coolpro_workorders');
    return saved ? JSON.parse(saved) : INITIAL_WORK_ORDERS;
  });

  const [invoices, setInvoices] = useState(() => {
    const saved = localStorage.getItem('coolpro_invoices');
    return saved ? JSON.parse(saved) : INITIAL_INVOICES;
  });

  const [whatsappTemplates, setWhatsappTemplates] = useState(() => {
    const saved = localStorage.getItem('coolpro_whatsapp_templates');
    return saved ? JSON.parse(saved) : INITIAL_WHATSAPP_TEMPLATES;
  });

  const [companySettings, setCompanySettings] = useState(() => {
    const saved = localStorage.getItem('coolpro_settings');
    return saved ? JSON.parse(saved) : INITIAL_COMPANY_SETTINGS;
  });

  // Automatically generate an official invoice whenever a Work Order is completed
  useEffect(() => {
    const completedWoIdsWithInvoice = new Set(invoices.map(i => i.woId));
    let newInvoicesAdded = false;
    const updatedInvoices = [...invoices];

    workOrders.forEach(wo => {
      if (wo.status === 'Selesai' && !completedWoIdsWithInvoice.has(wo.id)) {
        const newInv = {
          id: `INV-2026-${wo.id.replace('WO-', '')}`,
          woId: wo.id,
          customerId: wo.customerId,
          date: wo.scheduleDate || '2026-10-25',
          dueDate: new Date(Date.now() + 7*24*60*60*1000).toISOString().split('T')[0],
          subtotal: wo.serviceFee || 150000,
          partsFee: wo.partsFee || 0,
          discount: wo.discount || 0,
          total: wo.totalCost || wo.serviceFee || 150000,
          status: 'Belum Lunas',
          paymentMethod: 'Transfer Bank / Cash',
          paymentDate: ''
        };
        updatedInvoices.unshift(newInv);
        newInvoicesAdded = true;
      }
    });

    if (newInvoicesAdded) {
      setInvoices(updatedInvoices);
    }
  }, [workOrders]);

  useEffect(() => {
    localStorage.setItem('coolpro_servicetypes', JSON.stringify(serviceTypes));
    localStorage.setItem('coolpro_technicians', JSON.stringify(technicians));
    localStorage.setItem('coolpro_customers', JSON.stringify(customers));
    localStorage.setItem('coolpro_units', JSON.stringify(units));
    localStorage.setItem('coolpro_inventory', JSON.stringify(inventory));
    localStorage.setItem('coolpro_workorders', JSON.stringify(workOrders));
    localStorage.setItem('coolpro_invoices', JSON.stringify(invoices));
    localStorage.setItem('coolpro_whatsapp_templates', JSON.stringify(whatsappTemplates));
    localStorage.setItem('coolpro_settings', JSON.stringify(companySettings));
  }, [serviceTypes, technicians, customers, units, inventory, workOrders, invoices, whatsappTemplates, companySettings]);

  const [toast, setToast] = useState(null);
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  const formatIDR = (num) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(num || 0);
  };

  const handleResetDemo = () => {
    if (window.confirm('Reset seluruh data aplikasi ke data awal demo?')) {
      setServiceTypes(INITIAL_SERVICE_TYPES);
      setTechnicians(INITIAL_TECHNICIANS);
      setCustomers(INITIAL_CUSTOMERS);
      setUnits(INITIAL_UNITS);
      setInventory(INITIAL_INVENTORY);
      setWorkOrders(INITIAL_WORK_ORDERS);
      setInvoices(INITIAL_INVOICES);
      setWhatsappTemplates(INITIAL_WHATSAPP_TEMPLATES);
      setCompanySettings(INITIAL_COMPANY_SETTINGS);
      showToast('Data berhasil di-reset ke data demo!');
    }
  };

  const handleClearAll = () => {
    if (window.confirm('PERINGATAN: Menghapus semua data operasional. Lanjutkan?')) {
      setCustomers([]);
      setUnits([]);
      setWorkOrders([]);
      setInvoices([]);
      showToast('Semua data berhasil dibersihkan.', 'info');
    }
  };

  const checkScheduleConflict = (techId, date, startTime, endTime, excludeWoId = null) => {
    if (!techId || !date || !startTime || !endTime) return null;
    for (const wo of workOrders) {
      if (wo.id === excludeWoId) continue;
      if (wo.technicianId === techId && wo.scheduleDate === date && ['Terjadwal', 'Konfirmasi', 'Dalam perjalanan', 'Sedang dikerjakan', 'Menunggu Persetujuan Pelanggan', 'Disetujui Pelanggan'].includes(wo.status)) {
        if (!(endTime <= wo.startTime || startTime >= wo.endTime)) {
          return wo;
        }
      }
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-5 py-3 rounded-xl shadow-xl text-white font-medium flex items-center space-x-2 transition-all transform animate-bounce ${toast.type === 'error' ? 'bg-rose-600' : toast.type === 'info' ? 'bg-blue-600' : 'bg-emerald-600'}`}>
          {toast.type === 'error' ? <XCircle className="w-5 h-5"/> : <CheckCircle2 className="w-5 h-5"/>}
          <span>{toast.message}</span>
        </div>
      )}

      <header className="bg-slate-900 text-white shadow-md sticky top-0 z-40 flex items-center justify-between px-4 lg:px-8 py-3">
        <div className="flex items-center space-x-3">
          <div className="bg-cyan-500 p-2 rounded-xl text-slate-900 shadow-inner">
            <Wrench className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <h1 className="text-lg lg:text-xl font-bold tracking-tight text-cyan-400">{companySettings.name}</h1>
            <p className="text-xs text-slate-400">Sistem Manajemen Servis & SPK HVAC Jakarta</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center bg-slate-800 border border-slate-700 px-3 py-1.5 rounded-lg text-xs space-x-2 text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Waktu: <b>Asia/Jakarta</b> (WIB)</span>
          </div>

          <div className="flex items-center space-x-2 bg-slate-800 p-1 rounded-xl border border-slate-700">
            <span className="text-xs text-slate-400 px-2 font-medium hidden sm:inline">Role:</span>
            {['Manager', 'Admin', 'Teknisi'].map((r) => (
              <button
                key={r}
                onClick={() => {
                  setRole(r);
                  if (r === 'Teknisi') setActiveTab('tech_mobile');
                  else if (activeTab === 'tech_mobile') setActiveTab('dashboard');
                }}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${role === r ? 'bg-cyan-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white hover:bg-slate-700'}`}
              >
                {r === 'Teknisi' ? 'Teknisi (HP View)' : r}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col lg:flex-row">
        {role !== 'Teknisi' && (
          <aside className="w-full lg:w-64 bg-slate-900 text-slate-300 flex lg:flex-col justify-between p-3 lg:p-4 border-t lg:border-t-0 lg:border-r border-slate-800 overflow-x-auto lg:overflow-x-visible">
            <nav className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1.5 w-full">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['Manager', 'Admin'] },
                { id: 'customers', label: 'Pelanggan & Unit', icon: Users, roles: ['Manager', 'Admin'] },
                { id: 'services', label: 'Master Jasa Layanan', icon: Briefcase, roles: ['Manager', 'Admin'] },
                { id: 'reminders', label: 'Pengingat Cuci (3 Bln)', icon: Clock, roles: ['Manager', 'Admin'] },
                { id: 'whatsapp_templates', label: 'Template WA & Penilaian', icon: MessageSquare, roles: ['Manager', 'Admin'] },
                { id: 'technicians', label: 'Master Teknisi & Karyawan', icon: UserCheck, roles: ['Manager', 'Admin'] },
                { id: 'schedule', label: 'Jadwal & Kalender', icon: Calendar, roles: ['Manager', 'Admin'] },
                { id: 'workorders', label: 'Work Orders (WO)', icon: FileText, roles: ['Manager', 'Admin'] },
                { id: 'history', label: 'Riwayat Servis & Rating', icon: CheckCircle2, roles: ['Manager', 'Admin'] },
                { id: 'spk', label: 'Surat Perintah Kerja (SPK)', icon: FileText, roles: ['Manager', 'Admin'] },
                { id: 'warranty', label: 'Manajemen Garansi', icon: Shield, roles: ['Manager', 'Admin'] },
                { id: 'inventory', label: 'Stok Suku Cadang', icon: Package, roles: ['Manager', 'Admin'] },
                { id: 'invoices', label: 'Invoice & Pembayaran', icon: DollarSign, roles: ['Manager', 'Admin'] },
                { id: 'reports', label: 'Laporan & Analitik', icon: BarChart3, roles: ['Manager', 'Admin'] },
                { id: 'settings', label: 'Pengaturan', icon: Settings, roles: ['Manager'] },
              ]
                .filter(item => item.roles.includes(role))
                .map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  const unreadCount = item.id === 'workorders' ? workOrders.filter(w => w.onSiteRequestNotes && !w.onSiteRequestRead).length : 0;

                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${isActive ? 'bg-cyan-500 text-slate-950 font-semibold shadow-lg shadow-cyan-500/20' : 'hover:bg-slate-800 text-slate-300 hover:text-white'}`}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-slate-950' : 'text-cyan-400'}`} />
                        <span>{item.label}</span>
                      </div>
                      {unreadCount > 0 && (
                        <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-bounce">
                          {unreadCount}
                        </span>
                      )}
                    </button>
                  );
                })}
            </nav>

            <div className="hidden lg:block pt-6 border-t border-slate-800 mt-6 text-xs text-slate-500">
              <p className="font-semibold text-slate-400">Coolpro AC Jakarta</p>
              <p className="mt-1">Sistem Terintegrasi Profesional.</p>
            </div>
          </aside>
        )}

        <main className="flex-1 p-4 lg:p-8 overflow-y-auto bg-slate-50">
          {activeTab === 'dashboard' && <DashboardView {...{ workOrders, customers, units, technicians, invoices, setActiveTab, formatIDR }} />}
          {activeTab === 'customers' && <CustomersView {...{ customers, units, setCustomers, setUnits, showToast }} />}
          {activeTab === 'services' && <ServicesView {...{ serviceTypes, setServiceTypes, showToast, formatIDR }} />}
          {activeTab === 'reminders' && <RemindersView {...{ units, customers, workOrders, whatsappTemplates, showToast }} />}
          {activeTab === 'whatsapp_templates' && <WhatsappTemplatesView {...{ whatsappTemplates, setWhatsappTemplates, showToast }} />}
          {activeTab === 'technicians' && <TechniciansView {...{ technicians, setTechnicians, workOrders, showToast }} />}
          {activeTab === 'schedule' && <ScheduleView {...{ workOrders, technicians, customers }} />}
          {activeTab === 'workorders' && <WorkOrdersView {...{ workOrders, setWorkOrders, customers, units, technicians, serviceTypes, whatsappTemplates, checkScheduleConflict, showToast, formatIDR }} />}
          {activeTab === 'history' && <ServiceHistoryView {...{ workOrders, setWorkOrders, customers, units, technicians, formatIDR, showToast }} />}
          {activeTab === 'spk' && <SpkManagerView {...{ workOrders, customers, units, technicians, companySettings, showToast }} />}
          {activeTab === 'warranty' && <WarrantyView {...{ workOrders, setWorkOrders, customers, units, showToast }} />}
          {activeTab === 'inventory' && <InventoryView {...{ inventory, formatIDR }} />}
          {activeTab === 'invoices' && <InvoicesView {...{ invoices, setInvoices, customers, workOrders, units, whatsappTemplates, formatIDR, showToast, companySettings }} />}
          {activeTab === 'reports' && <ReportsView {...{ workOrders, units, invoices, formatIDR }} />}
          {activeTab === 'settings' && <SettingsView {...{ companySettings, setCompanySettings, handleResetDemo, handleClearAll }} />}
          {activeTab === 'tech_mobile' && <TechMobileView {...{ technicians, workOrders, setWorkOrders, inventory, customers, units, serviceTypes, selectedTechMobile, setSelectedTechMobile, showToast, formatIDR }} />}
        </main>
      </div>
    </div>
  );
}