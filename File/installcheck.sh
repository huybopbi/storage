wget https://raw.githubusercontent.com/huybopbi/storage/master/File/check.sh
chmod +x check.sh
bash check.sh
0 6 * * * /path/to/check.sh >/dev/null 2>&1
