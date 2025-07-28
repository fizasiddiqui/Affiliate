import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { serverEndpoint } from "../../config/config";
import { DataGrid } from '@mui/x-data-grid';
import { Bar, Pie } from 'react-chartjs-2';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
    Title
} from 'chart.js';

ChartJS.register(
    BarElement,
    CategoryScale,
    LinearScale,
    ArcElement,
    Tooltip,
    Legend,
    Title
);

const formatDate = (isoDateString) => {
    if (!isoDateString) return '';

    try {
        const date = new Date(isoDateString);

        // July 10, 2025
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date);
    } catch (error) {
        console.log(error);
        return '';
    }
};

function AnalyticsDashboard() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [analyticsData, setAnalyticsData] = useState([]);
    const [fromDate, setFromDate] = useState(null);
    const [toDate, setToDate] = useState(null);

    const fetchAnalytics = async () => {
        try {
            const response = await axios.get(`${serverEndpoint}/links/analytics`, {
                params: {
                    linkId: id,
                    from: fromDate,
                    to: toDate
                },
                withCredentials: true
            });
            setAnalyticsData(response.data);
        } catch (error) {
            console.log(error);
            navigate('/error');
        }
    };

    const groupBy = (key) => {
        return analyticsData.reduce((acc, item) => {
            const label = item[key] || 'unknown';
            acc[label] = (acc[label] || 0) + 1;
            return acc;
        }, {});
    };

    const clicksByCity = groupBy('city');
    const clicksByBrowser = groupBy('browser');

    const columns = [
        { field: 'ip', headerName: 'IP Address', flex: 1 },
        { field: 'city', headerName: 'City', flex: 1 },
        { field: 'country', headerName: 'Country', flex: 1 },
        { field: 'region', headerName: 'Region', flex: 1 },
        { field: 'isp', headerName: 'ISP', flex: 1 },
        { field: 'deviceType', headerName: 'Device', flex: 1 },
        { field: 'browser', headerName: 'Browser', flex: 1 },
        {
            field: 'clickedAt', headerName: 'Clicked At', flex: 1, renderCell: (params) => (
                <>{formatDate(params.row.clickedAt)}</>
            )
        },
    ];

    useEffect(() => {
        fetchAnalytics();
    }, [analyticsData, fromDate, toDate]);

    return (
        <section className="card home-card">
            <h1 className="dashboard-title">Analytics for LinkID: {id}</h1>

            <div className="dashboard-filters-row">
                <h5>Filters:</h5>
                <div style={{ display: 'flex', gap: '1em', marginBottom: '1em' }}>
                    <DatePicker
                        selected={fromDate}
                        onChange={(date) => setFromDate(date)}
                        className="form-control"
                        placeholderText="From (Date)"
                    />
                    <DatePicker
                        selected={toDate}
                        onChange={(date) => setToDate(date)}
                        className="form-control"
                        placeholderText="To (Date)"
                    />
                </div>
            </div>

            <div className="dashboard-charts-row" style={{ display: 'flex', gap: '2em', flexWrap: 'wrap', marginBottom: '2em' }}>
                <div style={{ flex: 2, minWidth: 300, background: 'var(--surface-accent)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--card-shadow)', padding: '1.5em' }}>
                    <h5>Clicks by City</h5>
                    <hr />
                    <Bar
                        data={{
                            labels: Object.keys(clicksByCity),
                            datasets: [
                                {
                                    label: 'Clicks',
                                    data: Object.values(clicksByCity),
                                    backgroundColor: 'rgba(54, 162, 235, 0.6)',
                                }
                            ]
                        }}
                        options={{ responsive: true }}
                    />
                </div>
                <div style={{ flex: 1, minWidth: 220, background: 'var(--surface-accent)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--card-shadow)', padding: '1.5em' }}>
                    <h5>Clicks by Browser</h5>
                    <hr />
                    <Pie
                        data={{
                            labels: Object.keys(clicksByBrowser),
                            datasets: [
                                {
                                    data: Object.values(clicksByCity),
                                    backgroundColor: [
                                        '#FF6384',
                                        '#36A2EB',
                                        '#FFCE56',
                                        '#4BC0C0',
                                        '#9966FF',
                                        '#FF9F40',
                                    ],
                                }
                            ]
                        }}
                        options={{ responsive: true }}
                    />
                </div>
            </div>

            <div style={{ background: 'var(--surface-accent)', borderRadius: 'var(--border-radius)', boxShadow: 'var(--card-shadow)', marginTop: '1.5em' }}>
                <DataGrid
                    getRowId={(row) => row._id}
                    rows={analyticsData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 20, page: 0 }
                        }
                    }}
                    pageSizeOptions={[20, 50, 100]}
                    disableRowSelectionOnClick
                    showToolbar
                    sx={{
                        fontFamily: 'inherit',
                        background: 'transparent',
                        borderRadius: 'var(--border-radius)'
                    }}
                />
            </div>
        </section>
    );
}

export default AnalyticsDashboard;