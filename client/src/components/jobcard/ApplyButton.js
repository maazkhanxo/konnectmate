import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@material-ui/core/Button';
import { setSnackbar ,setNotifications} from 'state/index.js';

const ApplyButton = ({ getJob }) => {
    const dispatch = useDispatch();
    const loggedInUser = useSelector((state) => state.user);
    const token = useSelector((state) => state.token);
    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            const response = await fetch(`http://localhost:3001/jobs/applied/${getJob._id}`, {
                method:'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
            const data = await response.json();
            if (data.isApplied) {
                setIsApplied(true);
            }
        };
        fetchAppliedJobs();
    }, [getJob._id, token]);

    const handleApply = async () => {
        const response = await fetch(`http://localhost:3001/jobs/apply/${getJob._id}`, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ userId: loggedInUser._id })
        });
        const data = await response.json();
        setIsApplied(true);
        dispatch(setSnackbar({ snackbarOpen: true, snackbarType: 'success', snackbarMessage: 'Applied successfully!' }));

        // Send notification to the job poster
        const notification = {
            fromUser: loggedInUser._id,
            toUser: getJob.userId,
            jobId: getJob._id,
            type: 'jobApplication',
            message: `${loggedInUser.firstName} ${loggedInUser.lastName} has applied to your job '${getJob.title}'`
        };
        const notificationResponse = await fetch(`http://localhost:3001/notifications/`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(notification)
        });
        const notificationData = await notificationResponse.json();
        dispatch(setNotifications({notification:notificationData}))
        window.location.reload();
        
    };

    return (
        
           <Button size='medium'
            variant='contained'
            disabled={isApplied}
            color='inherit'
            onClick={handleApply}
            >
            {isApplied ? 'Applied' : 'Apply'}
            </Button>
        
    );
};

export default ApplyButton;