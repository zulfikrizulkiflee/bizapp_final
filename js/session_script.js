var user_id;

$.get("session.php", {
    process: 'check'
}, function (sessionData1) {
    console.log(sessionData1);
    var userdata = JSON.parse(sessionData1);
    if (sessionData1 != "no data") {
        user_id = userdata.id;
        $('#header .shop-menu ul li:last-child').html('<a href="javascript:void(0)" class="logout"><i class="fa fa-unlock"></i> Logout</a>');
        $('#header .shop-menu ul li:first-child').html('<a href="javascript:void(0)"><i class="fa fa-user"></i> ' + userdata.username + '</a>');
        $('.logout').on('click', function () {
            $.get("session.php", {
                process: "logout"
            }, function (sessionData2) {
                //                console.log(sessionData2);
                $('#header .shop-menu ul li:last-child').html('<a href="login.html?page=logsign"><i class="fa fa-lock"></i> Login/Signup</a>');
                $('#header .shop-menu ul li:first-child').html('<a href="javascript:void(0)"><i class="fa fa-user"></i> Account</a>');
            });
        });
    }
});