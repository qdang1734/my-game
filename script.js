document.addEventListener('DOMContentLoaded', function() {
    let tg = window.Telegram.WebApp;
    tg.ready();

    let userInfoElement = document.getElementById('user-info');
    if (tg.initDataUnsafe.user) {
        userInfoElement.innerHTML = `Xin chào, <strong>${tg.initDataUnsafe.user.first_name}</strong>!`;
    } else {
        userInfoElement.textContent = "Không thể lấy thông tin. Hãy mở game qua Telegram.";
    }

    let myButton = document.getElementById('my-button');
    myButton.addEventListener('click', function() {
        tg.showAlert('Bạn đã nhấn nút!');
    });
});