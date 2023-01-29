import os

class Config(object):
    API_ID = int(os.environ.get("APP_ID", "29309374"))
    API_HASH = os.environ.get("API_HASH", "be6f2df3b11f218a84c946c93421722e")
    BOT_TOKEN = os.environ.get("BOT_TOKEN", "5989285521:AAGVEzM2lQmV43vvWqdU7SyBxSUQkXgmkg8")
    STRING_SESSION = os.environ.get("STRING_SESSION", "1BVtsOIoBu1z4nM-LBnAnSEy4r1kTMBDqKCkkhmA6r52OMUi_33YMzLuhPPRursfFxgWnbV10wIj_b-PBfoRxS9oUui_yed4jOtlB4ofAsozyEwA1LC48joAMeDfw8g1e3aJwgwLDc-yvmzS_pRKnsNCUJGKzXv3U2JrcGAXLvjebx_IqIozjHM0TeKygygv2YyCEJe_5T0pgZ0HyS33wcjsF0PDOfnM_xuO5Qy0PXVcGd2bEbyEiItmE6gRngRAIAxf3-cndIjGBthWa4ABW33nwOJYLcn3AlwCD_7B5CER6RttzORjSi5cHhoxJTBGFpjfW9wNGmgruyM_i1BY0v2ynEx7PrHs=")
    MANAGEMENT_MODE = os.environ.get("MANAGEMENT_MODE", None)
    HEROKU_MODE = os.environ.get("HEROKU_MODE", None)
    BOT_USERNAME = os.environ.get("BOT_USERNAME", "vpnfastt2_bot")
    SUPPORT = os.environ.get("SUPPORT", "") # Your Support
    CHANNEL = os.environ.get("CHANNEL", "") # Your Channel
    START_IMG = os.environ.get("START_IMG", "https://telegra.ph/file/35a7b5d9f1f2605c9c0d3.png")
    CMD_IMG = os.environ.get("CMD_IMG", "https://telegra.ph/file/66518ed54301654f0b126.png")
    ASSISTANT_ID = int(os.environ.get("ASSISTANT_ID", "5828113524")) # telegram I'd not Username
    AUTO_LEAVE_TIME = int(os.environ.get("AUTO_LEAVE_ASSISTANT_TIME", "540000")) # in seconds
    AUTO_LEAVE = os.environ.get('AUTO_LEAVING_ASSISTANT', None) # Change it to "True"
