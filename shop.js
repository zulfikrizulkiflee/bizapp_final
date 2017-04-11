$('.header-bottom .search_box').css('display', 'none');
$('.features_items .pagination').remove();
$('.category-products').html('').css('border', 'none');
$('.brands_products').css('display', 'none');
$('.left-sidebar>h2').remove();
var shop_id = $.urlParam('sid');
var search_str = '';
var searchIndi = 0;

$('#advertisement .container').append('<img src="http://supremehandbags.com/wp-content/uploads/2016/09/bags-uk.jpg" style="height:20vw">');

$('.features_items h2').text("All Products");

//    init(search_str);
getShop(shop_id, search_str);

function getShop(shop_id, search_str) {
    $.getJSON("get_shop.php", {
        page: "shop",
        sid: shop_id,
        search_str: search_str
    }, function (dataItem) {
        console.log(dataItem);
        searchFunc(dataItem);
        shopInfo(dataItem);
        sortProduct(dataItem);

        browseItem(dataItem);


        addToCart();
    });
}

function generateItem(sta, limit, dataItem) {
    $('.features_items div').not(':first').remove();

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

function sortProduct(dataItem) {
    var sortmenu = '<div class="col-xs-12 col-sm-12" class="sort-menu" style="margin-bottom:10px"><a href="javascript:void(0)" class="sortPrice" data-sort="true">Price <i class="fa fa-sort" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="sortName" data-sort="true">Name <i class="fa fa-sort" aria-hidden="true"></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a href="javascript:void(0)" class="sortDate" data-sort="true">Date <i class="fa fa-sort" aria-hidden="true"></i></a><span class="col-xs-12 col-sm-5 search_box" style="float:right;padding:0"><input class="search_input" type="text" placeholder="Search" onkeypress="searchFunc(event)" style="width:100%;background-position: 95%;"></span></div>';

    $('.features_items').append(sortmenu);

    $('.sortPrice').css('color', '#696763').css('text-decoration', 'none');
    $('.sortName').css('color', '#696763').css('text-decoration', 'none');
    $('.sortDate').css('color', '#696763').css('text-decoration', 'none');

    $('.sortPrice').on('click', function () {
        var order = $(this).attr('data-sort');
        $('.features_items div').not(':first').remove();
        sortResults("price", order, dataItem);
        if (order == "true") {
            $(this).attr('data-sort', 'false');
            $(this).find('i').removeClass('fa-sort').addClass('fa-sort-up');
        } else {
            $(this).attr('data-sort', 'true');
            $(this).find('i').removeClass('fa-sort-up').addClass('fa-sort-down');
        }
    });

    $('.sortName').on('click', function () {
        var order = $(this).attr('data-sort');
        $('.features_items div').not(':first').remove();
        sortResults("productname", order, dataItem);
        if (order == "true") {
            $(this).attr('data-sort', 'false');
            $(this).find('i').removeClass('fa-sort').addClass('fa-sort-up');
        } else {
            $(this).attr('data-sort', 'true');
            $(this).find('i').removeClass('fa-sort-up').addClass('fa-sort-down');
        }
    });

    $('.sortDate').on('click', function () {
        var order = $(this).attr('data-sort');
        $('.features_items div').not(':first').remove();
        sortResults("datecreated", order, dataItem);
        if (order == "true") {
            $(this).attr('data-sort', 'false');
            $(this).find('i').removeClass('fa-sort').addClass('fa-sort-up');
        } else {
            $(this).attr('data-sort', 'true');
            $(this).find('i').removeClass('fa-sort-up').addClass('fa-sort-down');
        }
    });

    function sortResults(prop, order) {
        dataItem = dataItem.sort(function (a, b) {
            if (order == "true") {
                return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
            } else {
                return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
            }
        });
        browseItem(dataItem);
    }


}

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

function browseItem(dataItem) {
    var max_size = dataItem.length;
    var sta = 0;
    var elements_per_page = 12;
    var limit = elements_per_page;
    generateItem(sta, limit, dataItem);

    $(window).bind('scroll', function () {
        if ($(window).scrollTop() >= $('.features_items').offset().top + $('.features_items').outerHeight() - window.innerHeight) {
            var next = limit;
            if (max_size >= next) {
                limit = limit + elements_per_page;
                if (searchIndi != 1) {
                    generateItem(sta, limit, dataItem);
                }
            }
        }
    });
}

function searchFunc(e) {
    search_str = $('.search_input').val();
    if (e.keyCode === 13) {
        if (search_str != '') {
            searchIndi = 1;
            getShop(shop_id, search_str);
        } else {
            searchIndi = 0;
            getShop(shop_id, search_str);
        }
    }
    return false;
}