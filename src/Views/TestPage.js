import React from "react";
import GAlign from "../Components/GComponents/GAlign";
import GAutoCompleteCore from "../Components/GComponents/GAutoCompleteCore/GAutoCompleteCore";

export default function TestPage() {
  return (
    <div style={{ height: "150px", padding:"20px" }}>
      <GAlign align="center" direction="column">
        <GAutoCompleteCore
          suggestions={[
            "Alligator",
            "Bask",
            "Crocodilian",
            "Death Roll",
            "Eggs",
            "Jaws",
            "Reptile",
            "Solitary",
            "Tail",
            "Wetlands",
          ]}
        />
      </GAlign>
    </div>
  );
}
