import { Handle, Position } from "@xyflow/react";
import "../styles/orgate-styles.css";

const OrNode = () => {

    return (

        <div className="or-node">
            <div className="or-node-body">
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

export default OrNode;