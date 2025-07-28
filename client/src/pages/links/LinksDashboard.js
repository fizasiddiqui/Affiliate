import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AssessmentIcon from '@mui/icons-material/Assessment';
import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverEndpoint } from '../../config/config';
import { usePermission } from '../../rbac/userPermissions';
import { useNavigate } from 'react-router-dom';

function LinksDashboard({ onLinksChanged }) {
    const [errors, setErrors] = useState({});
    const [linksData, setLinksData] = useState([]);
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const permission = usePermission();

    const handleShowDeleteModal = (linkId) => {
        setFormData({
            id: linkId
        });
        setShowDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setShowDeleteModal(false);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${serverEndpoint}/links/${formData.id}`, {
                withCredentials: true
            });
            await fetchLinks();
            if (onLinksChanged) onLinksChanged();
            handleCloseDeleteModal();
        } catch (error) {
            setErrors({ message: 'Unable to delete the link, please try again' });
        }
    };

    const handleOpenModal = (isEdit, data = {}) => {
        if (isEdit) {
            setFormData({
                id: data._id,
                campaignTitle: data.campaignTitle,
                originalUrl: data.originalUrl,
                category: data.category
            });
        }

        setIsEdit(isEdit);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const [formData, setFormData] = useState({
        campaignTitle: "",
        originalUrl: "",
        category: ""
    });

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;

        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validate = () => {
        let newErrors = {};
        let isValid = true;
        if (formData.campaignTitle.length === 0) {
            newErrors.campaignTitle = "Campaign Title is mandatory";
            isValid = false;
        }

        if (formData.originalUrl.length === 0) {
            newErrors.originalUrl = "URL is mandatory";
            isValid = false;
        }

        if (formData.category.length === 0) {
            newErrors.category = "Category is mandatory";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validate()) {
            const body = {
                campaign_title: formData.campaignTitle,
                original_url: formData.originalUrl,
                category: formData.category
            };
            const configuration = {
                withCredentials: true
            };
            try {
                if (isEdit) {
                    await axios.put(
                        `${serverEndpoint}/links/${formData.id}`,
                        body, configuration);
                } else {
                    await axios.post(
                        `${serverEndpoint}/links`,
                        body, configuration);
                }

                await fetchLinks();
                if (onLinksChanged) onLinksChanged();
                setFormData({
                    campaignTitle: "",
                    originalUrl: "",
                    category: ""
                });
            } catch (error) {
                setErrors({ message: 'Unable to add the Link, please try again' });
            } finally {
                handleCloseModal();
            }
        }
    };

    const fetchLinks = async () => {
        try {
            const response = await axios.get(`${serverEndpoint}/links`, {
                withCredentials: true
            });
            setLinksData(response.data.data);
        } catch (error) {
            console.log(error);
            setErrors({ message: 'Unable to fetch links at the moment. Please try again' });
        }
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const columns = [
        { field: 'campaignTitle', headerName: 'Campaign', flex: 2 },
        {
            field: 'originalUrl', headerName: 'URL', flex: 3, renderCell: (params) => (
                <>
                    <a
                        href={`${serverEndpoint}/links/r/${params.row._id}`}
                        target='_blank'
                        rel="noopener noreferrer"
                        onClick={() => {
                            // Wait a bit for backend to update, then refresh summary
                            setTimeout(() => {
                                if (onLinksChanged) onLinksChanged();
                            }, 800);
                        }}
                    >
                        {params.row.originalUrl}
                    </a>
                </>
            )
        },
        { field: 'category', headerName: 'Category', flex: 2 },
        { field: 'clickCount', headerName: 'Clicks', flex: 1 },
        {
            field: 'action', headerName: 'Clicks', flex: 1, renderCell: (params) => (
                <>
                    {permission.canEditLink && (
                        <IconButton>
                            <EditIcon onClick={() => handleOpenModal(true, params.row)} />
                        </IconButton>
                    )}

                    {permission.canDeleteLink && (
                        <IconButton>
                            <DeleteIcon onClick={() => handleShowDeleteModal(params.row._id)} />
                        </IconButton>
                    )}

                    {permission.canViewLink && (
                        <IconButton>
                            <AssessmentIcon onClick={() => {
                                navigate(`/analytics/${params.row._id}`);
                            }} />
                        </IconButton>
                    )}
                </>
            )
        },
    ];

    return (
        <Box className="dashboard-fullpage" sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
            <Paper elevation={6} sx={{
                mb: 3,
                p: { xs: 2, sm: 3 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderRadius: 4,
                background: 'linear-gradient(120deg, rgba(24,32,48,0.92) 60%, rgba(34,58,94,0.92) 100%)',
                boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
                border: '2.5px solid #4fc3f7',
                position: 'relative',
                overflow: 'visible',
            }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, position: 'relative' }}>
                    <Box sx={{
                        width: 54,
                        height: 54,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #4fc3f7 0%, #223a5e 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 2px 12px #4fc3f755',
                        mr: 2,
                    }}>
                        <LinkIcon sx={{ fontSize: 32, color: '#fff' }} />
                    </Box>
                    <Box>
                        <Typography variant="h4" component="h2" fontWeight={800} sx={{ color: '#fff', letterSpacing: 1, textShadow: '0 2px 12px #0008, 0 1px 0 #223a5e', mb: 0.5 }}>
                            Manage Affiliate Links
                        </Typography>
                        {/* Animated underline */}
                        <Box sx={{ height: 4, width: 60, background: 'linear-gradient(90deg, #4fc3f7 0%, #ffb74d 100%)', borderRadius: 2, mt: 0.5, animation: 'pulseUnderline 2.5s infinite alternate' }} />
                    </Box>
                </Box>
                {permission.canCreateLink && (
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        color="primary"
                        onClick={() => handleOpenModal(false)}
                        sx={{
                            borderRadius: 3,
                            fontWeight: 700,
                            fontSize: '1.08rem',
                            px: 3,
                            py: 1.1,
                            background: 'linear-gradient(90deg, #4fc3f7 0%, #223a5e 100%)',
                            color: '#fff',
                            boxShadow: '0 2px 12px #4fc3f755',
                            transition: 'background 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                background: 'linear-gradient(90deg, #223a5e 0%, #4fc3f7 100%)',
                                color: '#fff',
                                boxShadow: '0 4px 18px #4fc3f799',
                            },
                        }}
                    >
                        Add Link
                    </Button>
                )}
            </Paper>
            {/* Add animated underline keyframes */}
            <style>{`
                @keyframes pulseUnderline {
                    0% { opacity: 0.7; transform: scaleX(1); }
                    100% { opacity: 1; transform: scaleX(1.15); }
                }
            `}</style>
            {errors.message && (
                <Box sx={{ mb: 2 }}>
                    <Typography color="error" variant="body2" role="alert">
                        {errors.message}
                    </Typography>
                </Box>
            )}
            {/* Remove Paper wrapper, make DataGrid float with modern style */}
            <Box sx={{
                borderRadius: 3,
                boxShadow: '0 2px 16px 0 rgba(31,38,135,0.10)',
                background: 'none',
                mb: 3,
                overflow: 'hidden',
            }}>
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={linksData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 20, page: 0 }
                        }
                    }}
                    pageSizeOptions={[20, 50, 100]}
                    disableRowSelectionOnClick
                    sx={{
                        fontFamily: 'inherit',
                        background: 'rgba(24,32,48,0.85)',
                        borderRadius: 3,
                        border: '1.5px solid #223a5e',
                        boxShadow: '0 2px 16px 0 rgba(31,38,135,0.10)',
                        color: '#222',
                        '.MuiDataGrid-columnHeaders': {
                            background: 'linear-gradient(90deg, #181e2c 0%, #223a5e 100%)',
                            color: '#222',
                            fontWeight: 800,
                            fontSize: '1.01em',
                            borderBottom: '1.5px solid #223a5e',
                        },
                        '.MuiDataGrid-cell': {
                            fontSize: '1em',
                            color: '#222',
                            fontWeight: 600,
                        },
                        '.MuiDataGrid-footerContainer': {
                            background: 'rgba(24,32,48,0.92)',
                            color: '#222',
                        },
                        '.MuiTablePagination-root': {
                            color: '#222',
                        },
                        '.MuiDataGrid-row': {
                            transition: 'background 0.2s',
                            '&:hover': {
                                background: 'rgba(79,195,247,0.07)',
                            },
                        },
                        border: 'none',
                    }}
                    density='compact'
                />
            </Box>
            {/* Add/Edit Dialog */}
            <Dialog open={showModal} onClose={handleCloseModal} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ background: 'var(--header-gradient)', color: '#fff' }}>
                    {isEdit ? 'Update Link' : 'Add Link'}
                </DialogTitle>
                <DialogContent sx={{ py: 3 }}>
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Campaign Title"
                            name="campaignTitle"
                            value={formData.campaignTitle}
                            onChange={handleChange}
                            error={!!errors.campaignTitle}
                            helperText={errors.campaignTitle}
                            fullWidth
                        />
                        <TextField
                            label="URL"
                            name="originalUrl"
                            value={formData.originalUrl}
                            onChange={handleChange}
                            error={!!errors.originalUrl}
                            helperText={errors.originalUrl}
                            fullWidth
                        />
                        <TextField
                            label="Category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            error={!!errors.category}
                            helperText={errors.category}
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 1, fontWeight: 600 }}>
                            {isEdit ? 'Update' : 'Add'}
                        </Button>
                    </Box>
                </DialogContent>
            </Dialog>
            {/* Delete Dialog */}
            <Dialog open={showDeleteModal} onClose={handleCloseDeleteModal} maxWidth="xs" fullWidth>
                <DialogTitle sx={{ background: 'var(--header-gradient)', color: '#fff' }}>Delete Link</DialogTitle>
                <DialogContent>
                    <Typography align="center" sx={{ my: 2 }}>
                        Are you sure you want to delete this link?
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
                    <Button onClick={handleDelete} variant="contained" color="error" sx={{ fontWeight: 600 }}>
                        Delete
                    </Button>
                    <Button onClick={handleCloseDeleteModal} variant="outlined" color="primary">
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default LinksDashboard;