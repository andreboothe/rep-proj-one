// Constants
import {AIRBNB_ROUTE, EBAY_ROUTE} from '../../constants';

// Extractors
import AirbnbExtractor from './AirbnbExtractor';
import EbayExtractor from './EbayExtractor';

const  extractorSelector = (route) => {
    switch(route) {
        case AIRBNB_ROUTE:
            return new AirbnbExtractor();
        case EBAY_ROUTE:
            return new  EbayExtractor();
        default:
            return 'route not defined';
    }
}

export default extractorSelector;