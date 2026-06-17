/* 
* Scroll to the top
*/

$(window).bind("scroll",display);
function display () {
    if($(document).scrollTop()>300) {
        //$("#scrolltop").show();
		$("#scrolltop").fadeIn(300);
    }else {
        //$("#scrolltop").hide();
		$("#scrolltop").fadeOut(300);
    }
}

/* 
* Tab of posts
*/
/*$(document).ready(function () {
	var tabContainer = $(".posts-tabs");
	if (tabContainer.length) {
		$(".tab-two").bind("click", showTabTwo);
		$(".tab-one").bind("click", showTabOne);
	}
	function showTabOne () {
		$(".tab-one").addClass("active");
		$(".tab-two").removeClass("active");
		$(".tab-two-list").addClass("tab-hidden");
		$(".tab-one-list").removeClass("tab-hidden");
		$(".page-holder-two").addClass("tab-hidden");
		$(".page-holder-one").removeClass("tab-hidden");
	}
	function showTabTwo () {
		$(".tab-two").addClass("active");
		$(".tab-one").removeClass("active");
		$(".tab-one-list").addClass("tab-hidden");
		$(".tab-two-list").removeClass("tab-hidden");
		$(".page-holder-one").addClass("tab-hidden");
		$(".page-holder-two").removeClass("tab-hidden");
	}
})*/

/*
 * Pagination
 */
$(function(){
  /* initiate the plugin */
  /*$("div.page-holder-one").jPages({
      containerID  : "pag-itemContainer-one",
      previous: "«",
      next: "»",
      perPage      : 5,
      startPage    : 1,
      startRange   : 1,
      midRange     : 4,
      endRange     : 1,
      direction    : "auto"
  }).on("click", function () {
	$('html,body').animate({
	  scrollTop: 0
	}, 400);
});*/
  /*$("div.page-holder-two").jPages({
      containerID  : "pag-itemContainer-two",
      previous: "«",
      next: "»",
      perPage      : 5,
      startPage    : 1,
      startRange   : 1,
      midRange     : 4,
      endRange     : 1,
      direction    : "auto"
  }); */
});

jQuery(document).ready(function ($) {
    if ($("#portfolio-list .list-group-item").length > 0) {
        $("#portfolio-list").paginathing({ perPage: 4, containerClass: "panel-footer" });
    }
    if ($("#life-list .list-group-item").length > 0) {
        $("#life-list").paginathing({ perPage: 4, containerClass: "panel-footer" });
    }

    function activateTab(target) {
        var $tabButton = $(".folder-tab[data-tab='" + target + "']");
        if ($tabButton.length === 0) { return; }
        $(".folder-tab").removeClass("active");
        $tabButton.addClass("active");
        $(".tab-pane").addClass("tab-hidden");
        $("#" + target).removeClass("tab-hidden");
    }

    $(".folder-tab").on("click", function () {
        activateTab($(this).data("tab"));
    });

    // Allow direct linking to a tab, e.g. /#life-pane
    if (window.location.hash) {
        activateTab(window.location.hash.substring(1));
    }
});

