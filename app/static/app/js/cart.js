// var updateBtns = document.getElementsByClassName('update-cart')
// for (i = 0; i < updateBtns.length; i++) {
//     updateBtns[i].addEventListener('click', function () {
//         var productId = this.dataset.product
//         var action = this.dataset.action
//         console.log('productId', productId, 'action', action)
//         if (user === "AnonymousUser") {
//             console.log('user not logged')
//         } else {
//             // console.log('user Logged in')
//             updateUserOrder(productId, action)
//         }

//     })
// }
// function updateUserOrder(productId, action) {
//     console.log('user Logged in')
//     var url = "/update_item/"
//     fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//             'X-CSRFToken': csrftoken
//         },
//         body: JSON.stringify({ 'productId': productId, 'action': action })

//     })
//         .then((response) => {
//             return response.json()
//         })
//         .then((data) => {
//             // response.json()
//             console.log('data', data)
//         })
// }
//
var updateBtns = document.getElementsByClassName('update-cart');
for (var i = 0; i < updateBtns.length; i++) {
    updateBtns[i].addEventListener('click', function () {
        var productId = this.dataset.product;
        var action = this.dataset.action;
        console.log('productId', productId, 'action', action);

        // Kiểm tra người dùng đã đăng nhập hay chưa
        if (typeof user !== 'undefined') {
            if (user === "AnonymousUser") {
                // Xử lý khi người dùng chưa đăng nhập
                console.log('User not logged in');
                // Hiển thị thông báo hoặc chuyển hướng người dùng đến trang đăng nhập
            } else {
                // Thực hiện cập nhật giỏ hàng nếu người dùng đã đăng nhập
                console.log('User logged in');
                updateUserOrder(productId, action);
            }
        } else {
            console.log('User variable is not defined');
        }
    });
}

function updateUserOrder(productId, action) {
    console.log('Updating user order...');
    var url = "/update_item/";
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken
        },
        body: JSON.stringify({ 'productId': productId, 'action': action })
    })
        .then(response => response.json())
        .then(data => {
            console.log('Response:', data);
            // Xử lý dữ liệu phản hồi tại đây nếu cần
        })
        .catch(error => {
            console.error('Error:', error);
        });
}
