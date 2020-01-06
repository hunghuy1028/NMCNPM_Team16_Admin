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

function confirmBoxAccount(id) {
    const sure = confirm("Xác nhận xóa?");
    if (sure) {
        window.location.href = '/staff/remove/' + id;
    }    
    return false;
}

function confirmShowtimeBox(id) {
    const sure = confirm("Xác nhận xóa?");
    if (sure) {
        window.location.href = '/showtimes/remove/' + id;
    }    
    return false;
}

$(function () {
    $('#addNewShowtime').submit(function() {
        $.ajax({
            url: '/showtimes/add',
            type: 'POST',
            data: {
                movie: $('#movie').val(),
                cinema: $('#cinema').val(),
                datetime: $('#datetime').val()
            },
            success: (err) => {
                if (err) {
                    if (err == "Invalid Time") {
                        alert("Bị trùng các suất chiếu hiện tại")
                    } else {
                        alert("Đã có lỗi xảy ra");
                    }
                } else window.location.href="/showtimes/";
            }        
        })
    })
})

$(function() {
    $('#viewreport').on('click', function() {
        if (!$('#month').val()) {
            alert("Vui lòng chọn tháng");
            return false;
        }
        if (!$('#year').val()) {
            alert("Vui lòng chọn năm");
            return false;
        }
        $.ajax({
            url: '/reports/getmonthdata',
            type: 'GET',
            data: {
                month: $('#month').val(),
                year: $('#year').val()
            },
            dataType: 'JSON',
            success: (res) => {
                const ticket = res.ticketCount;
                const revenue = res.monthRevenue;
                $('#monthReport').html('<tr></tr>');
                let labels = [];
                let sumTicket = 0;
                let sumRevenue = 0;
                for (let i=0;i<ticket.length;i++) {
                    labels[i]=(i+1);
                    sumTicket += ticket[i];
                    sumRevenue += revenue[i];
                    $('#monthReport').append(
                        '<tr>\
                        <td>'+ (i+1) +'</td>\
                        <td>'+ ticket[i] +'</td>\
                        <td>'+ revenue[i] +'</td>\
                        </tr>'
                    );
                }
                $('#monthReport').append(
                    '<tr>\
                    <td>Tổng: </td>\
                    <td>'+ sumTicket +'</td>\
                    <td>'+ sumRevenue +'</td>\
                    </tr>'
                );
                const input = [];
                input.push(revenue);
                const info = {
                    labels: labels,
                    series: input
                }
                drawChart(info);
            }
        })
    })
})

function drawChart(data) {

    options = {
        height: 300,
        showArea: true,
        showLine: false,
        showPoint: false,
        fullWidth: true,
        axisX: {
            showGrid: false
        },
        lineSmooth: false,
    };

    new Chartist.Line('#monthChart', data, options);
}