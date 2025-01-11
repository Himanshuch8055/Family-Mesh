import { memo, useCallback, useState, useRef } from 'react';
import { Handle, Position } from 'reactflow';
import { PencilIcon, TrashIcon, PlusCircleIcon, UserIcon, XMarkIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { getRelationshipDescription } from '@/utils/relationshipUtils';

const ConfirmDialog = ({ isOpen, onClose, onConfirm, member }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute -right-3 top-0 z-0 mt-10">
      <div className="relative bg-white rounded-lg shadow-xl border border-gray-200 w-64">
        {/* Arrow */}
        <div className="absolute -top-2 right-4 w-4 h-4 rotate-45 bg-white border-l border-t border-gray-200" />
        
        <div className="px-4 py-3">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <ExclamationTriangleIcon className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Delete Member?
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                Are you sure you want to remove {member.name}? This cannot be undone.
              </p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 px-4 py-3 flex justify-end space-x-2">
          <button
            type="button"
            className="px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-2 py-1 text-xs font-medium text-white bg-red-600 hover:bg-red-700 rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

const CustomNode = ({ id, data, isConnectable }) => {
  const [showActions, setShowActions] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleEdit = useCallback(() => {
    const event = new CustomEvent('openMemberForm', {
      detail: { 
        id, 
        data,
        mode: 'edit',
        parentId: null,
        position: null 
      }
    });
    window.dispatchEvent(event);
  }, [id, data]);

  const onDelete = useCallback((event) => {
    event.stopPropagation();
    setShowConfirmDelete(true);
  }, []);

  const handleConfirmDelete = useCallback(() => {
    setShowConfirmDelete(false);
    const event = new CustomEvent('deleteNode', {
      detail: { id }
    });
    window.dispatchEvent(event);
  }, [id]);

  const handleAddMember = useCallback((position) => {
    const event = new CustomEvent('openMemberForm', {
      detail: {
        mode: 'add',
        parentId: id,
        position,
        parentRelation: data.relation,
        parentGender: data.gender
      }
    });
    window.dispatchEvent(event);
  }, [id, data]);

  const getIconColor = () => {
    switch (data.gender) {
      case 'male':
        return 'bg-blue-100 text-blue-600';
      case 'female':
        return 'bg-pink-100 text-pink-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => {
        setShowActions(false);
        if (!showConfirmDelete) {
          setShowConfirmDelete(false);
        }
      }}
    >
      {/* Add Parent Button */}
      {!data.isRoot && (
        <button
          className="absolute -top-8 left-1/2 transform -translate-x-1/2 p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100"
          onClick={() => handleAddMember('top')}
          title="Add parent"
        >
          <PlusCircleIcon className="h-5 w-5 text-blue-500" />
        </button>
      )}

      {/* Add Sibling Button (Left) */}
      <button
        className="absolute top-1/2 -left-8 transform -translate-y-1/2 p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100"
        onClick={() => handleAddMember('left')}
        title="Add family member"
      >
        <PlusCircleIcon className="h-5 w-5 text-blue-500" />
      </button>

      {/* Add Sibling Button (Right) */}
      <button
        className="absolute top-1/2 -right-8 transform -translate-y-1/2 p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100"
        onClick={() => handleAddMember('right')}
        title="Add family member"
      >
        <PlusCircleIcon className="h-5 w-5 text-blue-500" />
      </button>

      {/* Add Child Button */}
      <button
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 p-1 rounded-full bg-white shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100"
        onClick={() => handleAddMember('bottom')}
        title="Add child"
      >
        <PlusCircleIcon className="h-5 w-5 text-blue-500" />
      </button>

      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="w-2 h-2"
      />
      
      <div className="px-4 py-3 shadow-lg rounded-lg bg-white border-2 border-gray-200 min-w-[250px] hover:shadow-xl transition-shadow">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-full ${getIconColor()}`}>
              <UserIcon className="h-6 w-6" />
            </div>
            <div>
              <div className="text-lg font-bold text-gray-900">{data.name || 'Name'}</div>
              <div className="text-sm text-gray-500 flex items-center gap-2">
                <span>Age: {data.age || 'N/A'}</span>
                {data.birthDate && <span>• Born: {new Date(data.birthDate).toLocaleDateString()}</span>}
              </div>
              <div className="text-sm text-gray-500">
                {getRelationshipDescription(data.relation || '', data.name)} 
                {data.location && ` • ${data.location}`}
              </div>
              {data.occupation && (
                <div className="text-sm text-gray-500">{data.occupation}</div>
              )}
              {data.bio && (
                <div className="text-sm text-gray-500 mt-1 italic">{data.bio}</div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
              onClick={handleEdit}
              title="Edit member"
            >
              <PencilIcon className="h-4 w-4 text-blue-500" />
            </button>
            {!data.isRoot && (
              <button
                className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                onClick={onDelete}
                title="Delete member"
              >
                <TrashIcon className="h-4 w-4 text-red-500" />
              </button>
            )}
          </div>
        </div>
        <Handle
          type="source"
          position={Position.Bottom}
          isConnectable={isConnectable}
          className="w-2 h-2"
        />
      </div>

      <ConfirmDialog
        isOpen={showConfirmDelete}
        onClose={() => setShowConfirmDelete(false)}
        onConfirm={handleConfirmDelete}
        member={data}
      />
    </div>
  );
};

export default memo(CustomNode);
