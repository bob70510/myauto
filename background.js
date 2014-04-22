chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (msg) {
        if (undefined != msg.notification) {
            var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
            var hour = time[1] % 12 || 12;               // The prettyprinted hour.
            var period = time[1] < 12 ? '上午' : '下午'; // The period of the day.
            var notification = window.webkitNotifications.createNotification('images/tit_48.png', hour + time[2] + ' ' + period, msg.notification);
            notification.show();
            notification.onclick = function () { window.open("http://www.my089.com/Loan/" + msg.details) };
        } else {
            localStorage.setItem("muauto", msg.name);
        }
    });
});
//function genericOnClick(info, tab) {
//    console.log(info);
//    console.log(tab);
//    var checked = info.checked ? 'disabled' : 'enabled';
//    chrome.tabs.getSelected(tab.id, function (tab) {
//        chrome.tabs.sendMessage(tab.id, { refresh: checked }, function (response) {
//        });
//    });
//}
//var id = chrome.contextMenus.create({ type: "checkbox", "title": "是否禁用刷新", "contexts": ["all"], "onclick": genericOnClick });
