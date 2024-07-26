import { Handle, Position } from "@xyflow/react";
import "../styles/xorgate-styles.css";

const XorNode = () => {

    return (

        <div className="xor-node">
            <div className="xor-node-body">
            <Handle
                id="a"
                type="target"
                position={Position.Left}
                style={{top: 10}}
            />
            <Handle
                id="b"
                type="target"
                position={Position.Left}
                style={{top: 40}}
            />
            <Handle
                id="c"
                type="source"
                position={Position.Right}
            />
            </div>
        </div>        

    )

}

export default XorNode;