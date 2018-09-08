$(function () {
	/*
	 * 1. 给提交按钮添加submit()事件，完成表单校验
	 */
    $("#submitBtn").click(function () {
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
	 * 3. 输入框推动焦点时进行校验
	 */
    $(".input").blur(function () {
        var inputName = $(this).attr("name");
        invokeValidateFunction(inputName);
    });
});
/*
 * 输入input名称，调用对应的validate方法。
 * 例如input名称为：loginname，那么调用validateLoginname()方法。
 */
function invokeValidateFunction(inputName) {
    inputName = inputName.substring(0, 1).toUpperCase() + inputName.substring(1);
    var functionName = "validate" + inputName;
    return eval(functionName + "()");
};

// 校验新密码
function validateNewpass() {
    var bool = true;
    $("#newpassError").css("display", "none");
    var value = $("#newpass").val();
    if (!value) {// 非空校验
        $("#newpassError").css("display", "");
        $("#newpassError").text("新密码不能为空！");
        bool = false;
    } else if (value.length < 3 || value.length > 20) {//长度校验
        $("#newpassError").css("display", "");
        $("#newpassError").text("新密码长度必须在3 ~ 20之间！");
        bool = false;
    }
    return bool;
};

/*
 * 校验确认密码
 */
function validateReloginpass() {
    var bool = true;
    $("#reloginpassError").css("display", "none");
    var value = $("#reloginpass").val();
    if (!value) {// 非空校验
        $("#reloginpassError").css("display", "");
        $("#reloginpassError").text("确认密码不能为空！");
        bool = false;
    } else if (value != $("#newpass").val()) {//两次输入是否一致
        $("#reloginpassError").css("display", "");
        $("#reloginpassError").text("两次密码输入不一致！");
        bool = false;
    }
    return bool;
};
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
                //$("#" + id + "Error").text("Email已被注册！");
                //showError($("#" + id + "Error"));
                return false;
            }
        }
    });
    return true;
};

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
};
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
    } else if (value.length != 4) {//长度不为4就是错误的
        $("#verifyCodeError").css("display", "");
        $("#verifyCodeError").text("错误的验证码！");
        bool = false;
    } else {//验证码是否正确
        $.ajax({
            url: "/User/ajaxValidateVerifyCode",
            data: { verifyCode: value },
            type: "POST",
            dataType: "json",
            async: false,
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
    $("#vCode").attr("src", "../User/GetSecurityCode?flag=" + Math.random());
};
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
};
function showError(ele) {
    var text = ele.text();//获取元素的内容
    if (!text) {//如果没有内容
        ele.css("display", "none");//隐藏元素
    } else {//如果有内容
        ele.css("display", "");//显示元素
    }
};
function _jhm() {
    if (validateEmail()) {
        var id = "email";
        var value = $("#" + id).val();//获取输入框内容
        $.ajax({
            url: "/User/ajaxSendEmail",//要请求的验证方法
            data: { sendEmail: "send", email: value },//给服务器的参数
            type: "POST",
            dataType: "json",
            async: false,//是否异步请求，如果是异步，那么不会等服务器返回，我们这个函数就向下运行了。
            cache: false,
            success: function (result) {
                if (result.Flag) {//如果发送失败
                    //_jhm();
                    $("#emailCodeError").text("激活码已发送，请及时填写");
                    showError($("#emailCodeError"));
                    new invokeSettime("#btnsendEmail");
                } 
            }
        });
    }
};
