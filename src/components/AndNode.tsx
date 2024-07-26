import { Handle, Position } from "@xyflow/react";
import "../styles/andgate-styles.css";

const AndNode = () => {

    return (

        <div className="and-node">
            <div className="and-node-body">
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

export default AndNode;