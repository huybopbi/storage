# Tool install x-ui
xanhluc='\033[1;32m'   
vang='\033[1;33m'      
lam='\033[1;34m'        
tim='\033[1;35m'           
plain='\033[0m'
cur_dir=$(pwd)  
# Check Root VPS
[[ $EUID -ne 0 ]] && echo -e "${tim}Chú ý：${plain}Tập lệnh này phải được chạy với user root ${tim}(root)! \n ${tim}➫Vui Lòng Gõ Lệnh: ${lam}sudo -i \n ➬Để Kích Hoạt Root, và thử lại lần nữa \n${vang}➲〖PQHDZ〗${plain} " && exit 1
# Script
apt-get update -y
sudo apt install speedtest-cli
clear
# Cài Đặt X-UI và mở port
bash <(curl -Ls https://raw.githubusercontent.com/huybopbi/storage/master/File/xui.sh)
echo "》『Mở Port: 54321』"
ufw allow 54321
echo "》『Mở Port: 443』 "
ufw allow 443
echo "》『Mở Port: 80』 "
ufw allow 80
echo -e "${tim}════════════════════════════════════════════════════    ${plain}"           
echo -e "${vang}✔•Đã Hoàn Tất Cài Đặt X-UI•✔ ${plain}" 
echo -e "${tim}════════════════════════════════════════════════════    ${plain}"
echo -e "${xanhluc}1.Truy Cập Vào Trình duyệt ${tim}(Chrome)${plain} hoặc ${tim}(Cốc Cốc) ${plain}"
echo -e "2.Nhập『Địa Chỉ IPv4』của VPS hoặc『Tên Miền』Thêm Đuôi "${tim}:54321${plain}"  "
echo -e "➩Tài Khoảng(Username) » ${tim}admin ${plain}  "
echo -e "➩Mật Khẩu(Password)   » ${tim}admin ${plain}  "
echo -e "${tim}════════════════════════════════════════════════════    ${plain}"
echo -e "${lam}✘Sau Khi Đăng Nhập Vui Lòng Đổi (Mật Khẩu) để tránh bị lộ thông tin. "
echo -e "▂ ▄ ▅ ▇【Copyright © PQHDZ】▇ ▆ ▄ ▂   "
echo -e "${tim}════════════════════════════════════════════════════    ${plain}"
echo -e "${lam}【KIỂM TRA TỐC ĐỘ MẠNG VPS】${tim}"
speedtest-cli
