import React from "react";
import SampleForm from "../sample-form";

type BoxProps = {
  depth: number;       
  maxDepth: number;
  label?: string;
};

const boxStyle: React.CSSProperties = {
  border: "1px solid #aaa",
  borderRadius: 6,
  padding: 12,
  margin: 8,
};

const spacerStyle: React.CSSProperties = {height: 8};

const Box: React.FC<BoxProps> = ({depth, maxDepth}) => {
  const nextDepth = depth + 1;
  const showChild = nextDepth <= maxDepth;

  return (
    <div style={boxStyle}>
      <div style={{marginBottom: 8}}>
        <div style={{fontSize: 12, color: "#555"}}>
          Depth: {depth}/{maxDepth}
        </div>
      </div>

      <SampleForm/>

      <div style={spacerStyle} />

      {showChild && (
        <div>
          <Box depth={nextDepth} maxDepth={maxDepth} label={`Form at depth ${nextDepth}`} />
        </div>
      )}
    </div>
  );
};

const SampleNestedComponent: React.FC = () => {
  return (
    <div style={{padding: 16}}>
      <h2>Recursive Boxes with Forms</h2>
      <Box depth={1} maxDepth={10} />
    </div>
  );
};

export default SampleNestedComponent;