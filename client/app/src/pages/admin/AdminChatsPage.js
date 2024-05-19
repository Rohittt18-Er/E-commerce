import React, { useState } from 'react';
import { Toast, Button, Form } from 'react-bootstrap';
import AdminLinksComponent from '../../components/admin/AdminLinksComponent';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import ChatBox from './model/ChatBox';

const AdminChatsPage = () => {
    const [toast1, setToast1] = useState(true);
    const close1 = () => setToast1(false);
    const [toast2, setToast2] = useState(true);
    const close2 = () => setToast2(false);

    return (
        <>
            <AdminLinksComponent />
            <Box sx={{ width: '100%', marginLeft: 'auto', marginRight: 'auto' }}>
                <Grid container spacing={2} justifyContent="center">
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <ChatBox
                            toast={toast1}
                            onClose={close1}
                            title="Chat with John Doe"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <ChatBox
                            toast={toast2}
                            onClose={close2}
                            title="Chat with John Doe2"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} lg={2}>
                        <ChatBox
                            toast={toast1}
                            onClose={close1}
                            title="Chat with John Doe"
                        />
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default AdminChatsPage;
