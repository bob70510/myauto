$(document).ready(function () {
    if ("disabled" == localStorage.getItem('myauto.setting')) {
        return false;
    }
    function getUrlParam(url, name) {
        var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
        return results[1] || 0;
    };
    var items = new Array();
    $(".contentservice_middle").children(".biao_item").each(function (a) {
        var biaotype = $(this).find(".biaoti>dt>a:eq(1)").attr("class");
        var biaoId = getUrlParam($(this).find(".biaoti>dt>a:eq(2)").attr("href"), "sid");
        var jine = $(this).find(".yongtu>dt").html().replace("￥", "").replace(",", "");
        var lilv = $(this).find(".yongtu .lilv").html().replace("%/年", "").replace("%/日", "");
        var jine3 = $(this).find(".huankuan>dd");
        var qixian = $(jine3[0]).html();
        var huant = $(jine3[1]).html();
        var item = { Id: biaoId, type: biaotype, jine: jine, qixian: qixian, lilv: lilv, huan: huant };
        if (vild(item)) {
            var myport = chrome.extension.connect();
            myport.postMessage({ notification: "提醒一下," + $(this).find(".yongtu .lilv").html(), details: $(this).find(".biaoti>dt>a:eq(2)").attr("href") });
        }
        items.push(item);

    });
    localStorage.setItem("muauto", JSON.stringify(items));
    var sendmsg = chrome.extension.connect();
    sendmsg.postMessage({ name: localStorage.getItem("muauto") });
    var strsett = localStorage.getItem('myauto.setting');
    if (undefined != strsett) {
        var objsett = JSON.parse(strsett);
        var inter = parseInt(objsett.interval);
        setInterval("startRequest()", inter * 1000);
    }
    //setInterval这个函数会根据后面定义的2000既每隔1秒执行一次前面那个函数
    //如果你用局部刷新，要用AJAX技术
});
function startRequest() {
    location.reload();
}
chrome.runtime.onMessage.addListener(
function (request, sender, sendResponse) {
    if (undefined != request.name) {
        localStorage.removeItem('myauto.setting');
        localStorage.setItem('myauto.setting', request.name);
        location.reload();
    }
    if (undefined != request.refresh) {
        localStorage.setItem('myauto.refresh', request.refresh);
    }
});
function vild(item) {
    var result = true;
    var strsett = localStorage.getItem('myauto.setting');
    if (undefined != strsett) {
        var objsett = JSON.parse(strsett);
        var startjine = parseFloat(objsett.startjine);
        var endjine = parseFloat(objsett.endjine);
        var startlilv = parseFloat(objsett.startlilv);
        var endlilv = parseFloat(objsett.endlilv);
        if (endjine >= parseFloat(item.jine) && parseFloat(item.jine) >= startjine) {
            result = true;
        } else { result = false; }
        if (endlilv >= parseFloat(item.lilv) && parseFloat(item.lilv) >= startlilv) {
            result = true;
        } else { result = false; }
        if (objsett.huan.indexOf(item.huan) < 0)
            result = false;
        if (objsett.type.indexOf(item.type) < 0)
            result = false;
    }
    return result;
};