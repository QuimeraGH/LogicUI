import { Handle, Position } from "@xyflow/react";

const OutputNode = ({ data }: any) => {
  const color = data.value === 1 ? 'green' : 'red';

  return (
    <div style={{ borderRadius: 5, backgroundColor: "#1d1b31", height: "24px", width: "24px", justifyContent: "center", display: "flex", alignItems: "center" }}>
      <div style={{ backgroundColor: color, color: '#fff', height: "12px", width: "12px" }}>
        {data.label}
        <Handle type="target" position={Position.Left} id="a" style={{ background: '#555' }} />
      </div>
    </div>
  );
};

export default OutputNode;
