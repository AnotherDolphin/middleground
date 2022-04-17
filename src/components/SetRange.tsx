import React from "react";

type propTypes = {
  disabled: boolean;
  min?: number;
  max?: number;
};

export default function SetRange({ min, max, disabled }: propTypes) {
  return (
    <div className="inline-flex gap-4">
      <div>
        <label htmlFor="low">minimum</label>
        <br />
        $
        <input
          disabled={disabled}
          value={min ?? ""}
          className="w-32"
          type="text"
          id="low"
          name="low"
        />
      </div>
      <div>
        <label htmlFor="high">maximum</label>
        <br />
        $
        <input
          disabled={disabled}
          value={max ?? ""}
          className="w-32"
          type="number"
          id="high"
          name="high"
        />
      </div>
    </div>
  );
}
