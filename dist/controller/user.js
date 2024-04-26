"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrapperController = void 0;
const axios_1 = __importDefault(require("axios"));
const helper_1 = require("../helper/helper");
async function scrapperController(req, res, next) {
    try {
        // const getInit = await (await axios.get("https://twitter.com/coindesk",{
        //     headers: {
        //         "Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7",
        //         "Accept-Encoding": "gzip, deflate, br",
        //         "Accept-Language":"en-GB,en-US;q=0.9,en;q=0.8",
        //         "Connection":"keep-alive",
        //         "Host":"twitter.com",
        //         "sec-ch-ua":'"Chromium";v="94", "Google Chrome";v="94", ";Not A Brand";v="99"',
        //         "sec-ch-ua-mobile":"?0",
        //         "sec-ch-ua-platform":"macOS",
        //         "Sec-Fetch-Dest":"document",
        //         "Sec-Fetch-Mode":"navigate",
        //         "Sec-Fetch-Site":"none",
        //         "Sec-Fetch-User":"?1",
        //         "Upgrade-Insecure-Requests":"1",
        //         'User-Agent': "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
        //     }
        // })).data;
        // const initCookies = extractCookiesFromScriptTag1(getInit);
        // const updatedCookies = addGuestId(initCookies).split('>')[0];
        // console.log("updatedCookies",updatedCookies.split('gt=')[1])
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: 'https://api.twitter.com/graphql/9zyyd1hebl7oNWIPdA8HRw/UserTweets?variables=%7B%22userId%22%3A%22874564226848886784%22%2C%22count%22%3A20%2C%22includePromotedContent%22%3Atrue%2C%22withQuickPromoteEligibilityTweetFields%22%3Atrue%2C%22withVoice%22%3Atrue%2C%22withV2Timeline%22%3Atrue%7D&features=%7B%22rweb_tipjar_consumption_enabled%22%3Atrue%2C%22responsive_web_graphql_exclude_directive_enabled%22%3Atrue%2C%22verified_phone_label_enabled%22%3Afalse%2C%22creator_subscriptions_tweet_preview_api_enabled%22%3Atrue%2C%22responsive_web_graphql_timeline_navigation_enabled%22%3Atrue%2C%22responsive_web_graphql_skip_user_profile_image_extensions_enabled%22%3Afalse%2C%22communities_web_enable_tweet_community_results_fetch%22%3Atrue%2C%22c9s_tweet_anatomy_moderator_badge_enabled%22%3Atrue%2C%22articles_preview_enabled%22%3Atrue%2C%22tweetypie_unmention_optimization_enabled%22%3Atrue%2C%22responsive_web_edit_tweet_api_enabled%22%3Atrue%2C%22graphql_is_translatable_rweb_tweet_is_translatable_enabled%22%3Atrue%2C%22view_counts_everywhere_api_enabled%22%3Atrue%2C%22longform_notetweets_consumption_enabled%22%3Atrue%2C%22responsive_web_twitter_article_tweet_consumption_enabled%22%3Atrue%2C%22tweet_awards_web_tipping_enabled%22%3Afalse%2C%22creator_subscriptions_quote_tweet_preview_enabled%22%3Afalse%2C%22freedom_of_speech_not_reach_fetch_enabled%22%3Atrue%2C%22standardized_nudges_misinfo%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_limited_actions_policy_enabled%22%3Atrue%2C%22tweet_with_visibility_results_prefer_gql_media_interstitial_enabled%22%3Atrue%2C%22rweb_video_timestamps_enabled%22%3Atrue%2C%22longform_notetweets_rich_text_read_enabled%22%3Atrue%2C%22longform_notetweets_inline_media_enabled%22%3Atrue%2C%22responsive_web_enhance_cards_enabled%22%3Afalse%7D&fieldToggles=%7B%22withArticlePlainText%22%3Afalse%7D',
            headers: {
                'authorization': 'Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA',
                'Cookie': 'guest_id_marketing=v1%3A171414752185850408; guest_id_ads=v1%3A171414752185850408; guest_id=v1%3A171414752185850408; personalization_id="v1_sR+lquUVw3BmDHZgfyAbzw=="; gt=1783890118127784269; _ga=GA1.2.697669370.1714147529; _gid=GA1.2.1654427828.1714147529',
                'x-guest-token': "1783890118127784269"
            }
        };
        const data = await axios_1.default.request(config);
        const tweets = data?.data?.data?.user?.result?.timeline_v2?.timeline?.instructions;
        if (!tweets) {
            console.log('No tweets found');
            return res.status(404).json({ message: "No tweets found" });
        }
        else {
            console.log('Tweets found');
            const TimelinePinEntry = tweets.filter((tweet) => {
                if (tweet.type === 'TimelinePinEntry') {
                    return tweet;
                }
            });
            const TimelineAddEntries = tweets.filter((tweet) => {
                if (tweet.type === 'TimelineAddEntries') {
                    return tweet;
                }
            })[0]?.entries;
            const TrimmedTimelinePinEntry = TimelineAddEntries.map((tweetz) => {
                return {
                    entryId: tweetz?.entryId,
                    sortIndex: tweetz?.sortIndex,
                    entryType: tweetz?.content?.entryType,
                    itemType: tweetz?.content?.itemContent?.itemType,
                    description: tweetz?.content?.itemContent?.tweet_results?.result?.core?.user_results?.result?.legacy?.description,
                    created_at: tweetz?.content?.itemContent?.tweet_results?.result?.core?.user_results?.result?.legacy?.created_at,
                    url: tweetz?.content?.itemContent?.tweet_results?.result?.core?.user_results?.result?.legacy?.entities?.url?.urls,
                    full_text: tweetz?.content?.itemContent?.tweet_results?.result?.legacy?.full_text,
                    tweetmedia: tweetz?.content?.itemContent?.tweet_results?.result?.legacy?.entities,
                    retweetmedia: tweetz?.content?.itemContent?.tweet_results?.result?.legacy?.retweeted_status_result?.result?.legacy?.entities
                };
            });
            const videoLinksArray = (0, helper_1.extractVideoLinks)(TrimmedTimelinePinEntry);
            const retweetsVid = (0, helper_1.filterVideoObjects)(TimelinePinEntry);
            return res.status(200).json({
                TimelinePinEntry,
                retweetsVideo: retweetsVid,
                TrimmedTimelinePinEntry,
                videoLinksArray
            });
        }
    }
    catch (error) {
        return res.status(error?.response?.status || 500).json({ message: "An error occurred", error: error?.response?.data?.errors || error.message });
    }
}
exports.scrapperController = scrapperController;
