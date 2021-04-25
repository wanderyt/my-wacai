import React, {ChangeEvent, FC} from 'react';
import './index.scss';

interface Props {
  disabled?: boolean;
  onChange?: (evt: ChangeEvent) => void;
  className?: string
};

const Checkbox: FC<Props> = ({disabled, onChange, className = ''}) => {
  return (
    <input
      type="checkbox"
      disabled={disabled}
      onChange={onChange}
      className={className}
    />
  );
};

export default Checkbox;
