import { Handle, Position } from "@xyflow/react";

const InputNode = ({ data }: any) => {
    const getNodeColor = (value: number) => {
      return value === 1 ? 'green' : 'red';
    };
  
    return (
      <div style={{ padding: 10, borderRadius: 5, backgroundColor: getNodeColor(data.value), color: '#fff' }}>
        {data.label}
        <Handle type="source" position={Position.Right} id="a" style={{ background: '#555' }} />
      </div>
    );
  };

export default InputNode;