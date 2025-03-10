import React, { useEffect, useState } from 'react';
import groups from "./groups_data";
import { MenuItem, Select, FormControl, InputLabel, Paper } from '@mui/material';

export default function GroupsDropdown({ handleFeedTypeFilterChange, feedTypeFilter }) {
    const [selectedGroup, setSelectedGroup] = useState('');

    useEffect(()=>{

        if(! (feedTypeFilter.includes(selectedGroup))){
            setSelectedGroup('')
        }

        if(feedTypeFilter.length == 1){
            setSelectedGroup(feedTypeFilter[0])
        }

    }, [feedTypeFilter])

    const handleChange = (event) => {
        setSelectedGroup(event.target.value);
        handleFeedTypeFilterChange(event.target.value);
    };

    return (
        <Paper sx={{marginTop: '20px', padding:'15px'}}>
            <FormControl fullWidth sx={{border:'none'}}>
                <InputLabel >Filter posts by</InputLabel>
                <Select sx={{border:'none'}} value={selectedGroup} onChange={handleChange}
                    label={'Filter posts by'}
                >
                    {groups.map((group, index) => (
                        <MenuItem key={index} value={group.key}>
                            {group.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Paper>
    );
}
