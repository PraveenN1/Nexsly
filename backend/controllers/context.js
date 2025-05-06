const UserContext = require("../models/Context");
const geoip = require("geoip-lite");

const getCurrentContextData = (req) => {
  const ipAddress = req.clientIp || "unknown";
  const location = geoip.lookup(ipAddress) || "unknown";
  const country = location.country ? location.country.toString() : "unknown";
  const city = location.city ? location.city.toString() : "unknown";
  const browser = req.useragent.browser
    ? `${req.useragent.browser} ${req.useragent.version}`
    : "unknown";
  const device = req.useragent.device
    ? req.useragent.device.toString()
    : "unknown";

  const isMobile = req.useragent.isMobile || false;
  const isDesktop = req.useragent.isDesktop || false;
  const isTablet = req.useragent.isTablet || false;

  const deviceType = isMobile
    ? "Mobile"
    : isDesktop
    ? "Desktop"
    : isTablet
    ? "Tablet"
    : "unknown";

  return {
    ipAddress,
    country,
    city,
    device,
    browser,
    deviceType,
  };
};

const addContextData = async (req, res) => {
  const userId = req.userId;
  const ipAddress = req.ip || "unknown";
  const location = geoip.lookup(ip) || "unknown";
  const country = location.country ? location.country.toString() : "unknown";
  const city = location.city ? location.city.toString() : "unknown";
  const browser = req.useragent.browser
    ? `${req.useragent.browser} ${req.useragent.version}`
    : "unknown";
  const device = req.useragent.device
    ? req.useragent.device.toString()
    : "unknown";

  const isMobile = req.useragent.isMobile || false;
  const isDesktop = req.useragent.isDesktop || false;
  const isTablet = req.useragent.isTablet || false;

  const deviceType = isMobile
    ? "Mobile"
    : isDesktop
    ? "Desktop"
    : isTablet
    ? "Tablet"
    : "unknown";

    const newUserContext=new UserContext({
        userId:userId,
        ipAddress,
        country,
        city,
        device,
        browser,
        deviceType,
    })
    try{
        await newUserContext.save();
        res.status(200).json({
            message:""
        });
    }catch(error){
        res.status(500).json({message:error});
    }
};

module.exports = {
  getCurrentContextData,
  addContextData
};
