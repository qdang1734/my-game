// Hàm chính để khởi tạo giao diện và chức năng của ví
function initializeWalletPage() {
    console.log("Attempting to initialize wallet UI...");

    // Kiểm tra lại lần nữa để chắc chắn thư viện đã tồn tại
    if (typeof TonConnectUI === 'undefined') {
        console.error('FATAL: TonConnectUI is still not defined. Initialization aborted.');
        alert('Lỗi nghiêm trọng: Không thể tải thư viện ví. Vui lòng kiểm tra kết nối mạng và thử lại.');
        return;
    }
    
    console.log("TonConnectUI library confirmed. Setting up the wallet page.");

    // 1. Khởi tạo TonConnectUI
    const tonConnectUI = new TonConnectUI.TonConnectUI({
        manifestUrl: 'https://my-game-six-mu.vercel.app/tonconnect-manifest.json',
        buttonRootId: 'connect-button-container'
    });

    // Lấy các phần tử trên trang
    const disconnectBtn = document.getElementById('disconnect-button');
    const statusElement = document.getElementById('status');
    const addressElement = document.getElementById('address');

    // 2. Lắng nghe thay đổi trạng thái ví
    tonConnectUI.onStatusChange(wallet => {
        if (wallet) {
            const connectedAddress = TonConnectUI.toUserFriendlyAddress(wallet.account.address);
            statusElement.textContent = 'Đã kết nối';
            addressElement.textContent = connectedAddress.slice(0, 6) + '...' + connectedAddress.slice(-4);
            disconnectBtn.style.display = 'block';
        } else {
            statusElement.textContent = 'Chưa kết nối';
            addressElement.textContent = '...';
            disconnectBtn.style.display = 'none';
        }
    });

    // 3. Xử lý nút ngắt kết nối
    disconnectBtn.addEventListener('click', () => {
        tonConnectUI.disconnect();
    });

    // Xử lý các nút chức năng mẫu
    document.getElementById('deposit-button').addEventListener('click', () => alert('CHỨC NĂNG ĐANG PHÁT TRIỂN!'));
    document.getElementById('withdraw-button').addEventListener('click', () => alert('CHỨC NĂNG ĐANG PHÁT TRIỂN!'));
}

// Hàm này sẽ liên tục kiểm tra xem thư viện TonConnectUI đã được tải xong chưa
function waitForLibraryAndInit() {
    // Nếu biến TonConnectUI đã tồn tại trong window (tức là thư viện đã tải xong)
    if (typeof TonConnectUI !== 'undefined') {
        // Gọi hàm khởi tạo chính
        initializeWalletPage();
    } else {
        // Nếu chưa, đợi 100 mili giây rồi kiểm tra lại
        setTimeout(waitForLibraryAndInit, 100);
    }
}

// Bắt đầu quá trình chờ đợi ngay khi cấu trúc trang HTML đã sẵn sàng
document.addEventListener('DOMContentLoaded', waitForLibraryAndInit);
