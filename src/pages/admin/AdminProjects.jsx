import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { FaEdit, FaTrash, FaPlus, FaSpinner, FaArrowLeft, FaTimes, FaExternalLinkAlt, FaStar, FaRegStar } from 'react-icons/fa';
import { FiLayers, FiCode, FiDatabase, FiCpu, FiSmartphone, FiMonitor, FiPackage } from 'react-icons/fi';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import { FaExclamationCircle, FaCheck } from "react-icons/fa";
import styled from 'styled-components';

// Styled Components with Professional Dark Theme
const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #0f172a;
  padding: 2rem;
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  margin-top: 80px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 1.75rem;
  font-weight: 600;
  color: #f8fafc;
`;


const NotificationBox = styled(motion.div)`
  padding: 1rem;
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const ErrorBox = styled(NotificationBox)`
  background-color: rgba(239, 68, 68, 0.1);
  border-left: 4px solid #ef4444;
  color: #fca5a5;
`;

const SuccessBox = styled(NotificationBox)`
  background-color: rgba(16, 185, 129, 0.1);
  border-left: 4px solid #10b981;
  color: #6ee7b7;
`;

const Card = styled(motion.div)`
  background-color: #1e293b;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  border: 1px solid #334155;
  margin-bottom: 1.5rem;
`;

const CardHeader = styled.div`
  padding: 1rem 1.5rem;
  background-color: #1e40af;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CardTitle = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #e2e8f0;
`;

const FormContainer = styled.div`
  padding: 1.5rem;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: #e2e8f0;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  background-color: #1e293b;
  border: 1px solid #334155;
  color: #e2e8f0;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.3);
  }

  &::placeholder {
    color: #64748b;
  }

  ${props => props.hasError && `
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
  `}
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem;
  background-color: #1e293b;
  border: 1px solid #334155;
  color: #e2e8f0;
  border-radius: 0.375rem;
  min-height: 120px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.3);
  }

  ${props => props.hasError && `
    border-color: #ef4444;
    box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.3);
  `}
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem;
  background-color: #1e293b;
  border: 1px solid #334155;
  color: #e2e8f0;
  border-radius: 0.375rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #60a5fa;
    box-shadow: 0 0 0 3px rgba(96, 165, 250, 0.3);
  }
`;

const ErrorText = styled.p`
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #fca5a5;
`;

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #334155;
  border-radius: 0.375rem;
  min-height: 3rem;
`;

const Tag = styled.div`
  display: flex;
  align-items: center;
  padding: 0.25rem 0.75rem;
  background-color: #1e40af;
  color: #e2e8f0;
  border-radius: 9999px;
  font-size: 0.75rem;
`;

const RemoveTagButton = styled.button`
  margin-left: 0.5rem;
  background: none;
  border: none;
  color: #93c5fd;
  cursor: pointer;
  padding: 0;
`;

const FileInputLabel = styled.label`
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: #1e40af;
  color: #e2e8f0;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #1e3a8a;
  }
`;

const ImagePreview = styled.img`
  width: 5rem;
  height: 5rem;
  object-fit: cover;
  border-radius: 0.375rem;
  border: 1px solid #334155;
  cursor: pointer;
`;

const RemoveImageButton = styled.button`
  position: absolute;
  top: -0.5rem;
  right: -0.5rem;
  width: 1.25rem;
  height: 1.25rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
`;

const PrimaryButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background-color: #1e40af;
  color: #e2e8f0;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #1e3a8a;
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SecondaryButton = styled(motion.button)`
  padding: 0.75rem 1.5rem;
  background-color: #334155;
  color: #e2e8f0;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #475569;
  }
`;

const ProjectItem = styled(motion.div)`
  padding: 1.5rem;
  border-bottom: 1px solid #334155;
  transition: all 0.2s;

  &:hover {
    background-color: #334155;
  }

  &:last-child {
    border-bottom: none;
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: #e2e8f0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProjectCategory = styled.p`
  font-size: 0.875rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ProjectDescription = styled.p`
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #cbd5e1;
`;

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const ProjectTag = styled.span`
  padding: 0.25rem 0.75rem;
  background-color: #1e40af;
  color: #e2e8f0;
  border-radius: 9999px;
  font-size: 0.75rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-end;
`;

const ActionButton = styled(motion.button)`
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  cursor: pointer;
  border-radius: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    background-color: #334155;
  }

  ${props => props.variant === 'edit' && `
    color: #93c5fd;
    &:hover {
      color: #60a5fa;
    }
  `}

  ${props => props.variant === 'delete' && `
    color: #fca5a5;
    &:hover {
      color: #f87171;
    }
  `}
`;

const EmptyState = styled.div`
  padding: 2rem;
  text-align: center;
  color: #64748b;
`;

const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 50;
  padding: 1rem;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
`;

const CloseModalButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 2rem;
  height: 2rem;
  background-color: #ef4444;
  color: white;
  border: none;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const API_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

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
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);

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
    web: <FiLayers className="text-blue-400" />,
    ai: <FiCpu className="text-blue-400" />,
    mobile: <FiSmartphone className="text-blue-400" />,
    desktop: <FiMonitor className="text-blue-400" />,
    game: <FiPackage className="text-blue-400" />,
    embedded: <FiCode className="text-blue-400" />,
    other: <FiDatabase className="text-blue-400" />
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

  const toggleShowFeaturedOnly = () => {
    setShowFeaturedOnly(prev => !prev);
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

  const filteredProjects = showFeaturedOnly 
    ? projects.filter(project => project.featured)
    : projects;

  if (loading) {
    return (
      <PageContainer>
        <Container>
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            height: '50vh' 
          }}>
            <FaSpinner className="animate-spin" size={32} color="#60a5fa" />
          </div>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container>
       
        <div className="mb-6">
          <AnimatePresence>
            {error && (
              <ErrorBox
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaExclamationCircle />
                  <span>{error}</span>
                </div>
                <button 
                  onClick={() => setError(null)} 
                  style={{ background: 'none', border: 'none', color: 'inherit' }}
                >
                  <FaTimes />
                </button>
              </ErrorBox>
            )}

            {success && (
              <SuccessBox
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 100 }}
                transition={{ duration: 0.3 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaCheck />
                  <span>{success}</span>
                </div>
                <button 
                  onClick={() => setSuccess(null)} 
                  style={{ background: 'none', border: 'none', color: 'inherit' }}
                >
                  <FaTimes />
                </button>
              </SuccessBox>
            )}
          </AnimatePresence>
        </div>

        <Card
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <CardHeader>
            <CardTitle>
              {isEditing ? 'Edit Project' : 'Add New Project'}
            </CardTitle>
          </CardHeader>
          
          <FormContainer>
            <form onSubmit={handleSubmit}>
              <FormGrid>
                <FormGroup>
                  <Label>Title*</Label>
                  <Input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    hasError={!!errors.title}
                  />
                  {errors.title && <ErrorText>{errors.title}</ErrorText>}
                </FormGroup>
                
                <FormGroup>
                  <Label>Category*</Label>
                  <Select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                  >
                    <option value="web">Web Development</option>
                    <option value="ai">AI/ML Project</option>
                    <option value="mobile">Mobile App</option>
                    <option value="desktop">Desktop App</option>
                    <option value="game">Game Development</option>
                    <option value="embedded">Embedded Systems</option>
                    <option value="other">Other</option>
                  </Select>
                </FormGroup>
              </FormGrid>

              <FormGroup>
                <Label>Description*</Label>
                <TextArea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  hasError={!!errors.description}
                />
                {errors.description && <ErrorText>{errors.description}</ErrorText>}
                <p className="text-sm text-blue-400">
                  {formData.description.length}/2000 characters
                </p>
              </FormGroup>

              <FormGroup>
                <Label>Tags*</Label>
                <TagContainer>
                  {formData.tags.map(tag => (
                    <Tag key={tag}>
                      {tag}
                      <RemoveTagButton
                        type="button"
                        onClick={() => removeTag(tag)}
                      >
                        <FaTimes size={10} />
                      </RemoveTagButton>
                    </Tag>
                  ))}
                  <select
                    onChange={(e) => handleTagSelect(e.target.value)}
                    className="border-none outline-none bg-transparent text-blue-400"
                    value=""
                  >
                    <option value="">Select a tag...</option>
                    {techTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </TagContainer>
                {errors.tags && <ErrorText>{errors.tags}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>Featured Project</Label>
                <div 
                  className="flex items-center gap-2 cursor-pointer text-blue-400"
                  onClick={toggleFeatured}
                >
                  {formData.featured ? (
                    <FaStar className="text-yellow-400" size={20} />
                  ) : (
                    <FaRegStar size={20} />
                  )}
                  <span>{formData.featured ? 'Featured' : 'Not Featured'}</span>
                </div>
              </FormGroup>

              <FormGroup>
                <Label>Project Image</Label>
                <div className="flex items-center gap-4">
                  <FileInputLabel>
                    Choose File
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </FileInputLabel>
                  {imagePreview && (
                    <div className="relative inline-block">
                      <ImagePreview 
                        src={imagePreview} 
                        alt="Preview" 
                        onClick={() => setShowImageModal(true)}
                      />
                      <RemoveImageButton
                        type="button"
                        onClick={removeImage}
                        aria-label="Remove image"
                      >
                        <FaTimes size={10} />
                      </RemoveImageButton>
                    </div>
                  )}
                </div>
              </FormGroup>

              <FormGrid>
                <FormGroup>
                  <Label>GitHub URL</Label>
                  <Input
                    type="url"
                    name="github"
                    value={formData.github}
                    onChange={handleInputChange}
                    placeholder="https://github.com/username/repo"
                    hasError={!!errors.github}
                  />
                  {errors.github && <ErrorText>{errors.github}</ErrorText>}
                </FormGroup>
                
                <FormGroup>
                  <Label>Live Demo URL</Label>
                  <Input
                    type="url"
                    name="live"
                    value={formData.live}
                    onChange={handleInputChange}
                    placeholder="https://example.com"
                    hasError={!!errors.live}
                  />
                  {errors.live && <ErrorText>{errors.live}</ErrorText>}
                </FormGroup>
              </FormGrid>

              <ButtonGroup>
                <PrimaryButton
                  type="submit"
                  whileHover={isSubmitting ? {} : { scale: 1.02 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      {isEditing ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    <>
                      <FaPlus />
                      {isEditing ? 'Update Project' : 'Create Project'}
                    </>
                  )}
                </PrimaryButton>
                
                {isEditing && (
                  <SecondaryButton
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    onClick={resetForm}
                  >
                    Cancel
                  </SecondaryButton>
                )}
              </ButtonGroup>
            </form>
          </FormContainer>
        </Card>

        <Card 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
        >
          <CardHeader>
            <CardTitle>
              {showFeaturedOnly ? 'Featured Projects' : 'All Projects'} ({filteredProjects.length})
            </CardTitle>
            <div 
              className="flex items-center gap-2 cursor-pointer text-blue-200 hover:text-white"
              onClick={toggleShowFeaturedOnly}
            >
              {showFeaturedOnly ? (
                <FaStar className="text-yellow-300" />
              ) : (
                <FaRegStar />
              )}
              <span>{showFeaturedOnly ? 'Show All' : 'Show Featured'}</span>
            </div>
          </CardHeader>
          
          {filteredProjects.length === 0 ? (
            <EmptyState>
              {showFeaturedOnly 
                ? 'No featured projects found.' 
                : 'No projects found. Create your first project above.'}
            </EmptyState>
          ) : (
            <div>
              {filteredProjects.map((project) => (
                <ProjectItem
                  key={project._id}
                  whileHover={{ backgroundColor: '#334155' }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    {project.image && project.image.data ? (
                      <img
                        src={`data:${project.image.contentType};base64,${project.image.data}`}
                        alt={project.title}
                        className="w-20 h-20 object-cover rounded-lg border border-blue-200 cursor-pointer"
                        onClick={() => {
                          setImagePreview(`data:${project.image.contentType};base64,${project.image.data}`);
                          setShowImageModal(true);
                        }}
                      />
                    ) : (
                      <div className="w-20 h-20 bg-blue-900 rounded-lg border border-blue-800 flex items-center justify-center text-blue-400">
                        No Image
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div>
                          <ProjectTitle>
                            {project.featured && <FaStar className="text-yellow-400" />}
                            {project.title}
                          </ProjectTitle>
                          <ProjectCategory>
                            {categoryIcons[project.category]}
                            {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                          </ProjectCategory>
                        </div>
                        <div className="flex gap-3">
                          {project.github && (
                            <a 
                              href={project.github} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                              title="GitHub Repository"
                            >
                              <FaExternalLinkAlt />
                            </a>
                          )}
                          {project.live && (
                            <a 
                              href={project.live} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-blue-400 hover:text-blue-300 transition-colors"
                              title="Live Demo"
                            >
                              <FaExternalLinkAlt />
                            </a>
                          )}
                        </div>
                      </div>
                      <ProjectDescription>
                        {project.description}
                      </ProjectDescription>
                      <TagList>
                        {project.tags.map((tag, index) => (
                          <ProjectTag key={index}>
                            {tag}
                          </ProjectTag>
                        ))}
                      </TagList>
                    </div>
                  </div>
                  <ActionButtons>
                    <ActionButton
                      onClick={() => handleEdit(project)}
                      variant="edit"
                      whileHover={{ scale: 1.1 }}
                      aria-label="Edit project"
                    >
                      <FaEdit />
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleDelete(project._id)}
                      variant="delete"
                      whileHover={{ scale: 1.1 }}
                      aria-label="Delete project"
                    >
                      <FaTrash />
                    </ActionButton>
                  </ActionButtons>
                </ProjectItem>
              ))}
            </div>
          )}
        </Card>

        {showImageModal && (
          <ModalOverlay 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={() => setShowImageModal(false)}
          >
            <ModalContent>
              <img 
                src={imagePreview} 
                alt="Full Preview" 
                className="max-w-full max-h-[80vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
              <CloseModalButton
                onClick={() => setShowImageModal(false)}
                aria-label="Close preview"
              >
                <FaTimes />
              </CloseModalButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </Container>
    </PageContainer>
  );
};

export default AdminProjects;