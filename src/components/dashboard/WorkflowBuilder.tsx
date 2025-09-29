"use client";

import React, { useState, useRef } from 'react';
import { PlusCircle, X, ChevronRight, Twitter, Mail, Clock, Sparkles, Zap, ArrowRight, Save } from 'lucide-react';

type NodeType = 'trigger' | 'action';

interface Node {
  id: string;
  type: NodeType;
  title: string;
  description: string;
  icon: React.ReactNode;
  position: { x: number; y: number };
  config: Record<string, any>;
}

interface WorkflowConfig {
  nodes: {
    id: string;
    type: NodeType;
    title: string;
    description: string;
    position: { x: number; y: number };
    config: Record<string, any>;
  }[];
  connections: {
    id: string;
    sourceId: string;
    targetId: string;
  }[];
}

interface WorkflowBuilderProps {
  initialWorkflow?: WorkflowConfig;
}

interface Connection {
  id: string;
  sourceId: string;
  targetId: string;
}

export default function WorkflowBuilder({ initialWorkflow }: WorkflowBuilderProps = {}) {
  const [nodes, setNodes] = useState<Node[]>(() => {
    if (initialWorkflow?.nodes) {
      // Map the nodes from the initial workflow and add icons
      return initialWorkflow.nodes.map(node => {
        let icon;
        if (node.type === 'trigger') {
          if (node.title.includes('Mention')) {
            icon = <Twitter className="h-5 w-5 text-sky-400" />;
          } else if (node.title.includes('Schedule')) {
            icon = <Clock className="h-5 w-5 text-purple-400" />;
          } else if (node.title.includes('Follower')) {
            icon = <Twitter className="h-5 w-5 text-sky-400" />;
          } else {
            icon = <Zap className="h-5 w-5 text-amber-400" />;
          }
        } else { // action
          if (node.title.includes('Tweet') || node.title.includes('Reply')) {
            icon = <Twitter className="h-5 w-5 text-sky-400" />;
          } else if (node.title.includes('DM')) {
            icon = <Mail className="h-5 w-5 text-green-400" />;
          } else if (node.title.includes('AI')) {
            icon = <Sparkles className="h-5 w-5 text-amber-400" />;
          } else {
            icon = <Zap className="h-5 w-5 text-sky-400" />;
          }
        }
        
        return {
          ...node,
          icon
        };
      });
    }
    
    // Default node if no initial workflow
    return [{
      id: 'trigger-1',
      type: 'trigger',
      title: 'New Tweet Mention',
      description: 'Triggers when someone mentions you in a tweet',
      icon: <Twitter className="h-5 w-5 text-sky-400" />,
      position: { x: 100, y: 100 },
      config: {}
    }];
  });
  
  const [connections, setConnections] = useState<Connection[]>(() => {
    return initialWorkflow?.connections || [];
  });
  const [isDragging, setIsDragging] = useState(false);
  const [draggedNode, setDraggedNode] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showNodeSelector, setShowNodeSelector] = useState(false);
  const [nodeSelectorPosition, setNodeSelectorPosition] = useState({ x: 0, y: 0 });
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [workflowName, setWorkflowName] = useState('My Twitter Workflow');
  
  const canvasRef = useRef<HTMLDivElement>(null);

  // Available node templates
  const nodeTemplates = {
    triggers: [
      {
        id: 'new-tweet-mention',
        title: 'New Tweet Mention',
        description: 'Triggers when someone mentions you in a tweet',
        icon: <Twitter className="h-5 w-5 text-sky-400" />
      },
      {
        id: 'scheduled-time',
        title: 'Schedule',
        description: 'Triggers at a scheduled time',
        icon: <Clock className="h-5 w-5 text-purple-400" />
      },
      {
        id: 'new-follower',
        title: 'New Follower',
        description: 'Triggers when someone follows you',
        icon: <Twitter className="h-5 w-5 text-sky-400" />
      }
    ],
    actions: [
      {
        id: 'send-tweet',
        title: 'Send Tweet',
        description: 'Post a new tweet to your timeline',
        icon: <Twitter className="h-5 w-5 text-sky-400" />
      },
      {
        id: 'send-dm',
        title: 'Send DM',
        description: 'Send a direct message to a user',
        icon: <Mail className="h-5 w-5 text-green-400" />
      },
      {
        id: 'generate-ai-response',
        title: 'Generate AI Response',
        description: 'Create an AI-generated response',
        icon: <Sparkles className="h-5 w-5 text-amber-400" />
      }
    ]
  };

  // Handle node drag start
  const handleNodeMouseDown = (e: React.MouseEvent, nodeId: string) => {
    if (e.button !== 0) return; // Only left mouse button
    
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    setIsDragging(true);
    setDraggedNode(nodeId);
    setSelectedNode(nodeId);
    
    e.stopPropagation();
  };

  // Handle mouse move for dragging
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !draggedNode || !canvasRef.current) return;
    
    const canvasRect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - canvasRect.left - dragOffset.x;
    const y = e.clientY - canvasRect.top - dragOffset.y;
    
    setNodes(prev => prev.map(node => {
      if (node.id === draggedNode) {
        return { ...node, position: { x, y } };
      }
      return node;
    }));
  };

  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    setDraggedNode(null);
  };

  // Add a new node
  const addNode = (template: any, type: NodeType, position: { x: number, y: number }) => {
    const newId = `${type}-${Date.now()}`;
    const newNode: Node = {
      id: newId,
      type,
      title: template.title,
      description: template.description,
      icon: template.icon,
      position,
      config: {}
    };
    
    setNodes(prev => [...prev, newNode]);
    setShowNodeSelector(false);
    
    // If there's a selected node, create a connection
    if (selectedNode) {
      const sourceNode = nodes.find(n => n.id === selectedNode);
      if (sourceNode && sourceNode.type === 'trigger' && type === 'action') {
        const newConnection: Connection = {
          id: `connection-${Date.now()}`,
          sourceId: selectedNode,
          targetId: newId
        };
        setConnections(prev => [...prev, newConnection]);
      }
    }
    
    setSelectedNode(newId);
  };

  // Open node selector
  const handleAddNode = (e: React.MouseEvent) => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      setNodeSelectorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setShowNodeSelector(true);
    }
  };

  // Delete a node
  const deleteNode = (nodeId: string) => {
    setNodes(prev => prev.filter(node => node.id !== nodeId));
    setConnections(prev => prev.filter(conn => 
      conn.sourceId !== nodeId && conn.targetId !== nodeId
    ));
    if (selectedNode === nodeId) {
      setSelectedNode(null);
    }
  };

  // Render connections between nodes
  const renderConnections = () => {
    return connections.map(connection => {
      const sourceNode = nodes.find(n => n.id === connection.sourceId);
      const targetNode = nodes.find(n => n.id === connection.targetId);
      
      if (!sourceNode || !targetNode) return null;
      
      const sourceX = sourceNode.position.x + 150; // Right side of source node
      const sourceY = sourceNode.position.y + 40; // Middle of source node
      const targetX = targetNode.position.x; // Left side of target node
      const targetY = targetNode.position.y + 40; // Middle of target node
      
      // Create a path with a bezier curve
      const path = `M ${sourceX} ${sourceY} C ${sourceX + 50} ${sourceY}, ${targetX - 50} ${targetY}, ${targetX} ${targetY}`;
      
      return (
        <svg 
          key={connection.id} 
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-0"
        >
          <path 
            d={path} 
            stroke="#3b82f6" 
            strokeWidth="2" 
            fill="none" 
            strokeDasharray={selectedNode === connection.sourceId || selectedNode === connection.targetId ? "none" : "5,5"}
          />
          <polygon 
            points={`${targetX},${targetY} ${targetX-8},${targetY-4} ${targetX-8},${targetY+4}`} 
            fill="#3b82f6" 
          />
        </svg>
      );
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Workflow header */}
      <div className="bg-slate-800 p-4 rounded-t-lg border-b border-slate-700 flex items-center justify-between">
        <div className="flex items-center">
          <Zap className="h-5 w-5 text-sky-400 mr-2" />
          <input 
            type="text" 
            value={workflowName}
            onChange={(e) => setWorkflowName(e.target.value)}
            className="bg-transparent text-white text-lg font-medium focus:outline-none border-b border-transparent focus:border-sky-500"
          />
        </div>
        <button 
          className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors"
        >
          <Save className="h-4 w-4 mr-2" />
          Save Workflow
        </button>
      </div>
      
      {/* Workflow canvas */}
      <div 
        ref={canvasRef}
        className="flex-1 bg-slate-900 relative overflow-auto p-4"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onClick={() => setSelectedNode(null)}
      >
        {/* Grid background */}
        <div className="absolute inset-0 bg-grid-slate-800/50" style={{ 
          backgroundImage: 'linear-gradient(to right, #1e293b22 1px, transparent 1px), linear-gradient(to bottom, #1e293b22 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
        
        {/* Render connections */}
        {renderConnections()}
        
        {/* Render nodes */}
        {nodes.map(node => (
          <div 
            key={node.id}
            className={`absolute bg-slate-800 rounded-lg shadow-lg border-2 transition-all ${selectedNode === node.id ? 'border-sky-500' : 'border-slate-700'} w-72`}
            style={{ 
              left: `${node.position.x}px`, 
              top: `${node.position.y}px`,
              zIndex: selectedNode === node.id ? 10 : 1
            }}
            onMouseDown={(e) => handleNodeMouseDown(e, node.id)}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedNode(node.id);
            }}
          >
            <div className={`p-3 rounded-t-md flex items-center justify-between ${node.type === 'trigger' ? 'bg-purple-500/20' : 'bg-sky-500/20'}`}>
              <div className="flex items-center">
                {node.icon}
                <span className="ml-2 font-medium text-white">{node.title}</span>
              </div>
              <button 
                className="text-slate-400 hover:text-white transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteNode(node.id);
                }}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="p-3">
              <p className="text-slate-300 text-sm">{node.description}</p>
              
              {/* Node configuration UI would go here */}
              <div className="mt-3 pt-3 border-t border-slate-700">
                {node.type === 'trigger' && (
                  <button 
                    className="flex items-center justify-center w-full text-sm text-sky-400 hover:text-sky-300 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedNode(node.id);
                      setNodeSelectorPosition({
                        x: node.position.x + 300,
                        y: node.position.y
                      });
                      setShowNodeSelector(true);
                    }}
                  >
                    <span>Add Action</span>
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
        
        {/* Add node button */}
        <button 
          className="fixed bottom-6 right-6 bg-sky-500 hover:bg-sky-600 text-white p-3 rounded-full shadow-lg transition-colors"
          onClick={handleAddNode}
        >
          <PlusCircle className="h-6 w-6" />
        </button>
        
        {/* Node selector */}
        {showNodeSelector && (
          <div 
            className="absolute bg-slate-800 rounded-lg shadow-xl border border-slate-700 w-72 z-20"
            style={{ left: `${nodeSelectorPosition.x}px`, top: `${nodeSelectorPosition.y}px` }}
          >
            <div className="p-3 border-b border-slate-700 flex justify-between items-center">
              <h3 className="font-medium text-white">Add Node</h3>
              <button 
                className="text-slate-400 hover:text-white transition-colors"
                onClick={() => setShowNodeSelector(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            
            <div className="p-2 max-h-96 overflow-y-auto">
              {!selectedNode && (
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-slate-400 px-2 py-1">Triggers</h4>
                  {nodeTemplates.triggers.map(template => (
                    <button 
                      key={template.id}
                      className="w-full text-left p-2 hover:bg-slate-700 rounded-md flex items-start transition-colors"
                      onClick={() => addNode(template, 'trigger', nodeSelectorPosition)}
                    >
                      <div className="mt-0.5">{template.icon}</div>
                      <div className="ml-2">
                        <div className="text-white font-medium">{template.title}</div>
                        <div className="text-slate-400 text-xs">{template.description}</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
              
              <div>
                <h4 className="text-sm font-medium text-slate-400 px-2 py-1">Actions</h4>
                {nodeTemplates.actions.map(template => (
                  <button 
                    key={template.id}
                    className="w-full text-left p-2 hover:bg-slate-700 rounded-md flex items-start transition-colors"
                    onClick={() => addNode(template, 'action', nodeSelectorPosition)}
                  >
                    <div className="mt-0.5">{template.icon}</div>
                    <div className="ml-2">
                      <div className="text-white font-medium">{template.title}</div>
                      <div className="text-slate-400 text-xs">{template.description}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
