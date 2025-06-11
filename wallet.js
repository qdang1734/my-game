// Hàm chính để khởi tạo giao diện và chức năng của ví
function initializeWalletPage() {
    console.log("SUCCESS: TonConnectUI library is available. Initializing the wallet UI...");

    // 1. Khởi tạo TonConnectUI với danh sách ví cụ thể
    const tonConnectUI = new TonConnectUI.TonConnectUI({
        manifestUrl: 'https://my-game-six-mu.vercel.app/tonconnect-manifest.json',
        buttonRootId: 'connect-button-container',
        // Thêm tham số này để ưu tiên các ví, bao gồm cả ví trong Telegram (TON Space)
        walletsListConfiguration: {
          includeWallets: [
            {
              appName: "tonkeeper",
              name: "Tonkeeper",
              imageUrl: "https://s.tonkeeper.com/s/ico/ico-tonkeeper-288.png"
            },
            {
              appName: "nicegramWallet",
              name: "Nicegram Wallet",
              imageUrl: "https://static.nicegram.app/icon.png"
            }
          ]
        }
    });
    
    console.log("TonConnectUI instance created.");

    // Lấy các phần tử trên trang
    const disconnectBtn = document.getElementById('disconnect-button');
    const statusElement = document.getElementById('status');
    const addressElement = document.getElementById('address');

    // 2. Lắng nghe thay đổi trạng thái ví
    tonConnectUI.onStatusChange(wallet => {
        if (wallet) {
            console.log("Wallet connected:", wallet);
            const connectedAddress = TonConnectUI.toUserFriendlyAddress(wallet.account.address);
            statusElement.textContent = 'Đã kết nối';
            addressElement.textContent = connectedAddress.slice(0, 6) + '...' + connectedAddress.slice(-4);
            disconnectBtn.style.display = 'block';
        } else {
            console.log("Wallet disconnected.");
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
let retryCount = 0;
function waitForLibraryAndInit() {
    console.log(`Checking for TonConnectUI library... Attempt: ${retryCount + 1}`);
    retryCount++;

    // Nếu biến TonConnectUI đã tồn tại trong window (tức là thư viện đã tải xong)
    if (typeof TonConnectUI !== 'undefined') {
        // Gọi hàm khởi tạo chính
        initializeWalletPage();
    } else {
        // Nếu chưa, đợi 200 mili giây rồi kiểm tra lại. Tối đa 50 lần (10 giây)
        if (retryCount < 50) {
            setTimeout(waitForLibraryAndInit, 200);
        } else {
            console.error('TIMEOUT: TonConnectUI library did not load after 10 seconds.');
            alert('Lỗi: Không thể tải thư viện ví sau nhiều lần thử. Vui lòng kiểm tra lại kết nối mạng và thử tải lại trang.');
        }
    }
}

// Bắt đầu quá trình chờ đợi ngay khi cấu trúc trang HTML đã sẵn sàng
document.addEventListener('DOMContentLoaded', waitForLibraryAndInit);
