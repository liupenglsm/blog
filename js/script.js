(function($){
  // Search
  var $searchWrap = $('#search-form-wrap'),
    isSearchAnim = false,
    searchAnimDuration = 200;

  var startSearchAnim = function(){
    isSearchAnim = true;
  };

  var stopSearchAnim = function(callback){
    setTimeout(function(){
      isSearchAnim = false;
      callback && callback();
    }, searchAnimDuration);
  };

  var isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
      return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
  };

  if(isMobile.any()){
    searchFunc("/search.xml", 'm-local-search-input', 'm-local-search-result', true);
  }else{
    searchFunc("/search.xml", 'local-search-input', 'local-search-result', false);
  }
  

  $('#nav-search-btn').on('click', function(){
    if (isSearchAnim) return;

    startSearchAnim();
    $searchWrap.addClass('on');
    stopSearchAnim(function(){
      $('.search-form-input').focus();
    });
  });

  $('.search-form-input').on('blur', function(){
    if($('.search-result-list').length <= 0){
      startSearchAnim();
      $searchWrap.removeClass('on');
      stopSearchAnim();
    }
  });

  $('.local-search-result-cls').on('click', function(){
      $('#local-search-input').val('');
      $('#local-search-result').html('');
      startSearchAnim();
      $searchWrap.removeClass('on');
      stopSearchAnim();
  });

  $('.m-search-form-input').on('blur', function(){
    if($('.search-result-list').length <= 0){
      $('#m-local-search-input').val('');
      $('#m-local-search-result').html('');
    }
  });

 $('.m-local-search-result-cls').on('click', function(){
      $('#m-local-search-input').val('');
      $('#m-local-search-result').html('');
  });
  // Share
  // $('body').on('click', function(){
  //   $('.article-share-box.on').removeClass('on');
  // }).on('click', '.article-share-link', function(e){
  //   e.stopPropagation();

  //   var $this = $(this),
  //     url = $this.attr('data-url'),
  //     encodedUrl = encodeURIComponent(url),
  //     id = 'article-share-box-' + $this.attr('data-id'),
  //     offset = $this.offset();

  //   if ($('#' + id).length){
  //     var box = $('#' + id);

  //     if (box.hasClass('on')){
  //       box.removeClass('on');
  //       return;
  //     }
  //   } else {
  //     var html = [
  //       '<div id="' + id + '" class="article-share-box">',
  //         '<input class="article-share-input" value="' + url + '">',
  //         '<div class="article-share-links">',
  //           '<a href="https://twitter.com/intent/tweet?url=' + encodedUrl + '" class="article-share-twitter" target="_blank" title="Twitter"></a>',
  //           '<a href="https://www.facebook.com/sharer.php?u=' + encodedUrl + '" class="article-share-facebook" target="_blank" title="Facebook"></a>',
  //           '<a href="http://pinterest.com/pin/create/button/?url=' + encodedUrl + '" class="article-share-pinterest" target="_blank" title="Pinterest"></a>',
  //           '<a href="https://plus.google.com/share?url=' + encodedUrl + '" class="article-share-google" target="_blank" title="Google+"></a>',
  //         '</div>',
  //       '</div>'
  //     ].join('');

  //     var box = $(html);

  //     $('body').append(box);
  //   }

  //   $('.article-share-box.on').hide();

  //   box.css({
  //     top: offset.top + 25,
  //     left: offset.left
  //   }).addClass('on');
  // }).on('click', '.article-share-box', function(e){
  //   e.stopPropagation();
  // }).on('click', '.article-share-box-input', function(){
  //   $(this).select();
  // }).on('click', '.article-share-box-link', function(e){
  //   e.preventDefault();
  //   e.stopPropagation();

  //   window.open(this.href, 'article-share-box-window-' + Date.now(), 'width=500,height=450');
  // });

  // Caption
  $('.entry-content').each(function(i){
    $(this).find('img').each(function(){
      if ($(this).parent().hasClass('fancybox')) return;

      var alt = this.alt;

      $(this).wrap('<a href="' + this.src + '" title="' + alt + '" class="fancybox"></a>');
    });

    $(this).find('.fancybox').each(function(){
      $(this).attr('rel', 'article' + i);
    });
  });

  if ($.fancybox){
    $('.fancybox').fancybox();
  }

  // Mobile nav

  $(".mobile-nav-panel").click(function() {
    $(".nav").toggleClass("active")
  });

})(jQuery);