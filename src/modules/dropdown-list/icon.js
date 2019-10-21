import React from 'react';

/**
 * Usage
 * ```jsx
 * const chevronIcon = chevron();
 * <span>{chevronIcon}</span>
 * ```
 */

/**
 * Renders an SVG for chevron icon.
 * @param {number} width An icon's width.
 * @param {number} height An icon's height.
 * @param {string} fill An icon's color in HEX format.
 * @return {React.Element} A rendered icon.
 */
const chevron = (width = 11, height = 18, fill = '#000000') => {
  return (
    <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 11 18"
      version="1.1" xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <g transform="translate(-1323.000000, -216.000000)">
          <g transform="translate(-265.000000, 115.000000)">
            <g transform="translate(353.000000, 86.000000)">
              <g transform="translate(1215.000000, 0.000000)">
                <path fill={fill} d="M25.2307692,27.2307692 L25.2307692,18 L28,18 L28,27.2307692 L28,30 L16,30 L16,27.2307692 L25.2307692,27.2307692 Z" transform="translate(22.000000, 24.000000) rotate(-45.000000) translate(-22.000000, -24.000000) "></path>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
};

/**
 * Renders an SVG for done icon.
 * @param {number} width An icon's width.
 * @param {number} height An icon's height.
 * @param {string} fill An icon's color in HEX format.
 * @return {React.Element} A rendered icon.
 */
const done = (width = 12, height = 10, fill = '#000000') => {
  return (
    <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 12 10"
      version="1.1" xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <path fill={fill} d="M2.26565344,3.00508177 C2.06723384,2.81314396 1.74384584,2.81615434 1.54780692,3.0074527 L0.358576056,4.16792591 C0.160539969,4.36117314 0.156311051,4.67118664 0.362341958,4.87332212 L4.67595591,9.10537842 C4.87607185,9.30171076 5.18370292,9.30212052 5.37407524,9.09427749 L11.6642226,2.22687541 C11.8496674,2.0244122 11.8371545,1.70167663 11.6407436,1.51037827 L10.4492564,0.349905067 C10.2508446,0.156657835 9.94426041,0.164072068 9.75854371,0.373149922 L5.36975416,5.31400201 C5.18669591,5.52008702 4.87867998,5.53274829 4.67902741,5.33961779 L2.26565344,3.00508177 Z"></path>
      </g>
    </svg>
  );
};

/**
 * Renders an SVG for alternative done icon.
 * @param {number} width An icon's width.
 * @param {number} height An icon's height.
 * @param {string} fill An icon's color in HEX format.
 * @return {React.Element} A rendered icon.
 */
const doneAlt = (width = 12, height = 12, fill = '#000000') => {
  return (
    <svg width={`${width}px`} height={`${height}px`} viewBox="0 0 12 12"
      version="1.1" xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
    >
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
        <polygon fill={fill} points="4.23054538 7.6212674 1.60913229 5.22988331 0 6.69781424 4.16058505 10.493308 4.16224397 10.4917946 4.23054538 10.5541026 12 3.46641758 10.3925266 2 4.23054538 7.6212674"></polygon>
      </g>
    </svg>
  );
};

/**
 * A collection of icons. Icons are stateless functional components returning
 * an SVG representation of an icon.
 */
const Icons = {
  chevron,
  done,
  doneAlt
};

export default Icons;