#!/bin/bash

# Thay đổi các thông số này cho phù hợp với VPS và Telegram Bot của bạn
echo -n "Nhập ip vps: "
read HOST
TELEGRAM_BOT_TOKEN="6139932730:AAEnb1culzUcPdRfKxXO20bl5LrkQ4eJQFs"
TELEGRAM_CHAT_ID="-865693891"

# Kiểm tra kết nối tới VPS bằng ping
if ! ping -c 1 "$HOST" > /dev/null; then
  # Nếu kết nối thất bại, gửi thông báo tới Telegram
  MESSAGE="VPS "$HOST" is down!"
  curl -s -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage" \
    -d chat_id="${TELEGRAM_CHAT_ID}" \
    -d text="${MESSAGE}"
fi
