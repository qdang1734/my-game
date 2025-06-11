document.addEventListener('DOMContentLoaded', function () {
    // 1. Khởi tạo TonConnectUI
    const tonConnectUI = new TonConnectUI.TonConnectUI({
        manifestUrl: 'https://my-game-six-mu.vercel.app/tonconnect-manifest.json', // Sẽ sửa URL này sau
        buttonRootId: 'connect-button-container'
    });

    const disconnectBtn = document.getElementById('disconnect-button');
    const statusElement = document.getElementById('status');
    const addressElement = document.getElementById('address');

    // 2. Theo dõi trạng thái kết nối của ví
    tonConnectUI.onStatusChange(wallet => {
        if (wallet) {
            // Đã kết nối
            const connectedAddress = TonConnectUI.toUserFriendlyAddress(wallet.account.address);
            statusElement.textContent = 'Đã kết nối';
            addressElement.textContent = connectedAddress.slice(0, 6) + '...' + connectedAddress.slice(-4);
            disconnectBtn.style.display = 'block';
        } else {
            // Chưa kết nối
            statusElement.textContent = 'Chưa kết nối';
            addressElement.textContent = '...';
            disconnectBtn.style.display = 'none';
        }
    });

    // 3. Xử lý nút ngắt kết nối
    disconnectBtn.addEventListener('click', () => {
        tonConnectUI.disconnect();
    });

    // --- CÁC CHỨC NĂNG MẪU ---
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