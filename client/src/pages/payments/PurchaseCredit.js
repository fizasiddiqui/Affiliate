import { useDispatch, useSelector } from "react-redux";
import { CREDIT_PACKS, PLAN_IDS, pricingList } from "../../config/payments";
import { useState } from "react";
import axios from "axios";
import { serverEndpoint } from "../../config/config";
import { SET_USER } from "../../redux/user/actions";
import './PurchaseCredit.css';
import { Modal } from "react-bootstrap";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import StarIcon from '@mui/icons-material/Star';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import PaymentsIcon from '@mui/icons-material/Payments';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

function PurchaseCredit() {
    const dispatch = useDispatch();
    const userDetails = useSelector((state) => state.userDetails);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleBuyCredits = async (credits) => {
        setShowModal(false);
        try {
            const { data } = await axios.post(`${serverEndpoint}/payments/create-order`, {
                credits
            }, { withCredentials: true });

            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                amount: data.order.amount,
                currency: data.order.currency,
                name: 'Affiliate++',
                description: `${credits} Credits Pack`,
                order_id: data.order.id,
                handler: async (response) => {
                    try {
                        const { data } = await axios.post(`${serverEndpoint}/payments/verify-order`, {
                            razorpay_order_id: response.razorpay_order_id,
                            razorpay_payment_id: response.razorpay_payment_id,
                            razorpay_signature: response.razorpay_signature,
                            credits
                        }, { withCredentials: true });

                        dispatch({
                            type: SET_USER,
                            payload: data
                        });
                        setMessage(`${credits} credits added!`);
                    } catch (error) {
                        console.error(error);
                        setErrors({ message: 'Unable to purchase credits, please try again' });
                    }
                },
                theme: { color: '#3399cc' }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error);
            setErrors({ message: 'Unable to purchase credits, please try again' });
        }
    };

    const handleSubscribe = async (planKey) => {
        try {
            const { data } = await axios.post(`${serverEndpoint}/payments/create-subscription`, {
                plan_name: planKey
            }, { withCredentials: true });

            const plan = PLAN_IDS[planKey];
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID,
                name: plan.planName,
                description: plan.description,
                subscription_id: data.subscription.id,
                handler: async function (response) {
                    try {
                        const user = await axios.post(`${serverEndpoint}/payments/verify-subscription`, {
                            subscription_id: response.razorpay_subscription_id
                        }, { withCredentials: true });

                        dispatch({
                            type: SET_USER,
                            payload: user.data
                        });
                        setMessage('Subscription activated');
                    } catch (error) {
                        setErrors({ message: 'Unable to activate subscription, please try again' });
                    }
                },
                theme: { color: "#3399cc" }
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error(error);
            setErrors({ message: 'Failed to create subscription' });
        }
    };

    return (
        <section className="purchase-section">
            {/* Modern Attractive Header */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2.5rem 1rem 2rem 1rem',
                marginBottom: '2.5rem',
                borderRadius: '1.5rem',
                background: 'linear-gradient(120deg, #1976d2 60%, #43a047 100%)',
                color: '#fff',
                boxShadow: '0 8px 32px 0 rgba(31,38,135,0.18)',
                position: 'relative',
                overflow: 'visible',
                maxWidth: 700,
                marginLeft: 'auto',
                marginRight: 'auto',
            }}>
                <PaymentsIcon style={{ fontSize: 60, color: '#fff', marginBottom: 12, filter: 'drop-shadow(0 2px 12px #0008)' }} />
                <h1 style={{ fontWeight: 900, fontSize: '2.2rem', letterSpacing: 1, margin: 0, textShadow: '0 2px 12px #0008, 0 1px 0 #223a5e' }}>
                    Payment & Credits
                </h1>
                <div style={{ fontSize: '1.15rem', opacity: 0.95, margin: '0.7rem 0 1.2rem 0', fontWeight: 500, textAlign: 'center', maxWidth: 500 }}>
                    Choose the best way to power your campaigns: buy credits or subscribe for unlimited access.
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    background: 'rgba(255,255,255,0.13)',
                    borderRadius: '2rem',
                    padding: '0.4rem 1.2rem',
                    fontWeight: 700,
                    fontSize: '1.08rem',
                    boxShadow: '0 2px 8px #0002',
                }}>
                    <AccountBalanceWalletIcon style={{ marginRight: 8, color: '#fff' }} />
                    Balance: {userDetails.credits} Credits
                </div>
            </div>

            {errors.message && <div className="form-error">{errors.message}</div>}
            {message && <div className="form-success">{message}</div>}

            <div className="purchase-cards-row">
                {/* Credit Pack Card */}
                <div className="card purchase-card">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 8 }}>
                        <CreditCardIcon style={{ fontSize: 40, color: '#1976d2', marginBottom: 4 }} />
                        <div className="purchase-card-title">Credit Packs</div>
                    </div>
                    <ul className="purchase-list">
                        {CREDIT_PACKS.map(c => (
                            <li key={c}>{c} CREDITS FOR ₹{c}</li>
                        ))}
                    </ul>
                    <button className="btn-primary full-width" onClick={() => setShowModal(true)}>
                        <ShoppingCartIcon style={{ verticalAlign: 'middle', marginRight: 8 }} />
                        Buy Credits
                    </button>
                </div>

                {/* Monthly Plan */}
                <div className="card purchase-card">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 8 }}>
                        <CalendarMonthIcon style={{ fontSize: 40, color: '#43a047', marginBottom: 4 }} />
                        <div className="purchase-card-title">₹199/month</div>
                    </div>
                    <ul className="purchase-list">
                        {pricingList[1].list.map((item, i) => (
                            <li key={i}>{item.detail}</li>
                        ))}
                    </ul>
                    <button className="btn-primary full-width" onClick={() => handleSubscribe('UNLIMITED_MONTHLY')}>
                        <AutorenewIcon style={{ verticalAlign: 'middle', marginRight: 8 }} />
                        Subscribe Monthly
                    </button>
                </div>

                {/* Yearly Plan */}
                <div className="card purchase-card">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 8 }}>
                        <StarIcon style={{ fontSize: 40, color: '#ffb300', marginBottom: 4 }} />
                        <div className="purchase-card-title">₹1990/year</div>
                    </div>
                    <ul className="purchase-list">
                        {pricingList[2].list.map((item, i) => (
                            <li key={i}>{item.detail}</li>
                        ))}
                    </ul>
                    <button className="btn-primary full-width" onClick={() => handleSubscribe('UNLIMITED_YEARLY')}>
                        <WorkspacePremiumIcon style={{ verticalAlign: 'middle', marginRight: 8 }} />
                        Subscribe Yearly
                    </button>
                </div>
            </div>

            {/* Modal for buying credits */}
            <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Buy Credits</Modal.Title>
                </Modal.Header>
                <Modal.Body className="purchase-modal-body">
                    {CREDIT_PACKS.map((c) => (
                        <button
                            key={c}
                            className="btn-primary m-2"
                            onClick={() => handleBuyCredits(c)}
                        >
                            Buy {c} Credits
                        </button>
                    ))}
                </Modal.Body>
            </Modal>
        </section>
    );
}

export default PurchaseCredit;
