import { useState } from "react";

interface Props {
  id: string;
  range: number[]; //[min,max]
  defaultValue: number;
  title: string;
  step?: string;
}

export default function ParameterSlider({
  id,
  range,
  defaultValue,
  title,
  step = "1",
}: Props) {
  const [selectedValue, setSelectedValue] = useState<number>(defaultValue);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const min = range[0];
    const max = range[1];
    const val = parseFloat(e.target.value);

    if (!isNaN(val) && val >= min && val <= max) {
      setSelectedValue(val);
    }
  };

  return (
    <div className="control-group">
      <label htmlFor={id}>{title}</label>
      <input
        type="range"
        id={id}
        min={range[0]}
        max={range[1]}
        step={step}
        value={selectedValue}
        onChange={onChange}
      />
      <input
        type="number"
        id={`${id}Number`}
        min={range[0]}
        max={range[1]}
        step={step}
        value={selectedValue}
        onChange={onChange}
      />
    </div>
  );
}
