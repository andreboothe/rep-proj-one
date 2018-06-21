import React, { Component } from 'react';
import './App.css';
import fetch from 'isomorphic-fetch';
import extractorSelector from '../components/ContentExtractor/extractorSelector';

// Constants
import {SERVER, REPUTATIONAIRE_END_POINT, AIRBNB_ROUTE, EBAY_ROUTE} from '../constants';


class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoadedContent: false,
      extractedContent: {},
      extractedContentFormatted: '',
      loadedContent: null,
      input: ''
    };
  }


  onChangeUpdateInput = (event) => {
    const inputValue = event.target.value;
    this.setState({input: inputValue});
  }

  getContentRoute = () => {
    
    const {input} = this.state;
    const airbnbRegex = new RegExp('www.airbnb.com');
    const ebayRegex = new RegExp('www.ebay.com');

    let contentRoute = '';
    contentRoute += (airbnbRegex.test(input))? AIRBNB_ROUTE : '';
    contentRoute += (ebayRegex.test(input))? EBAY_ROUTE : '';

    return contentRoute;
  }

  contentLoader = (contentRoute) => {
    return fetch(`${SERVER}${contentRoute}`)
        .then(response => response.text())
        .then(html  => {
          this.setState({
            loadedContent: html,
            isLoadedContent: true
          });
        })
        .then(() => {
         
          const extractor = extractorSelector(contentRoute);
          const extractedContentFormatted = extractor.toString();
          
          this.setState({
            extractedContent: extractor.getExtractedContent(),
            extractedContentFormatted
          });
        })
        .catch(error => console.error(error));
  }

  noContent = () => {
    this.setState({
      isLoadedContent: false,
      loadedContent: null
    });
  }


  onClickLoadContent = () => {
    const contentRoute = this.getContentRoute();
    const isValidContentRoute = (contentRoute.length > 0)? true : false;

    if(isValidContentRoute) {

      return this.contentLoader(contentRoute);

    } else {

      this.noContent();

    }
  }

  onClickPostContent = () => {
    const { extractedContent} = this.state;
    const data = extractedContent;

    return fetch(REPUTATIONAIRE_END_POINT, {
        body: JSON.stringify(data),
        method: 'POST' 
    })
    .then(response => response.json())
    .catch(error => error);
    
}

  render() {
   
    const {isLoadedContent, loadedContent, extractedContentFormatted} = this.state;
    const additionalContentFeatures = isLoadedContent
    ? <div className="extra-features">
        <button onClick={this.onClickPostContent} id="confirm-btn" className="my-btn">I confirm this is my account</button>
        <div id="extracted-content" >{extractedContentFormatted}</div>
      </div>
    : <div></div>;

    return (
      <section className="App">
        
        <div className="container">
            <div className="input-section">
                <input onChange={this.onChangeUpdateInput} id="input-field" type="text" name="url" />
                <button onClick={this.onClickLoadContent} id="load-btn" className="my-btn">Load Account</button>
            </div>
            
            <div id="my-frame" dangerouslySetInnerHTML={{__html: loadedContent}}></div>

            {additionalContentFeatures}
        </div> 
       
      </section>
    );
  }
}

export default App;
