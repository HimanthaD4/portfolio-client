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
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

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
  width: 80px;
  height: 60px;
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

const ProjectList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1rem;
`;

const ProjectItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 80px 1fr auto;
  gap: 1rem;
  padding: 1rem;
  background-color: #1e293b;
  border-radius: 0.5rem;
  border: 1px solid #334155;
  align-items: center;
`;

const ProjectImage = styled.img`
  width: 80px;
  height: 60px;
  object-fit: cover;
  border-radius: 0.375rem;
`;

const ProjectContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const ProjectTitle = styled.h3`
  font-size: 1rem;
  font-weight: 600;
  color: #e2e8f0;
  margin: 0;
`;

const ProjectCategory = styled.span`
  font-size: 0.75rem;
  color: #94a3b8;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const ProjectActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled(motion.button)`
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: none;
  background: none;
  cursor: pointer;
  color: ${props => props.variant === 'edit' ? '#93c5fd' : '#fca5a5'};
  
  &:hover {
    background-color: #334155;
  }
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

const CropContainer = styled.div`
  max-width: 500px;
  width: 100%;
  margin: 1rem 0;
`;

const CropControls = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
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
  const [crop, setCrop] = useState({ aspect: 4/3 });
  const [completedCrop, setCompletedCrop] = useState(null);
  const [imgRef, setImgRef] = useState(null);

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
      setError(err.response?.data?.message || 'Failed to fetch projects');
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
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (formData.tags.length === 0) {
      newErrors.tags = 'At least one tag is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError('Image size should be less than 5MB');
      return;
    }

    if (!file.type.match('image.*')) {
      setError('Only image files are allowed');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => setImagePreview(reader.result);
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
    if (!validateForm()) return;

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

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

      const url = isEditing && currentProject 
        ? `${API_URL}/api/projects/${currentProject._id}`
        : `${API_URL}/api/projects`;

      const method = isEditing && currentProject ? 'put' : 'post';

      const response = await axios[method](url, projectData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        withCredentials: true
      });

      setSuccess(isEditing ? 'Project updated' : 'Project created');
      resetForm();
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed');
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
    
    if (project.image?.data) {
      setImagePreview(`data:${project.image.contentType};base64,${project.image.data}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await axios.delete(`${API_URL}/api/projects/${id}`, { withCredentials: true });
      setSuccess('Project deleted');
      fetchProjects();
    } catch (err) {
      setError(err.response?.data?.message || 'Delete failed');
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
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
            <FaSpinner className="animate-spin" size={32} color="#60a5fa" />
          </div>
        </Container>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <Container>
        <AnimatePresence>
          {error && (
            <ErrorBox
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 100 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaExclamationCircle />
                <span>{error}</span>
              </div>
              <button onClick={() => setError(null)} style={{ background: 'none', border: 'none', color: 'inherit' }}>
                <FaTimes />
              </button>
            </ErrorBox>
          )}

          {success && (
            <SuccessBox
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 100 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <FaCheck />
                <span>{success}</span>
              </div>
              <button onClick={() => setSuccess(null)} style={{ background: 'none', border: 'none', color: 'inherit' }}>
                <FaTimes />
              </button>
            </SuccessBox>
          )}
        </AnimatePresence>

        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Project' : 'Add Project'}</CardTitle>
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
                    <option value="web">Web</option>
                    <option value="ai">AI/ML</option>
                    <option value="mobile">Mobile</option>
                    <option value="desktop">Desktop</option>
                    <option value="game">Game</option>
                    <option value="embedded">Embedded</option>
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
              </FormGroup>

              <FormGroup>
                <Label>Tags*</Label>
                <TagContainer>
                  {formData.tags.map(tag => (
                    <Tag key={tag}>
                      {tag}
                      <RemoveTagButton onClick={() => removeTag(tag)}>
                        <FaTimes size={10} />
                      </RemoveTagButton>
                    </Tag>
                  ))}
                  <select
                    onChange={(e) => handleTagSelect(e.target.value)}
                    style={{ border: 'none', outline: 'none', background: 'transparent', color: '#60a5fa' }}
                    value=""
                  >
                    <option value="">Add tag...</option>
                    {techTags.map(tag => (
                      <option key={tag} value={tag}>{tag}</option>
                    ))}
                  </select>
                </TagContainer>
                {errors.tags && <ErrorText>{errors.tags}</ErrorText>}
              </FormGroup>

              <FormGroup>
                <Label>Featured</Label>
                <div 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
                  onClick={toggleFeatured}
                >
                  {formData.featured ? (
                    <FaStar color="#fbbf24" />
                  ) : (
                    <FaRegStar />
                  )}
                  <span>{formData.featured ? 'Featured' : 'Not Featured'}</span>
                </div>
              </FormGroup>

              <FormGroup>
                <Label>Image</Label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <FileInputLabel>
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                  </FileInputLabel>
                  {imagePreview && (
                    <div style={{ position: 'relative' }}>
                      <ImagePreview 
                        src={imagePreview} 
                        alt="Preview"
                        onClick={() => setShowImageModal(true)}
                      />
                      <RemoveImageButton onClick={removeImage}>
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
                    placeholder="https://github.com/user/repo"
                    hasError={!!errors.github}
                  />
                  {errors.github && <ErrorText>{errors.github}</ErrorText>}
                </FormGroup>
                
                <FormGroup>
                  <Label>Live URL</Label>
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
                  whileHover={{ scale: 1.02 }}
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
                      {isEditing ? 'Update' : 'Create'}
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

        <Card>
          <CardHeader>
            <CardTitle>
              {showFeaturedOnly ? 'Featured Projects' : 'All Projects'} ({filteredProjects.length})
            </CardTitle>
            <div 
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}
              onClick={toggleShowFeaturedOnly}
            >
              {showFeaturedOnly ? (
                <FaStar color="#fbbf24" />
              ) : (
                <FaRegStar />
              )}
              <span>{showFeaturedOnly ? 'Show All' : 'Show Featured'}</span>
            </div>
          </CardHeader>
          
          {filteredProjects.length === 0 ? (
            <EmptyState>
              {showFeaturedOnly ? 'No featured projects' : 'No projects found'}
            </EmptyState>
          ) : (
            <ProjectList>
              {filteredProjects.map((project) => (
                <ProjectItem key={project._id}>
                  {project.image?.data ? (
                    <ProjectImage
                      src={`data:${project.image.contentType};base64,${project.image.data}`}
                      alt={project.title}
                    />
                  ) : (
                    <div style={{ width: '80px', height: '60px', backgroundColor: '#334155', borderRadius: '0.375rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FiLayers color="#64748b" />
                    </div>
                  )}
                  <ProjectContent>
                    <ProjectTitle>
                      {project.featured && <FaStar color="#fbbf24" size={14} style={{ marginRight: '0.25rem' }} />}
                      {project.title}
                    </ProjectTitle>
                    <ProjectCategory>
                      {categoryIcons[project.category]}
                      {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
                    </ProjectCategory>
                  </ProjectContent>
                  <ProjectActions>
                    <ActionButton
                      onClick={() => handleEdit(project)}
                      variant="edit"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FaEdit />
                    </ActionButton>
                    <ActionButton
                      onClick={() => handleDelete(project._id)}
                      variant="delete"
                      whileHover={{ scale: 1.1 }}
                    >
                      <FaTrash />
                    </ActionButton>
                  </ProjectActions>
                </ProjectItem>
              ))}
            </ProjectList>
          )}
        </Card>

        {showImageModal && (
          <ModalOverlay onClick={() => setShowImageModal(false)}>
            <ModalContent>
              <img 
                src={imagePreview} 
                alt="Full Preview" 
                style={{ maxWidth: '90vw', maxHeight: '90vh', objectFit: 'contain' }}
                onClick={(e) => e.stopPropagation()}
              />
              <CloseModalButton onClick={() => setShowImageModal(false)}>
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