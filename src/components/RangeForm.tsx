import React from "react";
import { db, doc, getDoc } from "../firebase";

type propTypes = {
  disabled: boolean;
  min?: number;
  max?: number;
};

export default function RangeForm({ min, max, disabled }: propTypes) {

  const docRef = doc(db, "/testing/user0/projects", "testing");
  const submitRange = () => console.log(3);
  

  return (
    <form className="inline-flex gap-4 items-end">
      <div>
        <label htmlFor="low">minimum</label>
        <br />
        $
        <input
          required
          disabled={disabled}
          defaultValue={min ?? ""}
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
          required
          disabled={disabled}
          defaultValue={max ?? ""}
          className="w-32"
          type="number"
          id="high"
          name="high"
        />
      </div>
      <button className="rounded-md bg-green-600 px-4 py-2 text-white shadow-lg"
      onClick={() => submitRange()}>
        Submit
      </button>
    </form>
  );
}
