// src/components/NotNode.js
import { Handle, Position } from '@xyflow/react';

const NotNode = ({ data }: any) => {

  return (
    <div style={{ border: '1px solid black', padding: 10, backgroundColor: 'lightgrey', clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}>
      <Handle
        type="target"
        position={Position.Left}
        id="input"
        style={{ top: '50%', background: '#555' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="output"
        style={{ top: '50%', background: '#555' }}
      />
      <div style={{ textAlign: 'center', fontSize: '1rem', width: '3rem'}}>
        {data.value}
      </div>
    </div>
  );
};

export default NotNode;
