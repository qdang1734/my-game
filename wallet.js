// Chạy code sau khi toàn bộ trang đã được tải và sẵn sàng
document.addEventListener('DOMContentLoaded', function () {
    // Kiểm tra xem biến TonConnectUI có tồn tại không
    if (typeof TonConnectUI === 'undefined') {
        console.error('TonConnectUI is not defined. Make sure the library is loaded.');
        alert('Lỗi: Không thể tải thư viện ví. Vui lòng thử lại.');
        return;
    }

    // 1. Khởi tạo TonConnectUI
    const tonConnectUI = new TonConnectUI.TonConnectUI({
        // URL đến file manifest, phải là đường dẫn tuyệt đối và chính xác
        manifestUrl: 'https://my-game-six-mu.vercel.app/tonconnect-manifest.json',
        // ID của thẻ div mà nút "Connect Wallet" sẽ được chèn vào
        buttonRootId: 'connect-button-container'
    });

    // Lấy các phần tử trên trang để tương tác
    const disconnectBtn = document.getElementById('disconnect-button');
    const statusElement = document.getElementById('status');
    const addressElement = document.getElementById('address');

    // 2. Lắng nghe và xử lý sự kiện thay đổi trạng thái của ví
    tonConnectUI.onStatusChange(wallet => {
        if (wallet) {
            // --- Trạng thái: ĐÃ KẾT NỐI ---
            const connectedAddress = TonConnectUI.toUserFriendlyAddress(wallet.account.address);
            
            // Cập nhật giao diện
            statusElement.textContent = 'Đã kết nối';
            addressElement.textContent = connectedAddress.slice(0, 6) + '...' + connectedAddress.slice(-4);
            disconnectBtn.style.display = 'block'; // Hiển thị nút "Ngắt kết nối"

        } else {
            // --- Trạng thái: CHƯA KẾT NỐI ---
            
            // Cập nhật giao diện
            statusElement.textContent = 'Chưa kết nối';
            addressElement.textContent = '...';
            disconnectBtn.style.display = 'none'; // Ẩn nút "Ngắt kết nối"
        }
    });

    // 3. Gán sự kiện cho nút ngắt kết nối
    disconnectBtn.addEventListener('click', () => {
        tonConnectUI.disconnect();
    });

    // --- XỬ LÝ CÁC NÚT CHỨC NĂNG MẪU ---
    const depositBtn = document.getElementById('deposit-button');
    const withdrawBtn = document.getElementById('withdraw-button');

    depositBtn.addEventListener('click', () => {
        alert('CHỨC NĂNG ĐANG PHÁT TRIỂN!\nĐể nạp tiền, bạn cần gửi TON vào địa chỉ ví của game (địa chỉ này sẽ do backend cung cấp).');
    });

    withdrawBtn.addEventListener('click', () => {
        const amount = document.getElementById('withdraw-amount').value;
        if (amount) {
            alert(`Yêu cầu rút ${amount} TON đã được gửi đi!\n(Đây là chức năng mẫu, chưa có giao dịch thật)`);
        } else {
            alert('Vui lòng nhập số lượng TON muốn rút.');
        }
    });
});
