import { useState } from "react";

interface Props {
  id: string;
}

export default function ParameterWaveType({ id }: Props) {
  const [selected, setSelected] = useState("sine");

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setSelected(val);
  };

  return (
    <div className="control-group">
      <label htmlFor={id}>Wave Type:</label>
      <select id={id} onChange={onChange} value={selected}>
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="triangle">Triangle</option>
      </select>
    </div>
  );
}
