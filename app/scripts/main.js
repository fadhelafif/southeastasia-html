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
  // $('#tag-filter').select2({
  //   minimumResultsForSearch: -1,
  //   dropdownCssClass: 'border-bottom-only',
  //   placeholder: 'SELECT TOPICS OR REGION',
  //   multiple: true,
  //   selectOnClose: true
  // });

  $('#tag-filter').select2({
    minimumResultsForSearch: -1,
    dropdownCssClass: 'border-bottom-only',
    placeholder: 'SELECT TOPICS OR REGION',
    multiple: true,
    templateResult: function (data) {
        if (!data.element) {
            return data.text;
        }
        var $element = $(data.element);
        var $wrapper = $('<span></span>');
        $wrapper.addClass('select2-option');

        var $checkbox = $('<input type="checkbox" class="select2-checkbox" />');
        $checkbox.prop('checked', $element.prop('selected'));
        $wrapper.append($checkbox);

        var $text = $('<span></span>');
        $text.text(data.text);
        $wrapper.append($text);

        return $wrapper;
    },
    templateSelection: function (data) {
        if (!data.element) {
            return data.text;
        } else {
            return $('<span>' + data.text + '</span>');
        }
    }
  }).on('select2:select', function (e) {
    $(this).select2('open'); // Buka kembali dropdown setelah opsi dipilih
});


  function showAllItems() {
      $('.tagged-item').removeClass('hidden');
      $('#reset-filter').hide();
  }

  function filterItems() {
      var selectedTags = $('#tag-filter').val();

      if (!selectedTags || selectedTags.length === 0) {
          showAllItems();
          return;
      }

      $('.tagged-item').addClass('hidden');

      selectedTags.forEach(function(selectedTag) {
          $('.tagged-item[data-tag="' + selectedTag + '"]').removeClass('hidden');
      });

      $('#reset-filter').show();
  }

  // Sembunyikan tombol reset saat halaman dimuat
  $('#reset-filter').hide();

  // Tampilkan semua elemen saat halaman dimuat
  showAllItems();

  // Filter elemen saat tag dipilih berubah
  $('#tag-filter').on('change', function() {
      filterItems();
  });

  // Event handler untuk tombol Reset Filter
  $('#reset-filter').on('click', function() {
      $('#tag-filter').val(null).trigger('change');
      showAllItems();
  });

  // Reset filter saat halaman dimuat ulang
  $(window).on('load', function() {
      $('#tag-filter').val(null).trigger('change');
      showAllItems();
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