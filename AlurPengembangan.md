<!DOCTYPE html>
<html>
<head>
  <title>Panduan Kontributor Tim</title>
</head>
<body>
  <h1>Panduan Pengembagan Tim</h1>

<h2>Tujuan Dokumen Ini</h2>
  <p>Dokumen ini bertujuan untuk memberikan panduan kepada anggota tim dalam berkontribusi pada proyek kami. Kami menghargai kerjasama dan upaya kontribusi dari setiap anggota tim untuk mencapai tujuan bersama.</p>

<h2> Proyek</h2>
  <p>Tim proyek terdiri dari anggota-anggota yang bekerja sama dalam pengembangan proyek ini. Setiap anggota tim memiliki peran dan tanggung jawab masing-masing.</p>

<h2>Alur Pengembangan</h2>
  <ol>
    <li>Fork Repository
      <ul>
        <li>Buatlah fork (salinan) dari repository utama proyek.</li>
        <li>Pergi ke repository utama di <a href="[URL Repository Utama]">URL Repository Utama</a> dan klik tombol "Fork" di kanan atas halaman.</li>
        <li>Setelah selesai, Anda akan memiliki salinan repository di akun GitHub pribadi Anda.</li>
      </ul>
    </li>
    <li>Clone Repository
      <ul>
        <li>Buka terminal atau command prompt di komputer Anda.</li>
        <li>Clone repository yang telah Anda fork ke komputer lokal Anda dengan perintah berikut:<br>
          <code>git clone &lt;URL Repository Fork&gt;</code></li>
          <p>Gantilah <code>&lt;URL Repository Fork&gt;</code> dengan URL repository hasil fork yang ada di akun GitHub Anda.</p>
      </ul>
    </li>
    <li>Buat Branch Baru
      <ul>
        <li>Pindah ke direktori proyek yang baru saja di-clone dengan perintah <code>cd</code>.</li>
        <li>Buat branch baru untuk pekerjaan Anda dengan perintah berikut:<br>
          <code>git checkout -b &lt;nama-branch-baru&gt;</code></li>
          <p>Gantilah <code>&lt;nama-branch-baru&gt;</code> dengan nama yang deskriptif untuk pekerjaan yang akan Anda lakukan.</p>
      </ul>
    </li>
    <li>Lakukan Pekerjaan
      <ul>
        <li>Lakukan perubahan dan penambahan kode yang diperlukan untuk kontribusi Anda.</li>
        <li>Pastikan kode yang Anda tulis sesuai dengan panduan penulisan kode proyek dan memperhatikan praktik terbaik.</li>
      </ul>
    </li>
    <li>Commit dan Push Perubahan
      <ul>
        <li>Setelah selesai melakukan perubahan pada kode, commit perubahan Anda dengan perintah berikut:<br>
          <code>git add .<br>
          git commit -m "Pesan commit yang deskriptif"</code></li>
          <p>Gantilah <code>"Pesan commit yang deskriptif"</code> dengan pesan yang menjelaskan perubahan yang Anda lakukan.</p>
        <li>Push perubahan ke repository GitHub Anda dengan perintah:<br>
          <code>git push origin &lt;nama-branch-baru&gt;</code></li>
          <p>Gantilah <code>&lt;nama-branch-baru&gt;</code> dengan nama branch yang telah Anda buat sebelumnya.</p>
      </ul>
    </li>
    <li>Buat Pull Request
      <ul>
        <li>Buka halaman repository di akun GitHub Anda.</li>
        <li>Pilih branch yang telah Anda buat untuk pull request dari menu dropdown "Branch".</li>
        <li>Klik tombol "New Pull Request".</li>
        <li>Isi deskripsi pull request dengan jelas dan lengkap, kemudian klik "Create Pull Request".</li>
      </ul>
    </li>
    <li>Review dan Merge
      <ul>
        <li>Anggota tim lain akan melihat pull request Anda dan melakukan review kode.</li>
        <li>Jika ada saran atau perbaikan yang diperlukan, Anda akan diberi tahu dan diminta untuk melakukan perubahan.</li>
        <li>Setelah perubahan diterima dan di-review dengan baik, pull request akan dimasukkan ke dalam repository utama oleh anggota tim dengan izin merging.</li>
      </ul>
    </li>
  </ol>

<h2>Kode Etik</h2>
  <p>Kami mengharapkan setiap anggota tim untuk berperilaku dengan etika yang baik dan menghormati rekan tim lainnya. Berikut adalah beberapa prinsip yang harus diikuti:</p>
  <ul>
    <li>Saling menghormati dan berkomunikasi dengan baik.</li>
    <li>Menghargai perbedaan pendapat dan mendukung diskusi yang sehat.</li>
    <li>Memberikan umpan balik yang konstruktif dan membangun.</li>
    <li>Menjaga kerahasiaan informasi yang sensitif atau rahasia.</li>
    <li>Menghindari tindakan yang melanggar hukum atau merugikan pihak lain.</li>
  </ul>

<h2>Kontak</h2>
  <p>Jika Anda memiliki pertanyaan lebih lanjut atau membutuhkan bantuan, jangan ragu untuk menghubungi anggota tim yang bertanggung jawab atau pemimpin proyek.</p>

  <p>Selamat berkontribusi!</p>
</body>
</html>
