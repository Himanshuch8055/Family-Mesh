import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  UserCircleIcon,
  CalendarIcon,
  MapPinIcon,
  BriefcaseIcon,
  HeartIcon,
  IdentificationIcon,
  ChatBubbleBottomCenterTextIcon
} from '@heroicons/react/24/outline';
import { getRelationshipOptions } from '@/utils/relationshipUtils';

const slideAnimation = {
  initial: { x: '100%', opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { type: "spring", damping: 25, stiffness: 500 } },
  exit: { x: '100%', opacity: 0, transition: { duration: 0.2 } }
};

const FormField = ({ label, error, children, required, hint }) => (
  <div className="space-y-1">
    <div className="flex justify-between items-center">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {hint && (
        <span className="text-xs text-gray-500 dark:text-gray-400">{hint}</span>
      )}
    </div>
    {children}
    <AnimatePresence mode="wait">
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="text-sm text-red-500"
        >
          {error}
        </motion.p>
      )}
    </AnimatePresence>
  </div>
);

const MemberForm = ({ isOpen, onClose, member, mode, position, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    relation: '',
    gender: '',
    birthDate: '',
    occupation: '',
    location: '',
    bio: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const relationshipOptions = useMemo(() => 
    getRelationshipOptions(position, member?.data?.relation, member?.data?.gender) || [],
    [position, member?.data?.relation, member?.data?.gender]
  );

  useEffect(() => {
    if (isOpen) {
      // Disable scrolling on body when form is open
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px'; // Prevent layout shift
      
      if (member) {
        setFormData({
          name: member.data.name || '',
          age: member.data.age?.toString() || '',
          relation: member.data.relation || '',
          gender: member.data.gender || '',
          birthDate: member.data.birthDate || '',
          occupation: member.data.occupation || '',
          location: member.data.location || '',
          bio: member.data.bio || '',
        });
      } else {
        setFormData({
          name: '',
          age: '',
          relation: relationshipOptions[0] || '',
          gender: '',
          birthDate: '',
          occupation: '',
          location: '',
          bio: '',
        });
      }
      setErrors({});
      setIsSubmitting(false);
    } else {
      // Re-enable scrolling when form is closed
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    }

    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = '';
      document.body.style.paddingRight = '';
    };
  }, [isOpen, member, relationshipOptions]);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.age) newErrors.age = 'Age is required';
    else if (isNaN(formData.age) || parseInt(formData.age) < 0 || parseInt(formData.age) > 150) {
      newErrors.age = 'Age must be between 0 and 150';
    }
    if (!formData.relation) newErrors.relation = 'Relation is required';
    if (!formData.gender) newErrors.gender = 'Gender is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    if (validateForm()) {
      try {
        await onSubmit({
          name: formData.name.trim(),
          age: parseInt(formData.age),
          relation: formData.relation,
          gender: formData.gender,
          birthDate: formData.birthDate,
          occupation: formData.occupation,
          location: formData.location,
          bio: formData.bio,
        });
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    }
    setIsSubmitting(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  if (!isOpen) return null;

  const inputClassName = (error) => `
    mt-1 block w-full rounded-md border 
    ${error ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'} 
    px-3 py-2 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 
    bg-white dark:bg-gray-800
    shadow-sm focus:outline-none focus:ring-1 sm:text-sm
    transition-all duration-200 ease-in-out
    hover:border-gray-400 dark:hover:border-gray-500
  `;

  return (
    <div className="fixed inset-0 overflow-hidden z-50 flex items-center justify-end">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      <motion.div
        variants={slideAnimation}
        initial="initial"
        animate="animate"
        exit="exit"
        className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full w-full md:pl-10 sm:w-auto"
      >
        <div className="pointer-events-auto w-full sm:w-screen sm:max-w-md">
          <div className="flex h-full flex-col bg-white dark:bg-gray-800 shadow-xl rounded-none sm:rounded-l-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`p-1.5 sm:p-2 rounded-full ${
                    formData.gender === 'male' ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' :
                    formData.gender === 'female' ? 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300' :
                    'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300'
                  } transition-colors duration-200`}
                >
                  <UserCircleIcon className="h-5 w-5 sm:h-6 sm:w-6" />
                </motion.div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white truncate">
                  {mode === 'edit' ? 'Edit Family Member' : 'Add Family Member'}
                </h2>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="rounded-full p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                onClick={onClose}
              >
                <XMarkIcon className="h-5 w-5 sm:h-6 sm:w-6" />
              </motion.button>
            </div>

            {/* Form */}
            <form className="flex-1 overflow-y-auto p-4 sm:p-6" onSubmit={handleSubmit}>
              <div className="space-y-6 sm:space-y-8">
                {/* Basic Information */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-300 flex items-center space-x-2">
                    <IdentificationIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <span>Basic Information</span>
                  </h3>
                  
                  <FormField 
                    label="Name" 
                    error={errors.name} 
                    required
                    hint="Full name"
                  >
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <UserCircleIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-500 transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`${inputClassName(errors.name)} pl-10 text-sm sm:text-base`}
                        placeholder="Enter full name"
                      />
                    </div>
                  </FormField>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    <FormField 
                      label="Age" 
                      error={errors.age} 
                      required
                      hint="Years"
                    >
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-500 transition-colors" />
                        </div>
                        <input
                          type="number"
                          name="age"
                          value={formData.age}
                          onChange={handleChange}
                          min="0"
                          max="150"
                          className={`${inputClassName(errors.age)} pl-10 text-sm sm:text-base`}
                          placeholder="Age"
                        />
                      </div>
                    </FormField>

                    <FormField 
                      label="Gender" 
                      error={errors.gender} 
                      required
                    >
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-500 transition-colors" />
                        </div>
                        <select
                          name="gender"
                          value={formData.gender}
                          onChange={handleChange}
                          className={`${inputClassName(errors.gender)} pl-10 text-sm sm:text-base`}
                        >
                          <option value="">Select gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </FormField>
                  </div>

                  <FormField 
                    label="Relation" 
                    error={errors.relation} 
                    required
                    hint="Family connection"
                  >
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <HeartIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-500 transition-colors" />
                      </div>
                      <select
                        name="relation"
                        value={formData.relation}
                        onChange={handleChange}
                        className={`${inputClassName(errors.relation)} pl-10 text-sm sm:text-base`}
                      >
                        <option value="">Select relation</option>
                        {relationshipOptions.map((option) => (
                          <option key={option} value={option}>
                            {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </FormField>
                </div>

                {/* Additional Information */}
                <div className="space-y-3 sm:space-y-4">
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-300 flex items-center space-x-2">
                    <ChatBubbleBottomCenterTextIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" />
                    <span>Additional Information</span>
                  </h3>

                  <FormField 
                    label="Birth Date"
                    hint="Optional"
                  >
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <CalendarIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-500 transition-colors" />
                      </div>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className={`${inputClassName()} pl-10 text-sm sm:text-base`}
                      />
                    </div>
                  </FormField>

                  <FormField 
                    label="Occupation"
                    hint="Optional"
                  >
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <BriefcaseIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-500 transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        className={`${inputClassName()} pl-10 text-sm sm:text-base`}
                        placeholder="Enter occupation"
                      />
                    </div>
                  </FormField>

                  <FormField 
                    label="Location"
                    hint="Optional"
                  >
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPinIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-hover:text-gray-500 transition-colors" />
                      </div>
                      <input
                        type="text"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        className={`${inputClassName()} pl-10 text-sm sm:text-base`}
                        placeholder="Enter location"
                      />
                    </div>
                  </FormField>

                  <FormField 
                    label="Bio"
                    hint="Optional"
                  >
                    <textarea
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows="3"
                      className={`${inputClassName()} resize-none text-sm sm:text-base`}
                      placeholder="Write a brief biography..."
                    />
                  </FormField>
                </div>
              </div>
            </form>

            {/* Footer */}
            <div className="flex justify-end gap-2 sm:gap-3 border-t border-gray-200 dark:border-gray-700 px-4 sm:px-6 py-3 sm:py-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={onClose}
                className="rounded-md px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
              >
                Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                className={`
                  rounded-md px-3 sm:px-4 py-1.5 sm:py-2 text-sm font-medium text-white
                  ${isSubmitting 
                    ? 'bg-blue-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'}
                  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                  transition-colors duration-200
                  disabled:opacity-50
                `}
              >
                {isSubmitting ? 'Saving...' : mode === 'edit' ? 'Save Changes' : 'Add Member'}
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MemberForm;
