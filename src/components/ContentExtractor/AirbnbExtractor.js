import {CONTENT_LOADER_FRAME} from '../../constants';

class AirbnbExtractor {
    constructor() {
        this.extractedContent = this.extractor();
        this.website = 'airbnb.com';
    }

    extractor = () => {
        let extractedContent = {};
        const frame = document.querySelector(CONTENT_LOADER_FRAME);
        const page = frame.querySelector('main');
        const userName = page.querySelector('#user img').title;
        const verifiedInfo  = Array.from(page.querySelectorAll('ul'))
                                .filter(ul => ul.title === 'Verified info')[0]
                                .querySelectorAll('li');
        
        let verifiedInfoList = [];
        verifiedInfo.forEach((li) => {
            
            verifiedInfoList.push(li.querySelector('div').textContent);
        });

        const country = page.querySelector('.row .row .h5 a').textContent;

        let registeredDate = page.querySelector('.row .row .h5 span').textContent;
        registeredDate = registeredDate.replace(/(Joined in)/, '');

        const reviewCount = page.querySelector('#undefined_count').textContent;

        extractedContent = {
            userName,
            country,
            registeredDate,
            reviewCount,
            verifiedInfoList,
        }

        return extractedContent;
    }

    getExtractedContent = () => {
        return this.extractedContent;
    }

    toString = () => {
        const {userName, country, registeredDate, reviewCount, verifiedInfoList} = this.extractedContent;
        const reducer = (accumulator, currentVal, currentIndex) => {
            accumulator += (currentIndex === verifiedInfoList.length - 1)?` ${currentVal}`:` ${currentVal},`;
            return accumulator;
        };
        const verfiedString = verifiedInfoList.reduce(reducer,'');
    
        return `${userName}, ${country}, ${registeredDate}, ${reviewCount} reviews, ${verfiedString} `;
    }
}

export default AirbnbExtractor;