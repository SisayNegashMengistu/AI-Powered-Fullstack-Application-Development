/* ==========================================================================
   Footer accordion — mobile only
   --------------------------------------------------------------------------
   styles.css already (via a max-width: 768px media query):
     - hides every <ul> under a footer <h3>
     - draws a "+" after each <h3> using :after / content
     - swaps that "+" for an "x" whenever the <h3> has the "expanded" class

   All this script has to do is toggle the "expanded" class and slide the
   matching <ul> open/closed when an <h3> is clicked — and only do that
   while we're actually at mobile size, since desktop/tablet already show
   everything expanded via CSS.
   ========================================================================== */

$(function () {
  // Keep this the same as the breakpoint used in styles.css.
  var MOBILE_BREAKPOINT = 768;

  function isMobileView() {
    return $(window).width() <= MOBILE_BREAKPOINT;
  }

  // Delegated handler: works for every <h3> inside the footer columns,
  // whether a column has one heading (Shop and Learn) or several
  // (Services / Account, For Business / Education / Healthcare, etc).
  $(".footer-links-wrapper").on("click", "h3", function () {
    if (!isMobileView()) {
      return; // accordion behaviour only applies on mobile size devices
    }

    var $heading = $(this);
    var $subLinks = $heading.next("ul");

    // stop() cancels any animation still running so fast repeat clicks
    // don't queue up and feel laggy.
    $subLinks.stop(true, true).slideToggle(300);
    $heading.toggleClass("expanded");
  });

  // If the viewport is resized/rotated past the breakpoint, clear out any
  // inline styles jQuery left on the <ul> (slideUp/slideDown set inline
  // display/height) and drop "expanded" so the columns fall back to the
  // CSS default — fully expanded, no leftover "x" icons — the moment
  // we're no longer on a mobile size device.
  var resizeTimer;
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
