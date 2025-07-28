import IconButton from '@mui/material/IconButton';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { serverEndpoint } from "../../config/config";
import { Modal } from 'react-bootstrap';

const USER_ROLES = ['viewer', 'developer'];

function ManageUsers() {
    const [errors, setErrors] = useState({});
    const [usersData, setUsersData] = useState([]);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        role: ''
    });
    const [showModal, setShowModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(false);

    const handleModalShow = (isEdit, data = {}) => {
        if (isEdit) {
            setFormData({
                id: data._id,
                email: data.email,
                role: data.role,
                name: data.name
            });
        } else {
            setFormData({
                email: '',
                role: '',
                name: ''
            });
        }
        setIsEdit(isEdit);
        setShowModal(true);
    };

    const handleModalClose = () => {
        setShowModal(false);
    };

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const handleDeleteModalShow = (userId) => {
        setFormData({
            id: userId
        });
        setShowDeleteModal(true);
    };

    const handleDeleteModalClose = () => {
        setShowDeleteModal(false);
    };

    const handleDeleteSubmit = async () => {
        try {
            setFormLoading(true);
            await axios.delete(
                `${serverEndpoint}/users/${formData.id}`,
                { withCredentials: true });
            setFormData({
                email: '',
                role: '',
                name: ''
            });
            fetchUsers();
        } catch (error) {
            setErrors({ message: 'Something went wrong, please try again' });
        } finally {
            handleDeleteModalClose();
            setFormLoading(false);
        }
    };

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
        if (formData.email.length === 0) {
            newErrors.email = "Email is mandatory";
            isValid = false;
        }

        if (formData.role.length === 0) {
            newErrors.role = "Role is mandatory";
            isValid = false;
        }

        if (formData.name.length === 0) {
            newErrors.name = "Name is mandatory";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (validate()) {
            setFormLoading(true);
            const body = {
                email: formData.email,
                name: formData.name,
                role: formData.role
            };
            const configuration = {
                withCredentials: true
            };
            try {
                if (isEdit) {
                    await axios.put(
                        `${serverEndpoint}/users/${formData.id}`,
                        body, configuration);
                } else {
                    await axios.post(
                        `${serverEndpoint}/users`,
                        body, configuration);
                }

                setFormData({
                    email: '',
                    name: '',
                    role: ''
                });
                fetchUsers();
            } catch (error) {
                setErrors({ message: 'Something went wrong, please try again' });
            } finally {
                handleModalClose();
                setFormLoading(false);
            }
        }
    };

    const fetchUsers = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`${serverEndpoint}/users`, {
                withCredentials: true
            });
            setUsersData(response.data);
        } catch (error) {
            console.log(error);
            setErrors({ message: 'Unable to fetch users at the moment, please try again' });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const columns = [
        { field: 'email', headerName: 'Email', flex: 2 },
        { field: 'name', headerName: 'Name', flex: 2 },
        { field: 'role', headerName: 'Role', flex: 2 },
        {
            field: 'action', headerName: 'Action', flex: 1, renderCell: (params) => (
                <>
                    <IconButton>
                        <EditIcon onClick={() => handleModalShow(true, params.row)} />
                    </IconButton>
                    <IconButton>
                        <DeleteIcon onClick={() => handleDeleteModalShow(params.row._id)} />
                    </IconButton>
                </>
            )
        },
    ];

    return (
        <section>
            <div className="dashboard-header-row">
                <h2 className="dashboard-title">Manage Users</h2>
                <button className='btn-primary' onClick={() => handleModalShow(false)}>Add</button>
            </div>

            {errors.message && (
                <div className="form-error" role="alert">
                    {errors.message}
                </div>
            )}

            <div style={{ height: 500, width: '100%', marginTop: '1.5em' }}>
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={usersData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 20, page: 0 },
                        },
                    }}
                    pageSizeOptions={[20, 50, 100]}
                    disableRowSelectionOnClick
                    showToolbar
                    sx={{
                        fontFamily: 'inherit',
                        background: 'transparent',
                        border: 'none',
                        boxShadow: 'none',
                        borderRadius: 0,
                    }}
                    loading={loading}
                />
            </div>

            <Modal show={showModal} onHide={handleModalClose}>
                <Modal.Header closeButton style={{ background: 'var(--header-gradient)', color: '#fff' }}>
                    <Modal.Title>{isEdit ? (<>Edit User</>) : (<>Add User</>)}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className="form">
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={errors.email ? 'input-error' : ''}
                            />
                            {errors.email && (
                                <div className="input-error-text">{errors.email}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={errors.name ? 'input-error' : ''}
                            />
                            {errors.name && (
                                <div className="input-error-text">{errors.name}</div>
                            )}
                        </div>
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <input
                                type="text"
                                id="role"
                                name="role"
                                value={formData.role}
                                onChange={handleChange}
                                className={errors.role ? 'input-error' : ''}
                            />
                            {errors.role && (
                                <div className="input-error-text">{errors.role}</div>
                            )}
                        </div>
                        <button type="submit" className="btn-primary full-width">{isEdit ? 'Update' : 'Add'}</button>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={showDeleteModal} onHide={handleDeleteModalClose}>
                <Modal.Header closeButton style={{ background: 'var(--header-gradient)', color: '#fff' }}>
                    <Modal.Title>Delete User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="text-center">
                        <p>Are you sure you want to delete this user?</p>
                        <button className="btn-danger full-width" onClick={handleDeleteSubmit}>Delete</button>
                    </div>
                </Modal.Body>
            </Modal>
        </section>
    );
}

export default ManageUsers;