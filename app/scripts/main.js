$(document).ready(function() {

  // scroll
  $(window).scroll(function() {
    var scroll = $(window).scrollTop();

    if (scroll > 50) { // Ubah angka 100 dengan tinggi scroll ketika efek ingin dimulai
      $('.navbar').addClass('navbar-scrolled');
      $('.nav-bg-transparant').removeClass('color-white');
      $('.logo-white').addClass('d-none');
      $('.logo-black').removeClass('d-none');
    } else {
      $('.navbar').removeClass('navbar-scrolled');
      $('.nav-bg-transparant').addClass('color-white');
      $('.logo-white').removeClass('d-none');
      $('.logo-black').addClass('d-none');
    }
  });

  // dropdownmenu
  $('.dropdown-toggle').click(function(e) {
    e.preventDefault(); // Mencegah tautan default

    $(this).toggleClass('show');
    $(this).next('.dropdown-menu').toggleClass('show'); // Menampilkan dropdown-menu yang terkait dengan dropdown-toggle yang diklik

    // Menyembunyikan dropdown-menu lain jika ada yang terbuka
    $('.dropdown-menu').not($(this).next('.dropdown-menu')).removeClass('show');
    $('.dropdown-toggle').not($(this)).removeClass('show');
  });
  // Ketika terjadi klik di luar dropdown-toggle dan dropdown-menu
  $(document).on('click', function(e) {
    if (!$(e.target).closest('.dropdown-toggle').length && !$(e.target).closest('.dropdown-menu').length) {
      // Menyembunyikan semua dropdown-menu
      $('.dropdown-menu').removeClass('show');
      $('.dropdown-toggle').removeClass('show');
    }
  });

  // select2
  $('#tag-filter, #region-filter').select2({
    minimumResultsForSearch: -1,
    dropdownCssClass: 'border-bottom-only'
  });
  
  function filterItems() {
    var selectedTag = $('#tag-filter').val();
    var selectedRegion = $('#region-filter').val();
  
    $('.tagged-item').addClass('hidden');
  
    if (selectedTag === 'all' && selectedRegion === 'all') {
      $('.tagged-item').removeClass('hidden');
    } else {
      $('.tagged-item').each(function() {
        var tags = $(this).data('tag');
        var regions = $(this).data('region');
  
        if ((selectedTag === 'all' || tags === selectedTag) && (selectedRegion === 'all' || regions === selectedRegion)) {
          $(this).removeClass('hidden');
        }
      });
    }
  
    // Tampilkan tombol reset jika ada filter yang dipilih
    var anyFilterSelected = selectedTag !== 'all' || selectedRegion !== 'all';
    if (anyFilterSelected) {
      $('#reset-filter').show();
    } else {
      $('#reset-filter').hide();
    }
  }
  
  // Sembunyikan tombol reset saat halaman dimuat
  $('#reset-filter').hide();
  
  // Tampilkan semua elemen saat halaman dimuat
  filterItems();
  
  // Filter elemen saat tag dipilih berubah
  $('#tag-filter').on('change', function() {
    filterItems();
  });
  
  // Filter elemen saat region dipilih berubah
  $('#region-filter').on('change', function() {
    filterItems();
  });
  
  // Event handler untuk tombol Reset Filter
  $('#reset-filter').on('click', function() {
    $('#tag-filter, #region-filter').val('all').trigger('change');
  });
  
  // Reset filter saat halaman dimuat ulang
  $(window).on('load', function() {
    $('#tag-filter, #region-filter').val('all').trigger('change');
  });
  
  
  // button load more content
  var $taggedItems = $('.tagged-item');
  var totalItems = $taggedItems.length;
  var visibleItems = 9; // Jumlah item yang ingin ditampilkan setiap kali tombol 'View More' ditekan

  $taggedItems.slice(visibleItems).addClass('hidden');

  $('.view-more').on('click', function(e) {
    e.preventDefault();

    // Tampilkan animasi loader
    $('.loader').show();

    // Jeda singkat sebelum menampilkan item tambahan
    setTimeout(function() {
      // Tampilkan item-item tambahan saat tombol 'View More' ditekan
      $taggedItems.slice(visibleItems, visibleItems + visibleItems).removeClass('hidden');

      // Perbarui jumlah item yang sudah ditampilkan
      visibleItems += visibleItems;

      // Jika semua item sudah ditampilkan, sembunyikan tombol 'View More'
      if (visibleItems >= totalItems) {
        $('.view-more').hide();
      }

      // Sembunyikan animasi loader setelah data dimuat
      $('.loader').hide();
    }, 1000);
  });



  
});