import FinListItemLoadingState from './fin-list-item';
import DayExpenseLoadingState from './day-expense';
import styled from 'styled-components';
import { Colors } from '../../styles/colors';

export const ImageAnimation = styled.div`
  /*
   * Order for properties 'background-image', 'background-size' and
   * 'animation' is important for animation to work.
   */
  background-image: linear-gradient(
    -60deg,
    ${Colors.LoadingState},
    ${Colors.LoadingState},
    ${Colors.LoadingState},
    #fdfdfd,
    ${Colors.LoadingState},
    ${Colors.LoadingState},
    ${Colors.LoadingState},
    #fdfdfd
  );
  background-size: 400% 400%;
  animation: myImage 1.25s linear infinite;

  @keyframes myImage {
    0% {
      background-position: 95% 95%;
    }
    50% {
      background-position: 25% 25%;
    }
    100% {
      background-position: 25% 25%;
    }
  }
`;

export const NameAnimation = styled.div`
  /*
   * Order for properties 'background-image', 'background-size' and
   * 'animation' is important for animation to work.
   */
  background-image: linear-gradient(
    -60deg,
    ${Colors.LoadingState},
    ${Colors.LoadingState},
    ${Colors.LoadingState},
    #fdfdfd,
    ${Colors.LoadingState},
    ${Colors.LoadingState},
    ${Colors.LoadingState},
    #fdfdfd
  );
  background-size: 400% 400%;
  animation: myName 1.25s linear infinite;

  @keyframes myName {
    0% {
      background-position: 95% 95%;
    }
    12% {
      background-position: 95% 95%;
    }
    47% {
      background-position: 25% 25%;
    }
    100% {
      background-position: 25% 25%;
    }
  }
`;

export { FinListItemLoadingState, DayExpenseLoadingState };
