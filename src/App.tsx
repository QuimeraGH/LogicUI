import "./App.css";
import { useState, useCallback, useEffect, useRef } from "react";
import { invoke } from "@tauri-apps/api";
import { open, save } from "@tauri-apps/api/dialog";
import { Node } from "@xyflow/react";
import {
  ReactFlow,
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import homeicon from './assets/homeicon.png';
import loadicon from './assets/loadicon.png';
import saveicon from './assets/saveicon.png';
import abouticon from './assets/abouticon.png';
import InputNode from "./components/InputNode";
import OutputNode from "./components/OutputNode";
import AndNode from "./components/AndNode";
import OrNode from "./components/OrNode";
import XorNode from "./components/XorNode";
import NotNode from "./components/NotNode";

const nodeTypes = {
  inputnode: InputNode,
  outputnode: OutputNode,
  andnode: AndNode,
  ornode: OrNode,
  xornode: XorNode,
  notnode: NotNode
};

const initialNodes: any[] = [];
const initialEdges: any[] = [];

function App() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const previousNodesRef = useRef(nodes);

  const onNodesChange = useCallback(
    (changes: any) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [],
  );
  const onEdgesChange = useCallback(
    (changes: any) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [],
  );

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [],
  );

  const handleNodeClick = (_event: React.MouseEvent, node: Node) => {
    if (node.type === 'inputnode') {
      const newValue = node.data.value === 0 ? 1 : 0;

      setNodes((nds) =>
        nds.map((n) =>
          n.id === node.id ? { ...n, data: { ...n.data, value: newValue } } : n
        )
      );
    }
  };

  // updating values

  const areNodesEqual = (nodes1: string | any[], nodes2: string | any[]) => {
    if (nodes1.length !== nodes2.length) return false;
    for (let i = 0; i < nodes1.length; i++) {
      if (nodes1[i].id !== nodes2[i].id || JSON.stringify(nodes1[i].data) !== JSON.stringify(nodes2[i].data)) {
        return false;
      }
    }
    return true;
  };  

  const updateNodeValues = (currentNodes: any[], currentEdges: any[]) => {
    const updatedNodes = currentNodes.map((node: any) => {
      if (node.type === 'outputnode') {
        const connectedEdge = currentEdges.find((edge: any) => edge.target === node.id);
        if (connectedEdge) {
          const inputNode = currentNodes.find((n: any) => n.id === connectedEdge.source);
          if (inputNode && node.data.value !== inputNode.data.value) {
            return { ...node, data: { ...node.data, value: inputNode.data.value } };
          }
        }
      }
      if (node.type === 'andnode') {
        const input1Edge = currentEdges.find((edge: any) => edge.target === node.id && edge.targetHandle === 'a');
        const input2Edge = currentEdges.find((edge: any) => edge.target === node.id && edge.targetHandle === 'b');
        const outputEdge = currentEdges.find((edge: any) => edge.source === node.id && edge.sourceHandle === 'c');

        const input1Node = input1Edge ? currentNodes.find((n: any) => n.id === input1Edge.source) : null;
        const input2Node = input2Edge ? currentNodes.find((n: any) => n.id === input2Edge.source) : null;
        const outputNode = outputEdge ? currentNodes.find((n: any) => n.id === outputEdge.target) : null;

        const input1Value = input1Node ? input1Node.data.value : 0;
        const input2Value = input2Node ? input2Node.data.value : 0;
        const newValue = input1Value & input2Value;

        if (node.data.value !== newValue) {
          node.data.value = newValue;
          if (outputNode) {
            outputNode.data.value = newValue;
          }
        }
      }
      if (node.type === 'ornode') {
        const input1Edge = currentEdges.find((edge: any) => edge.target === node.id && edge.targetHandle === 'a');
        const input2Edge = currentEdges.find((edge: any) => edge.target === node.id && edge.targetHandle === 'b');
        const outputEdge = currentEdges.find((edge: any) => edge.source === node.id && edge.sourceHandle === 'c');

        const input1Node = input1Edge ? currentNodes.find((n: any) => n.id === input1Edge.source) : null;
        const input2Node = input2Edge ? currentNodes.find((n: any) => n.id === input2Edge.source) : null;
        const outputNode = outputEdge ? currentNodes.find((n: any) => n.id === outputEdge.target) : null;

        const input1Value = input1Node ? input1Node.data.value : 0;
        const input2Value = input2Node ? input2Node.data.value : 0;
        const newValue = input1Value | input2Value;

        if (node.data.value !== newValue) {
          node.data.value = newValue;
          if (outputNode) {
            outputNode.data.value = newValue;
          }
        }
      }
      if (node.type === 'xornode') {
        const input1Edge = currentEdges.find((edge: any) => edge.target === node.id && edge.targetHandle === 'a');
        const input2Edge = currentEdges.find((edge: any) => edge.target === node.id && edge.targetHandle === 'b');
        const outputEdge = currentEdges.find((edge: any) => edge.source === node.id && edge.sourceHandle === 'c');

        const input1Node = input1Edge ? currentNodes.find((n: any) => n.id === input1Edge.source) : null;
        const input2Node = input2Edge ? currentNodes.find((n: any) => n.id === input2Edge.source) : null;
        const outputNode = outputEdge ? currentNodes.find((n: any) => n.id === outputEdge.target) : null;

        const input1Value = input1Node ? input1Node.data.value : 0;
        const input2Value = input2Node ? input2Node.data.value : 0;
        const newValue = input1Value ^ input2Value;

        if (node.data.value !== newValue) {
          node.data.value = newValue;
          if (outputNode) {
            outputNode.data.value = newValue;
          }
        }
      }
      if (node.type === 'notnode') {
        const inputEdge = currentEdges.find((edge: any) => edge.target === node.id);
        const inputNode = inputEdge ? currentNodes.find((n: any) => n.id === inputEdge.source) : null;
        const inputValue = inputNode ? inputNode.data.value : 0;
        const newValue = inputValue === 1 ? 0 : 1;

        if (node.data.value !== newValue) {
          node.data.value = newValue;
          const outputEdge = currentEdges.find((edge: any) => edge.source === node.id);
          if (outputEdge) {
            const outputNode = currentNodes.find((n: any) => n.id === outputEdge.target);
            if (outputNode) {
              outputNode.data.value = newValue;
            }
          }
        }
      }
      return node;
    });

    return updatedNodes;
  };

  useEffect(() => {
    const updateNodesRecursively = (currentNodes: any[], currentEdges: any[], iterations: number) => {
      if (iterations === 0) return currentNodes;
      const updatedNodes = updateNodeValues(currentNodes, currentEdges);
      return updateNodesRecursively(updatedNodes, currentEdges, iterations - 1);
    };

    let maxIterations = nodes.length;
    console.log(maxIterations)
    const updatedNodes = updateNodesRecursively(nodes, edges, maxIterations);

    if (!areNodesEqual(previousNodesRef.current, updatedNodes)) {
      setNodes(updatedNodes);
      previousNodesRef.current = updatedNodes;
    }
  }, [edges, nodes]);


  const addNode = (type: any) => {

    let newNode;

    if (type == "inputnode" || type == "outputnode") {
      newNode = {
        id: type + Math.random(),
        type,
        position: { x: Math.random() * 100, y: Math.random() * 100 },
        data: { value: 0 }
      };
    } else if (type == "notnode") {
      newNode = {
        id: type + Math.random(),
        type,
        position: { x: Math.random() * 100, y: Math.random() * 100 },
        data: { value: 0 }
      };
    } else {
      newNode = {
        id: type + Math.random(),
        type,
        position: { x: Math.random() * 100, y: Math.random() * 100 },
        data: { vala: 0, valb: 0, valc: 0 }
      };
    }
    setNodes((nds) => [...nds, newNode]);
  };

  const addInputNode = () => addNode("inputnode");
  const addOutputNode = () => addNode("outputnode");
  const addAndNode = () => addNode("andnode");
  const addOrNode = () => addNode("ornode");
  const addXorNode = () => addNode("xornode");
  const addNotNode = () => addNode("notnode");

  const deleteNode = useCallback(
    (nodeId: any) => {
      setNodes((nds) => nds.filter((node) => node.id !== nodeId));
      setEdges((eds) => eds.filter((edge) => edge.source !== nodeId && edge.target !== nodeId));
    },
    [setNodes, setEdges]
  );

  const onEdgeDelete = useCallback(
    (edgeId: any) => setEdges((eds) => eds.filter((e) => e.id !== edgeId)),
    [setEdges]
  );

  // file management ------
  const [home, setHome] = useState("block")
  const [about, setAbout] = useState("none")

  const showHome = () => {
    setAbout("none")
    setHome("block")
  }

  const showAbout = () => {
    setHome("none")
    setAbout("flex")
  }

  const saveDiagram = async () => {
    const filePath = await save({
      filters: [{ name: 'JSON Files', extensions: ['json'] }],
    });
    if (filePath) {
      await invoke('save_file', {
        path: filePath as string,
        content: JSON.stringify({ nodes, edges }),
      });
    }
  };

  const loadDiagram = async () => {
    try {
      const selected = await open({
        directory: false,
        multiple: false,
        recursive: true,
      });

      if (selected) {
        const filePath = typeof selected === 'string' ? selected : selected[0];
        const data = await invoke<string>( "load_file", { path: filePath } )
        const parsedData = JSON.parse(data);
        setNodes(parsedData.nodes);
        setEdges(parsedData.edges);
        
      }
    } catch (error) {
      console.error('Error selecting directory:', error);
    }
  }

  return (
    <div className="container">
      <div className="sidebar">
        <a href="#"><img src={homeicon} title="Home" alt="Home" onClick={showHome}/></a>
        <a href="#"><img src={loadicon} title="Load" alt="Load" onClick={loadDiagram}/></a>
        <a href="#"><img src={saveicon} title="Save" alt="Save" onClick={saveDiagram}/></a>
        <a href="#"><img src={abouticon} title="About" alt="About" onClick={showAbout}/></a>
      </div>
      <div className="maindiv">
        <div className="homediv" style={{display: home}}>
          <div style={{ width: '80vw', height: '80vh' }} className="canvasdiv">
            <ReactFlow
              nodes={nodes}
              onNodesChange={onNodesChange}
              edges={edges}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              nodeTypes={nodeTypes}
              onNodeClick={handleNodeClick}
              onEdgeContextMenu={(event, edge) => {
                event.preventDefault();
                onEdgeDelete(edge.id);
              }}
              onNodeContextMenu={(event, node) => {
                event.preventDefault();
                deleteNode(node.id);
              }}
              fitView
            >
            <Background />
            <Controls />
            </ReactFlow>
          </div>
          <div className="controls">
          <button onClick={addInputNode}>Add Input Node</button>
            <button onClick={addOutputNode}>Add Output Node</button>
            <button onClick={addAndNode}>Add AND Node</button>
            <button onClick={addOrNode}>Add OR Node</button>
            <button onClick={addXorNode}>Add XOR Node</button>
            <button onClick={addNotNode}>Add NOT Node</button>
          </div>
        </div>
        <div className="aboutdiv" style={{ display: about}}>
        <h1>About This Project</h1>
        <p>This project was created as a learning exercise for React. 
          As a beginner, there might be bugs and areas for improvement, so feel free to fix any issues 
          you find and get inspired by the code!</p>

          <p>Simulation of <b>Logic Gates</b> in inspiration of a friend who is into electronics, planing on making
            more complex things as I get better, maybe something related to rust for systems programming,
            same reason I chose Tauri Framework.</p>

          <p>Controls are RightClick(delete), ShiftAndSelect(selection) and InputNodeClick(alternateValue)</p>
          
          <div className="footer">QuimeraGH 2024.</div>
        </div>
      </div>
    </div>
  );
}

export default App;
