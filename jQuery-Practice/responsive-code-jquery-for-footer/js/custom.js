// /* ==========================================================================
//    Footer accordion — mobile only
//    --------------------------------------------------------------------------
//    styles.css already (via a max-width: 768px media query):
//      - hides every <ul> under a footer <h3>
//      - draws a "+" after each <h3> using :after / content
//      - swaps that "+" for an "x" whenever the <h3> has the "expanded" class

//    All this script has to do is toggle the "expanded" class and slide the
//    matching <ul> open/closed when an <h3> is clicked — and only do that
//    while we're actually at mobile size, since desktop/tablet already show
//    everything expanded via CSS.
//    ========================================================================== */

$(function () {
  // Use a constant for the breakpoint so we can easily change it in one place
  let MOBILE_BREAKPOINT = 768;

  function isMobileView() {
    return $(window).width() <= MOBILE_BREAKPOINT;
  }

 // Use event delegation to handle clicks on <h3> elements inside the footer.
  $(".footer-links-wrapper").on("click", "h3", function () {
    if (!isMobileView()) {
      return; // Don't do anything if we're not in mobile view
    }

    let heading = $(this);//
    let subLinks = heading.next("ul");//

    // Stop any ongoing animations and toggle the sub-links with a slide effect
    subLinks.stop(true, true).slideToggle(300);
    heading.toggleClass("expanded");
  });

 // Handle window resize events to reset the footer state 
 // when switching between mobile and desktop views
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      if (!isMobileView()) {
        $(".footer-links-wrapper ul").removeAttr("style");
 $(".footer-links-wrapper h3").removeClass("expanded");

      }
    }, 150);
  });
});

// if ($(window).width() <= 768) {
//   $('.footer-links-wrapper').addClass('someClass');
// } else {
//   $('.footer-links-wrapper').removeClass('someClass');
// }
// $(window).on('resize', function () {
//   if ($(window).width() <= 768) {
//     $('.footer-links-wrapper').addClass('someClass');
//   } else {
//     $('.footer-links-wrapper').removeClass('someClass');
//     $('.footer-links-wrapper ul').show();
//   }
// });
// // Footer collapse functionality
// $(document).on('click', '.someClass h3', function () {
//   $(this).next('ul').slideToggle();
//   $(this).toggleClass('expanded');
// });