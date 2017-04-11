$.getScript("js/session_script.js", function () {});

$.urlParam = function (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    return results[1] || 0;
}
var page = $.urlParam('page');
//var section = $.urlParam('section');

$.getJSON("get_category.php", function (dataCategory) {
    //    console.log(dataCategory);
    $.each(dataCategory, function (i, dataCategory) {
        var dom_category = ('<div class="panel panel-default"> <div class="panel-heading"> <h4 class="panel-title"><a href="category.html?page=category&code=' + dataCategory.code + '#focus-here" title="' + dataCategory.description_en + '">' + dataCategory.description_en + '</a></h4> </div> </div>');

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
    $('.features_items .pagination').remove();
    var code = $.urlParam('code');

    $.getJSON("get_category.php", function (dataCategoryDesc) {
        //    console.log(dataCategory);
        $.each(dataCategoryDesc, function (i, dataCategoryDesc) {
            if (dataCategoryDesc.code == code) {
                $('.features_items h2').text(dataCategoryDesc.description_en);
            }
        });
    });

    $.getJSON("get_shop.php", {
        page: "category",
        code: code
    }, function (dataProduct) {
        console.log(dataProduct);
        var max_size = dataProduct.length;
        var sta = 0;
        var elements_per_page = 12;
        var limit = elements_per_page;
        goFun(sta, limit);

        function goFun(sta, limit) {
            for (i = sta; i < limit; i++) {
                var link = "http://corrad.visionice.net/bizapp/upload/product/";
                var image = link + dataProduct[i].attachment;
                var img_filler = "images/myimages/not_available.gif";
                if (image == link) {
                    image = img_filler;
                } else {
                    image = image;
                }

                var dom_product = ('<div class="col-xs-6 col-sm-4"> <div class="product-image-wrapper"> <div class="single-products"> <div class="productinfo text-center"> <img src="' + image + '" alt="" style="height:190px" title="' + dataProduct[i].attachment + '" onError="this.onerror=null;this.src=\'' + img_filler + '\';"> <h2>RM' + dataProduct[i].price + '</h2> <p class="truncate">' + dataProduct[i].productname + '</p> <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> <div class="product-overlay"> <div class="overlay-content"> <a href="javascript:void(0)"><i class="views-icon fa fa-eye"></i></a><h2>RM' + dataProduct[i].price + '</h2> <p class="truncate" title="' + dataProduct[i].productname + '">' + dataProduct[i].productname + '</p> <a href="#" class="btn btn-default add-to-cart" data-id="' + dataProduct[i].id + '" data-pid="' + dataProduct[i].pid + '"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> </div> </div> <div class="choose"> <ul class="nav nav-pills nav-justified"> <li><a href="#"><i class="fa fa-picture-o"></i> View Item</a></li> <li><a href="#"><i class="fa fa-plus-square"></i> Wishlist</a></li> </ul> </div> </div> </div>');

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
                            $('.features_items .productinfo img').attr('style', 'height:190px');
                        }

                    });
                });
            }
        }
        addToCart();

        $(window).bind('scroll', function () {
            if ($(window).scrollTop() >= $('.features_items').offset().top + $('.features_items').outerHeight() - window.innerHeight) {
                var next = limit;
                if (max_size >= next) {
                    limit = limit + elements_per_page;
                    goFun(next, limit);
                }
            }
        });
    });
} else if (page == "cart") {
    $('.header-bottom .search_box').css('display', 'none');
    $('#cart_items').css('border-bottom', 'none');
    $('#do_action .heading').remove();
    $('.header-bottom .row .col-sm-9').append('<a href="shop.html?page=shop&sid=' + localStorage.getItem('shopid') + '"><button type="submit" class="btn btn-default back-shop" style="background: #FE980F; border: medium none; border-radius: 0; color: #FFFFFF; display: block; font-family: \'Roboto \', sans-serif; padding: 6px 25px;"><i class="fa fa-chevron-left" aria-hidden="true"></i> Back To Shop</button></a>');
    var section = $.urlParam('section');
    var up = "up";
    var down = "down";
    var shop_pid;
    if (section == "shop") {

    } else if (section == "summary") {
        $('.breadcrumbs li:nth-child(2)').addClass('current');
        console.log('cart ' + user_id);

        if (user_id != 0) {
            $.getJSON("get_cart.php", {
                action_get: "display",
                userid: user_id
            }, function (dataCartTable) {
                //                console.log(dataCartTable.seller_id);
                if (dataCartTable.length == 0) {
                    $('.cart_info table tbody').html('<tr><td colspan="5"><div class="col-sm-12 not-found"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Your cart is empty</div></td></tr>');
                    $('#do_action').css('display', 'none');
                }
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

                            var dom_cart_single = ('<tr> <td class="" style="width:10%"> <a href="javascript:void(0)"><img src="' + image + '" alt="" style="height:130px;width:120px" onError="this.onerror=null;this.src=\'' + img_filler + '\';"></a> </td> <td class="cart_description" style="width:30%"> <h4><a href="javascript:void(0)">' + dataCartInfoSingle.productname + '</a></h4> <p>Product ID: ' + dataCartInfoSingle.id + '</p> </td> <td class="cart_price" style="width:15%"> <p>RM' + dataCartInfoSingle.price + '</p> </td> <td class="cart_quantity" style="width:15%;padding-left: 4%;"> <div class="cart_quantity_button"> <a class="cart_quantity_up" onclick="quantityChange(' + up + ',' + parseFloat(totalprice_item / dataCartTable.quantity).toFixed(2) + ')" href="javascript:void(0)"> + </a> <input class="cart_quantity_input" type="text" name="quantity" value="' + dataCartTable.quantity + '" autocomplete="off" size="2" readonly> <a class="cart_quantity_down" onclick="quantityChange(' + down + ',' + parseFloat(totalprice_item / dataCartTable.quantity).toFixed(2) + ')" href="javascript:void(0)"> - </a> </div> </td> <td class="cart_total" style="width:15%;text-align:right"> <p class="cart_total_price">RM' + parseFloat(totalprice_item).toFixed(2) + '</p> </td> <td class="" style="width:10%;text-align:center"> <a class="cart_quantity_delete" onclick="removeItem(' + dataCartInfoSingle.id + ')" href="javascript:void(0)"><i class="fa fa-times"></i></a> </td> </tr>');

                            //                    console.log(dom_cart_single);
                            $('.cart_info table tbody').append(dom_cart_single);
                        });
                    });
                    //            var dom_cart_table = ('');
                    //        $('#myModal .modal-body .cart-info-modal').html(dom_cart);
                });
                $('.total_area ul li:first-child span').text('RM' + parseFloat(price_sum).toFixed(2));
                $('.total_area ul li:last-child span').text('RM' + parseFloat(price_sum).toFixed(2));

            });
        } else {
            var productObj = JSON.parse(localStorage.getItem("localCart"));

            var cart_quantity = productObj.length;
            //            alert(cart_quantity);

            if (productObj.length == 0) {
                $('.cart_info table tbody').html('<tr><td colspan="5"><div class="col-sm-12 not-found"><span class="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span> Your cart is empty</div></td></tr>');
                $('#do_action').css('display', 'none');
            }


            $.each(productObj, function (i, dataCartInfo) {
                var price_sum = 0;
                $.each(productObj, function (i, dataCartTable) {
                    var item_price = dataCartTable.price;

                    price_sum = (parseFloat(item_price) + price_sum);
                    $.getJSON("get_single_product.php", {
                        id: dataCartTable.id
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

                            var dom_cart_single = ('<tr> <td class="" style="width:10%"> <a href="javascript:void(0)"><img src="' + image + '" alt="" style="height:130px;width:120px" onError="this.onerror=null;this.src=\'' + img_filler + '\';"></a> </td> <td class="cart_description" style="width:30%"> <h4><a href="javascript:void(0)">' + dataCartInfoSingle.productname + '</a></h4> <p>Product ID: ' + dataCartInfoSingle.id + '</p> </td> <td class="cart_price" style="width:15%"> <p>RM' + dataCartInfoSingle.price + '</p> </td> <td class="cart_quantity" style="width:15%;padding-left: 4%;"> <div class="cart_quantity_button"> <a class="cart_quantity_up" onclick="quantityChange(' + up + ',' + parseFloat(totalprice_item / dataCartTable.quantity).toFixed(2) + ')" href="javascript:void(0)"> + </a> <input class="cart_quantity_input" type="text" name="quantity" value="' + dataCartTable.quantity + '" autocomplete="off" size="2" readonly> <a class="cart_quantity_down" onclick="quantityChange(' + down + ',' + parseFloat(totalprice_item / dataCartTable.quantity).toFixed(2) + ')" href="javascript:void(0)"> - </a> </div> </td> <td class="cart_total" style="width:15%;text-align:right"> <p class="cart_total_price">RM' + parseFloat(totalprice_item).toFixed(2) + '</p> </td> <td class="" style="width:10%;text-align:center"> <a class="cart_quantity_delete" onclick="removeItem(' + dataCartInfoSingle.id + ')" href="javascript:void(0)"><i class="fa fa-times"></i></a> </td> </tr>');

                            //                    console.log(dom_cart_single);
                            $('.cart_info table tbody').append(dom_cart_single);
                        });
                    });
                    //            var dom_cart_table = ('');
                    //        $('#myModal .modal-body .cart-info-modal').html(dom_cart);
                });
                $('.total_area ul li:first-child span').text('RM' + parseFloat(price_sum).toFixed(2));
                $('.total_area ul li:last-child span').text('RM' + parseFloat(price_sum).toFixed(2));
            });

        }


    } else if (section == "signin") {
        $('.breadcrumbs li:nth-child(2)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(2) em').replaceWith('<a href="cart.html?page=cart&section=summary">Summary</a>');
        $('.breadcrumbs li:nth-child(3)').addClass('current');

        $('.cart_info').html('');

        $('#do_action').html('');
        $('.cart_info').css('border', 'none');
        $('.cart_info').load('login.html #form .container', function () {
            $('.cart_info .col-sm-offset-1').css('margin-left', '0');
            $('.cart_info .col-sm-offset-1').removeClass('col-sm-4').addClass('col-sm-3');
            $('.cart_info .container .row div:nth-child(3)').removeClass('col-sm-4').addClass('col-sm-3');
            $('.cart_info .container .row').append('<div class="col-sm-1"><h2 class="or">OR</h2></div>');
            $('.cart_info .container .row').append('<div class="col-sm-offset-1 col-sm-3" style="margin-left: 0px;"> <div class="login-form"> <!--login form--> <h2>Continue As Guest</h2> <form id="guest-form" action="javascript:void(0)"> <input type="text" name="name" placeholder="Name"> <input type="text" name="email" placeholder="Email"> <input type="number" name="phone_num" placeholder="Phone Number"><textarea name="address" placeholder="Delivery Address" rows="3" style="font-family: \'Roboto\', sans-serif;font-size: 15px;font-weight: 300;outline: medium none;padding-left: 10px;" required=""></textarea><input type="hidden" name="guest" value="true"> <button type="submit" class="btn btn-default" style="margin-top:10px">Continue</button> </form> </div></div>');
            $('#login-form').on('submit', function (e) {
                e.preventDefault(); // avoid to execute the actual submit of the form.
                //                console.log("sign");
                var login_detail = $(this).serialize();
                //        console.log(login_detail);
                $.getJSON('post_login.php?' + login_detail, function (dataLogin) {
                    var id_user = dataLogin[0].id;
                    var username = dataLogin[0].username;
                    var usertype = dataLogin[0].usertype;
                    $.get("session.php", {
                        process: 'set',
                        id: id_user,
                        username: username,
                        usertype: usertype
                    }, function (sessionData1) {
                        //                        console.log(sessionData1);
                        window.open('cart.html?page=cart&section=address', '_self');
                        //                        window.history.back();
                    });
                });
            });

            $('#signup-form').on('submit', function (e) {
                e.preventDefault();
                var signup_detail = $(this).serialize();
                $.get('post_login.php?' + signup_detail, function (dataSignup) {
                    alert(dataSignup);
                });
            });
        });


    } else if (section == "address") {
        $('head').append('<script src="js/jquery-ui.js"></script>');
        $('.breadcrumbs li:nth-child(2)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(2) em').replaceWith('<a href="cart.html?page=cart&section=summary">Summary</a>');
        $('.breadcrumbs li:nth-child(3)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(3) em').replaceWith('<a href="javascript:void(0)">Sign In</a>');
        $('.breadcrumbs li:nth-child(4)').addClass('current');

        $('.cart_info').html('');
        $('#do_action').html('');
        $('.cart_info').css('padding', '25px');
        $.getJSON('get_user_detail.php', {
            get_process: "display",
            userid: user_id
        }, function (dataUser) {
            //            console.log(dataUser);
            var panelwidth = $('.cart_info').width();
            $('body').prepend('<div class="addressNav" style="position:absolute;width: 100%; height: 100%; padding: 0 10% 5% 10%;display: none; background: #FFFFFF;z-index:999"><div class"row" style="text-align:center;padding:25px 0px 25px 0px">Select Address<span style="float:right"><a href="javascript:void(0)" class="addressPanel"><i class="fa fa-times" aria-hidden="true"></i></a></span></div></div>');

            $.each(dataUser, function (i, dataUser) {
                //                console.log(dataUser);
                if (dataUser.default_address == "1") {
                    var def_address_str = '<div class="row"> <div class="col-xs-12 col-md-12">Your Account: <b>' + username + '</b><br>' + dataUser.phone_num + '</div></div><div class="row"><div class="col-xs-12 col-md-12" style="margin-top:20px"><div class="col-xs-10 col-sm-10" style="padding:0">Delivery Address</div><div class="col-xs-2 col-sm-2" style="text-align:right;padding:0"><a href="javascript:void(0)" class="addressPanel">CHANGE</a></div><b>' + dataUser.deliver_name + '</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + dataUser.phone_num + '<br><span style="width:100px">' + dataUser.address + '</span></div></div>';
                    $('.cart_info').html(def_address_str);
                }

                if (dataUser.default_address == "1") {
                    var address_str = '<a href="" class="address_card" data-userid="' + dataUser.user_id + '" data-id="' + dataUser.id + '" style="color:inherit"><div style="border-top:1px solid rgba(0,0,0,0.09);border-left:1px solid rgba(0,0,0,0.09);border-right:1px solid rgba(0,0,0,0.09);padding: 3% 5% 3% 5%;"><b>' + dataUser.deliver_name + '</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + dataUser.phone_num + '<span class="default_address" style="float:right;text-align:right;color:light-green !important;"><i class="fa fa-check" aria-hidden="true"></i></span><br><span style="width:100px">' + dataUser.address + '</span></div></a>';
                    $('.addressNav').append(address_str);
                } else {
                    var address_str = '<a href="" class="address_card" data-userid="' + dataUser.user_id + '" data-id="' + dataUser.id + '" style="color:inherit"><div style="border-top:1px solid rgba(0,0,0,0.09);border-left:1px solid rgba(0,0,0,0.09);border-right:1px solid rgba(0,0,0,0.09);padding: 3% 5% 3% 5%;"><b>' + dataUser.deliver_name + '</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + dataUser.phone_num + '<span class="default_address" style="float:right;text-align:right;color:light-green !important;"></span><br><span style="width:100px">' + dataUser.address + '</span></div></a>';
                    $('.addressNav').append(address_str);
                }
            });

            openPanel();

            $('.addressNav').append('<div style="border-top:1px solid rgba(0,0,0,0.09);padding:25px 0px 25px 0px"><center><i class="fa fa-plus" aria-hidden="true"></i> Add New Address</center></div>');


            $('.address_card').each(function () {
                $(this).on('click', function (e) {
                    e.preventDefault();
                    var check = '<i class="fa fa-check" aria-hidden="true"></i>';
                    var cart_id = $(this).attr('data-id');
                    var user_id = $(this).attr('data-userid');
                    console.log(cart_id);
                    //                    alert("change address " + cart_id);
                    $('.address_card .default_address i').remove();
                    $(this).find('.default_address').html(check);
                    $.get('get_user_detail.php', {
                        get_process: "set",
                        cart_id: cart_id,
                        userid: user_id
                    }, function (resp) {
                        $.getJSON('get_user_detail.php', {
                            get_process: "display",
                            userid: user_id
                        }, function (dataUser) {
                            //                            console.log(dataUser[0].default_address);
                            $.each(dataUser, function (i, dataUser) {
                                if (dataUser.default_address == "1") {
                                    var def_address_str = '<div class="row"> <div class="col-xs-12 col-md-12">Your Account: <b>' + username + '</b><br>' + dataUser.phone_num + '</div></div><div class="row"><div class="col-xs-12 col-md-12" style="margin-top:20px"><div class="col-xs-10 col-sm-10" style="padding:0">Delivery Address</div><div class="col-xs-2 col-sm-2" style="text-align:right;padding:0"><a href="javascript:void(0)" class="addressPanel">CHANGE</a></div><b>' + dataUser.deliver_name + '</b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + dataUser.phone_num + '<br><span style="width:100px">' + dataUser.address + '</span></div></div>';
                                    $('.cart_info').html(def_address_str);
                                }
                            });
                            openPanel();
                        });
                    });
                });
            });

            function openPanel() {
                $('.addressPanel').click(function () {
                    if ($('.addressNav').is(':hidden')) {
                        $('.addressNav').show('slide', {
                            direction: 'right'
                        }, 1000);
                        $(window).scrollTop(0);
                    } else {
                        $('.addressNav').hide('slide', {
                            direction: 'right'
                        }, 1000);
                        $(window).scrollTop($('#cart_items').offset().top);
                    }
                });
            }
        });



    } else if (section == "payment") {
        $('.breadcrumbs li:nth-child(2)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(2) em').replaceWith('<a href="cart.html?page=cart&section=summary">Summary</a>');
        $('.breadcrumbs li:nth-child(3)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(3) em').replaceWith('<a href="javascript:void(0)">Sign In</a>');
        $('.breadcrumbs li:nth-child(4)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(4) em').replaceWith('<a href="cart.html?page=cart&section=address">Address</a>');
        $('.breadcrumbs li:nth-child(5)').addClass('current');
    } else if (section == "complete") {
        $('.breadcrumbs li:nth-child(2)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(2) em').replaceWith('<a href="cart.html?page=cart&section=summary">Summary</a>');
        $('.breadcrumbs li:nth-child(3)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(3) em').replaceWith('<a href="javascript:void(0)">Sign In</a>');
        $('.breadcrumbs li:nth-child(4)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(4) em').replaceWith('<a href="cart.html?page=cart&section=address">Address</a>');
        $('.breadcrumbs li:nth-child(5)').removeClass('current').addClass('visited');
        $('.breadcrumbs li:nth-child(5) em').replaceWith('<a href="cart.html?page=cart&section=shipping">Shipping</a>');
        $('.breadcrumbs li:nth-child(6)').addClass('current');
    }

    //    $('head').append('<link href="css/bcstyle.css" rel="stylesheet">')
    //breadcrumb cart
    //    $('#cart_items .breadcrumb li:nth-child(2)').html('');
    //checkout button
    $('.update').html('Clear My Cart <i class="fa fa-trash-o"></i>');
    $('.check_out').css('margin-left', '40px');
    $('.total_area .check_out').on('click', function (e) {
        //        if not signin
        e.preventDefault();
        if (user_id != 0) {
            console.log("login as " + user_id);
            window.open('cart.html?page=cart&section=address', '_self');
        } else {
            console.log("login first");
            window.open('cart.html?page=cart&section=signin', '_self');
        }

        //window.open('cart.html?page=cart&section=signin', '_self');
        //        else proceed to adress selection
    });


    function quantityChange(change, price) {
        var init_quantity = parseInt($('.cart_quantity_input').attr('value'));
        if (change == "up") {
            init_quantity = init_quantity + 1;
            $('.cart_quantity_input').attr('value', init_quantity);
            var price_sum = parseFloat(price * init_quantity).toFixed(2);
            $('.cart_total_price').text('RM' + price_sum);
        } else if (change == "down" && init_quantity > 1) {
            init_quantity = init_quantity - 1;
            $('.cart_quantity_input').attr('value', init_quantity);
            var price_sum = parseFloat(price * init_quantity).toFixed(2);
            $('.cart_total_price').text('RM' + price_sum);
        }
    }

    function removeItem(id) {
        $.getJSON("get_cart.php", {
            action_get: "delete",
            id: id,
        }, function (dataCartInfo) {

        });
    }
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
} else if (page == "logsign") {
    $('.header-bottom .search_box').css('display', 'none');
    $('#header .shop-menu ul li:last-child a').addClass('active');
    $('#login-form').on('submit', function (e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        console.log("sign");
        var login_detail = $(this).serialize();
        //        console.log(login_detail);
        $.getJSON('post_login.php?' + login_detail, function (dataLogin) {
            var id_user = dataLogin[0].id;
            var username = dataLogin[0].username;
            var usertype = dataLogin[0].usertype;
            $.get("session.php", {
                process: 'set',
                id: id_user,
                username: username,
                usertype: usertype
            }, function (sessionData1) {
                console.log(sessionData1);
                //                window.open('index.html?page=home', '_self');
                window.history.back();
            });
        });
    });

    $('#signup-form').on('submit', function (e) {
        e.preventDefault(); // avoid to execute the actual submit of the form.
        var signup_detail = $(this).serialize();
        //        console.log(signup_detail);
        $.get('post_login.php?' + signup_detail, function (dataSignup) {
            //            console.log(dataSignup);
            $('#myModal .modal-header').html('');
            $('#myModal .modal-body').html('');
            $('#myModal .modal-footer').html('<button type="button" class="btn btn-primary" data-dismiss="modal">Close</button> <button type="button" class="btn btn-primary">Proceed To Login</button>');
            $('#myModal').modal('show', {
                backdrop: 'static'
            });
        });
    });

} else if (page == "shop") {
    $('head').append('<script type="text/javascript" src="js/filterJSON.plugin.min.js"></script>');
    $('.header-bottom .search_box').css('display', 'none');
    $('.features_items .pagination').remove();
    $('.category-products').html('').css('border', 'none');
    $('.brands_products').css('display', 'none');
    $('.left-sidebar>h2').remove();
    var shop_id = $.urlParam('sid');

    localStorage.setItem('shopid', shop_id);

    $('#advertisement .container').append('<img src="http://supremehandbags.com/wp-content/uploads/2016/09/bags-uk.jpg" style="height:20vw">');

    $('.features_items h2').text("All Products");

    var filtered = false;

    var dataAku;

    $.getJSON("get_shop.php", {
        page: "shop",
        sid: shop_id,
    }, function (dataItem) {
        console.log(dataItem);
        shopInfo(dataItem);
        filterMenu(dataItem);
        generateItem(dataItem);
        addToCart();
    });

    function shopInfo(dataItem) {
        var date_str = dataItem[0].tarikhdaftar;
        var date = date_str.split(' ')[0];
        //            console.log(date);

        var date1 = new Date(date); //Remember, months are 0 based in JS
        var date2 = new Date();
        var year1 = date1.getFullYear();
        var year2 = date2.getFullYear();
        var month1 = date1.getMonth();
        var month2 = date2.getMonth();
        if (month1 === 0) { //Have to take into account
            month1++;
            month2++;
        }
        var numberOfMonths = (year2 - year1) * 12 + (month2 - month1) - 1;;
        //        console.log(numberOfMonths);

        var star_fill = '<span style="color:gold;font-size:1.7em"><i class="fa fa-star" aria-hidden="true"></i></span>';
        var star_half = '<span style="color:gold;font-size:1.7em"><i class="fa fa-star-half" aria-hidden="true"></i></span>';
        var star_empty = '<span style="font-size:1.7em"><i class="fa fa-star-o" aria-hidden="true"></i></span>';
        var star_count = 0;

        $.getJSON('get_shop_rating.php', {
            sid: shop_id
        }, function (dataRating) {
            //                console.log(dataRating);
            var star5 = 0;
            var star4 = 0;
            var star3 = 0;
            var star2 = 0;
            var star1 = 0;
            star5 = dataRating.filter(function (v) {
                return v.rating == '5';
            }).length;
            star4 = dataRating.filter(function (v) {
                return v.rating == '4';
            }).length;
            star3 = dataRating.filter(function (v) {
                return v.rating == '3';
            }).length;
            star2 = dataRating.filter(function (v) {
                return v.rating == '2';
            }).length;
            star1 = dataRating.filter(function (v) {
                return v.rating == '1';
            }).length;

            star_count = ((star5 * 5) + (star4 * 4) + (star3 * 3) + (star2 * 2) + (star1 * 1)) / dataRating.length;

            console.log(parseFloat(star_count).toFixed(1));
        });

        var star_obj;
        var star_str;
        if (isNaN(star_count)) {
            star_obj = "";
            star_str = "No rating yet";
        } else {
            star_obj = star_fill.repeat(parseInt(star_count));
            star_str = parseFloat(star_count).toFixed(1);
        }

        var shop_str = '<div class="row" style="color:#696763"><div class="col-sm-12" style="text-align:center;"><img class="shop-img" src="http://corrad.visionice.net/bizapp/upload/profile/' + dataItem[0].attachmentphoto + '" style="width:150px;height:150px;border-radius: 50% !important;border: 1px solid #fe980f"></div><div class="col-sm-12" style="text-align:center"><span style="font-size:1.5em;color:#696763">' + dataItem[0].nama + '</span></div><div class="col-xs-6 col-sm-6"><table style="text-align:center;width:100%;border:1px solid #F0F0E9"><tr style="background-color:#FE980F;color:#fff;border-bottom:1px solid #F0F0E9"><td>Products</td></tr><tr><td>' + dataItem.length + '</td></tr></table></div><div class="col-xs-6 col-sm-6"><table style="text-align:center;width:100%;border:1px solid #F0F0E9"><tr style="background-color:#FE980F;color:#fff;border-bottom:1px solid #F0F0E9"><td>Joined</td></tr><tr><td>' + numberOfMonths + ' Months Ago</td></tr></table></div><div class="col-sm-12" style="text-align:center;margin-top:10px"><table style="text-align:center;width:100%;border:1px solid #F0F0E9"><tr style="background-color:#FE980F;color:#fff;border-bottom:1px solid #F0F0E9"><td>Rating</td></tr><tr><td>' + star_obj + '<br><span style="font-size:12px;color:#696763">(' + star_str + ')</span></td></tr></table></div></div>';

        $('.category-products').html(shop_str);
    }

    function filterMenu(dataItem) {
        var ftr = '<div class="col-xs-12 col-sm-12" class="sort-menu" style="margin-bottom:10px"><a href="javascript:void(0)" class="sortPrice" data-sort="asc">Price <i class="fa fa-sort" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="sortName" data-sort="asc">Name <i class="fa fa-sort" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="sortDate" data-sort="asc">Date <i class="fa fa-sort" aria-hidden="true"></i></a><span class="col-xs-12 col-sm-5 search_box" style="float:right;padding:0"><input onfocus="removeSortIcon()" onkeypress="handle(event)" class="search_input" type="text" placeholder="Search" style="width:100%;background-position: 95%;"></span></div><input type="hidden" class="searchEnter">';

        $('.features_items').append(ftr);

        $('.sortPrice').css('color', '#696763').css('text-decoration', 'none');
        $('.sortName').css('color', '#696763').css('text-decoration', 'none');
        $('.sortDate').css('color', '#696763').css('text-decoration', 'none');

        generateItem(dataItem);

        $('.sortPrice').on('click', function () {
            $('.sortName').find('i').removeClass('fa-sort-up').removeClass('fa-sort-down').addClass('fa-sort');
            $('.sortDate').find('i').removeClass('fa-sort-up').removeClass('fa-sort-down').addClass('fa-sort');
            var order = $(this).attr('data-sort');
            $('.features_items div').not(':first').remove();

            if (order == "asc") {
                $(this).attr('data-sort', 'desc');
                $(this).find('i').removeClass('fa-sort').addClass('fa-sort-up');
            } else {
                order = "desc"
                $(this).attr('data-sort', 'asc');
                $(this).find('i').removeClass('fa-sort-up').addClass('fa-sort-down');
            }

            var json = dataItem,
                property = 'price,productname',
                propertyValue = $(".search_input").val();

            filterNow(json, property, propertyValue, order);
        });

        $('.sortName').on('click', function () {
            $('.sortPrice').find('i').removeClass('fa-sort-up').removeClass('fa-sort-down').addClass('fa-sort');
            $('.sortDate').find('i').removeClass('fa-sort-up').removeClass('fa-sort-down').addClass('fa-sort');
            var order = $(this).attr('data-sort');
            $('.features_items div').not(':first').remove();

            if (order == "asc") {
                $(this).attr('data-sort', 'desc');
                $(this).find('i').removeClass('fa-sort').addClass('fa-sort-up');
            } else {
                order = "desc"
                $(this).attr('data-sort', 'asc');
                $(this).find('i').removeClass('fa-sort-up').addClass('fa-sort-down');
            }

            var json = dataItem,
                property = 'productname,productname',
                propertyValue = $(".search_input").val();

            filterNow(json, property, propertyValue, order);
        });

        $('.sortDate').on('click', function () {
            $('.sortPrice').find('i').removeClass('fa-sort-up').removeClass('fa-sort-down').addClass('fa-sort');
            $('.sortName').find('i').removeClass('fa-sort-up').removeClass('fa-sort-down').addClass('fa-sort');
            var order = $(this).attr('data-sort');
            $('.features_items div').not(':first').remove();

            if (order == "asc") {
                $(this).attr('data-sort', 'desc');
                $(this).find('i').removeClass('fa-sort').addClass('fa-sort-up');
            } else {
                order = "desc"
                $(this).attr('data-sort', 'asc');
                $(this).find('i').removeClass('fa-sort-up').addClass('fa-sort-down');
            }

            var json = dataItem,
                property = 'datecreated,productname',
                propertyValue = $(".search_input").val();

            filterNow(json, property, propertyValue, order);
        });

        $('.searchEnter').on('click', function () {
            $('.sortName').attr('data-sort', 'asc');
            $('.features_items div').not(':first').remove();

            var json = dataItem,
                property = 'productname,productname',
                propertyValue = $(".search_input").val();

            try {
                var config = {
                        property: property.split(","),
                        wrapper: true,
                        value: propertyValue,
                        sort: false,
                        checkContains: true,
                        startsWith: false,
                        matchCase: false,
                        avoidDuplicates: true
                    },
                    filteredJSON = $.fn.filterJSON(json, config).toArray();

                if (propertyValue != '') {
                    filtered = true;
                    displayCard(0, 999, filteredJSON);
                } else {
                    filtered = false;
                }
                generateItem(filteredJSON);
                addToCart()
            } catch (e) {
                console.error(e.message);
            }
        });
    }

    function removeSortIcon() {
        $('.sortPrice').find('i').removeClass('fa-sort-up').removeClass('fa-sort-down').addClass('fa-sort');
        $('.sortName').find('i').removeClass('fa-sort-up').removeClass('fa-sort-down').addClass('fa-sort');
        $('.sortDate').find('i').removeClass('fa-sort-up').removeClass('fa-sort-down').addClass('fa-sort');
    }

    function handle(e) {
        if (e.keyCode === 13) {
            $('.searchEnter').click();
        }
        return false;
    }

    function filterNow(json, property, propertyValue, order) {
        try {
            var config = {
                    property: property.split(","),
                    wrapper: true,
                    value: propertyValue,
                    sort: true,
                    sortOrder: order,
                    checkContains: true,
                    startsWith: false,
                    matchCase: false,
                    avoidDuplicates: true
                },
                filteredJSON = $.fn.filterJSON(json, config).toArray();

            if (propertyValue != '') {
                filtered = true;
                displayCard(0, 999, filteredJSON);
            } else {
                filtered = false;
            }
            generateItem(filteredJSON);
            addToCart();
        } catch (e) {
            console.error(e.message);
        }
    }

    function generateItem(dataItem) {
        $('.features_items div').not(':first').remove();

        var max_size = dataItem.length;
        var sta = 0;
        var elements_per_page = 12;
        var limit = elements_per_page;

        displayCard(sta, limit, dataItem);

        $(window).bind('scroll', function () {
            if ($(window).scrollTop() >= $('.features_items').offset().top + $('.features_items').outerHeight() - window.innerHeight) {
                var next = limit;
                if (max_size >= next) {
                    limit = limit + elements_per_page;
                    if (filtered == false) {
                        displayCard(next, limit, dataItem);
                    }
                }
            }
        });
    }

    function displayCard(sta, limit, dataItem) {
        for (i = sta; i < limit; i++) {
            var link = "http://corrad.visionice.net/bizapp/upload/product/";
            var image = link + dataItem[i].attachment;
            var img_filler = "images/myimages/not_available.gif";
            if (image == link) {
                image = img_filler;
            } else {
                image = image;
            }

            var dom_product = ('<div class="col-xs-6 col-sm-4"> <div class="product-image-wrapper"> <div class="single-products"> <div class="productinfo text-center"> <img src="' + image + '" alt="" style="height:190px" title="' + dataItem[i].attachment + '" onError="this.onerror=null;this.src=\'' + img_filler + '\';"> <h2>RM' + dataItem[i].price + '</h2> <p class="truncate">' + dataItem[i].productname + '</p> <a href="#" class="btn btn-default add-to-cart"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> <div class="product-overlay"> <div class="overlay-content"> <a href="javascript:void(0)"><i class="views-icon fa fa-eye"></i></a><h2>RM' + dataItem[i].price + '</h2> <p class="truncate" title="' + dataItem[i].productname + '">' + dataItem[i].productname + '</p> <a href="#" class="btn btn-default add-to-cart" data-id="' + dataItem[i].id + '" data-pid="' + dataItem[i].pid + '"><i class="fa fa-shopping-cart"></i>Add to cart</a> </div> </div> </div> <div class="choose"> <ul class="nav nav-pills nav-justified"> <li><a href="#"><i class="fa fa-picture-o"></i> View Item</a></li> <li><a href="#"><i class="fa fa-plus-square"></i> Wishlist</a></li> </ul> </div> </div> </div>');

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
                        $('.features_items .productinfo img').attr('style', 'height:190px');
                    }
                });
            });
        }
    }
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

        if (user_id != 0) {
            $.getJSON("get_cart.php", {
                id: uid,
                action_get: "insert",
                userid: user_id,
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
        } else {
            var price = 0;
            $.getJSON("get_single_product.php", {
                id: uid,
            }, function (dataSingleProduct) {
                //                console.log(dataSingleProduct[0].price);
                price = dataSingleProduct[0].price;
            });

            var productinsert = {
                'id': uid,
                'userid': 0,
                'quantity': 1,
                'sellerid': sellerid,
                'price': price
            };

            var productList = localStorage.getItem("localCart");
            productList = productList ? JSON.parse(productList) : [];
            productList.push(productinsert);

            localStorage.setItem("localCart", JSON.stringify(productList));
            var productObj = JSON.parse(localStorage.getItem("localCart"));

            var cart_quantity = productObj.length;
            var price_sum = 0;
            $.each(productObj, function (i, dataCartInfo) {
                var item_price = dataCartInfo.price;

                price_sum = (parseFloat(item_price) + price_sum);
                var dom_cart = ('<div class="col-sm-12"><b>You have ' + cart_quantity + ' item in your cart</b></div> <div class="col-sm-12"><b>Total price</b> RM' + parseFloat(price_sum).toFixed(2) + '</div>');

                $('#myModal .modal-body .cart-info-modal').html(dom_cart);
            });
        }

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

$('.update').on('click', function () {
    clearCart();
});

function clearCart() {
    if (user_id != 0) {
        $.getJSON("get_cart.php", {
            action_get: "clear",
            userid: user_id,
        }, function (dataCartInfo) {
            var cart_quantity = dataCartInfo.length;
            console.log(dataCartInfo);
            var price_sum = 0;
            $.each(dataCartInfo, function (i, dataCartInfo) {
                var item_price = dataCartInfo.price_sum;

                price_sum = (parseFloat(item_price) + price_sum);
                var dom_cart = ('<div class="col-sm-12"><b>You have ' + cart_quantity + ' item in your cart</b></div> <div class="col-sm-12"><b>Total price</b> RM' + parseFloat(price_sum).toFixed(2) + '</div>');

                $('#myModal .modal-body .cart-info-modal').html(dom_cart);
            });
        });
    } else {
        localStorage.setItem('localCart', '');
    }

}