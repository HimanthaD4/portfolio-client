import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaSpinner, FaArrowLeft, FaTimes, FaExternalLinkAlt, FaStar, FaRegStar } from 'react-icons/fa';
import { FiLayers, FiCode, FiDatabase, FiCpu, FiSmartphone, FiMonitor, FiPackage } from 'react-icons/fi';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminProjects = () => {
  const { isAuthenticated, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProject, setCurrentProject] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);

  const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

  const techTags = [
    'React', 'Express', 'MongoDB', 'Node.js', 'SQL', 
    'PostgreSQL', 'Laravel', 'PHP', 'TensorFlow', 'Java',
    'JavaScript', 'Python', 'TypeScript', 'Django', 'Flask',
    'Vue', 'Angular', 'Svelte', 'Next.js', 'NestJS',
    'GraphQL', 'Firebase', 'AWS', 'Docker', 'Kubernetes'
  ];

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    tags: [],
    category: 'web',
    featured: false,
    image: null,
    github: '',
    live: ''
  });

  const [errors, setErrors] = useState({
    title: '',
    description: '',
    tags: '',
    github: '',
    live: ''
  });

  const categoryIcons = {
    web: <FiLayers />,
    ai: <FiCpu />,
    mobile: <FiSmartphone />,
    desktop: <FiMonitor />,
    game: <FiPackage />,
    embedded: <FiCode />,
    other: <FiDatabase />
  };

  const styles = {
    pageContainer: {
      minHeight: '100vh',
      backgroundColor: '#f8fafc',
      padding: '32px 16px'
    },
    container: {
      maxWidth: '1400px',
      margin: '0 auto'
    },
    header: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '32px'
    },
    backButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      padding: '8px 16px',
      backgroundColor: '#ffffff',
      color: '#1e40af',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      border: '1px solid #e5e7eb',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    backButtonHover: {
      backgroundColor: '#f0f7ff'
    },
    title: {
      fontSize: '24px',
      fontWeight: '600',
      color: '#1e40af'
    },
    statusContainer: {
      marginBottom: '24px'
    },
    errorBox: {
      padding: '16px',
      backgroundColor: '#fef2f2',
      borderLeft: '4px solid #ef4444',
      color: '#b91c1c',
      borderRadius: '4px',
      marginBottom: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    successBox: {
      padding: '16px',
      backgroundColor: '#f0fdf4',
      borderLeft: '4px solid #10b981',
      color: '#065f46',
      borderRadius: '4px',
      marginBottom: '16px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    },
    formContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      marginBottom: '32px',
      overflow: 'hidden'
    },
    formHeader: {
      padding: '16px 24px',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#1e40af',
      color: 'white'
    },
    formTitle: {
      fontSize: '18px',
      fontWeight: '600'
    },
    formContent: {
      padding: '24px'
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '24px',
      marginBottom: '24px'
    },
    formGroup: {
      marginBottom: '16px'
    },
    label: {
      display: 'block',
      marginBottom: '8px',
      fontSize: '14px',
      fontWeight: '500',
      color: '#374151'
    },
    input: {
      width: '100%',
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      transition: 'all 0.2s ease'
    },
    inputError: {
      borderColor: '#ef4444',
      boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.1)'
    },
    inputFocus: {
      borderColor: '#1e40af',
      boxShadow: '0 0 0 3px rgba(30, 64, 175, 0.1)'
    },
    errorText: {
      marginTop: '4px',
      fontSize: '12px',
      color: '#ef4444'
    },
    textarea: {
      width: '100%',
      minHeight: '120px',
      padding: '10px 12px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      fontSize: '14px',
      transition: 'all 0.2s ease'
    },
    charCount: {
      marginTop: '4px',
      fontSize: '12px',
      color: '#6b7280'
    },
    imageUpload: {
      marginBottom: '16px'
    },
    fileInputLabel: {
      display: 'inline-block',
      padding: '8px 16px',
      backgroundColor: '#eff6ff',
      color: '#1e40af',
      borderRadius: '6px',
      cursor: 'pointer',
      marginRight: '16px',
      transition: 'all 0.2s ease'
    },
    fileInputLabelHover: {
      backgroundColor: '#dbeafe'
    },
    imagePreviewContainer: {
      position: 'relative',
      display: 'inline-block'
    },
    imagePreview: {
      width: '64px',
      height: '64px',
      objectFit: 'cover',
      borderRadius: '6px',
      border: '1px solid #e5e7eb',
      cursor: 'pointer'
    },
    removeImageButton: {
      position: 'absolute',
      top: '-8px',
      right: '-8px',
      width: '20px',
      height: '20px',
      backgroundColor: '#ef4444',
      color: '#ffffff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: 'none'
    },
    buttonGroup: {
      display: 'flex',
      gap: '16px'
    },
    submitButton: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      padding: '10px 20px',
      backgroundColor: '#1e40af',
      color: '#ffffff',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    submitButtonHover: {
      backgroundColor: '#1e3a8a'
    },
    submitButtonDisabled: {
      opacity: '0.7',
      cursor: 'not-allowed'
    },
    cancelButton: {
      padding: '10px 20px',
      backgroundColor: '#e5e7eb',
      color: '#374151',
      borderRadius: '6px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.2s ease'
    },
    cancelButtonHover: {
      backgroundColor: '#d1d5db'
    },
    projectsListContainer: {
      backgroundColor: '#ffffff',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      overflow: 'hidden'
    },
    listHeader: {
      padding: '16px 24px',
      borderBottom: '1px solid #e5e7eb',
      backgroundColor: '#1e40af',
      color: 'white'
    },
    listTitle: {
      fontSize: '18px',
      fontWeight: '600'
    },
    emptyState: {
      padding: '32px',
      textAlign: 'center',
      color: '#6b7280'
    },
    projectItem: {
      padding: '16px 24px',
      borderBottom: '1px solid #e5e7eb',
      transition: 'all 0.2s ease'
    },
    projectItemHover: {
      backgroundColor: '#f9fafb'
    },
    projectContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    },
    projectRow: {
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    },
    projectImage: {
      width: '80px',
      height: '80px',
      objectFit: 'cover',
      borderRadius: '6px',
      border: '1px solid #e5e7eb'
    },
    projectDetails: {
      flex: '1'
    },
    projectTitle: {
      fontSize: '16px',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '4px',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    projectCategory: {
      fontSize: '14px',
      color: '#6b7280',
      display: 'flex',
      alignItems: 'center',
      gap: '4px'
    },
    projectDescription: {
      fontSize: '14px',
      color: '#4b5563',
      lineHeight: '1.5'
    },
    projectTags: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      marginTop: '8px'
    },
    tag: {
      padding: '4px 8px',
      backgroundColor: '#e0e7ff',
      color: '#4338ca',
      borderRadius: '999px',
      fontSize: '12px'
    },
    projectActions: {
      display: 'flex',
      gap: '8px'
    },
    actionButton: {
      padding: '8px',
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      color: '#6b7280',
      transition: 'all 0.2s ease'
    },
    editButtonHover: {
      color: '#1e40af'
    },
    deleteButtonHover: {
      color: '#ef4444'
    },
    modalOverlay: {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      backgroundColor: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: '50',
      padding: '16px'
    },
    modalContent: {
      position: 'relative',
      maxWidth: '90vw',
      maxHeight: '90vh'
    },
    modalImage: {
      maxWidth: '100%',
      maxHeight: '80vh',
      objectFit: 'contain'
    },
    closeButton: {
      position: 'absolute',
      top: '16px',
      right: '16px',
      width: '32px',
      height: '32px',
      backgroundColor: '#ef4444',
      color: '#ffffff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      border: 'none'
    },
    loadingContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      backgroundColor: '#f8fafc'
    },
    spinner: {
      color: '#1e40af',
      animation: 'spin 1s linear infinite'
    },
    loadingText: {
      marginTop: '16px',
      color: '#6b7280'
    },
    featuredToggle: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      cursor: 'pointer'
    },
    featuredIcon: {
      color: '#f59e0b'
    },
    tagsDropdown: {
      position: 'relative',
      marginBottom: '16px'
    },
    tagsInput: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '8px',
      padding: '8px',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      minHeight: '42px'
    },
    tagPill: {
      display: 'flex',
      alignItems: 'center',
      padding: '4px 8px',
      backgroundColor: '#e0e7ff',
      color: '#4338ca',
      borderRadius: '999px',
      fontSize: '12px'
    },
    removeTag: {
      marginLeft: '4px',
      cursor: 'pointer'
    },
    dropdownMenu: {
      position: 'absolute',
      top: '100%',
      left: '0',
      right: '0',
      maxHeight: '200px',
      overflowY: 'auto',
      backgroundColor: 'white',
      border: '1px solid #d1d5db',
      borderRadius: '6px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: '10'
    },
    dropdownItem: {
      padding: '8px 16px',
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    dropdownItemHover: {
      backgroundColor: '#f3f4f6'
    },
    dropdownItemSelected: {
      backgroundColor: '#e0e7ff'
    }
  };

  useEffect(() => {
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
      return;
    }
    fetchProjects();
  }, [isAuthenticated, isAdmin, navigate]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/projects`);
      setProjects(response.data.data || response.data);
      setLoading(false);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Failed to fetch projects';
      setError(errorMsg);
      setLoading(false);
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      title: '',
      description: '',
      tags: '',
      github: '',
      live: ''
    };

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
      isValid = false;
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title cannot exceed 100 characters';
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    } else if (formData.description.length < 50) {
      newErrors.description = 'Description should be at least 50 characters';
      isValid = false;
    } else if (formData.description.length > 2000) {
      newErrors.description = 'Description cannot exceed 2000 characters';
      isValid = false;
    }

    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
      isValid = false;
    }

    if (formData.github && !isValidUrl(formData.github)) {
      newErrors.github = 'Please enter a valid URL';
      isValid = false;
    }

    if (formData.live && !isValidUrl(formData.live)) {
      newErrors.live = 'Please enter a valid URL';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    if (!file.type.match('image.*')) {
      setError('Only image files are allowed (JPEG, PNG, GIF)');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);

    setFormData(prev => ({ ...prev, image: file }));
  };

  const removeImage = () => {
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: null }));
  };

  const toggleFeatured = () => {
    setFormData(prev => ({ ...prev, featured: !prev.featured }));
  };

  const handleTagSelect = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({ ...prev, tags: [...prev.tags, tag] }));
    }
    setErrors(prev => ({ ...prev, tags: '' }));
  };

  const removeTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const projectData = new FormData();
      projectData.append('title', formData.title);
      projectData.append('description', formData.description);
      projectData.append('tags', formData.tags.join(','));
      projectData.append('category', formData.category);
      projectData.append('featured', formData.featured);
      if (formData.image) projectData.append('image', formData.image);
      if (formData.github) projectData.append('github', formData.github);
      if (formData.live) projectData.append('live', formData.live);

      let response;
      if (isEditing && currentProject) {
        response = await axios.put(`${API_URL}/api/projects/${currentProject._id}`, projectData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });
        setSuccess('Project updated successfully');
      } else {
        response = await axios.post(`${API_URL}/api/projects`, projectData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        });
        setSuccess('Project created successfully');
      }
      
      resetForm();
      fetchProjects();
    } catch (err) {
      let errorMsg = 'Operation failed. Please try again.';
      if (err.response?.data?.message) {
        errorMsg = err.response.data.message;
      } else if (err.message.includes('Network Error')) {
        errorMsg = 'Network error - please check your connection';
      }
      setError(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (project) => {
    setIsEditing(true);
    setCurrentProject(project);
    setFormData({
      title: project.title,
      description: project.description,
      tags: project.tags,
      category: project.category,
      featured: project.featured || false,
      image: null,
      github: project.github || '',
      live: project.live || ''
    });
    
    if (project.image && project.image.data) {
      setImagePreview(`data:${project.image.contentType};base64,${project.image.data}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    
    try {
      await axios.delete(`${API_URL}/api/projects/${id}`, { withCredentials: true });
      setSuccess('Project deleted successfully');
      fetchProjects();
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Delete failed. Please try again.';
      setError(errorMsg);
    }
  };

  const resetForm = () => {
    setIsEditing(false);
    setCurrentProject(null);
    setImagePreview('');
    setFormData({
      title: '',
      description: '',
      tags: [],
      category: 'web',
      featured: false,
      image: null,
      github: '',
      live: ''
    });
    setErrors({
      title: '',
      description: '',
      tags: '',
      github: '',
      live: ''
    });
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <FaSpinner style={styles.spinner} size={32} />
        <p style={styles.loadingText}>Loading projects...</p>
      </div>
    );
  }

  return (
    <div style={styles.pageContainer}>
      <div style={styles.container}>
        <div style={styles.header}>
          <motion.button
            style={styles.backButton}
            whileHover={styles.backButtonHover}
            onClick={() => navigate('/admin/dashboard')}
          >
            <FaArrowLeft /> Back to Dashboard
          </motion.button>
          <h1 style={styles.title}>Projects Management</h1>
          <div style={{ width: '40px' }}></div>
        </div>

        <div style={styles.statusContainer}>
          {error && (
            <motion.div 
              style={styles.errorBox}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p>{error}</p>
              <button 
                onClick={() => setError(null)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <FaTimes />
              </button>
            </motion.div>
          )}

          {success && (
            <motion.div 
              style={styles.successBox}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p>{success}</p>
              <button 
                onClick={() => setSuccess(null)} 
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <FaTimes />
              </button>
            </motion.div>
          )}
        </div>

        <motion.div 
          style={styles.formContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>
              {isEditing ? 'Edit Project' : 'Add New Project'}
            </h2>
          </div>
          
          <form onSubmit={handleSubmit} style={styles.formContent}>
            <div style={styles.grid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title*</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  style={{
                    ...styles.input,
                    ...(errors.title ? styles.inputError : {})
                  }}
                />
                {errors.title && <p style={styles.errorText}>{errors.title}</p>}
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Category*</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  style={styles.input}
                >
                  <option value="web">Web Development</option>
                  <option value="ai">AI/ML Project</option>
                  <option value="mobile">Mobile App</option>
                  <option value="desktop">Desktop App</option>
                  <option value="game">Game Development</option>
                  <option value="embedded">Embedded Systems</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description*</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                style={{
                  ...styles.textarea,
                  ...(errors.description ? styles.inputError : {})
                }}
              />
              {errors.description && <p style={styles.errorText}>{errors.description}</p>}
              <p style={styles.charCount}>
                {formData.description.length}/2000 characters
              </p>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Tags*</label>
              <div style={styles.tagsDropdown}>
                <div style={styles.tagsInput}>
                  {formData.tags.map(tag => (
                    <div key={tag} style={styles.tagPill}>
                      {tag}
                      <span style={styles.removeTag} onClick={() => removeTag(tag)}>
                        <FaTimes size={10} />
                      </span>
                    </div>
                  ))}
                  <select
                    onChange={(e) => handleTagSelect(e.target.value)}
                    style={{ border: 'none', outline: 'none' }}
                    value=""
                  >
                    <option value="">Select a tag...</option>
                    {techTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </div>
                {errors.tags && <p style={styles.errorText}>{errors.tags}</p>}
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Featured Project</label>
              <div style={styles.featuredToggle} onClick={toggleFeatured}>
                {formData.featured ? (
                  <FaStar style={styles.featuredIcon} size={20} />
                ) : (
                  <FaRegStar style={styles.featuredIcon} size={20} />
                )}
                <span>{formData.featured ? 'Featured' : 'Not Featured'}</span>
              </div>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Project Image</label>
              <div style={styles.imageUpload}>
                <label style={styles.fileInputLabel}>
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </label>
                {imagePreview && (
                  <div style={styles.imagePreviewContainer}>
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      style={styles.imagePreview}
                      onClick={() => setShowImageModal(true)}
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      style={styles.removeImageButton}
                      aria-label="Remove image"
                    >
                      <FaTimes size={10} />
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div style={styles.grid}>
              <div style={styles.formGroup}>
                <label style={styles.label}>GitHub URL</label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  placeholder="https://github.com/username/repo"
                  style={{
                    ...styles.input,
                    ...(errors.github ? styles.inputError : {})
                  }}
                />
                {errors.github && <p style={styles.errorText}>{errors.github}</p>}
              </div>
              
              <div style={styles.formGroup}>
                <label style={styles.label}>Live Demo URL</label>
                <input
                  type="url"
                  name="live"
                  value={formData.live}
                  onChange={handleInputChange}
                  placeholder="https://example.com"
                  style={{
                    ...styles.input,
                    ...(errors.live ? styles.inputError : {})
                  }}
                />
                {errors.live && <p style={styles.errorText}>{errors.live}</p>}
              </div>
            </div>

            <div style={styles.buttonGroup}>
              <motion.button
                type="submit"
                style={{
                  ...styles.submitButton,
                  ...(isSubmitting ? styles.submitButtonDisabled : {})
                }}
                whileHover={isSubmitting ? {} : styles.submitButtonHover}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <FaSpinner style={{ animation: 'spin 1s linear infinite' }} />
                    {isEditing ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  <>
                    <FaPlus />
                    {isEditing ? 'Update Project' : 'Create Project'}
                  </>
                )}
              </motion.button>
              
              {isEditing && (
                <motion.button
                  type="button"
                  style={styles.cancelButton}
                  whileHover={styles.cancelButtonHover}
                  onClick={resetForm}
                >
                  Cancel
                </motion.button>
              )}
            </div>
          </form>
        </motion.div>

        <motion.div 
          style={styles.projectsListContainer}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <div style={styles.listHeader}>
            <h2 style={styles.listTitle}>All Projects ({projects.length})</h2>
          </div>
          
          {projects.length === 0 ? (
            <div style={styles.emptyState}>
              No projects found. Create your first project above.
            </div>
          ) : (
            <div>
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  style={styles.projectItem}
                  whileHover={styles.projectItemHover}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div style={styles.projectContent}>
                    <div style={styles.projectRow}>
                      {project.image && project.image.data ? (
                        <img
                          src={`data:${project.image.contentType};base64,${project.image.data}`}
                          alt={project.title}
                          style={styles.projectImage}
                          onClick={() => {
                            setImagePreview(`data:${project.image.contentType};base64,${project.image.data}`);
                            setShowImageModal(true);
                          }}
                        />
                      ) : (
                        <div style={{
                          ...styles.projectImage,
                          backgroundColor: '#f3f4f6',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#9ca3af'
                        }}>
                          No Image
                        </div>
                      )}
                      <div style={styles.projectDetails}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div>
                            <h3 style={styles.projectTitle}>
                              {project.featured && <FaStar style={{ color: '#f59e0b' }} />}
                              {project.title}
                            </h3>
                            <p style={styles.projectCategory}>
                              {categoryIcons[project.category]}
                              {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                            </p>
                          </div>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            {project.github && (
                              <a 
                                href={project.github} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ color: '#6b7280', transition: 'color 0.2s ease' }}
                              >
                                <FaExternalLinkAlt />
                              </a>
                            )}
                            {project.live && (
                              <a 
                                href={project.live} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                style={{ color: '#6b7280', transition: 'color 0.2s ease' }}
                              >
                                <FaExternalLinkAlt />
                              </a>
                            )}
                          </div>
                        </div>
                        <p style={styles.projectDescription}>
                          {project.description}
                        </p>
                        <div style={styles.projectTags}>
                          {project.tags.map((tag, index) => (
                            <span key={index} style={styles.tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                      <div style={styles.projectActions}>
                        <motion.button
                          onClick={() => handleEdit(project)}
                          style={styles.actionButton}
                          whileHover={styles.editButtonHover}
                          aria-label="Edit project"
                        >
                          <FaEdit />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(project._id)}
                          style={styles.actionButton}
                          whileHover={styles.deleteButtonHover}
                          aria-label="Delete project"
                        >
                          <FaTrash />
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {showImageModal && (
          <motion.div 
            style={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowImageModal(false)}
          >
            <div style={styles.modalContent}>
              <img 
                src={imagePreview} 
                alt="Full Preview" 
                style={styles.modalImage}
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => setShowImageModal(false)}
                style={styles.closeButton}
                aria-label="Close preview"
              >
                <FaTimes />
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          
          input:focus, textarea:focus, select:focus {
            border-color: #1e40af !important;
            box-shadow: 0 0 0 3px rgba(30, 64, 175, 0.1) !important;
            outline: none;
          }
        `}
      </style>
    </div>
  );
};

export default AdminProjects;