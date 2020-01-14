import React from 'react';
import Carousel from './carousel';
import Card from './card';

import EventData from './eventData.json';

const EventCarousel = ({totalCount = 8, perPage}) => {
  let eventList = new Array(totalCount).fill(EventData);
  let entitiesComp = eventList.map((entity, index) => (
    <Card key={index} eventData={entity} />
  ));

  const onClickPrev = () => {
    // The tracking value says 'scroll', but it's actually a click.
    console.log('Scroll Left');
  }

  const onClickNext = () => {
    // The tracking value says 'scroll', but it's actually a click.
    console.log('Scroll Right');
  }

  const onScrollLeft = () => {
    // Scrolling is swiping on touchscreen devices
    /* istanbul ignore next */
    console.log('Swipe Left');
  }

  const onScrollRight = () => {
    // Scrolling is swiping on touchscreen devices
    /* istanbul ignore next */
    console.log('Swipe Right');
  }

  const carouselFetchMore = () => {
    console.log('Fetch More...');
  }

  return (
    <div>
      <Carousel totalCount={totalCount} initialSliderFrameWidth={0}
        onClickPrev={onClickPrev}
        onClickNext={onClickNext}
        onScrollLeft={onScrollLeft}
        onScrollRight={onScrollRight}
        loadEvents={carouselFetchMore}>
        {entitiesComp}
      </Carousel>
    </div>
  );
};

export default EventCarousel;
