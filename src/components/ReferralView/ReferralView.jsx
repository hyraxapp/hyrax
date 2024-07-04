import React, { useEffect, useState } from 'react';
import { getReferralProgress, claimReferral, updateTickets, deleteReferral, getUserReferred, claimUserReferred } from '../../actions/posts';
import { toast } from "react-hot-toast"
import './ReferralView.css';

const ReferralView = () => {
    const user = JSON.parse(localStorage.getItem("profile"));
    const [userData, setUserData] = useState({});
    const [userReferred, setUserReferred] = useState({});
    const [isSubmitted, setIsSubmitted] = useState(false); // State to trigger re-fetch of data

    // Fetch user data on initial load and whenever isSubmitted changes
    useEffect(() => {
        if (user) {
            updateUserData();
        }
    }, [isSubmitted]);

    // Function to update userData when called from child component
    const updateUserData = async () => {
        // Refetch user stats to get updated data
        const toastId = toast.loading("Updating..");
        const updatedUserStats = await getReferralProgress(user?.result?._id);
        const userReferredTemp = await getUserReferred(user?.result?._id);
        const temp = userReferredTemp.arr[0]
        setUserData(updatedUserStats);
        setUserReferred(temp);
        toast.dismiss(toastId);
    };

    return (user &&
        <div className="referralView_window">
            <div className="referralView_container">
                <h1 className="leader_title">Progress</h1>
                {(userData.arr) && (
                    <div className="subtopics">
                        <h1 className="subtopicTitle">Pending Referrals</h1>
                        <div className="subtopic-grid">
                            {userData.arr.map((referral, index) => (
                                <div key={index}>
                                    <SubTopicSection
                                        domain="Referral"
                                        referralStats={referral}
                                        id={user.result._id}
                                        updateUserData={updateUserData} // Pass update function to child
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {(userReferred.referralEmail != "broken") && (
                    <div className="subtopics">
                        <h1 className="subtopicTitle">Referred By Other</h1>
                        <div className="subtopic-grid">
                            <div>
                                <SubTopicSection domain="Referral" referralStats={userReferred} id={user.result._id} updateUserData={updateUserData} type="2"/>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const SubTopicSection = ({ domain, referralStats, id, updateUserData, type="1" }) => {
    const [submitted, setIsSubmitted] = useState(false);

    const handleSubmit = async () => {
        setIsSubmitted(true);
        const toastId = toast.loading("Loading..");
        if (type=="1") {
            await claimReferral(referralStats.referralEmail);
        } else {
            await claimUserReferred(referralStats.referralEmail);
        }
        await updateTickets(id, 25);
        toast.dismiss(toastId);
        // Call parent function to update userData
        updateUserData();
        setIsSubmitted(false);
    };

    const handleCancelSubmit = async () => {
        setIsSubmitted(true);
        const toastId = toast.loading("Loading..");
        await deleteReferral(referralStats.referralEmail);
        toast.dismiss(toastId);
        // Call parent function to update userData
        updateUserData();
        setIsSubmitted(false);
    };

    return (
        <div className="subtopic-section">
            <h3>{domain}</h3>
            <div className="flat">
                {type=="1"?(
                    <div className="flat">
                        <p className="leftHeader">Email Referred: </p>
                        <p className="rightHeader">{referralStats.referralEmail}</p>
                    </div>
                ):(
                    <div className="flat">
                        <p className="leftHeader">Referred By: </p>
                        <p className="rightHeader">{referralStats.referralEmail}</p>
                    </div>
                )}
            </div>
            {referralStats.problems === -1 ? (
                <div className="flat">
                    <p className="leftHeader">Status </p>
                    <p className="rightHeader">User has not signed up yet</p>
                </div>
            ) : (
                <div className="flat">
                    <p className="leftHeader">Status </p>
                    <p className="rightHeader">User has completed {referralStats.problems} / 10</p>
                </div>
            )}
            {(referralStats.problems >= 10 && !submitted) && (
                <div>
                    <button className={`difficulty_button`} onClick={handleSubmit}>Claim</button>
                </div>
            )}
            {(referralStats.problems < 10 && !submitted && type != "2") && (
                <div>
                    <button className={`difficulty_button`} onClick={handleCancelSubmit}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ReferralView;
