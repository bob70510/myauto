$(function () {
    load();
    initpage();
    $('#btn_submit').click(function () {
        clear();
        initpage();
        var setting = new Object();
        setting.startjine = $("#startjine").val();
        setting.endjine = $("#endjine").val();
        setting.ckjine = $("#ckjine").val();
        setting.startlilv = $("#startlilv").val();
        setting.endlilv = $("#endlilv").val();
        setting.cklilv = $("#cklilv").val();
        setting.interval = $("#interval").val();
        var temp = '';
        $('input[name="huan"]:checked').each(function () {
            temp += $(this).val() + ',';
        });
        setting.huan = temp;
        temp = "";
        $('input[name="type"]:checked').each(function () {
            temp += $(this).val() + ',';
        });
        setting.type = temp;
        localStorage.setItem('myauto.setting', JSON.stringify(setting));
        chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.sendMessage(tab.id, { name: localStorage.getItem('myauto.setting') }, function (response) {
            });
        });
        alert("保持成功!");
        chrome.tabs.getAllInWindow(null, function (tabs) {
            var isopennewwindow = true;
            for (var tab in tabs) {
                if ("http://www.my089.com/Loan/default.aspx" === tabs[tab].url) {
                    isopennewwindow = false;
                    chrome.tabs.executeScript(tabs[tab].id, { code: "location.reload();" })
                }
            };
            if (isopennewwindow)
                window.open("http://www.my089.com/Loan/default.aspx");
        });
        window.close();
    });
    $('#btn_cancel').click(function () {
        window.close();
    });
});
function load() {
    $('input[name="huan"]').removeAttr("checked");
    $('input[name="type"]').removeAttr("checked");
    var strsett = localStorage.getItem('myauto.setting');
    if (undefined != strsett) {
        var objsett = JSON.parse(strsett);
        $("#startjine").val(objsett.startjine);
        $("#endjine").val(objsett.endjine);
        $("#ckjine").val(objsett.ckjine);
        $("#startlilv").val(objsett.startlilv);
        $("#endlilv").val(objsett.endlilv);
        $("#cklilv").val(objsett.cklilv);
        $("#interval").val(objsett.interval);
        var vals = objsett.huan.toString().split(',');
        for (var v in vals) {
            value = vals[v];
            if (value != undefined && value.length > 0) {
                $('input[name="huan"][value=' + value + ']').attr("checked", true);
            }
        }
        var vals2 = objsett.type.toString().split(",");
        for (var v in vals2) {
            value = vals2[v];
            if (value != undefined && value.length > 0) {
                $('input[name="type"][value=' + value + ']').attr("checked", true);
            }
        }
    }
};
function pat(target) {
    var badge = $(target).html();
    var value = "";
    if (undefined != badge && badge != "") {
        value = parseInt(badge) + 1;
    } else {
        value = "1";
    }
    $(target).html(value);
};
function clear() {
    $(".badge").each(function (a) {
        $(this).html("");
    });
};
function initpage() {
    var age = localStorage.getItem('muauto');
    if (undefined == age)
        return false;
    var items = JSON.parse(age);
    $("#total").html(items.length);
    for (var i in items) {
        var item = items[i];
        switch (item.huan) {
            case "按月到期还款":
                pat("#type3");
                break;
            case "按月分期还款":
                pat("#type0");
                break;
            case "按天到期还款":
                pat("#type1");
                break;
            case "按天计息按月还款":
                pat("#type4");
                break;
            case "按季分期还款":
                pat("#type2");
                break;
        }
        switch (item.type) {
            case "SubL1":
                pat("#SubL1");
                break;
            case "SubL90":
                pat("#SubL90");
                break;
            case "SubL50":
                pat("#SubL50");
                break;
            case "SubL60":
                pat("#SubL60");
                break;
            case "SubL110":
                pat("#SubL110");
                break;
            case "SubL10":
                pat("#SubL10");
                break;
            case "SubL20":
                pat("#SubL20");
                break;
            case "SubL30":
                pat("#SubL30");
                break;
            case "SubL40":
                pat("#SubL40");
                break;
            case "SubL80":
                pat("#SubL80");
                break;
        }
        //SubL1信SubL90净SubL50快SubL60荐SubL110资SubL10担SubL20秒SubL30重SubL40阳光贷SubL80成长贷款
    };
}