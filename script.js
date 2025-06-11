window.addEventListener('load', function() {
    // Kiểm tra xem Telegram Web App API có sẵn không
    if (window.Telegram && window.Telegram.WebApp) {
        let tg = window.Telegram.WebApp;
        
        // Báo cho Telegram biết là web app đã sẵn sàng
        tg.ready();
        
        // Mở rộng app ra toàn màn hình
        tg.expand();

        // Lấy tên người dùng và hiển thị
        let userNameElement = document.getElementById('user-name');
        if (tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.first_name) {
            userNameElement.textContent = tg.initDataUnsafe.user.first_name;
        } else {
            // Tên mặc định nếu không lấy được
            userNameElement.textContent = "Guest";
        }
    } else {
        console.log("Telegram Web App API not found.");
    }
});