import React, {Component} from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import './carousel.scss';
import cx from 'classnames';

export const MOBILE_LOAD_LIMIT = 5;

const resolvePerpage = (perPage) => {
  console.log('Before perPage: ', perPage);
  let resolvedPerPage = 1;
  if (typeof perPage === 'number') {
    resolvedPerPage = perPage;
  } else {
    const windowInnerWidth = window.innerWidth;
    for (let breakpoint in perPage) {
      if (windowInnerWidth >= breakpoint) {
        resolvedPerPage = perPage[breakpoint];
      }
    }
  }
  console.log('After perPage: ', resolvedPerPage);
  return resolvedPerPage;
};

/**
 * This implements a carousel that lazy-loads its content as user pages/scroll.
 */
class LazyLoadCarousel extends Component {

  constructor({perPage, children}) {
    super(...arguments);

    this.state = {
      perPage: 1,
      // Zero-based page number. This is only relevant in desktop mode. In mobile,
      // it's always 0.
      currentPage: 0,
      // Total number of pages of data that can be loaded. This is dependent upon
      // the nuber of items per page for the current screen size.
      numPages: 0,
      transform: 0,
      // Width of the visible portion of the carousel
      viewportWidth: 0,
      // Total width of the carousel (including hidden part). This is computed
      // on the client, based on each item's outer width x total number of items.
      sliderFrameWidth: this.props.initialSliderFrameWidth || 0,
      itemMarginLeft: 8,
      itemMarginRight: 8,
      itemOutterWidth: null,
      // How much the content is scrolled from the left. Used to differentiate
      // between left and right scrolling.
      scrollLeft: 0
    };
  }

  onResize = debounce(() => {
    /* istanbul ignore else */
    if (this.props.children.length) {
      this.init();
    }
  }, this.props.resizeDebounce)

  componentDidMount() {
    window.addEventListener('resize', this.onResize);

    let childLength = this.props.children.length;
    if (childLength > 0) {
      this.init();
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.resetPage) {
      // Reset the carousel's page.
      this.setState({
        currentPage: 0
      });

      this.viewport.scrollLeft = 0;
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize);
  }

  componentDidUpdate(prevProps, prevState) {
    let childLength = this.props.children.length;
    if (childLength > 0 && prevProps.children.length !== childLength || this.props.totalCount !== prevProps.totalCount) {
      this.init();
    }
  }

  init() {
    const perPage = resolvePerpage(this.props.perPage);
    const {children, totalCount} = this.props;
    const childLength = children.length;
    /* istanbul ignore next */
    if (!this.viewport) {
      // Guard against viewport not available (component in the middle of
      // being unmounted)
      return;
    }

    const viewportWidth = this.viewport.getBoundingClientRect().width;
    console.log('viewportWidth: ', this.viewport.getBoundingClientRect().width);
    const {marginLeft, marginRight} = this.getChildBoxMargins();

    let itemInnerWidth = (viewportWidth - (Math.ceil(perPage) - 1) * marginLeft - (Math.ceil(perPage) - 1) * marginRight) / perPage;
    let itemOutterWidth = itemInnerWidth + (marginLeft + marginRight);

    console.log('perPage: ', perPage);
    console.log('this.props.perPage: ', this.props.perPage);
    console.log('itemInnerWidth: ', itemInnerWidth);
    console.log('itemOutterWidth: ', itemOutterWidth);
    let sliderFrameWidth = (this.props.perPage) ? Math.max(childLength, perPage) * itemOutterWidth : (totalCount) * itemOutterWidth;
    console.log('sliderFrameWidth: ', sliderFrameWidth);
    let numPages = (this.props.perPage) ? Math.ceil(totalCount / parseInt(perPage)) : Math.ceil(totalCount * itemOutterWidth / sliderFrameWidth);
    console.log('numPages: ', numPages);

    this.setState({
      currentPage: Math.max(Math.min(this.state.currentPage, numPages - 1), 0),
      viewportWidth,
      numPages,
      perPage,
      sliderFrameWidth,
      itemMarginLeft: marginLeft,
      itemMarginRight: marginRight,
      itemOutterWidth
    });
  }

  getChildBoxMargins() {
    const firstChild = this.sliderFrame.children[0];
    const childStyle = window.getComputedStyle(firstChild, null);
    return {
      marginLeft: parseFloat(childStyle.getPropertyValue("margin-left")) || 0,
      marginRight: parseFloat(childStyle.getPropertyValue("margin-right")) || 0
    };
  }

  goToPrev = () => {
    this.setState({
      currentPage: Math.max(0, this.state.currentPage - 1)
    });
    this.props.onClickPrev(this);
  }

  goToNext = () => {
    let {children} = this.props;
    let {perPage, currentPage} = this.state;

    // Update page number
    this.setState({
      currentPage: currentPage + 1
    });
    this.props.onClickNext(this);

    // Find the number of events we need to load to complete next page. If it's greater
    // than zero, that means we have more items to load.
    let numChildren = children.length;
    let limit = perPage * (currentPage + 2) - numChildren;
    if (limit > 0) {
      this.props.loadEvents(numChildren + 1, limit);
    }
  }

  onScroll = (evt) => {
    // Cannot debounce this function directly because the evt parameter is a
    // SyntheticEvent, which is reused by the framework and cannot be accessed
    // in an asynchronous way. Extract the currentTarget instead, which is a
    // more permanent object.
    this.processOnScroll(evt.currentTarget);
  }

  processOnScroll = debounce((currentTarget) => {
    const {children, totalCount} = this.props;
    const numChildren = children.length;
    const scrollLeft = currentTarget.scrollLeft;
    if (scrollLeft > this.state.scrollLeft) {
      // Right scroll
      this.props.onScrollRight(this);

      // When we are roughly two visible screen lengths away to the end, load more
      // events if they exist.
      if (scrollLeft + (this.state.viewportWidth * 2) >= this.state.sliderFrameWidth) {
        // Load up to 5 more
        let limit = Math.min(MOBILE_LOAD_LIMIT, totalCount - numChildren);
        if (limit > 0) {
          this.props.loadEvents(numChildren + 1, limit);
        }
      }
    } else {
      // Left scroll
      this.props.onScrollLeft(this);
    }

    // Update scrollLeft state
    this.setState({
      scrollLeft
    });
  }, this.props.scrollDebounce)

  bindViewport = (node) => {
    this.viewport = node;
  }

  bindSlideFrame = (node) => {
    this.sliderFrame = node;
  }

  isShowPrevButton() {
    return (this.state.currentPage !== 0);
  }

  isShowNextButton() {
    const {currentPage, numPages} = this.state;
    console.log('isShowNextButton: ');
    console.log('currentPage: ', currentPage);
    console.log('numPages: ', numPages);
    return currentPage < (numPages - 1);
  }

  render() {
    const {sliderFrameWidth, currentPage, perPage, itemMarginLeft, itemMarginRight, itemOutterWidth, viewportWidth} = this.state;
    const {className, duration, easing} = this.props;
    let fullItemPerPage = parseInt(perPage);
    let transform = 0;

    if (sliderFrameWidth) {
      fullItemPerPage = parseInt(perPage);
      transform = Math.max(-itemMarginLeft - currentPage * fullItemPerPage * itemOutterWidth,
        // stop at the last item to avoid empty space
        -(sliderFrameWidth - viewportWidth - itemMarginRight));
    }

    const styles = {
      width: `${sliderFrameWidth}px`,
      transform: `translateX(${transform}px)`,
      transition: `transform ${duration}ms ${easing}`
    };

    return (
      <div className={cx("LazyLoadCarousel", className)}>
        <div className="LazyLoadCarousel__ViewPort" ref={this.bindViewport} onScroll={this.onScroll}>
          <div className="LazyLoadCarousel__ViewPort__SliderFrame" ref={this.bindSlideFrame}
            style={styles}>
            {
              React.Children.map(this.props.children, (child, index) => {
                const {flexGrow = 1, ...props} = child.props;
                return (
                  <div key={index} className="LazyLoadCarousel__Item" style={{flexGrow}}>
                    <child.type {...props} />
                  </div>
                );
              })
            }
          </div>
        </div>
        <div className="LazyLoadCarousel__Buttons">
          {this.isShowPrevButton() &&
            <button
              className="LazyLoadCarousel__Buttons__prev"
              onClick={this.goToPrev}
            >
              <div className="LazyLoadCarousel__PrevArrow"><span></span></div>
            </button>
          }
          {this.isShowNextButton() &&
            <button
              className="LazyLoadCarousel__Buttons__next"
              onClick={this.goToNext}
            >
              <div className="LazyLoadCarousel__NextArrow"><span></span></div>
            </button>
          }
        </div>
      </div>
    );
  }
}

LazyLoadCarousel.propTypes = {
  className: PropTypes.string,
  resizeDebounce: PropTypes.number,
  scrollDebounce: PropTypes.number,
  duration: PropTypes.number,
  easing: PropTypes.string,
  perPage: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.object
  ]),
  // Whether to reset the page number (initial load always does)
  resetPage: PropTypes.bool,
  // The total number of items that can be loaded
  totalCount: PropTypes.number.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element)
  ]).isRequired,
  onClickPrev: PropTypes.func,
  onClickNext: PropTypes.func,
  onScrollLeft: PropTypes.func,
  onScrollRight: PropTypes.func,
  // Callback to load more events when needed. It will be passed two parameters:
  // startIndex and limit.
  loadEvents: PropTypes.func
};

LazyLoadCarousel.defaultProps = {
  resizeDebounce: 250,
  scrollDebounce: 250,
  duration: 1000,
  easing: 'ease-in-out',
  perPage: {
    320: 1,
    640: 2,
    960: 3,
    1280: 4
  },
  resetPage: false,
  totalCount: 0,
  onClickPrev: () => void 0,
  onClickNext: () => void 0,
  onScrollLeft: /* istanbul ignore next */ () => void 0,
  onScrollRight: /* istanbul ignore next */ () => void 0,
  loadEvents: () => void 0
};

export default LazyLoadCarousel;
