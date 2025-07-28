import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { serverEndpoint } from "../../config/config";

function formatDate(isoDateString) {
    if (!isoDateString) return '';

    try {
        const date = new Date(isoDateString);
        return new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        }).format(date);
    } catch (error) {
        console.error('Invalid date:', isoDateString);
        return '';
    }
}

function Subscription() {
    const userDetails = useSelector((state) => state.userDetails);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);

    const subscription = userDetails.subscription;

    const handleCancel = async () => {
        try {
            const response = await axios.post(`${serverEndpoint}/payments/cancel-subscription`, {
                subscription_id: userDetails.subscription?.id
            }, {
                withCredentials: true
            });

            console.log(response);
            setMessage('Subscription cancelled, it can take up to 5 minutes to reflect the status');
        } catch (error) {
            console.log(error);
            setErrors({ message: 'Unable to cancel subscription' });
        }
    };

    return (
        <section className="subscription-section">
            {errors.message && <div className="form-error">{errors.message}</div>}
            {message && <div className="form-success">{message}</div>}

            <div className="card subscription-card">
                <h3 className="subscription-title">Subscription Summary</h3>
                <hr />
                <div className="subscription-details">
                    <div><strong>Start Date:</strong> {formatDate(subscription.start)}</div>
                    <div><strong>End Date:</strong> {formatDate(subscription.end)}</div>
                    <div><strong>Last Payment Date:</strong> {formatDate(subscription.lastBillDate)}</div>
                    <div><strong>Next Payment Date:</strong> {formatDate(subscription.nextBillDate)}</div>
                    <div><strong>Total Payments Made:</strong> {subscription.paymentsMade}</div>
                    <div><strong>Payments Remaining:</strong> {subscription.paymentsRemaining}</div>
                </div>
                <hr />
                <div className="subscription-actions">
                    <button className="btn-danger full-width" onClick={handleCancel}>Cancel Subscription</button>
                </div>
            </div>
        </section>
    );
}

export default Subscription;