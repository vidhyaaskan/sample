jQuery(document).ready(function(){

    let winwidth =  jQuery(window).width() ;

    // sidebar closing start 
    jQuery(".cc-dashboard-header .cc-menu-icon").on("click",function(){
        jQuery(".cc-dashboard-wrapper").toggleClass("open-sidebar");

        if(winwidth >768) {
            jQuery(".cc-dashboard-wrapper.open-sidebar .cc-submenu").slideUp(350);
            jQuery(".cc-dashboard-wrapper.open-sidebar .cc-menu-title").removeClass("active");
        }
    });

    if(winwidth >768) {
        jQuery(".cc-dasbboard-sidebar").on("mouseover",function(){
            jQuery(".cc-dashboard-wrapper").removeClass("open-sidebar");
        })
    }
    // sidebar closing end

    // collapse menu section 
    jQuery(".cc-menu  .cc-menu-title.cc-has-child").on("click", function () {
        if (jQuery(this).hasClass("active")) {
            jQuery(this).removeClass("active");
            jQuery(this).siblings(".cc-submenu").slideUp(350);
        } else {
            jQuery(".cc-menu .cc-menu-title").removeClass("active");
            jQuery(".cc-submenu").slideUp(350);
            jQuery(this).siblings(".cc-submenu").slideDown(350);
            jQuery(this).addClass("active");
        }
    });
    // collapse menu section

    // header popup section 
    jQuery("body").click(function(){  jQuery(".cc-dh-right-menu .cc-popup-section-overlay").removeClass("open-popup")  })
   
    jQuery(".cc-dh-right-menu ul li").on("click",function(ev){
        ev.preventDefault();
        ev.stopPropagation();
        let ele = jQuery(this).find(".cc-popup-section-overlay") ;

        if(ele.hasClass("open-popup")) {
            ele.removeClass("open-popup") ;
        } else {
            jQuery(".cc-dh-right-menu .cc-popup-section-overlay").removeClass("open-popup") ;
            ele.addClass("open-popup") ;
        }

    });

    jQuery(".cc-mobile-rightmenu").on("click",function() { jQuery(".cc-dh-right-menu").slideToggle(180); })

    // header popup section


})