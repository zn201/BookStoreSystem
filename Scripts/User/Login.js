$(function () {
	/*
	 * 1. 让登录按钮在得到和失去焦点时切换图片
	 */
    $("#submit").hover(
        function () {
            $("#submit").attr("src", "/Content/images/login2.jpg");
        },
        function () {
            $("#submit").attr("src", "/Content/images/login1.jpg");
        }
    );
});
	/*
	 * 2. 给注册按钮添加submit()事件，完成表单校验
	 */
$("#submit").click(function () {
        $("#msg").text("");
        var bool = true;
        $(".input").each(function () {
            var inputName = $(this).attr("name");
            if (!invokeValidateFunction(inputName)) {
                bool = false;
            }
        });
        return bool;
    });

	/*
	 * 3. 输入框得到焦点时隐藏错误信息
	 */
    $(".input").focus(function () {
        var inputName = $(this).attr("name");
        $("#" + inputName + "Error").css("display", "none");
    });

	/*
	 * 4. 输入框推动焦点时进行校验
	 */
    $(".input").blur(function () {
        var inputName = $(this).attr("name");
        invokeValidateFunction(inputName);
    })


/*
 * 输入input名称，调用对应的validate方法。
 * 例如input名称为：loginname，那么调用validateLoginname()方法。
 */
function invokeValidateFunction(inputName) {
    inputName = inputName.substring(0, 1).toUpperCase() + inputName.substring(1);
    var functionName = "validate" + inputName;
    return eval(functionName + "()");
}

/*
 * 校验登录名
 */
function validateLoginname() {
    var bool = true;
    $("#loginnameError").css("display", "none");
    var value = $("#loginname").val();
    if (!value) {// 非空校验
        $("#loginnameError").css("display", "");
        $("#loginnameError").text("用户名不能为空！");
        bool = false;
    }
    //} else if (value.length < 3 || value.length > 20) {//长度校验
    //    $("#loginnameError").css("display", "");
    //    $("#loginnameError").text("用户名长度必须在3 ~ 20之间！");
    //    bool = false;
    //}
    return bool;
}

/*
 * 校验密码
 */
function validateLoginpass() {
    var bool = true;
    $("#loginpassError").css("display", "none");
    var value = $("#loginpass").val();
    if (!value) {// 非空校验
        $("#loginpassError").css("display", "");
        $("#loginpassError").text("密码不能为空！");
        bool = false;
    }
    //} else if (value.length < 3 || value.length > 20) {//长度校验
    //    $("#loginpassError").css("display", "");
    //    $("#loginpassError").text("密码长度必须在3 ~ 20之间！");
    //    bool = false;
    //}
    return bool;
}

/*
 * 校验验证码
 */
function validateVerifyCode() {
    var bool = true;
    $("#verifyCodeError").css("display", "none");
    var value = $("#verifyCode").val();
    if (!value) {//非空校验
        $("#verifyCodeError").css("display", "");
        $("#verifyCodeError").text("验证码不能为空！");
        bool = false;
    //} else if (value.length != 4) {//长度不为4就是错误的
    //    $("#verifyCodeError").css("display", "");
    //    $("#verifyCodeError").text("错误的验证码！");
    //    bool = false;
    } else {//验证码是否正确
        $.ajax({
            url: "/User/ajaxValidateVerifyCode",
            data: { verifyCode: value },
            type: "POST",
            dataType: "json",
            async: false,//是否异步请求，如果是异步，那么不会等服务器返回，我们这个函数就向下运行了。
            cache: false,
            success: function (result) {
                if (!result.Flag) {//如果校验失败
                    $("#verifyCodeError").css("display", "");
                    $("#verifyCodeError").text("错误的验证码！");
                    bool = false;
                }
            }
        });
    }
    return bool;
};
/*
 * 换一张验证码
 */
function _hyz() {
	/*
	 * 1. 获取<img>元素
	 * 2. 重新设置它的src
	 * 3. 使用毫秒来添加参数
	 */
    ///注意后面的flag是必须的，如果不添加会导致部分浏览器不能刷新验证码
    $("#vCode").attr("src", "/User/GetSecurityCode?flag=" + Math.random());
}

