$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}
var page = $.urlParam('page');

$.getJSON("get_category.php", function (dataCategory) {
    //    console.log(dataCategory);
    $.each(dataCategory, function (i, dataCategory) {
        var dom_category = ('<div class="panel panel-default"> <div class="panel-heading"> <h4 class="panel-title"><a href="index.html?page=category&code=' + dataCategory.code + '#focus-here" title="' + dataCategory.description_en + '">' + dataCategory.description_en + '</a></h4> </div> </div>');

        $('.category-products').append(dom_category);
    });
});

if (page == "home") {
    $.getJSON("get_products.php", function (dataProduct) {
        //    console.log(data);
        $.each(dataProduct, function (i, dataProduct) {
            var link = "http://corrad.visionice.net/bizapp/upload/product/";
            var image = link + dataProduct.attachment;
            var img_filler = "images/myimages/not_available.gif";
            if (image == link) {
                image = img_filler;
            } else {
                image = image;
            }
            var dom_product = ('<div class="col-xs-6 col-sm-4"> <div class="product-image-wrapper"> <div class="single-products"> <div class="productinfo text-center"> <img src="' + image + '" alt="" style="height:190px" title="' + dataProduct.attachment + '" onError="this.onerror=null;this.src=\'' + img_filler + '\';"> <h2>RM' + dataProduct.price + '</h2> <p class="truncate">' + dataProduct.productname + '</p> <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> <div class="product-overlay"> <div class="overlay-content"> <a href="javascript:void(0)"><i class="views-icon fa fa-eye"></i></a><h2>RM' + dataProduct.price + '</h2> <p class="truncate" title="' + dataProduct.productname + '">' + dataProduct.productname + '</p> <a href="#" class="btn btn-default add-to-cart" data-id="' + dataProduct.id + '" data-pid="' + dataProduct.pid + '"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> </div> </div> <div class="choose"> <ul class="nav nav-pills nav-justified"> <li><a href="#"><i class="fa fa-picture-o"></i> View Item</a></li> <li><a href="#"><i class="fa fa-plus-square"></i> Wishlist</a></li> </ul> </div> </div> </div>');

            $('.features_items').append(dom_product);
            //product container
            $('.product-overlay').css('background', 'transparent');
            $('.product-overlay').css('transition', 'none');
            $('.product-overlay .overlay-content h2').css('color', '#FE980F');
            $('.product-overlay .overlay-content p').css('color', '#6A6864');
            $('.product-overlay .overlay-content .views-icon').attr('style', 'background: rgba(254, 152, 15, 0.75); color:#fff;padding: 10px; border-radius: 50%; top: -110px; font-size: 20px; left: calc(50% - 20px); position: absolute;opacity: 0; transition: opacity .25s ease-in-out; -moz-transition: opacity .25s ease-in-out; -webkit-transition: opacity .25s ease-in-out;');
            $('.single-products').mouseover(function () {
                $('.product-overlay .overlay-content .views-icon').css('opacity', '1');
            });
            $('.single-products').mouseout(function () {
                $('.product-overlay .overlay-content .views-icon').css('opacity', '0');
            });
            $('.product-overlay .overlay-content .add-to-cart').hover(function () {
                $(this).css('background', 'rgb(254, 152, 15').css('color', '#FFF');
            });
            $(window).ready(function () {
                if ($(window).width() <= 480) {
                    $('.productinfo img').attr('style', 'height:150px');
                }
                $(window).resize(function () {
                    if ($(window).width() <= 480) {
                        $('.features_items .productinfo img').attr('style', 'height:150px');
                    } else {
                        $('features_items .productinfo img').attr('style', 'height:190px');
                    }

                });
            });

            //product end
        });
    });
    recommendedItems();
} else if (page == "category") {
    var code = $.urlParam('code');
    $.getJSON("get_category.php", function (dataCategoryDesc) {
        //    console.log(dataCategory);
        $.each(dataCategoryDesc, function (i, dataCategoryDesc) {
            if (dataCategoryDesc.code == code) {
                $('.features_items h2').text(dataCategoryDesc.description_en);
            }
        });
    });

    $.getJSON("get_category_item.php", {
        code: code
    }, function (dataCategoryItems) {
        //        console.log(dataCategoryItems);
        if (dataCategoryItems.length == 0) {
            $('.features_items').append('<div class="col-sm-12 not-found"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Sorry, no products found...</div>');
        } else {
            $.each(dataCategoryItems, function (i, dataCategoryItems) {
                var link = "http://corrad.visionice.net/bizapp/upload/product/";
                var image = link + dataCategoryItems.attachment;
                var img_filler = "images/myimages/not_available.gif";
                if (image == link) {
                    image = img_filler;
                } else {
                    image = image;
                }
                var dom_cat_item = ('<div class="col-xs-6 col-sm-4"> <div class="product-image-wrapper"> <div class="single-products"> <div class="productinfo text-center"> <img src="' + image + '" alt="" style="height:190px" onError="this.onerror=null;this.src=\'' + img_filler + '\';"> <h2>RM' + dataCategoryItems.price + '</h2> <p class="truncate">' + dataCategoryItems.productname + '</p> <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> <div class="product-overlay"> <div class="overlay-content"> <a href="javascript:void(0)"><i class="views-icon fa fa-eye"></i></a><h2>RM' + dataCategoryItems.price + '</h2> <p class="truncate" title="' + dataCategoryItems.productname + '">' + dataCategoryItems.productname + '</p> <a href="#" class="btn btn-default add-to-cart" data-id="' + dataCategoryItems.id + '"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> </div> </div> <div class="choose"> <ul class="nav nav-pills nav-justified"> <li><a href="javascript:void(0)" data-id="' + dataCategoryItems.id + '"><i class="fa fa-picture-o"></i> View Item</a></li> <li><a href="#"><i class="fa fa-plus-square"></i> Wishlist</a></li> </ul> </div> </div> </div>');

                //            console.log(dom_cat_item);

                $('.features_items').append(dom_cat_item);
                //product container
                $('.product-overlay').css('background', 'transparent');
                $('.product-overlay').css('transition', 'none');
                $('.product-overlay .overlay-content h2').css('color', '#FE980F');
                $('.product-overlay .overlay-content p').css('color', '#6A6864');
                $('.product-overlay .overlay-content .views-icon').attr('style', 'background: rgba(254, 152, 15, 0.75); color:#fff;padding: 10px; border-radius: 50%; top: -110px; font-size: 20px; left: calc(50% - 20px); position: absolute;opacity: 0; transition: opacity .25s ease-in-out; -moz-transition: opacity .25s ease-in-out; -webkit-transition: opacity .25s ease-in-out;');
                $('.single-products').mouseover(function () {
                    $('.product-overlay .overlay-content .views-icon').css('opacity', '1');
                });
                $('.single-products').mouseout(function () {
                    $('.product-overlay .overlay-content .views-icon').css('opacity', '0');
                });
                $('.product-overlay .overlay-content .add-to-cart').hover(function () {
                    $(this).css('background', 'rgb(254, 152, 15').css('color', '#FFF');
                });
                $(window).ready(function () {
                    if ($(window).width() <= 480) {
                        $('.features_items .productinfo img').attr('style', 'height:150px');
                    }
                    $(window).resize(function () {
                        if ($(window).width() <= 480) {
                            $('.features_items .productinfo img').attr('style', 'height:150px');
                        } else {
                            $('.features_items .productinfo img').attr('style', 'height:190px');
                        }

                    });
                });

                //product end
            });
            addToCart();
        }

    });
    recommendedItems();
} else if (page == "cart") {
    var section = $.urlParam('section');
    if (section == "summary") {
        $('.breadcrumbs li:nth-child(1)').addClass('current');
    } else if (section == "signin") {
        $('.breadcrumbs li:nth-child(1)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(1) em').replaceWith('<a href="cart.html?page=cart&section=summary">Summary</a>');
        $('.breadcrumbs li:nth-child(2)').addClass('current');
    } else if (section == "address") {
        $('.breadcrumbs li:nth-child(1)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(1) em').replaceWith('<a href="cart.html?page=cart&section=summary">Summary</a>');
        $('.breadcrumbs li:nth-child(2)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(2) em').replaceWith('<a href="cart.html?page=cart&section=signin">Sign In</a>');
        $('.breadcrumbs li:nth-child(3)').addClass('current');
    } else if (section == "shipping") {
        $('.breadcrumbs li:nth-child(1)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(1) em').replaceWith('<a href="cart.html?page=cart&section=summary">Summary</a>');
        $('.breadcrumbs li:nth-child(2)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(2) em').replaceWith('<a href="cart.html?page=cart&section=signin">Sign In</a>');
        $('.breadcrumbs li:nth-child(3)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(3) em').replaceWith('<a href="cart.html?page=cart&section=address">Address</a>');
        $('.breadcrumbs li:nth-child(4)').addClass('current');
    } else if (section == "payment") {
        $('.breadcrumbs li:nth-child(1)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(1) em').replaceWith('<a href="cart.html?page=cart&section=summary">Summary</a>');
        $('.breadcrumbs li:nth-child(2)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(2) em').replaceWith('<a href="cart.html?page=cart&section=signin">Sign In</a>');
        $('.breadcrumbs li:nth-child(3)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(3) em').replaceWith('<a href="cart.html?page=cart&section=address">Address</a>');
        $('.breadcrumbs li:nth-child(4)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(4) em').replaceWith('<a href="cart.html?page=cart&section=shipping">Shipping</a>');
        $('.breadcrumbs li:nth-child(5)').addClass('current');
    }

    //    $('head').append('<link href="css/bcstyle.css" rel="stylesheet">')
    //breadcrumb cart
    //    $('#cart_items .breadcrumb li:nth-child(2)').html('');
    //checkout button
    $('.update').css('display', 'none');
    $('.check_out').css('margin-left', '40px');
    $('.total_area .check_out').on('click', function () {
        //        if not signin
        window.open('cart.html?page=cart&section=signin', '_self');
        //        else proceed to adress selection
    });
    $.getJSON("insert_cart.php", {
        id: "abc",
        userid: 14
    }, function (dataCartTable) {
        //        console.log(dataCartTable);
        var price_sum = 0;
        $.each(dataCartTable, function (i, dataCartTable) {
            var item_price = dataCartTable.price_sum;

            price_sum = (parseFloat(item_price) + price_sum);
            $.getJSON("get_single_product.php", {
                id: dataCartTable.prod_id
            }, function (dataCartInfoSingle) {
                //                console.log(dataCartInfoSingle);
                $.each(dataCartInfoSingle, function (i, dataCartInfoSingle) {
                    var link = "http://corrad.visionice.net/bizapp/upload/product/";
                    var image = link + dataCartInfoSingle.attachment;
                    var img_filler = "images/myimages/not_available.gif";
                    if (image == link) {
                        image = img_filler;
                    } else {
                        image = image;
                    }

                    var totalprice_item = 0;
                    totalprice_item = dataCartTable.quantity * dataCartInfoSingle.price;

                    var dom_cart_single = ('<tr> <td class="" style="width:10%"> <a href="javascript:void(0)"><img src="' + image + '" alt="" style="height:130px;width:120px" onError="this.onerror=null;this.src=\'' + img_filler + '\';"></a> </td> <td class="cart_description" style="width:30%"> <h4><a href="javascript:void(0)">' + dataCartInfoSingle.productname + '</a></h4> <p>Product ID: ' + dataCartInfoSingle.id + '</p> </td> <td class="cart_price" style="width:15%"> <p>RM' + dataCartInfoSingle.price + '</p> </td> <td class="cart_quantity" style="width:15%;padding-left: 4%;"> <div class="cart_quantity_button"> <a class="cart_quantity_up" href=""> + </a> <input class="cart_quantity_input" type="text" name="quantity" value="' + dataCartTable.quantity + '" autocomplete="off" size="2"> <a class="cart_quantity_down" href=""> - </a> </div> </td> <td class="cart_total" style="width:15%;text-align:right"> <p class="cart_total_price">RM' + parseFloat(totalprice_item).toFixed(2) + '</p> </td> <td class="" style="width:10%;text-align:center"> <a class="cart_quantity_delete" href=""><i class="fa fa-times"></i></a> </td> </tr>');

                    //                    console.log(dom_cart_single);
                    $('.cart_info table tbody').append(dom_cart_single);
                });
            });
            var dom_cart_table = ('');

            //        $('#myModal .modal-body .cart-info-modal').html(dom_cart);
        });
        $('.total_area ul li:first-child span').text('RM' + parseFloat(price_sum).toFixed(2));
        $('.total_area ul li:last-child span').text('RM' + parseFloat(price_sum).toFixed(2));
    });
} else if (page == "item") {
    var uid = $(this).data('id');

    $.getJSON("get_single_product.php", {
        id: 37817
    }, function (dataSingleProductPage) {
        $.each(dataSingleProductPage, function (i, dataSingleProductPage) {
            console.log(dataSingleProductPage);
            //            var dom_single_content = ('');

            //            $('.cart_info table tbody').append(dom_single_content);

        });
    });
    recommendedItems();
} else if (page == "checkout") {
    $('table thead .cart_menu td:last-child').remove();
    $('.checkout-options .nav li:nth-child(3) a').attr('href', 'cart.html?page=cart&section=summary')
    $.getJSON("insert_cart.php", {
        id: "abc",
        userid: 14
    }, function (dataCartTable) {
        var dataNum = dataCartTable.length;
        var counter = 1;
        //        console.log(dataCartTable);
        var price_sum = 0;
        $.each(dataCartTable, function (i, dataCartTable) {
            var item_price = dataCartTable.price_sum;

            price_sum = (parseFloat(item_price) + price_sum);
            $.getJSON("get_single_product.php", {
                id: dataCartTable.prod_id
            }, function (dataCartInfoSingle) {

                //                $('.total').attr('colspan', '2');
                //                console.log(dataCartInfoSingle);
                $.each(dataCartInfoSingle, function (i, dataCartInfoSingle) {
                    var link = "http://corrad.visionice.net/bizapp/upload/product/";
                    var image = link + dataCartInfoSingle.attachment;
                    var img_filler = "images/myimages/not_available.gif";
                    if (image == link) {
                        image = img_filler;
                    } else {
                        image = image;
                    }

                    var totalprice_item = 0;
                    totalprice_item = dataCartTable.quantity * dataCartInfoSingle.price;

                    var dom_cart_single = ('<tr> <td class="" style="width:10%"> <a href="javascript:void(0)"><img src="' + image + '" alt="" style="height:130px;width:120px" onError="this.onerror=null;this.src=\'' + img_filler + '\';"></a> </td> <td class="cart_description" style="width:30%"> <h4><a href="javascript:void(0)">' + dataCartInfoSingle.productname + '</a></h4> <p>Product ID: ' + dataCartInfoSingle.id + '</p> </td> <td class="cart_price" style="width:15%"> <p>RM' + dataCartInfoSingle.price + '</p> </td> <td class="cart_quantity" style="width:15%;padding-left: 7%;"> <input class="cart_quantity_input" type="text" readonly="readonly" name="quantity" value="' + dataCartTable.quantity + '" autocomplete="off" size="2">  </td> <td class="cart_total" style="width:15%;text-align:right;padding-right:2em"> <p class="cart_total_price">RM' + parseFloat(totalprice_item).toFixed(2) + '</p></tr>');

                    //                    console.log(dom_cart_single);
                    $('.cart_info table tbody').append(dom_cart_single);

                    if (dataNum == counter) {
                        var dom_cart_table_pricing = ('<tr style="background-color:#F0F0E9"> <td colspan="3">&nbsp;</td><td style="padding-top:1em"><p class="cart_total_price">Total</p></td> <td colspan="2" style="text-align:right;padding-top:1em;padding-right:2em"> <p class="cart_total_price">RM' + parseFloat(price_sum).toFixed(2) + '</p> </td></tr>');

                        $('.cart_info table tbody').append(dom_cart_table_pricing);
                    }
                    counter++;
                });

            });


            //        $('#myModal .modal-body .cart-info-modal').html(dom_cart);
        });
        //        $('.total_area ul li:first-child span').text('RM' + parseFloat(price_sum).toFixed(2));
        //        $('.total_area ul li:last-child span').text('RM' + parseFloat(price_sum).toFixed(2));


    });
}

function recommendedItems() {
    $.getJSON("get_products.php", function (dataProductCarousel) {
        //        console.log(dataProductCarousel);
        $.each(dataProductCarousel, function (i, dataProductCarousel) {
            var link = "http://corrad.visionice.net/bizapp/upload/product/";
            var image = link + dataProductCarousel.attachment;
            var img_filler = "images/myimages/not_available.gif";
            if (image == link) {
                image = img_filler;
            } else {
                image = image;
            }
            var dom_product_carousel = ('<div class="col-xs-6 col-sm-4"> <div class="product-image-wrapper"> <div class="single-products"> <div class="productinfo text-center"> <img src="' + image + '" alt="" style="height:190px" onError="this.onerror=null;this.src=\'' + img_filler + '\';"> <h2>RM' + dataProductCarousel.price + '</h2> <p class="truncate">' + dataProductCarousel.productname + '</p> <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> <div class="product-overlay"> <div class="overlay-content"> <a href="javascript:void(0)"><i class="views-icon fa fa-eye"></i></a><h2>RM' + dataProductCarousel.price + '</h2> <p class="truncate" title="' + dataProductCarousel.productname + '">' + dataProductCarousel.productname + '</p> <a href="#" class="btn btn-default add-to-cart" data-id="' + dataProductCarousel.id + '" data-pid="' + dataProductCarousel.pid + '"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> </div> </div> <div class="choose"> <ul class="nav nav-pills nav-justified"> <li><a href="#"><i class="fa fa-picture-o"></i> View Item</a></li> <li><a href="#"><i class="fa fa-plus-square"></i> Wishlist</a></li> </ul> </div> </div> </div>');

            //            console.log(i);
            //            for (x = 1; x <= 3; x++) {
            $('#recommended-item-carousel .car' + i + ' img').attr('src', image).attr('onError', 'this.onerror=null;this.src=\'' + img_filler + '\';').attr('style', 'height:190px');
            $('#recommended-item-carousel .car' + i + ' h2').text('RM' + dataProductCarousel.price);
            $('#recommended-item-carousel .car' + i + ' p').text(dataProductCarousel.productname).addClass('truncate');
            $('#recommended-item-carousel .car' + i + ' a').attr('data-id', dataProductCarousel.id).attr('data-pid', dataProductCarousel.pid);
            //            }

            //product container
            $('.product-overlay').css('background', 'transparent');
            $('.product-overlay').css('transition', 'none');
            $('.product-overlay .overlay-content h2').css('color', '#FE980F');
            $('.product-overlay .overlay-content p').css('color', '#6A6864');
            $('.product-overlay .overlay-content .views-icon').attr('style', 'background: rgba(254, 152, 15, 0.75); color:#fff;padding: 10px; border-radius: 50%; top: -110px; font-size: 20px; left: calc(50% - 20px); position: absolute;opacity: 0; transition: opacity .25s ease-in-out; -moz-transition: opacity .25s ease-in-out; -webkit-transition: opacity .25s ease-in-out;');
            $('.single-products').mouseover(function () {
                $('.product-overlay .overlay-content .views-icon').css('opacity', '1');
            });
            $('.single-products').mouseout(function () {
                $('.product-overlay .overlay-content .views-icon').css('opacity', '0');
            });
            $('.product-overlay .overlay-content .add-to-cart').hover(function () {
                $(this).css('background', 'rgb(254, 152, 15').css('color', '#FFF');
            });
            $(window).ready(function () {
                if ($(window).width() <= 480) {
                    $('.recommended_items .productinfo img').attr('style', 'height:150px');
                }
                $(window).resize(function () {
                    if ($(window).width() <= 480) {
                        $('.recommended_items .productinfo img').attr('style', 'height:150px');
                    } else {
                        $('.recommended_items .productinfo img').attr('style', 'height:190px');
                    }

                });
            });

            //product end
        });

        addToCart();
    });
}

function addToCart() {
    $('a.add-to-cart').click(function (ev) {
        ev.preventDefault();
        var uid = $(this).data('id');
        var sellerid = $(this).data('pid');
        //        console.log(uid);

        $.getJSON("insert_cart.php", {
            id: uid,
            userid: 14,
            quantity: 1,
            sellerid: sellerid
        }, function (dataCartInfo) {
            var cart_quantity = dataCartInfo.length;
            //            console.log(dataCartInfo);
            var price_sum = 0;
            $.each(dataCartInfo, function (i, dataCartInfo) {
                var item_price = dataCartInfo.price_sum;

                price_sum = (parseFloat(item_price) + price_sum);
                var dom_cart = ('<div class="col-sm-12"><b>You have ' + cart_quantity + ' item in your cart</b></div> <div class="col-sm-12"><b>Total price</b> RM' + parseFloat(price_sum).toFixed(2) + '</div>');

                $('#myModal .modal-body .cart-info-modal').html(dom_cart);
            });
        });

        $.getJSON("get_single_product.php", {
            id: uid,
        }, function (dataSingleProduct) {
            //            console.log(dataSingleProduct);
            $.each(dataSingleProduct, function (i, dataSingleProduct) {
                var link = "http://corrad.visionice.net/bizapp/upload/product/";
                var image = link + dataSingleProduct.attachment;
                var img_filler = "images/myimages/not_available.gif";
                if (image == link) {
                    image = img_filler;
                } else {
                    image = image;
                }
                var dom_img_cart = ('border: 1px solid #d6d4d4;height:250px;background:url(' + image + ')no-repeat center center; -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover;');

                var dom_single_product = ('<div class="row"> <div class="col-sm-12"><b>' + dataSingleProduct.productname + '</b></div> <div class="col-sm-12"><b>Product ID</b> ' + uid + '</div> <div class="col-sm-12"><b>Shop</b> ' + dataSingleProduct.sellername + '</div> <div class="col-sm-12"><b>Price </b> RM' + dataSingleProduct.price + '</div> </div>');

                $('#myModal .modal-body .cart-img-modal').attr('style', dom_img_cart);

                $('#myModal .modal-body .current-item-cart').html(dom_single_product);
            });
        });

        $('#myModal').modal('show', {
            backdrop: 'static'
        });

    });
}