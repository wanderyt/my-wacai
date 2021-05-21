import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import './index.scss';

interface Props {
  disabled?: boolean;
  onChange?: (evt: ChangeEvent) => void;
  defaultChecked?: boolean;
  className?: string
};

const Checkbox: FC<Props> = ({disabled, onChange, className = '', defaultChecked = false}) => {
  const [checked, setChecked] = useState<boolean>(defaultChecked);

  useEffect(() => {
    setChecked(defaultChecked);
  }, [defaultChecked])

  return (
    <input
      type="checkbox"
      disabled={disabled}
      onChange={onChange}
      checked={checked}
      className={className}
    />
  );
};

export default Checkbox;
