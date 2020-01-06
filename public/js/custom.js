function textAreaAdjust(o) {
    o.style.height = "1px";
    o.style.height = (25+o.scrollHeight)+"px";
}

function confirmBox(id) {
    const sure = confirm("Xác nhận xóa?");
    if (sure) {
        window.location.href = '/sales/remove/' + id;
    }    
    return false;
}