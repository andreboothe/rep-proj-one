import {CONTENT_LOADER_FRAME} from '../../constants';


class EbayExtractor {
    constructor() {
        this.extractedContent = this.extractor();
        this.website = 'ebay.com';
    }

    extractor = () => {
        let extractedContent = {};
        const frame = document.querySelector(CONTENT_LOADER_FRAME);
        const page = frame.querySelector('.page-container');

        const userInfo = page.querySelector('#user_info');
        const userData = userInfo.querySelectorAll('a'); 
        let data = "";
        userData.forEach(node => {
            data +=node.textContent;
        });
        data = data.replace(/(User ID\s)(\w+)(Feedback score\s)(\d+)/, '$2 $4').split(" ");

        const userID = data[0];
        const feedbackScore = data[1];

        let feedbackPercentage = userInfo.querySelector('.perctg').textContent;

        let feedbackRatings = '';
        const ratings = page.querySelector('#feedback_ratings').querySelectorAll('a'); //nodelist need for each
        ratings.forEach(node => {
            feedbackRatings+=node.textContent.replace(/(\d+)([a-zA-z]+)/, ' $1 $2 ');
        });

        extractedContent = {
            userID,
            feedbackScore,
            feedbackPercentage,
            feedbackRatings,
        };

        return extractedContent;
    }

    getExtractedContent = () => {
        return this.extractedContent;
    }

    toString = () => {
        const {userID, feedbackScore, feedbackPercentage, feedbackRatings} = this.extractedContent;
        return `${userID} (${feedbackScore}) ${feedbackPercentage} ${feedbackRatings}`;
    }
}

export default EbayExtractor;