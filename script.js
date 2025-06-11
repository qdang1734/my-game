// Chạy code sau khi toàn bộ trang đã tải xong
window.addEventListener('load', function() {
    // Kiểm tra xem API của Telegram Web App có tồn tại không
    if (window.Telegram && window.Telegram.WebApp) {
        let tg = window.Telegram.WebApp;
        
        // Báo cho Telegram biết là web app đã sẵn sàng
        tg.ready();
        
        // Mở rộng app ra toàn màn hình để có trải nghiệm tốt nhất
        tg.expand();

        // Lấy thông tin người dùng và hiển thị tên
        const userNameElement = document.getElementById('user-name');
        if (tg.initDataUnsafe && tg.initDataUnsafe.user && tg.initDataUnsafe.user.first_name) {
            // Hiển thị tên người dùng nếu lấy được
            userNameElement.textContent = tg.initDataUnsafe.user.first_name;
        } else {
            // Đặt tên mặc định nếu không lấy được thông tin
            userNameElement.textContent = "Guest";
        }
    } else {
        // Ghi log ra console nếu không tìm thấy API (hữu ích khi debug trên trình duyệt)
        console.log("Telegram Web App API not found.");
        // Hiển thị tên mặc định nếu mở bằng trình duyệt thường
        document.getElementById('user-name').textContent = "Guest";
    }
});
