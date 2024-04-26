"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addGuestId = exports.extractCookiesFromScriptTag1 = exports.filterVideoObjects = exports.extractVideoLinks = exports.sendEmail = void 0;
const nodemailer = require("nodemailer");
async function sendEmail(videoUrl) {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: "oluwolejohn72@gmail.com",
                pass: "Ayokunle@15",
            },
        });
        const mailOptions = {
            from: "your_email@gmail.com",
            to: "recipient_email@example.com",
            subject: "New video post on Twitter",
            text: `Check out this video: ${videoUrl}`,
        };
        await transporter.sendMail(mailOptions);
        console.log("Email sent successfully");
    }
    catch (error) {
        console.error("Error sending email:", error);
    }
}
exports.sendEmail = sendEmail;
function extractVideoLinks(data) {
    const videoLinks = [];
    data.forEach((tweet) => {
        if (tweet.tweetmedia && tweet.tweetmedia.media) {
            tweet.tweetmedia.media.forEach((media) => {
                if (media.type === "video") {
                    videoLinks.push(media.url);
                }
            });
        }
        if (tweet.url) {
            tweet.url.forEach((url) => {
                if (url.expanded_url.includes("youtube.com") ||
                    url.expanded_url.includes("video.twimg.com") ||
                    url.expanded_url.includes("twitter.com") // Handle Twitter video links
                ) {
                    videoLinks.push(url.expanded_url);
                }
            });
        }
    });
    return videoLinks;
}
exports.extractVideoLinks = extractVideoLinks;
function filterVideoObjects(data) {
    const videoObjects = [];
    data.forEach((item) => {
        //console.log("item", item)
        if (item?.entry?.content?.itemContent?.tweet_results?.result) {
            const tweetEntry = item.entry.content.itemContent.tweet_results.result?.legacy?.entities?.media;
            console.log("tweetEntry", tweetEntry);
            const tweetEntryExt = item.entry.content.itemContent.tweet_results.result?.legacy?.extended_entities?.media;
            if (tweetEntry) {
                const media = tweetEntry;
                if (media && Array.isArray(media)) {
                    media.forEach((m) => {
                        if (m?.type === "video") {
                            videoObjects.push(m?.video_info?.variants || "");
                        }
                    });
                }
            }
            if (tweetEntryExt) {
                const media = tweetEntry;
                if (media && Array.isArray(media)) {
                    media.forEach((m) => {
                        if (m?.type === "video") {
                            videoObjects.push(m?.expanded_url || "");
                        }
                    });
                }
            }
        }
    });
    return [...new Set(videoObjects)];
}
exports.filterVideoObjects = filterVideoObjects;
function extractCookiesFromScriptTag1(scriptContent) {
    const cookieRegex = /document\.cookie\s*=\s*"([^"]+)"/g;
    const specialCookieRegex = /"([^"]+)="([^"]+)";/g;
    const extractedCookies = {};
    let match;
    while ((match = cookieRegex.exec(scriptContent)) !== null) {
        const cookieString = match[1];
        const [cookieName, cookieValue] = cookieString.split(';')[0].split('=').map(part => part.trim());
        extractedCookies[cookieName] = cookieValue;
    }
    while ((match = specialCookieRegex.exec(scriptContent)) !== null) {
        const cookieName = match[1];
        const cookieValue = match[2];
        extractedCookies[cookieName] = cookieValue.replace(/\\"/g, '"').replace(/\\(?![bfnrt"])/g, '');
    }
    const formattedCookies = Object.entries(extractedCookies).map(([name, value]) => `${name}=${value}`).join('; ');
    return formattedCookies;
}
exports.extractCookiesFromScriptTag1 = extractCookiesFromScriptTag1;
function addGuestId(cookieString) {
    const cookies = cookieString.split('; ');
    let guestIdAdsIndex = -1;
    cookies.forEach((cookie, index) => {
        const [name] = cookie.split('=');
        if (name === 'guest_id_ads') {
            guestIdAdsIndex = index;
        }
    });
    if (guestIdAdsIndex !== -1) {
        const [_, guestIdAdsValue] = cookies[guestIdAdsIndex].split('=');
        const guestIdCookie = `guest_id=${guestIdAdsValue}`;
        cookies.splice(guestIdAdsIndex + 1, 0, guestIdCookie);
    }
    const updatedCookieString = cookies.join('; ');
    return updatedCookieString;
}
exports.addGuestId = addGuestId;
