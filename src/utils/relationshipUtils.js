// Define relationship types and their properties
export const RELATIONSHIP_TYPES = {
  PARENT: {
    type: 'parent',
    inverse: 'child',
    position: 'top',
    edgeType: 'smoothstep',
    styles: { stroke: '#2563eb', strokeWidth: 2 },
  },
  CHILD: {
    type: 'child',
    inverse: 'parent',
    position: 'bottom',
    edgeType: 'smoothstep',
    styles: { stroke: '#2563eb', strokeWidth: 2 },
  },
  SPOUSE: {
    type: 'spouse',
    inverse: 'spouse',
    position: 'right',
    edgeType: 'straight',
    styles: { stroke: '#dc2626', strokeWidth: 2, strokeDasharray: '5,5' },
  },
  SIBLING: {
    type: 'sibling',
    inverse: 'sibling',
    position: 'right',
    edgeType: 'step',
    styles: { stroke: '#059669', strokeWidth: 2 },
  },
  GRANDPARENT: {
    type: 'grandparent',
    inverse: 'grandchild',
    position: 'top',
    edgeType: 'smoothstep',
    styles: { stroke: '#7c3aed', strokeWidth: 2 },
  },
  GRANDCHILD: {
    type: 'grandchild',
    inverse: 'grandparent',
    position: 'bottom',
    edgeType: 'smoothstep',
    styles: { stroke: '#7c3aed', strokeWidth: 2 },
  },
  IN_LAW: {
    type: 'in-law',
    inverse: 'in-law',
    position: 'right',
    edgeType: 'straight',
    styles: { stroke: '#ea580c', strokeWidth: 2, strokeDasharray: '3,3' },
  },
  COUSIN: {
    type: 'cousin',
    inverse: 'cousin',
    position: 'right',
    edgeType: 'step',
    styles: { stroke: '#0891b2', strokeWidth: 2 },
  },
};

export const RELATION_LABELS = {
  // Parents
  father: { type: RELATIONSHIP_TYPES.PARENT, gender: 'male' },
  mother: { type: RELATIONSHIP_TYPES.PARENT, gender: 'female' },
  
  // Children
  son: { type: RELATIONSHIP_TYPES.CHILD, gender: 'male' },
  daughter: { type: RELATIONSHIP_TYPES.CHILD, gender: 'female' },
  
  // Spouses
  husband: { type: RELATIONSHIP_TYPES.SPOUSE, gender: 'male' },
  wife: { type: RELATIONSHIP_TYPES.SPOUSE, gender: 'female' },
  
  // Siblings
  brother: { type: RELATIONSHIP_TYPES.SIBLING, gender: 'male' },
  sister: { type: RELATIONSHIP_TYPES.SIBLING, gender: 'female' },
  
  // Grandparents
  grandfather: { type: RELATIONSHIP_TYPES.GRANDPARENT, gender: 'male' },
  grandmother: { type: RELATIONSHIP_TYPES.GRANDPARENT, gender: 'female' },
  
  // Grandchildren
  grandson: { type: RELATIONSHIP_TYPES.GRANDCHILD, gender: 'male' },
  granddaughter: { type: RELATIONSHIP_TYPES.GRANDCHILD, gender: 'female' },
  
  // In-laws
  'father-in-law': { type: RELATIONSHIP_TYPES.IN_LAW, gender: 'male' },
  'mother-in-law': { type: RELATIONSHIP_TYPES.IN_LAW, gender: 'female' },
  'brother-in-law': { type: RELATIONSHIP_TYPES.IN_LAW, gender: 'male' },
  'sister-in-law': { type: RELATIONSHIP_TYPES.IN_LAW, gender: 'female' },
  'son-in-law': { type: RELATIONSHIP_TYPES.IN_LAW, gender: 'male' },
  'daughter-in-law': { type: RELATIONSHIP_TYPES.IN_LAW, gender: 'female' },
  
  // Cousins
  'male-cousin': { type: RELATIONSHIP_TYPES.COUSIN, gender: 'male' },
  'female-cousin': { type: RELATIONSHIP_TYPES.COUSIN, gender: 'female' },

  // Aunts and Uncles
  uncle: { type: RELATIONSHIP_TYPES.PARENT, gender: 'male', extended: true },
  aunt: { type: RELATIONSHIP_TYPES.PARENT, gender: 'female', extended: true },
  
  // Nieces and Nephews
  nephew: { type: RELATIONSHIP_TYPES.CHILD, gender: 'male', extended: true },
  niece: { type: RELATIONSHIP_TYPES.CHILD, gender: 'female', extended: true },
};

export const getRelationshipType = (relation) => {
  const normalizedRelation = relation.toLowerCase();
  return RELATION_LABELS[normalizedRelation]?.type || null;
};

export const getRelationshipOptions = (position, parentRelation, parentGender) => {
  const options = [];

  switch (position) {
    case 'top':
      if (!parentRelation || parentRelation === 'Self') {
        options.push('father', 'mother');
      } else if (parentRelation.includes('father') || parentRelation.includes('mother')) {
        options.push('grandfather', 'grandmother');
      }
      break;
    case 'bottom':
      if (!parentRelation || parentRelation === 'Self') {
        options.push('son', 'daughter');
      } else if (parentRelation.includes('son') || parentRelation.includes('daughter')) {
        options.push('grandson', 'granddaughter');
      }
      break;
    case 'right':
    case 'left':
      if (!parentRelation || parentRelation === 'Self') {
        options.push('husband', 'wife', 'brother', 'sister');
      } else if (parentRelation.includes('spouse')) {
        // No additional spouses
      } else if (parentRelation.includes('brother') || parentRelation.includes('sister')) {
        options.push('male-cousin', 'female-cousin');
      } else if (parentGender === 'male') {
        options.push('brother-in-law', 'sister-in-law');
      } else if (parentGender === 'female') {
        options.push('brother-in-law', 'sister-in-law');
      }
      break;
  }

  return options;
};

export const getEdgeStyle = (relation) => {
  const relationType = getRelationshipType(relation);
  return relationType ? relationType.styles : RELATIONSHIP_TYPES.CHILD.styles;
};

export const getEdgeType = (relation) => {
  const relationType = getRelationshipType(relation);
  return relationType ? relationType.edgeType : 'smoothstep';
};

export const shouldCreateEdge = (sourceRelation, targetRelation, position) => {
  const sourceType = getRelationshipType(sourceRelation);
  const targetType = getRelationshipType(targetRelation);

  if (!sourceType || !targetType) return false;

  // Parent-child relationships (including grandparents)
  if (position === 'bottom' && 
      (sourceType === RELATIONSHIP_TYPES.PARENT || sourceType === RELATIONSHIP_TYPES.GRANDPARENT) && 
      (targetType === RELATIONSHIP_TYPES.CHILD || targetType === RELATIONSHIP_TYPES.GRANDCHILD)) {
    return true;
  }

  // Child-parent relationships (including grandchildren)
  if (position === 'top' && 
      (sourceType === RELATIONSHIP_TYPES.CHILD || sourceType === RELATIONSHIP_TYPES.GRANDCHILD) && 
      (targetType === RELATIONSHIP_TYPES.PARENT || targetType === RELATIONSHIP_TYPES.GRANDPARENT)) {
    return true;
  }

  // Spouse relationships
  if ((position === 'left' || position === 'right') && 
      sourceType === RELATIONSHIP_TYPES.SPOUSE && 
      targetType === RELATIONSHIP_TYPES.SPOUSE) {
    return true;
  }

  // Sibling relationships
  if ((position === 'left' || position === 'right') && 
      sourceType === RELATIONSHIP_TYPES.SIBLING && 
      targetType === RELATIONSHIP_TYPES.SIBLING) {
    return true;
  }

  // In-law relationships
  if ((position === 'left' || position === 'right') && 
      (sourceType === RELATIONSHIP_TYPES.IN_LAW || targetType === RELATIONSHIP_TYPES.IN_LAW)) {
    return true;
  }

  // Cousin relationships
  if ((position === 'left' || position === 'right') && 
      sourceType === RELATIONSHIP_TYPES.COUSIN && 
      targetType === RELATIONSHIP_TYPES.COUSIN) {
    return true;
  }

  return false;
};

// Get relationship description for the node
export const getRelationshipDescription = (relation, name) => {
  const normalizedRelation = relation.toLowerCase();
  switch (normalizedRelation) {
    case 'father':
    case 'mother':
      return `Parent of the family`;
    case 'son':
    case 'daughter':
      return `Child of the family`;
    case 'husband':
    case 'wife':
      return `Spouse of ${name}`;
    case 'brother':
    case 'sister':
      return `Sibling in the family`;
    case 'grandfather':
    case 'grandmother':
      return `Grandparent of the family`;
    case 'grandson':
    case 'granddaughter':
      return `Grandchild in the family`;
    case 'father-in-law':
    case 'mother-in-law':
      return `Parent-in-law of ${name}`;
    case 'brother-in-law':
    case 'sister-in-law':
      return `Sibling-in-law of ${name}`;
    case 'son-in-law':
    case 'daughter-in-law':
      return `Child-in-law of ${name}`;
    case 'male-cousin':
    case 'female-cousin':
      return `Cousin in the family`;
    case 'uncle':
    case 'aunt':
      return `Extended family member`;
    case 'nephew':
    case 'niece':
      return `Extended family member`;
    default:
      return relation;
  }
};
