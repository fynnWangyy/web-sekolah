document.addEventListener('DOMContentLoaded', function() {

    // 1. Form Kontak
    const formKontak = document.querySelector('form');
    if (formKontak) {
        formKontak.addEventListener('submit', function(e) {
            e.preventDefault();
            const nama = document.getElementById('nama').value;
            alert(`Terima kasih, ${nama}! Pesan kamu berhasil terkirim.`);
            formKontak.reset();
        });
    }

    const filterButtons = document.querySelectorAll('.btn-filter');
    const ekskulCards = document.querySelectorAll('.ekskul-card');

    // 2. Filter Ekskul
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const kategori = this.getAttribute('data-kategori');

            ekskulCards.forEach(card => {
                const cardKategori = card.getAttribute('data-kategori');
                if (kategori === 'semua' || cardKategori === kategori) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // 3. Dark Mode Toggle
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');

            if (document.body.classList.contains('dark-mode')) {
                themeToggleBtn.textContent = '☀️ Mode Terang';
            } else {
                themeToggleBtn.textContent = '🌙 Mode Gelap';
            }
        });
    }

    // 4. Modal Detail Ekskul
    const modal = document.getElementById('ekskul-modal');
    const closeModal = document.querySelector('.close-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalJadwal = document.getElementById('modal-jadwal');
    const modalPembina = document.getElementById('modal-pembina');

    if (modal) {
        ekskulCards.forEach(card => {
            card.addEventListener('click', function() {
                const judul = this.getAttribute('data-judul');
                const detail = this.getAttribute('data-detail');
                const jadwal = this.getAttribute('data-jadwal');
                const pembina = this.getAttribute('data-pembina');

                modalTitle.textContent = judul || 'Detail Ekskul';
                modalDesc.textContent = detail || 'Belum ada deskripsi.';
                modalJadwal.textContent = jadwal || '-';
                modalPembina.textContent = pembina || '-';

                modal.classList.add('show');
            });
        });

        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.classList.remove('show');
            });
        }

        window.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }

    // 5. Slider Foto (Carousel)
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(index) {
        if (slides.length === 0) return;

        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startAutoSlide() {
        slideInterval = setInterval(nextSlide, 4000);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    if (slides.length > 0) {
        if (nextBtn) {
            nextBtn.addEventListener('click', function() {
                nextSlide();
                stopAutoSlide();
                startAutoSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', function() {
                prevSlide();
                stopAutoSlide();
                startAutoSlide();
            });
        }

        dots.forEach((dot, index) => {
            dot.addEventListener('click', function() {
                showSlide(index);
                stopAutoSlide();
                startAutoSlide();
            });
        });

        startAutoSlide();
    }

});