wget https://raw.githubusercontent.com/huybopbi/storage/master/File/check.sh
chmod +x check.sh
bash check.sh
@daily /path/to/check_vps_status.sh >/dev/null 2>&1
