import { useState } from "react";

interface Props {
  id: string;
  onSoundParameterChange: (newSetting: OscillatorType) => void;
}

export default function ParameterWaveType({
  id,
  onSoundParameterChange,
}: Props) {
  const [selected, setSelected] = useState<OscillatorType>("sine");

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value as OscillatorType;
    setSelected(val);
    onSoundParameterChange(val);
  };

  return (
    <div className="control-group">
      <label className="parameter-label" htmlFor={id}>Wave Type:</label>
      <select id={id} onChange={onChange} value={selected}>
        <option value="sine">Sine</option>
        <option value="square">Square</option>
        <option value="sawtooth">Sawtooth</option>
        <option value="triangle">Triangle</option>
      </select>
    </div>
  );
}
