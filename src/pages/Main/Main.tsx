import React from "react";
import Toggle from "../../components/common/Toggle/Toggle";

export default function Main() {
  return (
    <div>
      <Toggle
        initialState={false}
        onChange={(isActive) => {
          console.log("토글!", isActive);
        }}
      />
    </div>
  );
}
