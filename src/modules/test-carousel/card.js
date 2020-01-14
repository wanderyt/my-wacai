import React from 'react';

import './card.scss';

const Card = ({eventData}) => {
  let {imageUrl, webURI, name, venueName, venue} = eventData;
  return (
    <div className="entity-card event">
      <div className="EventRedirection">
        <a href={`https://www.stubhub.com/${webURI}`} className="entity-card__link">
          <div>
            <div className="entity-card__banner">
              <img alt='event-img' className="entity-card__bkg-img" src={imageUrl} />
            </div>
            <div className="entity-card__contents">
              <div className="entity-card__time">
                <time>
                  <span>Tue, Sep 17</span> • <span>7:20 PM</span>
                </time>
              </div>
              <div className="entity-card__genre"></div>
              <div className="entity-card__name">
                {name}
              </div>
              <div className="entity-card__venue">
                {venueName}
              </div>
              <div className="entity-card__location">
                <span>
                  {venue.city}, {venue.state}
                </span>
              </div>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};

export default Card;
