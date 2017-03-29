$(window).load(function () {
    var redirectURL = 'http://localhost/Project%20BizApp/bizapp/index.html?page=home';
    var currentURL = 'http://localhost/Project%20BizApp/bizapp/index.html';
    var landingURL = window.location.href;
    if (landingURL == currentURL) {
        window.location = redirectURL;
    }
});
$(window).ready(function () {
    //breadcrumb cart
    $('#cart_items .breadcrumb li:first-child a').html('&nbsp;Summary&nbsp;&nbsp;').attr('href', 'cart.html?page=cart');

    $('.table').css('margin-bottom', '0');
    //category tab
    $('.category-tab .tab-content div').remove();
    $('.category-tab .nav li').remove(); //<li class=""><a href="#tshirt" data-toggle="tab">T-Shirt</a></li>
    var navTab_arr = ['Top Items', 'Top Shops'];
    for (i = 0; i < navTab_arr.length; i++) {
        var navTab = '<li class=""><a href="#tab' + i + '" data-toggle="tab">' + navTab_arr[i] + '</a></li>';
        $('.category-tab .nav').append(navTab);

        var dom_tab = '<div class="tab-pane fade" id="tab' + i + '"> </div>';
        $('.category-tab .tab-content').append(dom_tab);

        if (i == 0) {
            $.getJSON("get_top_products.php", function (dataTopProducts) {
                //    console.log(dataCategory);
                $.each(dataTopProducts, function (f, dataTopProducts) {
                    var link = "http://corrad.visionice.net/bizapp/upload/product/";
                    var image = link + dataTopProducts.attachment;
                    var img_filler = "images/myimages/not_available.gif";
                    if (image == link) {
                        image = img_filler;
                    } else {
                        image = image;
                    }
                    var dom_product_top = ('<div class="col-sm-3"> <div class="product-image-wrapper"> <div class="single-products"> <div class="productinfo text-center"> <img src="' + image + '" alt="" style="height: 150px !important;width: 150px !important;" onError="this.onerror=null;this.src=\'' + img_filler + '\';"> <h2>RM' + dataTopProducts.price + '</h2> <p class="truncate" title="' + dataTopProducts.productname + '">' + dataTopProducts.productname + '</p> <a href="#" class="btn btn-default add-to-cart" data-id="' + dataTopProducts.id + '"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> </div> </div> </div>');

                    $('.category-tab #tab0').append(dom_product_top);
                });
            });
        } else if (i == 1) {
            $.getJSON("get_top_seller.php", function (dataTopSeller) {
                //    console.log(dataCategory);
                $.each(dataTopSeller, function (f, dataTopSeller) {
                    var link = "http://corrad.visionice.net/bizapp/upload/profile/";
                    var image = link + dataTopSeller.attachmentphoto;
                    var img_filler = "images/myimages/not_available.gif";
                    if (image == link) {
                        image = img_filler;
                    } else {
                        image = image;
                    }
                    var dom_seller_top = ('<div class="col-sm-3"> <div class="product-image-wrapper"> <div class="single-products"> <div class="productinfo text-center" style=" padding-top: 15px; "> <img src="' + image + '" alt="" style="border-radius: 50% !important;border: 1px solid #fe980f !important;height: 150px !important;width: 150px !important;" onError="this.onerror=null;this.src=\'' + img_filler + '\';"> <h2 class="truncate" title="' + dataTopSeller.nama + '" style="font-size:14px">' + dataTopSeller.nama + '</h2> <a href="#" class="btn btn-default view-shop"><i class="fa fa-picture-o"></i> View Shop</a> </div> </div> </div> </div>');

                    //                    console.log(dom_seller_top);
                    $('.category-tab #tab1').append(dom_seller_top);
                });
            });
        }
    }
    $('.category-tab .nav li:first-child').addClass('active');
    $('.category-tab .tab-content .tab-pane:first-child').addClass('active').addClass('in');

    //add modal
    var modal_str = '<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> <div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> <h4 class="modal-title" id="myModalLabel" style="color:#2bc44c"><i class="fa fa-check"></i> Item successfully added to cart</h4> </div> <div class="modal-body"><div class="row"> <div class="col-sm-12"> <div class="col-sm-3 cart-img-modal" style="border: 1px solid #d6d4d4;height:250px;background:url()no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;"></div> <div class="col-sm-4 current-item-cart" style="border-right:1px solid black;min-height: 250px;padding-top:25px"> <div class="row"> <div class="col-sm-12"><b></b></div> <div class="col-sm-12"><b>Product ID</b></div> <div class="col-sm-12"><b>Price </b> RM</div> </div> </div> <div class="col-sm-5 cart-info-modal" style="background-color:#FAFAFA;min-height: 250px;padding-top:25px"> <div class="col-sm-12"><b>You have 1 item in your cart</b></div> <div class="col-sm-12"><b>Total price</b> RM</div> </div> </div> </div></div> <div class="modal-footer"> <button type="button" class="btn btn-primary" data-dismiss="modal">Continue Shopping</button> <button type="button" class="btn btn-primary open-cart">Proceed to Cart</button> </div> </div> </div> </div>';
    $('body').append(modal_str);
    $('.open-cart').on('click', function () {
        window.open('cart.html?page=cart', '_self');
    });
    //end modal
    $('.price-range').css('display', 'none');
    $('.features_items').attr('id', 'focus-here');
    $('.features_items div').remove(); //remove feature items
    $('.category-products div').remove(); //remove category
    $('.cart_info table tbody tr').remove();
    $('div .padding-right').removeClass('padding-right');
    $.getScript("js/dynamic.js", function () {});
    //    header start
    $('link[rel="shortcut icon"]').attr('href', 'images/ico/favicon.png');
    $('#header .logo a img').attr('height', '60px').attr('src', 'images/myimages/logo.svg');
    $('#header .logo').next().css('display', 'none');
    $('#header .nav-pills li:first-child a').html('<i class="fa fa-phone"></i> +603 90593800');
    $('#header .nav-pills li:nth-child(2) a').html('<i class="fa fa-envelope"></i> admin@bizapp.com.my');
    $('#header .header-bottom .mainmenu').css('display', 'none');
    $('#header .navbar-toggle').attr('style', 'display:none');
    $('#header .shop-menu ul li:nth-child(2)').css('display', 'none');
    $('#header .shop-menu ul li:nth-child(3)').css('display', 'none');
    $('#header .shop-menu ul li:last-child').html('<a href="login.html"><i class="fa fa-lock"></i> Login/Signup</a>');
    //    header end

    //    @media function
    $(window).resize(function () {
        if ($(window).width() <= 480) {
            $('#header .shop-menu ul').attr('style', 'text-align:center;margin-right:25px;');
        }

    });
    //});@media end
    //  slider
    $('#slider .carousel-inner .item h1').html('<span>BIZ</span>APP');
    $('#slider .carousel-inner .item:first-child h2').html('Latest Marketplace For You');
    $('#slider .carousel-inner .item:nth-child(2) h2').html('Get Your Favourite Product Here');
    $('#slider .carousel-inner .item:nth-child(3) h2').html('More Than 15,000 Products To Be Browsed');
    $('#slider .carousel-inner .item:first-child div:nth-child(2) img:first-child').attr('src', 'images/myimages/slider/slide1.png');
    $('#slider .carousel-inner .item:nth-child(2) div:nth-child(2) img:first-child').attr('src', 'images/myimages/slider/slide2.png');
    $('#slider .carousel-inner .item:nth-child(3) div:nth-child(2) img:first-child').attr('src', 'images/myimages/slider/slide3.png');
    //  slider end


    //footer
    $('.companyinfo h2').html('<span>Biz</span>-App');
    $('.address p').text('9-2, Jalan Tasik Selatan 3, Bandar Tasik Selatan');
    $('#footer .footer-bottom .container .pull-right').html('');
});