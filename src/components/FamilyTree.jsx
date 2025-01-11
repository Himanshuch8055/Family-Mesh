"use client";

import { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  addEdge,
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType,
  BackgroundVariant,
  MiniMap,
  ControlButton,
  Panel,
  useReactFlow,
} from 'reactflow';
import { ArrowPathIcon, DocumentArrowDownIcon, DocumentArrowUpIcon, ViewfinderCircleIcon } from '@heroicons/react/24/outline';
import 'reactflow/dist/style.css';
import CustomNode from './CustomNode';
import MemberForm from './MemberForm';
import { getEdgeStyle, getEdgeType, shouldCreateEdge } from '@/utils/relationshipUtils';

const nodeTypes = {
  custom: CustomNode,
};

const defaultNode = {
  id: '1',
  type: 'custom',
  position: { x: 400, y: 200 },
  data: { 
    name: 'John Doe',
    age: '45',
    relation: 'Self',
    gender: 'male',
    isRoot: true,
    birthDate: '1980-01-01',
    occupation: 'Software Engineer',
    location: 'New York',
    bio: 'Family tree root member',
    editable: true
  },
};

const HORIZONTAL_SPACING = 250;
const VERTICAL_SPACING = 100;

const FamilyTree = () => {
  const { fitView, zoomTo, setCenter } = useReactFlow();
  const [initialNodes] = useState(() => {
    const savedNodes = localStorage.getItem('familyTreeNodes');
    return savedNodes ? JSON.parse(savedNodes) : [defaultNode];
  });

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [formState, setFormState] = useState({
    isOpen: false,
    mode: null,
    member: null,
    parentId: null,
    position: null,
  });

  useEffect(() => {
    localStorage.setItem('familyTreeNodes', JSON.stringify(nodes));
  }, [nodes]);

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find((n) => n.id === params.source);
      const targetNode = nodes.find((n) => n.id === params.target);
      
      if (sourceNode && targetNode) {
        const sourceRelation = sourceNode.data.relation;
        const targetRelation = targetNode.data.relation;
        const edgeStyle = getEdgeStyle(sourceRelation);
        const edgeType = getEdgeType(sourceRelation);

        const edge = {
          ...params,
          type: edgeType,
          animated: false,
          style: edgeStyle,
          markerEnd: {
            type: MarkerType.ArrowClosed,
            color: edgeStyle.stroke,
          },
        };

        setEdges((eds) => addEdge(edge, eds));
      }
    },
    [nodes],
  );

  const handleFormSubmit = useCallback((formData) => {
    try {
      if (formState.mode === 'edit' && formState.member) {
        setNodes((prevNodes) => 
          prevNodes.map((node) =>
            node.id === formState.member.id
              ? { 
                  ...node, 
                  data: { 
                    ...formData,
                    isRoot: node.data.isRoot 
                  } 
                }
              : node
          )
        );
      } else if (formState.mode === 'add' && formState.parentId) {
        const parentNode = nodes.find((node) => node.id === formState.parentId);
        
        if (parentNode) {
          const newPos = calculateNewPosition(parentNode, formState.position);
          const newNode = {
            id: `${Date.now()}`,
            type: 'custom',
            position: newPos,
            data: { ...formData, isRoot: false },
          };

          setNodes((prevNodes) => [...prevNodes, newNode]);
          
          if (shouldCreateEdge(parentNode.data.relation, formData.relation, formState.position)) {
            const edgeStyle = getEdgeStyle(formData.relation);
            const edgeType = getEdgeType(formData.relation);
            
            const edge = {
              id: `${formState.parentId}-${newNode.id}`,
              source: formState.position === 'bottom' ? formState.parentId : newNode.id,
              target: formState.position === 'bottom' ? newNode.id : formState.parentId,
              type: edgeType,
              animated: false,
              style: edgeStyle,
              markerEnd: {
                type: MarkerType.ArrowClosed,
                color: edgeStyle.stroke,
              },
            };

            setEdges((eds) => [...eds, edge]);
          }
        }
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setFormState((prev) => ({ ...prev, isOpen: false }));
    }
  }, [formState.mode, formState.member, formState.parentId, formState.position, nodes]);

  const handleCloseForm = useCallback(() => {
    setFormState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  useEffect(() => {
    const handleOpenForm = (event) => {
      const { id, data, mode, parentId, position } = event.detail;
      setFormState({
        isOpen: true,
        mode,
        member: mode === 'edit' ? { id, data } : null,
        parentId,
        position,
      });
    };

    const handleDeleteNode = (event) => {
      const { id } = event.detail;
      setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
      setEdges((eds) => eds.filter((edge) => edge.source !== id && edge.target !== id));
    };

    window.addEventListener('openMemberForm', handleOpenForm);
    window.addEventListener('deleteNode', handleDeleteNode);

    return () => {
      window.removeEventListener('openMemberForm', handleOpenForm);
      window.removeEventListener('deleteNode', handleDeleteNode);
    };
  }, []);

  const calculateNewPosition = (parentNode, position) => {
    const parentPos = parentNode.position;
    switch (position) {
      case 'top':
        return { x: parentPos.x, y: parentPos.y - VERTICAL_SPACING };
      case 'bottom':
        return { x: parentPos.x, y: parentPos.y + VERTICAL_SPACING };
      case 'left': {
        const siblings = nodes.filter(
          (node) => node.position.y === parentPos.y && node.position.x < parentPos.x
        );
        const leftmostX = siblings.length
          ? Math.min(...siblings.map((s) => s.position.x))
          : parentPos.x;
        return { x: leftmostX - HORIZONTAL_SPACING, y: parentPos.y };
      }
      case 'right': {
        const siblings = nodes.filter(
          (node) => node.position.y === parentPos.y && node.position.x > parentPos.x
        );
        const rightmostX = siblings.length
          ? Math.max(...siblings.map((s) => s.position.x))
          : parentPos.x;
        return { x: rightmostX + HORIZONTAL_SPACING, y: parentPos.y };
      }
      default:
        return parentPos;
    }
  };

  // Export family tree data
  const handleExport = useCallback(() => {
    const data = {
      nodes,
      edges,
      timestamp: new Date().toISOString(),
      version: '1.0',
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `family-tree-${new Date().toISOString()}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [nodes, edges]);

  // Import family tree data
  const handleImport = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          try {
            const data = JSON.parse(event.target.result);
            if (data.nodes && data.edges) {
              setNodes(data.nodes);
              setEdges(data.edges);
              localStorage.setItem('familyTreeNodes', JSON.stringify(data.nodes));
              fitView({ duration: 800 });
            }
          } catch (error) {
            console.error('Error importing family tree:', error);
            alert('Invalid file format. Please select a valid family tree JSON file.');
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }, [setNodes, setEdges, fitView]);

  // Center view on root node
  const centerOnRoot = useCallback(() => {
    const rootNode = nodes.find(node => node.data.isRoot);
    if (rootNode) {
      setCenter(rootNode.position.x, rootNode.position.y, { duration: 800 });
      zoomTo(1.2, { duration: 800 });
    }
  }, [nodes, setCenter, zoomTo]);

  // Reset zoom and center
  const resetView = useCallback(() => {
    fitView({ duration: 800, padding: 0.2 });
  }, [fitView]);

  return (
    <div style={{ width: '100%', height: '92vh' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        minZoom={0.2}
        maxZoom={4}
        defaultEdgeOptions={{
          type: 'smoothstep',
          animated: true,
        }}
      >
        <Background 
          color="#000000" 
          variant={BackgroundVariant.Dots} 
          gap={8} 
          size={1} 
        />
        <Controls showInteractive={false}>
          <ControlButton 
            onClick={centerOnRoot} 
            title="Center on root member"
          >
            <ViewfinderCircleIcon className="w-4 h-4" />
          </ControlButton>
          <ControlButton 
            onClick={resetView}
            title="Reset view"
          >
            <ArrowPathIcon className="w-4 h-4" />
          </ControlButton>
        </Controls>
        <Panel position="bottom-right" className="bg-white shadow-lg rounded-lg p-2">
        <MiniMap 
          nodeColor={(node) => {
            switch (node.data.gender) {
              case 'male':
                return '#93c5fd';
              case 'female':
                return '#f9a8d4';
              default:
                return '#d1d5db';
            }
          }}
          maskColor="rgba(0, 0, 0, 0.1)"
          style={{
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            borderRadius: '8px',
          }}
        />
        </Panel>
        <Panel position="top-right" className="bg-white shadow-lg rounded-lg p-2">
          <div className="flex gap-2">
            <button
              onClick={handleExport}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Export family tree"
            >
              <DocumentArrowDownIcon className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={handleImport}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Import family tree"
            >
              <DocumentArrowUpIcon className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </Panel>
      </ReactFlow>
      <MemberForm
        isOpen={formState.isOpen}
        onClose={handleCloseForm}
        member={formState.member?.data}
        mode={formState.mode}
        position={formState.position}
        onSubmit={handleFormSubmit}
      />
    </div>
  );
};

export default FamilyTree;
