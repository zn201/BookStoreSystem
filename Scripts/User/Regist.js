$(function () {
	/*
	 * 1. 得到所有的错误信息，循环遍历之。调用一个方法来确定是否显示错误信息！
	 */
    $(".errorClass").each(function () {
        showError($(this));//遍历每个元素，使用每个元素来调用showError方法
    });

	/*
	 * 2. 切换注册按钮的图片
	 */
    $("#submitBtn").hover(
        function () {
            $("#submitBtn").attr("src", "/Content/images/regist2.jpg");
        },
        function () {
            $("#submitBtn").attr("src", "/Content/images/regist1.jpg");
        }
    );
    /*
	 * 3. 输入框得到焦点隐藏错误信息
	 */
    $(".inputClass").focus(function () {
        var labelId = $(this).attr("id") + "Error";//通过输入框找到对应的label的id
        $("#" + labelId).text("");//把label的内容清空！
        showError($("#" + labelId));//隐藏没有信息的label
    });

	/*
	 * 4. 输入框失去焦点进行校验
	 */
    $(".inputClass").blur(function () {
        var id = $(this).attr("id");//获取当前输入框的id
        var funName = "validate" + id.substring(0, 1).toUpperCase() + id.substring(1) + "()";//得到对应的校验函数名
        eval(funName);//执行函数调用
    });
    /*
    * 5. 表单提交时进行校验
    */
    $("#submitBtn").submit(function () {
        var isValidate = true;//表示校验通过
        if (!validateLoginname()) {
            isValidate = false;
        }
        if (!validateLoginpass()) {
            isValidate = false;
        }
        if (!validateReloginpass()) {
            isValidate = false;
        }
        if (!validateEmail()) {
            isValidate = false;
        }
        if (!validateVerifyCode()) {
            isValidate = false;
        }
        if (!validateEmailCode()) {
            isValidate = false;
        }
        return isValidate;
    });

});
   
/*
 * 登录名校验方法
 */
function validateLoginname() {
    var id = "loginname";
    var value = $("#" + id).val();//获取输入框内容
	/*
	 * 1. 非空校验
	 */
    if (!value) {
		/*
		 * 获取对应的label
		 * 添加错误信息
		 * 显示label
		 */
        $("#" + id + "Error").text("用户名不能为空！");
        showError($("#" + id + "Error"));
        return false;
    }
	/*
	 * 2. 长度校验
	 */
    if (value.length < 3 || value.length > 20) {
		/*
		 * 获取对应的label
		 * 添加错误信息
		 * 显示label
		 */
        $("#" + id + "Error").text("用户名长度必须在3 ~ 20之间！");
        showError($("#" + id + "Error"));
        return false;
    }
	/*
	 * 3. 是否注册校验
	 */
    $.ajax({
        url: '/User/ajaxValidateLoginname',//要请求的验证方法
        data: { loginname: value },//给服务器的参数
        type: "POST",
        dataType: "json",
        async: false,//是否异步请求，如果是异步，那么不会等服务器返回，我们这个函数就向下运行了。
        cache: false,
        success: function (result) {
            if (!result.Flag) {//如果校验失败
                $("#" + id + "Error").text("用户名已被注册！");
                showError($("#" + id + "Error"));
                return false;
            }
        }
    });
    return true;
}

/*
 * 登录密码校验方法
 */
function validateLoginpass() {
    var id = "loginpass";
    var value = $("#" + id).val();//获取输入框内容
	/*
	 * 1. 非空校验
	 */
    if (!value) {
		/*
		 * 获取对应的label
		 * 添加错误信息
		 * 显示label
		 */
        $("#" + id + "Error").text("密码不能为空！");
        showError($("#" + id + "Error"));
        return false;
    }
	/*
	 * 2. 长度校验
	 */
    if (value.length < 3 || value.length > 20) {
		/*
		 * 获取对应的label
		 * 添加错误信息
		 * 显示label
		 */
        $("#" + id + "Error").text("密码长度必须在3 ~ 20之间！");
        showError($("#" + id + "Error"));
        return false;
    }
    return true;
}

/*
 * 确认密码校验方法
 */
function validateReloginpass() {
    var id = "reloginpass";
    var value = $("#" + id).val();//获取输入框内容
	/*
	 * 1. 非空校验
	 */
    if (!value) {
		/*
		 * 获取对应的label
		 * 添加错误信息
		 * 显示label
		 */
        $("#" + id + "Error").text("确认密码不能为空！");
        showError($("#" + id + "Error"));
        return false;
    }
	/*
	 * 2. 两次输入是否一致校验
	 */
    if (value != $("#loginpass").val()) {
		/*
		 * 获取对应的label
		 * 添加错误信息
		 * 显示label
		 */
        $("#" + id + "Error").text("两次输入不一致！");
        showError($("#" + id + "Error"));
        return false;
    }
    return true;
}

/*
 * Email校验方法
 */
function validateEmail() {
    var id = "email";
    var value = $("#" + id).val();//获取输入框内容
	/*
	 * 1. 非空校验
	 */
    if (!value) {
		/*
		 * 获取对应的label
		 * 添加错误信息
		 * 显示label
		 */
        $("#" + id + "Error").text("Email不能为空！");
        showError($("#" + id + "Error"));
        return false;
    }
	/*
	 * 2. Email格式校验
	 */
    if (!/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/.test(value)) {
		/*
		 * 获取对应的label
		 * 添加错误信息
		 * 显示label
		 */
        $("#" + id + "Error").text("错误的Email格式！");
        showError($("#" + id + "Error"));
        return false;
    }
	/*
	 * 3. 是否注册校验
	 */
    $.ajax({
        url: '/User/ajaxValidateEmail',//要请求的验证方法
        data: { email: value },//给服务器的参数
        type: "POST",
        dataType: "json",
        async: false,//是否异步请求，如果是异步，那么不会等服务器返回，我们这个函数就向下运行了。
        cache: false,
        success: function (result) {
            if (!result.Flag) {//如果校验失败
                $("#" + id + "Error").text("Email已被注册！");
                showError($("#" + id + "Error"));
                return false;
            }
        }
    });
    return true;
}

/*
 * Email激活码校验方法
 */
function validateEmailCode() {
    var value = $("#emailCode").val();//获取输入框内容
	/*
	 * 1. 非空校验
	 */
    if (!value) {
		/*
		 * 获取对应的label
		 * 添加错误信息
		 * 显示label
		 */
        $("#emailCodeError").text("激活码不能为空！");
        showError($("#emailCodeError"));
        return false;
    }
    /*
	 * 2. 长度校验
	 */
    if (value.trim().length != 6) {
		/*
		 * 获取对应的label
		 * 添加错误信息
		 * 显示label
		 */
        $("#emailCodeError").text("错误的激活码！");
        showError($("#emailCodeError"));
        return false;
    }
    return true;
}


/*
 * 验证码校验方法
 */
function validateVerifyCode() {
    var id = "verifyCode";
    var value = $("#" + id).val();//获取输入框内容
	/*
	 * 1. 非空校验
	 */
    if (!value) {
		/*
		 * 获取对应的label
		 * 添加错误信息
		 * 显示label
		 */
        $("#" + id + "Error").text("验证码不能为空！");
        showError($("#" + id + "Error"));
        return false;
    }
	/*
	 * 2. 长度校验
	 */
    if (value.length != 4) {
		/*
		 * 获取对应的label
		 * 添加错误信息
		 * 显示label
		 */
        $("#" + id + "Error").text("错误的验证码！");
        showError($("#" + id + "Error"));
        return false;
    }
	/*
	 * 3. 是否正确
	 */
    $.ajax({
        url: "/User/ajaxValidateVerifyCode",//要请求的验证方法
        data: { verifyCode: value },//给服务器的参数
        type: "POST",
        dataType: "json",
        async: false,//是否异步请求，如果是异步，那么不会等服务器返回，我们这个函数就向下运行了。
        cache: false,
        success: function (result) {
            if (!result.Flag) {//如果校验失败
                $("#" + id + "Error").text("验证码错误！");
                showError($("#" + id + "Error"));
                return false;
            }
            return true;
        }
    });
}

/*
 * 判断当前元素是否存在内容，如果存在显示，不页面不显示！
 */
function showError(ele) {
    var text = ele.text();//获取元素的内容
    if (!text) {//如果没有内容
        ele.css("display", "none");//隐藏元素
    } else {//如果有内容
        ele.css("display", "");//显示元素
    }
}

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
    $("#imgVerifyCode").attr("src", "../User/GetSecurityCode?flag=" + Math.random());
}
//获取验证码
function invokeSettime(obj) {
    var countdown = 300;
    settime(obj);
    function settime(obj) {
        if (countdown == 0) {
            $(obj).attr("disabled", false);
            $(obj).text("获取验证码");
            countdown = 300;
            return;
        } else {
            $(obj).attr("disabled", true);
            $(obj).text("(" + countdown + ") s 重新发送");
            countdown--;
        }
        setTimeout(function () {
            settime(obj)
        }
            , 1000)
    }
}

function _jhm() {
    if (validateEmail()) {
        var id = "email";
        var value = $("#" + id).val();//获取输入框内容
        $.ajax({
            url: "/User/ajaxSendEmail",//要请求的验证方法
            data: { sendEmail: "send", email: value },//给服务器的参数
            type: "POST",
            dataType: "json",
            //async: false,//是否异步请求，如果是异步，那么不会等服务器返回，我们这个函数就向下运行了。
            cache: false,
            success: function (result) {
                if (!result.Flag) {//如果发送失败
                    _jhm();
                } else {
                    new invokeSettime("#btnsendEmail");
                }
            }
        });
    }
}

