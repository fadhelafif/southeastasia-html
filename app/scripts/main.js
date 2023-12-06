$(document).ready(function() {

  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll > 50) { // Ubah angka 100 dengan tinggi scroll ketika efek ingin dimulai
      $('.navbar').addClass('navbar-scrolled');
    } else {
      $('.navbar').removeClass('navbar-scrolled');
    }
  });

  $('.dropdown-toggle').click(function(e) {
    e.preventDefault(); // Mencegah tautan default

    $(this).toggleClass('show');
    $(this).next('.dropdown-menu').toggleClass('show'); // Menampilkan dropdown-menu yang terkait dengan dropdown-toggle yang diklik

    // Menyembunyikan dropdown-menu lain jika ada yang terbuka
    $('.dropdown-menu').not($(this).next('.dropdown-menu')).removeClass('show');
    $('.dropdown-toggle').not($(this)).removeClass('show');
  });
  
});