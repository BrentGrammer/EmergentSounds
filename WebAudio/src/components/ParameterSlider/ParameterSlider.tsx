import { useState, useEffect } from "react";

interface Props {
  id: string;
  range: number[];
  defaultValue: number;
  title: string;
  onSoundParameterChange: (newSetting: number) => void;
  step?: string;
}

export default function ParameterSlider({
  id,
  range,
  defaultValue,
  title,
  onSoundParameterChange,
  step = "1",
}: Props) {
  const [selectedValue, setSelectedValue] = useState<number>(defaultValue);
  const [inputValue, setInputValue] = useState<string>(String(defaultValue));

  const min = range[0];
  const max = range[1];

  useEffect(() => {
    setInputValue(String(selectedValue));
  }, [selectedValue]);

  const handleValueChange = (val: number) => {
    if (!isNaN(val) && val >= min && val <= max) {
      setSelectedValue(val);
      onSoundParameterChange(val);
    }
  };

  const onRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    handleValueChange(val);
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onInputBlur = () => {
    const val = parseFloat(inputValue);

    if (isNaN(val)) {
      setInputValue(String(selectedValue));
      return;
    }

    const clampedVal = Math.max(min, Math.min(max, val));

    handleValueChange(clampedVal);
    setInputValue(String(clampedVal));
  };

  const onInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onInputBlur();
    }
  };

  return (
    <div className="control-group">
      <label htmlFor={id}>{title}</label>
      <input
        type="range"
        id={id}
        min={min}
        max={max}
        step={step}
        value={selectedValue}
        onChange={onRangeChange}
      />
      <input
        type="number"
        id={`${id}Number`}
        min={min}
        max={max}
        step={step}
        value={inputValue}
        onChange={onInputChange}
        onBlur={onInputBlur}
        onKeyDown={onInputKeyDown}
      />
    </div>
  );
}
