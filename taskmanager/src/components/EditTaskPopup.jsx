import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button, Select, MenuItem, InputLabel, FormControl, Box } from '@material-ui/core';
import { updateTask } from '../utils/api';

const EditTaskPopup = ({ open, handleClose, task, fetchTasks, token }) => {
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [status, setStatus] = useState(task.status);
    const [dueDate, setDueDate] = useState(task.dueDate);

    useEffect(() => {
        setTitle(task.title);
        setDescription(task.description);
        setStatus(task.status);
        setDueDate(task.dueDate);
    }, [task]);

    const handleSave = async () => {
        try {
            await updateTask({ _id: task._id, token, title, description, status, dueDate });
            fetchTasks(); // Fetch updated tasks after saving
            handleClose(); // Close the dialog
        } catch (error) {
            console.error("Error updating task:", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth sx={{maxWidth:"70%",maxHeight:"50%"}}>
            <DialogTitle style={{ fontSize: '90px', padding: '20px' }}>Edit Task</DialogTitle>
            <DialogContent style={{ padding: '20px' }}>
                <Box style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    <TextField
                        label="Title"
                        fullWidth
                        margin="dense"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        InputProps={{ style: { fontSize: '20px' } }}
                        InputLabelProps={{ style: { fontSize: '20px' } }}
                    />
                    <TextField
                        label="Description"
                        fullWidth
                        margin="dense"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        InputProps={{ style: { fontSize: '20px' } }}
                        InputLabelProps={{ style: { fontSize: '20px' } }}
                    />
                    <FormControl fullWidth margin="dense">
                        <InputLabel style={{ fontSize: '20px' }}>Status</InputLabel>
                        <Select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            style={{ fontSize: '20px' }}
                        >
                            <MenuItem value="pending" style={{ fontSize: '20px' }}>Pending</MenuItem>
                            <MenuItem value="in-progress" style={{ fontSize: '20px' }}>In-Progress</MenuItem>
                            <MenuItem value="completed" style={{ fontSize: '20px' }}>Completed</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Due Date"
                        type="date"
                        fullWidth
                        margin="dense"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        InputLabelProps={{
                            shrink: true,
                            style: { fontSize: '20px' }
                        }}
                        InputProps={{ style: { fontSize: '20px' } }}
                    />
                </Box>
            </DialogContent>
            <DialogActions style={{ padding: '20px' }}>
                <Button onClick={handleClose} color="secondary" style={{ fontSize: '20px' }}>
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary" style={{ fontSize: '20px' }}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditTaskPopup;
